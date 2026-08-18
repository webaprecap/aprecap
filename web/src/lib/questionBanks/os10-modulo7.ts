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
        "El manual define la psicoprevención como complemento de la prevención de riesgos: una rama de la psicología laboral que busca cambiar actitudes y modificar conductas inadecuadas para lograr un trabajo seguro. No es una técnica de primeros auxilios psicológicos (esa es una herramienta de emergencia), no estudia trastornos mentales como la psicopatología, ni es una norma legal.",
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
        "El manual lista entre los objetivos de la psicoprevención diferenciar la percepción de riesgo del riesgo real, para que la persona evalúe correctamente las amenazas. Aumentar la productividad sin importar la seguridad contradice su fin; eliminar todos los riesgos es imposible en la práctica; y la psicoprevención complementa la capacitación técnica, no la reemplaza.",
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
        "El manual indica que los impulsos autodestructivos se disfrazan de múltiples formas y una de las que produce más accidentes es la osadía, la imprudencia. El exceso de capacitación, la prudencia excesiva y el trabajo en equipo son conductas seguras o positivas, no formas de autodestrucción.",
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
        "El manual define el riesgo como la probabilidad de que en una condición se produzca una pérdida determinada: es una posibilidad, no un peligro genérico. 'Todo peligro presente' confunde peligro con riesgo; 'el daño efectivamente ocurrido' es el accidente o la pérdida ya materializada; y la suma de accidentes del año es una estadística, no el riesgo.",
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
        "El manual señala que la percepción del riesgo es fundamentalmente SUBJETIVA, no una evaluación objetiva ni medible: cada persona la construye según su propia idea del riesgo y la amenaza que ha experimentado. Por eso no es idéntica en todas las personas ni se reduce a una evaluación técnica de especialistas.",
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
        "El manual advierte que en una emergencia el miedo y la angustia pueden bloquear el desempeño intelectual, impidiendo decidir correctamente. No mejoran la capacidad de decisión (la bloquean), no son neutros, y no aceleran los reflejos: los desorganizan.",
    },
    {
      id: "m7_a7",
      pregunta:
        "¿Qué rasgo de personalidad se caracteriza por conductas escandalosas, exageradas e infantiles, con riesgo de contagio?",
      opciones: ["El rasgo depresivo", "El rasgo histérico", "El rasgo obsesivo", "El rasgo pasivo"],
      respuestaCorrecta: "El rasgo histérico",
      explicacion:
        "El manual describe el rasgo histérico con conductas escandalosas, exageradas, infantiles y primitivas, cuya nocividad es el riesgo de contagio. El depresivo se caracteriza por pesimismo y desmoralización; el obsesivo por ideas fijas e irrechazables; y el pasivo no presenta ese cuadro de exageración emocional.",
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
        "El manual indica aislar al sujeto histérico del público (sin espectadores) o administrarle un estímulo fuerte, para cortar la conducta y evitar el contagio al resto. Razonar con él rara vez funciona en plena crisis; dejarlo solo puede intensificar la conducta; y reunirlo con más personas multiplica el riesgo de contagio.",
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
        "El manual señala que a mayor instrucción académica hay más autocontrol en las emergencias; en bajos niveles de formación se observa inseguridad, desconcierto y menor cooperativismo. Las otras alternativas invierten o niegan esa relación: la instrucción aumenta el cooperativismo, sí existe relación, y las personas con estudios reaccionan mejor, no peor.",
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
        "El manual define la territorialidad como la influencia de un espacio cerrado sobre la conducta de las personas allí congregadas. El temor a responsabilizarse es el anonimato; la agresividad por frustración es la frustración misma; y el instinto de reunirse en grupo es el gregarismo.",
    },
  ],
  vf: [
    {
      id: "m7_v1",
      afirmacion:
        "La psicoprevención pretende que las personas tomen conciencia permanente de su seguridad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es uno de los objetivos de la psicoprevención listados en el manual: lograr que las personas tomen conciencia permanente de su seguridad.",
    },
    {
      id: "m7_v2",
      afirmacion:
        "Las personas son portadoras únicamente de impulsos constructivos en el subconsciente.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual señala que las personas son portadoras de impulsos constructivos Y destructivos, y que estos últimos se disfrazan de múltiples formas, como la osadía o el sueño.",
    },
    {
      id: "m7_v3",
      afirmacion:
        "La mente humana tiende a eliminar o rechazar lo negativo o amenazante, haciendo ver como distantes las situaciones de accidente.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así el mecanismo de rechazo de lo amenazante: la mente tiende a eliminar o rechazar lo negativo, haciendo ver los accidentes como situaciones distantes que 'no me tocan'.",
    },
    {
      id: "m7_v4",
      afirmacion:
        "La autodestrucción puede vestirse de sueño, llevando a la persona a dormirse y realizar una acción imprudente.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual menciona el sueño como una forma sutil de autodestrucción, que lleva a la persona a dormirse y luego realizar una acción imprudente.",
    },
    {
      id: "m7_v5",
      afirmacion:
        "Los comportamientos ante el peligro van desde una actitud de calma hasta el verdadero pánico.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe esa gama de comportamientos ante el peligro inminente: desde la calma hasta el pánico, con estados intermedios.",
    },
    {
      id: "m7_v6",
      afirmacion:
        "Los factores socioculturales son la base de las reacciones de la población ante fenómenos naturales.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual afirma que la percepción de los fenómenos naturales incluye actitudes, temores, conocimientos, creencias y mitos, es decir, factores socioculturales que condicionan las reacciones de la población.",
    },
    {
      id: "m7_v7",
      afirmacion:
        "La conducta colectiva es ejecutada por un grupo con organización formal y jerarquía estable.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: los grupos que ejecutan conducta colectiva son generalmente transitorios y carecen de organización formal ni jerarquía estable; esa es la característica de los grupos formales.",
    },
    {
      id: "m7_v8",
      afirmacion:
        "Las normas de la conducta colectiva son creadas por los mismos participantes y pueden incluso ser opuestas a las de la sociedad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo señala expresamente: las normas de la conducta colectiva son creadas por los propios participantes y pueden incluso oponerse a las normas sociales establecidas.",
    },
    {
      id: "m7_v9",
      afirmacion:
        "La personalidad determina un grado de predictibilidad en las reacciones personales.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual relaciona la personalidad con la predictibilidad: conocer la personalidad permite anticipar en cierto grado cómo reaccionará una persona.",
    },
    {
      id: "m7_v10",
      afirmacion:
        "El rasgo DEPRESIVO se caracteriza por ideas fijas e irrechazables.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: las ideas fijas e irrechazables corresponden al rasgo OBSESIVO. El rasgo depresivo presenta conductas pesimistas y desmoralizantes, con riesgo de conductas suicidas.",
    },
    {
      id: "m7_v11",
      afirmacion:
        "Las personas con buenas condiciones físicas pueden asumir riesgos excesivos por la confianza en sus propios recursos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo advierte expresamente: las buenas condiciones físicas pueden generar exceso de confianza y llevar a asumir riesgos excesivos.",
    },
    {
      id: "m7_v12",
      afirmacion:
        "El apoyo de un ser conocido hace más probable conductas adaptadas en una emergencia.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual señala que la soledad es coadyuvante de inseguridad, incertidumbre y conductas descontroladas; por lo tanto, la compañía de un ser conocido favorece conductas adaptadas.",
    },
    {
      id: "m7_v13",
      afirmacion:
        "La frustración es el origen de conductas agresivas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define la frustración como la interferencia de un instigador externo que impide conseguir el objetivo, y la identifica como el origen de conductas agresivas.",
    },
    {
      id: "m7_v14",
      afirmacion:
        "La tendencia al gregarismo implica temor a decidir y refugiarse instintivamente en el grupo.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así la tendencia al gregarismo: temor a decidir individualmente y refugio instintivo en el grupo.",
    },
    {
      id: "m7_v15",
      afirmacion:
        "El liderazgo en emergencias exige prudencia, estrategia, planificación, dominio de sí mismo y órdenes enérgicas y decididas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esas cualidades del liderazgo en emergencias: prudencia, estrategia, planificación, dominio de sí mismo y órdenes enérgicas y decididas.",
    },
    {
      id: "m7_v16",
      afirmacion:
        "Los programas de prevención integrados deben abarcar desde el nivel gerencial hasta el operativo, destacando al personal de seguridad como nivel básico.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo indica al describir los programas de prevención integrados: deben abarcar desde el nivel gerencial hasta el operativo, destacando al personal de seguridad como nivel básico.",
    },
    {
      id: "m7_v17",
      afirmacion:
        "La información sobre riesgos debe difundirse solo mediante documentos escritos dirigidos a los jefes.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual exige difundir la información sobre riesgos por todos los canales posibles: folletos, instrucciones, charlas, reuniones y carteles, para que llegue a todo el personal, no solo a los jefes.",
    },
    {
      id: "m7_v18",
      afirmacion:
        "Los planes de formación y adiestramiento buscan automatizar las conductas y controlar la emotividad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual incluye entre los planes de formación y adiestramiento la automatización de las conductas y el control de la emotividad.",
    },
    {
      id: "m7_v19",
      afirmacion:
        "Al percibir la amenaza, la persona evalúa la posibilidad de que el peligro se produzca, su gravedad y su inminencia.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe ese balance inmediato que realiza la persona al percibir la amenaza: evalúa la posibilidad de que el peligro se produzca, su gravedad y su inminencia.",
    },
    {
      id: "m7_v20",
      afirmacion:
        "Existen ejercicios de fácil aplicación y buenos resultados para familiarizarse con situaciones de estrés.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual los menciona como forma de preparación ante emergencias: ejercicios de fácil aplicación y buenos resultados para familiarizarse con las situaciones de estrés.",
    },
  ],
};