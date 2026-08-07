import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'logo');

const LOGOS = [
  {
    name: 'logo.png',
    desc: 'Logo principal 1280x1280 (fondo transparente)',
    url: 'https://aprecap.cl/wp-content/uploads/2026/01/28542127_7459344.jpg-Photoroom.png',
  },
  {
    name: 'logo-header.png',
    desc: 'Logo header 856x763 (usado en el menu del sitio actual)',
    url: 'https://aprecap.cl/wp-content/uploads/2026/01/cropped-28542127_7459344.jpg-Photoroom.png',
  },
  {
    name: 'logo-icon-512.png',
    desc: 'Icono cuadrado 512x512 (favicon del sitio actual)',
    url: 'https://aprecap.cl/wp-content/uploads/2026/01/cropped-cropped-28542127_7459344.jpg-Photoroom.png',
  },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const item of LOGOS) {
  try {
    const res = await fetch(item.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const dest = path.join(OUT_DIR, item.name);
    fs.writeFileSync(dest, buf);
    console.log(`OK  ${item.name} (${(buf.length / 1024).toFixed(1)} KB) - ${item.desc}`);
  } catch (err) {
    console.error(`ERR ${item.name}: ${err.message}`);
  }
}
