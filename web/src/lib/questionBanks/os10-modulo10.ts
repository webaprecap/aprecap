import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "The Ethical Shield"
// (Probidad, No Discriminación y Ética Profesional) del Manual OS-10 Aprecap.

export const bancoModulo10: BancoModulo = {
  numero: 10,
  titulo: "Evolución del Guardia",
  alternativas: [
    {
      id: "m10_a1",
      pregunta:
        "Según el documento, ¿cómo evoluciona el rol del guardia de seguridad moderno?",
      opciones: [
        "De vigilante pasivo a aliado estratégico de la institución",
        "De guardia armado a personal administrativo",
        "De supervisor a operador de CCTV",
        "Su rol no ha cambiado desde su origen",
      ],
      respuestaCorrecta: "De vigilante pasivo a aliado estratégico de la institución",
      explicacion:
        "El documento contrasta la visión tradicional (vigilancia pasiva y cumplimiento básico de normas) con el nuevo rol del guardia moderno: aliado estratégico que garantiza la continuidad operativa y la confianza de la institución. No pasó a funciones administrativas ni solo a operar CCTV, y su rol sí ha evolucionado.",
    },
    {
      id: "m10_a2",
      pregunta:
        "¿Qué valor de la brújula ética se define como 'transparencia y sinceridad constante'?",
      opciones: ["La valentía", "La honradez", "La obediencia", "El compañerismo"],
      respuestaCorrecta: "La honradez",
      explicacion:
        "La honradez se define en el documento como transparencia y sinceridad constante en el actuar del guardia. La valentía es enfrentar las situaciones con entereza dominando el temor; la obediencia es acatar las órdenes legítimas; y el compañerismo es la colaboración con los pares.",
    },
    {
      id: "m10_a3",
      pregunta:
        "¿Qué valor implica 'enfrentar situaciones con entereza, dominando el temor'?",
      opciones: ["La lealtad", "La amabilidad", "La valentía", "El compromiso"],
      respuestaCorrecta: "La valentía",
      explicacion:
        "La valentía es enfrentar las situaciones con entereza, dominando el temor. La lealtad es la fidelidad a la institución; la amabilidad es el trato cordial con las personas; y el compromiso es la dedicación al cumplimiento de las responsabilidades, no la definición citada.",
    },
    {
      id: "m10_a4",
      pregunta:
        "Según el filtro de probidad, ¿qué debe prevalecer en toda toma de decisión?",
      opciones: [
        "El interés particular del guardia",
        "El interés general sobre el particular",
        "El beneficio de los amigos del guardia",
        "El menor esfuerzo posible",
      ],
      respuestaCorrecta: "El interés general sobre el particular",
      explicacion:
        "El filtro de probidad exige que el interés GENERAL prime siempre por sobre el interés particular, en toda decisión del guardia. Anteponer el interés propio, el beneficio de conocidos o el menor esfuerzo son precisamente las conductas que vulneran la probidad.",
    },
    {
      id: "m10_a5",
      pregunta:
        "¿Cuál de las siguientes conductas vulnera la probidad funcionaria?",
      opciones: [
        "Aceptar dádivas o sobornos",
        "Declarar un conflicto de intereses",
        "Rendir cuentas de los recursos",
        "Denunciar el nepotismo",
      ],
      respuestaCorrecta: "Aceptar dádivas o sobornos",
      explicacion:
        "Aceptar dádivas o sobornos, junto al nepotismo y el uso de información privilegiada, son conductas que vulneran la probidad. Declarar un conflicto de intereses, rendir cuentas de los recursos y denunciar el nepotismo son conductas probas que la protegen.",
    },
    {
      id: "m10_a6",
      pregunta:
        "La discriminación indirecta se produce cuando:",
      opciones: [
        "Existe un trato explícitamente menos favorable basado en características innatas",
        "Normas aparentemente neutras generan una desventaja desproporcionada para ciertos grupos",
        "Una institución expulsa formalmente a un grupo social",
        "Una persona insulta directamente a otra",
      ],
      respuestaCorrecta:
        "Normas aparentemente neutras generan una desventaja desproporcionada para ciertos grupos",
      explicacion:
        "La discriminación indirecta proviene de normas en apariencia neutrales que, al aplicarse, desfavorecen desproporcionadamente a ciertos grupos. El trato explícitamente menos favorable basado en características innatas es la discriminación DIRECTA; expulsar formalmente a un grupo es una medida institucional abierta; e insultar directamente es discriminación directa en el trato personal.",
    },
    {
      id: "m10_a7",
      pregunta:
        "La discriminación sistémica o estructural se caracteriza por:",
      opciones: [
        "Un hecho aislado y puntual",
        "Una exclusión profundamente arraigada en las instituciones y normas sociales",
        "Un trato favorable a grupos vulnerables",
        "Una sanción administrativa",
      ],
      respuestaCorrecta:
        "Una exclusión profundamente arraigada en las instituciones y normas sociales",
      explicacion:
        "La discriminación sistémica o estructural es una exclusión profundamente arraigada en las instituciones y normas sociales, que se reproduce aunque no exista una intención individual de discriminar. No es un hecho aislado ni una sanción, y el trato favorable a grupos vulnerables es una medida de equidad, no discriminación.",
    },
    {
      id: "m10_a8",
      pregunta: "¿Cómo se define la equidad según el documento?",
      opciones: [
        "Igualdad absoluta de trato sin considerar contextos",
        "Justicia en el trato que reconoce los contextos específicos y las diferencias para garantizar acceso real a recursos y oportunidades",
        "Un beneficio exclusivo para las mujeres",
        "Una cuota obligatoria en las empresas",
      ],
      respuestaCorrecta:
        "Justicia en el trato que reconoce los contextos específicos y las diferencias para garantizar acceso real a recursos y oportunidades",
      explicacion:
        "El documento define la equidad como justicia en el trato que reconoce los contextos específicos y las diferencias, para garantizar acceso real a recursos y oportunidades. La igualdad absoluta sin considerar contextos es la igualdad mal entendida; no es un beneficio exclusivo para un grupo; y las cuotas son solo una de las posibles medidas, no la definición.",
    },
    {
      id: "m10_a9",
      pregunta:
        "El refuerzo positivo que motiva la excelencia se fundamenta en:",
      opciones: [
        "El condicionamiento operante de B.F. Skinner",
        "La teoría de la disuasión penal",
        "El psicoanálisis de Freud",
        "La pirámide de Maslow",
      ],
      respuestaCorrecta: "El condicionamiento operante de B.F. Skinner",
      explicacion:
        "El documento señala que el refuerzo positivo (reconocimiento, empleado del mes) se basa en el condicionamiento operante de B.F. Skinner: premiar la conducta deseada para que se repita. La disuasión penal castiga conductas; el psicoanálisis de Freud estudia la mente inconsciente; y la pirámide de Maslow ordena necesidades, no refuerza conductas.",
    },
    {
      id: "m10_a10",
      pregunta:
        "¿Qué conducta 'anula la honradez y fomenta la corrupción' según el diagnóstico ético?",
      opciones: [
        "El soborno: aceptar regalías a cambio de favores",
        "El exceso de trabajo",
        "La puntualidad",
        "El uso del uniforme",
      ],
      respuestaCorrecta: "El soborno: aceptar regalías a cambio de favores",
      explicacion:
        "El diagnóstico ético del documento señala que el soborno (aceptar regalías a cambio de favores) anula la honradez y fomenta la corrupción. El exceso de trabajo, la puntualidad y el uso del uniforme son conductas neutras o positivas que no afectan la honradez.",
    },
  ],
  vf: [
    {
      id: "m10_vf1",
      afirmacion:
        "La visión tradicional del guardia se limitaba a la vigilancia pasiva y al cumplimiento básico de normas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el documento contrapone la visión tradicional (vigilancia pasiva y cumplimiento básico de normas) con el nuevo rol del guardia como aliado estratégico de la institución.",
    },
    {
      id: "m10_vf2",
      afirmacion:
        "El guardia moderno solo protege activos materiales de la empresa.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el guardia moderno también resguarda la integridad ética, los derechos humanos y la confianza de la institución, además de los activos materiales.",
    },
    {
      id: "m10_vf3",
      afirmacion:
        "La honradez exige transparencia y sinceridad constante.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la honradez se define en el documento como transparencia y sinceridad constante en el actuar del guardia.",
    },
    {
      id: "m10_vf4",
      afirmacion:
        "Aceptar dádivas o sobornos es compatible con el principio de probidad.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: aceptar dádivas o sobornos es una falta de probidad, porque el interés general debe primar siempre sobre el interés particular.",
    },
    {
      id: "m10_vf5",
      afirmacion:
        "El nepotismo es una práctica que vulnera el principio de probidad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el nepotismo figura entre las conductas que vulneran el principio de probidad, junto al soborno y el uso de información privilegiada.",
    },
    {
      id: "m10_vf6",
      afirmacion:
        "Usar información privilegiada está prohibido por el filtro de probidad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el uso de información privilegiada es una falta de probidad, según el filtro de probidad del documento.",
    },
    {
      id: "m10_vf7",
      afirmacion:
        "La discriminación directa es un trato explícitamente menos favorable basado en características innatas como etnia, edad o discapacidad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: así define el documento la discriminación directa: un trato explícitamente menos favorable basado en características innatas como la etnia, la edad o la discapacidad.",
    },
    {
      id: "m10_vf8",
      afirmacion:
        "La discriminación indirecta se genera por normas aparentemente neutras que desfavorecen a ciertos grupos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición de discriminación indirecta del documento: normas aparentemente neutras que, en su aplicación, desfavorecen desproporcionadamente a ciertos grupos.",
    },
    {
      id: "m10_vf9",
      afirmacion: "La equidad y la igualdad son exactamente lo mismo.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la equidad reconoce contextos específicos y diferencias para garantizar acceso real a recursos y oportunidades, mientras la igualdad asegura los mismos derechos y deberes para todas las personas.",
    },
    {
      id: "m10_vf10",
      afirmacion:
        "La brecha salarial es uno de los desafíos actuales de la perspectiva de género.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el documento menciona la brecha salarial persistente como uno de los desafíos actuales de la perspectiva de género.",
    },
    {
      id: "m10_vf11",
      afirmacion:
        "El Ministerio de la Mujer y Equidad de Género busca transversalizar la perspectiva de género y erradicar la violencia.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la entidad encargada de promover políticas de igualdad, transversalizar la perspectiva de género y erradicar la violencia contra las mujeres.",
    },
    {
      id: "m10_vf12",
      afirmacion:
        "El refuerzo positivo se basa en el condicionamiento operante de B.F. Skinner.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el documento cita el condicionamiento operante de B.F. Skinner como base del refuerzo positivo que motiva la excelencia.",
    },
    {
      id: "m10_vf13",
      afirmacion:
        "El refuerzo positivo busca castigar las conductas indeseadas del personal.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el refuerzo positivo fortalece la conducta DESEADA mediante estímulos como el reconocimiento o el premio al empleado del mes; castigar conductas es propio del refuerzo negativo o la sanción.",
    },
    {
      id: "m10_vf14",
      afirmacion:
        "Ante clientes ofuscados, el guardia debe mantener serenidad, respeto y un tono de voz adecuado.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: los protocolos de interacción del documento exigen mantener serenidad, respeto y un tono de voz adecuado ante clientes ofuscados.",
    },
    {
      id: "m10_vf15",
      afirmacion:
        "El tino y criterio implican mantener las emociones bajo control ante la hostilidad o el estrés.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: tino, criterio y control implican mantener las emociones bajo control ante la hostilidad o el estrés, evitando reacciones desmedidas.",
    },
    {
      id: "m10_vf16",
      afirmacion:
        "El espíritu de cuerpo fomenta el compañerismo y la uniformidad de procedimientos según las políticas de la empresa.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el espíritu de cuerpo fomenta el compañerismo y la uniformidad de procedimientos conforme a las políticas de la empresa.",
    },
    {
      id: "m10_vf17",
      afirmacion:
        "El abuso de poder consiste en utilizar el puesto para pisotear a otros.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el abuso de poder consiste en utilizar el puesto de trabajo para pisotear a otros, conducta contraria a la ética profesional.",
    },
    {
      id: "m10_vf18",
      afirmacion:
        "El conflicto de intereses (emitir normas para beneficio propio) vulnera directamente el principio de probidad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el documento señala que el conflicto de intereses, como emitir normas para el propio beneficio, vulnera directamente el principio de probidad.",
    },
    {
      id: "m10_vf19",
      afirmacion:
        "El encubrimiento traiciona la lealtad institucional y el compromiso.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: callar faltas por amistad o por temor (encubrimiento) traiciona la lealtad institucional y el compromiso del guardia.",
    },
    {
      id: "m10_vf20",
      afirmacion:
        "La falta de dedicación evidencia ausencia de sentido de pertenencia.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: perder el tiempo y no dar el máximo (falta de dedicación) evidencia ausencia de sentido de pertenencia, según el diagnóstico del documento.",
    },
  ],
};