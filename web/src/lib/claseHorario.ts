export interface HorarioClase {
  estado?: string;
  tipoHorario?: string | null;
  // Horario por Rango de Días (ej: del 1 al 10 de Septiembre, de 08:00 a 15:00 hrs cada día)
  fechaInicioRango?: string | null; // "YYYY-MM-DD"
  fechaFinRango?: string | null;    // "YYYY-MM-DD"
  horaInicioDiaria?: string | null; // "08:00"
  horaFinDiaria?: string | null;    // "15:00"
  diasPermitidos?: number[] | null; // [1,2,3,4,5] (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)

  // Horario puntual único
  fechaInicioProgramada?: string | null;
  fechaFinProgramada?: string | null;
  fechaInicio?: unknown;
}

export function getClaseLiveStatus(
  clase: HorarioClase
): "en_vivo" | "programada" | "finalizada" {
  if (clase.estado === "finalizada") return "finalizada";

  const now = new Date();

  // 1. Caso: Rango de Días con Horario Diario (ej: 10 días, de 08:00 a 15:00)
  if (
    clase.fechaInicioRango &&
    clase.fechaFinRango &&
    clase.horaInicioDiaria &&
    clase.horaFinDiaria
  ) {
    const pad = (n: number) => String(n).padStart(2, "0");
    const hoyStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

    // Si aún no empieza el rango de fechas
    if (hoyStr < clase.fechaInicioRango) {
      return "programada";
    }

    // Si ya pasó la fecha final del ciclo
    if (hoyStr > clase.fechaFinRango) {
      return "finalizada";
    }

    // Verificar días de la semana permitidos si están configurados
    if (clase.diasPermitidos && Array.isArray(clase.diasPermitidos) && clase.diasPermitidos.length > 0) {
      const diaSemanaHoy = now.getDay();
      if (!clase.diasPermitidos.includes(diaSemanaHoy)) {
        return "programada";
      }
    }

    // Hoy está dentro de las fechas [fechaInicioRango, fechaFinRango].
    // Validar hora actual contra [horaInicioDiaria, horaFinDiaria].
    const horaActualMinutos = now.getHours() * 60 + now.getMinutes();

    const [hIni, mIni] = clase.horaInicioDiaria.split(":").map(Number);
    const [hFin, mFin] = clase.horaFinDiaria.split(":").map(Number);
    const minutosInicio = (isNaN(hIni) ? 8 : hIni) * 60 + (isNaN(mIni) ? 0 : mIni);
    const minutosFin = (isNaN(hFin) ? 15 : hFin) * 60 + (isNaN(mFin) ? 0 : mFin);

    if (horaActualMinutos >= minutosInicio && horaActualMinutos <= minutosFin) {
      return "en_vivo";
    }

    // Si hoy es el último día y ya terminó el horario de la tarde
    if (hoyStr === clase.fechaFinRango && horaActualMinutos > minutosFin) {
      return "finalizada";
    }

    return "programada";
  }

  // 2. Caso: Horario puntual único (fechaInicioProgramada a fechaFinProgramada)
  if (clase.fechaInicioProgramada && clase.fechaFinProgramada) {
    const ahora = now.getTime();
    const tInicio = new Date(clase.fechaInicioProgramada).getTime();
    const tFin = new Date(clase.fechaFinProgramada).getTime();

    if (isNaN(tInicio) || isNaN(tFin)) {
      return clase.estado === "activa" ? "en_vivo" : "programada";
    }

    if (ahora < tInicio) {
      return "programada";
    }
    if (ahora >= tInicio && ahora <= tFin) {
      return "en_vivo";
    }
    if (ahora > tFin) {
      return "finalizada";
    }
  }

  return clase.estado === "activa" ? "en_vivo" : "programada";
}

export function formatDetalleHorario(clase: HorarioClase): string {
  if (
    clase.fechaInicioRango &&
    clase.fechaFinRango &&
    clase.horaInicioDiaria &&
    clase.horaFinDiaria
  ) {
    try {
      const [y1, m1, d1] = clase.fechaInicioRango.split("-").map(Number);
      const [y2, m2, d2] = clase.fechaFinRango.split("-").map(Number);
      const fIni = new Date(y1, m1 - 1, d1).toLocaleDateString("es-CL", {
        day: "numeric",
        month: "short",
      });
      const fFin = new Date(y2, m2 - 1, d2).toLocaleDateString("es-CL", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return `Ciclo del ${fIni} al ${fFin} · Diario de ${clase.horaInicioDiaria} a ${clase.horaFinDiaria} hrs`;
    } catch {
      return `Del ${clase.fechaInicioRango} al ${clase.fechaFinRango} (${clase.horaInicioDiaria} - ${clase.horaFinDiaria})`;
    }
  }

  return formatRangoHorario(clase.fechaInicioProgramada, clase.fechaFinProgramada);
}

export function formatRangoHorario(
  inicio?: string | null,
  fin?: string | null
): string {
  if (!inicio) return "Sin horario programado";
  try {
    const dInicio = new Date(inicio);
    const fechaStr = dInicio.toLocaleDateString("es-CL", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const horaInicio = dInicio.toLocaleTimeString("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (fin) {
      const dFin = new Date(fin);
      const horaFin = dFin.toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${fechaStr} · de ${horaInicio} a ${horaFin} hrs`;
    }

    return `${fechaStr} a las ${horaInicio} hrs`;
  } catch {
    return `${inicio} - ${fin || ""}`;
  }
}
