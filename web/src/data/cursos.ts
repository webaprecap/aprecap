import type { CursoLP } from "./types";

export const cursosLP: CursoLP[] = [
  {
    slug: "supervisor-de-seguridad",
    title: "Supervisor de Seguridad",
    source: "",
    image: "/images/cursos/supervisor-de-seguridad.png",
    duration: "140 horas",
    students: 44,
    quizzes: 4,
    description: "El curso de Supervisor de Seguridad está diseñado para formar profesionales capaces de dirigir, coordinar y supervisar al personal operativo de seguridad en distintas instalaciones. El programa entrega conocimientos técnicos, normativos y administrativos necesarios para garantizar la protección de personas, bienes e información, aplicando procedimientos preventivos y correctivos frente a situaciones de riesgo.\n\nLos participantes desarrollarán competencias en liderazgo, comunicación efectiva, resolución de conflictos y gestión de equipos, así como en la aplicación de protocolos de seguridad, planes de emergencia, normativas legales vigentes y uso de tecnologías de control.\n\nEl Supervisor estará preparado para desempeñarse como nexo entre la jefatura de seguridad y el personal operativo, asegurando el cumplimiento de las políticas de seguridad, optimizando recursos y contribuyendo a la prevención de incidentes y delitos.",
    competencias: [
      "Supervisión y control en terreno de puestos y directivas de funcionamiento.",
      "Liderazgo de equipos, resolución de conflictos y aplicación de la Ley Karin.",
      "Gestión de planes de emergencia, prevención de riesgos y enlace con autoridades (SPD / Carabineros).",
      "Auditoría de sistemas técnicos de alarma, CCTV y comunicaciones."
    ],
    requisitos: [
      "Ser mayor de 18 años.",
      "Educación media completa (secundaria finalizada o equivalente).",
      "Mínimo 1 año de experiencia comprobable en el área de seguridad privada o pública.",
      "Cédula de identidad vigente y certificado de antecedentes para fines especiales."
    ],
    caracteristicas: [
      "Contenido 100% alineado con la Ley N° 21.659 y el D.S. N° 209 (SPD).",
      "Ejemplos prácticos de liderazgo y protocolos en seguridad privada.",
      "Formatos digitales de directivas de funcionamiento e informes operativos.",
      "Evaluación continua con casos reales y certificación oficial OTEC."
    ],
    audiencia: [
      "Guardias de seguridad y vigilantes que buscan ascender a cargos de supervisión.",
      "Personal en retiro de Fuerzas Armadas y de Orden que deseen homologar competencias.",
      "Coordinadores de seguridad, administradores de edificios e inspectores de instalaciones."
    ],
    curriculum: [
      {
        seccion: "Módulo 1",
        titulo: "Normativa laboral y legislación de la seguridad privada (Ley 21.659)",
        tipo: "leccion"
      },
      {
        seccion: "Módulo 1",
        titulo: "Cuestionario Módulo 1",
        tipo: "evaluacion",
        minutos: 60,
        preguntas: 20
      },
      {
        seccion: "Módulo 2",
        titulo: "Prevención de riesgos y control de emergencias",
        tipo: "leccion"
      },
      {
        seccion: "Módulo 2",
        titulo: "Cuestionario Módulo 2",
        tipo: "evaluacion",
        minutos: 60,
        preguntas: 20
      },
      {
        seccion: "Módulo 3",
        titulo: "Directivas de funcionamiento y gestión de seguridad",
        tipo: "leccion"
      },
      {
        seccion: "Módulo 3",
        titulo: "Cuestionario Módulo 3",
        tipo: "evaluacion",
        minutos: 60,
        preguntas: 20
      },
      {
        seccion: "Módulo 4",
        titulo: "Liderazgo, resolución de conflictos y Ley Karin",
        tipo: "leccion"
      },
      {
        seccion: "Módulo 4",
        titulo: "Cuestionario Módulo 4",
        tipo: "evaluacion",
        minutos: 60,
        preguntas: 20
      }
    ],
    faq: [
      {
        q: "¿Cuál es la modalidad del curso de Supervisor?",
        a: "Se imparte en modalidad Online Asincrónica con apoyo de material interactivo, videos y evaluaciones, con opción a sesiones presenciales."
      },
      {
        q: "¿El curso cuenta con certificación oficial?",
        a: "Sí, OTEC APRECAP entrega certificado con código de verificación QR bajo norma NCh-2728 y lineamientos de la Subsecretaría de Prevención del Delito (SPD)."
      }
    ]
  },
  {
    slug: "operador-cctv-y-alarmas",
    title: "Operador CCTV y Alarmas",
    source: "",
    image: "/images/cursos/operador-cctv-y-alarmas.png",
    duration: "40 horas",
    students: 72,
    quizzes: 3,
    description: "El Curso de Operador de Circuito Cerrado de Televisión (CCTV) y Alarmas capacita a los participantes en el manejo, operación y supervisión de sistemas de seguridad electrónica orientados a la prevención de delitos y la protección de instalaciones. El programa abarca el funcionamiento de equipos de videovigilancia, software de monitoreo, grabación y almacenamiento de imágenes, sistemas de alarmas de intrusión e incendio, analítica de video y protocolos legales de custodia de evidencia conforme a la Ley N° 21.659 y la Subsecretaría de Prevención del Delito (SPD).",
    competencias: [
      "Operación profesional de consolas de monitoreo CCTV y sistemas VMS.",
      "Gestión de alarmas de intrusión, incendio y pulsadores de emergencia.",
      "Preservación de evidencia digital, cadena de custodia y protección de datos.",
      "Protocolos de comunicación radial y despacho de respuestas operativas."
    ],
    requisitos: [
      "Ser mayor de 18 años.",
      "Educación media completa (secundaria finalizada o equivalente).",
      "Interés o experiencia en el área de seguridad electrónica y vigilancia."
    ],
    caracteristicas: [
      "Contenido alineado con la Ley N° 21.659 y normas técnicas de televigilancia.",
      "3 Módulos interactivos: Fundamentos Legales, Sistemas Electrónicos y Centro de Control.",
      "Casos prácticos de análisis de video y analítica inteligente.",
      "Evaluación y certificación digital emitida por OTEC APRECAP."
    ],
    audiencia: [
      "Operadores de salas de monitoreo en retail, industrias, bancos y condominios.",
      "Guardias y vigilantes que busquen especializarse en seguridad electrónica.",
      "Personas interesadas en ingresar al campo tecnológico de la televigilancia."
    ],
    curriculum: [
      {
        seccion: "Módulo 1",
        titulo: "Fundamentos Legales de Operación de CCTV y Alarmas (Ley 21.659)",
        tipo: "leccion"
      },
      {
        seccion: "Módulo 1",
        titulo: "Evaluación Módulo 1",
        tipo: "evaluacion",
        minutos: 60,
        preguntas: 20
      },
      {
        seccion: "Módulo 2",
        titulo: "Sistemas Electrónicos de Seguridad Privada y Alarmas",
        tipo: "leccion"
      },
      {
        seccion: "Módulo 2",
        titulo: "Evaluación Módulo 2",
        tipo: "evaluacion",
        minutos: 60,
        preguntas: 20
      },
      {
        seccion: "Módulo 3",
        titulo: "Televigilancia y Operación de Centro de Control",
        tipo: "leccion"
      },
      {
        seccion: "Módulo 3",
        titulo: "Evaluación Módulo 3",
        tipo: "evaluacion",
        minutos: 60,
        preguntas: 20
      }
    ],
    faq: [
      {
        q: "¿El curso de CCTV se puede realizar de forma 100% online asincrónica?",
        a: "Sí, el curso está diseñado para que puedas acceder al material de estudio, videos demostrativos y evaluaciones en cualquier horario."
      },
      {
        q: "¿Entrega certificación válida para el rubro?",
        a: "Sí, entrega certificado emitido por OTEC APRECAP conforme a la normativa de la Subsecretaría de Prevención del Delito (SPD)."
      }
    ]
  }
];
