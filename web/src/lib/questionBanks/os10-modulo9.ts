import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Valores, Ética y Psicoprevención"
// (unidades: La emergencia y sus manifestaciones; Reacciones del público;
// Planes de emergencia) del Manual OS-10 Aprecap.

export const bancoModulo9: BancoModulo = {
  numero: 9,
  titulo: "Psicología en Emergencias",
  alternativas: [
    {
      id: "m9_a1",
      pregunta:
        "Durante el período de impacto de una catástrofe, ¿qué porcentaje del público permanece unido y en calma, estudiando un plan de acción?",
      opciones: ["50%", "75%", "10 a 25%", "100%"],
      respuestaCorrecta: "10 a 25%",
      explicacion:
        "El manual indica que entre el 10 y el 25% del público permanece unido y en calma, estudiando un plan de acción. El 75% manifiesta conducta desordenada y desconcierto; el 50% no es la cifra indicada para ningún grupo; y el 100% contradice el hecho de que la mayoría se desconcierta.",
    },
    {
      id: "m9_a2",
      pregunta:
        "¿Qué porcentaje del público muestra confusión, ansiedad, paralización, gritos histéricos y pánico en el período de impacto?",
      opciones: ["10 a 25%", "75%", "50%", "Menos del 5%"],
      respuestaCorrecta: "10 a 25%",
      explicacion:
        "El manual asigna ese porcentaje (10 a 25%) a la confusión, ansiedad, paralización, gritos histéricos y pánico durante el período de impacto. El 75% corresponde a la conducta desordenada y el desconcierto; el 50% no es una cifra citada; y 'menos del 5%' subestima la cantidad de personas que reaccionan así.",
    },
    {
      id: "m9_a3",
      pregunta:
        "Según el manual, ¿cuándo se produce el PRIMER comportamiento ante una emergencia?",
      opciones: [
        "Después de la llegada del personal especializado",
        "Antes de que llegue el personal especializado, siendo el momento más crucial para el salvamento de vidas",
        "Solo cuando la autoridad lo ordena",
        "Al día siguiente del suceso",
      ],
      respuestaCorrecta:
        "Antes de que llegue el personal especializado, siendo el momento más crucial para el salvamento de vidas",
      explicacion:
        "El manual destaca que el primer comportamiento ante una emergencia se produce ANTES de la llegada del personal especializado, y que ese lapso es el más crucial para el salvamento de vidas. Esperar a los especialistas, a la autoridad o al día siguiente perdería la ventana crítica de acción.",
    },
    {
      id: "m9_a4",
      pregunta:
        "¿Cómo se estructura la dinámica social de una emergencia?",
      opciones: [
        "Solo por grupos organizados",
        "Por una red de acciones individuales y grupales: individuos aislados, individuos en colaboración, grupos aislados y grupos en colaboración",
        "Exclusivamente por las autoridades",
        "Por la acción de un líder único",
      ],
      respuestaCorrecta:
        "Por una red de acciones individuales y grupales: individuos aislados, individuos en colaboración, grupos aislados y grupos en colaboración",
      explicacion:
        "El manual describe así la dinámica social de la emergencia: una complicada red de acciones individuales y grupales que combina individuos aislados, individuos en colaboración, grupos aislados y grupos en colaboración. No se limita a grupos organizados, ni a las autoridades, ni a un líder único.",
    },
    {
      id: "m9_a5",
      pregunta:
        "¿Qué fases deben contemplar los planes de emergencia?",
      opciones: [
        "Preparación, prevención, respuesta y recuperación",
        "Solo evacuación y rescate",
        "Simulación y evaluación únicamente",
        "Compra de equipos y contratación de personal",
      ],
      respuestaCorrecta:
        "Preparación, prevención, respuesta y recuperación",
      explicacion:
        "El manual indica que los planes de actuación ante emergencias deben contemplar las cuatro fases: preparación, prevención, respuesta y recuperación. Evacuación y rescate son acciones de la fase de respuesta; la simulación es solo un medio de entrenamiento; y comprar equipos o contratar personal son gestiones puntuales, no fases del plan.",
    },
    {
      id: "m9_a6",
      pregunta:
        "¿Quiénes deben conocer los planes de emergencia de una instalación?",
      opciones: [
        "Solo el personal de seguridad",
        "Solo la gerencia",
        "Todas las personas de la instalación, en especial el personal de seguridad",
        "Solo los bomberos",
      ],
      respuestaCorrecta:
        "Todas las personas de la instalación, en especial el personal de seguridad",
      explicacion:
        "El manual exige que los planes de emergencia sean conocidos por TODAS las personas de la instalación, en especial por el personal de seguridad, que es quien debe ejecutarlos. Limitarlos al personal de seguridad, a la gerencia o a los bomberos dejaría sin preparación a los demás ocupantes, que también deben actuar.",
    },
    {
      id: "m9_a7",
      pregunta:
        "¿Cuál es una de las acciones posibles del público ante una emergencia según el manual?",
      opciones: [
        "Esperar pasivamente sin hacer nada",
        "Evacuar, combatir el suceso, dar la alarma, prevenir a los demás y reunirse en puntos de convergencia",
        "Solo grabar con el celular",
        "Abandonar el lugar sin avisar a nadie",
      ],
      respuestaCorrecta:
        "Evacuar, combatir el suceso, dar la alarma, prevenir a los demás y reunirse en puntos de convergencia",
      explicacion:
        "El manual enumera esas posibles acciones del público ante una emergencia: evacuar, combatir el suceso, dar la alarma, prevenir a los demás y reunirse en puntos de convergencia. Esperar pasivamente, grabar con el celular o irse sin avisar son conductas que agravan el riesgo y no están entre las acciones recomendadas.",
    },
    {
      id: "m9_a8",
      pregunta:
        "¿Qué función cumple el plan de emergencia y evacuación?",
      opciones: [
        "Cumplir un trámite legal sin utilidad práctica",
        "Crear normas de organización humana donde frecuentemente no existen, potenciando comportamientos adaptados",
        "Reemplazar la necesidad de entrenamiento",
        "Solo informar a las autoridades",
      ],
      respuestaCorrecta:
        "Crear normas de organización humana donde frecuentemente no existen, potenciando comportamientos adaptados",
      explicacion:
        "El manual define así la función del plan de emergencia y evacuación: crear normas de organización humana donde frecuentemente no existen, potenciando los comportamientos adaptados del público. No es un trámite sin utilidad, no reemplaza el entrenamiento (ambos se complementan) y su fin no es solo informar a las autoridades.",
    },
    {
      id: "m9_a9",
      pregunta:
        "¿Cuáles son los objetivos de la intervención psicológica inmediata?",
      opciones: [
        "Curar los traumas definitivamente en el lugar",
        "Mitigar las consecuencias del suceso en los afectados, disminuir los niveles de estrés de los intervinientes y asesorar a la Dirección de la emergencia",
        "Solo entretener a los afectados",
        "Reemplazar la atención médica",
      ],
      respuestaCorrecta:
        "Mitigar las consecuencias del suceso en los afectados, disminuir los niveles de estrés de los intervinientes y asesorar a la Dirección de la emergencia",
      explicacion:
        "El manual enumera esos tres objetivos de la intervención psicológica inmediata: mitigar las consecuencias del suceso en los afectados, disminuir los niveles de estrés de los intervinientes y asesorar a la Dirección de la emergencia. No cura traumas en el lugar (eso requiere tratamiento posterior), no entretiene y no reemplaza la atención médica: la complementa.",
    },
    {
      id: "m9_a10",
      pregunta:
        "Según el manual, ¿qué determina en gran parte las reacciones individuales ante una emergencia?",
      opciones: [
        "La conducta de los demás",
        "Únicamente la edad de la persona",
        "El clima del día",
        "La cantidad de cámaras de seguridad",
      ],
      respuestaCorrecta: "La conducta de los demás",
      explicacion:
        "El manual señala que las reacciones individuales ante una emergencia están mediadas en gran parte por la conducta de los demás: las personas se contagian del comportamiento de quienes las rodean. La edad influye como característica individual, pero no es el único factor; el clima y las cámaras no determinan las reacciones.",
    },
  ],
  vf: [
    {
      id: "m9_v1",
      afirmacion:
        "Ante una catástrofe, las reacciones a menudo no son las apropiadas y pueden provocar numerosas pérdidas de vidas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo afirma al inicio de la unidad sobre la emergencia: las reacciones del público a menudo no son las apropiadas y pueden provocar numerosas pérdidas de vidas.",
    },
    {
      id: "m9_v2",
      afirmacion:
        "El 75% del público manifiesta conducta desordenada y desconcierto durante el período de impacto.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual asigna un 75% del público a la conducta desordenada y el desconcierto durante el período de impacto, mientras el 10-25% permanece en calma.",
    },
    {
      id: "m9_v3",
      afirmacion:
        "La mayoría de las personas piensa con anticipación qué haría si se viera envuelta en una emergencia.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que la mayoría de las personas NO piensa con anticipación qué haría en una emergencia, y por eso los planes de emergencia y el entrenamiento son tan importantes.",
    },
    {
      id: "m9_v4",
      afirmacion:
        "Entre las variables de las primeras reacciones se incluyen la forma de dar cuenta de la emergencia, la gravedad supuesta, el conocimiento del lugar y el entrenamiento.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lista esas variables de las primeras reacciones, además del tipo de espacio, las salidas de socorro, la presencia de otras personas, la experiencia anterior y las características individuales.",
    },
    {
      id: "m9_v5",
      afirmacion:
        "Las competencias instrumentales incluyen la toma de decisiones, la resolución de problemas, la organización y planificación, y la gestión de la información.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esas competencias instrumentales: toma de decisiones, resolución de problemas, organización y planificación, y gestión de la información.",
    },
    {
      id: "m9_v6",
      afirmacion:
        "El compromiso ético y el trabajo en equipo son competencias SISTÉMICAS según el manual.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el compromiso ético y el trabajo en equipo son competencias PERSONALES. Las competencias sistémicas son la adaptación a nuevas situaciones, la creatividad, la iniciativa y el espíritu emprendedor, y el liderazgo.",
    },
    {
      id: "m9_v7",
      afirmacion:
        "La información de riesgos debe ser suficiente para adquirir conocimientos claros de los riesgos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo exige al describir los planes de información: la información de riesgos debe ser suficiente para adquirir conocimientos claros de los riesgos.",
    },
    {
      id: "m9_v8",
      afirmacion:
        "La puesta en práctica del plan de emergencia y el análisis periódico de los comportamientos emitidos son medidas organizativas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual las incluye entre las medidas organizativas: poner en práctica el plan y analizar periódicamente los comportamientos emitidos.",
    },
    {
      id: "m9_v9",
      afirmacion:
        "El liderazgo requiere dominio de sí mismo y órdenes enérgicas y decididas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esas cualidades del liderazgo en emergencias: dominio de sí mismo y órdenes enérgicas y decididas, entre otras.",
    },
    {
      id: "m9_v10",
      afirmacion:
        "Los planes de emergencia solo deben contemplar la fase de respuesta.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: los planes de emergencia deben contemplar las cuatro fases: preparación, prevención, respuesta y recuperación. Reducirlos a la respuesta deja sin preparación ni recuperación a la instalación.",
    },
    {
      id: "m9_v11",
      afirmacion:
        "La intervención psicológica inmediata busca restablecer el equilibrio de los afectados.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual se refiere a las técnicas para restablecer el equilibrio de los afectados como objetivo de la intervención psicológica inmediata.",
    },
    {
      id: "m9_v12",
      afirmacion:
        "El entrenamiento previo influye en las primeras reacciones ante una emergencia.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo incluye entre las variables de las primeras reacciones: quien está entrenado reacciona de forma más adaptada.",
    },
    {
      id: "m9_v13",
      afirmacion:
        "La presencia de humo y gases es una variable que condiciona las reacciones del público.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual la lista entre las variables de las primeras reacciones: el humo y los gases condicionan la percepción y la conducta del público.",
    },
    {
      id: "m9_v14",
      afirmacion:
        "La edad y el sexo son características individuales que influyen en las reacciones ante la emergencia.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual incluye la edad y el sexo entre las características individuales que condicionan las reacciones ante la emergencia.",
    },
    {
      id: "m9_v15",
      afirmacion:
        "La percepción del riesgo está condicionada por el modo en que la persona es alertada y por la apariencia de la situación.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lista ambos condicionantes de la percepción del riesgo: la forma en que la persona es alertada y la apariencia de la situación.",
    },
    {
      id: "m9_v16",
      afirmacion:
        "Los planes de emergencia deben ser conocidos únicamente por los bomberos y las autoridades.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: los planes de emergencia deben ser conocidos por TODAS las personas de la instalación, en especial por el personal de seguridad, no solo por bomberos y autoridades.",
    },
    {
      id: "m9_v17",
      afirmacion:
        "La dinámica social de la emergencia se determina por una complicada red de acciones individuales y grupales.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así la dinámica social de la emergencia: una complicada red de acciones individuales y grupales (individuos aislados o en colaboración, grupos aislados o en colaboración).",
    },
    {
      id: "m9_v18",
      afirmacion:
        "En una emergencia, la experiencia anterior de la persona influye en sus reacciones.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual la incluye entre las variables de las primeras reacciones: quien ya vivió una emergencia reacciona de manera distinta.",
    },
    {
      id: "m9_v19",
      afirmacion:
        "Las competencias sistémicas incluyen la adaptación a nuevas situaciones, la creatividad, la iniciativa y el espíritu emprendedor, y el liderazgo.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esas competencias sistémicas: adaptación a nuevas situaciones, creatividad, iniciativa y espíritu emprendedor, y liderazgo.",
    },
    {
      id: "m9_v20",
      afirmacion:
        "Al percibir una amenaza, la persona hace un balance inmediato que incluye la salud propia y ajena, y la confianza en su control.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe ese balance inmediato al percibir la amenaza: la persona evalúa la salud propia y ajena, la confianza en su control y otros factores.",
    },
  ],
};