import type { SlideData } from "@/components/PPTSlideViewer";

export interface SubModuloData {
  id: string;
  codigo: string; // ej: "1.1", "1.2", "2.1"
  nombre: string;
  pdfUrl?: string;
  videoUrl?: string;
  slides?: SlideData[];
}

export interface ModuloData {
  nombre: string;
  pdfUrl?: string;
  videoUrl?: string;
  subModulos?: SubModuloData[];
  slides?: SlideData[];
}

export interface CursoMaterial {
  slug: string;
  title: string;
  categoria: string;
  pdfUrl?: string;
  banco?: "os10" | "cctv" | "baston" | "supervisor";
  modulos: ModuloData[];
}

export const materialesEstudio: CursoMaterial[] = [
    {
    slug: "guardia-de-seguridad",
    title: "Curso de Guardia de Seguridad (OS-10)",
    categoria: "Seguridad Privada Acreditada (Carabineros de Chile)",
    pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/7ea50e400ad6ec69eda48a5fc38f3a9ed99a9e42.pdf",
    banco: "os10",
    modulos: [
      {
        nombre: "Legislación OS 10",
        videoUrl: "https://youtu.be/M1lEmsruPHI",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/7ea50e400ad6ec69eda48a5fc38f3a9ed99a9e42.pdf"
      },
      {
        nombre: "Seguridad Corporativa",
        videoUrl: "https://youtu.be/sSkexLMqqkY",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/f4fdc2a2151f7a2f5f55eb8dbd54e31305455501.pdf"
      },
      {
        nombre: "Riesgos y Control de Incendios",
        videoUrl: "https://youtu.be/yklkKntu6TY",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/7d0c23ccb95d046e7c76738eb3c98f031f8427d7.pdf"
      },
      {
        nombre: "Comunicación",
        videoUrl: "https://youtu.be/MCpJkz8hzH0",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/312fe707f767116cb8cc5b39c9b2b3f96c89eaf5.pdf"
      },
      {
        nombre: "Guía de Primeros Auxilios",
        videoUrl: "https://youtu.be/x3y0sLw6RL8",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/8ea871e254bfdd6a8e98cf7f6d8bf568fe730892.pdf"
      },
      {
        nombre: "El Guardia Estratégico",
        videoUrl: "https://youtu.be/vzNAhjWjW-E",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/149595a9f0bdc3bd9a36b145157ab8ecb3ffced2.pdf"
      },
      {
        nombre: "Psicología de emergencias",
        videoUrl: "https://youtu.be/Te_wPjNEAaU",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/0b142f802f9c49f2bace8132c93fc14523954cf9.pdf"
      },
      {
        nombre: "Psicología en Crisis",
        videoUrl: "https://youtu.be/o81yak_-_jc",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/f271c345063cb4d2e14a5202e1e513d683b0c3a4.pdf"
      },
      {
        nombre: "Psicología en Emergencias",
        videoUrl: "https://youtu.be/owhFjjQLtkU",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/60cddc2e98585eea14ce9bf2a82e623a0a04bc49.pdf"
      },
      {
        nombre: "Evolución del Guardia",
        videoUrl: "https://youtu.be/m1p-fI3uwek",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/0265519810833a4c1728e9004917b547e24c5021.pdf"
      },
      {
        nombre: "Seguridad de Instalaciones OS-10",
        videoUrl: "https://youtu.be/AHhDEfJAM1s",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/84238022a76a9fa487d354fe10342167e60f7aef.pdf"
      },
      {
        nombre: "Ética y Eventos Masivos",
        videoUrl: "https://youtu.be/bsLIP7v5-A8",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/493a70c10eeafeeca762dcde2d919f84b4e536d2.pdf"
      },
      {
        nombre: "Derechos y Deberes Legales",
        videoUrl: "https://youtu.be/Xvp-GwrbWW0",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/222b18e655de1083a8ea5e74cfae270639320861.pdf"
      },
      {
        nombre: "Protección Moderna Integral",
        videoUrl: "https://youtu.be/G9UWNolIgCA",
        pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/d6afa9714fcc6a9ce8260941150e88f17f451639.pdf"
      },
      {
        nombre: "Resolución Exenta N° 2183 · Capacitación y Exámenes (Lectura)",
        slides: [
          {
            id: "res2183-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Resolución Exenta N° 2183",
            slideNumber: 1,
            title: "¿Qué es la Resolución Exenta N° 2.183?",
            contentBullets: [
              "Dictada el 6 de noviembre de 2025 por el Ministerio de Seguridad Pública (Subsecretaría de Prevención del Delito).",
              "Aprueba las Instrucciones Generales sobre Capacitación y Exámenes en Seguridad Privada.",
              "Aplica a Vigilantes Privados, Guardias de Seguridad, Porteros, Nocheros, Rondines u otros de similar carácter.",
              "La autoridad fiscalizadora es Carabineros de Chile (Prefectura de Seguridad Privada OS-10)."
            ]
          },
          {
            id: "res2183-2",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Resolución Exenta N° 2183",
            slideNumber: 2,
            title: "Base legal",
            contentBullets: [
              "Ley N° 21.659, sobre Seguridad Privada.",
              "Decreto N° 209 de 2024: aprueba el Reglamento de Seguridad Privada de la Ley 21.659.",
              "Decreto N° 208 de 2024: aprueba el Reglamento de Eventos Masivos.",
              "Estas normas regulan la capacitación y los exámenes que deben rendir los guardias."
            ]
          },
          {
            id: "res2183-3",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Resolución Exenta N° 2183",
            slideNumber: 3,
            title: "Tipos de cursos regulados",
            contentBullets: [
              "Curso de Formación: se rinde por una sola vez.",
              "Curso de Perfeccionamiento: actualización periódica de conocimientos.",
              "Curso de Especialización para Guardias de Seguridad.",
              "Si la persona no rinde el perfeccionamiento o especialización en el plazo correspondiente, deberá rendir nuevamente el curso de formación."
            ]
          },
          {
            id: "res2183-4",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Resolución Exenta N° 2183",
            slideNumber: 4,
            title: "Duración mínima del curso de formación",
            contentBullets: [
              "Vigilantes Privados: 100 horas pedagógicas.",
              "Guardias de Seguridad: 90 horas pedagógicas.",
              "Porteros, Nocheros, Rondines u otros de similar carácter: 60 horas pedagógicas."
            ]
          },
          {
            id: "res2183-5",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Resolución Exenta N° 2183",
            slideNumber: 5,
            title: "Área legal (asignaturas para Guardias de Seguridad)",
            contentBullets: [
              "Legislación aplicada a la seguridad privada.",
              "Respeto y promoción de los derechos humanos.",
              "Privacidad y uso de datos personales.",
              "Probidad, no discriminación y perspectiva de género."
            ]
          },
          {
            id: "res2183-6",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Resolución Exenta N° 2183",
            slideNumber: 6,
            title: "Área técnica (asignaturas para Guardias de Seguridad)",
            contentBullets: [
              "Prevención de riesgos.",
              "Seguridad de las instalaciones.",
              "Seguridad electrónica.",
              "Sistemas de telecomunicaciones, entre otras."
            ]
          },
          {
            id: "res2183-7",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Resolución Exenta N° 2183",
            slideNumber: 7,
            title: "Examen teórico (Artículos 30 a 32)",
            contentBullets: [
              "Se examinan teóricamente los cursos de formación y perfeccionamiento (VV.PP., GG.SS., porteros, nocheros, rondines) y el curso de especialización de los guardias de seguridad.",
              "El examen consta de 60 preguntas cerradas.",
              "Tiempo máximo: 120 minutos, contados desde que el examinador declara su inicio.",
              "Las preguntas se distribuyen proporcionalmente entre las áreas temáticas de la malla."
            ]
          },
          {
            id: "res2183-8",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Resolución Exenta N° 2183",
            slideNumber: 8,
            title: "Examen práctico y puntos clave",
            contentBullets: [
              "La resolución establece disposiciones generales para el examen práctico y pautas de evaluación de los exámenes prácticos.",
              "Regula los procedimientos asociados a la rendición y calificación de los exámenes.",
              "La Subsecretaría de Prevención del Delito dicta estas instrucciones y Carabineros de Chile las fiscaliza en terreno.",
              "Conocer esta normativa es parte del perfil profesional del Guardia OS-10."
            ]
          }
        ]
      }
    ]
  },

  {
    slug: "operador-cctv-y-alarmas",
    title: "Curso de Operador de CCTV y Alarmas",
    categoria: "Seguridad Electrónica",
    pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
    banco: "cctv",
    modulos: [
      {
        nombre: "Módulo 1: Fundamentos Legales de Operación de CCTV y Alarmas",
        subModulos: [
          {
            id: "cctv-1-1",
            codigo: "1.1",
            nombre: "Definición de Operador de CCTV y Nueva Ley (Ley N° 21.659)",
            videoUrl: "https://youtu.be/OCoA-tyikk8",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/7c892528b70909adfeaa33e1c29b8806b369ca08.pdf"
          },
          {
            id: "cctv-1-2",
            codigo: "1.2",
            nombre: "Decreto Supremo N° 1122 — Medidas Mínimas de Seguridad para Empresas",
            videoUrl: "https://youtu.be/xbG8RJOXYvI",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/bc2e5ed7e2a9cc2008b7617b8f5cffc510a67175.pdf"
          },
          {
            id: "cctv-1-3",
            codigo: "1.3",
            nombre: "Decreto Supremo N° 1814 — Transporte de Valores y Bóvedas",
            videoUrl: "https://youtu.be/4P8PaxuBYiU",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/2a52338df727ad91d1e9099a4b549db8063c2a2a.pdf"
          },
          {
            id: "cctv-1-4",
            codigo: "1.4",
            nombre: "Decreto Supremo N° 222 — Seguridad en Cajeros Automáticos",
            videoUrl: "https://youtu.be/IIcy36PrH7E",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/5c4b9f53ef9080fb8fe8d346711bed8987f19cf9.pdf"
          },
          {
            id: "cctv-1-5",
            codigo: "1.5",
            nombre: "Ley N° 19.327 — Seguridad en Espectáculos de Fútbol Profesional",
            videoUrl: "https://youtu.be/KeXxMe68R2Y",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/cdb6aa020377a395c6716c73fe4a39d061993104.pdf"
          },
          {
            id: "cctv-1-6",
            codigo: "1.6",
            nombre: "Privacidad, Uso de Imágenes y Protección de Datos",
            videoUrl: "https://youtu.be/ubn3jJV-d20",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/772ff24e8c8dc7e9a89f62aa9877831c92be18ba.pdf"
          },
          {
            id: "cctv-1-7",
            codigo: "1.7",
            nombre: "Evidencia Digital, Informes y Cadena de Custodia",
            videoUrl: "https://youtu.be/WDbDDQEbNVg",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/1be373037de7a2fa069f649f2e2e9ad7440b0e6a.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 2: Sistemas Electrónicos de Seguridad Privada",
        subModulos: [
          {
            id: "cctv-2-1",
            codigo: "2.1",
            nombre: "Tarjetas de Control de Acceso y Biometría",
            videoUrl: "https://youtu.be/oXI6-8w_bTQ",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/4aa3c4835e4f4a78123ef34f17aa1c5055d07042.pdf"
          },
          {
            id: "cctv-2-2",
            codigo: "2.2",
            nombre: "Detectores de Metales y Arcos de Control",
            videoUrl: "https://youtu.be/_eUoi5t6UEY",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/b8675ecc5c54e54565c37a3b0b021314d71ea7a6.pdf"
          },
          {
            id: "cctv-2-3",
            codigo: "2.3",
            nombre: "Detectores de Intrusión y Sensores",
            videoUrl: "https://youtu.be/BqwzH2EPuzM",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/c5a77d7760489259ddefd2af9d63ca113bb912cf.pdf"
          },
          {
            id: "cctv-2-4",
            codigo: "2.4",
            nombre: "Centrales de Alarma Multizona",
            videoUrl: "https://youtu.be/bMGWSTcPE1I",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/9b4020a526b714b8800096b7997a412c858128b5.pdf"
          },
          {
            id: "cctv-2-5",
            codigo: "2.5",
            nombre: "Fundamentos Eléctricos y Electrónicos",
            videoUrl: "https://youtu.be/cHO8p-KyT54",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/3d19c73cf46e29a4526c41bcc1cbacc5d95931d7.pdf"
          },
          {
            id: "cctv-2-6",
            codigo: "2.6",
            nombre: "Componentes y Arquitectura del Sistema CCTV",
            videoUrl: "https://youtu.be/l5bLq5wwshI",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/06e4e88cdb54a52052e3a294ce618f1d6774db79.pdf"
          },
          {
            id: "cctv-2-7",
            codigo: "2.7",
            nombre: "Detección de Incendio y Evacuación",
            videoUrl: "https://youtu.be/mlPFihezXxk",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/f56d519c5a8e3b1c75c3b0d628fd83154c3dc6a8.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 3: Televigilancia y Operación de Centro de Control",
        subModulos: [
          {
            id: "cctv-3-1",
            codigo: "3.1",
            nombre: "Políticas de Seguridad y Central de Televigilancia",
            videoUrl: "https://youtu.be/dqVOVREM9dk",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/d29589f15490727b471acf0be3767e0eeb23a91a.pdf"
          },
          {
            id: "cctv-3-2",
            codigo: "3.2",
            nombre: "Modus Operandi Delictual y Análisis de Riesgos",
            videoUrl: "https://youtu.be/J3yIS0E-O3I",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/5cc9b9fd7512a343458dc9e292c8307ba0900693.pdf"
          },
          {
            id: "cctv-3-3",
            codigo: "3.3",
            nombre: "CCTV, Control de Personas y Zonas Operativas",
            videoUrl: "https://youtu.be/BhqEEOzZIQA",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/a9f94bb9a83987fe9b1e5a479e4192f34ffc8e13.pdf"
          },
          {
            id: "cctv-3-4",
            codigo: "3.4",
            nombre: "Óptica, Cámaras, Equipos y Buenas Prácticas de Montaje",
            videoUrl: "https://youtu.be/cQAp5QbHaJA",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/57aa8be3a71e759c4c30d7b50c45849f475ecfdd.pdf"
          },
          {
            id: "cctv-3-5",
            codigo: "3.5",
            nombre: "Operación del CCTV por el Guardia y el Centro de Control",
            videoUrl: "https://youtu.be/SoovCtb5g9I",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/4bb4d9cd7e3cef93b1212133cf4ecb1812fdffba.pdf"
          },
          {
            id: "cctv-3-6",
            codigo: "3.6",
            nombre: "Ciberseguridad en Videovigilancia y Bodycams",
            videoUrl: "https://youtu.be/C_Lmnga6uck",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/d6917936db37fa9694dded4a2e984002b716df33.pdf"
          },
          {
            id: "cctv-3-7",
            codigo: "3.7",
            nombre: "Analítica de Video, Inteligencia Artificial y Tendencias",
            videoUrl: "https://youtu.be/TkUPpovBSWU",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/c35b25b4a0fb2eaa3ccebb00b7234227f45ae6b8.pdf"
          },
          {
            id: "cctv-3-8",
            codigo: "3.8",
            nombre: "Gestión de Crisis y Custodia Digital",
            videoUrl: "https://youtu.be/nyKt6Fb5FYg",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/29e5ef2acbca476602e66de41fd968df7497fa3e.pdf"
          }
        ]
      }
    ]
  },
{
    slug: "supervisor-de-seguridad",
    title: "Curso de Supervisor de Seguridad Privada",
    categoria: "Liderazgo y Supervisión Operativa",
    banco: "supervisor",
    modulos: [
      {
        nombre: "Módulo 1: Normativa Laboral y Legislación de la Seguridad Privada",
        subModulos: [
          {
            id: "sup-1-1",
            codigo: "1.1",
            nombre: "Contrato de Trabajo y Jornada Laboral",
            videoUrl: "https://youtu.be/kzuNrJpBI6Q",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/339b8aaf88e4e56ad5b062881ce339c6bd96f268.pdf"
          },
          {
            id: "sup-1-2",
            codigo: "1.2",
            nombre: "Decreto Supremo N° 209 — Reglamento de la Seguridad Privada",
            videoUrl: "https://youtu.be/zLtQda89Vs0",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/5e14861c68302516bfd887c0fdf495b66855a038.pdf"
          },
          {
            id: "sup-1-3",
            codigo: "1.3",
            nombre: "Ley N° 21.659 — Seguridad Privada en la Práctica",
            videoUrl: "https://youtu.be/WAI-nfqYTyM",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/a41fd78f787a7b24936064bc3bca2b1f4eb196f5.pdf"
          },
          {
            id: "sup-1-4",
            codigo: "1.4",
            nombre: "Derecho Penal y Detención",
            videoUrl: "https://youtu.be/4pxJhttFdxk",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/8131a476fe12f4250d09809348b52bd410787756.pdf"
          },
          {
            id: "sup-1-5",
            codigo: "1.5",
            nombre: "Derechos Humanos, Uso de la Fuerza y Datos Personales",
            videoUrl: "https://youtu.be/y8YYNMskLJc",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/315fd91e3ff984740e99d3e1a7c9f43cc0922706.pdf"
          },
          {
            id: "sup-1-6",
            codigo: "1.6",
            nombre: "Ley N° 16.744 — Accidentes del Trabajo y Enfermedades Profesionales",
            videoUrl: "https://youtu.be/y7pRiIaBH7o",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/34fa984f0cc26d9af4ad59ebb893a4b5462dd0cb.pdf"
          },
          {
            id: "sup-1-7",
            codigo: "1.7",
            nombre: "Decreto Supremo N° 594 — Higiene y Seguridad",
            videoUrl: "https://youtu.be/k-aQSMYdK5c",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/9b177d6f050d783be0d50e75a3b9961cf3b509fc.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 2: Prevención de Riesgos y Control de Emergencias",
        subModulos: [
          {
            id: "sup-2-1",
            codigo: "2.1",
            nombre: "Prevención de Riesgos en el Puesto",
            videoUrl: "https://youtu.be/-vXHx6DdEvg",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/7a1e489ff6e94c49fa7fb03b0cb219cfd1670dc6.pdf"
          },
          {
            id: "sup-2-2",
            codigo: "2.2",
            nombre: "Control de Incendios y Emergencias",
            videoUrl: "https://youtu.be/7jFHf8I_vNw",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/01d6221450e3c7713aaf2d5781607b01371493e5.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 3: Procedimientos de Gestión de Seguridad",
        subModulos: [
          {
            id: "sup-3-1",
            codigo: "3.1",
            nombre: "Directivas de Funcionamiento y Relación con OS-10",
            videoUrl: "https://youtu.be/Mh6vSchtoYU",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/f69c41e52591534c24bedc7678fd0ddcd50481d1.pdf"
          },
          {
            id: "sup-3-2",
            codigo: "3.2",
            nombre: "Estudios de Seguridad y Pautas de Puesto",
            videoUrl: "https://youtu.be/V6B4G5hJjWk",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/6b3b9f1a5b4fc16ec48bf6f68f447651d8535cc5.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 4: Liderazgo y Resolución de Conflictos",
        subModulos: [
          {
            id: "sup-4-1",
            codigo: "4.1",
            nombre: "Liderazgo y Supervisión de Equipos",
            videoUrl: "https://youtu.be/e9sq1wgoHkU",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/59fb17e011ceffa65d125e0add5bd98e418841ca.pdf"
          },
          {
            id: "sup-4-2",
            codigo: "4.2",
            nombre: "Resolución de Conflictos y Protocolo de la Ley Karin",
            videoUrl: "https://youtu.be/loNAVaURqbQ",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/a7cc1051740d559398180af73bb39c56d3ab7a5a.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 5: Sistemas de Alarma, Comunicación y Enlace",
        subModulos: [
          {
            id: "sup-5-1",
            codigo: "5.1",
            nombre: "Sistemas de Alarma y Monitoreo",
            videoUrl: "https://youtu.be/7GS3lHbmskE",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/1833afaad6987fc12383590d3a8a8b3e748df972.pdf"
          },
          {
            id: "sup-5-2",
            codigo: "5.2",
            nombre: "Comunicación y Enlace",
            videoUrl: "https://youtu.be/kuUjS00c7n0",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/c6b7a8ac509431153156b42d8e9e20dde2b45bc7.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 6: Eventos Masivos, Registros Operativos y Manejo de Incidentes",
        subModulos: [
          {
            id: "sup-6-1",
            codigo: "6.1",
            nombre: "Gestión de Eventos Masivos (Ley N° 21.659 y Decreto N° 208)",
            videoUrl: "https://youtu.be/xTVi0FO-J2U",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/138bcdfc0443d5f9ddbba26995a1db2726af8fed.pdf"
          },
          {
            id: "sup-6-2",
            codigo: "6.2",
            nombre: "Registros Operativos e Informes",
            videoUrl: "https://youtu.be/w6IbgLZuS4E",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/2eb8cae4b5e47f9bd2eea214ac04f94473dd612d.pdf"
          },
          {
            id: "sup-6-3",
            codigo: "6.3",
            nombre: "Manejo de Incidentes del Supervisor",
            videoUrl: "https://youtu.be/MnJXr2iHIU4",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/7a0e112ac297b8c98548dc3c393fd9b380b48783.pdf"
          }
        ]
      }
    ]
  },
  {
    slug: "baston-y-esposas",
    title: "Curso de Bastón y Esposas",
    categoria: "Técnicas de Control y Defensa Personal",
    banco: "baston",
    modulos: [
      {
        nombre: "Módulo 1: Defensa Personal Policial",
        subModulos: [
          {
            id: "baston-1-1",
            codigo: "1.1",
            nombre: "Defensa Personal Policial y Factor Sorpresa",
            videoUrl: "https://youtu.be/6YCBsH29R9s",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/33987fa1ae1e3505da3e371f8dcf2203721b9b9c.pdf"
          },
          {
            id: "baston-1-2",
            codigo: "1.2",
            nombre: "Tiempo, Distancia y Distancia Preventiva",
            videoUrl: "https://youtu.be/n7VQspOgJYw",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/14d4eb95bf840afe813b128f9ed567a2f8945585.pdf"
          },
          {
            id: "baston-1-3",
            codigo: "1.3",
            nombre: "Conciencia Situacional y Aplicación",
            videoUrl: "https://youtu.be/IbCYF_MTHWM",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/c01d90de6bd99765e1279cbec41ca99bada7ac5e.pdf"
          },
          {
            id: "baston-1-4",
            codigo: "1.4",
            nombre: "Legítima Defensa",
            videoUrl: "https://youtu.be/WVBOoEUrees",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/3c0242a96e097fa4f963269d696b8be4fcbdab92.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 2: Comunicación y Técnicas de Control",
        subModulos: [
          {
            id: "baston-2-1",
            codigo: "2.1",
            nombre: "Comunicación Persuasiva y Desescalada",
            videoUrl: "https://youtu.be/nHXye4YVCpg",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/0c9a01687c7d2c2de6f7cdd7c96923f13b66944f.pdf"
          },
          {
            id: "baston-2-2",
            codigo: "2.2",
            nombre: "Palancas y Torsiones",
            videoUrl: "https://youtu.be/RppFH2g-AwE",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/150a996404ee96594323db59c54392e4844a11c8.pdf"
          },
          {
            id: "baston-2-3",
            codigo: "2.3",
            nombre: "Técnicas vs Tácticas",
            videoUrl: "https://youtu.be/nCcOtL8oTks",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/6a287083a6e4d400de2c34450eb7b0d768f85280.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 3: Uso de la Fuerza y Marco Legal",
        subModulos: [
          {
            id: "baston-3-1",
            codigo: "3.1",
            nombre: "Línea de Evolución y Niveles de Uso de la Fuerza",
            videoUrl: "https://youtu.be/2La8Un0FRb0",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/1c0b5a64e394660613a80152402366e27f3ba712.pdf"
          },
          {
            id: "baston-3-2",
            codigo: "3.2",
            nombre: "Marco Legal (Ley 21.659 y Decreto 209)",
            videoUrl: "https://youtu.be/JmG9mIF9IQA",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/87593684512166b2bc530f953c33bc64f4cc7740.pdf"
          }
        ]
      },
      {
        nombre: "Módulo 4: Implementos (Bastón y Esposas)",
        subModulos: [
          {
            id: "baston-4-1",
            codigo: "4.1",
            nombre: "Bastón Telescópico: Partes y Zonas de Golpeo",
            videoUrl: "https://youtu.be/rzlK94mwXXA",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/c812e3de5fa4c52c5665a6ac5919d1d11d8e8c75.pdf"
          },
          {
            id: "baston-4-2",
            codigo: "4.2",
            nombre: "Esposas: Partes, Tipos y Uso",
            videoUrl: "https://youtu.be/JsiJ_fQyLE4",
            pdfUrl: "https://cdn.sanity.io/files/mwwotgjc/production/0530588c7c3285ff445adc2261f01364145f182f.pdf"
          }
        ]
      }
    ]
  }
];

