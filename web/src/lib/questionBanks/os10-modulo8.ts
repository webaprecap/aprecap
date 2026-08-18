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
        "El manual define el miedo como una reacción psico-fisiológica ante una situación de peligro, con cambios ligados al sistema nervioso autónomo y al endocrino. No es una enfermedad mental crónica ni un estado de tristeza permanente (eso es la depresión); y tampoco es ausencia de reacción: es una respuesta activa de protección ante el riesgo.",
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
        "El manual distingue así ambos conceptos: el miedo es la reacción de supervivencia ante una amenaza INMEDIATA, mientras la ansiedad responde a una amenaza menos inmediata a la que la persona puede poner fin. No son lo mismo; la ansiedad no siempre es más leve (puede ser crónica); y no se diferencian por ser innatos o aprendidos.",
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
        "El manual describe esas condiciones como desencadenantes del pánico (por ejemplo, en incendios): sentirse atrapado, vías de escape cerradas o colapsadas, o escasez de aire con síntomas de asfixia. No aparece en toda emergencia (depende de las condiciones), no es exclusivo de enfermos mentales, y un riesgo pequeño y controlable no lo provoca.",
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
        "El manual señala que el pánico es consecuencia de una búsqueda inútil de la respuesta y elimina toda voluntad de enfrentar el peligro, agravando el riesgo individual. No aumenta la capacidad de reacción ni mejora la toma de decisiones: la bloquea; y produce un cambio profundo, no neutro.",
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
        "El manual indica que es inútil razonar con la persona en pánico (no está en condiciones de escuchar razones): hay que darle órdenes, apartarla de la mirada de los demás (para evitar el contagio) y NUNCA dejarla sola, aunque aparente estar calmada. El agua fría no forma parte del manejo descrito.",
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
        "El manual recomienda asignarle pequeñas tareas de ayuda a otros conforme se calme, porque ocuparse de los demás la serena y la reintegra. Enviarla a su casa de inmediato la deja sin contención; mantenerla aislada hasta el final prolonga su estado; y rendir testimonio formal no corresponde a la fase de contención emocional.",
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
        "El manual indica que una voz serena, fuerte y equilibrada que diga sencillamente 'POR AQUÍ' basta para que quienes tienen la mente vacía la sigan y actúen racionalmente. '¡Cálmense!' es una orden genérica sin dirección; 'Esto es un simulacro' confunde; y 'No pasa nada' niega la emergencia en lugar de conducir a la gente.",
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
        "El manual señala que ante la emergencia las normas que regían la situación anterior quedan SUSPENDIDAS, y por lo tanto el comportamiento deja de ser ordenado y predecible. Por eso no se refuerzan, no permanecen iguales, y no se reemplazan por reglas militares: simplemente desaparece la estructura que las sostenía.",
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
        "El manual define la multitud como un amplio número de personas que comparten un centro de interés común durante un tiempo limitado y son conscientes de su influencia mutua. No es un grupo pequeño y organizado, no se define por un número arbitrario de integrantes, y carece de la estructura formal de una organización con objetivos definidos.",
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
        "El manual explica así la dificultad de hacer predicciones fiables sobre la multitud: carece de pasado y futuro, es inestable, no tiene objetivos ni planes elaborados y posee poca estructura, lo que la hace a veces altamente explosiva. La organización formal, los liderazgos fuertes y la falta de interacción son rasgos ajenos a esa inestabilidad.",
    },
  ],
  vf: [
    {
      id: "m8_v1",
      afirmacion:
        "La excitación de una emergencia se etiqueta emocionalmente como miedo-ansiedad-pánico-fobia.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así la gama emocional ante una emergencia: la excitación se etiqueta como miedo, ansiedad, pánico y fobia.",
    },
    {
      id: "m8_v2",
      afirmacion:
        "Las reacciones ante esas emociones van de la huida a las conductas de evitación, la búsqueda de protección, la agresividad y la depresión.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esa gama de reacciones ante el miedo, la ansiedad, el pánico y la fobia: huida, conductas de evitación, búsqueda de protección, agresividad y depresión.",
    },
    {
      id: "m8_v3",
      afirmacion:
        "El sentido básico del miedo es la protección ante estímulos peligrosos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual señala que el miedo tiene un sentido básico de protección ante estímulos peligrosos: es una reacción de supervivencia.",
    },
    {
      id: "m8_v4",
      afirmacion:
        "El ser humano nunca abusa del miedo; siempre lo usa con función protectora.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que el ser humano saca de contexto el carácter innato del miedo y 'abusamos del miedo', es decir, no siempre lo usamos con función protectora.",
    },
    {
      id: "m8_v5",
      afirmacion:
        "El ESTRÉS es la reacción continuada del organismo ante una amenaza que sigue sin resolverse.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define así el estrés: la reacción continuada del organismo ante una amenaza que sigue sin resolverse.",
    },
    {
      id: "m8_v6",
      afirmacion:
        "El miedo se supera definitivamente con la edad y la experiencia.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual afirma que el miedo no se supera nunca mientras vivamos, pero se aprende a MANEJARLO para que no paralice ni invalide a la persona.",
    },
    {
      id: "m8_v7",
      afirmacion:
        "Ver morir de manera violenta a familiares o amigos cercanos puede provocar pánico.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo señala como otro factor potencial de pánico, junto a sentirse atrapado o la escasez de aire con asfixia.",
    },
    {
      id: "m8_v8",
      afirmacion:
        "Es útil tratar de razonar con una persona que está bajo el efecto del pánico.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que es INÚTIL razonar con una persona en pánico, porque no está en condiciones de procesar razones; lo efectivo es darle órdenes y conducirla fuera del peligro.",
    },
    {
      id: "m8_v9",
      afirmacion:
        "A la persona en pánico se le puede dejar sola si aparenta estar calmada.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica NUNCA dejarla sola, aunque aparente estar calmada, porque el pánico puede reaparecer en cualquier momento.",
    },
    {
      id: "m8_v10",
      afirmacion:
        "En el pánico colectivo, el líder es el primero que reacciona preguntándose '¿Qué hacer?'.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual destaca esa reacción del líder en el pánico colectivo: es el primero que reacciona preguntándose '¿Qué hacer?' y conduce a los demás.",
    },
    {
      id: "m8_v11",
      afirmacion:
        "Si varias personas dicen 'POR AQUÍ' con direcciones contrarias, siempre se obedecerá a criterios procedentes de la razón.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual explica que, aun con actuaciones contrarias entre quienes dirigen, la gente obedece a criterios procedentes de la razón, es decir, sigue la indicación que le parece más racional.",
    },
    {
      id: "m8_v12",
      afirmacion:
        "En la multitud, el espacio privado se reduce al mínimo, lo que es clave para explicar la agregación y el pánico.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo menciona entre los aspectos psicopatológicos de la multitud: el espacio privado se reduce al mínimo y eso es clave para explicar la agregación y el pánico.",
    },
    {
      id: "m8_v13",
      afirmacion:
        "En la multitud las personas se sienten anónimas y pueden comportarse distinto que aisladas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe el anonimato y la volubilidad como características de la multitud: al sentirse anónimas, las personas pueden comportarse distinto que cuando están aisladas.",
    },
    {
      id: "m8_v14",
      afirmacion:
        "La multitud tiene objetivos y planes elaborados que le dan estabilidad.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la multitud CARECE de objetivos y planes elaborados, es inestable y no puede sostenerse durante largos períodos; por eso es difícil predecirla.",
    },
    {
      id: "m8_v15",
      afirmacion:
        "El líder-guía es importante en la emergencia para cortar o desacelerar la conducta desordenada y caótica.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual destaca la importancia del líder-guía en la emergencia: su presencia sirve para cortar o desacelerar la conducta desordenada y caótica durante la evacuación.",
    },
    {
      id: "m8_v16",
      afirmacion:
        "La multitud se autogenera sin fronteras naturales y en ella dominan la igualdad y el anonimato.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así los aspectos psicopatológicos de la multitud: se autogenera sin fronteras naturales y en ella dominan la igualdad y el anonimato.",
    },
    {
      id: "m8_v17",
      afirmacion:
        "Las personas en multitud son fácilmente sugestionables y altamente emocionales.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe a los miembros de la multitud como volubles, espontáneos, emocionales y sugestionables, lo que facilita el contagio de conductas.",
    },
    {
      id: "m8_v18",
      afirmacion:
        "El pánico aparece principalmente cuando las vías de escape están abiertas y despejadas.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el pánico aparece cuando las vías de escape están CERRADAS o colapsan y la persona se siente atrapada, sin posibilidad de escapar y con sensación de asfixia.",
    },
    {
      id: "m8_v19",
      afirmacion:
        "El miedo se reconoce por cambios fisiológicos ligados al sistema nervioso autónomo y al endocrino.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo señala al definir el miedo: es una reacción psico-fisiológica que se reconoce por cambios ligados al sistema nervioso autónomo y al endocrino.",
    },
    {
      id: "m8_v20",
      afirmacion:
        "Ante una emergencia, el comportamiento de las personas continúa siendo ordenado y predecible.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica lo contrario: al suspenderse las normas que regían la situación, el comportamiento deja de ser ordenado y predecible.",
    },
  ],
};