export interface HorarioClase {
  estado?: string;
  fechaInicioProgramada?: string | null;
  fechaFinProgramada?: string | null;
  fechaInicio?: unknown;
}

export function getClaseLiveStatus(
  clase: HorarioClase
): "en_vivo" | "programada" | "finalizada" {
  if (clase.estado === "finalizada") return "finalizada";

  if (clase.fechaInicioProgramada && clase.fechaFinProgramada) {
    const ahora = Date.now();
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
