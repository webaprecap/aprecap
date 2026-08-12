import type { SlideData } from "@/components/PPTSlideViewer";

export interface SubModuloData {
  id: string;
  codigo: string; // ej: "1.1", "1.2", "2.1"
  nombre: string;
  pdfUrl?: string;
  slides: SlideData[];
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
  banco?: "os10";
  modulos: ModuloData[];
}

export const materialesEstudio: CursoMaterial[] = [
    {
    slug: "guardia-de-seguridad",
    title: "Curso de Guardia de Seguridad (OS-10)",
    categoria: "Seguridad Privada Acreditada (Carabineros de Chile)",
    pdfUrl: "/materiales/os10/Legislación_de_Seguridad_Privada.pdf",
    banco: "os10",
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
  },

  {
    slug: "operador-cctv-y-alarmas",
    title: "Curso de Operador de CCTV y Alarmas",
    categoria: "Seguridad Electrónica",
    pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
    modulos: [
      {
        nombre: "Módulo 1: Fundamentos Legales de Operación de CCTV y Alarmas",
        pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
        subModulos: [
          {
            id: "cctv-1-1",
            codigo: "1.1",
            nombre: "Definición de Operador de CCTV y Decreto Supremo N° 41",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-1-1-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.1: Operador CCTV y D.S. N° 41",
                slideNumber: 1,
                title: "Rol Legal del Operador de CCTV (Decreto 261)",
                contentBullets: [
                  "El operador controla a través de CCTV y alarmas la seguridad de una instalación.",
                  "Objetivo: Detección oportuna de riesgos, alertas a Carabineros/PDI y neutralizar la amenaza.",
                  "Responsabilidad en el manejo confidencial de datos e imágenes."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
              },
              {
                id: "cctv-1-1-2",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.1: Operador CCTV y D.S. N° 41",
                slideNumber: 2,
                title: "Conexión a Centrales de Carabineros (D.S. N° 41)",
                contentBullets: [
                  "Autoriza la conexión directa de empresas de seguridad a la Central de Comunicaciones de Carabineros (CENCO).",
                  "Transmisión mediante canales de voz, audio, imagen, digital o satelital.",
                  "Costo de la conexión: Renta mensual 3 U.F. por cada 100 usuarios y cobro de 0,5 U.F. por falsa alarma."
                ],
                imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-1-2",
            codigo: "1.2",
            nombre: "Medidas Mínimas de Seguridad para Empresas (Decreto Supremo N° 1122 / DL 3607)",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-1-2-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.2: Decreto Supremo N° 1122",
                slideNumber: 1,
                title: "Alarmas de Asalto y Vigilancia Privada (Art. 5° al 8°)",
                contentBullets: [
                  "En recintos con más de un vigilante, al menos uno debe vestir de civil.",
                  "Dispositivo de alarma de asalto obligatorio, independiente de alarmas de robo o incendio.",
                  "Conexión directa con la Central de Comunicaciones de Carabineros o PDI con activación remota y manual."
                ],
                imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
              },
              {
                id: "cctv-1-2-2",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.2: Decreto Supremo N° 1122",
                slideNumber: 2,
                title: "Régimen de Falsas Alarmas y Cámaras HD (Art. 10° a 17°)",
                contentBullets: [
                  "Cobro de 1,5 U.T.M. por cada falsa alarma.",
                  "Sanción por reincidencia (más de 4 falsas alarmas al mes): plazo de 30 días para subsanar o desconexión del sistema.",
                  "Sistemas de filmación HD en entidades de alto riesgo con digitalización de hora, fecha y resguardo de grabaciones."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-1-3",
            codigo: "1.3",
            nombre: "Regulación en Transporte de Valores y Bóvedas (Decreto Supremo N° 1814)",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-1-3-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.3: Decreto Supremo N° 1814",
                slideNumber: 1,
                title: "Cámaras en Camiones Blindados y Centros de Acopio",
                contentBullets: [
                  "Mínimo 3 cámaras HD por vehículo (cabina, tripulación y exterior) conectadas a central de monitoreo.",
                  "Resguardo de grabaciones: 15 días hábiles mínimo, o 1 año si hubo un delito.",
                  "Ratio de monitoreo: 1 operador por cada 10 camiones blindados en ruta."
                ],
                imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
              },
              {
                id: "cctv-1-3-2",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.3: Decreto Supremo N° 1814",
                slideNumber: 2,
                title: "Seguridad Electrónica en Bóvedas de Acopio (Art. 17° y 18°)",
                contentBullets: [
                  "Bóvedas deben contar con sensores de intrusión, cerraduras electrónicas con retardo y bloqueo horario.",
                  "Pulsadores de asalto conectados al sistema ALPHA 2 de Carabineros.",
                  "Detectores de humo, calor y vibración estructural en el área de acopio."
                ],
                imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-1-4",
            codigo: "1.4",
            nombre: "Seguridad en Cajeros Automáticos y Dispensadores de Dinero (Decreto Supremo N° 222)",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-1-4-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.4: Decreto Supremo N° 222",
                slideNumber: 1,
                title: "Sensores Mínimos en Cajeros Automáticos (Art. 6° y 9°)",
                contentBullets: [
                  "Sistema de alarma monitoreado en línea 24/7 conectado a central de monitoreo.",
                  "Sensores obligatorios: Movimiento, inclinación, corte de cables, temperatura, humo y apertura de puertas/bóveda.",
                  "Alarma sonora y lumínica (máximo 100 dB) con sistema de respaldo de energía (UPS)."
                ],
                imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
              },
              {
                id: "cctv-1-4-2",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.4: Decreto Supremo N° 222",
                slideNumber: 2,
                title: "Cámaras Pin-Hole y Plazos de Almacenamiento (Art. 10°)",
                contentBullets: [
                  "Cámara externa para entorno y cámara interna (pin-hole) para rostro de usuarios.",
                  "Resguardo estándar de grabaciones: 45 días continuos.",
                  "En caso de ataques o robos al cajero: obligación de mantener grabaciones por 24 meses."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-1-5",
            codigo: "1.5",
            nombre: "Videovigilancia en Espectáculos de Fútbol Profesional (Ley N° 19.327)",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-1-5-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.5: Ley N° 19.327",
                slideNumber: 1,
                title: "Estándares de Televigilancia en Recintos Deportivos",
                contentBullets: [
                  "Obligación de instalar cámaras HD, detectores de metales y control de acceso en estadios.",
                  "Monitoreo continuo durante todo el desarrollo del espectáculo deportivo.",
                  "Almacenamiento de imágenes de accesos y perimetrales por un plazo mínimo de 90 días."
                ],
                imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 2: Sistemas Electrónicos de Seguridad Privada",
        pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
        subModulos: [
          {
            id: "cctv-2-1",
            codigo: "2.1",
            nombre: "Tarjetas de Control de Acceso Electrónico y Biometría",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-2-1-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 2.1: Control de Acceso y Biometría",
                slideNumber: 1,
                title: "Tecnologías de Tarjetas de Acceso",
                contentBullets: [
                  "Banda Magnética: Grabación de datos digitales en cinta magnética (económica pero sensible a campos magnéticos).",
                  "Tecnología Wiegand: Hilos metálicos incrustados de alta durabilidad e inmunidad.",
                  "Proximidad (RFID): Circuitos sintonizados bobinados que resuenan ante el lector."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
              },
              {
                id: "cctv-2-1-2",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 2.1: Control de Acceso y Biometría",
                slideNumber: 2,
                title: "Sistemas Biométricos de Identificación",
                contentBullets: [
                  "Huella Digital y Geometría de Mano: Escaneo 3D de patrones dactilares y palmares.",
                  "Reconocimiento Facial e Iris/Retina: Análisis de rasgos faciales y patrones vasculares del ojo.",
                  "Reconocimiento de Voz, Firma y Sensores de Olor."
                ],
                imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-2-2",
            codigo: "2.2",
            nombre: "Detectores de Metales y Arcos Electrónicos de Control",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-2-2-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 2.2: Detección de Metales",
                slideNumber: 1,
                title: "Arcos y Detectores Manuales de Metales",
                contentBullets: [
                  "Barreras electromagnéticas para prevenir el ingreso de armas y objetos peligrosos a áreas restringidas.",
                  "Sistema Rot-Acces: Exclusa giratoria automática con arco detector (flujo de 20 personas/min).",
                  "Paletas manuales de inspección corporal directa."
                ],
                imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-2-3",
            codigo: "2.3",
            nombre: "Detectores de Intrusión, Sensores Pasivos/Activos y Barreras Fotoeléctricas",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-2-3-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 2.3: Detectores de Intrusión",
                slideNumber: 1,
                title: "Tipos de Sensores de Intrusión",
                contentBullets: [
                  "Sensores Pasivos (PIR): Fototransistores que miden variación de radiación térmica infrarroja.",
                  "Sensores Activos: Combinan diodo IRED emisor y fototransistor receptor.",
                  "Barreras Fotoeléctricas: Interrupción de haz invisible para protección perimetral."
                ],
                imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-2-4",
            codigo: "2.4",
            nombre: "Centrales de Alarma y Paneles de Control Multizona",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-2-4-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 2.4: Centrales de Alarma",
                slideNumber: 1,
                title: "Operación de Centrales y Paneles de Alarma",
                contentBullets: [
                  "CPU Principal: Procesa alertas de intrusión, incendio, pánico y sabotaje (Tamper).",
                  "Segmentación en Zonas: Perimetral, interior, 24 horas y supervisada.",
                  "Vías de Transmisión: Celular 4G, IP Ethernet, línea telefónica y radiofrecuencia."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 3: Televigilancia y Operación de Centro de Control",
        pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
        subModulos: [
          {
            id: "cctv-3-1",
            codigo: "3.1",
            nombre: "Políticas de Seguridad y Central de Televigilancia",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-3-1-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 3.1: Central de Televigilancia",
                slideNumber: 1,
                title: "Función Preventiva de la Central de Monitoreo",
                contentBullets: [
                  "Prioridad fundamental: Resguardo de la vida de trabajadores y clientes por sobre lo material.",
                  "Vigilancia remota activa en tiempo real y registro continuo de incidentes.",
                  "Coordinación directa con personal de seguridad en terreno y fuerzas policiales."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-3-2",
            codigo: "3.2",
            nombre: "Modus Operandi Delictual y Análisis de Riesgos",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-3-2-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 3.2: Modus Operandi Delictual",
                slideNumber: 1,
                title: "Patrones de Delitos y Modus Operandi",
                contentBullets: [
                  "Robo Simple vs Planificado: Vigilancia previa, bandas organizadas y vehículos.",
                  "Robo de Vehículos: Portonazos, encerronas y asaltos a transporte.",
                  "Robo por Sorpresa (Lanzazos): Concentración en horarios peak (07:00-10:00, 12:00-14:00, 18:00-20:00)."
                ],
                imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-3-3",
            codigo: "3.3",
            nombre: "Circuito Cerrado de Televisión (CCTV), Control de Personas y Zonas Operativas",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-3-3-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 3.3: CCTV y Zonas Operativas",
                slideNumber: 1,
                title: "CCTV como Transductor Óptico y Elemento Disuasivo",
                contentBullets: [
                  "Conversión de señales de luz en señales eléctricas de video.",
                  "Efecto disuasivo inmediato y generación de imágenes probatorias para juicios.",
                  "Monitoreo diferenciado: Autodomos PTZ en zonas de circulación y cámaras fijas en accesos/estacionamientos."
                ],
                imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "cctv-3-4",
            codigo: "3.4",
            nombre: "Sistemas Ópticos, Cámaras Ocultas, Equipos CCTV y Guía de Buenas Prácticas",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-3-4-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 3.4: Equipos y Guía de Buenas Prácticas",
                slideNumber: 1,
                title: "Equipamiento de Grabación y Procesamiento",
                contentBullets: [
                  "Medios de transmisión: Cable Coaxial, Fibra Óptica y Enlaces de Microondas.",
                  "Procesadores de video: Switchers, Quads (divisores 4 imágenes) y Multiplexores.",
                  "Grabadoras DVR/NVR: Time-lapse, por evento, 24 horas y 72 horas alta densidad."
                ],
                imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
              },
              {
                id: "cctv-3-4-2",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 3.4: Equipos y Guía de Buenas Prácticas",
                slideNumber: 2,
                title: "Estándares de Montaje y Superposición de Campos",
                contentBullets: [
                  "Montaje de cámaras fijas a una altura superior a 2,3 metros para evitar sabotajes.",
                  "Posicionamiento Cenital (90°) para monitoreo de mesas de juego y cajas de dinero.",
                  "Superposición y cruce de campos de imagen para eliminar puntos ciegos."
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
  }
];
