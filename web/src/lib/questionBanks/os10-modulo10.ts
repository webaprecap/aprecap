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
        "El documento contrasta la visión tradicional (vigilancia pasiva) con el nuevo rol: garantía de continuidad operativa y confianza.",
    },
    {
      id: "m10_a2",
      pregunta:
        "¿Qué valor de la brújula ética se define como 'transparencia y sinceridad constante'?",
      opciones: ["La valentía", "La honradez", "La obediencia", "El compañerismo"],
      respuestaCorrecta: "La honradez",
      explicacion:
        "La honradez exige transparencia y sinceridad constante en el actuar del guardia.",
    },
    {
      id: "m10_a3",
      pregunta:
        "¿Qué valor implica 'enfrentar situaciones con entereza, dominando el temor'?",
      opciones: ["La lealtad", "La amabilidad", "La valentía", "El compromiso"],
      respuestaCorrecta: "La valentía",
      explicacion:
        "La valentía es enfrentar las situaciones con entereza, dominando el temor.",
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
        "El filtro de probidad exige que el interés general prime siempre por sobre el interés particular.",
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
        "Aceptar dádivas o sobornos, el nepotismo y el uso de información privilegiada vulneran la probidad.",
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
        "La discriminación indirecta proviene de normas en apariencia neutrales que desfavorecen desproporcionadamente a ciertos grupos.",
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
        "La discriminación sistémica es una exclusión profundamente arraigada en las instituciones y normas sociales.",
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
        "La equidad es el medio: justicia en el trato que reconoce contextos para garantizar acceso real a recursos y oportunidades.",
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
        "El documento señala que el refuerzo positivo (reconocimiento, empleado del mes) se basa en el condicionamiento operante de B.F. Skinner.",
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
        "El soborno (aceptar regalías a cambio de favores) anula la honradez y fomenta la corrupción.",
    },
  ],
  vf: [
    {
      id: "m10_vf1",
      afirmacion:
        "La visión tradicional del guardia se limitaba a la vigilancia pasiva y al cumplimiento básico de normas.",
      respuestaCorrecta: true,
      explicacion:
        "El documento contrapone la visión tradicional (vigilancia pasiva) con el nuevo rol de aliado estratégico.",
    },
    {
      id: "m10_vf2",
      afirmacion:
        "El guardia moderno solo protege activos materiales de la empresa.",
      respuestaCorrecta: false,
      explicacion:
        "El guardia moderno también resguarda la integridad ética, los derechos humanos y la confianza de la institución.",
    },
    {
      id: "m10_vf3",
      afirmacion:
        "La honradez exige transparencia y sinceridad constante.",
      respuestaCorrecta: true,
      explicacion: "La honradez se define como transparencia y sinceridad constante.",
    },
    {
      id: "m10_vf4",
      afirmacion:
        "Aceptar dádivas o sobornos es compatible con el principio de probidad.",
      respuestaCorrecta: false,
      explicacion:
        "Aceptar dádivas o sobornos es una falta de probidad: el interés general debe primar sobre el particular.",
    },
    {
      id: "m10_vf5",
      afirmacion:
        "El nepotismo es una práctica que vulnera el principio de probidad.",
      respuestaCorrecta: true,
      explicacion:
        "El nepotismo figura entre las conductas que vulneran la probidad.",
    },
    {
      id: "m10_vf6",
      afirmacion:
        "Usar información privilegiada está prohibido por el filtro de probidad.",
      respuestaCorrecta: true,
      explicacion:
        "El uso de información privilegiada es una falta de probidad.",
    },
    {
      id: "m10_vf7",
      afirmacion:
        "La discriminación directa es un trato explícitamente menos favorable basado en características innatas como etnia, edad o discapacidad.",
      respuestaCorrecta: true,
      explicacion:
        "Así define el documento la discriminación directa.",
    },
    {
      id: "m10_vf8",
      afirmacion:
        "La discriminación indirecta se genera por normas aparentemente neutras que desfavorecen a ciertos grupos.",
      respuestaCorrecta: true,
      explicacion:
        "Es la definición de discriminación indirecta del documento.",
    },
    {
      id: "m10_vf9",
      afirmacion: "La equidad y la igualdad son exactamente lo mismo.",
      respuestaCorrecta: false,
      explicacion:
        "La equidad reconoce contextos específicos y diferencias para garantizar acceso real; la igualdad asegura los mismos derechos y deberes.",
    },
    {
      id: "m10_vf10",
      afirmacion:
        "La brecha salarial es uno de los desafíos actuales de la perspectiva de género.",
      respuestaCorrecta: true,
      explicacion:
        "El documento menciona la brecha salarial persistente como desafío actual.",
    },
    {
      id: "m10_vf11",
      afirmacion:
        "El Ministerio de la Mujer y Equidad de Género busca transversalizar la perspectiva de género y erradicar la violencia.",
      respuestaCorrecta: true,
      explicacion:
        "Es la entidad encargada de promover políticas, transversalizar la perspectiva y erradicar la violencia.",
    },
    {
      id: "m10_vf12",
      afirmacion:
        "El refuerzo positivo se basa en el condicionamiento operante de B.F. Skinner.",
      respuestaCorrecta: true,
      explicacion:
        "El documento cita el condicionamiento operante de B.F. Skinner como base del refuerzo positivo.",
    },
    {
      id: "m10_vf13",
      afirmacion:
        "El refuerzo positivo busca castigar las conductas indeseadas del personal.",
      respuestaCorrecta: false,
      explicacion:
        "El refuerzo positivo fortalece la conducta deseada mediante estímulos como el reconocimiento, no castiga.",
    },
    {
      id: "m10_vf14",
      afirmacion:
        "Ante clientes ofuscados, el guardia debe mantener serenidad, respeto y un tono de voz adecuado.",
      respuestaCorrecta: true,
      explicacion:
        "Los protocolos de interacción exigen serenidad, respeto y tono adecuado ante clientes ofuscados.",
    },
    {
      id: "m10_vf15",
      afirmacion:
        "El tino y criterio implican mantener las emociones bajo control ante la hostilidad o el estrés.",
      respuestaCorrecta: true,
      explicacion:
        "Tino, criterio y control: mantener las emociones bajo control ante hostilidad o estrés.",
    },
    {
      id: "m10_vf16",
      afirmacion:
        "El espíritu de cuerpo fomenta el compañerismo y la uniformidad de procedimientos según las políticas de la empresa.",
      respuestaCorrecta: true,
      explicacion:
        "El espíritu de cuerpo fomenta el compañerismo y la uniformidad de procedimientos.",
    },
    {
      id: "m10_vf17",
      afirmacion:
        "El abuso de poder consiste en utilizar el puesto para pisotear a otros.",
      respuestaCorrecta: true,
      explicacion:
        "El abuso de poder es utilizar el puesto para pisotear a otros.",
    },
    {
      id: "m10_vf18",
      afirmacion:
        "El conflicto de intereses (emitir normas para beneficio propio) vulnera directamente el principio de probidad.",
      respuestaCorrecta: true,
      explicacion:
        "El documento señala que el conflicto de intereses vulnera directamente la probidad.",
    },
    {
      id: "m10_vf19",
      afirmacion:
        "El encubrimiento traiciona la lealtad institucional y el compromiso.",
      respuestaCorrecta: true,
      explicacion:
        "Callar faltas por amistad o temor traiciona la lealtad institucional y el compromiso.",
    },
    {
      id: "m10_vf20",
      afirmacion:
        "La falta de dedicación evidencia ausencia de sentido de pertenencia.",
      respuestaCorrecta: true,
      explicacion:
        "Perder el tiempo y no dar el máximo evidencia ausencia de sentido de pertenencia.",
    },
  ],
};
