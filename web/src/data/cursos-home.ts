export interface CursoHome {
  slug: string;
  title: string;
  image: string;
  duracion: string;
  modalidad: string;
  acreditado: boolean;
  href?: string;
}

export const CURSOS_PRESENCIAL_ONLINE: CursoHome[] = [
  {
    slug: "guardia-de-seguridad",
    title: "Guardia de Seguridad (SPD)",
    image: "/images/cursos/guardia-de-seguridad.png",
    duracion: "90 horas (formación) · 36 horas (perfeccionamiento)",
    modalidad: "100% Presencial (apoyo online)",
    acreditado: true,
    href: "/cursos/guardia-de-seguridad",
  },
  {
    slug: "baston-y-esposas",
    title: "Bastón y Esposas",
    image: "/images/cursos/baston-y-esposas.png",
    duracion: "10 horas",
    modalidad: "100% Presencial (apoyo online)",
    acreditado: false,
    href: "/cursos/baston-y-esposas",
  },
];

export const CURSOS_ONLINE: CursoHome[] = [
  {
    slug: "supervisor-de-seguridad",
    title: "Supervisor de Seguridad",
    image: "/images/cursos/supervisor-de-seguridad.png",
    duracion: "140 horas",
    modalidad: "Online Asincrónico",
    acreditado: true,
    href: "/cursos/supervisor-de-seguridad",
  },
  {
    slug: "operador-cctv-y-alarmas",
    title: "Operador CCTV y Alarmas",
    image: "/images/cursos/operador-cctv-y-alarmas.png",
    duracion: "40 horas",
    modalidad: "Online Asincrónico",
    acreditado: true,
    href: "/cursos/operador-cctv-y-alarmas",
  },
];

export const CURSOS_LABORALES: CursoHome[] = [
  {
    slug: "alfabetizacion-digital",
    title: "Alfabetización Digital y Ofimática",
    image: "/images/cursos/alfabetizacion-digital.jpg",
    duracion: "40 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/alfabetizacion-digital",
  },
  {
    slug: "grua-horquilla",
    title: "Operación Segura de Grúa Horquilla",
    image: "/images/cursos/grua-horquilla.jpg",
    duracion: "32 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/grua-horquilla",
  },
  {
    slug: "trabajo-en-altura",
    title: "Prevención y Trabajo Seguro en Altura",
    image: "/images/cursos/trabajo-en-altura.jpg",
    duracion: "24 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/trabajo-en-altura",
  },
  {
    slug: "manejo-de-sustancias-peligrosas",
    title: "Manejo de Sustancias Peligrosas",
    image: "/images/cursos/manejo-de-sustancias-peligrosas.jpg",
    duracion: "30 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/manejo-de-sustancias-peligrosas",
  },
  {
    slug: "tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia",
    title: "Autocuidado y Manejo del Estrés Laboral",
    image: "/images/cursos/tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia.jpg",
    duracion: "20 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia",
  },
  {
    slug: "tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas",
    title: "Liderazgo y Gestión de Equipos",
    image: "/images/cursos/tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas.jpg",
    duracion: "30 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas",
  },
  {
    slug: "trabajo-en-espacios-confinados",
    title: "Trabajo en Espacios Confinados",
    image: "/images/cursos/trabajo-en-espacios-confinados.jpg",
    duracion: "24 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/trabajo-en-espacios-confinados",
  },
  {
    slug: "operador-de-calderas-y-generadores-de-vapor",
    title: "Operador de Calderas y Generadores de Vapor",
    image: "/images/cursos/operador-de-calderas-y-generadores-de-vapor.jpg",
    duracion: "40 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/operador-de-calderas-y-generadores-de-vapor",
  },
  {
    slug: "guardia-nochero-rondin-portero",
    title: "Guardia, Nochero, Rondín y Portero",
    image: "/images/cursos/guardia-nochero-rondin-portero.jpg",
    duracion: "32 horas",
    modalidad: "Online Asincrónico",
    acreditado: false,
    href: "/cursos-otec/guardia-nochero-rondin-portero",
  },
];
