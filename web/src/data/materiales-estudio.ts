import type { SlideData } from "@/components/PPTSlideViewer";

export interface CursoMaterial {
  slug: string;
  title: string;
  categoria: string;
  pdfUrl?: string;
  modulos: {
    nombre: string;
    slides: SlideData[];
  }[];
}

export const materialesEstudio: CursoMaterial[] = [
  {
    slug: "guardia-de-seguridad",
    title: "Curso de Guardia de Seguridad (OS-10)",
    categoria: "Seguridad Privada Acreditada",
    pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
    modulos: [
      {
        nombre: "Módulo 1: Legislación Laboral y Seguridad Privada",
        slides: [
          {
            id: "os10-1-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 1: Legislación Laboral y Seguridad Privada",
            slideNumber: 1,
            title: "Marco Legal de la Seguridad Privada en Chile",
            contentBullets: [
              "Regido bajo la Ley N° 21.659 y el Decreto Supremo N° 867.",
              "La función del guardia de seguridad es de carácter estrictamente preventivo y de protección de bienes e instalaciones.",
              "Es obligatorio portar la credencial de acreditación OS-10 vigentes emitida por Carabineros de Chile."
            ],
            imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf"
          },
          {
            id: "os10-1-2",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 1: Legislación Laboral y Seguridad Privada",
            slideNumber: 2,
            title: "Derechos de las Personas y Flagrancia (Art. 129 CPP)",
            contentBullets: [
              "Toda persona tiene derecho a la libertad personal y la integridad física garantizada por la Constitución.",
              "En caso de Delito Flagrante (Art. 129 Código Procesal Penal), cualquier persona o guardia puede detener al delincuente.",
              "El detenido en flagrancia debe ser entregado inmediatamente a Carabineros o PDI."
            ],
            imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "os10-1-3",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 1: Legislación Laboral y Seguridad Privada",
            slideNumber: 3,
            title: "Contrato Individual y Jornada de Trabajo",
            contentBullets: [
              "Normado bajo el Código del Trabajo. El contrato debe escriturarse dentro de los 15 días posteriores al ingreso.",
              "La jornada laboral estándar para personal de vigilancia y turnos 4x4 o 5x2 se ajusta a los dictámenes de la Dirección del Trabajo.",
              "Uso obligatorio de Elementos de Protección Personal (EPP) según Ley 16.744."
            ],
            imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 2: Prevención de Riesgos y Control de Emergencias",
        slides: [
          {
            id: "os10-2-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 2: Prevención de Riesgos",
            slideNumber: 1,
            title: "Triángulo del Fuego y Extintores",
            contentBullets: [
              "Para que exista fuego se requiere: Combustible, Comburente (Oxígeno) y Calor/Energía de Activación.",
              "Extintores PQS (Polvo Químico Seco): Aptos para fuegos Clase A, B y C.",
              "Extintores de CO2 (Dióxido de Carbono): Indicados para equipos eléctricos energizados."
            ],
            imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "os10-2-2",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 2: Prevención de Riesgos",
            slideNumber: 2,
            title: "Planes de Evacuación y Vías de Escape",
            contentBullets: [
              "Las vías de evacuación deben mantenerse siempre libres de obstáculos y señalizadas con luces de emergencia.",
              "El guardia guía la evacuación hacia las Zonas de Seguridad establecidas (Puntos de Encuentro).",
              "Coordinación inmediata con Bomberos (132), Carabineros (133) y SAMU (131)."
            ],
            imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
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
        nombre: "Módulo 1: Operación de Centros de Control (CCTV)",
        slides: [
          {
            id: "cctv-1-1",
            courseSlug: "operador-cctv-y-alarmas",
            moduleName: "Módulo 1: Operación de Centros de Control",
            slideNumber: 1,
            title: "Arquitectura de Sistemas de Videovigilancia",
            contentBullets: [
              "Componentes clave: Cámaras IP/Análogas, DVR/NVR, Consola de Monitoreo y Sistemas de Almacenamiento.",
              "Cámaras PTZ (Pan-Tilt-Zoom): Permiten control de movimiento vertical, horizontal y acercamiento óptico.",
              "Supervisión continua de zonas críticas, accesos peatonales y estacionamientos."
            ],
            imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf"
          },
          {
            id: "cctv-1-2",
            courseSlug: "operador-cctv-y-alarmas",
            moduleName: "Módulo 1: Operación de Centros de Control",
            slideNumber: 2,
            title: "Protocolo de Respuesta ante Intrusión y Alarmas",
            contentBullets: [
              "Recepción de señal de sensor PIR o contacto magnético en consola de monitoreo.",
              "Verificación visual inmediata a través de la cámara fija o PTZ de la zona.",
              "Despacho de patrulla de respuesta o notificación directa a Carabineros según protocolo de la instalación."
            ],
            imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
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
        nombre: "Módulo 1: Liderazgo y Supervisión Operativa",
        slides: [
          {
            id: "sup-1-1",
            courseSlug: "supervisor-de-seguridad",
            moduleName: "Módulo 1: Liderazgo Operativo",
            slideNumber: 1,
            title: "Funciones del Supervisor en Pauta de Servicio",
            contentBullets: [
              "El Supervisor es el nexo directo entre la Jefatura de Seguridad y el personal operativo de vigilancia.",
              "Inspección de presentación personal, libro de novedades, EPP y puntualidad del equipo.",
              "Auditoría continua del cumplimiento de las Directivas de Funcionamiento."
            ],
            imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
            pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf"
          },
          {
            id: "sup-1-2",
            courseSlug: "supervisor-de-seguridad",
            moduleName: "Módulo 1: Liderazgo Operativo",
            slideNumber: 2,
            title: "Estudios de Seguridad y Análisis de Riesgos",
            contentBullets: [
              "Identificación de vulnerabilidades en accesos, perímetros y zonas de alta densidad de activos.",
              "Evaluación de la matriz de riesgo (Probabilidad x Impacto).",
              "Propuesta e implementación de medidas preventivas físicas, tecnológicas y humanas."
            ],
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
          }
        ]
      }
    ]
  },
  {
    slug: "baston-y-esposas",
    title: "Curso de Bastón Isorréptico y Esposas",
    categoria: "Técnicas de Retención y Control",
    modulos: [
      {
        nombre: "Módulo 1: Uso Proporcional de la Fuerza",
        slides: [
          {
            id: "baston-1-1",
            courseSlug: "baston-y-esposas",
            moduleName: "Módulo 1: Uso Proporcional de la Fuerza",
            slideNumber: 1,
            title: "Técnicas de Sujeción y Uso del Bastón",
            contentBullets: [
              "El bastón de defensa debe ser utilizado únicamente en caso de agresión inminente a la integridad física.",
              "Zonas prohibidas de impacto: Cabeza, cuello, columna vertebral y genitales.",
              "Técnicas de bloqueo, distancia de seguridad y desarme."
            ],
            imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "baston-1-2",
            courseSlug: "baston-y-esposas",
            moduleName: "Módulo 1: Uso Proporcional de la Fuerza",
            slideNumber: 2,
            title: "Procedimiento Seguro de Inmovilización y Esposado",
            contentBullets: [
              "Colocación de grilletes metálicos con doble seguro para prevenir lesiones en las muñecas.",
              "Posición de retención: Alumno o retenido con manos a la espalda y palmas hacia afuera.",
              "Revisión continua de la respiración y estado de conciencia durante la custodia preventiva hasta la entrega a Carabineros."
            ],
            imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
          }
        ]
      }
    ]
  }
];
