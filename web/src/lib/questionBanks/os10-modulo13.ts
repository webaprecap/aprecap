import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Human Rights in Private Security"
// (Módulo 2: Respeto y Promoción de los Derechos Humanos) del Manual OS-10 Aprecap.

export const bancoModulo13: BancoModulo = {
  numero: 13,
  titulo: "Derechos y Deberes Legales",
  alternativas: [
    {
      id: "m13_a1",
      pregunta:
        "¿Qué ley regula el seguro contra accidentes del trabajo y enfermedades profesionales?",
      opciones: ["Ley 21.659", "Ley 16.744", "Ley 19.628", "Ley 19.880"],
      respuestaCorrecta: "Ley 16.744",
      explicacion:
        "La Ley 16.744 establece el Seguro Obligatorio financiado por el empleador (cotización básica y adicional).",
    },
    {
      id: "m13_a2",
      pregunta:
        "¿Desde cuántos trabajadores es obligatorio contar con reglamento interno?",
      opciones: ["5 trabajadores", "10 trabajadores", "20 trabajadores", "50 trabajadores"],
      respuestaCorrecta: "10 trabajadores",
      explicacion:
        "El reglamento interno es obligatorio desde 10 trabajadores y establece normas de orden e higiene.",
    },
    {
      id: "m13_a3",
      pregunta: "¿Cuál es la naturaleza de los Derechos Humanos?",
      opciones: [
        "Derechos otorgados por el Estado que pueden ser revocados",
        "Atributos inherentes, universales e inalienables basados en la dignidad humana",
        "Beneficios laborales negociables",
        "Privilegios de ciertos grupos sociales",
      ],
      respuestaCorrecta:
        "Atributos inherentes, universales e inalienables basados en la dignidad humana",
      explicacion:
        "Son inherentes a la persona: no pueden ser arrebatados, vendidos ni renunciados (Declaración de 1948).",
    },
    {
      id: "m13_a4",
      pregunta: "¿Qué es el Estado de Derecho?",
      opciones: [
        "Un sistema jurídico donde gobernantes y gobernados están sometidos a leyes justas",
        "Un régimen donde el gobernante está por sobre la ley",
        "Un modelo económico",
        "Una institución policial",
      ],
      respuestaCorrecta:
        "Un sistema jurídico donde gobernantes y gobernados están sometidos a leyes justas",
      explicacion:
        "Requiere supremacía constitucional, separación de poderes y legalidad.",
    },
    {
      id: "m13_a5",
      pregunta:
        "Los derechos de PRIMERA generación (civiles y políticos) se caracterizan por:",
      opciones: [
        "Exigir acción positiva y prestaciones del Estado",
        "Exigir límites al Estado (libertades individuales frente al poder estatal)",
        "Exigir cooperación internacional",
        "Aplicar solo a empresas privadas",
      ],
      respuestaCorrecta:
        "Exigir límites al Estado (libertades individuales frente al poder estatal)",
      explicacion:
        "Los civiles y políticos exigen límites al Estado: vida, igualdad, libertad de expresión, propiedad.",
    },
    {
      id: "m13_a6",
      pregunta:
        "¿Qué derechos pertenecen a la SEGUNDA generación (económicos, sociales y culturales)?",
      opciones: [
        "Derecho a la vida y libertad de expresión",
        "Derecho a la salud, seguridad social, educación y trabajo",
        "Derecho a un medio ambiente sano y a la paz",
        "Derecho a voto y propiedad",
      ],
      respuestaCorrecta: "Derecho a la salud, seguridad social, educación y trabajo",
      explicacion:
        "La segunda generación exige acción positiva del Estado: prestaciones y servicios.",
    },
    {
      id: "m13_a7",
      pregunta: "¿Qué protege el Hábeas Corpus (Amparo)?",
      opciones: [
        "La libertad individual frente a detenciones o arrestos arbitrarios",
        "El derecho de propiedad",
        "Los contratos laborales",
        "El derecho a la educación",
      ],
      respuestaCorrecta:
        "La libertad individual frente a detenciones o arrestos arbitrarios",
      explicacion:
        "El Hábeas Corpus protege directa e inmediatamente la libertad individual.",
    },
    {
      id: "m13_a8",
      pregunta: "¿Qué busca el Recurso de Protección?",
      opciones: [
        "La restitución inmediata de derechos fundamentales (vida, propiedad, igualdad) cuando son vulnerados",
        "Castigar delitos penales",
        "Revisar sentencias de la Corte Suprema",
        "Modificar la Constitución",
      ],
      respuestaCorrecta:
        "La restitución inmediata de derechos fundamentales (vida, propiedad, igualdad) cuando son vulnerados",
      explicacion:
        "Es la acción jurídica orientada a la restitución inmediata de derechos fundamentales.",
    },
    {
      id: "m13_a9",
      pregunta:
        "¿Qué establece la Convención de Belém do Pará (1994)?",
      opciones: [
        "Reconoce la violencia contra la mujer como una violación a los DDHH y un obstáculo para el desarrollo",
        "Regula el comercio internacional",
        "Crea tribunales laborales",
        "Regula la seguridad privada",
      ],
      respuestaCorrecta:
        "Reconoce la violencia contra la mujer como una violación a los DDHH y un obstáculo para el desarrollo",
      explicacion:
        "Es un tratado interamericano que obliga a prevenir, sancionar y erradicar la violencia contra la mujer.",
    },
    {
      id: "m13_a10",
      pregunta:
        "Según el documento, ¿cómo deben recogerse los datos personales (ej. registros de acceso)?",
      opciones: [
        "Para cualquier fin que estime el guardia",
        "Únicamente para fines específicos, explícitos y legítimos",
        "Sin límite de almacenamiento",
        "Compartiéndolos con cualquier persona",
      ],
      respuestaCorrecta: "Únicamente para fines específicos, explícitos y legítimos",
      explicacion:
        "El tratamiento debe basarse en la ley, ejecutarse de buena fe y solo para fines específicos, explícitos y legítimos.",
    },
  ],
  vf: [
    {
      id: "m13_vf1",
      afirmacion:
        "La Ley 16.744 cubre los accidentes del trabajo y las enfermedades profesionales.",
      respuestaCorrecta: true,
      explicacion:
        "El Seguro Obligatorio cubre accidentes del trabajo y enfermedades profesionales.",
    },
    {
      id: "m13_vf2",
      afirmacion:
        "El reglamento interno es obligatorio desde 5 trabajadores.",
      respuestaCorrecta: false,
      explicacion: "Es obligatorio desde 10 trabajadores.",
    },
    {
      id: "m13_vf3",
      afirmacion:
        "Durante la capacitación ocupacional, el trabajador tiene derecho a remuneración íntegra.",
      respuestaCorrecta: true,
      explicacion:
        "El trabajador tiene derecho a remuneración íntegra durante la formación (sin pago de horas extras).",
    },
    {
      id: "m13_vf4",
      afirmacion:
        "Los accidentes de estudio están cubiertos por la Ley 16.744.",
      respuestaCorrecta: true,
      explicacion:
        "Los accidentes de estudio también están cubiertos por la Ley 16.744.",
    },
    {
      id: "m13_vf5",
      afirmacion:
        "Los derechos humanos pueden ser vendidos o renunciados por su titular.",
      respuestaCorrecta: false,
      explicacion:
        "Son inalienables: no pueden ser arrebatados, vendidos ni renunciados.",
    },
    {
      id: "m13_vf6",
      afirmacion:
        "Los DDHH se basan en la dignidad humana según la Declaración de 1948.",
      respuestaCorrecta: true,
      explicacion:
        "Su fundamento es la dignidad humana (Declaración de 1948).",
    },
    {
      id: "m13_vf7",
      afirmacion:
        "El Estado de Derecho requiere supremacía constitucional, separación de poderes y legalidad.",
      respuestaCorrecta: true,
      explicacion: "Son los elementos del modelo de orden del Estado de Derecho.",
    },
    {
      id: "m13_vf8",
      afirmacion:
        "Sin Estado de Derecho, los derechos humanos no pueden ser protegidos ni exigidos.",
      respuestaCorrecta: true,
      explicacion:
        "El Estado de Derecho provee los mecanismos legales de exigibilidad judicial.",
    },
    {
      id: "m13_vf9",
      afirmacion:
        "Los derechos civiles y políticos son de segunda generación.",
      respuestaCorrecta: false,
      explicacion: "Los civiles y políticos son de PRIMERA generación.",
    },
    {
      id: "m13_vf10",
      afirmacion:
        "El derecho a la salud, seguridad social, educación y trabajo pertenecen a la segunda generación.",
      respuestaCorrecta: true,
      explicacion:
        "Son derechos económicos, sociales y culturales (segunda generación).",
    },
    {
      id: "m13_vf11",
      afirmacion:
        "El derecho a un medio ambiente sano y a la paz son de tercera generación (derechos de los pueblos o de solidaridad).",
      respuestaCorrecta: true,
      explicacion:
        "La tercera generación exige cooperación y protección colectiva e internacional.",
    },
    {
      id: "m13_vf12",
      afirmacion:
        "Los tratados ratificados por Chile forman junto a la Constitución el 'Bloque Constitucional'.",
      respuestaCorrecta: true,
      explicacion:
        "Ratificados por Chile, forman junto a la Constitución el Bloque Constitucional y obligan a poderes públicos y privados.",
    },
    {
      id: "m13_vf13",
      afirmacion:
        "Las garantías constitucionales son mecanismos procesales para proteger bienes jurídicos superiores y restablecer el orden constitucional.",
      respuestaCorrecta: true,
      explicacion: "Es la definición de garantías constitucionales del documento.",
    },
    {
      id: "m13_vf14",
      afirmacion: "El Hábeas Corpus protege el derecho de propiedad.",
      respuestaCorrecta: false,
      explicacion:
        "El Hábeas Corpus protege la libertad individual frente a detenciones arbitrarias.",
    },
    {
      id: "m13_vf15",
      afirmacion:
        "El Recurso de Protección restituye derechos como la vida, la propiedad y la igualdad.",
      respuestaCorrecta: true,
      explicacion:
        "Busca la restitución inmediata de derechos fundamentales vulnerados.",
    },
    {
      id: "m13_vf16",
      afirmacion:
        "El debido proceso asegura que toda persona sea juzgada bajo un proceso justo, transparente y conforme a las leyes preestablecidas.",
      respuestaCorrecta: true,
      explicacion: "Es la garantía procedimental del debido proceso.",
    },
    {
      id: "m13_vf17",
      afirmacion:
        "La protección de Belém do Pará aplica solo en el espacio público.",
      respuestaCorrecta: false,
      explicacion:
        "Aplica en el espacio público y privado: familia, relaciones interpersonales o violencia perpetrada por el Estado.",
    },
    {
      id: "m13_vf18",
      afirmacion:
        "El Estado tiene la obligación irrenunciable de prevenir, sancionar y erradicar la violencia contra la mujer.",
      respuestaCorrecta: true,
      explicacion:
        "Es la obligación estatal (y privada) establecida por Belém do Pará.",
    },
    {
      id: "m13_vf19",
      afirmacion:
        "Los datos personales deben recogerse únicamente para fines específicos, explícitos y legítimos.",
      respuestaCorrecta: true,
      explicacion:
        "El principio de finalidad exige fines específicos, explícitos y legítimos.",
    },
    {
      id: "m13_vf20",
      afirmacion:
        "El guardia de seguridad es un agente de primera línea en la materialización del Estado de Derecho.",
      respuestaCorrecta: true,
      explicacion:
        "El documento concluye que el guardia materializa el Estado de Derecho en la práctica.",
    },
  ],
};
