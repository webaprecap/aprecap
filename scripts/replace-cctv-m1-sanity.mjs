import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const projectId = process.env.SANITY_PROJECT_ID || 'mwwotgjc';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

const MAPPING_FILE = path.resolve(process.cwd(), 'scripts', 'sanity-cctv-pdf-urls.json');
const BASE_DIR = 'C:\\Users\\Vickoto\\Downloads\\cctv aprecap\\modulo 1 reformado';
const ASSETS_URL = `https://${projectId}.api.sanity.io/v2024-03-17/assets/files/${dataset}`;

const NUEVOS = [
  'Modulo_1.1_Definicion_Operador_CCTV_y_Nueva_Ley.pdf',
  'Modulo_1.2_Decreto_Supremo_1122_Medidas_Minimas.pdf',
  'Modulo_1.3_Decreto_Supremo_1814_Transporte_de_Valores.pdf',
  'Modulo_1.4_Decreto_Supremo_222_Cajeros_Automaticos.pdf',
  'Modulo_1.5_CCTV_en_el_Futbol_Profesional.pdf',
  'Modulo_1.6_Privacidad_en_CCTV.pdf',
];

const VIEJOS_KEYS = [
  'Modulo_1.1_Definicion_Operador_CCTV_y_DS41.pdf',
  'Modulo_1.2_DS1122_Medidas_Minimas_Empresas.pdf',
  'Modulo_1.3_DS1814_Transporte_de_Valores_y_Bovedas.pdf',
  'Modulo_1.4_DS222_Cajeros_Automaticos.pdf',
  'Modulo_1.5_Ley19327_Futbol_Profesional.pdf',
  'Modulo_1.6_Privacidad_Uso_Imagenes_Datos.pdf',
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

async function uploadPdf(filePath, filename) {
  const body = fs.readFileSync(filePath);
  const res = await fetch(`${ASSETS_URL}?filename=${encodeURIComponent(filename)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/pdf', Authorization: `Bearer ${token}` },
    body,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Subida ${filename} fallo ${res.status}: ${JSON.stringify(json)}`);
  const doc = json?.document;
  if (!doc?._id || !doc?.url) throw new Error(`Respuesta inesperada para ${filename}`);
  return { assetId: doc._id, url: doc.url };
}

async function deleteAsset(assetId) {
  const res = await fetch(`${ASSETS_URL}/${assetId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

async function main() {
  if (!token) throw new Error('Falta SANITY_API_TOKEN en .env');
  const mapping = loadMapping();

  console.log('== Subiendo 6 PDFs nuevos del Modulo 1 ==');
  for (const name of NUEVOS) {
    const file = path.join(BASE_DIR, name);
    if (!fs.existsSync(file)) {
      console.error(`[FALTA] ${name}`);
      continue;
    }
    const { assetId, url } = await uploadPdf(file, name);
    mapping[name] = { assetId, url, sha256: sha256(file), sourceFile: file };
    console.log(`[OK] ${name} -> ${url}`);
  }

  console.log('== Borrando 6 assets viejos del Modulo 1 ==');
  const noBorrados = [];
  for (const key of VIEJOS_KEYS) {
    const viejo = mapping[key];
    if (!viejo || !viejo.assetId) {
      console.log(`[SKIP] ${key}: sin assetId en mapeo`);
      delete mapping[key];
      continue;
    }
    try {
      const res = await deleteAsset(viejo.assetId);
      if (res.ok) {
        console.log(`[BORRADO] ${key} (${viejo.assetId})`);
        delete mapping[key];
      } else {
        console.log(`[NO BORRADO] ${key} -> status ${res.status} (${viejo.assetId})`);
        noBorrados.push({ key, assetId: viejo.assetId, status: res.status });
      }
    } catch (err) {
      console.log(`[ERROR] ${key}: ${err.message}`);
      noBorrados.push({ key, assetId: viejo.assetId, status: 'error' });
      delete mapping[key];
    }
  }

  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf-8');
  console.log(`[OK] Mapeo actualizado (${Object.keys(mapping).length} entradas)`);
  if (noBorrados.length) {
    console.log('== Assets que NO se pudieron borrar por API (borrar manualmente en sanity.io/manage -> Assets) ==');
    for (const n of noBorrados) console.log(`   ${n.assetId}  (${n.key}, status ${n.status})`);
  }
}

main().catch((err) => {
  console.error('Error general:', err.message);
  process.exit(1);
});
