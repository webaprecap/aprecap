import { NextResponse } from "next/server";
import { firestoreAddDoc, serviceAccountConfigured } from "@/lib/firebase-rest";

// Formulario de contacto público — guarda en Firestore (contact_submissions).
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nombre = String(body.nombre || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 160);
    const telefono = String(body.telefono || "").trim().slice(0, 40);
    const mensaje = String(body.mensaje || "").trim().slice(0, 2000);

    if (!email || !mensaje) {
      return NextResponse.json({ error: "Email y mensaje son requeridos" }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (!serviceAccountConfigured()) {
      return NextResponse.json({ error: "Base de datos no configurada" }, { status: 503 });
    }

    await firestoreAddDoc("contact_submissions", {
      nombre,
      email,
      telefono,
      mensaje,
      fecha: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error interno" },
      { status: 500 }
    );
  }
}
