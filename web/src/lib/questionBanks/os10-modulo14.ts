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
        "El mandato dual de la seguridad moderna une la protección de la dignidad (integridad física, basada en los DDHH) y la de la información (integridad digital o privacidad). Proteger solo lo físico, solo lo digital o solo el patrimonio financiero ignora la otra mitad del mandato.",
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
        "La integridad digital se sustenta en la Ley 19.628 (vigente) y en la Ley 21.719, la nueva Ley Marco de Protección de Datos Personales que entrará en vigor pleno en diciembre de 2026 y derogará la 19.628; ambas están alineadas con los estándares del RGPD europeo. La Ley 16.744 es de accidentes del trabajo, la 21.659 regula la seguridad privada y el Código del Trabajo rige las relaciones laborales.",
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
        "El DBMS o SGBD (Sistema de Gestión de Bases de Datos) es un software que crea, gestiona y consulta los datos, como MySQL u Oracle, utilizando el lenguaje SQL. No es una cámara, ni un protocolo de red, ni un antivirus.",
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
        "La clave primaria es el identificador ÚNICO de cada registro de una tabla, de modo que no haya dos iguales. Enlazar tablas entre sí es la función de la clave FORÁNEA; encriptar y respaldar datos son funciones de seguridad distintas, no de la clave primaria.",
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
        "El registro (fila) es el conjunto de campos que representan un elemento único dentro de la tabla. La unidad mínima de información es el dato; el software que gestiona los datos es el DBMS; y la columna es el campo, no el registro.",
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
        "Las bases de legitimidad son las razones que justifican tratar los datos (el 'por qué'): el consentimiento libre, específico e informado, la obligación legal, el contrato, el interés legítimo y la defensa jurídica. La finalidad responde al 'para qué'; la transparencia y la calidad son principios del tratamiento, no bases de legitimidad.",
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
        "El principio de proporcionalidad y minimización obliga a tratar EXCLUSIVAMENTE los datos estrictamente necesarios para cumplir el objetivo de seguridad. La licitud y lealtad exigen un tratamiento legal y de buena fe; la calidad exige datos exactos y actualizados; y la portabilidad es un derecho del titular, no un principio de minimización.",
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
        "La cancelación es la fase del ciclo de vida del dato que elimina de forma segura los datos cuando ya no son necesarios para la finalidad o cuando el titular revoca su consentimiento. Compartirlos es cesión a terceros; recolectar es la fase inicial; y respaldarlos es una medida de seguridad, no una cancelación.",
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
        "Los derechos ARCOP (Acceso, Rectificación, Cancelación, Oposición y Portabilidad) dan al titular el control y poder sobre su información personal. Las otras alternativas combinan términos que no corresponden a los derechos que la ley reconoce al titular de los datos.",
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
        "Las infracciones gravísimas se sancionan con multas de hasta 20.000 UTM y con el riesgo de suspensión de las actividades de tratamiento de datos. Las infracciones graves llegan hasta 10.000 UTM; una amonestación o multas mínimas no corresponden a faltas de esa gravedad, y sí existen sanciones.",
    },
  ],
  vf: [
    {
      id: "m14_vf1",
      afirmacion:
        "La protección de la integridad física se sustenta en los Derechos Humanos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la integridad física se protege bajo el marco de los Derechos Humanos, incluyendo instrumentos como la Convención de Belém do Pará.",
    },
    {
      id: "m14_vf2",
      afirmacion:
        "La Ley 19.628 regula la protección de datos personales en Chile.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la Ley 19.628 regula la protección de datos personales y sigue vigente; la Ley 21.719 (Ley Marco) la reemplazará al entrar en vigor pleno en diciembre de 2026.",
    },
    {
      id: "m14_vf3",
      afirmacion:
        "Un DBMS utiliza el lenguaje SQL para gestionar y consultar datos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el documento indica que el DBMS (SGBD) utiliza el lenguaje SQL para crear, gestionar y consultar los datos.",
    },
    {
      id: "m14_vf4",
      afirmacion:
        "La clave foránea es el identificador único de un registro.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el identificador único de un registro es la clave PRIMARIA. La clave foránea (Foreign Key) sirve para ENLAZAR tablas entre sí.",
    },
    {
      id: "m14_vf5",
      afirmacion:
        "Un campo (columna) es un área de un mismo tipo de dato dentro de una tabla.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el campo o columna es un área que contiene un mismo tipo de dato (atributo) dentro de una tabla.",
    },
    {
      id: "m14_vf6",
      afirmacion:
        "El dato es la unidad mínima de información (letra, número, símbolo).",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición de dato del documento: la unidad mínima de información, como una letra, un número o un símbolo.",
    },
    {
      id: "m14_vf7",
      afirmacion:
        "El consentimiento para tratar datos debe ser libre, específico e informado.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el consentimiento es la autorización libre, específica e informada del titular, una de las bases de legitimidad del tratamiento.",
    },
    {
      id: "m14_vf8",
      afirmacion:
        "El principio de proporcionalidad y minimización obliga a tratar solo lo estrictamente necesario.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el principio de proporcionalidad y minimización obliga a tratar solo los datos estrictamente necesarios para cumplir el objetivo de seguridad.",
    },
    {
      id: "m14_vf9",
      afirmacion:
        "El principio de calidad exige datos exactos y actualizados.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el principio de calidad exige que los datos tratados sean exactos y estén actualizados respecto de la finalidad perseguida.",
    },
    {
      id: "m14_vf10",
      afirmacion:
        "La responsabilidad proactiva obliga al responsable a demostrar el cumplimiento.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la responsabilidad proactiva es la obligación del responsable de implementar medidas y DEMOSTRAR que cumple la normativa de protección de datos.",
    },
    {
      id: "m14_vf11",
      afirmacion:
        "La cesión de datos a terceros (comunicación y transmisión) no requiere ninguna base legal.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la cesión de datos a terceros requiere una base legal o el consentimiento del titular; sin ella, la cesión es una infracción a la privacidad.",
    },
    {
      id: "m14_vf12",
      afirmacion:
        "La cancelación procede cuando los datos ya no son necesarios o se revoca el consentimiento.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la cancelación procede y elimina de forma segura los datos cuando ya no son necesarios para la finalidad o cuando el titular revoca su consentimiento.",
    },
    {
      id: "m14_vf13",
      afirmacion:
        "El derecho de portabilidad permite recibir una copia estructurada de los datos para transferirlos a otro responsable.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición del derecho de portabilidad: recibir una copia estructurada de los propios datos para transferirlos a otro responsable.",
    },
    {
      id: "m14_vf14",
      afirmacion:
        "El bloqueo suspende temporalmente el tratamiento durante disputas o revisiones.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el bloqueo suspende temporalmente el tratamiento de los datos durante disputas, revisiones o verificaciones de su calidad.",
    },
    {
      id: "m14_vf15",
      afirmacion:
        "ARCOP significa Acceso, Rectificación, Cancelación, Oposición y Portabilidad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: ARCOP son los derechos del titular de los datos: Acceso, Rectificación, Cancelación, Oposición y Portabilidad.",
    },
    {
      id: "m14_vf16",
      afirmacion:
        "Las infracciones graves se sancionan con multas de hasta 20.000 UTM.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: las infracciones GRAVES se sancionan con multas de hasta 10.000 UTM. Las multas de hasta 20.000 UTM corresponden a las infracciones GRAVÍSIMAS.",
    },
    {
      id: "m14_vf17",
      afirmacion:
        "Recolectar datos sin base legal (falta de consentimiento) es una infracción común.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la recolección de datos sin base legal, como la falta de consentimiento, es una de las infracciones comunes a la protección de datos.",
    },
    {
      id: "m14_vf18",
      afirmacion:
        "La reincidencia puede triplicar el valor de la multa.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la reincidencia puede triplicar el valor de la multa, y bajo el RGPD puede llegar hasta el 4% de los ingresos anuales de la empresa.",
    },
    {
      id: "m14_vf19",
      afirmacion:
        "Usar los datos con fines distintos a los informados (uso indebido) es una infracción.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el uso indebido, es decir, tratar los datos con fines distintos a los informados al titular, es una infracción a la protección de datos.",
    },
    {
      id: "m14_vf20",
      afirmacion:
        "El documento aplica la Convención de Belém do Pará exclusivamente al ámbito digital.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la Convención de Belém do Pará protege la INTEGRIDAD FÍSICA y aplica en el ámbito público y privado; el ámbito digital se regula por las leyes de protección de datos.",
    },
  ],
};