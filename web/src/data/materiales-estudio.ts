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
  banco?: "os10" | "cctv";
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
    pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
    modulos: [
      {
        nombre: "Módulo 1: Normativa Laboral y Prevención de Riesgos",
        pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
        subModulos: [
          {
            id: "sup-1-1",
            codigo: "1.1",
            nombre: "Supervisión de Turnos y Normativa Laboral",
            pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
            slides: [
              {
                id: "sup-1-1-1",
                courseSlug: "supervisor-de-seguridad",
                moduleName: "Módulo 1.1: Normativa Laboral",
                slideNumber: 1,
                title: "Control de Asistencia y Fiscalización EPP",
                contentBullets: [
                  "Fiscalización de dotaciones y turnos de trabajo.",
                  "Control de cumplimiento del reglamento interno.",
                  "Supervisión del uso adecuado de EPP en terreno."
                ],
                imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 2: Prevención de Riesgos y Control de Emergencias",
        pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
        subModulos: [
          {
            id: "sup-2-1",
            codigo: "2.1",
            nombre: "Liderazgo en Evacuaciones y Planes de Contingencia",
            pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
            slides: [
              {
                id: "sup-2-1-1",
                courseSlug: "supervisor-de-seguridad",
                moduleName: "Módulo 2.1: Gestión de Emergencias",
                slideNumber: 1,
                title: "Comando de Incidentes en Puestos de Trabajo",
                contentBullets: [
                  "Coordinación con Carabineros, Bomberos y SAMU.",
                  "Ejecución de simulacros de evacuación masiva.",
                  "Informes técnicos posteriores al siniestro."
                ],
                imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 3: Procedimientos de Gestión de Seguridad y Administración",
        pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
        subModulos: [
          {
            id: "sup-3-1",
            codigo: "3.1",
            nombre: "Directivas de Funcionamiento ante OS-10",
            pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
            slides: [
              {
                id: "sup-3-1-1",
                courseSlug: "supervisor-de-seguridad",
                moduleName: "Módulo 3.1: Directivas de Funcionamiento",
                slideNumber: 1,
                title: "Tramitación de Estudios de Seguridad",
                contentBullets: [
                  "Elaboración de pautas de puesto de vigilancia.",
                  "Auditoría de vulnerabilidades físicas e inspecciones.",
                  "Presentación formal ante la Autoridad Fiscalizadora."
                ],
                imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 4: Liderazgo y Resolución de Conflictos",
        pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
        subModulos: [
          {
            id: "sup-4-1",
            codigo: "4.1",
            nombre: "Conducción de Equipos de Vigilancia",
            pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
            slides: [
              {
                id: "sup-4-1-1",
                courseSlug: "supervisor-de-seguridad",
                moduleName: "Módulo 4.1: Liderazgo Operativo",
                slideNumber: 1,
                title: "Motivación y Gestión de Equipos",
                contentBullets: [
                  "Resolución asertiva de controversias internas.",
                  "Evaluaciones de desempeño al personal a cargo.",
                  "Relaciones humanas con clientes mandantes."
                ],
                imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 5: Sistemas de Alarma, Comunicación y Enlace",
        pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
        subModulos: [
          {
            id: "sup-5-1",
            codigo: "5.1",
            nombre: "Monitoreo Remoto y Control de Rondas",
            pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf",
            slides: [
              {
                id: "sup-5-1-1",
                courseSlug: "supervisor-de-seguridad",
                moduleName: "Módulo 5.1: Control Tecnológico",
                slideNumber: 1,
                title: "Sistemas de Reloj y Marcas GPS",
                contentBullets: [
                  "Auditoría en tiempo real de marcaciones de rondas.",
                  "Sistemas de red cerrada VHF/UHF repetidoras.",
                  "Mantenimiento preventivo de enlaces de emergencia."
                ],
                imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "jefe-de-seguridad-privada",
    title: "Curso de Jefe de Seguridad Privada",
    categoria: "Dirección Estratégica de Seguridad",
    pdfUrl: "/materiales/jefe-mod1-legislacion.pdf",
    modulos: [
      {
        nombre: "Módulo N°1: Legislación Laboral y Seguridad Privada",
        pdfUrl: "/materiales/jefe-mod1-legislacion.pdf",
        subModulos: [
          {
            id: "jefe-1-1",
            codigo: "1.1",
            nombre: "Ley N° 21.659 y Decreto OS-10 N° 867",
            pdfUrl: "/materiales/jefe-mod1-legislacion.pdf",
            slides: [
              {
                id: "jefe-1-1-1",
                courseSlug: "jefe-de-seguridad-privada",
                moduleName: "Módulo 1.1: Marco Legal Jefatura",
                slideNumber: 1,
                title: "Responsabilidad Legal de la Jefatura de Seguridad",
                contentBullets: [
                  "Leyes y Decretos reguladores de Entidades Obligadas.",
                  "Relación directa con la Prefectura OS-10 de Carabineros.",
                  "Tramitación legal de estudios e inspecciones."
                ],
                imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo N°2: Prevención de Riesgos",
        pdfUrl: "/materiales/jefe-mod2-prevencion.pdf",
        subModulos: [
          {
            id: "jefe-2-1",
            codigo: "2.1",
            nombre: "Higiene Ambiental (Decreto 594) y Comité Paritario",
            pdfUrl: "/materiales/jefe-mod2-prevencion.pdf",
            slides: [
              {
                id: "jefe-2-1-1",
                courseSlug: "jefe-de-seguridad-privada",
                moduleName: "Módulo 2.1: Gestión Ambiental y CPHS",
                slideNumber: 1,
                title: "Supervisión de Salud e Higiene Ocupacional",
                contentBullets: [
                  "Cumplimiento del Decreto 594 en instalaciones críticas.",
                  "Supervisión del Comité Paritario de Higiene y Seguridad.",
                  "Mitigación de riesgos biológicos, físicos y químicos."
                ],
                imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo N°3: Administración",
        pdfUrl: "/materiales/jefe-mod3-administracion.pdf",
        subModulos: [
          {
            id: "jefe-3-1",
            codigo: "3.1",
            nombre: "Pensamiento Administrativo y Recursos Humanos",
            pdfUrl: "/materiales/jefe-mod3-administracion.pdf",
            slides: [
              {
                id: "jefe-3-1-1",
                courseSlug: "jefe-de-seguridad-privada",
                moduleName: "Módulo 3.1: Administración de Seguridad",
                slideNumber: 1,
                title: "Planificación, Dirección y Control Operativo",
                contentBullets: [
                  "Estructura organizacional de los departamentos de seguridad.",
                  "Presupuestos, costos operacionales y dotaciones requeridas.",
                  "Gestión estratégica de personal e incentivos."
                ],
                imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo N°4: Planificación Estratégica",
        pdfUrl: "/materiales/jefe-mod4-planificacion-estrategica.pdf",
        subModulos: [
          {
            id: "jefe-4-1",
            codigo: "4.1",
            nombre: "Plan de Seguridad Integral y Manejo de Crisis",
            pdfUrl: "/materiales/jefe-mod4-planificacion-estrategica.pdf",
            slides: [
              {
                id: "jefe-4-1-1",
                courseSlug: "jefe-de-seguridad-privada",
                moduleName: "Módulo 4.1: Planificación Estratégica",
                slideNumber: 1,
                title: "Matriz FODA y Continuidad del Negocio",
                contentBullets: [
                  "Análisis de riesgos globales y vulnerabilidades corporativas.",
                  "Planes de continuidad de operaciones ante contingencias graves.",
                  "Liderazgo en comités directivos de gestión de crisis."
                ],
                imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo N°5: Gestión Operativa",
        pdfUrl: "/materiales/jefe-mod5-gestion-operativa.pdf",
        subModulos: [
          {
            id: "jefe-5-1",
            codigo: "5.1",
            nombre: "Confección del Estudio de Seguridad Oficial",
            pdfUrl: "/materiales/jefe-mod5-gestion-operativa.pdf",
            slides: [
              {
                id: "jefe-5-1-1",
                courseSlug: "jefe-de-seguridad-privada",
                moduleName: "Módulo 5.1: Estudio de Seguridad",
                slideNumber: 1,
                title: "Metodología Oficial OS-10 para Estudios de Seguridad",
                contentBullets: [
                  "Análisis cuantitativo y cualitativo de amenazas.",
                  "Diseño de zonas de defensa en profundidad.",
                  "Pautas de fiscalización y homologación OS-10."
                ],
                imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo N°6: Seguridad Condominios",
        pdfUrl: "/materiales/jefe-mod1-legislacion.pdf",
        subModulos: [
          {
            id: "jefe-6-1",
            codigo: "6.1",
            nombre: "Control de Accesos en Copropiedades Residenciales",
            pdfUrl: "/materiales/jefe-mod1-legislacion.pdf",
            slides: [
              {
                id: "jefe-6-1-1",
                courseSlug: "jefe-de-seguridad-privada",
                moduleName: "Módulo 6.1: Seguridad Condominios",
                slideNumber: 1,
                title: "Protocolos en Conserjerías y Edificios",
                contentBullets: [
                  "Reglamento de copropiedad e inmovilizaciones.",
                  "Televigilancia y barreras vehiculares automáticas.",
                  "Seguridad en condominios residenciales y comerciales."
                ],
                imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo N°7: Psicología de la Emergencia",
        pdfUrl: "/materiales/jefe-mod2-prevencion.pdf",
        subModulos: [
          {
            id: "jefe-7-1",
            codigo: "7.1",
            nombre: "Comportamiento Humano y Control del Pánico",
            pdfUrl: "/materiales/jefe-mod2-prevencion.pdf",
            slides: [
              {
                id: "jefe-7-1-1",
                courseSlug: "jefe-de-seguridad-privada",
                moduleName: "Módulo 7.1: Psicología del Pánico",
                slideNumber: 1,
                title: "Contención Emocional en Catástrofes",
                contentBullets: [
                  "Conducta de pánico masivo durante terremotos e incendios.",
                  "Primeros Auxilios Psicológicos (PAP) a víctimas.",
                  "Mitigación del síndrome de burnout en personal operativo."
                ],
                imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo N°8: Seguridad Electrónica",
        pdfUrl: "/materiales/jefe-mod8-seguridad-electronica.pdf",
        subModulos: [
          {
            id: "jefe-8-1",
            codigo: "8.1",
            nombre: "Integración de Sistemas IP, Biometría y Ciberseguridad",
            pdfUrl: "/materiales/jefe-mod8-seguridad-electronica.pdf",
            slides: [
              {
                id: "jefe-8-1-1",
                courseSlug: "jefe-de-seguridad-privada",
                moduleName: "Módulo 8.1: Ciberseguridad e Integración",
                slideNumber: 1,
                title: "CCTV IP, Analítica de Video y Servidores NVR",
                contentBullets: [
                  "Integración de inteligencia artificial en reconocimiento de patentes.",
                  "Protección de redes de vigilancia contra ciberataques.",
                  "Resguardo de servidores NVR y respaldo en la nube."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "baston-y-esposas",
    title: "Curso de Bastón y Esposas",
    categoria: "Técnicas de Control y Defensa Personal",
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
