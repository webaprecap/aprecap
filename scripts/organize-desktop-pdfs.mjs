import fs from 'node:fs';
import path from 'node:path';

const desktopBase = 'C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap';

const structure = {
  '1_Guardia_OS10': [
    { src: 'D:/aprecap/content/wp-pdfs/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf', dest: 'Modulo_1_Manual_Oficial_Seguridad_Privada_OS10.pdf' },
    { src: 'D:/aprecap/content/wp-pdfs/CUESTIONARIO-ACTUALIZADO.pdf', dest: 'Modulo_1_Cuestionario_Examen_OS10.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1RxoWAM4w-VLrUflmeuuntKXHZpFUeo10/Constitución política de la republica de chile.pdf', dest: 'Modulo_1_Constitucion_Politica_Chile.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1RxoWAM4w-VLrUflmeuuntKXHZpFUeo10/Decreto 867.pdf', dest: 'Modulo_1_Decreto_867_Reglamento_Seguridad_Privada.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1RxoWAM4w-VLrUflmeuuntKXHZpFUeo10/Decreto-261-EXENTO_31-JUL-2020.pdf', dest: 'Modulo_1_Decreto_261_Exento.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1PxsATcR7B9l81DjekpDXpSSpT4LqAU1t/1. Prev. de Riesgos Laborales.pdf', dest: 'Modulo_2_Prevencion_de_Riesgos_Laborales.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1PxsATcR7B9l81DjekpDXpSSpT4LqAU1t/4. Decreto 594, Condiciones sanitarias y hambientales en puestos de trabajo.pdf', dest: 'Modulo_2_Decreto_594_Condiciones_Sanitarias.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1PxsATcR7B9l81DjekpDXpSSpT4LqAU1t/8. PREV. CONTROL INCENDIOS.pdf', dest: 'Modulo_2_Prevencion_y_Control_de_Incendios.pdf' }
  ],
  '2_Operador_CCTV_y_Alarmas': [
    { src: 'D:/aprecap/content/wp-pdfs/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf', dest: 'Modulo_1_Manual_CCTV_y_Centrales_de_Alarma.pdf' },
    { src: 'D:/aprecap/content/wp-pdfs/GENERALIDADES-CURSO-CCTV-ALARMAS-1.pdf', dest: 'Modulo_1_Generalidades_y_Programa_CCTV.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1mxl3Wr_U_7__6qUgQu9vV-dcvCstcv5i/Capitulo IV CCTV.pdf', dest: 'Modulo_1_Capitulo_IV_Sistemas_CCTV.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1mxl3Wr_U_7__6qUgQu9vV-dcvCstcv5i/Capitulo VI Centrales de Alarma, Incendio y Emergencias.pdf', dest: 'Modulo_1_Capitulo_VI_Centrales_de_Alarma_e_Incendio.pdf' }
  ],
  '3_Supervisor_de_Seguridad': [
    { src: 'D:/aprecap/content/wp-pdfs/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf', dest: 'Modulo_1_Manual_Formacion_Supervisor_Seguridad.pdf' },
    { src: 'D:/aprecap/content/wp-pdfs/GENERALIDADES-CURSO-SUPERVISOR-DE-SEGURIDAD.pdf', dest: 'Modulo_1_Generalidades_y_Programa_Supervisor.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1SMAfGvblCOGnOWFob86L4sGeuQpx_SLE/1_pensamiento_administrativo.pdf', dest: 'Modulo_3_Administracion_Pensamiento_Administrativo.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1SMAfGvblCOGnOWFob86L4sGeuQpx_SLE/2_elementos_de_la_administracion.pdf', dest: 'Modulo_3_Administracion_Elementos_Basicos.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1EftN7OKG2URVxBS4BsVX7wYAlu7a4Mz4/Planificación Estratégica.pdf', dest: 'Modulo_4_Planificacion_Estrategica_Seguridad.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1z0Yg8e2Y2MBrjkjmE6665OXT6MvTHA_A/Gestión Operativa Analisis de Riesgos.pdf', dest: 'Modulo_5_Gestion_Operativa_Analisis_de_Riesgos.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1z0Yg8e2Y2MBrjkjmE6665OXT6MvTHA_A/Gestión Operativa Formato del Estudio de Seguridad.pdf', dest: 'Modulo_5_Formato_Estudio_de_Seguridad.pdf' }
  ],
  '4_Jefe_de_Seguridad': [
    { src: 'D:/aprecap/content/wp-pdfs/GENERALIDADES-CURSO-JEFE-DE-SEGURIDAD.pdf', dest: 'Modulo_1_Generalidades_y_Programa_Jefe_Seguridad.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1z0Yg8e2Y2MBrjkjmE6665OXT6MvTHA_A/Gestión Operativa Conformación de un Sistema de Seguridad Privada.pdf', dest: 'Modulo_1_Conformacion_Sistema_Seguridad_Privada.pdf' },
    { src: 'D:/aprecap/content/drive/folders/1z0Yg8e2Y2MBrjkjmE6665OXT6MvTHA_A/Gestión Operativa Seguridad Informatica.pdf', dest: 'Modulo_2_Gestion_Operativa_Seguridad_Informatica.pdf' }
  ]
};

console.log('Creando carpetas en el Escritorio...');
fs.mkdirSync(desktopBase, { recursive: true });

for (const [folderName, files] of Object.entries(structure)) {
  const dirPath = path.join(desktopBase, folderName);
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`\nCarpeta: ${folderName}`);
  for (const item of files) {
    const destPath = path.join(dirPath, item.dest);
    if (fs.existsSync(item.src)) {
      fs.copyFileSync(item.src, destPath);
      const sizeMb = (fs.statSync(destPath).size / 1024 / 1024).toFixed(2);
      console.log(`  ✓ Copiado: ${item.dest} (${sizeMb} MB)`);
    } else {
      console.log(`  ⚠️ No encontrado: ${item.src}`);
    }
  }
}

console.log(`\n¡Listo! Todos los PDFs organizados por módulo se encuentran en:\n${desktopBase}`);
