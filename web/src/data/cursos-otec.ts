export interface CursoOtec {
  slug: string;
  title: string;
  duracion: string;
  modalidad: string;
  acreditado: boolean;
  financiadoSence: boolean;
  description: string;
  image: string;
}

export const cursosOtec: CursoOtec[] = [
  {
    slug: "guardia-de-seguridad",
    title: "Curso de Guardia de Seguridad (SPD)",
    duracion: "90 horas (formación) · 36 horas (perfeccionamiento)",
    modalidad: "100% Presencial (con apoyo en línea)",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Guardia de Seguridad está diseñado para formar profesionales altamente capacitados en el área de seguridad privada, conforme a las exigencias de la Ley N° 21.659 y la Subsecretaría de Prevención del Delito (SPD). Ofrecemos formación inicial y perfeccionamiento con excelencia técnica y sólida base ética.",
    image: "/images/cursos/guardia-de-seguridad.png",
  },
  {
    slug: "guardia-nochero-rondin-portero",
    title: "Curso de Guardia, Nochero, Rondín y Portero",
    duracion: "32 horas",
    modalidad: "100% Presencial (con apoyo en línea)",
    acreditado: false,
    financiadoSence: false,
    description:
      "En este curso, proporcionamos a los participantes los conocimientos y habilidades requeridas para ejercer de manera efectiva los roles de guardia, nochero, portero y rondín bajo la Ley N° 21.659. A través de nuestro programa de formación presencial con material en línea, garantizamos una preparación integral y enfocada en la práctica laboral.",
    image: "/images/cursos/guardia-nochero-rondin-portero.jpg",
  },
  {
    slug: "nochero-portero-y-rondin",
    title: "Curso de Guardia, Nochero, Rondín y Portero",
    duracion: "32 horas",
    modalidad: "100% Presencial (con apoyo en línea)",
    acreditado: false,
    financiadoSence: false,
    description:
      "En este curso, proporcionamos a los participantes los conocimientos y habilidades requeridas para ejercer de manera efectiva los roles de guardia, nochero, portero y rondín bajo la Ley N° 21.659. A través de nuestro programa de formación presencial con material en línea, garantizamos una preparación integral y enfocada en la práctica laboral.",
    image: "/images/cursos/guardia-nochero-rondin-portero.jpg",
  },
  {
    slug: "baston-y-esposas",
    title: "Curso de Bastón y Esposas",
    duracion: "10 horas",
    modalidad: "100% Presencial (con apoyo en línea)",
    acreditado: false,
    financiadoSence: false,
    description:
      "Curso práctico de manejo de bastón y uso de esposas, orientado al personal de seguridad que necesita dominar estas destrezas de control con seguridad y responsabilidad, bajo el principio de proporcionalidad y marco legal vigente.",
    image: "/images/cursos/baston-y-esposas.png",
  },
  {
    slug: "supervisor-de-seguridad",
    title: "Curso de Supervisor de Seguridad",
    duracion: "140 horas",
    modalidad: "Online Asincrónico y Presencial",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Supervisor de Seguridad se imparte en modalidad en línea asincrónica o presencial bajo la normativa de la Ley N° 21.659 y el D.S. N° 209 (Subsecretaría de Prevención del Delito). Preparamos a nuestros alumnos para dirigir y supervisar equipos operativos de seguridad con liderazgo, responsabilidad y eficacia.",
    image: "/images/cursos/supervisor-de-seguridad.png",
  },
  {
    slug: "operador-cctv-y-alarmas",
    title: "Curso de Operador de CCTV y Alarmas",
    duracion: "40 horas",
    modalidad: "Online Asincrónico y Presencial",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Alarma y CCTV está diseñado para capacitar a profesionales en el manejo y supervisión de sistemas de seguridad electrónicos, videovigilancia y centrales de monitoreo, conforme al marco regulatorio de la Subsecretaría de Prevención del Delito (SPD) y las normas técnicas vigentes.",
    image: "/images/cursos/operador-cctv-y-alarmas.png",
  },
];
