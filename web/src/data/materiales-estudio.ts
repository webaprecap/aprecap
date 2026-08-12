import type { SlideData } from "@/components/PPTSlideViewer";

export interface CursoMaterial {
  slug: string;
  title: string;
  categoria: string;
  pdfUrl?: string;
  modulos: {
    nombre: string;
    pdfUrl?: string;
    slides: SlideData[];
  }[];
}

export const materialesEstudio: CursoMaterial[] = [
  {
    slug: "guardia-de-seguridad",
    title: "Curso de Guardia de Seguridad (OS-10)",
    categoria: "Seguridad Privada Acreditada (Carabineros de Chile)",
    pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
    modulos: [
      {
        nombre: "Módulo 1: Legislación de Seguridad Privada",
        slides: [
          {
            id: "os10-1-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 1: Legislación de Seguridad Privada",
            slideNumber: 1,
            title: "Marco Legal de la Seguridad Privada en Chile",
            contentBullets: [
              "Regido bajo la Ley N° 21.659 y el Decreto Supremo N° 867.",
              "La función del guardia de seguridad es estrictamente preventiva y de protección de bienes e instalaciones.",
              "Es obligatorio portar la credencial de acreditación OS-10 vigente emitida por Carabineros de Chile."
            ],
            imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "os10-1-2",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 1: Legislación de Seguridad Privada",
            slideNumber: 2,
            title: "Derechos de las Personas y Flagrancia (Art. 129 CPP)",
            contentBullets: [
              "Toda persona tiene derecho a la libertad personal e integridad física garantizada por la Constitución.",
              "En caso de Delito Flagrante (Art. 129 CPP), cualquier persona o guardia puede detener al delincuente.",
              "El detenido debe ser entregado inmediatamente a Carabineros o PDI."
            ],
            imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 2: Prevención de Riesgos y Control de Incendios",
        slides: [
          {
            id: "os10-2-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 2: Prevención de Riesgos y Control de Incendios",
            slideNumber: 1,
            title: "Prevención de Riesgos Laborales (Ley N° 16.744)",
            contentBullets: [
              "Establece el seguro obligatorio contra accidentes del trabajo y enfermedades profesionales.",
              "Uso obligatorio de EPP: Calzado de seguridad, chaleco reflectante y linterna.",
              "Evaluación permanente de condiciones inseguras en el puesto de vigilancia."
            ],
            imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 3: Valores, Ética y Psicoprevención",
        slides: [
          {
            id: "os10-3-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 3: Valores, Ética y Psicoprevención",
            slideNumber: 1,
            title: "Valores Institucionales y Conducta Profesional",
            contentBullets: [
              "Representación de la imagen de seguridad con sobriedad y profesionalismo.",
              "Confidencialidad sobre la información sensible del puesto de trabajo.",
              "Desescalamiento de conflictos y buen trato a clientes y usuarios."
            ],
            imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 4: Técnicas de Vigilancia y Pauta de Puesto",
        slides: [
          {
            id: "os10-4-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 4: Técnicas de Vigilancia y Pauta de Puesto",
            slideNumber: 1,
            title: "Supervisión y Ejecución de la Pauta de Puesto",
            contentBullets: [
              "Verificación de puntos críticos e inspección de cerrojos y vías de acceso.",
              "Rondas periódicas no predecibles.",
              "Registro en el Libro de Novedades del Puesto."
            ],
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 5: Seguridad Física de Instalaciones y Accesos",
        slides: [
          {
            id: "os10-5-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 5: Seguridad Física de Instalaciones y Accesos",
            slideNumber: 1,
            title: "Control de Acceso Peatonal y Vehicular",
            contentBullets: [
              "Acreditación de visitas mediante cédula de identidad.",
              "Control de ingreso y salida de mercaderías e insumos.",
              "Mantenimiento de zonas perimetrales iluminadas y despejadas."
            ],
            imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 6: Sistemas de Comunicación y Enlace",
        slides: [
          {
            id: "os10-6-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 6: Sistemas de Comunicación y Enlace",
            slideNumber: 1,
            title: "Uso de Equipos de Radiocomunicación VHF/UHF",
            contentBullets: [
              "Transmisión breve, objetiva y utilizando claves operativas.",
              "Verificación diaria del estado de carga de baterías y canal principal.",
              "Enlace permanente con la central de control o supervisor."
            ],
            imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 7: Primeros Auxilios",
        slides: [
          {
            id: "os10-7-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 7: Primeros Auxilios",
            slideNumber: 1,
            title: "Protocolo PAS y Atención Inicial de Urgencias",
            contentBullets: [
              "PAS: Proteger el área, Avisar (131 SAMU), Socorrer.",
              "Atención de desmayos, hemorragias y quemaduras leves.",
              "No mover al afectado en sospecha de traumatismo grave."
            ],
            imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 8: Defensa Personal y Uso del Bastón",
        slides: [
          {
            id: "os10-8-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 8: Defensa Personal y Uso del Bastón",
            slideNumber: 1,
            title: "Técnicas de Retención y Distancia de Seguridad",
            contentBullets: [
              "Uso defensivo del bastón isorréptico ante agresión ilegítima.",
              "Zonas prohibidas de impacto: Cabeza, cuello y columna vertebral.",
              "Inmovilización preventiva y entrega inmediata a Carabineros."
            ],
            imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
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
    modulos: [
      {
        nombre: "Módulo 1: Fundamentos Legales de Operación de CCTV y Alarmas",
        slides: [
          {
            id: "cctv-1-1",
            courseSlug: "operador-cctv-y-alarmas",
            moduleName: "Módulo 1: Fundamentos Legales de Operación de CCTV",
            slideNumber: 1,
            title: "Marco Legal y Normativa de Videovigilancia",
            contentBullets: [
              "Normas de protección a la privacidad y privacidad del trabajador.",
              "Uso de grabaciones de video como medio de prueba legal.",
              "Custodia de grabaciones y acceso restringido a personal autorizado."
            ],
            imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 2: Sistemas Electrónicos de Seguridad Privada",
        slides: [
          {
            id: "cctv-2-1",
            courseSlug: "operador-cctv-y-alarmas",
            moduleName: "Módulo 2: Sistemas Electrónicos de Seguridad Privada",
            slideNumber: 1,
            title: "Sensores, Contactos Magnéticos y Centrales de Alarma",
            contentBullets: [
              "Operación de paneles de alarma contra intrusión e incendio.",
              "Interpretación de zonas, fallas de sistema y tamper.",
              "Detección de intrusión volumétrica (sensores PIR)."
            ],
            imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 3: Televigilancia y Operación de Centro de Control",
        slides: [
          {
            id: "cctv-3-1",
            courseSlug: "operador-cctv-y-alarmas",
            moduleName: "Módulo 3: Televigilancia y Operación de Centro de Control",
            slideNumber: 1,
            title: "Técnicas de Monitoreo y Manejo de Cámaras PTZ",
            contentBullets: [
              "Seguimiento visual de sospechosos mediante cámaras PTZ (Pan-Tilt-Zoom).",
              "Monitoreo de accesos, estacionamientos y perímetros.",
              "Protocolo de despacho de patrullas y aviso policial ante alertas."
            ],
            imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
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
        slides: [
          {
            id: "sup-1-1",
            courseSlug: "supervisor-de-seguridad",
            moduleName: "Módulo 1: Normativa Laboral y Prevención de Riesgos",
            slideNumber: 1,
            title: "Legislación Aplicada al Personal de Vigilancia",
            contentBullets: [
              "Supervisión de contratos, jornadas y turnos de trabajo.",
              "Cumplimiento del Reglamento Interno de Orden, Higiene y Seguridad.",
              "Fiscalización del uso de EPP por el personal a cargo."
            ],
            imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 2: Prevención de Riesgos y Control de Emergencias",
        slides: [
          {
            id: "sup-2-1",
            courseSlug: "supervisor-de-seguridad",
            moduleName: "Módulo 2: Prevención de Riesgos y Control de Emergencias",
            slideNumber: 1,
            title: "Gestión de Crisis y Planes de Contingencia",
            contentBullets: [
              "Liderazgo durante la ejecución del plan de evacuación.",
              "Coordinación con Bomberos, Carabineros y ambulancias.",
              "Evaluación posterior a la emergencia e informe técnico."
            ],
            imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 3: Procedimientos de Gestión de Seguridad y Administración",
        slides: [
          {
            id: "sup-3-1",
            courseSlug: "supervisor-de-seguridad",
            moduleName: "Módulo 3: Procedimientos de Gestión de Seguridad",
            slideNumber: 1,
            title: "Elaboración de Directivas de Funcionamiento",
            contentBullets: [
              "Confección y tramitación de Directivas de Funcionamiento ante OS-10.",
              "Auditoría del cumplimiento de pautas de puesto.",
              "Análisis de vulnerabilidades y pautas de inspección."
            ],
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 4: Liderazgo y Resolución de Conflictos",
        slides: [
          {
            id: "sup-4-1",
            courseSlug: "supervisor-de-seguridad",
            moduleName: "Módulo 4: Liderazgo y Resolución de Conflictos",
            slideNumber: 1,
            title: "Conducción de Equipos de Trabajo Operativo",
            contentBullets: [
              "Técnicas de motivación y resolución de controversias internas.",
              "Evaluación del desempeño y control de asistencia.",
              "Comunicación asertiva con clientes y administración."
            ],
            imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 5: Sistemas de Alarma, Comunicación y Enlace",
        slides: [
          {
            id: "sup-5-1",
            courseSlug: "supervisor-de-seguridad",
            moduleName: "Módulo 5: Sistemas de Alarma, Comunicación y Enlace",
            slideNumber: 1,
            title: "Tecnología Aplicada al Control Operativo",
            contentBullets: [
              "Sistemas de marcas de reloj y control de rondas por GPS.",
              "Monitoreo remoto de puestos de guardia y centrales de alarma.",
              "Mantenimiento preventivo de equipos de comunicación radial."
            ],
            imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
          }
        ]
      }
    ]
  },
  {
    slug: "jefe-de-seguridad-privada",
    title: "Curso de Jefe de Seguridad Privada",
    categoria: "Dirección Estratégica de Seguridad",
    pdfUrl: "/materiales/GENERALIDADES-CURSO-JEFE-DE-SEGURIDAD.pdf",
    modulos: [
      {
        nombre: "Módulo 1: Conformación de Sistemas de Seguridad Privada",
        slides: [
          {
            id: "jefe-1-1",
            courseSlug: "jefe-de-seguridad-privada",
            moduleName: "Módulo 1: Conformación de Sistemas de Seguridad Privada",
            slideNumber: 1,
            title: "Diseño y Estrategia de Seguridad Integral",
            contentBullets: [
              "Planificación global de recursos humanos, físicos y tecnológicos.",
              "Creación del Estudio de Seguridad y manuales corporativos de crisis.",
              "Relación directa con la Prefectura OS-10 de Carabineros de Chile."
            ],
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 2: Gestión Operativa y Seguridad Informática",
        slides: [
          {
            id: "jefe-2-1",
            courseSlug: "jefe-de-seguridad-privada",
            moduleName: "Módulo 2: Gestión Operativa y Ciberseguridad",
            slideNumber: 1,
            title: "Protección de Activos Digitales e Infraestructura Crítica",
            contentBullets: [
              "Mitigación de riesgos cibernéticos e ingenios de intrusión digital.",
              "Protección de redes de vigilancia, servidores NVR y bases de datos.",
              "Auditoría continua de seguridad física e informática."
            ],
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
          }
        ]
      }
    ]
  }
];
