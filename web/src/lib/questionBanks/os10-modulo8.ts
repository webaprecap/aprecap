import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Valores, Ética y Psicoprevención"
// (unidades: Miedo, Ansiedad y Pánico; Manejo del pánico individual y colectivo)
// del Manual OS-10 Aprecap.

export const bancoModulo8: BancoModulo = {
  numero: 8,
  titulo: "Psicología en Crisis",
  alternativas: [
    {
      id: "m8_a1",
      pregunta:
        "¿Qué es el MIEDO según el manual?",
      opciones: [
        "Una reacción psico-fisiológica ante una situación de peligro",
        "Una enfermedad mental crónica",
        "Un estado de tristeza permanente",
        "La ausencia de reacción ante el riesgo",
      ],
      respuestaCorrecta:
        "Una reacción psico-fisiológica ante una situación de peligro",
      explicacion:
        "El manual define el miedo como reacción psico-fisiológica ante una situación de peligro, con cambios ligados al sistema nervioso autónomo.",
    },
    {
      id: "m8_a2",
      pregunta:
        "¿En qué se diferencia el MIEDO de la ANSIEDAD?",
      opciones: [
        "Son exactamente lo mismo",
        "El miedo es la reacción de supervivencia ante una amenaza inmediata; la ansiedad es la reacción ante una amenaza menos inmediata a la que la persona puede poner fin",
        "La ansiedad es más leve que el miedo en todos los casos",
        "El miedo es aprendido y la ansiedad es innata",
      ],
      respuestaCorrecta:
        "El miedo es la reacción de supervivencia ante una amenaza inmediata; la ansiedad es la reacción ante una amenaza menos inmediata a la que la persona puede poner fin",
      explicacion:
        "El manual distingue así ambos conceptos; el estrés es la reacción continuada ante una amenaza sin resolver y la preocupación es como la ansiedad sin influencia sobre ella.",
    },
    {
      id: "m8_a3",
      pregunta:
        "¿Cuándo aparece el PÁNICO según el manual?",
      opciones: [
        "Cuando la persona se siente atrapada, es imposible escapar o el aire fresco es escaso con síntomas de asfixia",
        "Siempre que ocurre una emergencia",
        "Solo en personas con enfermedades mentales",
        "Cuando el riesgo es pequeño y controlable",
      ],
      respuestaCorrecta:
        "Cuando la persona se siente atrapada, es imposible escapar o el aire fresco es escaso con síntomas de asfixia",
      explicacion:
        "El manual describe esas condiciones como desencadenantes del pánico (por ejemplo, en incendios).",
    },
    {
      id: "m8_a4",
      pregunta:
        "¿Qué efecto tiene el pánico sobre la voluntad de la persona?",
      opciones: [
        "Aumenta la capacidad de reacción",
        "Elimina toda voluntad de hacerle frente al peligro y agrava el riesgo individual",
        "No produce ningún cambio",
        "Mejora la toma de decisiones",
      ],
      respuestaCorrecta:
        "Elimina toda voluntad de hacerle frente al peligro y agrava el riesgo individual",
      explicacion:
        "El manual señala que el pánico es consecuencia de una búsqueda inútil de la respuesta y elimina la voluntad de enfrentar el peligro.",
    },
    {
      id: "m8_a5",
      pregunta:
        "¿Cómo se maneja el PÁNICO INDIVIDUAL?",
      opciones: [
        "Razonando con la persona hasta que entienda",
        "Dando órdenes y conduciéndola fuera del peligro y de la mirada de los demás, sin dejarla sola",
        "Dejándola sola si aparenta estar calmada",
        "Aplicando agua fría en la cara",
      ],
      respuestaCorrecta:
        "Dando órdenes y conduciéndola fuera del peligro y de la mirada de los demás, sin dejarla sola",
      explicacion:
        "El manual indica que es inútil razonar con la persona en pánico; hay que dar órdenes, apartarla de la mirada de los demás y nunca dejarla sola.",
    },
    {
      id: "m8_a6",
      pregunta:
        "¿Qué puede hacer la persona en pánico conforme se calma?",
      opciones: [
        "Debe ser enviada de inmediato a su casa",
        "Se le pueden asignar pequeñas tareas de ayuda a otros, lo que puede serenarla",
        "Debe permanecer aislada hasta el final",
        "Debe rendir un testimonio formal",
      ],
      respuestaCorrecta:
        "Se le pueden asignar pequeñas tareas de ayuda a otros, lo que puede serenarla",
      explicacion:
        "El manual recomienda asignarle pequeñas tareas de ayuda conforme se calme.",
    },
    {
      id: "m8_a7",
      pregunta:
        "En el manejo del PÁNICO COLECTIVO, ¿qué frase basta para que la gente actúe racionalmente?",
      opciones: [
        "'¡Cálmense todos!'",
        "'POR AQUÍ', dicha con voz serena, fuerte y equilibrada",
        "'Esto es un simulacro'",
        "'No pasa nada'",
      ],
      respuestaCorrecta:
        "'POR AQUÍ', dicha con voz serena, fuerte y equilibrada",
      explicacion:
        "El manual indica que una voz serena, fuerte y equilibrada que diga sencillamente 'POR AQUÍ' basta para que quienes tienen la mente vacía la sigan.",
    },
    {
      id: "m8_a8",
      pregunta:
        "¿Qué sucede con las normas de conducta cuando se declara una emergencia?",
      opciones: [
        "Se refuerzan inmediatamente",
        "Quedan suspendidas y el comportamiento deja de ser ordenado y predecible",
        "No sufren ningún cambio",
        "Se reemplazan por reglas militares",
      ],
      respuestaCorrecta:
        "Quedan suspendidas y el comportamiento deja de ser ordenado y predecible",
      explicacion:
        "El manual señala que ante la emergencia las normas que regían la situación anterior quedan suspendidas.",
    },
    {
      id: "m8_a9",
      pregunta:
        "¿Qué es una MULTITUD según el manual?",
      opciones: [
        "Un grupo pequeño y organizado",
        "Un amplio número de personas que comparten un centro de interés común durante un tiempo limitado, conscientes de su influencia mutua",
        "Cualquier grupo de más de diez personas",
        "Una organización formal con objetivos definidos",
      ],
      respuestaCorrecta:
        "Un amplio número de personas que comparten un centro de interés común durante un tiempo limitado, conscientes de su influencia mutua",
      explicacion:
        "El manual define así la multitud.",
    },
    {
      id: "m8_a10",
      pregunta:
        "Según el manual, ¿por qué la multitud es de naturaleza a veces altamente explosiva?",
      opciones: [
        "Porque está bien organizada",
        "Porque carece de pasado y futuro, es inestable, sin objetivos ni planes elaborados y con poca estructura",
        "Porque tiene liderazgos fuertes",
        "Porque sus miembros no interactúan entre sí",
      ],
      respuestaCorrecta:
        "Porque carece de pasado y futuro, es inestable, sin objetivos ni planes elaborados y con poca estructura",
      explicacion:
        "El manual explica así la dificultad de hacer predicciones fiables sobre la multitud.",
    },
  ],
  vf: [
    {
      id: "m8_v1",
      afirmacion:
        "La excitación de una emergencia se etiqueta emocionalmente como miedo-ansiedad-pánico-fobia.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así la gama emocional ante una emergencia.",
    },
    {
      id: "m8_v2",
      afirmacion:
        "Las reacciones ante esas emociones van de la huida a las conductas de evitación, la búsqueda de protección, la agresividad y la depresión.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esa gama de reacciones.",
    },
    {
      id: "m8_v3",
      afirmacion:
        "El sentido básico del miedo es la protección ante estímulos peligrosos.",
      respuestaCorrecta: true,
      explicacion:
        "El manual señala que el miedo tiene un sentido básico de protección.",
    },
    {
      id: "m8_v4",
      afirmacion:
        "El ser humano nunca abusa del miedo; siempre lo usa con función protectora.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que el ser humano saca de contexto el carácter innato del miedo y 'abusamos del miedo'.",
    },
    {
      id: "m8_v5",
      afirmacion:
        "El ESTRÉS es la reacción continuada del organismo ante una amenaza que sigue sin resolverse.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define así el estrés.",
    },
    {
      id: "m8_v6",
      afirmacion:
        "El miedo se supera definitivamente con la edad y la experiencia.",
      respuestaCorrecta: false,
      explicacion:
        "El manual afirma que el miedo no se supera nunca mientras vivamos, pero se aprende a manejarlo para que no paralice ni invalide.",
    },
    {
      id: "m8_v7",
      afirmacion:
        "Ver morir de manera violenta a familiares o amigos cercanos puede provocar pánico.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo señala como otro factor potencial de pánico.",
    },
    {
      id: "m8_v8",
      afirmacion:
        "Es útil tratar de razonar con una persona que está bajo el efecto del pánico.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que es inútil razonar con una persona en pánico; hay que dar órdenes y conducirla fuera del peligro.",
    },
    {
      id: "m8_v9",
      afirmacion:
        "A la persona en pánico se le puede dejar sola si aparenta estar calmada.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica nunca dejarla sola aunque aparente estar calmada.",
    },
    {
      id: "m8_v10",
      afirmacion:
        "En el pánico colectivo, el líder es el primero que reacciona preguntándose '¿Qué hacer?'.",
      respuestaCorrecta: true,
      explicacion:
        "El manual destaca esa reacción del líder.",
    },
    {
      id: "m8_v11",
      afirmacion:
        "Si varias personas dicen 'POR AQUÍ' con direcciones contrarias, siempre se obedecerá a criterios procedentes de la razón.",
      respuestaCorrecta: true,
      explicacion:
        "El manual explica que, aun con actuaciones contrarias, se obedece a criterios racionales.",
    },
    {
      id: "m8_v12",
      afirmacion:
        "En la multitud, el espacio privado se reduce al mínimo, lo que es clave para explicar la agregación y el pánico.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo menciona entre los aspectos psicopatológicos de la multitud.",
    },
    {
      id: "m8_v13",
      afirmacion:
        "En la multitud las personas se sienten anónimas y pueden comportarse distinto que aisladas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe el anonimato y la volubilidad como características de la multitud.",
    },
    {
      id: "m8_v14",
      afirmacion:
        "La multitud tiene objetivos y planes elaborados que le dan estabilidad.",
      respuestaCorrecta: false,
      explicacion:
        "La multitud carece de objetivos y planes elaborados, es inestable y no puede sostenerse largos períodos.",
    },
    {
      id: "m8_v15",
      afirmacion:
        "El líder-guía es importante en la emergencia para cortar o desacelerar la conducta desordenada y caótica.",
      respuestaCorrecta: true,
      explicacion:
        "El manual destaca la importancia del líder-guía en la evacuación.",
    },
    {
      id: "m8_v16",
      afirmacion:
        "La multitud se autogenera sin fronteras naturales y en ella dominan la igualdad y el anonimato.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así los aspectos psicopatológicos de la multitud.",
    },
    {
      id: "m8_v17",
      afirmacion:
        "Las personas en multitud son fácilmente sugestionables y altamente emocionales.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe a los miembros de la multitud como volubles, espontáneos, emocionales y sugestionables.",
    },
    {
      id: "m8_v18",
      afirmacion:
        "El pánico aparece principalmente cuando las vías de escape están abiertas y despejadas.",
      respuestaCorrecta: false,
      explicacion:
        "El pánico aparece cuando las vías de escape están cerradas o colapsan y la persona se siente atrapada.",
    },
    {
      id: "m8_v19",
      afirmacion:
        "El miedo se reconoce por cambios fisiológicos ligados al sistema nervioso autónomo y al endocrino.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo señala al definir el miedo.",
    },
    {
      id: "m8_v20",
      afirmacion:
        "Ante una emergencia, el comportamiento de las personas continúa siendo ordenado y predecible.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica lo contrario: al suspenderse las normas, el comportamiento deja de ser ordenado y predecible.",
    },
  ],
};
