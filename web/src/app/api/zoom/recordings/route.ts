import { NextResponse } from "next/server";
import {
  deleteMeetingRecordings,
  getZoomAccessToken,
  listRecordings,
  zoomEnabled,
} from "@/lib/zoom";
import { logAuditAction } from "@/lib/auditLogger";

// API para consultar y gestionar grabaciones de Zoom en la nube (server-side, admin only)
export async function GET(req: Request) {
  if (!zoomEnabled()) {
    return NextResponse.json(
      { error: "Zoom no configurado (faltan credenciales en variables de entorno)" },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;

    const data = await listRecordings(from, to);
    const token = await getZoomAccessToken();

    // Mapear reuniones agregando el access_token a los enlaces de descarga para que el navegador del admin descargue el MP4 directo
    const meetings = (data.meetings || []).map((m) => {
      const files = (m.recording_files || []).map((f) => ({
        ...f,
        download_url_auth: f.download_url
          ? `${f.download_url}${f.download_url.includes("?") ? "&" : "?"}access_token=${token}`
          : f.download_url,
      }));

      return {
        ...m,
        recording_files: files,
      };
    });

    return NextResponse.json({
      total_records: data.total_records ?? meetings.length,
      from: data.from,
      to: data.to,
      meetings,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error al listar grabaciones de Zoom" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!zoomEnabled()) {
    return NextResponse.json({ error: "Zoom no configurado" }, { status: 503 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const action = (searchParams.get("action") as "trash" | "delete") || "trash";

    if (!id) {
      return NextResponse.json({ error: "ID de reunión o grabación requerido" }, { status: 400 });
    }

    await deleteMeetingRecordings(id, action);
    await logAuditAction("RECORDING_DELETED", {
      detalle: `Grabación de reunión Zoom ${id} enviada a ${action === "trash" ? "papelera" : "eliminación permanente"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error al eliminar grabación de Zoom";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
