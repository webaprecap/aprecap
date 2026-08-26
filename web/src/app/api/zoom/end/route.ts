import { NextResponse } from "next/server";
import { endMeeting, zoomEnabled } from "@/lib/zoom";
import { logAuditAction } from "@/lib/auditLogger";

export async function POST(req: Request) {
  if (!zoomEnabled()) {
    return NextResponse.json(
      { error: "Zoom no configurado" },
      { status: 503 }
    );
  }
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID de reunión requerido" }, { status: 400 });
    }
    
    // Forzar el final de la reunión
    await endMeeting(id);
    await logAuditAction("MEETING_ENDED_FORCEFULLY", { detalle: `Reunión Zoom ${id} apagada a la fuerza` });
    
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error al apagar reunión en Zoom";
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
