export interface Pagina {
  slug: string;
  title: string;
  heading: string;
  source: string;
  body: string;
  images: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  source: string;
  date: string;
  body: string;
  images: string[];
}

export interface CursoLP {
  slug: string;
  title: string;
  source: string;
  image: string;
  price: string;
  duration: string;
  students: number;
  quizzes: number;
  description: string;
  competencias: string[];
  requisitos: string[];
  caracteristicas: string[];
  audiencia: string[];
  curriculum: string;
  faq: { q: string; a: string }[];
}

export interface ActividadMoodle {
  type: "forum" | "resource" | "url" | "quiz";
  name: string;
  url: string;
}

export interface CursoMoodle {
  slug: string;
  title: string;
  url: string;
  moodleId: string;
  activities: ActividadMoodle[];
  files: string[];
  filePaths: string[];
  videos: string[];
}

export interface DatosContacto {
  direccion: string;
  metro: string;
  telefono: string;
  telefono2: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  email2: string;
  horario: string;
}
