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
    categoria: "Seguridad Privada Acreditada (Carabineros de Chile)",
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
              "La función del guardia de seguridad es de carácter estrictamente preventivo y de protección de personas e instalaciones.",
              "Es obligatorio portar la credencial de acreditación OS-10 vigente emitida por Carabineros de Chile."
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
          }
        ]
      },
      {
        nombre: "Módulo 2: Prevención de Riesgos y Primeros Auxilios",
        slides: [
          {
            id: "os10-2-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 2: Prevención de Riesgos y Primeros Auxilios",
            slideNumber: 1,
            title: "Prevención de Riesgos Laborales (Ley N° 16.744)",
            contentBullets: [
              "Establece el seguro obligatorio contra accidentes del trabajo y enfermedades profesionales.",
              "Uso obligatorio de EPP (Elementos de Protección Personal): Calzado de seguridad, chaleco reflectante y linterna.",
              "Evaluación permanente de condiciones inseguras en el puesto de vigilancia."
            ],
            imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "os10-2-2",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 2: Prevención de Riesgos y Primeros Auxilios",
            slideNumber: 2,
            title: "Primeros Auxilios Básicos y Protocolo PAS",
            contentBullets: [
              "Protocolo PAS: Proteger el área, Avisar a emergencias (131 SAMU), Socorrer al afectado.",
              "Evaluación primaria de signos vitales (consciencia, respiración y pulso).",
              "Atención inicial de quemaduras, heridas sangrantes y desmayos sin mover en sospecha de daño cervical."
            ],
            imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 3: Control de Incendios y Evacuación de Emergencia",
        slides: [
          {
            id: "os10-3-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 3: Control de Incendios y Evacuación",
            slideNumber: 1,
            title: "Triángulo del Fuego y Tipos de Extintores",
            contentBullets: [
              "Requerimientos del fuego: Combustible, Oxígeno y Calor.",
              "Extintor PQS (Polvo Químico Seco): Apto para fuegos de clase A (sólidos), B (líquidos) y C (eléctricos).",
              "Extintor CO2 (Dióxido de Carbono): Específico para tableros eléctricos y equipos electrónicos delicados."
            ],
            imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "os10-3-2",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 3: Control de Incendios y Evacuación",
            slideNumber: 2,
            title: "Plan de Evacuación y Puntos de Encuentro (PEE)",
            contentBullets: [
              "Mantener vías de evacuación desbloqueadas, iluminadas y correctamente señalizadas.",
              "Guiar el flujo de personas hacia las zonas de seguridad (PEE) sin generar pánico.",
              "Llamado inmediato a Bomberos (132) y Carabineros (133)."
            ],
            imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 4: Sistemas de Comunicación y Radiotransmisión",
        slides: [
          {
            id: "os10-4-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 4: Sistemas de Comunicación",
            slideNumber: 1,
            title: "Uso Correcto del Equipo de Radiotransmisión (VHF/UHF)",
            contentBullets: [
              "Formato de transmisión claro, conciso y breve respetando la jerarquía.",
              "Manejo de claves alfanuméricas y códigos de emergencia estándar.",
              "Verificación diaria del estado de carga de baterías y canal principal de guardia."
            ],
            imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 5: Control de Accesos y Técnicas de Vigilancia",
        slides: [
          {
            id: "os10-5-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 5: Control de Accesos y Vigilancia",
            slideNumber: 1,
            title: "Protocolo de Registro en Control de Acceso Peatonal y Vehicular",
            contentBullets: [
              "Identificación de visitas, contratistas y proveedores mediante cédula de identidad.",
              "Registro en libro de novedades físico o sistema digital autorizado.",
              "Inspección visual periódica de perímetros, portones y mamparas."
            ],
            imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 6: Valores, Ética Profesional y Atención de Público",
        slides: [
          {
            id: "os10-6-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 6: Valores, Ética y Atención de Público",
            slideNumber: 1,
            title: "Ética, Honestidad y Trato Directo",
            contentBullets: [
              "Representación de la imagen de seguridad de la instalación con respeto y sobriedad.",
              "Manejo de conflictos con técnica de desescalamiento verbal sin agresiones.",
              "Confidencialidad absoluta sobre los movimientos e información sensible de la empresa cliente."
            ],
            imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 7: Defensa Personal y Proporcionalidad de la Fuerza",
        slides: [
          {
            id: "os10-7-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 7: Defensa Personal y Uso de la Fuerza",
            slideNumber: 1,
            title: "Legítima Defensa y Proporcionalidad",
            contentBullets: [
              "Requisitos penales de la legítima defensa: Agresión ilegítima, falta de provocación suficiente y necesidad racional del medio empleado.",
              "Distancia de seguridad e inmovilización preventiva hasta la llegada de Carabineros.",
              "Prohibición estricta de uso de armas de fuego por parte de guardias privados sin autorización expresa de vigilancia armada."
            ],
            imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        nombre: "Módulo 8: Seguridad Física de Instalaciones",
        slides: [
          {
            id: "os10-8-1",
            courseSlug: "guardia-de-seguridad",
            moduleName: "Módulo 8: Seguridad Física de Instalaciones",
            slideNumber: 1,
            title: "Rondas de Inspección y Vulnerabilidades",
            contentBullets: [
              "Programación de rondas periódicas a distintas horas (aleatorias) para evitar previsibilidad.",
              "Revisión de cerrojos, luces perimetrales, ventanas y sensores de movimiento.",
              "Anotación inmediata de cualquier anomalía en el Libro de Novedades de Puesto."
            ],
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
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
              "Componentes clave: Cámaras IP/Análogas, DVR/NVR, Consola de Monitoreo y Almacenamiento.",
              "Cámaras PTZ (Pan-Tilt-Zoom): Permiten control de movimiento y acercamiento óptico.",
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
              "Recepción de señal de sensor PIR en consola de monitoreo.",
              "Verificación visual inmediata a través de la cámara asociada.",
              "Despacho de patrulla de respuesta o notificación directa a Carabineros."
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
              "Nexo directo entre Jefatura de Seguridad y el personal de vigilancia.",
              "Inspección de presentación personal, libro de novedades y puntualidad.",
              "Auditoría continua del cumplimiento de la Directiva de Funcionamiento."
            ],
            imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
            pdfUrl: "/materiales/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf"
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
              "El bastón debe ser utilizado únicamente en caso de agresión inminente a la integridad física.",
              "Zonas prohibidas de impacto: Cabeza, cuello, columna vertebral y genitales.",
              "Técnicas de bloqueo, distancia de seguridad y desarme."
            ],
            imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
          }
        ]
      }
    ]
  }
];
