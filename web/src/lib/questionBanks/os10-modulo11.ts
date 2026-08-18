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
        "El manual rompe el mito del gasto: la seguridad es una inversión estratégica que previene pérdidas y asegura la continuidad operativa. No es un gasto inevitable ni un servicio opcional de lujo; y aunque Carabineros colabora, la seguridad de la instalación es responsabilidad de la propia entidad.",
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
        "La seguridad física se obtiene combinando inteligentemente múltiples medidas: ninguna barrera es impenetrable por sí sola. Ni una única barrera, ni solo guardias armados, ni solo tecnología electrónica bastan: la eficacia nace de la suma coordinada de barreras humanas, físicas, mecánicas, electrónicas y animales.",
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
        "El Estudio de Seguridad analiza las vulnerabilidades y riesgos (accidentes, robos, terrorismo) y, en base a ellos, define la cantidad de guardias y el armamento necesario. Las tareas específicas las regula la Directiva de Funcionamiento; la apertura del recinto y el registro de visitas son funciones operativas del turno.",
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
        "La Directiva de Funcionamiento regula las tareas específicas, los medios del guardia y el espacio físico limitado de acción, y es aprobada y fiscalizada por Carabineros. Los sueldos, el presupuesto y los contratos con proveedores son materias administrativas de la empresa, ajenas a la Directiva.",
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
        "El manual define el recinto como una porción de terreno físicamente limitada (murallas, cercos, alambradas) donde la entidad desarrolla sus actividades. El terreno sin delimitación física es el 'sitio'; y el espacio público o la vía pública no forman parte del recinto.",
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
        "Las barreras naturales provienen de la topografía del terreno: quebradas, ríos y vegetación. Los muros y portones son barreras físicas artificiales; los candados y pasadores son barreras mecánicas; y el CCTV con control por PC es una barrera electrónica.",
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
        "La barrera humana es la más importante e insustituible del sistema porque, a diferencia de las barreras estáticas, es evolutiva: detecta, da la alarma, obtiene la identidad y neutraliza. El CCTV, las barreras físicas estáticas y las mecánicas son complementos valiosos, pero no pueden reemplazar la capacidad de decisión humana.",
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
        "La apertura es un procedimiento proactivo: observar el área circundante, revisar el estado de barreras y vías, y verificar el funcionamiento de los sistemas de comunicación. Revisar por intrusos es parte del CIERRE; apagar gas, agua y electricidad es una medida de cierre; y el informe final corresponde al término del turno.",
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
        "El registro escrito es la fase más importante del ciclo de control de acceso, porque deja constancia de fecha, hora, RUT, persona a visitar y hora de salida, sirviendo de base para cualquier investigación futura. La verificación de identidad y la autorización son fases necesarias, y la bienvenida no forma parte del ciclo.",
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
        "La ausencia de violencia, intimidación y fuerza en las cosas es lo que distingue el hurto del robo: si están presentes esos elementos, la figura legal es el robo. El uso de armas y la retención de personas son agravantes del robo, no características del hurto.",
    },
  ],
  vf: [
    {
      id: "m11_vf1",
      afirmacion: "La seguridad es un gasto administrativo inevitable.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual afirma que la seguridad es una inversión estratégica que previene pérdidas y asegura la continuidad operativa, no un gasto inevitable.",
    },
    {
      id: "m11_vf2",
      afirmacion: "Ninguna barrera es impenetrable por sí sola.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la seguridad real se logra con la combinación inteligente de múltiples medidas, porque ninguna barrera individual es impenetrable.",
    },
    {
      id: "m11_vf3",
      afirmacion:
        "El Estudio de Seguridad define la cantidad de guardias y el armamento.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el Estudio de Seguridad analiza las vulnerabilidades y riesgos de la entidad y, con base en ellos, define la cantidad de guardias y el armamento.",
    },
    {
      id: "m11_vf4",
      afirmacion:
        "La Directiva de Funcionamiento es aprobada y fiscalizada por Carabineros.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual indica que la Directiva de Funcionamiento, que regula tareas, medios y espacio físico del servicio, es aprobada y fiscalizada por Carabineros.",
    },
    {
      id: "m11_vf5",
      afirmacion:
        "El recinto es un terreno sin delimitación física alguna.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el terreno sin delimitación física es el 'SITIO'. El recinto es una porción de terreno físicamente limitada por murallas, cercos o alambradas.",
    },
    {
      id: "m11_vf6",
      afirmacion:
        "El sitio puede ser un lugar de tránsito obligado según el Estudio de Seguridad aprobado.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el sitio es un terreno no delimitado físicamente, ocupado habitualmente o de tránsito obligado, según lo determine el Estudio de Seguridad aprobado.",
    },
    {
      id: "m11_vf7",
      afirmacion:
        "Las barreras artificiales son construidas por el hombre.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: las barreras artificiales son las construidas por el hombre (físicas, mecánicas, electrónicas), a diferencia de las naturales que provienen de la topografía.",
    },
    {
      id: "m11_vf8",
      afirmacion:
        "Las cerraduras, candados y pasadores son barreras de tipo mecánico.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: las barreras mecánicas incluyen las cerraduras (candados) y los bloqueos (pasadores).",
    },
    {
      id: "m11_vf9",
      afirmacion:
        "Los perros de seguridad se clasifican como barreras de tipo animal.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la taxonomía del manual incluye las barreras animales, como los perros de seguridad.",
    },
    {
      id: "m11_vf10",
      afirmacion:
        "La barrera humana es evolutiva, a diferencia de las barreras estáticas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la barrera humana es evolutiva porque detecta, da la alarma, obtiene la identidad y neutraliza, capacidades que las barreras estáticas no tienen.",
    },
    {
      id: "m11_vf11",
      afirmacion:
        "En la apertura se debe verificar el funcionamiento de los sistemas de comunicación.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: verificar los sistemas de comunicación es una de las tareas del procedimiento de apertura, junto con observar el entorno y revisar barreras y vías.",
    },
    {
      id: "m11_vf12",
      afirmacion:
        "En el cierre, el guardia debe dejar estufas y máquinas encendidas para calefaccionar.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el cierre exige neutralizar los riesgos de incendio, por lo que se deben apagar las estufas y máquinas encendidas, además de revisar que no queden personas o paquetes ocultos.",
    },
    {
      id: "m11_vf13",
      afirmacion:
        "En el control de acceso, el personal conocido de la empresa queda exento de verificación.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual es claro: NADIE queda exento del control de accesos, ni siquiera el personal conocido de la empresa.",
    },
    {
      id: "m11_vf14",
      afirmacion:
        "El registro de acceso debe consignar fecha, hora, RUT, persona a visitar y hora de salida.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el registro escrito es la fase más importante del control de acceso y debe consignar fecha, hora, RUT, persona a visitar y hora de salida, sirviendo para investigaciones futuras.",
    },
    {
      id: "m11_vf15",
      afirmacion:
        "El hurto se caracteriza por la ausencia de violencia e intimidación.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: sin violencia, sin intimidación y sin fuerza en las cosas, la apropiación de cosa ajena es hurto (Arts. 432 y 439 del Código Penal); con esos elementos es robo.",
    },
    {
      id: "m11_vf16",
      afirmacion:
        "Ante un artefacto sospechoso, se debe levantarlo para inspeccionarlo.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el protocolo prohíbe tocar o levantar el artefacto sospechoso: la regla es NO TOCAR, NO MOVER, NO LEVANTAR.",
    },
    {
      id: "m11_vf17",
      afirmacion:
        "Cerca de un artefacto sospechoso no deben usarse radios ni celulares.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el protocolo indica no usar radios ni celulares cerca del artefacto sospechoso, porque sus señales podrían activar el detonador.",
    },
    {
      id: "m11_vf18",
      afirmacion:
        "En caso de siniestro está prohibido el uso de ascensores.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual indica expresamente que está prohibido el uso de ascensores en caso de siniestro, porque pueden detenerse y atrapar personas.",
    },
    {
      id: "m11_vf19",
      afirmacion:
        "Si un hecho no está documentado, para efectos de la investigación no ocurrió.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el registro escrito es la base de la investigación futura: si un hecho no está documentado, para efectos de la investigación no ocurrió.",
    },
    {
      id: "m11_vf20",
      afirmacion:
        "El retrato hablado es una descripción subjetiva del sospechoso.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el retrato hablado exige una descripción OBJETIVA del sospechoso: rasgos, vestimenta, joyas y forma de actuar, sin opiniones ni apreciaciones personales.",
    },
  ],
};