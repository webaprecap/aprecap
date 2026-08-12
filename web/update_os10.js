const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'materiales-estudio.ts');
let content = fs.readFileSync(filePath, 'utf8');

const replacement = `  {
    slug: "guardia-de-seguridad",
    title: "Curso de Guardia de Seguridad (OS-10)",
    categoria: "Seguridad Privada Acreditada (Carabineros de Chile)",
    pdfUrl: "/materiales/os10/Legislación_de_Seguridad_Privada.pdf",
    modulos: [
      {
        nombre: "Legislación OS 10",
        videoUrl: "https://youtu.be/M1lEmsruPHI",
        pdfUrl: "/materiales/os10/Legislación_de_Seguridad_Privada.pdf"
      },
      {
        nombre: "Seguridad Corporativa",
        videoUrl: "https://youtu.be/sSkexLMqqkY",
        pdfUrl: "/materiales/os10/Manual_de_Seguridad_Física_OS-10.pdf"
      },
      {
        nombre: "Riesgos y Control de Incendios",
        videoUrl: "https://youtu.be/yklkKntu6TY",
        pdfUrl: "/materiales/os10/Tactical_Safety_and_Fire_Guide.pdf"
      },
      {
        nombre: "Comunicación",
        videoUrl: "https://youtu.be/MCpJkz8hzH0",
        pdfUrl: "/materiales/os10/Security_Communication_Systems.pdf"
      },
      {
        nombre: "Guía de Primeros Auxilios",
        videoUrl: "https://youtu.be/x3y0sLw6RL8",
        pdfUrl: "/materiales/os10/Primeros_Auxilios_OS-10.pdf"
      },
      {
        nombre: "El Guardia Estratégico",
        videoUrl: "https://youtu.be/vzNAhjWjW-E",
        pdfUrl: "/materiales/os10/OS-10_Tactical_Blueprint.pdf"
      },
      {
        nombre: "Psicología de emergencias",
        videoUrl: "https://youtu.be/Te_wPjNEAaU",
        pdfUrl: "/materiales/os10/Manual_Táctico_de_Psicoprevención.pdf"
      },
      {
        nombre: "Psicología en Crisis",
        videoUrl: "https://youtu.be/o81yak_-_jc",
        pdfUrl: "/materiales/os10/Tactical_Psychoprevention_Manual.pdf"
      },
      {
        nombre: "Psicología en Emergencias",
        videoUrl: "https://youtu.be/owhFjjQLtkU",
        pdfUrl: "/materiales/os10/Tactical_Security_Blueprint.pdf"
      }
    ]
  },`;

const regex = /\{\s*slug:\s*"guardia-de-seguridad"[\s\S]*?(?=\s*\{\s*slug:\s*"operador-cctv-y-alarmas")/m;
content = content.replace(regex, replacement + '\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete');
