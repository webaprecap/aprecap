import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'web', '.env') });

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mwwotgjc';
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

const MAPPING_FILE = path.resolve(process.cwd(), 'scripts', 'sanity-otec-pdf-urls.json');
const ASSETS_URL = `https://${projectId}.api.sanity.io/v2024-03-17/assets/files/${dataset}`;

const OTEC_DIR = path.resolve(process.cwd(), 'content', 'moodle', 'files');
const WP_PDF_DIR = path.resolve(process.cwd(), 'content', 'wp-pdfs');

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (item.name.toLowerCase().endsWith('.pdf')) {
      results.push({
        file: fullPath,
        name: item.name,
        relative: path.relative(OTEC_DIR, fullPath),
      });
    }
  }
  return results;
}

const SOURCES = [
  ...getFilesRecursively(OTEC_DIR),
  ...(fs.existsSync(WP_PDF_DIR)
    ? fs
        .readdirSync(WP_PDF_DIR)
        .filter((f) => f.toLowerCase().endsWith('.pdf'))
        .map((f) => ({
          file: path.join(WP_PDF_DIR, f),
          name: f,
          relative: f,
        }))
    : []),
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
  console.log(`Subiendo ${SOURCES.length} PDFs de Cursos OTEC a Sanity (${projectId}/${dataset})...`);
  let uploaded = 0;
  let skipped = 0;

  for (const source of SOURCES) {
    const hash = sha256(source.file);
    const key = source.relative;
    const existing = mapping[key];
    if (existing && existing.sha256 === hash && existing.url) {
      console.log(`[SKIP] ${key} (ya subido, mismo contenido)`);
      skipped++;
      continue;
    }
    try {
      const { assetId, url } = await uploadPdf(source);
      mapping[key] = {
        assetId,
        url,
        sha256: hash,
        sourceFile: source.file,
        name: source.name,
      };
      console.log(`[OK] ${key} -> ${url}`);
      uploaded++;
    } catch (err) {
      console.error(`[ERROR] ${key}: ${err.message}`);
    }
  }

  saveMapping(mapping);
  console.log(
    `Terminado: ${uploaded} subidos, ${skipped} omitidos, ${SOURCES.length - uploaded - skipped} con error.`
  );
}

main().catch((err) => {
  console.error('Error general:', err.message);
  process.exit(1);
});
