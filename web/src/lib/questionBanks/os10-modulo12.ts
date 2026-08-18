import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Mass Events Tactical Blueprint"
// (Módulo 7: Eventos Masivos y Ley 21.659) del Manual OS-10 Aprecap.

export const bancoModulo12: BancoModulo = {
  numero: 12,
  titulo: "Ética y Eventos Masivos",
  alternativas: [
    {
      id: "m12_a1",
      pregunta: "¿Qué ley regula los eventos masivos en Chile?",
      opciones: ["Ley 16.744", "Ley 21.659", "Ley 19.628", "Ley 19.880"],
      respuestaCorrecta: "Ley 21.659",
      explicacion:
        "La Ley 21.659 es el perímetro de acción que regula los eventos masivos en Chile. La Ley 16.744 regula los accidentes del trabajo; la Ley 19.628 protege la vida privada; y la Ley 19.880 es la ley de procedimientos administrativos, que solo aplica supletoriamente.",
    },
    {
      id: "m12_a2",
      pregunta:
        "Según la ley, ¿qué ocurre cuando la concurrencia estimada es de MÁS de 3.000 personas?",
      opciones: [
        "Se trata de un evento estándar sin regulaciones especiales",
        "Se está ante un evento masivo evaluado por la Delegación Presidencial",
        "El evento queda prohibido",
        "Solo requiere autorización municipal",
      ],
      respuestaCorrecta:
        "Se está ante un evento masivo evaluado por la Delegación Presidencial",
      explicacion:
        "El árbol de clasificación de la ley indica que más de 3.000 personas de concurrencia estimada configura un EVENTO MASIVO, que debe ser evaluado por la Delegación Presidencial. No es un evento estándar, no queda prohibido, y la autorización municipal no basta para ese nivel de concurrencia.",
    },
    {
      id: "m12_a3",
      pregunta:
        "¿Qué factores considera la Delegación Presidencial para evaluar un evento?",
      opciones: [
        "Lugar, público, uso de bien nacional, clima o fecha",
        "Solo el precio de las entradas",
        "La cantidad de guardias contratados",
        "El tipo de música del evento",
      ],
      respuestaCorrecta: "Lugar, público, uso de bien nacional, clima o fecha",
      explicacion:
        "La evaluación de la Delegación Presidencial considera factores como el lugar, el público esperado, el uso de bien nacional, el clima o la fecha del evento. El precio de las entradas, la cantidad de guardias o el tipo de música no son criterios de esa evaluación.",
    },
    {
      id: "m12_a4",
      pregunta: "¿Quién es el 'organizador habitual' según el umbral de habitualidad?",
      opciones: [
        "Quien celebra más de 5 eventos masivos en un plazo de 12 meses corridos",
        "Quien organiza su primer evento",
        "Quien cobra entrada al público",
        "Cualquier productora de eventos",
      ],
      respuestaCorrecta:
        "Quien celebra más de 5 eventos masivos en un plazo de 12 meses corridos",
      explicacion:
        "Con más de 5 eventos masivos celebrados en un plazo de 12 meses corridos se adquiere la calidad de organizador habitual. Organizar el primer evento, cobrar entrada o ser productora no configuran por sí solos esa categoría, que depende del número de eventos en el plazo legal.",
    },
    {
      id: "m12_a5",
      pregunta:
        "¿Qué obligación tiene el organizador habitual al cruzar el umbral de 5 eventos?",
      opciones: [
        "Inscribirse en el Registro de Seguridad Privada (Art. 84, Subsecretaría de Prevención del Delito)",
        "Contratar una orquesta en vivo",
        "Pagar un impuesto especial",
        "Ninguna obligación adicional",
      ],
      respuestaCorrecta:
        "Inscribirse en el Registro de Seguridad Privada (Art. 84, Subsecretaría de Prevención del Delito)",
      explicacion:
        "Es OBLIGATORIO inscribirse en el Registro de Seguridad Privada a cargo de la Subsecretaría de Prevención del Delito, según el Artículo 84. Contratar una orquesta, pagar un impuesto especial o no asumir obligaciones contradicen la regulación legal del organizador habitual.",
    },
    {
      id: "m12_a6",
      pregunta: "¿Quién designa al Responsable de Seguridad del evento?",
      opciones: [
        "Carabineros de Chile",
        "Exclusivamente el Organizador",
        "La Delegación Presidencial",
        "Los asistentes al evento",
      ],
      respuestaCorrecta: "Exclusivamente el Organizador",
      explicacion:
        "El Responsable de Seguridad es una persona natural designada EXCLUSIVAMENTE por el Organizador del evento. Ni Carabineros, ni la Delegación Presidencial ni los asistentes intervienen en esa designación.",
    },
    {
      id: "m12_a7",
      pregunta:
        "¿Con quién puede estar contratado el Responsable de Seguridad?",
      opciones: [
        "Con cualquier empresa de seguridad privada",
        "Solo con el Organizador del evento o con el Propietario del recinto",
        "Con el municipio local",
        "Con la productora de espectáculos",
      ],
      respuestaCorrecta:
        "Solo con el Organizador del evento o con el Propietario del recinto",
      explicacion:
        "El Responsable de Seguridad debe tener calidad de trabajador dependiente, contratado SOLO por el Organizador del evento o por el Propietario del recinto. Una empresa de seguridad, el municipio o la productora no pueden ser su empleador según la ley.",
    },
    {
      id: "m12_a8",
      pregunta:
        "¿Qué requisitos debe cumplir el Responsable de Seguridad?",
      opciones: [
        "Los del Artículo 46 de la Ley 21.659, excepto el numeral 11",
        "Ninguno en particular",
        "Ser funcionario de Carabineros",
        "Tener título universitario",
      ],
      respuestaCorrecta:
        "Los del Artículo 46 de la Ley 21.659, excepto el numeral 11",
      explicacion:
        "El Responsable de Seguridad debe cumplir las exigencias del Artículo 46 de la Ley 21.659, EXCEPTO el numeral 11. No está exento de requisitos, no necesita ser funcionario de Carabineros ni tener título universitario.",
    },
    {
      id: "m12_a9",
      pregunta:
        "¿Cuál es el instrumento rector del evento y cómo se integran las directivas OS-10?",
      opciones: [
        "El Plan de Seguridad; las directivas de funcionamiento OS-10 se incluyen como anexos",
        "El contrato de arriendo del recinto",
        "El reglamento interno de la empresa de seguridad",
        "La autorización municipal",
      ],
      respuestaCorrecta:
        "El Plan de Seguridad; las directivas de funcionamiento OS-10 se incluyen como anexos",
      explicacion:
        "El Plan de Seguridad es el instrumento rector del evento, y las directivas de funcionamiento y autorizaciones OS-10 se incluyen como ANEXOS de ese plan. El contrato de arriendo, el reglamento interno de la empresa o la autorización municipal no cumplen esa función rectora.",
    },
    {
      id: "m12_a10",
      pregunta:
        "¿Por qué canal se tramitan las solicitudes y autorizaciones de los eventos?",
      opciones: [
        "En papel, por correo certificado",
        "Exclusivamente por la Plataforma Informática del Artículo 60 de la Ley 21.659",
        "Por teléfono a Carabineros",
        "Por correo electrónico a la municipalidad",
      ],
      respuestaCorrecta:
        "Exclusivamente por la Plataforma Informática del Artículo 60 de la Ley 21.659",
      explicacion:
        "Todo el trámite de solicitudes y autorizaciones se centraliza EXCLUSIVAMENTE en la Plataforma Informática establecida en el Artículo 60 de la Ley 21.659. No se tramita en papel, por teléfono ni por correo electrónico a la municipalidad.",
    },
  ],
  vf: [
    {
      id: "m12_vf1",
      afirmacion:
        "La Ley 21.659 aplica a eventos recreativos y culturales.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: los organizadores, productores, asistentes y administradores deben someterse a esta ley en los eventos recreativos o culturales.",
    },
    {
      id: "m12_vf2",
      afirmacion:
        "Uno de los objetivos de la ley es proteger los bienes dentro del recinto.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la ley busca proteger los bienes dentro del recinto, además de la integridad de los asistentes y el orden público.",
    },
    {
      id: "m12_vf3",
      afirmacion:
        "Todo evento de más de 300 personas se considera evento masivo.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el umbral es de MÁS de 3.000 personas de concurrencia estimada para considerar un evento como masivo, no 300.",
    },
    {
      id: "m12_vf4",
      afirmacion:
        "Un evento con menos de 3.000 personas puede requerir medidas especiales según la Delegación Presidencial.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: si el evento tiene menos de 3.000 personas pero requiere medidas especiales, también es evaluado por la Delegación Presidencial.",
    },
    {
      id: "m12_vf5",
      afirmacion:
        "El organizador de eventos solo puede tener fines de lucro.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el organizador coordina los medios, la promoción y el desarrollo del evento con o sin fines de lucro.",
    },
    {
      id: "m12_vf6",
      afirmacion:
        "El productor ejecuta el evento basándose en el presupuesto y lineamientos del organizador.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el productor es el brazo operativo que ejecuta el evento basándose en el presupuesto y los lineamientos del organizador.",
    },
    {
      id: "m12_vf7",
      afirmacion:
        "El organizador y el productor nunca pueden ser la misma persona.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que el organizador y el productor PUEDEN ser la misma persona.",
    },
    {
      id: "m12_vf8",
      afirmacion:
        "Se es organizador habitual al celebrar más de 5 eventos masivos en 12 meses corridos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: ese es el umbral de habitualidad definido por el documento: más de 5 eventos masivos en un plazo de 12 meses corridos.",
    },
    {
      id: "m12_vf9",
      afirmacion:
        "El registro del organizador habitual está a cargo de la Subsecretaría de Prevención del Delito (Art. 84).",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el Registro de Seguridad Privada del Artículo 84 está a cargo de la Subsecretaría de Prevención del Delito.",
    },
    {
      id: "m12_vf10",
      afirmacion:
        "El Responsable de Seguridad puede ser contratado por cualquier empresa de seguridad.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el Responsable de Seguridad solo puede estar contratado por el Organizador del evento o por el Propietario del recinto, no por cualquier empresa de seguridad.",
    },
    {
      id: "m12_vf11",
      afirmacion:
        "El Responsable de Seguridad debe tener calidad de trabajador dependiente.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el contrato del Responsable de Seguridad exige calidad de trabajador dependiente del Organizador o del Propietario del recinto.",
    },
    {
      id: "m12_vf12",
      afirmacion:
        "El Responsable de Seguridad debe cumplir todos los requisitos del Artículo 46 de la Ley 21.659, incluido el numeral 11.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: debe cumplir los requisitos del Artículo 46 de la Ley 21.659 EXCEPTO el numeral 11.",
    },
    {
      id: "m12_vf13",
      afirmacion:
        "El Plan de Seguridad es el instrumento rector con las medidas para proteger vida, integridad y bienes.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el Plan de Seguridad es el instrumento rector del evento, con las medidas para proteger la vida, la integridad y los bienes.",
    },
    {
      id: "m12_vf14",
      afirmacion:
        "Las directivas de funcionamiento OS-10 se incluyen como anexos dentro del Plan de Seguridad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: las directivas de funcionamiento y las autorizaciones OS-10 se incluyen como ANEXOS dentro del Plan de Seguridad.",
    },
    {
      id: "m12_vf15",
      afirmacion:
        "El Plan de Seguridad reemplaza todas las obligaciones previas en materia de seguridad privada.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el Plan de Seguridad NO reemplaza ninguna de las obligaciones previas en materia de seguridad privada; las complementa.",
    },
    {
      id: "m12_vf16",
      afirmacion:
        "Las solicitudes y autorizaciones se tramitan exclusivamente por la Plataforma Informática del Artículo 60.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el canal único de tramitación es la Plataforma Informática establecida en el Artículo 60 de la Ley 21.659.",
    },
    {
      id: "m12_vf17",
      afirmacion:
        "La ley castiga severamente ocultar o disfrazar la identidad del organizador para eludir la ley.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la alteración, simulación o subterfugio para ocultar o disfrazar la identidad del organizador y eludir la ley es severamente castigada.",
    },
    {
      id: "m12_vf18",
      afirmacion:
        "En los vacíos no regulados por este reglamento aplica supletoriamente la Ley 19.880.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la nota táctica del documento indica la aplicación supletoria de la Ley 19.880 (procedimientos administrativos) en los vacíos no regulados.",
    },
    {
      id: "m12_vf19",
      afirmacion:
        "La presentación personal impecable infunde respeto inmediato y exige un trato correcto de los demás.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: una persona impecable, limpia y ordenada infunde respeto inmediato y exige un trato correcto de los demás.",
    },
    {
      id: "m12_vf20",
      afirmacion:
        "El encubrimiento y el abuso de confianza son conductas del 'escudo', es decir, conductas deseables del guardia.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el encubrimiento y el abuso de confianza son FALLAS éticas que quiebran la honradez y la lealtad; no son conductas del 'escudo' deseable.",
    },
  ],
};