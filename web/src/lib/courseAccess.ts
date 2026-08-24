import type { UserData } from "@/contexts/AuthContext";

export type CourseAccessStatus = "desbloqueado" | "pendiente" | "rechazado" | "bloqueado";

export const CURSO_KEY_MAP: Record<string, string> = {
  "guardia-de-seguridad": "accesoOS10",
  "operador-cctv-y-alarmas": "accesoCCTV",
  "supervisor-de-seguridad": "accesoSupervisor",
  "baston-y-esposas": "accesoBaston",
};

export const CURSOS_LISTA = [
  {
    slug: "guardia-de-seguridad",
    nombre: "Curso Guardia de Seguridad (OS-10)",
    shortName: "Guardia OS-10",
    fieldKey: "accesoOS10",
    horas: "90",
    icono: "🛡️",
  },
  {
    slug: "operador-cctv-y-alarmas",
    nombre: "Curso Operador CCTV y Alarmas",
    shortName: "Operador CCTV",
    fieldKey: "accesoCCTV",
    horas: "40",
    icono: "📹",
  },
  {
    slug: "baston-y-esposas",
    nombre: "Curso Bastón y Esposas",
    shortName: "Bastón y Esposas",
    fieldKey: "accesoBaston",
    horas: "8",
    icono: "🥋",
  },
  {
    slug: "supervisor-de-seguridad",
    nombre: "Curso Supervisor de Seguridad",
    shortName: "Supervisor de Seguridad",
    fieldKey: "accesoSupervisor",
    horas: "140",
    icono: "⭐",
  },
];

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
