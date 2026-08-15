import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "OS-10 Tactical Blueprint"
// (Sistema Integral de Seguridad: Manual Operativo OS-10 para Instalaciones)
// del Manual OS-10 Aprecap.

export const bancoModulo11: BancoModulo = {
  numero: 11,
  titulo: "Seguridad de Instalaciones OS-10",
  alternativas: [
    {
      id: "m11_a1",
      pregunta:
        "Según el manual, ¿cómo debe entenderse la seguridad de una instalación?",
      opciones: [
        "Como un gasto administrativo inevitable",
        "Como una inversión estratégica que previene pérdidas y asegura la continuidad operativa",
        "Como un servicio opcional de lujo",
        "Como una responsabilidad exclusiva de Carabineros",
      ],
      respuestaCorrecta:
        "Como una inversión estratégica que previene pérdidas y asegura la continuidad operativa",
      explicacion:
        "El manual rompe el mito del gasto: la seguridad es una inversión estratégica que asegura continuidad operativa.",
    },
    {
      id: "m11_a2",
      pregunta: "¿Cómo se obtiene la seguridad física según el manual?",
      opciones: [
        "Con una sola barrera impenetrable",
        "Mediante la combinación inteligente de múltiples medidas",
        "Solo con guardias armados",
        "Solo con tecnología electrónica",
      ],
      respuestaCorrecta: "Mediante la combinación inteligente de múltiples medidas",
      explicacion:
        "La seguridad física se obtiene combinando múltiples medidas: ninguna barrera es impenetrable por sí sola.",
    },
    {
      id: "m11_a3",
      pregunta: "¿Qué función cumple el Estudio de Seguridad?",
      opciones: [
        "Regular las tareas específicas del guardia",
        "Analizar vulnerabilidades y riesgos, y definir la cantidad de guardias y armamento",
        "Autorizar la apertura del recinto",
        "Registrar las visitas diarias",
      ],
      respuestaCorrecta:
        "Analizar vulnerabilidades y riesgos, y definir la cantidad de guardias y armamento",
      explicacion:
        "El Estudio de Seguridad analiza vulnerabilidades y riesgos (accidentes, robos, terrorismo) y define guardias y armamento.",
    },
    {
      id: "m11_a4",
      pregunta: "¿Qué regula la Directiva de Funcionamiento?",
      opciones: [
        "Las tareas específicas, los medios del guardia y el espacio físico limitado de acción",
        "Los sueldos del personal de seguridad",
        "El presupuesto anual de la empresa",
        "Los contratos con proveedores",
      ],
      respuestaCorrecta:
        "Las tareas específicas, los medios del guardia y el espacio físico limitado de acción",
      explicacion:
        "La Directiva de Funcionamiento regula tareas, medios y espacio físico de acción; es aprobada y fiscalizada por Carabineros.",
    },
    {
      id: "m11_a5",
      pregunta:
        "¿Qué es el 'recinto' según la delimitación del espacio operativo?",
      opciones: [
        "Un terreno no delimitado físicamente de tránsito obligado",
        "Una porción de terreno físicamente limitada (murallas, cercos, alambradas)",
        "Cualquier espacio público",
        "La vía pública cercana a la instalación",
      ],
      respuestaCorrecta:
        "Una porción de terreno físicamente limitada (murallas, cercos, alambradas)",
      explicacion:
        "El recinto es la porción de terreno físicamente limitada donde la entidad desarrolla sus actividades.",
    },
    {
      id: "m11_a6",
      pregunta: "¿Cuál es un ejemplo de barrera natural?",
      opciones: [
        "Quebradas, ríos y vegetación",
        "Muros y portones",
        "Candados y pasadores",
        "CCTV y control por PC",
      ],
      respuestaCorrecta: "Quebradas, ríos y vegetación",
      explicacion:
        "Las barreras naturales provienen de la topografía: quebradas, ríos y vegetación.",
    },
    {
      id: "m11_a7",
      pregunta: "¿Cuál es la barrera más importante e insustituible del sistema?",
      opciones: [
        "La barrera electrónica (CCTV)",
        "La barrera física estática",
        "La barrera humana: guardias y vigilantes",
        "La barrera mecánica",
      ],
      respuestaCorrecta: "La barrera humana: guardias y vigilantes",
      explicacion:
        "La barrera humana es la más importante e insustituible porque, a diferencia de las estáticas, es evolutiva.",
    },
    {
      id: "m11_a8",
      pregunta:
        "Durante la APERTURA de la instalación, el guardia debe:",
      opciones: [
        "Revisar áreas por intrusos ocultos y activar alarmas",
        "Observar el área circundante, revisar barreras y vías, y verificar los sistemas de comunicación",
        "Apagar gas, agua y electricidad",
        "Redactar el informe final del día",
      ],
      respuestaCorrecta:
        "Observar el área circundante, revisar barreras y vías, y verificar los sistemas de comunicación",
      explicacion:
        "La apertura es proactiva: observar el entorno, revisar barreras y vías, y verificar comunicaciones.",
    },
    {
      id: "m11_a9",
      pregunta:
        "En el ciclo de control de acceso, ¿cuál es la fase más importante?",
      opciones: [
        "La verificación de identidad",
        "La autorización de la visita",
        "El registro: dejar constancia escrita (fecha, hora, RUT, persona a visitar, hora de salida)",
        "La bienvenida al visitante",
      ],
      respuestaCorrecta:
        "El registro: dejar constancia escrita (fecha, hora, RUT, persona a visitar, hora de salida)",
      explicacion:
        "El registro escrito es la fase más importante: sirve de base para cualquier investigación futura.",
    },
    {
      id: "m11_a10",
      pregunta:
        "Según el marco legal del manual, el hurto (Art. 432 y 439 del Código Penal) se caracteriza por:",
      opciones: [
        "La apropiación de cosa ajena con violencia o intimidación",
        "La apropiación de cosa ajena sin violencia, sin intimidación y sin fuerza en las cosas",
        "El uso de armas de fuego",
        "La sustracción con retención de personas",
      ],
      respuestaCorrecta:
        "La apropiación de cosa ajena sin violencia, sin intimidación y sin fuerza en las cosas",
      explicacion:
        "La ausencia de violencia, intimidación y fuerza en las cosas distingue el hurto del robo.",
    },
  ],
  vf: [
    {
      id: "m11_vf1",
      afirmacion: "La seguridad es un gasto administrativo inevitable.",
      respuestaCorrecta: false,
      explicacion:
        "El manual afirma que la seguridad es una inversión estratégica, no un gasto.",
    },
    {
      id: "m11_vf2",
      afirmacion: "Ninguna barrera es impenetrable por sí sola.",
      respuestaCorrecta: true,
      explicacion:
        "La seguridad real se logra con la combinación inteligente de múltiples medidas.",
    },
    {
      id: "m11_vf3",
      afirmacion:
        "El Estudio de Seguridad define la cantidad de guardias y el armamento.",
      respuestaCorrecta: true,
      explicacion:
        "El Estudio de Seguridad analiza vulnerabilidades y define cantidad de guardias y armamento.",
    },
    {
      id: "m11_vf4",
      afirmacion:
        "La Directiva de Funcionamiento es aprobada y fiscalizada por Carabineros.",
      respuestaCorrecta: true,
      explicacion:
        "El manual indica que la Directiva de Funcionamiento es aprobada y fiscalizada por Carabineros.",
    },
    {
      id: "m11_vf5",
      afirmacion:
        "El recinto es un terreno sin delimitación física alguna.",
      respuestaCorrecta: false,
      explicacion:
        "El terreno sin delimitación física es el 'sitio'; el recinto está físicamente limitado.",
    },
    {
      id: "m11_vf6",
      afirmacion:
        "El sitio puede ser un lugar de tránsito obligado según el Estudio de Seguridad aprobado.",
      respuestaCorrecta: true,
      explicacion:
        "El sitio es terreno no delimitado físicamente, ocupado habitualmente o de tránsito obligado.",
    },
    {
      id: "m11_vf7",
      afirmacion:
        "Las barreras artificiales son construidas por el hombre.",
      respuestaCorrecta: true,
      explicacion:
        "Las barreras artificiales son las construidas por el hombre, a diferencia de las naturales.",
    },
    {
      id: "m11_vf8",
      afirmacion:
        "Las cerraduras, candados y pasadores son barreras de tipo mecánico.",
      respuestaCorrecta: true,
      explicacion:
        "Las barreras mecánicas incluyen cerraduras (candados) y bloqueos (pasadores).",
    },
    {
      id: "m11_vf9",
      afirmacion:
        "Los perros de seguridad se clasifican como barreras de tipo animal.",
      respuestaCorrecta: true,
      explicacion:
        "La taxonomía del manual incluye barreras animales: perros de seguridad.",
    },
    {
      id: "m11_vf10",
      afirmacion:
        "La barrera humana es evolutiva, a diferencia de las barreras estáticas.",
      respuestaCorrecta: true,
      explicacion:
        "La vigilancia humana es evolutiva: detecta, da la alarma, obtiene identidad y neutraliza.",
    },
    {
      id: "m11_vf11",
      afirmacion:
        "En la apertura se debe verificar el funcionamiento de los sistemas de comunicación.",
      respuestaCorrecta: true,
      explicacion:
        "Verificar los sistemas de comunicación es una de las tareas de apertura.",
    },
    {
      id: "m11_vf12",
      afirmacion:
        "En el cierre, el guardia debe dejar estufas y máquinas encendidas para calefaccionar.",
      respuestaCorrecta: false,
      explicacion:
        "El cierre exige neutralizar riesgos de incendio: apagar estufas y máquinas encendidas.",
    },
    {
      id: "m11_vf13",
      afirmacion:
        "En el control de acceso, el personal conocido de la empresa queda exento de verificación.",
      respuestaCorrecta: false,
      explicacion:
        "El manual es claro: nadie queda exento, ni siquiera el personal conocido.",
    },
    {
      id: "m11_vf14",
      afirmacion:
        "El registro de acceso debe consignar fecha, hora, RUT, persona a visitar y hora de salida.",
      respuestaCorrecta: true,
      explicacion:
        "El registro escrito es la fase más importante y sirve para investigaciones futuras.",
    },
    {
      id: "m11_vf15",
      afirmacion:
        "El hurto se caracteriza por la ausencia de violencia e intimidación.",
      respuestaCorrecta: true,
      explicacion:
        "Sin violencia, sin intimidación y sin fuerza en las cosas: esa es la ausencia clave del hurto.",
    },
    {
      id: "m11_vf16",
      afirmacion:
        "Ante un artefacto sospechoso, se debe levantarlo para inspeccionarlo.",
      respuestaCorrecta: false,
      explicacion:
        "El protocolo prohíbe tocar o levantar el artefacto sospechoso.",
    },
    {
      id: "m11_vf17",
      afirmacion:
        "Cerca de un artefacto sospechoso no deben usarse radios ni celulares.",
      respuestaCorrecta: true,
      explicacion:
        "El protocolo indica no usar radios ni celulares cerca del artefacto.",
    },
    {
      id: "m11_vf18",
      afirmacion:
        "En caso de siniestro está prohibido el uso de ascensores.",
      respuestaCorrecta: true,
      explicacion:
        "El manual indica expresamente: prohibido el uso de ascensores en caso de siniestro.",
    },
    {
      id: "m11_vf19",
      afirmacion:
        "Si un hecho no está documentado, para efectos de la investigación no ocurrió.",
      respuestaCorrecta: true,
      explicacion:
        "El registro escrito es la base de la investigación futura: lo no documentado, no ocurrió.",
    },
    {
      id: "m11_vf20",
      afirmacion:
        "El retrato hablado es una descripción subjetiva del sospechoso.",
      respuestaCorrecta: false,
      explicacion:
        "El retrato hablado exige una descripción OBJETIVA de rasgos, vestimenta, joyas y forma de actuar.",
    },
  ],
};
