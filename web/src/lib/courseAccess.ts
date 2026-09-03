import type { UserData } from "@/contexts/AuthContext";

export type CourseAccessStatus = "desbloqueado" | "pendiente" | "rechazado" | "bloqueado";

export const CURSO_KEY_MAP: Record<string, string> = {
  "guardia-de-seguridad": "accesoOS10",
  "operador-cctv-y-alarmas": "accesoCCTV",
  "supervisor-de-seguridad": "accesoSupervisor",
  "jefe-de-seguridad": "accesoJefe",
  "baston-y-esposas": "accesoBaston",
  "alfabetizacion-digital": "acceso_alfabetizacion_digital",
  "grua-horquilla": "acceso_grua_horquilla",
  "trabajo-en-altura": "acceso_trabajo_en_altura",
  "manejo-de-sustancias-peligrosas": "acceso_manejo_sustancias_peligrosas",
  "tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia": "acceso_autocuidado_estres",
  "tecnicas-de-autocuidado-y-manejo-de-estres": "acceso_autocuidado_estres",
  "tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas": "acceso_liderazgo_efectivo",
  "tecnicas-de-liderazgo-efectivo": "acceso_liderazgo_efectivo",
  "trabajo-en-espacios-confinados": "acceso_espacios_confinados",
  "gestion-y-promocion-del-buen-trato": "acceso_buen_trato",
  "operador-de-calderas-y-generadores-de-vapor": "acceso_operador_calderas",
  "operador-de-calderas": "acceso_operador_calderas",
  "guardia-nochero-rondin-portero": "acceso_nochero_portero",
  "nochero-portero-y-rondin": "acceso_nochero_portero",
  "electricidad-basica-industrial": "acceso_electricidad_industrial",
};

export interface CursoItemLista {
  slug: string;
  nombre: string;
  shortName: string;
  fieldKey: string;
  horas: string;
  icono: string;
  categoria?: "seguridad" | "otec";
}

export const CURSOS_SEGURIDAD: CursoItemLista[] = [
  {
    slug: "guardia-de-seguridad",
    nombre: "Curso Guardia de Seguridad (SPD)",
    shortName: "Guardia SPD",
    fieldKey: "accesoOS10",
    horas: "90",
    icono: "🛡️",
    categoria: "seguridad",
  },
  {
    slug: "operador-cctv-y-alarmas",
    nombre: "Curso Operador CCTV y Alarmas",
    shortName: "Operador CCTV",
    fieldKey: "accesoCCTV",
    horas: "40",
    icono: "📹",
    categoria: "seguridad",
  },
  {
    slug: "supervisor-de-seguridad",
    nombre: "Curso Supervisor de Seguridad",
    shortName: "Supervisor de Seguridad",
    fieldKey: "accesoSupervisor",
    horas: "140",
    icono: "⭐",
    categoria: "seguridad",
  },
  {
    slug: "baston-y-esposas",
    nombre: "Curso Bastón y Esposas",
    shortName: "Bastón y Esposas",
    fieldKey: "accesoBaston",
    horas: "10",
    icono: "🥋",
    categoria: "seguridad",
  },
];

export const CURSOS_OTEC: CursoItemLista[] = [
  {
    slug: "alfabetizacion-digital",
    nombre: "Alfabetización Digital y Ofimática",
    shortName: "Alfabetización Digital",
    fieldKey: "acceso_alfabetizacion_digital",
    horas: "40",
    icono: "💻",
    categoria: "otec",
  },
  {
    slug: "grua-horquilla",
    nombre: "Operación Segura de Grúa Horquilla",
    shortName: "Grúa Horquilla",
    fieldKey: "acceso_grua_horquilla",
    horas: "30",
    icono: "🚜",
    categoria: "otec",
  },
  {
    slug: "trabajo-en-altura",
    nombre: "Técnicas de Trabajo Seguro en Altura",
    shortName: "Trabajo en Altura",
    fieldKey: "acceso_trabajo_en_altura",
    horas: "24",
    icono: "🪜",
    categoria: "otec",
  },
  {
    slug: "manejo-de-sustancias-peligrosas",
    nombre: "Manejo Seguro de Sustancias Peligrosas",
    shortName: "Sustancias Peligrosas",
    fieldKey: "acceso_manejo_sustancias_peligrosas",
    horas: "30",
    icono: "☣️",
    categoria: "otec",
  },
  {
    slug: "tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia",
    nombre: "Técnicas de Autocuidado y Manejo de Estrés",
    shortName: "Autocuidado y Estrés",
    fieldKey: "acceso_autocuidado_estres",
    horas: "20",
    icono: "🧘",
    categoria: "otec",
  },
  {
    slug: "tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas",
    nombre: "Técnicas de Liderazgo Efectivo y Gestión de Personas",
    shortName: "Liderazgo Efectivo",
    fieldKey: "acceso_liderazgo_efectivo",
    horas: "24",
    icono: "🤝",
    categoria: "otec",
  },
  {
    slug: "trabajo-en-espacios-confinados",
    nombre: "Seguridad y Trabajo en Espacios Confinados",
    shortName: "Espacios Confinados",
    fieldKey: "acceso_espacios_confinados",
    horas: "16",
    icono: "🕳️",
    categoria: "otec",
  },
  {
    slug: "gestion-y-promocion-del-buen-trato",
    nombre: "Gestión y Promoción del Buen Trato Laboral",
    shortName: "Buen Trato Laboral",
    fieldKey: "acceso_buen_trato",
    horas: "16",
    icono: "🏢",
    categoria: "otec",
  },
  {
    slug: "operador-de-calderas-y-generadores-de-vapor",
    nombre: "Operador de Calderas y Generadores de Vapor",
    shortName: "Calderas de Vapor",
    fieldKey: "acceso_operador_calderas",
    horas: "40",
    icono: "🔥",
    categoria: "otec",
  },
  {
    slug: "guardia-nochero-rondin-portero",
    nombre: "Curso Guardia, Nochero, Rondín y Portero",
    shortName: "Nochero y Rondín",
    fieldKey: "acceso_nochero_portero",
    horas: "32",
    icono: "🚪",
    categoria: "otec",
  },
  {
    slug: "electricidad-basica-industrial",
    nombre: "Electricidad Básica Industrial",
    shortName: "Electricidad Industrial",
    fieldKey: "acceso_electricidad_industrial",
    horas: "40",
    icono: "⚡",
    categoria: "otec",
  },
];

export const CURSOS_LISTA: CursoItemLista[] = [...CURSOS_SEGURIDAD, ...CURSOS_OTEC];

export function getCourseFieldKey(courseSlug: string): string {
  return CURSO_KEY_MAP[courseSlug] || `acceso_${courseSlug.replace(/-/g, "_")}`;
}

export function getCourseStatus(
  userData: UserData | null,
  courseSlug: string,
  enrollments: { courseSlug?: string }[] = []
): CourseAccessStatus {
  if (!userData) return "bloqueado";
  if (userData.rol === "admin" || userData.rol === "superadmin" || userData.rol === "profesor") {
    return "desbloqueado";
  }

  // Verificar matrícula activa en Firestore
  const isEnrolled = enrollments.some((e) => e.courseSlug === courseSlug);
  if (isEnrolled) return "desbloqueado";

  const fieldKey = getCourseFieldKey(courseSlug);
  const val = userData[fieldKey];

  if (val === "aceptado" || val === "aprobado" || val === true) return "desbloqueado";
  if (val === "pendiente") return "pendiente";
  if (val === "rechazado") return "rechazado";

  return "bloqueado";
}

export function canAccessCourse(
  userData: UserData | null,
  courseSlug: string,
  enrollments: { courseSlug?: string }[] = []
): boolean {
  if (!userData || userData.activo === false) return false;
  const status = getCourseStatus(userData, courseSlug, enrollments);
  return status === "desbloqueado";
}

export function isMaterialHabilitado(
  userData: UserData | null,
  courseSlug: string,
  globalConfigHabilitado: boolean = false,
  enrollmentOrCohorteHabilitado: boolean = false
): boolean {
  if (!userData || userData.activo === false) return false;
  if (userData.rol === "admin" || userData.rol === "superadmin" || userData.rol === "profesor") {
    return true;
  }

  // Si no es el curso Guardia OS-10, el material sigue su flujo estándar
  if (courseSlug !== "guardia-de-seguridad") {
    return true;
  }

  // Para Guardia de Seguridad (OS-10): el material digital está bloqueado por defecto en fase presencial
  // hasta que el admin lo active de forma individual, por cohorte/grupo o global
  const individualHabilitado = Boolean(
    userData.habilitadoMaterialOS10 === true ||
    userData.materialOS10Habilitado === true ||
    (userData as any).materialHabilitado === true ||
    (userData as any).materialOS10Activo === true
  );

  return individualHabilitado || enrollmentOrCohorteHabilitado || globalConfigHabilitado;
}
