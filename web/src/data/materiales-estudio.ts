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
  subModulos?: SubModuloData[];
  slides?: SlideData[];
}

export interface CursoMaterial {
  slug: string;
  title: string;
  categoria: string;
  pdfUrl?: string;
  modulos: ModuloData[];
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
        pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
        subModulos: [
          {
            id: "os10-1-1",
            codigo: "1.1",
            nombre: "Conceptos de Estado, Nación y Constitución",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-1-1-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 1.1: Estado y Constitución",
                slideNumber: 1,
                title: "Marco Legal e Institucional en Chile",
                contentBullets: [
                  "Definición de Estado: Grupo humano asentado en un territorio con una autoridad soberana.",
                  "La Constitución Política es la Ley Fundamental del Estado a la que deben someterse todas las personas e instituciones.",
                  "La Seguridad Privada es una actividad colaborativa y complementaria a la función pública ejercida por las Fuerzas de Orden."
                ],
                imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-1-2",
            codigo: "1.2",
            nombre: "Derecho Penal, Delito Flagrante y Legítima Defensa",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-1-2-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 1.2: Delito Flagrante y Legítima Defensa",
                slideNumber: 1,
                title: "Detención en Flagrancia (Art. 129 Código Procesal Penal)",
                contentBullets: [
                  "Delito Flagrante: Aquel que se está cometiendo actualmente o acaba de cometerse.",
                  "Cualquier persona (incluyendo el Guardia de Seguridad) puede detener al delincuente flagrante.",
                  "Condición obligatoria: El detenido debe ser entregado de inmediato a Carabineros o PDI."
                ],
                imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
              },
              {
                id: "os10-1-2-2",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 1.2: Delito Flagrante y Legítima Defensa",
                slideNumber: 2,
                title: "Legítima Defensa (Art. 10 N° 4, 5 y 6 del Código Penal)",
                contentBullets: [
                  "Requisito 1: Agresión ilegítima no provocada.",
                  "Requisito 2: Necesidad racional del medio empleado para impedirla o repelerla.",
                  "Requisito 3: Falta de provocación suficiente por parte de quien se defiende."
                ],
                imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-1-3",
            codigo: "1.3",
            nombre: "Nuevo Sistema Procesal Penal",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-1-3-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 1.3: Sistema Procesal Penal",
                slideNumber: 1,
                title: "Actores del Sistema Procesal Penal en Chile",
                contentBullets: [
                  "Fiscales del Ministerio Público: Dirigen la investigación de los delitos y ejercen la acción penal pública.",
                  "Jueces de Garantía: Aseguran el respeto a los derechos constitucionales del imputado y la víctima.",
                  "Tribunal de Juicio Oral en lo Penal: Resuelve la culpabilidad o inocencia en la audiencia pública."
                ],
                imageUrl: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-1-4",
            codigo: "1.4",
            nombre: "Leyes y Decretos de Seguridad Privada (Ley N° 21.659 / DS 867)",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-1-4-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 1.4: Normativa OS-10",
                slideNumber: 1,
                title: "Reglamentación y Fiscalización por Carabineros de Chile",
                contentBullets: [
                  "Decreto Supremo N° 867: Norma la formación, equipamiento y obligaciones de los guardias de seguridad.",
                  "Fiscalización permanente por la Prefectura de Seguridad Privada OS-10 de Carabineros de Chile.",
                  "Obligatoriedad de portar la credencial OS-10 vigente en todo momento durante el turno."
                ],
                imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-1-5",
            codigo: "1.5",
            nombre: "Derecho Laboral y Código del Trabajo",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-1-5-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 1.5: Código del Trabajo",
                slideNumber: 1,
                title: "Contratos, Turnos y Jornada de Trabajo",
                contentBullets: [
                  "Contrato Individual de Trabajo: Vínculo de subordinación y dependencia entre empleador y trabajador.",
                  "Jornada ordinaria de trabajo y descansos semanales establecidos en la legislación.",
                  "Reglamento Interno de Orden, Higiene y Seguridad del puesto."
                ],
                imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 2: Prevención de Riesgos y Control de Incendios",
        pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
        subModulos: [
          {
            id: "os10-2-1",
            codigo: "2.1",
            nombre: "Prevención de Riesgos Laborales (Ley N° 16.744)",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-2-1-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 2.1: Prevención de Riesgos",
                slideNumber: 1,
                title: "Seguro Obligatorio de Accidentes del Trabajo (Ley 16.744)",
                contentBullets: [
                  "Protección frente a accidentes a causa o con ocasión del trabajo y trayecto.",
                  "Uso obligatorio de Elementos de Protección Personal (EPP).",
                  "Notificación obligatoria de accidentes a la mutualidad o ACHS."
                ],
                imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-2-2",
            codigo: "2.2",
            nombre: "Secuencia del Accidente y Causas Inseguras",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-2-2-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 2.2: Secuencia del Accidente",
                slideNumber: 1,
                title: "Factores de Riesgo en el Puesto de Trabajo",
                contentBullets: [
                  "Gente, Equipos, Materiales y Ambiente (GEMA).",
                  "Acciones Inseguras: Viola procedimientos o normas de seguridad.",
                  "Condiciones Inseguras: Defectos físicos o ambientales en la instalación."
                ],
                imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-2-3",
            codigo: "2.3",
            nombre: "Teoría del Fuego y Tetraedro del Fuego",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-2-3-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 2.3: Química del Fuego",
                slideNumber: 1,
                title: "Elementos de la Combustión",
                contentBullets: [
                  "Combustible (Materia sólida, líquida o gaseosa).",
                  "Comburente (Oxígeno del aire).",
                  "Calor (Temperatura de ignición) y Reacción en cadena."
                ],
                imageUrl: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-2-4",
            codigo: "2.4",
            nombre: "Clases de Fuego (A, B, C, D, K) y Extintores",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-2-4-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 2.4: Clasificación del Fuego",
                slideNumber: 1,
                title: "Uso y Manejo de Extintores Portátiles",
                contentBullets: [
                  "Clase A: Materiales sólidos (Madera, papel). Extintor de Agua o PQS.",
                  "Clase B: Líquidos inflamables (Gasolina, aceites). Extintor CO2 o PQS.",
                  "Clase C: Equipos eléctricos energizados. Extintor CO2.",
                  "Métodos de extinción: Enfriamiento, Sofocación y Segregación."
                ],
                imageUrl: "https://images.unsplash.com/photo-1599586120429-48281b6f0e20?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 3: Valores, Ética y Psicoprevención",
        pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
        subModulos: [
          {
            id: "os10-3-1",
            codigo: "3.1",
            nombre: "Psicoprevención y Conducta Humana",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-3-1-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 3.1: Psicoprevención",
                slideNumber: 1,
                title: "Factores Psicológicos en la Vigilancia",
                contentBullets: [
                  "Control de impulsos y concentración sostenida durante turnos largos.",
                  "Manejo de la fatiga laboral y estrés operacional.",
                  "Autocuidado y hábitos de sueño reparador."
                ],
                imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-3-2",
            codigo: "3.2",
            nombre: "Valores e Imagen Institucional",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-3-2-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 3.2: Valores Institucionales",
                slideNumber: 1,
                title: "Sobriedad y Presentación Personal",
                contentBullets: [
                  "Porte de uniforme limpio, planchado y calzado lustrado.",
                  "Trato cortés, firme y respetuoso a usuarios y clientes.",
                  "Representación adecuada de la imagen del cliente mandante."
                ],
                imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-3-3",
            codigo: "3.3",
            nombre: "Ética Profesional y Confidencialidad",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-3-3-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 3.3: Ética Profesional",
                slideNumber: 1,
                title: "Integridad y Reserva de Información",
                contentBullets: [
                  "Confidencialidad absoluta sobre sistemas de seguridad y claves.",
                  "Cero tolerancia al soborno o cobros indebidos.",
                  "Uso correcto de bienes e instalaciones encomendadas."
                ],
                imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 4: Técnicas de Vigilancia y Pauta de Puesto",
        pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
        subModulos: [
          {
            id: "os10-4-1",
            codigo: "4.1",
            nombre: "Control y Observación en Puestos de Trabajo",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-4-1-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 4.1: Técnicas de Vigilancia",
                slideNumber: 1,
                title: "Rondas e Inspecciones Perimetrales",
                contentBullets: [
                  "Rondas a tiempos impares no predecibles.",
                  "Revisión de vías de escape, portones, luces y cerrojos.",
                  "Detección oportuna de bultos sospechosos o anomalias."
                ],
                imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-4-2",
            codigo: "4.2",
            nombre: "Libro de Novedades e Informes de Seguridad",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-4-2-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 4.2: Registro de Novedades",
                slideNumber: 1,
                title: "Formato Oficial del Libro de Minutas",
                contentBullets: [
                  "Anotación cronológica clara, legible y sin tachaduras.",
                  "Registro de relevos de turno, inventario de equipos e incidentes.",
                  "Firma de entrega y recepción del puesto."
                ],
                imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 5: Seguridad Física de Instalaciones y Accesos",
        pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
        subModulos: [
          {
            id: "os10-5-1",
            codigo: "5.1",
            nombre: "Sistemas de Seguridad Física e Instalaciones",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-5-1-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 5.1: Seguridad Física",
                slideNumber: 1,
                title: "Protección Perimetral y Barreras",
                contentBullets: [
                  "Cierres perimetrales, concertinas y cercos eléctricos.",
                  "Sistemas de iluminación de emergencia e intemperie.",
                  "Zonas de acceso restringido y recintos críticos."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-5-2",
            codigo: "5.2",
            nombre: "Control de Acceso Peatonal y Vehicular",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-5-2-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 5.2: Control de Accesos",
                slideNumber: 1,
                title: "Acreditación y Revisión de Materiales",
                contentBullets: [
                  "Verificación de Cédula de Identidad de visitas.",
                  "Revisión de Guías de Despacho y facturas de carga.",
                  "Inspección visual de vehículos y maleteros autorizados."
                ],
                imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 6: Sistemas de Comunicación y Enlace",
        pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
        subModulos: [
          {
            id: "os10-6-1",
            codigo: "6.1",
            nombre: "Canales y Principios de la Comunicación",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-6-1-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 6.1: Principios Radiocomunicativos",
                slideNumber: 1,
                title: "Elementos de la Transmisión Radial",
                contentBullets: [
                  "Emisor, Mensaje, Canal y Receptor.",
                  "Criterios de Brevedad, Objetividad y Claridad.",
                  "Uso de alfabeto fonético y claves de emergencia."
                ],
                imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-6-2",
            codigo: "6.2",
            nombre: "Equipos Radiocomunicativos VHF/UHF",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-6-2-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 6.2: Equipos Portátiles",
                slideNumber: 1,
                title: "Operación de Radios Portátiles y Carga",
                contentBullets: [
                  "Comprobación de baterías y estado de antena.",
                  "Operación en canal operativo asignado.",
                  "Pruebas de audio diarias al iniciar el servicio."
                ],
                imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 7: Primeros Auxilios",
        pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
        subModulos: [
          {
            id: "os10-7-1",
            codigo: "7.1",
            nombre: "Principios Generales y Protocolo PAS",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-7-1-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 7.1: Protocolo PAS",
                slideNumber: 1,
                title: "Proteger, Avisar (131 SAMU) y Socorrer",
                contentBullets: [
                  "P: Proteger la escena para evitar segundos accidentes.",
                  "A: Avisar inmediatamente a emergencias médicas (131).",
                  "S: Socorrer aplicando primeros auxilios básicos."
                ],
                imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-7-2",
            codigo: "7.2",
            nombre: "Atención de Lesiones, Hemorragias y Quemaduras",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-7-2-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 7.2: Control de Hemorragias",
                slideNumber: 1,
                title: "Compresión Directa y Vendajes",
                contentBullets: [
                  "Presión directa sobre la herida con gasa o compresa limpia.",
                  "Posición lateral de seguridad en víctimas inconscientes que respiran.",
                  "Uso adecuado de los insumos del Botiquín de Emergencia."
                ],
                imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        nombre: "Módulo 8: Defensa Personal y Uso del Bastón",
        pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
        subModulos: [
          {
            id: "os10-8-1",
            codigo: "8.1",
            nombre: "Principios de Defensa Personal y Distancia",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-8-1-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 8.1: Defensa Personal",
                slideNumber: 1,
                title: "Posición de Seguridad y Distancia Crítica",
                contentBullets: [
                  "Mantención de distancia de reacción (1.5 metros).",
                  "Evitación de agresiones físicas e inmovilización defensiva.",
                  "Principio de proporcionalidad ante cualquier amenaza."
                ],
                imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            id: "os10-8-2",
            codigo: "8.2",
            nombre: "Esgrima de Bastón Policial e Inmovilización con Esposas",
            pdfUrl: "/materiales/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf",
            slides: [
              {
                id: "os10-8-2-1",
                courseSlug: "guardia-de-seguridad",
                moduleName: "Módulo 8.2: Bastón y Grilletes",
                slideNumber: 1,
                title: "Empuñadura y Zonas Prohibidas de Impacto",
                contentBullets: [
                  "Técnica de empuñadura recta u oculta paralela al antebrazo.",
                  "Zonas prohibidas: Cabeza, cuello, garganta y columna vertebral.",
                  "Aplicación reglamentaria de grilletes y entrega a Carabineros."
                ],
                imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
              }
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
    modulos: [
      {
        nombre: "Módulo 1: Fundamentos Legales de Operación de CCTV y Alarmas",
        pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
        subModulos: [
          {
            id: "cctv-1-1",
            codigo: "1.1",
            nombre: "Marco Legal y Normativa de Videovigilancia",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-1-1-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 1.1: Normativa Legal CCTV",
                slideNumber: 1,
                title: "Uso Probatorio de Grabaciones y Privacidad",
                contentBullets: [
                  "Límites a la privacidad en lugares de trabajo.",
                  "Custodia y cadena de evidencia en grabaciones de seguridad.",
                  "Acceso autorizado y confidencialidad."
                ],
                imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
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
            nombre: "Sensores, Paneles de Alarma y Detección de Intrusión",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-2-1-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 2.1: Centrales de Alarma",
                slideNumber: 1,
                title: "Monitoreo de Sensores e Incendio",
                contentBullets: [
                  "Operación de paneles contra intrusión e incendio.",
                  "Detección volumétrica PIR y contactos magnéticos.",
                  "Procedimientos ante emergencias y zonas de falla."
                ],
                imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
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
            nombre: "Técnicas de Monitoreo y Manejo de Cámaras PTZ",
            pdfUrl: "/materiales/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf",
            slides: [
              {
                id: "cctv-3-1-1",
                courseSlug: "operador-cctv-y-alarmas",
                moduleName: "Módulo 3.1: Monitoreo PTZ",
                slideNumber: 1,
                title: "Seguimiento Visual en Centrales de Control",
                contentBullets: [
                  "Operación de joystick y rondas virtuales PTZ.",
                  "Coordinación radial con patrullas de terreno.",
                  "Gestión de alertas en consolas multimóvil."
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
