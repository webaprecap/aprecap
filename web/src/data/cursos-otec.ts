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
    modalidad: "Presencial",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Guardia de Seguridad está diseñado para formar profesionales altamente capacitados en el área de seguridad. Ofrecemos opciones tanto para la formación inicial como para el perfeccionamiento, brindando a nuestros alumnos las herramientas necesarias para desempeñarse con excelencia en sus funciones.",
    image: "https://aprecap.cl/wp-content/uploads/2023/10/capacitacion.png",
  },
  {
    slug: "mayordomo-y-conserjes",
    title: "Curso de Mayordomo y Conserjes",
    duracion: "32 horas",
    modalidad: "Presencial",
    acreditado: false,
    financiadoSence: false,
    description:
      "En este curso, proporcionamos a los participantes los conocimientos y habilidades requeridas para ejercer de manera efectiva el rol de conserje. A través de nuestro programa de formación presencial, garantizamos una preparación integral y enfocada en la práctica.",
    image:
      "https://aprecap.cl/wp-content/uploads/2023/10/banner_mayordomo_OTECCGAI_26agosto_mobile.jpg",
  },
  {
    slug: "supervisor-de-seguridad",
    title: "Curso de Supervisor de Seguridad",
    duracion: "140 horas",
    modalidad: "Online o presencial",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Supervisor de Seguridad se imparte en línea o presencial y cuenta con el respaldo de la acreditación OS-10. Preparamos a nuestros alumnos para ejercer funciones de supervisión con responsabilidad y eficacia, garantizando una formación de calidad y adaptada a las necesidades del rubro.",
    image:
      "https://aprecap.cl/wp-content/uploads/2023/10/Curso-supervisor-de-seguridad-privada-edited-1.jpg",
  },
  {
    slug: "jefe-de-seguridad-otec",
    title: "Curso de Jefe de Seguridad",
    duracion: "400 horas",
    modalidad: "Online",
    acreditado: true,
    financiadoSence: true,
    description:
      "El curso de Jefe de Seguridad es una formación completa y profunda para aquellos que desean asumir roles de liderazgo en el ámbito de la seguridad. Con nuestro programa en línea acreditado por OS-10, proporcionamos el conocimiento y las habilidades necesarias para ser un jefe de seguridad altamente competente.",
    image:
      "https://aprecap.cl/wp-content/uploads/2023/10/scott-graham-5fnmwej4taa-unsplash-1--e1707442324516.jpg",
  },
  {
    slug: "operador-cctv-y-alarmas",
    title: "Curso de Operador de CCTV y Alarmas",
    duracion: "40 horas",
    modalidad: "Online y presencial",
    acreditado: true,
    financiadoSence: true,
    description:
      "Nuestro curso de Alarma y CCTV está diseñado para capacitar a profesionales en el manejo y mantenimiento de sistemas de seguridad electrónicos. A través de la modalidad en línea y presencial con la acreditación OS-10, aseguramos una formación actualizada y acorde a los avances tecnológicos.",
    image: "https://aprecap.cl/wp-content/uploads/2023/10/ps3.jpg",
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
