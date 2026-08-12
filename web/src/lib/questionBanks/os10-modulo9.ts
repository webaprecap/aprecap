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
        "El manual indica que entre el 10 y el 25% permanece unido y en calma, mientras un 75% manifiesta conducta desordenada y desconcierto.",
    },
    {
      id: "m9_a2",
      pregunta:
        "¿Qué porcentaje del público muestra confusión, ansiedad, paralización, gritos histéricos y pánico en el período de impacto?",
      opciones: ["10 a 25%", "75%", "50%", "Menos del 5%"],
      respuestaCorrecta: "10 a 25%",
      explicacion:
        "El manual asigna ese porcentaje a la confusión, ansiedad, paralización y pánico durante el impacto.",
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
        "El manual destaca que el primer comportamiento ocurre antes de la llegada del personal especializado.",
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
        "El manual describe así la red de acciones que determina la dinámica social de la emergencia.",
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
        "El manual indica que los planes de actuación ante emergencias deben contemplar esas cuatro fases.",
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
        "El manual exige que los planes sean conocidos por todas las personas, en especial por el personal de seguridad.",
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
        "El manual enumera esas posibles acciones del público.",
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
        "El manual define así la función del plan de emergencia y evacuación.",
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
        "El manual enumera esos tres objetivos de la intervención psicológica inmediata.",
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
        "El manual señala que las reacciones individuales están mediadas en gran parte por la conducta de los demás.",
    },
  ],
  vf: [
    {
      id: "m9_v1",
      afirmacion:
        "Ante una catástrofe, las reacciones a menudo no son las apropiadas y pueden provocar numerosas pérdidas de vidas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo afirma al inicio de la unidad sobre la emergencia.",
    },
    {
      id: "m9_v2",
      afirmacion:
        "El 75% del público manifiesta conducta desordenada y desconcierto durante el período de impacto.",
      respuestaCorrecta: true,
      explicacion:
        "El manual asigna un 75% a la conducta desordenada y desconcierto.",
    },
    {
      id: "m9_v3",
      afirmacion:
        "La mayoría de las personas piensa con anticipación qué haría si se viera envuelta en una emergencia.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que la mayoría de las personas NO piensa qué haría en una emergencia.",
    },
    {
      id: "m9_v4",
      afirmacion:
        "Entre las variables de las primeras reacciones se incluyen la forma de dar cuenta de la emergencia, la gravedad supuesta, el conocimiento del lugar y el entrenamiento.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lista esas variables, además del tipo de espacio, salidas de socorro, presencia de otras personas, experiencia anterior y características individuales.",
    },
    {
      id: "m9_v5",
      afirmacion:
        "Las competencias instrumentales incluyen la toma de decisiones, la resolución de problemas, la organización y planificación, y la gestión de la información.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esas competencias instrumentales.",
    },
    {
      id: "m9_v6",
      afirmacion:
        "El compromiso ético y el trabajo en equipo son competencias SISTÉMICAS según el manual.",
      respuestaCorrecta: false,
      explicacion:
        "Son competencias PERSONALES; las sistémicas son la adaptación a nuevas situaciones, la creatividad, la iniciativa y el liderazgo.",
    },
    {
      id: "m9_v7",
      afirmacion:
        "La información de riesgos debe ser suficiente para adquirir conocimientos claros de los riesgos.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo exige al describir los planes de información.",
    },
    {
      id: "m9_v8",
      afirmacion:
        "La puesta en práctica del plan de emergencia y el análisis periódico de los comportamientos emitidos son medidas organizativas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual las incluye entre las medidas organizativas.",
    },
    {
      id: "m9_v9",
      afirmacion:
        "El liderazgo requiere dominio de sí mismo y órdenes enérgicas y decididas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esas cualidades del liderazgo en emergencias.",
    },
    {
      id: "m9_v10",
      afirmacion:
        "Los planes de emergencia solo deben contemplar la fase de respuesta.",
      respuestaCorrecta: false,
      explicacion:
        "Deben contemplar preparación, prevención, respuesta y recuperación.",
    },
    {
      id: "m9_v11",
      afirmacion:
        "La intervención psicológica inmediata busca restablecer el equilibrio de los afectados.",
      respuestaCorrecta: true,
      explicacion:
        "El manual se refiere a las técnicas para restablecer el equilibrio como objetivo de la intervención psicológica.",
    },
    {
      id: "m9_v12",
      afirmacion:
        "El entrenamiento previo influye en las primeras reacciones ante una emergencia.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo incluye entre las variables de las primeras reacciones.",
    },
    {
      id: "m9_v13",
      afirmacion:
        "La presencia de humo y gases es una variable que condiciona las reacciones del público.",
      respuestaCorrecta: true,
      explicacion:
        "El manual la lista entre las variables de las primeras reacciones.",
    },
    {
      id: "m9_v14",
      afirmacion:
        "La edad y el sexo son características individuales que influyen en las reacciones ante la emergencia.",
      respuestaCorrecta: true,
      explicacion:
        "El manual incluye edad y sexo entre las características individuales que condicionan las reacciones.",
    },
    {
      id: "m9_v15",
      afirmacion:
        "La percepción del riesgo está condicionada por el modo en que la persona es alertada y por la apariencia de la situación.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lista ambos condicionantes de la percepción del riesgo.",
    },
    {
      id: "m9_v16",
      afirmacion:
        "Los planes de emergencia deben ser conocidos únicamente por los bomberos y las autoridades.",
      respuestaCorrecta: false,
      explicacion:
        "Deben ser conocidos por todas las personas de la instalación, en especial el personal de seguridad.",
    },
    {
      id: "m9_v17",
      afirmacion:
        "La dinámica social de la emergencia se determina por una complicada red de acciones individuales y grupales.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así la dinámica social de la emergencia.",
    },
    {
      id: "m9_v18",
      afirmacion:
        "En una emergencia, la experiencia anterior de la persona influye en sus reacciones.",
      respuestaCorrecta: true,
      explicacion:
        "El manual la incluye entre las variables de las primeras reacciones.",
    },
    {
      id: "m9_v19",
      afirmacion:
        "Las competencias sistémicas incluyen la adaptación a nuevas situaciones, la creatividad, la iniciativa y el espíritu emprendedor, y el liderazgo.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esas competencias sistémicas.",
    },
    {
      id: "m9_v20",
      afirmacion:
        "Al percibir una amenaza, la persona hace un balance inmediato que incluye la salud propia y ajena, y la confianza en su control.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe ese balance inmediato al percibir la amenaza.",
    },
  ],
};
