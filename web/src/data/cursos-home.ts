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
    image: "/images/cursos/guardia-de-seguridad.png",
    duracion: "90 horas (formación) · 36 horas (perfeccionamiento)",
    modalidad: "100% Presencial (apoyo online)",
    acreditado: true,
  },
  {
    slug: "baston-y-esposas",
    title: "Bastón y Esposas",
    image: "/images/cursos/baston-y-esposas.png",
    duracion: "8 horas",
    modalidad: "100% Presencial (apoyo online)",
    acreditado: false,
  },
];

export const CURSOS_ONLINE: CursoHome[] = [
  {
    slug: "supervisor-de-seguridad",
    title: "Supervisor de Seguridad",
    image: "/images/cursos/supervisor-de-seguridad.png",
    duracion: "140 horas",
    modalidad: "Online",
    acreditado: true,
  },
  {
    slug: "operador-cctv-y-alarmas",
    title: "Operador CCTV y Alarmas",
    image: "/images/cursos/operador-cctv-y-alarmas.png",
    duracion: "40 horas",
    modalidad: "Online",
    acreditado: true,
  },
];
