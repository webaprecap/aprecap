import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Seguridad Física y Digital"
// (Módulo 3: Privacidad y Uso de Datos Personales - el doble rol de la
// seguridad en el ámbito físico y digital) del Manual OS-10 Aprecap.

export const bancoModulo14: BancoModulo = {
  numero: 14,
  titulo: "Protección Moderna Integral",
  alternativas: [
    {
      id: "m14_a1",
      pregunta:
        "¿Cuál es el mandato dual de la seguridad moderna según el documento?",
      opciones: [
        "Proteger la integridad física (DDHH) y la integridad digital (privacidad)",
        "Proteger solo las instalaciones físicas",
        "Proteger solo los datos digitales",
        "Proteger el patrimonio financiero",
      ],
      respuestaCorrecta:
        "Proteger la integridad física (DDHH) y la integridad digital (privacidad)",
      explicacion:
        "El mandato dual une la protección de la dignidad (física) y la información (digital).",
    },
    {
      id: "m14_a2",
      pregunta:
        "¿Qué marco legal regula la protección de datos personales en Chile según el documento?",
      opciones: [
        "Ley 19.628 / Ley 21.719 (alineadas con estándares RGPD)",
        "Ley 16.744",
        "Ley 21.659",
        "Código del Trabajo",
      ],
      respuestaCorrecta: "Ley 19.628 / Ley 21.719 (alineadas con estándares RGPD)",
      explicacion:
        "La integridad digital se sustenta en la Ley 19.628 (vigente) y la Ley 21.719 (Ley Marco de Protección de Datos Personales, que entrará en vigor pleno en diciembre de 2026 y derogará la 19.628), alineadas con RGPD.",
    },
    {
      id: "m14_a3",
      pregunta: "¿Qué es un DBMS (SGBD)?",
      opciones: [
        "Software que crea, gestiona y consulta datos (ej. MySQL, Oracle) mediante lenguaje SQL",
        "Un tipo de cámara de seguridad",
        "Un protocolo de red",
        "Un antivirus corporativo",
      ],
      respuestaCorrecta:
        "Software que crea, gestiona y consulta datos (ej. MySQL, Oracle) mediante lenguaje SQL",
      explicacion:
        "El DBMS/SGBD gestiona las bases de datos y utiliza lenguaje SQL.",
    },
    {
      id: "m14_a4",
      pregunta:
        "¿Cuál es la función de la clave primaria (Primary Key) en una base de datos?",
      opciones: [
        "Ser el identificador único de un registro",
        "Enlazar tablas entre sí",
        "Encriptar la información",
        "Respaldar los datos",
      ],
      respuestaCorrecta: "Ser el identificador único de un registro",
      explicacion:
        "La clave primaria es el identificador único; la foránea enlaza tablas.",
    },
    {
      id: "m14_a5",
      pregunta: "¿Qué es un registro (fila) en una tabla?",
      opciones: [
        "El conjunto de campos que representan un elemento único",
        "La unidad mínima de información",
        "El software que gestiona los datos",
        "Una columna de la tabla",
      ],
      respuestaCorrecta: "El conjunto de campos que representan un elemento único",
      explicacion:
        "El registro (fila) es el conjunto de campos que representan un elemento único.",
    },
    {
      id: "m14_a6",
      pregunta:
        "Según la matriz legal del tratamiento, ¿cuál es una BASE DE LEGITIMIDAD (el 'por qué')?",
      opciones: [
        "La finalidad",
        "El consentimiento libre, específico e informado",
        "La transparencia",
        "La calidad",
      ],
      respuestaCorrecta: "El consentimiento libre, específico e informado",
      explicacion:
        "Las bases de legitimidad son: consentimiento, obligación legal, contrato, interés legítimo y defensa jurídica.",
    },
    {
      id: "m14_a7",
      pregunta:
        "¿Qué principio del tratamiento obliga a tratar solo los datos estrictamente necesarios?",
      opciones: [
        "Proporcionalidad y minimización",
        "Licitud y lealtad",
        "Calidad",
        "Portabilidad",
      ],
      respuestaCorrecta: "Proporcionalidad y minimización",
      explicacion:
        "La proporcionalidad y minimización obliga a tratar exclusivamente lo necesario para el objetivo de seguridad.",
    },
    {
      id: "m14_a8",
      pregunta:
        "En el ciclo de vida del dato, ¿qué implica la fase de 'cancelación'?",
      opciones: [
        "Eliminar de forma segura los datos cuando ya no son necesarios o se revoca el consentimiento",
        "Compartir los datos con terceros",
        "Recolectar nuevos datos",
        "Respaldar los datos en la nube",
      ],
      respuestaCorrecta:
        "Eliminar de forma segura los datos cuando ya no son necesarios o se revoca el consentimiento",
      explicacion:
        "La cancelación es la eliminación segura cuando los datos ya no son necesarios o se revoca el consentimiento.",
    },
    {
      id: "m14_a9",
      pregunta: "¿Qué significa la sigla ARCOP en materia de datos personales?",
      opciones: [
        "Acceso, Rectificación, Cancelación, Oposición y Portabilidad",
        "Almacenamiento, Registro, Control, Orden y Protección",
        "Auditoría, Revisión, Certificación, Observación y Prueba",
        "Análisis, Respuesta, Comunicación, Orden y Plan",
      ],
      respuestaCorrecta:
        "Acceso, Rectificación, Cancelación, Oposición y Portabilidad",
      explicacion:
        "Los derechos ARCOP dan al titular el control y poder sobre su información.",
    },
    {
      id: "m14_a10",
      pregunta:
        "¿Qué sanción arriesgan las infracciones GRAVÍSIMAS a la privacidad?",
      opciones: [
        "Multas de hasta 20.000 UTM y riesgo de suspensión de actividades de tratamiento de datos",
        "Solo una amonestación verbal",
        "Multas de hasta 1 UTM",
        "Ninguna sanción",
      ],
      respuestaCorrecta:
        "Multas de hasta 20.000 UTM y riesgo de suspensión de actividades de tratamiento de datos",
      explicacion:
        "Las gravísimas llegan a 20.000 UTM con riesgo de suspensión del tratamiento; las graves hasta 10.000 UTM.",
    },
  ],
  vf: [
    {
      id: "m14_vf1",
      afirmacion:
        "La protección de la integridad física se sustenta en los Derechos Humanos.",
      respuestaCorrecta: true,
      explicacion:
        "La integridad física se protege bajo el marco de los DDHH (Belém do Pará).",
    },
    {
      id: "m14_vf2",
      afirmacion:
        "La Ley 19.628 regula la protección de datos personales en Chile.",
      respuestaCorrecta: true,
      explicacion:
        "La Ley 19.628 regula la protección de datos y sigue vigente; la Ley 21.719 la reemplazará al entrar en vigor pleno (diciembre de 2026).",
    },
    {
      id: "m14_vf3",
      afirmacion:
        "Un DBMS utiliza el lenguaje SQL para gestionar y consultar datos.",
      respuestaCorrecta: true,
      explicacion: "El documento indica que el DBMS utiliza lenguaje SQL.",
    },
    {
      id: "m14_vf4",
      afirmacion:
        "La clave foránea es el identificador único de un registro.",
      respuestaCorrecta: false,
      explicacion:
        "El identificador único es la clave PRIMARIA; la foránea enlaza tablas.",
    },
    {
      id: "m14_vf5",
      afirmacion:
        "Un campo (columna) es un área de un mismo tipo de dato dentro de una tabla.",
      respuestaCorrecta: true,
      explicacion:
        "El campo es la columna que contiene un mismo tipo de dato (atributo).",
    },
    {
      id: "m14_vf6",
      afirmacion:
        "El dato es la unidad mínima de información (letra, número, símbolo).",
      respuestaCorrecta: true,
      explicacion: "Es la definición de dato del documento.",
    },
    {
      id: "m14_vf7",
      afirmacion:
        "El consentimiento para tratar datos debe ser libre, específico e informado.",
      respuestaCorrecta: true,
      explicacion:
        "El consentimiento es la autorización libre, específica e informada del titular.",
    },
    {
      id: "m14_vf8",
      afirmacion:
        "El principio de proporcionalidad y minimización obliga a tratar solo lo estrictamente necesario.",
      respuestaCorrecta: true,
      explicacion:
        "Solo lo estrictamente necesario para cumplir el objetivo de seguridad.",
    },
    {
      id: "m14_vf9",
      afirmacion:
        "El principio de calidad exige datos exactos y actualizados.",
      respuestaCorrecta: true,
      explicacion: "La calidad exige datos exactos y actualizados.",
    },
    {
      id: "m14_vf10",
      afirmacion:
        "La responsabilidad proactiva obliga al responsable a demostrar el cumplimiento.",
      respuestaCorrecta: true,
      explicacion:
        "La responsabilidad proactiva es la obligación de demostrar cumplimiento.",
    },
    {
      id: "m14_vf11",
      afirmacion:
        "La cesión de datos a terceros (comunicación y transmisión) no requiere ninguna base legal.",
      respuestaCorrecta: false,
      explicacion:
        "Requiere base legal o consentimiento del titular.",
    },
    {
      id: "m14_vf12",
      afirmacion:
        "La cancelación procede cuando los datos ya no son necesarios o se revoca el consentimiento.",
      respuestaCorrecta: true,
      explicacion:
        "La cancelación elimina de forma segura los datos en esos casos.",
    },
    {
      id: "m14_vf13",
      afirmacion:
        "El derecho de portabilidad permite recibir una copia estructurada de los datos para transferirlos a otro responsable.",
      respuestaCorrecta: true,
      explicacion: "Es la definición del derecho de portabilidad.",
    },
    {
      id: "m14_vf14",
      afirmacion:
        "El bloqueo suspende temporalmente el tratamiento durante disputas o revisiones.",
      respuestaCorrecta: true,
      explicacion:
        "El bloqueo suspende temporalmente el tratamiento durante disputas o revisiones.",
    },
    {
      id: "m14_vf15",
      afirmacion:
        "ARCOP significa Acceso, Rectificación, Cancelación, Oposición y Portabilidad.",
      respuestaCorrecta: true,
      explicacion: "Son los derechos ARCOP del titular de los datos.",
    },
    {
      id: "m14_vf16",
      afirmacion:
        "Las infracciones graves se sancionan con multas de hasta 20.000 UTM.",
      respuestaCorrecta: false,
      explicacion:
        "Las graves llegan a 10.000 UTM; las GRAVÍSIMAS a 20.000 UTM.",
    },
    {
      id: "m14_vf17",
      afirmacion:
        "Recolectar datos sin base legal (falta de consentimiento) es una infracción común.",
      respuestaCorrecta: true,
      explicacion:
        "La recolección sin base legal es una de las infracciones comunes.",
    },
    {
      id: "m14_vf18",
      afirmacion:
        "La reincidencia puede triplicar el valor de la multa.",
      respuestaCorrecta: true,
      explicacion:
        "La reincidencia puede triplicar la multa (y bajo RGPD, hasta 4% de ingresos anuales).",
    },
    {
      id: "m14_vf19",
      afirmacion:
        "Usar los datos con fines distintos a los informados (uso indebido) es una infracción.",
      respuestaCorrecta: true,
      explicacion:
        "El uso indebido es tratar datos con fines distintos a los informados.",
    },
    {
      id: "m14_vf20",
      afirmacion:
        "El documento aplica la Convención de Belém do Pará exclusivamente al ámbito digital.",
      respuestaCorrecta: false,
      explicacion:
        "Belém do Pará protege la integridad física y aplica en el ámbito público y privado.",
    },
  ],
};
