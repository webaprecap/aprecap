import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const projectId = process.env.SANITY_PROJECT_ID || 'mwwotgjc';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

const MAPPING_FILE = path.resolve(process.cwd(), 'scripts', 'sanity-pdf-urls.json');
const ASSETS_URL = `https://${projectId}.api.sanity.io/v2024-03-17/assets/files/${dataset}`;
const DOWNLOADS_OS10_DIR = 'C:\\Users\\Vickoto\\Downloads\\os10 aprecap';

const SOURCES = [
  // 9 PDFs oficiales del curso OS-10 existente (módulos 1-9)
  ...fs.readdirSync(DOWNLOADS_OS10_DIR)
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .map((f) => ({
      file: path.join(DOWNLOADS_OS10_DIR, f),
      name: f,
    })),
  // 5 PDFs nuevos (módulos 10-14) de docs/pdf os10
  ...fs.readdirSync(path.resolve(process.cwd(), 'docs', 'pdf os10'))
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .map((f) => ({
      file: path.resolve(process.cwd(), 'docs', 'pdf os10', f),
      // El blueprint de 14 páginas convive con el de 11 páginas: nombre diferenciado
      name: f === 'OS-10_Tactical_Blueprint.pdf' ? 'OS-10_Tactical_Blueprint_v2.pdf' : f,
    })),
];

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function loadMapping() {
  try {
    return JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveMapping(mapping) {
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf-8');
  console.log(`[OK] Mapeo guardado en ${MAPPING_FILE}`);
}

async function uploadPdf(source) {
  const body = fs.readFileSync(source.file);
  const url = `${ASSETS_URL}?filename=${encodeURIComponent(source.name)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/pdf',
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Sanity respondió ${res.status} para ${source.name}: ${JSON.stringify(json)}`);
  }
  const doc = json?.document;
  if (!doc?._id || !doc?.url) {
    throw new Error(`Respuesta inesperada para ${source.name}: ${JSON.stringify(json)}`);
  }
  return { assetId: doc._id, url: doc.url };
}

async function main() {
  if (!token) {
    throw new Error('Falta SANITY_API_TOKEN en .env');
  }
  const mapping = loadMapping();
  console.log(`Subiendo ${SOURCES.length} PDFs a Sanity (${projectId}/${dataset})...`);
  let uploaded = 0;
  let skipped = 0;
  for (const source of SOURCES) {
    const hash = sha256(source.file);
    const existing = mapping[source.name];
    if (existing && existing.sha256 === hash && existing.url) {
      console.log(`[SKIP] ${source.name} (ya subido, mismo contenido)`);
      skipped++;
      continue;
    }
    try {
      const { assetId, url } = await uploadPdf(source);
      mapping[source.name] = { assetId, url, sha256: hash, sourceFile: source.file };
      console.log(`[OK] ${source.name} -> ${url}`);
      uploaded++;
    } catch (err) {
      console.error(`[ERROR] ${source.name}: ${err.message}`);
    }
  }
  saveMapping(mapping);
  console.log(`Terminado: ${uploaded} subidos, ${skipped} omitidos, ${SOURCES.length - uploaded - skipped} con error.`);
}

main().catch((err) => {
  console.error('Error general:', err.message);
  process.exit(1);
});
