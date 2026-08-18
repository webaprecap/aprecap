/**
 * BANCO DE PREGUNTAS — EXAMEN FINAL CCTV (APRECAP)
 * Preguntas fundamentadas en los MDs del curso (docs/markdown_cursos/2_Operador_CCTV_y_Alarmas),
 * con el marco legal vigente al 18-08-2026 (Ley 21.659, D.S. 209, Ley 19.628/21.719).
 * En cada examen se seleccionan preguntas balanceadas entre módulos y se aleatorian
 * las posiciones de preguntas y opciones en cada intento.
 */

export interface ExamQuestion {
  id: string;
  moduleTitle: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const CCTV_QUESTION_BANK: ExamQuestion[] = [
  // ══════════════════════════════════════════════
  // MÓDULO 1 — Fundamentos legales (1.1–1.7)
  // ══════════════════════════════════════════════
  {
    id: "m1_01",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el marco normativo vigente, la seguridad privada en Chile se rige actualmente por:",
    options: [
      "El Decreto Ley N° 3.607 (1981)",
      "La Ley N° 21.659 (2024) y su reglamento, el Decreto Supremo N° 209",
      "La Ley N° 19.327",
      "El Código de Comercio",
    ],
    correctAnswer:
      "La Ley N° 21.659 (2024) y su reglamento, el Decreto Supremo N° 209",
  },
  {
    id: "m1_02",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question: "La función principal del operador de CCTV y alarmas es:",
    options: [
      "Reparar los equipos de videovigilancia",
      "Controlar, a través de sistemas de circuito cerrado de televisión o de alarmas, la seguridad de una instalación determinada",
      "Administrar el personal de seguridad en terreno",
      "Realizar rondas físicas por el perímetro",
    ],
    correctAnswer:
      "Controlar, a través de sistemas de circuito cerrado de televisión o de alarmas, la seguridad de una instalación determinada",
  },
  {
    id: "m1_03",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el Decreto Supremo N° 41, la conexión de alarmas a la Central de Comunicaciones de Carabineros (CENCO) tiene un cobro por falsa alarma de:",
    options: [
      "0,5 U.F.",
      "1,5 U.F.",
      "3 U.F.",
      "No existe cobro por falsa alarma",
    ],
    correctAnswer: "0,5 U.F.",
  },
  {
    id: "m1_04",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el D.S. N° 1122, en recintos con más de un vigilante privado, el uso de uniforme debe ser:",
    options: [
      "Todos vestidos de uniforme",
      "Al menos uno debe vestir de civil",
      "Solo los supervisores usan uniforme",
      "El uniforme es opcional",
    ],
    correctAnswer: "Al menos uno debe vestir de civil",
  },
  {
    id: "m1_05",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "El dispositivo de alarma de asalto exigido por el D.S. N° 1122 debe ser:",
    options: [
      "Dependiente de las alarmas de incendio",
      "Independiente de las alarmas de incendio o robo, con conexión directa con Carabineros o la PDI",
      "Un botón dentro del sistema de robo",
      "Una alarma sonora local solamente",
    ],
    correctAnswer:
      "Independiente de las alarmas de incendio o robo, con conexión directa con Carabineros o la PDI",
  },
  {
    id: "m1_06",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el D.S. N° 1122, la renta mensual por la conexión de un sistema de alarmas es de:",
    options: ["2,0 U.T.M.", "0,5 U.T.M.", "1,5 U.T.M.", "3,0 U.T.M."],
    correctAnswer: "0,5 U.T.M.",
  },
  {
    id: "m1_07",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "El D.S. N° 1122 exige que las grabaciones de cámaras de alta resolución en entidades de alto riesgo incluyan:",
    options: [
      "Solo la imagen de las cámaras",
      "La digitalización de hora, día, mes y año en las grabaciones",
      "El nombre del operador en pantalla",
      "Una marca de agua con el logo de la empresa",
    ],
    correctAnswer: "La digitalización de hora, día, mes y año en las grabaciones",
  },
  {
    id: "m1_08",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el D.S. N° 1814, el número mínimo de cámaras de televigilancia en un camión blindado es de:",
    options: ["1 cámara", "2 cámaras", "3 cámaras", "5 cámaras"],
    correctAnswer: "3 cámaras",
  },
  {
    id: "m1_09",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Las grabaciones de un camión blindado deben resguardarse como mínimo por:",
    options: [
      "5 días hábiles",
      "15 días hábiles",
      "30 días corridos",
      "90 días hábiles",
    ],
    correctAnswer: "15 días hábiles",
  },
  {
    id: "m1_10",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el D.S. N° 1814, el equipamiento electrónico obligatorio de una bóveda incluye:",
    options: [
      "Pulsadores de asalto ALPHA 2",
      "Cámaras térmicas de largo alcance",
      "Lectores de huella dactilar únicamente",
      "Radios de comunicación abiertos",
    ],
    correctAnswer: "Pulsadores de asalto ALPHA 2",
  },
  {
    id: "m1_11",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "El límite máximo de sonido de la alarma de un cajero automático según el D.S. N° 222 es de:",
    options: ["80 decibeles", "100 decibeles", "120 decibeles", "150 decibeles"],
    correctAnswer: "100 decibeles",
  },
  {
    id: "m1_12",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "La cámara interna tipo pin-hole en un cajero automático tiene por finalidad:",
    options: [
      "Capturar el entorno exterior del cajero",
      "Mostrar el rostro y rasgos físicos de los usuarios",
      "Registrar el conteo de billetes",
      "Vigilar la bóveda central del banco",
    ],
    correctAnswer: "Mostrar el rostro y rasgos físicos de los usuarios",
  },
  {
    id: "m1_13",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Las grabaciones de un cajero automático deben almacenarse como mínimo por:",
    options: [
      "15 días continuos",
      "30 días continuos",
      "45 días continuos",
      "90 días continuos",
    ],
    correctAnswer: "45 días continuos",
  },
  {
    id: "m1_14",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Si un cajero automático sufre un ataque o intento de robo, las grabaciones deben conservarse por:",
    options: [
      "45 días",
      "12 meses",
      "24 meses",
      "5 años",
    ],
    correctAnswer: "24 meses",
  },
  {
    id: "m1_15",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según la Ley N° 19.327, las imágenes de los estadios de fútbol profesional deben almacenarse como mínimo por:",
    options: ["15 días", "30 días", "60 días", "90 días"],
    correctAnswer: "90 días",
  },
  {
    id: "m1_16",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "La cantidad, calidad y posición de las cámaras en un estadio es determinada por:",
    options: [
      "El club local",
      "La Delegación Presidencial o la autoridad correspondiente",
      "La empresa de seguridad privada contratada",
      "El operador de CCTV del recinto",
    ],
    correctAnswer:
      "La Delegación Presidencial o la autoridad correspondiente",
  },
  {
    id: "m1_17",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el principio de proporcionalidad y minimización, el operador NO debe enfocar las cámaras hacia:",
    options: [
      "Las zonas de circulación",
      "Los estacionamientos",
      "Lugares donde las personas tienen expectativa razonable de intimidad (baños, camarines, casilleros)",
      "Los accesos principales",
    ],
    correctAnswer:
      "Lugares donde las personas tienen expectativa razonable de intimidad (baños, camarines, casilleros)",
  },
  {
    id: "m1_18",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "La Ley N° 21.719 (Ley Marco de Protección de Datos Personales) incorpora los derechos ARCOP, que son:",
    options: [
      "Acceso, Rectificación, Cancelación, Oposición y Portabilidad",
      "Auditoría, Registro, Control, Orden y Protección",
      "Acceso, Respaldo, Copia, Oficio y Publicación",
      "Archivo, Revisión, Corrección, Opinión y Permiso",
    ],
    correctAnswer:
      "Acceso, Rectificación, Cancelación, Oposición y Portabilidad",
  },
  {
    id: "m1_19",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "¿A quién corresponde entregar copias de las grabaciones cuando corresponda?",
    options: [
      "A cualquier persona que las solicite",
      "Solo a Carabineros, PDI, Ministerio Público o tribunales, dejando constancia escrita de la entrega",
      "A los medios de comunicación",
      "A las redes sociales de la empresa",
    ],
    correctAnswer:
      "Solo a Carabineros, PDI, Ministerio Público o tribunales, dejando constancia escrita de la entrega",
  },
  {
    id: "m1_20",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question: "Para que una grabación tenga valor probatorio debe ser:",
    options: [
      "Auténtica, íntegra y trazable",
      "Reciente y en color",
      "Compartida y pública",
      "Editada y resumida",
    ],
    correctAnswer: "Auténtica, íntegra y trazable",
  },
  {
    id: "m1_21",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según la regla de oro del Módulo 1, para efectos de la investigación:",
    options: [
      "Lo que no se documenta ni se registra, no existe",
      "Basta con la memoria del operador",
      "Las grabaciones son opcionales si hay testigos",
      "El informe se puede elaborar días después",
    ],
    correctAnswer: "Lo que no se documenta ni se registra, no existe",
  },

  // ══════════════════════════════════════════════
  // MÓDULO 2 — Sistemas electrónicos de seguridad privada (2.1–2.7)
  // ══════════════════════════════════════════════
  {
    id: "m2_01",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "La tecnología de tarjetas RFID (proximidad) se caracteriza por:",
    options: [
      "Usar una banda magnética grabada",
      "Captar la frecuencia de resonancia propia de la tarjeta al aproximarse al lector",
      "Escanear códigos de barras con luz infrarroja",
      "Usar hilos metálicos incrustados en el plástico",
    ],
    correctAnswer:
      "Captar la frecuencia de resonancia propia de la tarjeta al aproximarse al lector",
  },
  {
    id: "m2_02",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "El sistema antipass-back tiene por objetivo:",
    options: [
      "Acelerar el flujo de personas",
      "Evitar que dos personas ingresen con la misma tarjeta",
      "Permitir el ingreso sin tarjeta",
      "Registrar la hora de salida solamente",
    ],
    correctAnswer: "Evitar que dos personas ingresen con la misma tarjeta",
  },
  {
    id: "m2_03",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question:
      "El flujo normal de una puerta con control de acceso es de aproximadamente:",
    options: [
      "1 a 5 personas por minuto",
      "6 a 20 personas por minuto",
      "30 a 50 personas por minuto",
      "60 a 80 personas por minuto",
    ],
    correctAnswer: "6 a 20 personas por minuto",
  },
  {
    id: "m2_04",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Un ejemplo de tecnología biométrica de identificación es:",
    options: [
      "La banda magnética",
      "La huella digital y la geometría de mano",
      "El código de barras",
      "La tarjeta Wiegand",
    ],
    correctAnswer: "La huella digital y la geometría de mano",
  },
  {
    id: "m2_05",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "La capacidad operativa de una exclusa giratoria automática es de:",
    options: [
      "5 personas por minuto",
      "10 personas por minuto",
      "Hasta 20 personas por minuto en ambos sentidos",
      "50 personas por minuto",
    ],
    correctAnswer: "Hasta 20 personas por minuto en ambos sentidos",
  },
  {
    id: "m2_06",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Los sensores pasivos PIR se caracterizan por:",
    options: [
      "Emitir un haz de luz infrarroja continuo",
      "Medir la radiación infrarroja emitida por cuerpos en movimiento, sin emitir energía propia",
      "Detectar metales mediante campo electromagnético",
      "Medir la temperatura ambiente",
    ],
    correctAnswer:
      "Medir la radiación infrarroja emitida por cuerpos en movimiento, sin emitir energía propia",
  },
  {
    id: "m2_07",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Una causa frecuente de falsas alarmas en sensores PIR es:",
    options: [
      "La baja resolución de la cámara",
      "Fuentes de calor cercanas, mascotas y corrientes de aire",
      "La falta de batería",
      "El exceso de iluminación artificial",
    ],
    correctAnswer: "Fuentes de calor cercanas, mascotas y corrientes de aire",
  },
  {
    id: "m2_08",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "En una central de alarmas, el cerebro del sistema es:",
    options: [
      "El comunicador telefónico",
      "El panel principal de control (CPU)",
      "La sirena exterior",
      "El teclado de operación",
    ],
    correctAnswer: "El panel principal de control (CPU)",
  },
  {
    id: "m2_09",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "La ventaja de los sistemas de alarmas direccionables es que:",
    options: [
      "Solo detectan incendios",
      "Identifican cada dispositivo individualmente, acelerando la localización del evento",
      "No requieren batería de respaldo",
      "Funcionan sin panel de control",
    ],
    correctAnswer:
      "Identifican cada dispositivo individualmente, acelerando la localización del evento",
  },
  {
    id: "m2_10",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "El voltaje de la red eléctrica domiciliaria en Chile es de:",
    options: ["12 V CC", "24 V CC", "220 V CA", "110 V CA"],
    correctAnswer: "220 V CA",
  },
  {
    id: "m2_11",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "La tecnología PoE (Power over Ethernet) permite:",
    options: [
      "Transmitir energía y datos por un mismo cable de red",
      "Aumentar la resolución de la cámara",
      "Conectar cámaras sin cables",
      "Grabar en la nube automáticamente",
    ],
    correctAnswer: "Transmitir energía y datos por un mismo cable de red",
  },
  {
    id: "m2_12",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "La señal de video emitida por una cámara es de aproximadamente:",
    options: [
      "1 a 1,2 voltios pico a pico",
      "12 voltios pico a pico",
      "0,1 voltios pico a pico",
      "220 voltios pico a pico",
    ],
    correctAnswer: "1 a 1,2 voltios pico a pico",
  },
  {
    id: "m2_13",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "El QUAD en un sistema CCTV permite:",
    options: [
      "Mostrar una cámara a la vez",
      "Dividir la pantalla en cuatro cuadrantes mostrando cuatro cámaras simultáneamente",
      "Grabar en cinta magnética",
      "Ampliar el zoom de una cámara",
    ],
    correctAnswer:
      "Dividir la pantalla en cuatro cuadrantes mostrando cuatro cámaras simultáneamente",
  },
  {
    id: "m2_14",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "La sensibilidad de una cámara se mide en:",
    options: ["Lúmenes", "Lux", "Watts", "Decibeles"],
    correctAnswer: "Lux",
  },
  {
    id: "m2_15",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Un lente gran angular se caracteriza por:",
    options: [
      "Tener una distancia focal larga",
      "Cubrir un campo amplio con distancia focal corta",
      "Ser exclusivo de cámaras domo",
      "No requerir iris",
    ],
    correctAnswer: "Cubrir un campo amplio con distancia focal corta",
  },
  {
    id: "m2_16",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Una ventaja de las cámaras domo es que:",
    options: [
      "El sospechoso no puede determinar hacia dónde apunta la cámara",
      "Solo funcionan de noche",
      "No necesitan cableado",
      "Grabación en cinta magnética",
    ],
    correctAnswer:
      "El sospechoso no puede determinar hacia dónde apunta la cámara",
  },
  {
    id: "m2_17",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "El auto iris de un lente ajusta la apertura:",
    options: [
      "Manual y fija según instalación",
      "Automáticamente en proporción directa al voltaje de la señal de video de salida",
      "Según la hora del día",
      "Solo al iniciar la grabación",
    ],
    correctAnswer:
      "Automáticamente en proporción directa al voltaje de la señal de video de salida",
  },
  {
    id: "m2_18",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "El método de transmisión ideal para grandes distancias y ambientes con alta interferencia es:",
    options: ["El cable coaxial", "El par trenzado UTP", "La fibra óptica", "La línea telefónica"],
    correctAnswer: "La fibra óptica",
  },
  {
    id: "m2_19",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "La diferencia entre un DVR y un NVR es que:",
    options: [
      "El DVR graba en cinta y el NVR en disco",
      "El DVR gestiona cámaras analógicas y el NVR gestiona cámaras IP conectadas a la red",
      "El NVR es más antiguo",
      "No tienen diferencias",
    ],
    correctAnswer:
      "El DVR gestiona cámaras analógicas y el NVR gestiona cámaras IP conectadas a la red",
  },
  {
    id: "m2_20",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Según la norma NFPA-72, los detectores automáticos de fuego están diseñados para:",
    options: [
      "Extinguir el incendio",
      "Detectar la presencia de fuego e iniciar una acción",
      "Evacuar el edificio automáticamente",
      "Proteger las cámaras del humo",
    ],
    correctAnswer: "Detectar la presencia de fuego e iniciar una acción",
  },
  {
    id: "m2_21",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Para que exista fuego se requiere el triángulo del fuego, compuesto por:",
    options: [
      "Combustible, oxígeno y calor",
      "Luz, calor y humo",
      "Gas, chispa y viento",
      "Madera, plástico y papel",
    ],
    correctAnswer: "Combustible, oxígeno y calor",
  },
  {
    id: "m2_22",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Durante un incendio, queda prohibido el uso de:",
    options: ["Las escaleras", "Los ascensores", "Las salidas de emergencia", "Los extintores"],
    correctAnswer: "Los ascensores",
  },

  // ══════════════════════════════════════════════
  // MÓDULO 3 — Televigilancia y operación de centro de control (3.1–3.8)
  // ══════════════════════════════════════════════
  {
    id: "m3_01",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question:
      "Según la política de seguridad, la prioridad absoluta del operador es:",
    options: [
      "La protección de los bienes materiales",
      "La seguridad y protección de la vida e integridad física de trabajadores, clientes y usuarios",
      "La continuidad operativa del sistema",
      "El cumplimiento de los horarios",
    ],
    correctAnswer:
      "La seguridad y protección de la vida e integridad física de trabajadores, clientes y usuarios",
  },
  {
    id: "m3_02",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "Entre las funciones del centro de control se encuentra:",
    options: [
      "Vigilancia remota en tiempo real y coordinación radial con el personal de terreno",
      "La reparación de cámaras en terreno",
      "La venta de equipos de seguridad",
      "La elaboración de las directivas del cliente",
    ],
    correctAnswer:
      "Vigilancia remota en tiempo real y coordinación radial con el personal de terreno",
  },
  {
    id: "m3_03",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "El robo por sorpresa o lanzazo se concentra en horarios:",
    options: [
      "Solo nocturnos",
      "Peak: 07:00–10:00, 12:00–14:00 y 18:00–20:00",
      "Solo de madrugada",
      "No tiene horarios definidos",
    ],
    correctAnswer: "Peak: 07:00–10:00, 12:00–14:00 y 18:00–20:00",
  },
  {
    id: "m3_04",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "El análisis de riesgos debe priorizar las medidas:",
    options: [
      "Según el costo de implementación",
      "Según impacto y probabilidad, protegiendo primero la vida y luego los bienes",
      "Según la preferencia del cliente",
      "Al azar",
    ],
    correctAnswer:
      "Según impacto y probabilidad, protegiendo primero la vida y luego los bienes",
  },
  {
    id: "m3_05",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "El CCTV cumple una doble función:",
    options: [
      "Disuasión y evidencia",
      "Iluminación y sonido",
      "Comunicación y registro",
      "Prevención y extinción",
    ],
    correctAnswer: "Disuasión y evidencia",
  },
  {
    id: "m3_06",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "Para zonas de circulación con personas en movimiento, lo recomendado es:",
    options: [
      "Cámaras fijas de alta resolución",
      "Cámaras móviles PTZ o autodomos",
      "Solo sensores de movimiento",
      "Cámaras ocultas pin-hole",
    ],
    correctAnswer: "Cámaras móviles PTZ o autodomos",
  },
  {
    id: "m3_07",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "La altura mínima de montaje de cámaras fijas para impedir manipulación es de:",
    options: ["1,5 metros", "2,0 metros", "Superior a 2,3 metros", "3,5 metros"],
    correctAnswer: "Superior a 2,3 metros",
  },
  {
    id: "m3_08",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "La cámara cenital para mesas de juego y cajas de dinero se posiciona en ángulo de:",
    options: ["30 grados", "45 grados", "90 grados perpendicular al plano de trabajo", "180 grados"],
    correctAnswer: "90 grados perpendicular al plano de trabajo",
  },
  {
    id: "m3_09",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "Al inicio del turno, el operador debe verificar:",
    options: [
      "Solo la cantidad de monitores",
      "El funcionamiento de monitores, grabadores y cámaras, y confirmar la hora y fecha del sistema",
      "Las redes sociales de la empresa",
      "El inventario de extintores",
    ],
    correctAnswer:
      "El funcionamiento de monitores, grabadores y cámaras, y confirmar la hora y fecha del sistema",
  },
  {
    id: "m3_10",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "La primera prioridad de la respuesta ante un evento es:",
    options: [
      "Proteger los bienes",
      "Proteger la vida e integridad de las personas",
      "Preservar la evidencia",
      "Informar al supervisor",
    ],
    correctAnswer: "Proteger la vida e integridad de las personas",
  },
  {
    id: "m3_11",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "Una buena práctica de ciberseguridad para el operador es:",
    options: [
      "Compartir las claves con el turno siguiente",
      "Cambiar las claves por defecto de cámaras, grabadores y routers, y usar contraseñas largas y únicas",
      "Conectar las cámaras a internet sin protección",
      "Desactivar las actualizaciones de firmware",
    ],
    correctAnswer:
      "Cambiar las claves por defecto de cámaras, grabadores y routers, y usar contraseñas largas y únicas",
  },
  {
    id: "m3_12",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "La segmentación de red en videovigilancia consiste en:",
    options: [
      "Unir la red de cámaras con la red administrativa",
      "Separar la red de videovigilancia de la red administrativa",
      "Conectar todas las cámaras en cadena",
      "Usar un solo router para todo",
    ],
    correctAnswer: "Separar la red de videovigilancia de la red administrativa",
  },
  {
    id: "m3_13",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "La detección de movimiento como analítica de video sirve para:",
    options: [
      "Reemplazar al operador",
      "Alertar automáticamente ante cambios relevantes en la escena, reduciendo la fatiga del operador",
      "Mejorar la resolución de las cámaras",
      "Grabar en cinta magnética",
    ],
    correctAnswer:
      "Alertar automáticamente ante cambios relevantes en la escena, reduciendo la fatiga del operador",
  },
  {
    id: "m3_14",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question:
      "El uso de reconocimiento facial en videovigilancia está restringido porque:",
    options: [
      "Es caro de implementar",
      "El rostro es un dato personal sensible y su uso exige base legal clara, proporcionalidad y, según el caso, autorización",
      "Las cámaras no pueden capturar rostros",
      "No está regulado en Chile",
    ],
    correctAnswer:
      "El rostro es un dato personal sensible y su uso exige base legal clara, proporcionalidad y, según el caso, autorización",
  },
  {
    id: "m3_15",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "Las alertas generadas por IA en videovigilancia deben ser:",
    options: [
      "La decisión final del sistema",
      "Un apoyo a la decisión humana: el operador siempre verifica y decide",
      "Ignoradas por el operador",
      "Aplicadas solo de noche",
    ],
    correctAnswer:
      "Un apoyo a la decisión humana: el operador siempre verifica y decide",
  },
  {
    id: "m3_16",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "Ante un artefacto sospechoso, el operador debe:",
    options: [
      "Moverlo a un lugar seguro",
      "No tocar ni mover el objeto, aislar y evacuar la zona según el protocolo",
      "Cubrirlo con una manta",
      "Registrarlo de cerca con el celular",
    ],
    correctAnswer:
      "No tocar ni mover el objeto, aislar y evacuar la zona según el protocolo",
  },
  {
    id: "m3_17",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "La custodia digital de la evidencia exige en primer lugar:",
    options: [
      "Compartir el video en redes internas",
      "Bloquear la sobrescritura para que las grabaciones del incidente no se pierdan por la grabación cíclica",
      "Borrar el material antiguo",
      "Entregar el original a la policía de inmediato",
    ],
    correctAnswer:
      "Bloquear la sobrescritura para que las grabaciones del incidente no se pierdan por la grabación cíclica",
  },
  {
    id: "m3_18",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "Ante un asalto, el operador de CCTV debe:",
    options: [
      "Salir a enfrentar a los asaltantes",
      "No exponerse; observar y describir, avisar a Carabineros y a la jefatura, y preservar las grabaciones",
      "Apagar las cámaras",
      "Llamar al gerente para decidir",
    ],
    correctAnswer:
      "No exponerse; observar y describir, avisar a Carabineros y a la jefatura, y preservar las grabaciones",
  },
  {
    id: "m3_19",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "El seguimiento visual durante un incidente permite:",
    options: [
      "Reportar posición, cantidad y desplazamiento de personas o del evento",
      "Determinar el origen de las alarmas automáticamente",
      "Reemplazar el informe final",
      "Evitar llamar a la policía",
    ],
    correctAnswer:
      "Reportar posición, cantidad y desplazamiento de personas o del evento",
  },
  {
    id: "m3_20",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "Después de una crisis, el operador debe:",
    options: [
      "Retomar las operaciones sin más",
      "Elaborar el informe completo del incidente y analizar las lecciones aprendidas proponiendo mejoras",
      "Borrar las grabaciones del evento",
      "Esperar instrucciones del tribunal",
    ],
    correctAnswer:
      "Elaborar el informe completo del incidente y analizar las lecciones aprendidas proponiendo mejoras",
  },
];

/**
 * Selecciona preguntas balanceadas entre todos los módulos.
 * Reparte una base por módulo y distribuye el remanente de forma aleatoria,
 * barajando también el orden final de las preguntas.
 */
export function selectBalancedQuestions(totalQuestions = 60): ExamQuestion[] {
  const byModule: Record<string, ExamQuestion[]> = {};
  for (const q of CCTV_QUESTION_BANK) {
    if (!byModule[q.moduleTitle]) byModule[q.moduleTitle] = [];
    byModule[q.moduleTitle].push(q);
  }

  const moduleKeys = Object.keys(byModule);
  if (moduleKeys.length === 0) return [];

  const basePerModule = Math.floor(totalQuestions / moduleKeys.length);
  let remainder = totalQuestions % moduleKeys.length;

  const selected: ExamQuestion[] = [];

  for (const moduleKey of moduleKeys) {
    const moduleQuestions = byModule[moduleKey];
    const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
    const take = Math.min(shuffled.length, basePerModule + (remainder > 0 ? 1 : 0));
    selected.push(...shuffled.slice(0, take));
    if (remainder > 0) remainder--;
  }

  if (selected.length < totalQuestions) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const remainingPool = CCTV_QUESTION_BANK.filter((q) => !selectedIds.has(q.id)).sort(
      () => Math.random() - 0.5
    );
    selected.push(...remainingPool.slice(0, totalQuestions - selected.length));
  }

  return selected.sort(() => Math.random() - 0.5).slice(0, totalQuestions);
}

/** Baraja el orden de las opciones de cada pregunta (Fisher-Yates). */
export function shuffleOptions(question: ExamQuestion): ExamQuestion {
  const options = [...question.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { ...question, options };
}

export function getPreguntasPorModulo(moduloIdx: number): ExamQuestion[] {
  const titulos = CCTV_QUESTION_BANK.map((q) => q.moduleTitle).filter(
    (t, i, arr) => arr.indexOf(t) === i
  );
  const titulo = titulos[moduloIdx];
  return titulo ? CCTV_QUESTION_BANK.filter((q) => q.moduleTitle === titulo) : [];
}

import type { PreguntaAlternativa } from "./types";

/** Convierte preguntas del banco CCTV al formato del MiniQuiz (alternativas). */
export function getMiniQuizBancoCctv(moduloIdx: number): PreguntaAlternativa[] {
  return getPreguntasPorModulo(moduloIdx).map((q) => ({
    id: q.id,
    pregunta: q.question,
    opciones: q.options,
    respuestaCorrecta: q.correctAnswer,
    explicacion: "",
  }));
}

export const MINIQUIZ_PREGUNTAS_CCTV = 5;
export const EXAMEN_FINAL_PREGUNTAS_CCTV = 60;
export const EXAMEN_FINAL_UMBRAL_CCTV = 80;