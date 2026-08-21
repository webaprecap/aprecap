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
    title: "Curso de Guardia de Seguridad",
    duracion: "90 horas (formación) · 36 horas (perfeccionamiento)",
    modalidad: "100% Presencial (con apoyo en línea)",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Guardia de Seguridad está diseñado para formar profesionales altamente capacitados en el área de seguridad. Ofrecemos opciones tanto para la formación inicial como para el perfeccionamiento, brindando a nuestros alumnos las herramientas necesarias para desempeñarse con excelencia en sus funciones.",
    image: "/images/cursos/guardia-de-seguridad.png",
  },
  {
    slug: "nochero-portero-y-rondin",
    title: "Curso de Nochero, Portero y Rondín",
    duracion: "32 horas",
    modalidad: "100% Presencial (con apoyo en línea)",
    acreditado: false,
    financiadoSence: false,
    description:
      "En este curso, proporcionamos a los participantes los conocimientos y habilidades requeridas para ejercer de manera efectiva los roles de nochero, portero y rondín. A través de nuestro programa de formación presencial con material en línea, garantizamos una preparación integral y enfocada en la práctica. Para matricularte, envíanos tus datos y coordinaremos tu cupo.",
    image:
      "https://aprecap.cl/wp-content/uploads/2023/10/banner_mayordomo_OTECCGAI_26agosto_mobile.jpg",
  },
  {
    slug: "baston-y-esposas",
    title: "Curso de Bastón y Esposas",
    duracion: "8 horas",
    modalidad: "100% Presencial (con apoyo en línea)",
    acreditado: false,
    financiadoSence: false,
    description:
      "Curso práctico de manejo de bastón y uso de esposas, orientado al personal de seguridad que necesita dominar estas destrezas de control con seguridad y responsabilidad. Para matricularte, envíanos tus datos y coordinamos tu cupo.",
    image: "/images/cursos/baston-y-esposas.png",
  },
  {
    slug: "supervisor-de-seguridad",
    title: "Curso de Supervisor de Seguridad",
    duracion: "140 horas",
    modalidad: "Online o presencial",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Supervisor de Seguridad se imparte en línea o presencial bajo la normativa de la Ley N° 21.659 y el D.S. N° 209 (SPD). Preparamos a nuestros alumnos para ejercer funciones de supervisión con responsabilidad y eficacia, garantizando una formación de calidad y adaptada a las necesidades del rubro.",
    image: "/images/cursos/supervisor-de-seguridad.png",
  },
  {
    slug: "operador-cctv-y-alarmas",
    title: "Curso de Operador de CCTV y Alarmas",
    duracion: "40 horas",
    modalidad: "Online y presencial",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Alarma y CCTV está diseñado para capacitar a profesionales en el manejo y supervisión de sistemas de seguridad electrónicos, conforme al marco regulatorio de la Subsecretaría de Prevención del Delito y las normas técnicas vigentes.",
    image: "/images/cursos/operador-cctv-y-alarmas.png",
  },
  {
    slug: "electricidad-domiciliaria",
    title: "Curso de Electricidad Domiciliaria",
    duracion: "Flexible",
    modalidad: "Online",
    acreditado: false,
    financiadoSence: false,
    description:
      "El curso de Electricidad Domiciliaria ofrece a los participantes una sólida formación en los fundamentos y prácticas de la electricidad aplicada a entornos residenciales. Diseñado y desarrollado por APRECAP, busca proporcionar las habilidades necesarias para comprender, instalar y mantener sistemas eléctricos en hogares de manera segura y eficiente.",
    image:
      "https://aprecap.cl/wp-content/uploads/2023/12/Diseno-sin-titulo-1.jpg",
  },
];
