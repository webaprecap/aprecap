import { NextResponse } from "next/server";
import { createMeeting, deleteMeeting, listMeetings, zoomEnabled } from "@/lib/zoom";
import { logAuditAction } from "@/lib/auditLogger";

// Reuniones Zoom (server-side, requiere credenciales Server-to-Server en .env).
export async function GET() {
  if (!zoomEnabled()) {
    return NextResponse.json(
      { error: "Zoom no configurado (faltan ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET)" },
      { status: 503 }
    );
  }
  try {
    const meetings = await listMeetings();
    return NextResponse.json({ meetings });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error al listar reuniones" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!zoomEnabled()) {
    return NextResponse.json(
      { error: "Zoom no configurado (faltan ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET)" },
      { status: 503 }
    );
  }
  try {
    const { topic, start_time, duration } = await req.json();
    if (!topic || !start_time) {
      return NextResponse.json({ error: "Tema y fecha son requeridos" }, { status: 400 });
    }
    const meeting = await createMeeting(
      String(topic),
      new Date(start_time).toISOString(),
      Number(duration) || 60
    );
    await logAuditAction("MEETING_CREATED", { detalle: topic });
    return NextResponse.json({ meeting });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error al crear reunión" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!zoomEnabled()) {
    return NextResponse.json(
      { error: "Zoom no configurado" },
      { status: 503 }
    );
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID de reunión requerido" }, { status: 400 });
    }
    await deleteMeeting(id);
    await logAuditAction("MEETING_DELETED", { detalle: `Reunión Zoom ${id} cancelada` });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error al cancelar reunión en Zoom";
    if (msg.includes("scopes") || msg.includes("meeting:delete")) {
      return NextResponse.json(
        {
          error:
            "Tu app de Zoom en marketplace.zoom.us no tiene activado el permiso de eliminación ('meeting:delete'). Puedes marcarlo en marketplace.zoom.us > Scopes > Meeting > Delete meeting, o borrarla directamente desde tu panel en zoom.us.",
        },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}


