import fs from 'node:fs';
import path from 'node:path';

const publicMatDir = 'D:/aprecap/web/public/materiales';
fs.mkdirSync(publicMatDir, { recursive: true });

const copies = [
  {
    src: 'D:/aprecap/content/drive/folders/1RxoWAM4w-VLrUflmeuuntKXHZpFUeo10/Decreto-261-EXENTO_31-JUL-2020.pdf',
    dest: 'jefe-mod1-legislacion.pdf'
  },
  {
    src: 'D:/aprecap/content/drive/folders/1PxsATcR7B9l81DjekpDXpSSpT4LqAU1t/1. Prev. de Riesgos Laborales.pdf',
    dest: 'jefe-mod2-prevencion.pdf'
  },
  {
    src: 'D:/aprecap/content/drive/folders/1SMAfGvblCOGnOWFob86L4sGeuQpx_SLE/1_pensamiento_administrativo.pdf',
    dest: 'jefe-mod3-administracion.pdf'
  },
  {
    src: 'D:/aprecap/content/drive/folders/1EftN7OKG2URVxBS4BsVX7wYAlu7a4Mz4/Planificación Estratégica.pdf',
    dest: 'jefe-mod4-planificacion-estrategica.pdf'
  },
  {
    src: 'D:/aprecap/content/drive/folders/1z0Yg8e2Y2MBrjkjmE6665OXT6MvTHA_A/Gestión Operativa Analisis de Riesgos.pdf',
    dest: 'jefe-mod5-gestion-operativa.pdf'
  },
  {
    src: 'D:/aprecap/content/drive/folders/1mxl3Wr_U_7__6qUgQu9vV-dcvCstcv5i/Capitulo IV CCTV.pdf',
    dest: 'jefe-mod8-seguridad-electronica.pdf'
  }
];

console.log('Copiando PDFs reales de los módulos de Jefe de Seguridad a public/materiales...');
for (const item of copies) {
  const destPath = path.join(publicMatDir, item.dest);
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, destPath);
    const sizeMb = (fs.statSync(destPath).size / 1024 / 1024).toFixed(2);
    console.log(`  ✓ Copiado: ${item.dest} (${sizeMb} MB)`);
  } else {
    console.log(`  ⚠️ No encontrado: ${item.src}`);
  }
}
