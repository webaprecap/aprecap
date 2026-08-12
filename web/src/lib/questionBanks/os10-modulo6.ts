import type { BancoModulo } from "./types";

// Preguntas fundamentadas en los PDFs oficiales "Defensa Personal y Uso del Bastón"
// y "Técnicas de Vigilancia y Pauta de Puesto" del Manual OS-10 Aprecap.

export const bancoModulo6: BancoModulo = {
  numero: 6,
  titulo: "El Guardia Estratégico",
  alternativas: [
    {
      id: "m6_a1",
      pregunta:
        "Según el manual, ¿cuál es el principio básico de la defensa personal?",
      opciones: [
        "Poner el cuerpo en movimiento antes que el cerebro",
        "Poner el cerebro en funcionamiento antes de poner el cuerpo en movimiento",
        "Actuar por instinto sin evaluar la situación",
        "Usar siempre la máxima fuerza disponible",
      ],
      respuestaCorrecta:
        "Poner el cerebro en funcionamiento antes de poner el cuerpo en movimiento",
      explicacion:
        "El manual exige percibir, evaluar y finalmente actuar, siempre acorde con el marco legal vigente.",
    },
    {
      id: "m6_a2",
      pregunta:
        "¿Cuál es la finalidad principal del bastón modelo policial?",
      opciones: [
        "Castigar a los infractores sorprendidos",
        "Permitir neutralizar las eventuales agresiones haciendo una defensa proporcional y racional",
        "Sustituir a las armas de fuego en todo tipo de servicio",
        "Intimidar a los transeúntes",
      ],
      respuestaCorrecta:
        "Permitir neutralizar las eventuales agresiones haciendo una defensa proporcional y racional",
      explicacion:
        "El manual señala que el bastón es un elemento de 'disuasión y/o defensa' y no de 'agresión'.",
    },
    {
      id: "m6_a3",
      pregunta:
        "¿Qué ventaja táctica tiene el agarre del bastón 'OCULTO' (maza paralela al brazo hacia el codo)?",
      opciones: [
        "Otorga el mayor alcance posible",
        "Permite proteger el brazo ante golpes contundentes o cortantes",
        "Es el más cómodo para usar entre multitudes",
        "Permite atacar con mayor fuerza",
      ],
      respuestaCorrecta:
        "Permite proteger el brazo ante golpes contundentes o cortantes",
      explicacion:
        "El manual indica que esa tomada permite proteger el brazo ante golpes contundentes o cortantes.",
    },
    {
      id: "m6_a4",
      pregunta:
        "En el registro de pie CON APOYO DE LAS MANOS, ¿qué hace el agente con su pie?",
      opciones: [
        "Lo apoya en la espalda del detenido",
        "Hace palanca en la parte superior de la pantorrilla del sujeto para que pierda su centro de gravedad",
        "Lo coloca entre las piernas del detenido",
        "No usa el pie en esta técnica",
      ],
      respuestaCorrecta:
        "Hace palanca en la parte superior de la pantorrilla del sujeto para que pierda su centro de gravedad",
      explicacion:
        "El manual describe la palanca con el pie en la pantorrilla, con los pies del detenido a un metro de la vertical del muro.",
    },
    {
      id: "m6_a5",
      pregunta:
        "¿Qué es el REGISTRO PRELIMINAR?",
      opciones: [
        "El registro completo con apoyo de manos y pies",
        "El que se realiza inmediatamente después de la detención, buscando armas suficientemente grandes para detectarlas a través de las ropas",
        "El registro que hace Carabineros en la comisaría",
        "El registro de vehículos sospechosos",
      ],
      respuestaCorrecta:
        "El que se realiza inmediatamente después de la detención, buscando armas suficientemente grandes para detectarlas a través de las ropas",
      explicacion:
        "El manual define así el registro preliminar.",
    },
    {
      id: "m6_a6",
      pregunta:
        "En situaciones de peligro, ¿cuál es la regla de oro entre esposar y cachear?",
      opciones: [
        "Cachear exhaustivamente antes de esposar",
        "Esposar antes de cachear",
        "Interrogar antes de cachear",
        "Pedir al detenido que se espose a sí mismo",
      ],
      respuestaCorrecta: "Esposar antes de cachear",
      explicacion:
        "El manual indica: 'si es necesario, esposar antes de cachear (en situaciones de peligro)'.",
    },
    {
      id: "m6_a7",
      pregunta:
        "¿Por dónde debe realizarse SIEMPRE el esposamiento?",
      opciones: [
        "Por la parte frontal, manteniendo contacto visual",
        "Por la espalda, pasando la cadena de las esposas por el cinturón si lo tuviese",
        "Por el costado izquierdo del detenido",
        "Según prefiera el detenido",
      ],
      respuestaCorrecta:
        "Por la espalda, pasando la cadena de las esposas por el cinturón si lo tuviese",
      explicacion:
        "El manual establece realizarlo siempre por la espalda, pasando la cadena por el cinturón cuando las circunstancias lo aconsejen.",
    },
    {
      id: "m6_a8",
      pregunta:
        "Ante una intoxicación por INGESTA, ¿qué debe hacerse según el manual?",
      opciones: [
        "Dar abundante agua o leche de inmediato",
        "Inducir el vómito con los dedos",
        "NO dar nada a beber y tampoco producir vómitos",
        "Aplicar compresas calientes en el abdomen",
      ],
      respuestaCorrecta: "NO dar nada a beber y tampoco producir vómitos",
      explicacion:
        "El manual indica no dar nada a beber ni producir vómitos en intoxicación por ingesta, y llevar el envase o caja al servicio de urgencia.",
    },
    {
      id: "m6_a9",
      pregunta:
        "¿Para qué se utilizan principalmente los vendajes triangulares del botiquín?",
      opciones: [
        "Para evaluación pupilar",
        "Para inmovilización de fracturas y contención de hemorragias",
        "Para limpieza y desinfección de heridas",
        "Para fijar apósitos",
      ],
      respuestaCorrecta:
        "Para inmovilización de fracturas y contención de hemorragias",
      explicacion:
        "El manual asigna a los vendajes triangulares la inmovilización de fracturas y la contención de hemorragias.",
    },
    {
      id: "m6_a10",
      pregunta:
        "Según la pirámide de Maslow citada en el manual, ¿cuáles son las necesidades PRIMARIAS?",
      opciones: [
        "Las sociales y de estima",
        "Las de autorrealización",
        "Las fisiológicas y las de seguridad",
        "Todas las anteriores",
      ],
      respuestaCorrecta: "Las fisiológicas y las de seguridad",
      explicacion:
        "El manual ubica en la base de la pirámide las necesidades fisiológicas y de seguridad, constituyendo las necesidades primarias.",
    },
  ],
  vf: [
    {
      id: "m6_v1",
      afirmacion:
        "Los Vigilantes Privados y los Guardias de Seguridad están autorizados por ley para usar el bastón modelo policial y las esposas o grilletes.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo afirma; en el caso del Guardia deben ser autorizados por Carabineros según el nivel de riesgo del lugar.",
    },
    {
      id: "m6_v2",
      afirmacion:
        "El guardia es responsable ante los Tribunales de Justicia del mal empleo que se haga del bastón.",
      respuestaCorrecta: true,
      explicacion:
        "El manual señala que la ley no autoriza el empleo indiscriminado o desproporcionado y que serán responsables ante los Tribunales del mal empleo.",
    },
    {
      id: "m6_v3",
      afirmacion:
        "Las técnicas de defensa personal deben ser lógicas y fáciles de ejecutar; si son dificultosas, deben descartarse.",
      respuestaCorrecta: true,
      explicacion:
        "El manual indica descartar las técnicas difíciles porque bajo la presión del enfrentamiento será imposible ejecutarlas.",
    },
    {
      id: "m6_v4",
      afirmacion:
        "El bastón puede usarse como arma de ataque en casos como defender a una persona que está siendo agredida.",
      respuestaCorrecta: true,
      explicacion:
        "El manual permite usarlo como arma de ataque solo en situaciones que lo acrediten, como defender a una persona agredida, basándose en la legítima defensa.",
    },
    {
      id: "m6_v5",
      afirmacion:
        "El agarre de LARGO ALCANCE es el más cómodo para operar entre varias personas.",
      respuestaCorrecta: false,
      explicacion:
        "El largo alcance da mayor alcance pero es incómodo para estar entre varias personas; el CORTO alcance es el eficaz entre personas.",
    },
    {
      id: "m6_v6",
      afirmacion:
        "Ante resistencia del detenido, debe evitarse que pueda conseguir el apoyo del público observador.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo indica, junto con causar el menor daño posible y respetar la presunción de inocencia.",
    },
    {
      id: "m6_v7",
      afirmacion:
        "Las llaves y luxaciones anatómicas son técnicas de reducción válidas descritas en el manual.",
      respuestaCorrecta: true,
      explicacion:
        "El manual las menciona entre las técnicas de reducción e inmovilización, junto con llaves de control con dolor en puntos neurálgicos.",
    },
    {
      id: "m6_v8",
      afirmacion:
        "En el registro de pie CON APOYO DE LA CABEZA, el detenido apoya la frente en el muro con las manos detrás de la cabeza y los dedos entrelazados en la nuca.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así el registro de pie con apoyo de la cabeza.",
    },
    {
      id: "m6_v9",
      afirmacion:
        "Se debe dejar que el detenido se espose a sí mismo bajo supervisión del guardia.",
      respuestaCorrecta: false,
      explicacion:
        "El manual es explícito: 'No dejar nunca que se espose así mismo el detenido'.",
    },
    {
      id: "m6_v10",
      afirmacion:
        "Antes de la maniobra de cacheos y registros se debe comprobar el estado del seguro de las esposas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo indica en las reglas del uso de esposas.",
    },
    {
      id: "m6_v11",
      afirmacion:
        "Los grilletes pueden ser de acero con eslabón de cadena, de lazo, de bisagra, bridas o lazos de seguridad, y pulgueras.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esos medios de esposamiento.",
    },
    {
      id: "m6_v12",
      afirmacion:
        "Ante una intoxicación por CONTACTO, se debe lavar la zona afectada con abundante agua.",
      respuestaCorrecta: true,
      explicacion:
        "El manual indica lavar con abundante agua la zona afectada en intoxicación por contacto.",
    },
    {
      id: "m6_v13",
      afirmacion:
        "Ante una intoxicación por INHALACIÓN, se debe retirar a la víctima a un lugar despejado.",
      respuestaCorrecta: true,
      explicacion:
        "El manual indica retirar a la víctima a un lugar despejado en caso de inhalación.",
    },
    {
      id: "m6_v14",
      afirmacion:
        "Al trasladar a una víctima de intoxicación, se debe llevar el envase o caja del tóxico al servicio de urgencia.",
      respuestaCorrecta: true,
      explicacion:
        "El manual recomienda llevar el envase o caja al servicio de urgencia.",
    },
    {
      id: "m6_v15",
      afirmacion:
        "Entre los síntomas de intoxicación se incluyen somnolencia, irritabilidad, agitación, inconciencia y paro cardiorrespiratorio.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lista esos síntomas generales de intoxicación.",
    },
    {
      id: "m6_v16",
      afirmacion:
        "La linterna tipo lapicero del botiquín se usa para la evaluación pupilar.",
      respuestaCorrecta: true,
      explicacion:
        "El manual asigna la linterna tipo lapicero a la evaluación pupilar.",
    },
    {
      id: "m6_v17",
      afirmacion:
        "El esposamiento debe realizarse de forma rápida, con el sospechoso controlado o en desequilibrio.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo indica en las reglas del uso de esposas.",
    },
    {
      id: "m6_v18",
      afirmacion:
        "La Seguridad Nacional es resguardada por las Fuerzas de Orden y Seguridad Pública (Carabineros e Investigaciones).",
      respuestaCorrecta: false,
      explicacion:
        "La Seguridad Nacional corresponde a las Fuerzas Armadas (Ejército, Armada y Fuerza Aérea); Carabineros e Investigaciones velan por la seguridad PÚBLICA.",
    },
    {
      id: "m6_v19",
      afirmacion:
        "La actividad de seguridad privada es fiscalizada por Carabineros de Chile de la Prefectura del sector donde está emplazada la empresa.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo establece, junto con informar cada evento mediante el documento de Informaciones Policiales.",
    },
    {
      id: "m6_v20",
      afirmacion:
        "El proceso de administración comprende planificación, organización, dirección y control.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define esas cuatro funciones del proceso de administración.",
    },
  ],
};
