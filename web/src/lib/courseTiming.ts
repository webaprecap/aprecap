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
 * Trunca una fecha a las 00:00:00.000 locales para comparación precisa por días calendario
 */
export function toStartOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/**
 * Calcula la fecha y hora exacta de desbloqueo (00:00:00 medianoche) para un día requerido (1-indexed).
 * - Día 1: Medianoche del día en que se matriculó.
 * - Día 2: 00:00:00 del día siguiente al de matrícula.
 * - Día N: 00:00:00 del (N - 1) día calendario tras la matrícula.
 */
export function getFechaDesbloqueoDia(fechaMatricula: Date, diaRequerido: number): Date {
  const fechaInicio = toStartOfDay(fechaMatricula);
  const target = new Date(fechaInicio);
  target.setDate(target.getDate() + Math.max(0, diaRequerido - 1));
  target.setHours(0, 0, 0, 0);
  return target;
}

/**
 * Calcula el día actual en el que se encuentra el alumno dentro de su curso (1-indexed).
 * Se rige estrictamente por DÍAS CALENDARIO (medianoche 00:00:00):
 * - El día en que se inscribe es el Día 1.
 * - Al llegar las 00:00:01 del día siguiente (la medianoche), pasa automáticamente al Día 2.
 */
export function getDiaActualCurso(fechaMatricula?: unknown): number {
  const fecha = normalizarFechaMatricula(fechaMatricula);
  const startMatricula = toStartOfDay(fecha);
  const startNow = toStartOfDay(new Date());

  const diffMs = startNow.getTime() - startMatricula.getTime();
  if (diffMs <= 0) {
    return 1;
  }

  // Math.round previene desajustes por cambios estacionales de horario (DST en Chile)
  const diffDias = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDias + 1);
}

/**
 * Calcula el estado de desbloqueo temporal de un módulo específico
 */
export function getModuleUnlockStatus(
  cursoSlug: string,
  moduloIdx: number,
  fechaMatricula?: unknown,
  isAdmin: boolean = false,
  sinRestriccionTiempo: boolean = false
): ModuleUnlockStatus {
  const config = COURSE_TIMING_CONFIG[cursoSlug];

  // Si es Admin/Profesor, bypass de tiempo activo, o el curso no tiene configuración temporal -> Siempre desbloqueado
  if (isAdmin || sinRestriccionTiempo || !config) {
    return {
      isUnlocked: true,
      diaRequerido: 1,
      diaActual: config ? config.totalDias : 1,
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

  // Si ya pasaron los días requeridos (por día calendario)
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

  // Calcular fecha y horas exactas de desbloqueo: medianoche (00:00:00) del día requerido
  const fechaDesbloqueo = getFechaDesbloqueoDia(fecha, diaRequerido);
  const diffRestanteMs = Math.max(0, fechaDesbloqueo.getTime() - Date.now());

  const horasRestantes = Math.floor(diffRestanteMs / (1000 * 60 * 60));
  const minutosRestantes = Math.floor((diffRestanteMs % (1000 * 60 * 60)) / (1000 * 60));

  const fechaFormateada = fechaDesbloqueo.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return {
    isUnlocked: false,
    diaRequerido,
    diaActual,
    totalDiasCurso: config.totalDias,
    fechaDesbloqueo,
    horasRestantes,
    minutosRestantes,
    mensajeBloqueo: `Este módulo se habilitará automáticamente el ${fechaFormateada} a las 00:00 hrs (Día ${diaRequerido} de tu curso).`,
    esCursoConTiempo: true,
  };
}

/**
 * Calcula el estado de desbloqueo temporal del examen final
 */
export function getExamUnlockStatus(
  cursoSlug: string,
  fechaMatricula?: unknown,
  isAdmin: boolean = false,
  sinRestriccionTiempo: boolean = false
): ExamUnlockStatus {
  const config = COURSE_TIMING_CONFIG[cursoSlug];

  // Si es Admin/Profesor, bypass de tiempo activo, o el curso no tiene configuración temporal -> Siempre desbloqueado
  if (isAdmin || sinRestriccionTiempo || !config) {
    return {
      isUnlocked: true,
      diaRequerido: 1,
      diaActual: config ? config.totalDias : 1,
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

  // Desbloqueo a las 00:00:00 del día calendario requerido
  const fechaDesbloqueo = getFechaDesbloqueoDia(fecha, diaRequerido);
  const diffRestanteMs = Math.max(0, fechaDesbloqueo.getTime() - Date.now());

  const horasRestantes = Math.floor(diffRestanteMs / (1000 * 60 * 60));
  const minutosRestantes = Math.floor((diffRestanteMs % (1000 * 60 * 60)) / (1000 * 60));

  const fechaFormateada = fechaDesbloqueo.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return {
    isUnlocked: false,
    diaRequerido,
    diaActual,
    totalDiasCurso: config.totalDias,
    fechaDesbloqueo,
    horasRestantes,
    minutosRestantes,
    mensajeBloqueo: `El Examen Final se habilitará el ${fechaFormateada} a las 00:00 hrs tras completar el periodo formativo de ${diaRequerido} días.`,
    esCursoConTiempo: true,
  };
}

export interface AlumnoSeguimientoTiming {
  diaActual: number;
  totalDiasCurso: number;
  diasRestantes: number;
  horasRestantes: number;
  fechaDesbloqueoExamen: Date | null;
  examenDisponible: boolean;
  esCursoConTiempo: boolean;
  etiquetaProgreso: string;
}

/**
 * Calcula el progreso de días transcurridos y restantes para la vista de seguimiento del Administrador
 */
export function getAlumnoSeguimientoTiming(
  cursoSlug: string,
  fechaMatricula?: unknown,
  sinRestriccionTiempo: boolean = false
): AlumnoSeguimientoTiming {
  const config = COURSE_TIMING_CONFIG[cursoSlug];
  const fecha = normalizarFechaMatricula(fechaMatricula);
  const diaActual = getDiaActualCurso(fechaMatricula);

  if (!config) {
    return {
      diaActual: 1,
      totalDiasCurso: 1,
      diasRestantes: 0,
      horasRestantes: 0,
      fechaDesbloqueoExamen: null,
      examenDisponible: true,
      esCursoConTiempo: false,
      etiquetaProgreso: "Sin restricción de días (Acceso inmediato)",
    };
  }

  if (sinRestriccionTiempo) {
    return {
      diaActual: config.totalDias,
      totalDiasCurso: config.totalDias,
      diasRestantes: 0,
      horasRestantes: 0,
      fechaDesbloqueoExamen: null,
      examenDisponible: true,
      esCursoConTiempo: true,
      etiquetaProgreso: "⚡ Sin restricción de tiempo (Bypass activo)",
    };
  }

  const diaRequerido = config.examenFinalDia;
  const isUnlocked = diaActual >= diaRequerido;
  const fechaDesbloqueo = getFechaDesbloqueoDia(fecha, diaRequerido);
  const diffRestanteMs = Math.max(0, fechaDesbloqueo.getTime() - Date.now());
  const horasRestantes = Math.floor(diffRestanteMs / (1000 * 60 * 60));
  const diasRestantes = isUnlocked ? 0 : Math.max(1, Math.ceil(diffRestanteMs / (1000 * 60 * 60 * 24)));

  return {
    diaActual: Math.min(diaActual, config.totalDias),
    totalDiasCurso: config.totalDias,
    diasRestantes,
    horasRestantes,
    fechaDesbloqueoExamen: isUnlocked ? null : fechaDesbloqueo,
    examenDisponible: isUnlocked,
    esCursoConTiempo: true,
    etiquetaProgreso: isUnlocked
      ? `Día ${config.totalDias} de ${config.totalDias} (Periodo Completado)`
      : `Día ${diaActual} de ${config.totalDias} (Faltan ${diasRestantes} ${diasRestantes === 1 ? "día" : "días"})`,
  };
}

