/**
 * BANCO DE PREGUNTAS — EXAMEN FINAL CCTV (APRECAP)
 * Preguntas fundamentadas en los MDs del curso (docs/markdown_cursos/2_Operador_CCTV_y_Alarmas),
 * con el marco legal vigente al 18-08-2026 (Ley 21.659, D.S. 209, Ley 19.628/21.719).
 * En cada examen se seleccionan preguntas balanceadas entre módulos y se aleatorian
 * las posiciones de preguntas y opciones en cada intento.
 */

import type { PreguntaAlternativa } from "./types";

export interface ExamQuestion {
  id: string;
  moduleTitle: string;
  question: string;
  options: string[];
  correctAnswer: string;
  /** Fundamenta la respuesta correcta y explica por qué las demás opciones están mal. */
  explicacion: string;
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
    explicacion:
      "El marco vigente de la seguridad privada es la Ley N° 21.659 (2024) y su reglamento, el D.S. N° 209, que reemplazaron el antiguo régimen. El DL N° 3.607 (1981) fue derogado, por lo que ya no rige; la Ley N° 19.327 solo regula la seguridad en espectáculos de fútbol profesional; y el Código de Comercio no regula la seguridad privada.",
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
    explicacion:
      "La definición legal del operador es controlar, mediante CCTV o alarmas, la seguridad de una instalación determinada. Reparar equipos corresponde al personal técnico; administrar personal en terreno es función de supervisores o jefes de turno; y las rondas físicas son tareas del personal de terreno, no del operador de sala.",
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
    explicacion:
      "El D.S. N° 41 fija el cobro por cada falsa alarma en 0,5 U.F., que ingresa al Fondo Rotativo de Abastecimiento de Carabineros. La renta mensual por cada 100 usuarios es 3 U.F. (no es cobro por falsa alarma), 1,5 U.F. es el valor de falsa alarma del D.S. N° 1122 en U.T.M., y el cobro sí existe por expresa disposición del decreto.",
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
    explicacion:
      "El D.S. N° 1122 dispone que, en recintos con más de un vigilante, al menos uno debe vestir de civil (si hay un solo vigilante, este vestirá de uniforme). Por lo tanto, que todos usen uniforme, que solo los supervisores lo usen o que sea opcional contradicen la norma.",
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
    explicacion:
      "El D.S. N° 1122 exige que la alarma de asalto sea independiente de las alarmas de incendio o robo, con conexión directa a la Central de Comunicaciones de Carabineros o de la PDI y activación remota o manual. Depender de otras alarmas, integrarla al sistema de robo o tener solo sonido local no cumple la norma.",
  },
  {
    id: "m1_06",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el D.S. N° 1122, la renta mensual por la conexión de un sistema de alarmas es de:",
    options: ["2,0 U.T.M.", "0,5 U.T.M.", "1,5 U.T.M.", "3,0 U.T.M."],
    correctAnswer: "0,5 U.T.M.",
    explicacion:
      "El régimen tarifario del D.S. N° 1122 establece: conexión inicial o reconexión 2,0 U.T.M., renta mensual 0,5 U.T.M. y falsa alarma 1,5 U.T.M. Por eso la renta mensual es 0,5 U.T.M.; las otras cifras corresponden a otros conceptos de la misma norma.",
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
    explicacion:
      "El Artículo 17° del D.S. N° 1122 exige, en entidades de alto riesgo, que las grabaciones de alta resolución incluyan la digitalización de hora, día, mes y año, además del funcionamiento continuo desde 15 minutos antes hasta 60 minutos después del horario de atención. Solo la imagen, el nombre del operador o una marca de agua no son exigencias normativas.",
  },
  {
    id: "m1_08",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según el D.S. N° 1814, el número mínimo de cámaras de televigilancia en un camión blindado es de:",
    options: ["1 cámara", "2 cámaras", "3 cámaras", "5 cámaras"],
    correctAnswer: "3 cámaras",
    explicacion:
      "El D.S. N° 1814 exige al menos 3 cámaras de alta resolución por camión blindado: 2 interiores (cabina y habitáculo de tripulación) y 1 exterior. 1 o 2 cámaras quedan bajo el mínimo legal y 5 cámaras no es el mínimo establecido por la norma.",
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
    explicacion:
      "El D.S. N° 1814 fija un resguardo mínimo de 15 días hábiles para las grabaciones de camiones blindados (y 1 año en caso de comisión de delitos). 5 días es insuficiente, 30 días corridos es el plazo de las bóvedas (no de camiones) y 90 días hábiles corresponde a los estadios de la Ley N° 19.327.",
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
    explicacion:
      "El D.S. N° 1814 (Artículos 17° y 18°) obliga en bóvedas a sensores de alarma y control de acceso, cerraduras electrónicas con retardo y bloqueo horario, pulsadores de asalto ALPHA 2 y detectores de humo, calor y vibración estructural. Las cámaras térmicas, los lectores de huella como único medio o los radios abiertos no son parte del equipamiento obligatorio.",
  },
  {
    id: "m1_11",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "El límite máximo de sonido de la alarma de un cajero automático según el D.S. N° 222 es de:",
    options: ["80 decibeles", "100 decibeles", "120 decibeles", "150 decibeles"],
    correctAnswer: "100 decibeles",
    explicacion:
      "El D.S. N° 222 limita la alarma sonora del cajero automático a un máximo de 100 decibeles, monitoreada en línea 24/7. 80 decibeles está bajo el máximo permitido (la norma no exige un mínimo sonoro mayor), y 120 o 150 decibeles superan el límite legal.",
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
    explicacion:
      "Según el Artículo 10° del D.S. N° 222, la cámara interna pin-hole muestra el rostro y rasgos físicos de los usuarios e interactuantes, mientras que la cámara externa captura el entorno y las actividades alrededor del cajero. No registra conteo de billetes ni vigila bóvedas centrales.",
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
    explicacion:
      "El D.S. N° 222 exige un almacenamiento mínimo de 45 días continuos en condiciones normales (24 meses si el cajero sufre un ataque o intento de robo). 15 o 30 días quedan bajo el mínimo y 90 días es un plazo mayor que la norma, pero no es el mínimo exigido.",
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
    explicacion:
      "El D.S. N° 222 dispone que, ante un ataque o intento de robo, las grabaciones deben conservarse por 24 meses obligatorios. 45 días es el plazo normal sin incidentes, y 12 meses o 5 años no son los plazos que fija la norma para este caso.",
  },
  {
    id: "m1_15",
    moduleTitle: "Módulo 1 — Fundamentos Legales de Operación de CCTV y Alarmas",
    question:
      "Según la Ley N° 19.327, las imágenes de los estadios de fútbol profesional deben almacenarse como mínimo por:",
    options: ["15 días", "30 días", "60 días", "90 días"],
    correctAnswer: "90 días",
    explicacion:
      "La Ley N° 19.327 exige un almacenamiento mínimo de 90 días de las imágenes de los estadios de fútbol profesional, para fines probatorios judiciales. 15, 30 o 60 días quedan por debajo del plazo obligatorio.",
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
    explicacion:
      "El Artículo 5° de la Ley N° 19.327 dispone que la cantidad, calidad y posición de las cámaras es determinada por la Delegación Presidencial o la autoridad correspondiente. Ni el club, ni la empresa de seguridad ni el operador tienen esa facultad.",
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
    explicacion:
      "El principio de proporcionalidad y minimización prohíbe enfocar cámaras hacia lugares con expectativa razonable de intimidad (baños, camarines, casilleros), salvo justificación legal muy calificada. Las zonas de circulación, estacionamientos y accesos principales son espacios legítimos de vigilancia para fines de seguridad.",
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
    explicacion:
      "Los derechos ARCOP incorporados por la Ley N° 21.719 son Acceso, Rectificación, Cancelación, Oposición y Portabilidad. Las demás combinaciones de letras no corresponden a derechos contemplados en la ley.",
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
    explicacion:
      "Las copias de grabaciones solo se entregan a Carabineros, PDI, Ministerio Público o tribunales cuando corresponda, dejando constancia escrita de la entrega (fecha, hora, persona, cámara y tramo horario). Entregarlas a cualquier persona, a medios de comunicación o a redes sociales vulnera la protección de datos y la confidencialidad del operador.",
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
    explicacion:
      "Una grabación tiene valor probatorio si es auténtica (proviene del sistema con fecha y hora confiables), íntegra (sin alteraciones, ediciones ni fragmentaciones) y trazable (permite demostrar quién la manipuló y cuándo). Ser reciente y en color no garantiza validez; una grabación editada, compartida o publicada pierde su valor probatorio.",
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
    explicacion:
      "La regla de oro del Módulo 1 señala que todo hecho relevante debe quedar documentado por escrito y respaldado por la grabación: lo que no se documenta ni se registra, para la investigación no existe. La memoria del operador no reemplaza el registro, las grabaciones son el respaldo principal aunque haya testigos, y el informe debe elaborarse de inmediato mientras los hechos están frescos.",
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
    explicacion:
      "Las tarjetas RFID (proximidad) funcionan sin contacto: el lector capta la frecuencia de resonancia propia de la tarjeta al aproximarla. La banda magnética es una tecnología de lectura por contacto y deslizamiento, el código de barras se lee ópticamente y los hilos metálicos son propios de tarjetas anticlips o de tecnología Wiegand.",
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
    explicacion:
      "El antipass-back impide que una misma tarjeta sea reutilizada para el ingreso de dos personas: exige que la tarjeta registre una salida antes de poder ingresar nuevamente. No acelera el flujo, no permite el ingreso sin credencial y el registro de salida es un medio del sistema, no su objetivo.",
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
    explicacion:
      "El flujo normal de una puerta con control de acceso es de 6 a 20 personas por minuto. 1 a 5 personas por minuto corresponde a sistemas más lentos como torniquetes manuales; y 30 a 80 personas por minuto superan la capacidad de una puerta de control de acceso convencional.",
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
    explicacion:
      "La biometría identifica a la persona por sus rasgos fisiológicos: la huella digital y la geometría de mano son ejemplos clásicos. La banda magnética, el código de barras y la tarjeta Wiegand son tecnologías de credenciales y tarjetas, no biométricas.",
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
    explicacion:
      "La exclusa giratoria automática tiene una capacidad de flujo continuo de hasta 20 personas por minuto en ambos sentidos. 5 y 10 personas por minuto corresponden a sistemas más lentos (torniquetes manuales o puertas de acceso simple), y 50 personas por minuto excede la capacidad de este sistema.",
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
    explicacion:
      "Los sensores PIR son pasivos: detectan la radiación infrarroja que emiten los cuerpos en movimiento (como el calor corporal) sin emitir energía propia. El haz infrarrojo continuo es característico de las barreras activas fotoeléctricas; la detección de metales usa campo electromagnético y un sensor de temperatura no detecta movimiento.",
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
    explicacion:
      "Como el PIR reacciona a cambios de radiación infrarroja, las fuentes de calor cercanas, las mascotas y las corrientes de aire caliente generan falsas detecciones. La resolución de una cámara no afecta a un sensor infrarrojo, la falta de batería provoca fallas de funcionamiento (no falsas alarmas) y la iluminación artificial no es detectada por el PIR.",
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
    explicacion:
      "El panel principal de control (CPU) es el cerebro del sistema: recibe las señales de los sensores, procesa la información y ordena las respuestas. El comunicador telefónico solo transmite avisos a la central de monitoreo, la sirena es el avisador de salida y el teclado es la interfaz de operación del usuario.",
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
    explicacion:
      "En un sistema direccionable, cada detector tiene una dirección propia, por lo que el panel identifica exactamente qué dispositivo se activó y acelera la localización del evento. No se limitan a incendios (pueden cubrir intrusiones), y todo sistema de alarma requiere batería de respaldo y panel de control.",
  },
  {
    id: "m2_10",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "El voltaje de la red eléctrica domiciliaria en Chile es de:",
    options: ["12 V CC", "24 V CC", "220 V CA", "110 V CA"],
    correctAnswer: "220 V CA",
    explicacion:
      "La red eléctrica domiciliaria chilena entrega corriente alterna de 220 V CA. Los 12 V CC y 24 V CC son tensiones de alimentación de equipos electrónicos (cámaras, paneles, cerraduras), y 110 V CA es el estándar de otros países, no de Chile.",
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
    explicacion:
      "PoE transmite la alimentación eléctrica y los datos por un mismo cable de red, simplificando la instalación de cámaras IP. No mejora la resolución de imagen, no elimina el cableado (sigue siendo por cable) ni equivale a una grabación en nube automática.",
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
    explicacion:
      "La señal de video compuesto de una cámara es del orden de 1 a 1,2 voltios pico a pico: es una señal débil y sensible a interferencias. 12 voltios es la tensión de alimentación de la cámara (no de la señal), y 0,1 o 220 voltios no corresponden a una señal de video.",
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
    explicacion:
      "El QUAD divide la pantalla en cuatro cuadrantes para mostrar cuatro cámaras al mismo tiempo. Mostrar una cámara por vez es el modo de visualización normal sin QUAD; la grabación en cinta corresponde a videograbadoras y el zoom es función del lente o de la cámara PTZ.",
  },
  {
    id: "m2_14",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "La sensibilidad de una cámara se mide en:",
    options: ["Lúmenes", "Lux", "Watts", "Decibeles"],
    correctAnswer: "Lux",
    explicacion:
      "La sensibilidad de una cámara se mide en lux (iluminancia): a menor cantidad de luz, se requiere mayor sensibilidad. Los lúmenes miden el flujo luminoso que emite una fuente, los watts miden potencia eléctrica y los decibeles miden nivel sonoro.",
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
    explicacion:
      "El lente gran angular cubre un campo visual amplio gracias a su distancia focal corta. La distancia focal larga es propia de los teleobjetivos; no es exclusivo de cámaras domo, y todos los lentes para exterior requieren iris (manual o auto).",
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
    explicacion:
      "La cámara domo tiene una cubierta oscura que impide saber hacia dónde apunta, lo que refuerza la disuasión. No funcionan solo de noche (operan día y noche), sí requieren cableado de alimentación y video, y no usan cinta magnética.",
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
    explicacion:
      "El auto iris ajusta automáticamente la apertura del lente en proporción directa al voltaje de la señal de video de salida (muestreo de video), ideal para ambientes con luz variable. No es manual ni fijo, no depende de la hora del día y actúa de forma continua, no solo al grabar.",
  },
  {
    id: "m2_18",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "El método de transmisión ideal para grandes distancias y ambientes con alta interferencia es:",
    options: ["El cable coaxial", "El par trenzado UTP", "La fibra óptica", "La línea telefónica"],
    correctAnswer: "La fibra óptica",
    explicacion:
      "La fibra óptica transmite por luz, sin interferencia electromagnética y con mínima pérdida en grandes distancias. El coaxial y el UTP se degradan con la distancia y son sensibles a interferencias, y la línea telefónica no es un medio para transmitir video de videovigilancia.",
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
    explicacion:
      "El DVR (grabador digital de video) gestiona cámaras analógicas y el NVR (grabador de red) gestiona cámaras IP conectadas a la red. Ambos graban en disco, el NVR es la tecnología más nueva y sí existen diferencias sustanciales entre ambos.",
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
    explicacion:
      "La norma NFPA-72 define que los detectores automáticos de fuego están diseñados para detectar la presencia de fuego e iniciar una acción, pudiendo activar sistemas de alarma, extinción y control. No extinguen por sí solos, no evacuan automáticamente y no protegen equipos como cámaras.",
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
    explicacion:
      "El triángulo del fuego está compuesto por combustible, oxígeno y calor: sin uno de estos tres elementos el fuego no se inicia o se extingue. La luz y el humo son efectos del fuego, no sus elementos; el gas y la chispa son posibles fuentes de ignición, y los materiales son solo ejemplos de combustible.",
  },
  {
    id: "m2_22",
    moduleTitle: "Módulo 2 — Sistemas Electrónicos de Seguridad Privada",
    question: "Durante un incendio, queda prohibido el uso de:",
    options: ["Las escaleras", "Los ascensores", "Las salidas de emergencia", "Los extintores"],
    correctAnswer: "Los ascensores",
    explicacion:
      "Durante un incendio está prohibido usar ascensores: pueden detenerse por corte de energía o quedar atrapados. Las escaleras y salidas de emergencia son las vías de evacuación correctas, y los extintores son el medio de combate inicial del fuego.",
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
    explicacion:
      "La política de seguridad establece como prioridad absoluta la vida e integridad física de las personas (trabajadores, clientes y usuarios). La protección de bienes, la continuidad operativa y los horarios son objetivos secundarios que nunca están por sobre la vida humana.",
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
    explicacion:
      "El centro de control vigila remotamente en tiempo real y coordina por radio con el personal de terreno. La reparación de cámaras corresponde al personal técnico, la venta de equipos es comercial y las directivas del cliente las elabora el propio cliente o la empresa que presta el servicio.",
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
    explicacion:
      "El robo por sorpresa (lanzazo) se concentra en los horarios peak de mayor afluencia: 07:00–10:00, 12:00–14:00 y 18:00–20:00. No es solo nocturno ni de madrugada, y sí tiene horarios definidos por el análisis delictual.",
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
    explicacion:
      "El análisis de riesgos prioriza las medidas según su impacto y probabilidad, protegiendo primero la vida de las personas y luego los bienes. El costo, la preferencia del cliente o el azar no son criterios técnicos de priorización del riesgo.",
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
    explicacion:
      "El CCTV cumple una doble función: disuasión (previene conductas delictivas al ser visible) y evidencia (registra los hechos para usarlos como prueba). No ilumina, no emite sonido, no es un medio de comunicación y no extingue incendios.",
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
    explicacion:
      "Para zonas de circulación se recomiendan cámaras móviles PTZ o autodomos, que actúan como satélites de vigilancia siguiendo a las personas en movimiento. Las cámaras fijas cubren un solo ángulo, los sensores de movimiento no graban y las pin-hole son ocultas para casos puntuales.",
  },
  {
    id: "m3_07",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "La altura mínima de montaje de cámaras fijas para impedir manipulación es de:",
    options: ["1,5 metros", "2,0 metros", "Superior a 2,3 metros", "3,5 metros"],
    correctAnswer: "Superior a 2,3 metros",
    explicacion:
      "Las cámaras fijas se montan a una altura superior a 2,3 metros para impedir la manipulación no autorizada. 1,5 y 2,0 metros quedan al alcance de las personas y facilitan la manipulación; 3,5 metros también la impide, pero la norma técnica recomienda como mínimo 'superior a 2,3 metros'.",
  },
  {
    id: "m3_08",
    moduleTitle: "Módulo 3 — Televigilancia y Operación de Centro de Control",
    question: "La cámara cenital para mesas de juego y cajas de dinero se posiciona en ángulo de:",
    options: ["30 grados", "45 grados", "90 grados perpendicular al plano de trabajo", "180 grados"],
    correctAnswer: "90 grados perpendicular al plano de trabajo",
    explicacion:
      "La cámara cenital para mesas de juego y cajas de dinero se posiciona a 90 grados, perpendicular al plano de trabajo, para registrar todo lo que ocurre sobre la superficie. 30 o 45 grados no logran esa cobertura cenital completa y 180 grados no es un ángulo aplicable a esta instalación.",
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
    explicacion:
      "Al iniciar el turno, el operador verifica el funcionamiento de monitores, grabadores y cámaras, y confirma que la hora y fecha del sistema sean correctas (la hora confiable es clave para el valor probatorio de las grabaciones). La cantidad de monitores es parte de la verificación, pero no es lo único; las redes sociales y los extintores no son funciones del operador de CCTV.",
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
    explicacion:
      "La primera prioridad ante cualquier evento es proteger la vida e integridad de las personas. La protección de bienes, la preservación de la evidencia y los avisos al supervisor son pasos posteriores de la respuesta.",
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
    explicacion:
      "La buena práctica de ciberseguridad es cambiar las claves por defecto de cámaras, grabadores y routers, y usar contraseñas largas y únicas. Compartir claves entre turnos, exponer las cámaras a internet sin protección o desactivar actualizaciones de firmware facilitan accesos no autorizados al sistema.",
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
    explicacion:
      "La segmentación de red separa la red de videovigilancia de la red administrativa para aislar los equipos de seguridad y reducir la superficie de ataque. Unirlas, conectar todas las cámaras en cadena o usar un solo router para todo es exactamente lo contrario a una buena segmentación.",
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
    explicacion:
      "La detección de movimiento alerta automáticamente ante cambios relevantes en la escena y reduce la fatiga del operador al enfocar su atención. No reemplaza al operador (él siempre decide), no mejora la resolución de las cámaras y no tiene relación con la grabación en cinta.",
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
    explicacion:
      "El reconocimiento facial está restringido porque el rostro es un dato personal sensible: su uso exige base legal clara, proporcionalidad y, según el caso, autorización de la autoridad. No es una restricción por costo, las cámaras sí capturan rostros y en Chile sí está regulado (Ley 19.628 y Ley 21.719).",
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
    explicacion:
      "Las alertas de IA son un apoyo a la decisión humana: el operador siempre verifica el evento y decide cómo actuar. No son la decisión final del sistema, no deben ignorarse y no dependen de la hora del día.",
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
    explicacion:
      "Ante un artefacto sospechoso, el operador no debe tocar ni mover el objeto: debe aislar y evacuar la zona según el protocolo y avisar a las autoridades. Moverlo, cubrirlo o acercarse a registrarlo exponen a las personas y pueden detonar el artefacto.",
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
    explicacion:
      "La custodia digital de la evidencia exige en primer lugar bloquear la sobrescritura, para que la grabación cíclica no borre el incidente. Compartir el video en redes internas o borrar material compromete la evidencia, y el original debe conservarse resguardado (se entrega una copia íntegra, no el original).",
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
    explicacion:
      "Ante un asalto, el operador no debe exponerse: observa y describe lo que ve, avisa a Carabineros y a la jefatura, y preserva las grabaciones. Salir a enfrentar a los asaltantes pone en riesgo su vida, apagar las cámaras destruye la evidencia y esperar decisiones del gerente retrasa la respuesta.",
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
    explicacion:
      "El seguimiento visual durante un incidente permite reportar la posición, cantidad y desplazamiento de las personas o del evento, información vital para la respuesta. No determina automáticamente el origen de las alarmas, no reemplaza el informe final y no evita llamar a Carabineros.",
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
    explicacion:
      "Después de una crisis, el operador debe elaborar el informe completo del incidente y analizar las lecciones aprendidas, proponiendo mejoras al sistema. Retomar las operaciones sin más pierde información clave, borrar las grabaciones destruye la evidencia y esperar instrucciones del tribunal no corresponde en esa etapa (el informe se hace de inmediato).",
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

/** Convierte preguntas del banco CCTV al formato del MiniQuiz (alternativas). */
export function getMiniQuizBancoCctv(moduloIdx: number): PreguntaAlternativa[] {
  return getPreguntasPorModulo(moduloIdx).map((q) => ({
    id: q.id,
    pregunta: q.question,
    opciones: q.options,
    respuestaCorrecta: q.correctAnswer,
    explicacion: q.explicacion,
  }));
}

export const MINIQUIZ_PREGUNTAS_CCTV = 5;
export const EXAMEN_FINAL_PREGUNTAS_CCTV = 60;
export const EXAMEN_FINAL_UMBRAL_CCTV = 80;