import { NextResponse } from "next/server";
import { endMeeting, listMeetings, zoomEnabled } from "@/lib/zoom";
import { logAuditAction } from "@/lib/auditLogger";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!zoomEnabled()) {
    return NextResponse.json({ error: "Zoom no configurado" }, { status: 503 });
  }

  // Validación de seguridad para Cron Jobs (VULN-APR-07)
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  const xCronSecret = req.headers.get("x-cron-secret");
  const urlSecret = new URL(req.url).searchParams.get("secret");

  const providedToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : (xCronSecret || urlSecret || "");

  if (!cronSecret || providedToken !== cronSecret) {
    return NextResponse.json(
      { error: "No autorizado. Token de cron inválido o no configurado." },
      { status: 401 }
    );
  }

  try {
    // 1. Obtener todas las reuniones que actualmente están EN VIVO
    const liveMeetings = await listMeetings("live");
    
    if (!liveMeetings || liveMeetings.length === 0) {
      return NextResponse.json({ message: "No hay reuniones en vivo en este momento." });
    }

    const now = new Date();
    const actions: string[] = [];
    let killed = 0;

    for (const meeting of liveMeetings) {
      if (!meeting.start_time) continue;
      
      const startTime = new Date(meeting.start_time);
      const durationMs = (meeting.duration || 90) * 60000;
      const gracePeriodMs = 30 * 60000; // 30 minutos de gracia
      
      const maxEndTime = new Date(startTime.getTime() + durationMs + gracePeriodMs);

      // Si la hora actual es mayor que la hora máxima de fin (inicio + duración + 30 mins)
      if (now > maxEndTime) {
        try {
          await endMeeting(meeting.id);
          actions.push(`Reunión ${meeting.id} (${meeting.topic}) apagada a la fuerza.`);
          await logAuditAction("CRON_MEETING_KILLED", { detalle: `Reunión Zoom ${meeting.id} apagada automáticamente por exceso de tiempo` });
          killed++;
        } catch (e) {
          const err = e instanceof Error ? e.message : String(e);
          actions.push(`Error al apagar reunión ${meeting.id}: ${err}`);
        }
      } else {
        actions.push(`Reunión ${meeting.id} está dentro de su tiempo válido.`);
      }
    }

    return NextResponse.json({
      message: `Proceso finalizado. Reuniones apagadas: ${killed}`,
      detalles: actions
    });

  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error desconocido";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
