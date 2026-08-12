import fs from 'node:fs';
import path from 'node:path';

const outDir = 'D:/aprecap/content/wp-pdfs';
fs.mkdirSync(outDir, { recursive: true });

const pdfUrls = [
  "https://aprecap.cl/wp-content/uploads/2024/03/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/03/CUESTIONARIO-ACTUALIZADO.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/04/GENERALIDADES-CURSO-JEFE-DE-SEGURIDAD.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/04/GENERALIDADES-CURSO-CCTV-ALARMAS-1.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/02/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
  "https://aprecap.cl/wp-content/uploads/2025/09/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/02/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/04/GENERALIDADES-CURSO-SUPERVISOR-DE-SEGURIDAD.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/03/Curso-Operador-de-Calderas-y-Generadores-de-Vapor.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/03/GENERALIDADES-CURSO-OPERADOR-DE-CALDERAS-Y-GENERADORES-DE-VAPOR.pdf",
  "https://aprecap.cl/wp-content/uploads/2024/04/GENERALIDADES-CURSO-OPERADOR-DE-CALDERAS-Y-GENERADORES-DE-VAPOR.pdf"
];

async function downloadAll() {
  console.log('Descargando PDFs oficiales de WordPress...');
  const uniqueUrls = [...new Set(pdfUrls)];
  for (const url of uniqueUrls) {
    const filename = path.basename(url);
    const dest = path.join(outDir, filename);
    if (fs.existsSync(dest)) {
      console.log(`- Ya existe: ${filename}`);
      continue;
    }
    try {
      console.log(`- Descargando ${filename}...`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(arrayBuffer));
      console.log(`  ✓ Guardado: ${filename} (${(arrayBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
      console.error(`  ❌ Error descargando ${filename}: ${err.message}`);
    }
  }
}

downloadAll();
