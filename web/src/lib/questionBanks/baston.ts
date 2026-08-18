/**
 * BANCO DE PREGUNTAS — MINIQUIZ Y EXAMEN FINAL BASTÓN Y ESPOSAS (APRECAP)
 * Preguntas fundamentadas en los MDs del curso (docs/markdown_cursos/5_Baston_y_Esposas),
 * con el marco legal vigente al 18-08-2026 (Ley 21.659, D.S. 209, Código Penal).
 * En cada examen se seleccionan preguntas balanceadas entre módulos y se aleatorian
 * las posiciones de preguntas y opciones en cada intento.
 */

import type { ExamQuestion, PreguntaAlternativa } from "./types";
import { barajarOpciones, seleccionarBalanceadas } from "./helpers";

export const BASTON_QUESTION_BANK: ExamQuestion[] = [
  // ══════════════════════════════════════════════
  // MÓDULO 1 — Defensa Personal Policial y Uso Racional de la Fuerza (1.1–1.4)
  // ══════════════════════════════════════════════
  {
    id: "b1_01",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question:
      "La Defensa Personal Policial (DPP) es un sistema que se caracteriza por:",
    options: [
      "Ser un deporte de contacto competitivo",
      "Un conjunto de técnicas de defensa y reducción, tomadas de artes marciales y combate, adaptadas al uso racional de la fuerza",
      "Un método de ataque preventivo contra cualquier sospechoso",
      "Técnicas complejas que exigen años de práctica para aplicarse",
    ],
    correctAnswer:
      "Un conjunto de técnicas de defensa y reducción, tomadas de artes marciales y combate, adaptadas al uso racional de la fuerza",
    explicacion:
      "La DPP es un sistema compuesto por técnicas de defensa y reducción de diferentes artes marciales y de combate, simplificadas y adaptadas al puesto de guardia, siempre dentro del uso racional de la fuerza. No es un deporte de contacto (no compite ni busca daño), no es un método de ataque preventivo (solo reacciona ante agresión) y el repertorio se privilegia sencillo, repetible y seguro, no complejo.",
  },
  {
    id: "b1_02",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question: "El factor sorpresa en una intervención de defensa consiste en:",
    options: [
      "Atacar primero sin importar la causa",
      "Anunciar la maniobra para advertir al agresor",
      "La acción no anunciada que anula la capacidad de reacción del agresor, en el momento, lugar y modo que no espera",
      "Esperar a que el agresor golpee para responder",
    ],
    correctAnswer:
      "La acción no anunciada que anula la capacidad de reacción del agresor, en el momento, lugar y modo que no espera",
    explicacion:
      "El factor sorpresa es la acción no anunciada que anula la capacidad de reacción del sujeto activo: se actúa en el momento, lugar y modo que el agresor no espera, dentro de la legalidad. No significa atacar sin causa, no se anuncia la maniobra (eso la neutraliza) y esperar pasivamente el golpe renuncia a la iniciativa defensiva que la sorpresa otorga.",
  },
  {
    id: "b1_03",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question: "Según los principios de actuación del guardia, la defensa física es:",
    options: [
      "El primer recurso ante cualquier discusión",
      "Un medio para castigar al agresor",
      "El último recurso, cuando fracasaron la disuasión y la comunicación",
      "Obligatoria en todo procedimiento",
    ],
    correctAnswer:
      "El último recurso, cuando fracasaron la disuasión y la comunicación",
    explicacion:
      "La defensa física es siempre el último recurso: primero se agota la disuasión y la comunicación, protegiendo primero la vida e integridad de las personas y luego los bienes. No es el primer recurso ante una discusión, no es un castigo (la fuerza se usa para detener la agresión, no para sancionar) y no es obligatoria: solo se aplica cuando es necesaria, proporcional y justificable.",
  },
  {
    id: "b1_04",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question:
      "El estándar de distancia mínima de reacción ante una amenaza potencialmente armada es de:",
    options: [
      "6,4 metros (21 pies) en 1,5 segundos",
      "3 metros en 5 segundos",
      "10 metros en 1 segundo",
      "2 metros en 3 segundos",
    ],
    correctAnswer: "6,4 metros (21 pies) en 1,5 segundos",
    explicacion:
      "El estándar difundido en la formación de seguridad indica que 6,4 metros (21 pies) en 1,5 segundos es el tiempo que tarda una persona decidida en alcanzar al guardia, por lo que esa distancia (o más) se considera un mínimo de reacción ante una amenaza potencialmente armada. 3 o 2 metros dejan al guardia al alcance de un ataque inmediato y 10 metros no es el estándar establecido, aunque mayor distancia siempre es mejor.",
  },
  {
    id: "b1_05",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question: "Cuando el agresor se aproxima, la maniobra de distancia correcta es:",
    options: [
      "Girar la espalda y alejarse corriendo",
      "Retroceder en línea recta sin observar",
      "Retroceder sin girar la espalda, desplazarse lateralmente, usar obstáculos y verbalizar",
      "Quedarse inmóvil hasta el contacto",
    ],
    correctAnswer:
      "Retroceder sin girar la espalda, desplazarse lateralmente, usar obstáculos y verbalizar",
    explicacion:
      "La maniobra de distancia combina: retroceder sin girar la espalda (se mantiene la vista en la amenaza), moverse en diagonal o lateral (dificulta el ataque directo y ofrece ángulos de salida), usar obstáculos como barrera pasiva y acompañar con órdenes claras. Girar la espalda, retroceder en línea recta sin observar o quedarse inmóvil exponen al guardia y contradicen la regla de nunca perder de vista la amenaza.",
  },
  {
    id: "b1_06",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question:
      "La distancia de intervención que exige técnica física de control se denomina:",
    options: [
      "Distancia de conversación",
      "Distancia de reacción",
      "Distancia de contacto",
      "Distancia preventiva",
    ],
    correctAnswer: "Distancia de contacto",
    explicacion:
      "La distancia de contacto es la que exige técnica física de control y solo se alcanza cuando la intervención es necesaria y legal. La distancia de conversación permite dialogar y observar fuera del alcance de un golpe sin paso previo; la distancia de reacción es la mínima que permite percibir, decidir y ejecutar antes del contacto; y la distancia preventiva es el espacio de seguridad que se administra para ganar tiempo y opciones.",
  },
  {
    id: "b1_07",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question: "La conciencia situacional consiste en:",
    options: [
      "Percibir el entorno, comprender lo que ocurre y anticipar lo que puede suceder",
      "Recordar los hechos ocurridos en el turno anterior",
      "Conocer el plano de la instalación de memoria",
      "Estar atento solo a las cámaras de vigilancia",
    ],
    correctAnswer:
      "Percibir el entorno, comprender lo que ocurre y anticipar lo que puede suceder",
    explicacion:
      "La conciencia situacional tiene tres componentes: percepción (observar personas, actitudes, objetos y vías de salida), comprensión (interpretar señales de riesgo) y anticipación (imaginar escenarios y tener respuesta preparada). Recordar turnos anteriores, conocer el plano o mirar cámaras son acciones parciales que no constituyen el concepto completo de anticipación preventiva.",
  },
  {
    id: "b1_08",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question: "En la evaluación rápida de una amenaza, el guardia debe determinar:",
    options: [
      "Solo la complexión física del sujeto",
      "Intención, capacidad y oportunidad del sujeto de agredir",
      "La edad y el vestuario del sujeto",
      "El lugar de residencia del sujeto",
    ],
    correctAnswer:
      "Intención, capacidad y oportunidad del sujeto de agredir",
    explicacion:
      "La evaluación rápida de la amenaza considera la intención (¿busca pelea, discute o solo pasa?), la capacidad (¿está armado, viene acompañado, su complexión representa riesgo?) y la oportunidad (¿la situación le permite agredir sin consecuencias?). La complexión física es solo parte de la capacidad; la edad, el vestuario o la residencia no determinan el nivel de amenaza.",
  },
  {
    id: "b1_09",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question: "La defensa física se justifica únicamente ante:",
    options: [
      "Cualquier insulto o provocación verbal",
      "Una agresión real, actual o inminente",
      "La sospecha de que alguien quiere agredir",
      "El incumplimiento de una orden del guardia",
    ],
    correctAnswer: "Una agresión real, actual o inminente",
    explicacion:
      "La defensa física solo se justifica ante una agresión real, actual o inminente, y con la menor fuerza necesaria para neutralizarla. Los insultos o provocaciones verbales se resuelven con desescalada y comunicación; la sospecha sin agresión concreta no habilita el contacto físico, y el simple incumplimiento de una orden se aborda con mandato verbal y medidas de protección, no con fuerza.",
  },
  {
    id: "b1_10",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question: "Los requisitos de la legítima defensa en el Código Penal son:",
    options: [
      "Agresión ilegítima, necesidad racional del medio empleado y falta de provocación suficiente",
      "Autorización del jefe, aviso previo a Carabineros y porte de uniforme",
      "Agresión con arma, testigos presentes y defensa proporcional",
      "Haber intentado dialogar, retroceder y pedir ayuda antes",
    ],
    correctAnswer:
      "Agresión ilegítima, necesidad racional del medio empleado y falta de provocación suficiente",
    explicacion:
      "La ley exige tres requisitos copulativos: agresión ilegítima (ataque real, actual o inminente), necesidad racional del medio empleado (proporcionalidad) y falta de provocación suficiente por parte de quien se defiende. La autorización del jefe, el aviso a Carabineros o haber dialogado antes no son requisitos legales, y la defensa procede ante cualquier agresión ilegítima, no solo con arma de fuego.",
  },
  {
    id: "b1_11",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question:
      "La legítima defensa privilegiada (presunción de racionalidad del medio) aplica al:",
    options: [
      "Rechazo del escalamiento en un lugar habitado o destinado a la habitación y, de noche, en lugar no habitado",
      "Cualquier agresión ocurrida en la vía pública",
      "Defensa de los bienes propios fuera de la instalación",
      "Enfrentamiento entre dos particulares en un recinto comercial",
    ],
    correctAnswer:
      "Rechazo del escalamiento en un lugar habitado o destinado a la habitación y, de noche, en lugar no habitado",
    explicacion:
      "La legítima defensa privilegiada presume la racionalidad del medio empleado al rechazar el escalamiento en un lugar habitado o destinado a la habitación y, de noche, en un lugar no habitado; para el guardia aplica al defender la instalación ante un ingreso por vía no destinada al efecto (forado, fractura de puertas o ventanas). No aplica a agresiones en la vía pública, a bienes fuera de la instalación ni a riñas entre particulares, donde rige la legítima defensa común con sus tres requisitos.",
  },
  {
    id: "b1_12",
    moduleTitle: "Módulo 1 — Defensa Personal Policial y Uso Racional de la Fuerza",
    question:
      "Cuando el guardia protege a un tercero que está siendo agredido, ejerce:",
    options: [
      "Defensa propia",
      "Defensa de parientes",
      "Defensa de extraños",
      "Defensa privilegiada",
    ],
    correctAnswer: "Defensa de extraños",
    explicacion:
      "La defensa de extraños protege a terceros y es la propia de la función de seguridad: el guardia puede defender a cualquier persona agredida dentro de los requisitos legales. La defensa propia protege la propia integridad, la de parientes ampara a familiares cercanos, y la privilegiada es la presunción de racionalidad del medio en el rechazo del escalamiento, no una clasificación por la persona defendida.",
  },

  // ══════════════════════════════════════════════
  // MÓDULO 2 — Comunicación y Técnicas de Control (2.1–2.3)
  // ══════════════════════════════════════════════
  {
    id: "b2_01",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "La desescalada es el conjunto de técnicas de comunicación destinadas a:",
    options: [
      "Ganar tiempo para aplicar una técnica física",
      "Reducir la tensión de la situación para evitar que derive en agresión física",
      "Demostrar autoridad ante el público",
      "Registrar las palabras del agresor como evidencia",
    ],
    correctAnswer:
      "Reducir la tensión de la situación para evitar que derive en agresión física",
    explicacion:
      "La desescalada reduce la tensión para evitar que la situación derive en agresión física: es la herramienta preferente del guardia porque evita daños, riesgos legales y el uso de la fuerza. No es una excusa para ganar tiempo y luego golpear (si la conversación avanza, no se apura el contacto), no busca imponer autoridad exhibiéndose y el registro de evidencia es una tarea posterior, no el objetivo de la comunicación persuasiva.",
  },
  {
    id: "b2_02",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "La clave de la comunicación persuasiva es:",
    options: [
      "Ceder ante las exigencias del agresor",
      "Validar las emociones sin ceder",
      "Elevar la voz para imponer respeto",
      "Ignorar los sentimientos de la persona",
    ],
    correctAnswer: "Validar las emociones sin ceder",
    explicacion:
      "La comunicación persuasiva valida las emociones del otro ('entiendo que esté molesto...') sin ceder: se reconoce lo que siente, pero no se renuncia al control ni a las normas. Ceder ante exigencias premia la conducta agresiva, gritar escala la tensión (se evitan gritos, sarcasmo y amenazas) e ignorar los sentimientos impide la conexión que reduce la agresividad.",
  },
  {
    id: "b2_03",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "La desescalada verbal termina y se pasa a medidas de protección cuando:",
    options: [
      "La persona discute con energía",
      "La persona continúa avanzando pese a las órdenes, adopta postura de ataque o manifiesta intención clara de agredir",
      "El guardia se siente incómodo",
      "Transcurren más de cinco minutos de conversación",
    ],
    correctAnswer:
      "La persona continúa avanzando pese a las órdenes, adopta postura de ataque o manifiesta intención clara de agredir",
    explicacion:
      "La conversación se mantiene mientras reduzca el riesgo y termina cuando la persona continúa avanzando pese a las órdenes claras, ajusta sus pertenencias o adopta postura de ataque, o manifiesta intención clara de agredir: entonces se pasa a medidas de protección y, si corresponde, a la intervención física. Discutir con energía o el paso del tiempo por sí solos no justifican el contacto, y la incomodidad personal no es un criterio técnico.",
  },
  {
    id: "b2_04",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "El objetivo del sistema de control por palancas y torsiones es:",
    options: [
      "Causar dolor para castigar al agresor",
      "Lograr una aprehensión segura resguardando la integridad del guardia, del detenido y de terceros",
      "Inmovilizar al agresor el mayor tiempo posible",
      "Vencer al agresor por la fuerza física bruta",
    ],
    correctAnswer:
      "Lograr una aprehensión segura resguardando la integridad del guardia, del detenido y de terceros",
    explicacion:
      "El sistema de control busca una aprehensión segura: las acciones resguardan la integridad del guardia, del detenido o agresor y de terceros presentes, permitiendo reducir y trasladar dentro de la legalidad. El dolor controlado no es un castigo (es una señal para cesar la resistencia), la inmovilización se mantiene solo hasta la entrega o liberación, y el sistema precisamente disminuye la desigualdad física sin depender de la fuerza bruta.",
  },
  {
    id: "b2_05",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "El 'dolor controlado' en las técnicas de palancas y torsiones:",
    options: [
      "Busca causar una lesión que impida seguir resistiendo",
      "Es la señal que lleva al agresor a cesar la resistencia, sin buscar lesionar",
      "Se aplica con la máxima intensidad desde el inicio",
      "Es el resultado inevitable de toda reducción",
    ],
    correctAnswer:
      "Es la señal que lleva al agresor a cesar la resistencia, sin buscar lesionar",
    explicacion:
      "El dolor controlado es la señal que lleva al agresor a cesar la resistencia: se gira una articulación dentro o cerca de su amplitud natural, generando presión que se detiene en cuanto la resistencia cede, sin buscar lesión. No se causa lesión deliberadamente, no se aplica a máxima intensidad (la intensidad se regula según la resistencia) y no es inevitable: la técnica se detiene cuando el control se logra.",
  },
  {
    id: "b2_06",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "Entre los límites de las técnicas de control se encuentra:",
    options: [
      "Aplicar palancas sobre el cuello para reducir rápido",
      "Mantener la técnica hasta que el agresor pida perdón",
      "Nunca aplicar palancas sobre el cuello ni técnicas que comprometan la respiración fuera de protocolos autorizados",
      "Usar la misma intensidad con todos los agresores",
    ],
    correctAnswer:
      "Nunca aplicar palancas sobre el cuello ni técnicas que comprometan la respiración fuera de protocolos autorizados",
    explicacion:
      "La norma de seguridad prohíbe aplicar palancas sobre el cuello y técnicas que comprometan la respiración fuera de protocolos autorizados, y exige detener la técnica cuando la resistencia cede: el control no es castigo. Continuar hasta el 'perdón' convierte la reducción en represalia, y la intensidad debe regularse según la resistencia y las condiciones de la persona, con atención especial a vulnerables (edad, embarazo, lesiones, discapacidad).",
  },
  {
    id: "b2_07",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "Las técnicas son el 'cómo' de la defensa porque:",
    options: [
      "Son los movimientos específicos y concretos para responder a un ataque físico",
      "Son las estrategias amplias de prevención",
      "Definen cuándo intervenir o retirarse",
      "Reemplazan la decisión del guardia",
    ],
    correctAnswer:
      "Son los movimientos específicos y concretos para responder a un ataque físico",
    explicacion:
      "Las técnicas son los movimientos específicos y concretos (golpes, bloqueos, esquivas, agarres, palancas, derribos, técnicas de suelo) que constituyen el 'cómo' de la defensa. Las estrategias amplias de prevención (ubicación, rutas, iluminación) y la decisión de intervenir o retirarse son tácticas ('cuándo, dónde y por qué'), y la técnica nunca reemplaza el criterio del guardia: la técnica sin táctica es movimiento sin criterio.",
  },
  {
    id: "b2_08",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "Un ejemplo de táctica en defensa personal es:",
    options: [
      "La palanca de muñeca",
      "El bloqueo de un golpe directo",
      "Retirarse a una zona segura antes del contacto",
      "El derribo del agresor",
    ],
    correctAnswer: "Retirarse a una zona segura antes del contacto",
    explicacion:
      "Retirarse a una zona segura antes del contacto es una táctica: una estrategia amplia y planificada que responde al 'cuándo, dónde y por qué' de la defensa, propia de la prevención y la decisión de intervenir o retirarse. La palanca de muñeca, el bloqueo y el derribo son técnicas: movimientos concretos que responden al 'cómo' se ejecuta la respuesta.",
  },
  {
    id: "b2_09",
    moduleTitle: "Módulo 2 — Comunicación y Técnicas de Control",
    question: "La relación correcta entre técnica y táctica es:",
    options: [
      "La táctica sin técnica es plan sin capacidad y la técnica sin táctica es movimiento sin criterio",
      "La técnica es más importante que la táctica",
      "Solo se necesita la táctica si hay tiempo para planificar",
      "Son conceptos intercambiables",
    ],
    correctAnswer:
      "La táctica sin técnica es plan sin capacidad y la técnica sin táctica es movimiento sin criterio",
    explicacion:
      "El profesional domina ambos niveles: la táctica sin técnica es un plan sin capacidad (se decide bien pero no se puede ejecutar) y la técnica sin táctica es movimiento sin criterio (se puede ganar un forcejeo y perder la situación). Ninguna es más importante que la otra, la táctica no depende de tener tiempo (es prevención permanente) y no son intercambiables: la táctica decide y la técnica ejecuta.",
  },

  // ══════════════════════════════════════════════
  // MÓDULO 3 — Uso de la Fuerza y Marco Legal (3.1–3.2)
  // ══════════════════════════════════════════════
  {
    id: "b3_01",
    moduleTitle: "Módulo 3 — Uso de la Fuerza y Marco Legal",
    question: "El uso de la fuerza por el personal de seguridad debe ser:",
    options: [
      "Racional, proporcional y progresivo",
      "El más contundente posible para disuadir",
      "Igual en todas las situaciones",
      "Decidido por el propio guardia sin registro",
    ],
    correctAnswer: "Racional, proporcional y progresivo",
    explicacion:
      "El uso de la fuerza debe ser racional (solo la necesaria para neutralizar la amenaza y proteger la vida), proporcional (la respuesta se corresponde con el nivel de amenaza) y progresivo (se escala y desescala según la conducta del sujeto, partiendo de medidas menos lesivas). La contundencia máxima, un criterio único para toda situación o actuar sin documentar contradicen los principios de necesidad, proporcionalidad y registro de toda intervención.",
  },
  {
    id: "b3_02",
    moduleTitle: "Módulo 3 — Uso de la Fuerza y Marco Legal",
    question: "Ante el no acatamiento de indicaciones, la respuesta del guardia es:",
    options: [
      "Contacto físico inmediato",
      "Preventiva: verbalización, persuasión, negociación y mandato perentorio",
      "Uso del bastón disuasivo",
      "Llamar a la autoridad y esperar",
    ],
    correctAnswer:
      "Preventiva: verbalización, persuasión, negociación y mandato perentorio",
    explicacion:
      "Frente al no acatamiento (actitud indolente o negativa), la respuesta es preventiva y busca el cumplimiento sin contacto físico: verbalización (órdenes claras y firmes), persuasión (argumentar y ofrecer alternativas), negociación (acuerdos que reduzcan la tensión) y mandato perentorio (instrucción directa de cesar la conducta). El contacto físico, el bastón o delegar en la autoridad sin agotar la vía verbal escalan innecesariamente la situación.",
  },
  {
    id: "b3_03",
    moduleTitle: "Módulo 3 — Uso de la Fuerza y Marco Legal",
    question: "Ante una agresión física no letal, la respuesta proporcionada es:",
    options: [
      "Fuerza potencialmente letal inmediata",
      "Técnicas de control y reducción proporcionadas",
      "Retirarse y abandonar la instalación",
      "Usar el bastón en zona roja",
    ],
    correctAnswer: "Técnicas de control y reducción proporcionadas",
    explicacion:
      "Ante una agresión física no letal, la respuesta es la fuerza física no letal: técnicas de control, palancas y torsiones y reducción proporcionada. La fuerza potencialmente letal solo corresponde ante una agresión activa letal o potencialmente letal, para defender la vida; retirarse sin más abandona la misión de seguridad pudiendo controlar la situación; y el bastón nunca se usa en zona roja (cabeza, cuello, nuca, columna), que está totalmente prohibida.",
  },
  {
    id: "b3_04",
    moduleTitle: "Módulo 3 — Uso de la Fuerza y Marco Legal",
    question: "Según la línea de evolución, la fuerza se detiene:",
    options: [
      "Cuando la amenaza se neutraliza",
      "Cuando el agresor se cansa",
      "Al finalizar el turno",
      "Cuando llegan refuerzos",
    ],
    correctAnswer: "Cuando la amenaza se neutraliza",
    explicacion:
      "El principio de cese de la fuerza exige detenerla en el instante en que la amenaza se neutraliza: cada nivel de resistencia tiene un nivel de respuesta y se desescala con la conducta del sujeto. Continuar después de neutralizada la amenaza convierte la defensa en represalia ilegal; la fatiga del agresor, el fin del turno o la llegada de refuerzos no son los criterios técnicos para suspender el uso de la fuerza.",
  },
  {
    id: "b3_05",
    moduleTitle: "Módulo 3 — Uso de la Fuerza y Marco Legal",
    question: "La autoridad fiscalizadora de la seguridad privada en Chile es:",
    options: [
      "La PDI",
      "La Prefectura de Seguridad Privada de Carabineros (OS-10)",
      "El Ministerio del Trabajo",
      "Los municipios",
    ],
    correctAnswer: "La Prefectura de Seguridad Privada de Carabineros (OS-10)",
    explicacion:
      "La Ley N° 21.659 establece que la autoridad fiscalizadora de la seguridad privada es la Prefectura de Seguridad Privada de Carabineros de Chile (OS-10), con participación de la Subsecretaría de Prevención del Delito. La PDI cumple funciones de investigación penal, el Ministerio del Trabajo fiscaliza materias laborales y los municipios no tienen facultades de fiscalización sobre empresas y agentes de seguridad privada.",
  },
  {
    id: "b3_06",
    moduleTitle: "Módulo 3 — Uso de la Fuerza y Marco Legal",
    question: "Las facultades de detención del guardia de seguridad alcanzan a:",
    options: [
      "Cualquier persona que le parezca sospechosa",
      "Solo los casos que la ley autoriza a cualquier particular, principalmente el delito flagrante",
      "Toda persona que no acredite su identidad",
      "Personas que se nieguen a cumplir sus órdenes",
    ],
    correctAnswer:
      "Solo los casos que la ley autoriza a cualquier particular, principalmente el delito flagrante",
    explicacion:
      "El guardia es un particular con funciones de seguridad: puede detener solo en los casos que la ley autoriza a cualquier persona, principalmente al sorprender un delito flagrante, y debe entregar de inmediato al detenido a la autoridad competente. No puede detener por simple sospecha, no puede exigir identificación como base de detención y negarse a una orden no es delito flagrante que habilite la detención.",
  },

  // ══════════════════════════════════════════════
  // MÓDULO 4 — Implementos: Bastón y Esposas (4.1–4.2)
  // ══════════════════════════════════════════════
  {
    id: "b4_01",
    moduleTitle: "Módulo 4 — Implementos: Bastón y Esposas",
    question: "El bastón telescópico es:",
    options: [
      "Un instrumento de castigo para hacer respetar la autoridad",
      "Un elemento defensivo de control que mantiene distancia y neutraliza una agresión dentro del uso racional de la fuerza",
      "Una herramienta para intimidar a los transeúntes",
      "Un reemplazo de las técnicas de control",
    ],
    correctAnswer:
      "Un elemento defensivo de control que mantiene distancia y neutraliza una agresión dentro del uso racional de la fuerza",
    explicacion:
      "El bastón es un medio de control y defensa: permite mantener distancia y neutralizar una agresión sin recurrir a técnicas de mayor letalidad, dentro del uso racional y proporcional de la fuerza y con autorización y entrenamiento. No es un castigo ni un instrumento de intimidación (nunca se exhibe innecesariamente), y no reemplaza las técnicas de control ni la comunicación: es un nivel más de la línea de evolución.",
  },
  {
    id: "b4_02",
    moduleTitle: "Módulo 4 — Implementos: Bastón y Esposas",
    question:
      "La zona de golpeo de elección para técnicas de control con impacto es:",
    options: [
      "La cabeza y el cuello",
      "La columna vertebral",
      "Las piernas (grandes masas musculares)",
      "El tronco a la altura de los riñones",
    ],
    correctAnswer: "Las piernas (grandes masas musculares)",
    explicacion:
      "La zona verde (piernas, grandes masas musculares) es la de elección para técnicas de control con impacto por su menor riesgo de lesión grave. La cabeza, cuello, tráquea, ojos, nuca y columna forman la zona roja, de golpeo totalmente prohibido por riesgo de lesiones graves, permanentes o mortales; y el tronco y la zona lumbar son zona amarilla, que solo se golpea con técnica controlada y extrema necesidad.",
  },
  {
    id: "b4_03",
    moduleTitle: "Módulo 4 — Implementos: Bastón y Esposas",
    question: "Respecto del porte del bastón, el guardia debe:",
    options: [
      "Exhibirlo permanentemente para disuadir",
      "Portarlo en la posición autorizada por la empresa y nunca exhibirlo innecesariamente",
      "Mostrarlo antes de cada diálogo",
      "Esconderlo para no alertar a los delincuentes",
    ],
    correctAnswer:
      "Portarlo en la posición autorizada por la empresa y nunca exhibirlo innecesariamente",
    explicacion:
      "El bastón se porta en la posición autorizada por la empresa, se mantiene limpio y operativo (revisando el mecanismo de cierre y extensión) y nunca se exhibe innecesariamente: la disuasión no requiere amenaza. Exhibirlo permanentemente o mostrarlo en cada diálogo escala las situaciones y da imagen de intimidación, y esconderlo impide el acceso rápido cuando la técnica se necesita.",
  },
  {
    id: "b4_04",
    moduleTitle: "Módulo 4 — Implementos: Bastón y Esposas",
    question: "Las esposas (grilletes) son:",
    options: [
      "Un castigo para quien resiste",
      "Una herramienta de control temporal que inmoviliza las manos de una persona reducida o detenida",
      "Un adorno del uniforme",
      "Un elemento para asegurar la fuga",
    ],
    correctAnswer:
      "Una herramienta de control temporal que inmoviliza las manos de una persona reducida o detenida",
    explicacion:
      "Las esposas son un elemento de sujeción que inmoviliza las manos de una persona reducida o detenida, impidiendo que agreda, se autolesione o se dé a la fuga: una medida de control temporal, no un castigo. No son decorativas, no aseguran la fuga (la impiden) y su uso exige autorización, entrenamiento en colocación y retiro, y verificación permanente del estado de la persona esposada.",
  },
  {
    id: "b4_05",
    moduleTitle: "Módulo 4 — Implementos: Bastón y Esposas",
    question: "Al colocar las esposas, el ajuste correcto exige:",
    options: [
      "Apretarlas al máximo para evitar que escape",
      "Que queden cerradas sin comprimir la circulación, permitiendo introducir un dedo entre la muñeca y la anilla",
      "Colocarlas al frente del cuerpo",
      "Dejarlas flojas para que la persona pueda retirarlas",
    ],
    correctAnswer:
      "Que queden cerradas sin comprimir la circulación, permitiendo introducir un dedo entre la muñeca y la anilla",
    explicacion:
      "El ajuste correcto deja un espacio de un dedo entre la muñeca y la anilla: las esposas no deben comprimir la circulación, y además se activa el doble seguro para impedir que sigan cerrándose. Apretarlas al máximo puede provocar lesiones y responsabilidad, la posición estándar de seguridad es por la espalda con palmas hacia afuera (no al frente), y dejarlas flojas permite que la persona se libere.",
  },
  {
    id: "b4_06",
    moduleTitle: "Módulo 4 — Implementos: Bastón y Esposas",
    question: "Está prohibido durante el uso de esposas:",
    options: [
      "Verificar la circulación de la persona esposada",
      "Esposar a estructuras fijas o dejar a la persona esposada sin vigilancia",
      "Usar el doble seguro",
      "Retirar una muñeca a la vez al liberar",
    ],
    correctAnswer:
      "Esposar a estructuras fijas o dejar a la persona esposada sin vigilancia",
    explicacion:
      "Las reglas del uso de esposas prohíben esposar a estructuras fijas y dejar a una persona esposada sin vigilancia, además de usarlas como castigo o por tiempos prolongados injustificados. Verificar circulación y sensibilidad, activar el doble seguro y retirar una muñeca a la vez manteniendo el control son obligaciones correctas del procedimiento, no prohibiciones.",
  },
];

/** Selecciona preguntas balanceadas entre módulos y baraja las opciones para el examen. */
export function getExamenFinalBaston(totalPreguntas = EXAMEN_FINAL_PREGUNTAS_BASTON): ExamQuestion[] {
  return seleccionarBalanceadas(BASTON_QUESTION_BANK, totalPreguntas).map(barajarOpciones);
}

export function getPreguntasPorModulo(moduloIdx: number): ExamQuestion[] {
  const titulos = BASTON_QUESTION_BANK.map((q) => q.moduleTitle).filter(
    (t, i, arr) => arr.indexOf(t) === i
  );
  const titulo = titulos[moduloIdx];
  return titulo ? BASTON_QUESTION_BANK.filter((q) => q.moduleTitle === titulo) : [];
}

/** Convierte preguntas del banco Bastón y Esposas al formato del MiniQuiz (alternativas). */
export function getMiniQuizBancoBaston(moduloIdx: number): PreguntaAlternativa[] {
  return getPreguntasPorModulo(moduloIdx).map((q) => ({
    id: q.id,
    pregunta: q.question,
    opciones: q.options,
    respuestaCorrecta: q.correctAnswer,
    explicacion: q.explicacion,
  }));
}

export const MINIQUIZ_PREGUNTAS_BASTON = 5;
export const EXAMEN_FINAL_PREGUNTAS_BASTON = 20;
export const EXAMEN_FINAL_UMBRAL_BASTON = 80;