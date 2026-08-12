import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Valores, Ética y Psicoprevención"
// (unidad: Psicoprevención de Riesgos) del Manual OS-10 Aprecap.

export const bancoModulo7: BancoModulo = {
  numero: 7,
  titulo: "Psicología de emergencias",
  alternativas: [
    {
      id: "m7_a1",
      pregunta:
        "¿Qué es la PSICOPREVENCIÓN según el manual?",
      opciones: [
        "Una técnica de primeros auxilios psicológicos",
        "Una rama de la psicología laboral cuyo objetivo es cambiar actitudes y modificar conductas inadecuadas para lograr un trabajo seguro",
        "El estudio de los trastornos mentales del personal",
        "Una norma legal sobre salud mental",
      ],
      respuestaCorrecta:
        "Una rama de la psicología laboral cuyo objetivo es cambiar actitudes y modificar conductas inadecuadas para lograr un trabajo seguro",
      explicacion:
        "El manual define la psicoprevención como complemento de la prevención de riesgos, rama de la psicología laboral.",
    },
    {
      id: "m7_a2",
      pregunta:
        "¿Cuál es un objetivo de la psicoprevención?",
      opciones: [
        "Aumentar la productividad sin importar la seguridad",
        "Conseguir diferenciar la percepción de riesgo y el riesgo real",
        "Eliminar todos los riesgos del trabajo",
        "Reemplazar la capacitación técnica",
      ],
      respuestaCorrecta:
        "Conseguir diferenciar la percepción de riesgo y el riesgo real",
      explicacion:
        "El manual lista entre los objetivos de la psicoprevención diferenciar la percepción de riesgo del riesgo real.",
    },
    {
      id: "m7_a3",
      pregunta:
        "¿Qué forma de autodestrucción produce un número importante de accidentes según el manual?",
      opciones: [
        "El exceso de capacitación",
        "La osadía, la imprudencia",
        "La prudencia excesiva",
        "El trabajo en equipo",
      ],
      respuestaCorrecta: "La osadía, la imprudencia",
      explicacion:
        "El manual indica que los impulsos autodestructivos se disfrazan de múltiples formas, y una de las que produce más accidentes es la osadía, la imprudencia.",
    },
    {
      id: "m7_a4",
      pregunta:
        "¿Cómo se define el RIESGO en el manual?",
      opciones: [
        "La probabilidad de que en una condición se produzca una pérdida determinada",
        "Todo peligro presente en el trabajo",
        "El daño efectivamente ocurrido",
        "La suma de accidentes del año",
      ],
      respuestaCorrecta:
        "La probabilidad de que en una condición se produzca una pérdida determinada",
      explicacion:
        "El manual define el riesgo como la probabilidad de que en una condición se produzca una pérdida determinada.",
    },
    {
      id: "m7_a5",
      pregunta:
        "¿Cómo es la PERCEPCIÓN del riesgo según el manual?",
      opciones: [
        "Siempre objetiva y medible",
        "Fundamentalmente subjetiva, mediada por la idea propia del riesgo y la amenaza experimentada",
        "Idéntica en todas las personas",
        "Una evaluación técnica realizada por especialistas",
      ],
      respuestaCorrecta:
        "Fundamentalmente subjetiva, mediada por la idea propia del riesgo y la amenaza experimentada",
      explicacion:
        "El manual señala que la percepción del riesgo es fundamentalmente subjetiva, no una evaluación objetiva.",
    },
    {
      id: "m7_a6",
      pregunta:
        "Según el manual, ¿qué efecto tienen el miedo y la angustia durante una emergencia?",
      opciones: [
        "Mejoran la capacidad de decisión",
        "Pueden bloquear el desempeño intelectual",
        "No producen ningún efecto",
        "Aceleran los reflejos",
      ],
      respuestaCorrecta: "Pueden bloquear el desempeño intelectual",
      explicacion:
        "El manual advierte que en una emergencia el miedo y la angustia pueden bloquear el desempeño intelectual.",
    },
    {
      id: "m7_a7",
      pregunta:
        "¿Qué rasgo de personalidad se caracteriza por conductas escandalosas, exageradas e infantiles, con riesgo de contagio?",
      opciones: ["El rasgo depresivo", "El rasgo histérico", "El rasgo obsesivo", "El rasgo pasivo"],
      respuestaCorrecta: "El rasgo histérico",
      explicacion:
        "El manual describe el rasgo histérico con conductas escandalosas, exageradas, infantiles y primitivas; su nocividad es el riesgo de contagio.",
    },
    {
      id: "m7_a8",
      pregunta:
        "¿Cómo se evita la nocividad del rasgo HISTÉRICO en una emergencia?",
      opciones: [
        "Razonando con la persona",
        "Aislándolo del público (sin espectadores) o administrándole un estímulo fuerte",
        "Dejándolo solo para que se calme",
        "Reuniéndolo con más personas",
      ],
      respuestaCorrecta:
        "Aislándolo del público (sin espectadores) o administrándole un estímulo fuerte",
      explicacion:
        "El manual indica aislar al sujeto sin espectadores o administrar un estímulo fuerte para evitar el contagio.",
    },
    {
      id: "m7_a9",
      pregunta:
        "Según el manual, ¿qué relación existe entre la instrucción académica y el comportamiento en emergencias?",
      opciones: [
        "A mayor instrucción académica, más autocontrol",
        "A mayor instrucción, menos cooperativismo",
        "No existe relación alguna",
        "Las personas con estudios reaccionan peor",
      ],
      respuestaCorrecta: "A mayor instrucción académica, más autocontrol",
      explicacion:
        "El manual señala que a mayor instrucción académica hay más autocontrol; en bajos niveles de formación hay inseguridad, desconcierto y menor cooperativismo.",
    },
    {
      id: "m7_a10",
      pregunta:
        "¿Qué es la TERRITORIALIDAD según el manual?",
      opciones: [
        "El temor a responsabilizarse de los actos",
        "La influencia de un espacio cerrado sobre la conducta de las personas allí congregadas",
        "La agresividad por frustración",
        "El instinto de reunirse en grupo",
      ],
      respuestaCorrecta:
        "La influencia de un espacio cerrado sobre la conducta de las personas allí congregadas",
      explicacion:
        "El manual define la territorialidad como la influencia de un espacio cerrado sobre la conducta de las personas congregadas.",
    },
  ],
  vf: [
    {
      id: "m7_v1",
      afirmacion:
        "La psicoprevención pretende que las personas tomen conciencia permanente de su seguridad.",
      respuestaCorrecta: true,
      explicacion:
        "Es uno de los objetivos de la psicoprevención listados en el manual.",
    },
    {
      id: "m7_v2",
      afirmacion:
        "Las personas son portadoras únicamente de impulsos constructivos en el subconsciente.",
      respuestaCorrecta: false,
      explicacion:
        "El manual señala que las personas son portadoras de impulsos constructivos Y destructivos.",
    },
    {
      id: "m7_v3",
      afirmacion:
        "La mente humana tiende a eliminar o rechazar lo negativo o amenazante, haciendo ver como distantes las situaciones de accidente.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así el mecanismo de rechazo de lo amenazante.",
    },
    {
      id: "m7_v4",
      afirmacion:
        "La autodestrucción puede vestirse de sueño, llevando a la persona a dormirse y realizar una acción imprudente.",
      respuestaCorrecta: true,
      explicacion:
        "El manual menciona el sueño como una forma sutil de autodestrucción.",
    },
    {
      id: "m7_v5",
      afirmacion:
        "Los comportamientos ante el peligro van desde una actitud de calma hasta el verdadero pánico.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe esa gama de comportamientos ante el peligro inminente.",
    },
    {
      id: "m7_v6",
      afirmacion:
        "Los factores socioculturales son la base de las reacciones de la población ante fenómenos naturales.",
      respuestaCorrecta: true,
      explicacion:
        "El manual afirma que la percepción de los fenómenos naturales incluye actitudes, temores, conocimientos, creencias y mitos.",
    },
    {
      id: "m7_v7",
      afirmacion:
        "La conducta colectiva es ejecutada por un grupo con organización formal y jerarquía estable.",
      respuestaCorrecta: false,
      explicacion:
        "Los grupos de conducta colectiva son generalmente transitorios y carecen de organización formal.",
    },
    {
      id: "m7_v8",
      afirmacion:
        "Las normas de la conducta colectiva son creadas por los mismos participantes y pueden incluso ser opuestas a las de la sociedad.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo señala expresamente.",
    },
    {
      id: "m7_v9",
      afirmacion:
        "La personalidad determina un grado de predictibilidad en las reacciones personales.",
      respuestaCorrecta: true,
      explicacion:
        "El manual relaciona la personalidad con la predictibilidad de las reacciones.",
    },
    {
      id: "m7_v10",
      afirmacion:
        "El rasgo DEPRESIVO se caracteriza por ideas fijas e irrechazables.",
      respuestaCorrecta: false,
      explicacion:
        "Las ideas fijas e irrechazables corresponden al rasgo OBSESIVO; el depresivo presenta conductas pesimistas y desmoralizantes con riesgo de conductas suicidas.",
    },
    {
      id: "m7_v11",
      afirmacion:
        "Las personas con buenas condiciones físicas pueden asumir riesgos excesivos por la confianza en sus propios recursos.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo advierte expresamente.",
    },
    {
      id: "m7_v12",
      afirmacion:
        "El apoyo de un ser conocido hace más probable conductas adaptadas en una emergencia.",
      respuestaCorrecta: true,
      explicacion:
        "El manual señala que la soledad es coadyuvante de inseguridad, incertidumbre y conductas descontroladas.",
    },
    {
      id: "m7_v13",
      afirmacion:
        "La frustración es el origen de conductas agresivas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define la frustración como la interferencia de un instigador externo que impide conseguir el objetivo, origen de conductas agresivas.",
    },
    {
      id: "m7_v14",
      afirmacion:
        "La tendencia al gregarismo implica temor a decidir y refugiarse instintivamente en el grupo.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así la tendencia al gregarismo.",
    },
    {
      id: "m7_v15",
      afirmacion:
        "El liderazgo en emergencias exige prudencia, estrategia, planificación, dominio de sí mismo y órdenes enérgicas y decididas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esas cualidades del liderazgo.",
    },
    {
      id: "m7_v16",
      afirmacion:
        "Los programas de prevención integrados deben abarcar desde el nivel gerencial hasta el operativo, destacando al personal de seguridad como nivel básico.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo indica al describir los programas de prevención integrados.",
    },
    {
      id: "m7_v17",
      afirmacion:
        "La información sobre riesgos debe difundirse solo mediante documentos escritos dirigidos a los jefes.",
      respuestaCorrecta: false,
      explicacion:
        "El manual exige difundirla por todos los canales posibles: folletos, instrucciones, charlas, reuniones y carteles.",
    },
    {
      id: "m7_v18",
      afirmacion:
        "Los planes de formación y adiestramiento buscan automatizar las conductas y controlar la emotividad.",
      respuestaCorrecta: true,
      explicacion:
        "El manual incluye la automatización de conductas y el control de la emotividad en los planes de formación.",
    },
    {
      id: "m7_v19",
      afirmacion:
        "Al percibir la amenaza, la persona evalúa la posibilidad de que el peligro se produzca, su gravedad y su inminencia.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe ese balance inmediato que realiza la persona al percibir la amenaza.",
    },
    {
      id: "m7_v20",
      afirmacion:
        "Existen ejercicios de fácil aplicación y buenos resultados para familiarizarse con situaciones de estrés.",
      respuestaCorrecta: true,
      explicacion:
        "El manual los menciona como forma de preparación ante emergencias.",
    },
  ],
};
