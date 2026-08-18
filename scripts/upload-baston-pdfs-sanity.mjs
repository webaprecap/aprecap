import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const projectId = process.env.SANITY_PROJECT_ID || 'mwwotgjc';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

const MAPPING_FILE = path.resolve(process.cwd(), 'scripts', 'sanity-baston-pdf-urls.json');
const ASSETS_URL = `https://${projectId}.api.sanity.io/v2024-03-17/assets/files/${dataset}`;
const BASE_DIR = 'C:\\Users\\Vickoto\\Downloads\\baston y esposas aprecap';

const FOLDERS = ['modulo 1', 'modulo 2', 'modulo 3', 'modulo 4'];

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

async function uploadPdf(filePath, filename) {
  const body = fs.readFileSync(filePath);
  const url = `${ASSETS_URL}?filename=${encodeURIComponent(filename)}`;
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
    throw new Error(`Sanity respondió ${res.status} para ${filename}: ${JSON.stringify(json)}`);
  }
  const doc = json?.document;
  if (!doc?._id || !doc?.url) {
    throw new Error(`Respuesta inesperada para ${filename}: ${JSON.stringify(json)}`);
  }
  return { assetId: doc._id, url: doc.url };
}

async function main() {
  if (!token) {
    throw new Error('Falta SANITY_API_TOKEN en .env');
  }

  const sources = [];
  for (const folder of FOLDERS) {
    const dir = path.join(BASE_DIR, folder);
    for (const f of fs.readdirSync(dir)) {
      if (f.toLowerCase().endsWith('.pdf')) {
        sources.push({ file: path.join(dir, f), name: f });
      }
    }
  }
  console.log(`Subiendo ${sources.length} PDFs de Bastón y Esposas a Sanity (${projectId}/${dataset})...`);

  const mapping = loadMapping();
  let uploaded = 0;
  let skipped = 0;
  for (const source of sources) {
    const hash = sha256(source.file);
    const existing = mapping[source.name];
    if (existing && existing.sha256 === hash && existing.url) {
      console.log(`[SKIP] ${source.name} (ya subido, mismo contenido)`);
      skipped++;
      continue;
    }
    try {
      const { assetId, url } = await uploadPdf(source.file, source.name);
      mapping[source.name] = { assetId, url, sha256: hash, sourceFile: source.file };
      console.log(`[OK] ${source.name} -> ${url}`);
      uploaded++;
    } catch (err) {
      console.error(`[ERROR] ${source.name}: ${err.message}`);
    }
  }
  saveMapping(mapping);
  console.log(`Terminado: ${uploaded} subidos, ${skipped} omitidos, ${sources.length - uploaded - skipped} con error.`);
}

main().catch((err) => {
  console.error('Error general:', err.message);
  process.exit(1);
});