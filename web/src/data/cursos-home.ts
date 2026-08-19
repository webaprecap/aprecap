export interface CursoHome {
  slug: string;
  title: string;
  image: string;
  duracion: string;
  modalidad: string;
  acreditado: boolean;
}

export const CURSOS_PRESENCIAL_ONLINE: CursoHome[] = [
  {
    slug: "guardia-de-seguridad",
    title: "Guardia de Seguridad (OS-10)",
    image: "https://aprecap.cl/wp-content/uploads/2023/09/OS10_3-1024x576.png",
    duracion: "90 horas (formación) · 36 horas (perfeccionamiento)",
    modalidad: "Presencial + Online",
    acreditado: true,
  },
  {
    slug: "baston-y-esposas",
    title: "Bastón y Esposas",
    image: "https://aprecap.cl/wp-content/uploads/2023/10/capacitacion.png",
    duracion: "8 horas",
    modalidad: "Presencial + Online",
    acreditado: false,
  },
];

export const CURSOS_ONLINE: CursoHome[] = [
  {
    slug: "supervisor-de-seguridad",
    title: "Supervisor de Seguridad",
    image: "https://aprecap.cl/wp-content/uploads/2023/09/OS10_3-500x300.png",
    duracion: "140 horas",
    modalidad: "Online",
    acreditado: true,
  },
  {
    slug: "operador-cc-tv-y-alarmas",
    title: "Operador CC.TV y Alarmas",
    image: "https://aprecap.cl/wp-content/uploads/2025/09/cctv-500x300.jpg",
    duracion: "40 horas",
    modalidad: "Online",
    acreditado: true,
  },
];
