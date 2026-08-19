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

export interface CurriculumItem {
  seccion: string;
  titulo: string;
  tipo: "leccion" | "evaluacion";
  minutos?: number;
  preguntas?: number;
}

export interface CursoLP {
  slug: string;
  title: string;
  source: string;
  image: string;
  duration: string;
  students: number;
  quizzes: number;
  description: string;
  competencias: string[];
  requisitos: string[];
  caracteristicas: string[];
  audiencia: string[];
  curriculum: CurriculumItem[];
  faq: { q: string; a: string }[];
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
