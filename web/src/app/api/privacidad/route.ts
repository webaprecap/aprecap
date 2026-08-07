import { NextResponse } from "next/server";
import {
  verifyUserToken,
  firestoreGetDoc,
  firestoreDeleteDoc,
  firestoreQuery,
} from "@/lib/firebase-rest";
import { logAuditAction } from "@/lib/auditLogger";

// Acciones de privacidad (Ley 21.719): exportar datos / eliminar cuenta.
export async function POST(req: Request) {
  try {
    const { accion, token } = await req.json();
    if (!token || !["export", "delete"].includes(accion)) {
      return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
    }

    const claims = await verifyUserToken(token);
    if (!claims) {
      return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
    }

    // export: empaqueta todos los datos del usuario (derecho de acceso).
    if (accion === "export") {
      const [usuario, enrollments, consents] = await Promise.all([
        firestoreGetDoc("usuarios", claims.uid),
        firestoreQuery("enrollments", "uid", claims.uid),
        firestoreQuery("consents", "uid", claims.uid),
      ]);
      await logAuditAction("EXPORT_DATA", { uid: claims.uid, email: claims.email });
      return NextResponse.json({
        data: {
          fecha: new Date().toISOString(),
          usuario,
          enrollments: enrollments.map((e) => e.data),
          consents: consents.map((c) => c.data),
        },
      });
    }

    // delete: borrado en cascada (derecho al olvido) + cuenta de Auth.
    const [enrollments, consents] = await Promise.all([
      firestoreQuery("enrollments", "uid", claims.uid),
      firestoreQuery("consents", "uid", claims.uid),
    ]);
    await Promise.all(
      [
        ...enrollments.map((e) => firestoreDeleteDoc("enrollments", e.id)),
        ...consents.map((c) => firestoreDeleteDoc("consents", c.id)),
        firestoreDeleteDoc("usuarios", claims.uid).catch(() => {}),
      ]
    );
    await logAuditAction("DELETE_ACCOUNT", { uid: claims.uid, email: claims.email });

    // Borrado de la cuenta de Auth vía Admin SDK (si está disponible).
    let authDeleted = false;
    try {
      const { getAuth } = await import("firebase-admin/auth");
      const { getFirebaseAdminApp } = await import("@/lib/firebase-admin");
      await getAuth(getFirebaseAdminApp()).deleteUser(claims.uid);
      authDeleted = true;
    } catch {
      // Sin Admin SDK configurado: la cuenta de Auth se borra en el cliente.
    }

    return NextResponse.json({ ok: true, authDeleted });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error interno" },
      { status: 500 }
    );
  }
}
