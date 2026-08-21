/**
 * Sistema de Desbloqueo Progresivo Temporal (Drip Content)
 * APRECAP Capacitaciones
 *
 * Configuración oficial:
 * - Operador CCTV (operador-cctv-y-alarmas): 4 Días Totales (M1: Día 1, M2: Día 2, M3: Día 3, Examen: Día 4)
 * - Supervisor de Seguridad (supervisor-de-seguridad): 7 Días Totales (M1: Día 1 ... M6: Día 6, Examen: Día 7)
 * - Otros cursos (guardia-de-seguridad, baston-y-esposas): Sin restricción de días (desbloqueo inmediato)
 */

export interface CourseTimingSchedule {
  totalDias: number;
  /** Mapeo de índice de módulo (0-indexed) al día en que se desbloquea (1-indexed) */
  modulosDias: number[];
  /** Día en que se desbloquea el examen final (1-indexed) */
  examenFinalDia: number;
}

export const COURSE_TIMING_CONFIG: Record<string, CourseTimingSchedule> = {
  "operador-cctv-y-alarmas": {
    totalDias: 4,
    modulosDias: [1, 2, 3], // M1: Día 1, M2: Día 2, M3: Día 3
    examenFinalDia: 4,      // Examen Final: Día 4
  },
  "supervisor-de-seguridad": {
    totalDias: 7,
    modulosDias: [1, 2, 3, 4, 5, 6], // M1..M6: Días 1..6
    examenFinalDia: 7,               // Examen Final: Día 7
  },
};

export interface ModuleUnlockStatus {
  isUnlocked: boolean;
  diaRequerido: number;
  diaActual: number;
  totalDiasCurso: number;
  fechaDesbloqueo: Date | null;
  horasRestantes: number;
  minutosRestantes: number;
  mensajeBloqueo?: string;
  esCursoConTiempo: boolean;
}

export interface ExamUnlockStatus {
  isUnlocked: boolean;
  diaRequerido: number;
  diaActual: number;
  totalDiasCurso: number;
  fechaDesbloqueo: Date | null;
  horasRestantes: number;
  minutosRestantes: number;
  mensajeBloqueo?: string;
  esCursoConTiempo: boolean;
}

/**
 * Normaliza cualquier tipo de fecha proveniente de Firestore o timestamp
 */
export function normalizarFechaMatricula(rawFecha?: unknown): Date {
  if (!rawFecha) return new Date();

  // Si es un objeto Date
  if (rawFecha instanceof Date) return rawFecha;

  // Si es un Firestore Timestamp con toDate()
  if (typeof rawFecha === "object" && rawFecha !== null) {
    const f = rawFecha as { toDate?: () => Date; seconds?: number };
    if (typeof f.toDate === "function") return f.toDate();
    if (typeof f.seconds === "number") return new Date(f.seconds * 1000);
  }

  // Si es un string ISO o número timestamp
  if (typeof rawFecha === "string" || typeof rawFecha === "number") {
    const d = new Date(rawFecha);
    if (!isNaN(d.getTime())) return d;
  }

  return new Date();
}

/**
 * Calcula el día actual en el que se encuentra el alumno dentro de su curso (1-indexed)
 */
export function getDiaActualCurso(fechaMatricula?: unknown): number {
  const fecha = normalizarFechaMatricula(fechaMatricula);
  const now = Date.now();
  const diffMs = Math.max(0, now - fecha.getTime());
  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  return dias;
}

/**
 * Calcula el estado de desbloqueo temporal de un módulo específico
 */
export function getModuleUnlockStatus(
  cursoSlug: string,
  moduloIdx: number,
  fechaMatricula?: unknown,
  isAdmin: boolean = false
): ModuleUnlockStatus {
  const config = COURSE_TIMING_CONFIG[cursoSlug];

  // Si es Admin/Profesor o el curso no tiene configuración temporal -> Siempre desbloqueado
  if (isAdmin || !config) {
    return {
      isUnlocked: true,
      diaRequerido: 1,
      diaActual: 1,
      totalDiasCurso: config ? config.totalDias : 1,
      fechaDesbloqueo: null,
      horasRestantes: 0,
      minutosRestantes: 0,
      esCursoConTiempo: Boolean(config),
    };
  }

  const diaRequerido = config.modulosDias[moduloIdx] ?? 1;
  const fecha = normalizarFechaMatricula(fechaMatricula);
  const diaActual = getDiaActualCurso(fechaMatricula);

  // Si ya pasaron los días requeridos
  if (diaActual >= diaRequerido) {
    return {
      isUnlocked: true,
      diaRequerido,
      diaActual,
      totalDiasCurso: config.totalDias,
      fechaDesbloqueo: null,
      horasRestantes: 0,
      minutosRestantes: 0,
      esCursoConTiempo: true,
    };
  }

  // Calcular fecha y horas exactas de desbloqueo
  // El día 2 se desbloquea tras 24h (1 día completo), día 3 tras 48h (2 días), etc.
  const msRequeridos = (diaRequerido - 1) * 24 * 60 * 60 * 1000;
  const fechaDesbloqueo = new Date(fecha.getTime() + msRequeridos);
  const diffRestanteMs = Math.max(0, fechaDesbloqueo.getTime() - Date.now());

  const horasRestantes = Math.floor(diffRestanteMs / (1000 * 60 * 60));
  const minutosRestantes = Math.floor((diffRestanteMs % (1000 * 60 * 60)) / (1000 * 60));

  const fechaFormateada = fechaDesbloqueo.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    isUnlocked: false,
    diaRequerido,
    diaActual,
    totalDiasCurso: config.totalDias,
    fechaDesbloqueo,
    horasRestantes,
    minutosRestantes,
    mensajeBloqueo: `Este módulo se habilitará automáticamente el ${fechaFormateada} (Día ${diaRequerido} de tu curso).`,
    esCursoConTiempo: true,
  };
}

/**
 * Calcula el estado de desbloqueo temporal del examen final
 */
export function getExamUnlockStatus(
  cursoSlug: string,
  fechaMatricula?: unknown,
  isAdmin: boolean = false
): ExamUnlockStatus {
  const config = COURSE_TIMING_CONFIG[cursoSlug];

  // Si es Admin/Profesor o el curso no tiene configuración temporal -> Siempre desbloqueado
  if (isAdmin || !config) {
    return {
      isUnlocked: true,
      diaRequerido: 1,
      diaActual: 1,
      totalDiasCurso: config ? config.totalDias : 1,
      fechaDesbloqueo: null,
      horasRestantes: 0,
      minutosRestantes: 0,
      esCursoConTiempo: Boolean(config),
    };
  }

  const diaRequerido = config.examenFinalDia;
  const fecha = normalizarFechaMatricula(fechaMatricula);
  const diaActual = getDiaActualCurso(fechaMatricula);

  if (diaActual >= diaRequerido) {
    return {
      isUnlocked: true,
      diaRequerido,
      diaActual,
      totalDiasCurso: config.totalDias,
      fechaDesbloqueo: null,
      horasRestantes: 0,
      minutosRestantes: 0,
      esCursoConTiempo: true,
    };
  }

  const msRequeridos = (diaRequerido - 1) * 24 * 60 * 60 * 1000;
  const fechaDesbloqueo = new Date(fecha.getTime() + msRequeridos);
  const diffRestanteMs = Math.max(0, fechaDesbloqueo.getTime() - Date.now());

  const horasRestantes = Math.floor(diffRestanteMs / (1000 * 60 * 60));
  const minutosRestantes = Math.floor((diffRestanteMs % (1000 * 60 * 60)) / (1000 * 60));

  const fechaFormateada = fechaDesbloqueo.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    isUnlocked: false,
    diaRequerido,
    diaActual,
    totalDiasCurso: config.totalDias,
    fechaDesbloqueo,
    horasRestantes,
    minutosRestantes,
    mensajeBloqueo: `El Examen Final se habilitará el ${fechaFormateada} tras completar el periodo formativo de ${diaRequerido} días.`,
    esCursoConTiempo: true,
  };
}
