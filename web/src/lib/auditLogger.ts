// Auditoría server-side (Ley 21.663) — escribe en audit_logs con credenciales
// de Service Account. Sin credenciales, solo registra en consola.
import { getServiceAccountToken, firestoreAddDoc } from "@/lib/firebase-rest";

export type AuditAction =
  | "LOGIN_SUCCESS"
  | "CONSENT_GRANTED"
  | "EXPORT_DATA"
  | "DELETE_ACCOUNT"
  | "ROLE_CHANGED"
  | "USER_ACTIVE_TOGGLED"
  | "USER_DELETED"
  | "SOLICITUD_APROBADA"
  | "SOLICITUD_RECHAZADA"
  | "MEETING_CREATED"
  | "MEETING_DELETED";

export async function logAuditAction(
  accion: AuditAction,
  meta: { email?: string; uid?: string; detalle?: string }
) {
  try {
    const token = await getServiceAccountToken();
    if (!token) {
      console.log(`[audit] ${accion}`, meta);
      return;
    }
    await firestoreAddDoc("audit_logs", {
      accion,
      email: meta.email ?? null,
      uid: meta.uid ?? null,
      detalle: meta.detalle ?? null,
      fecha: new Date().toISOString(),
    });
  } catch (e) {
    console.error("[audit] fallo al registrar", accion, e);
  }
}
