// Firebase Admin REST layer (Cloudflare Workers Edge compatible).
// Sustituye el uso de firebase-admin/node:fs por peticiones REST directas.
import {
  firestoreGetDoc,
  firestoreSetDoc,
  firestorePatchDoc,
  firestoreQuery,
} from "./firebase-rest";
import { getCourseFieldKey } from "./courseAccess";

export type PagoDoc = {
  buyOrder: string;
  token: string;
  cursoSlug: string;
  cursoNombre: string;
  email: string;
  uidUsuario?: string;
  nombreUsuario?: string;
  monto: number;
  estado: "creado" | "aprobado" | "rechazado" | "anulado" | "error";
  metodo?: string;
  cuotas?: number;
  montoCuota?: number;
  authorizationCode?: string;
  cardNumber?: string;
  buyOrderTbk?: string;
  fechaCreacion: string | Date;
  fechaPago?: string | Date;
  consentRef?: string;
  versionConsentimiento?: string;
};

export async function guardarPago(data: PagoDoc): Promise<string | null> {
  try {
    await firestoreSetDoc("pagos", data.buyOrder, {
      ...data,
      fechaCreacion: new Date(String(data.fechaCreacion)).toISOString(),
      fechaPago: data.fechaPago ? new Date(String(data.fechaPago)).toISOString() : null,
    });
    return data.buyOrder;
  } catch (e) {
    console.error("Error guardarPago REST:", e);
    return null;
  }
}

export async function actualizarPago(buyOrder: string, patch: Partial<PagoDoc>): Promise<boolean> {
  try {
    const updateData: Record<string, unknown> = { ...patch };
    if (patch.fechaPago) {
      updateData.fechaPago = new Date(String(patch.fechaPago)).toISOString();
    }
    await firestorePatchDoc("pagos", buyOrder, updateData);
    return true;
  } catch (e) {
    console.error("Error actualizarPago REST:", e);
    return false;
  }
}

export async function obtenerPago(buyOrder: string): Promise<{ id: string; data: PagoDoc } | null> {
  try {
    const doc = await firestoreGetDoc("pagos", buyOrder);
    if (!doc) return null;
    return { id: buyOrder, data: doc as PagoDoc };
  } catch (e) {
    console.error("Error obtenerPago REST:", e);
    return null;
  }
}

export async function guardarConsentimiento(params: {
  uid: string;
  email: string;
  version: string;
  userAgent: string;
}): Promise<string | null> {
  try {
    const id = `${params.uid}_${Date.now()}`;
    await firestoreSetDoc("consents", id, {
      uid: params.uid,
      email: params.email,
      tipo: "pago-ley21719",
      version: params.version,
      aceptado: true,
      fecha: new Date().toISOString(),
      userAgent: params.userAgent,
    });
    return id;
  } catch (e) {
    console.error("Error guardarConsentimiento REST:", e);
    return null;
  }
}

/**
 * Matricula y desbloquea el curso automáticamente tras un pago exitoso en WebPay.
 * Escribe en "enrollments" y actualiza los accesos del documento en "usuarios".
 */
export async function matricularPorPago(pago: PagoDoc): Promise<{ success: boolean; uid?: string; error?: string }> {
  try {
    const email = (pago.email || "").toLowerCase().trim();
    if (!email) {
      console.warn(`[webpay] No se puede matricular sin email. buyOrder: ${pago.buyOrder}`);
      return { success: false, error: "Email no proporcionado" };
    }

    let uid = pago.uidUsuario;

    // Si no vino el UID en la orden de pago, buscar si ya existe un usuario con este email
    if (!uid) {
      const usuarios = await firestoreQuery("usuarios", "email", email);
      if (usuarios.length > 0) {
        uid = usuarios[0].id || (usuarios[0].data?.uid as string | undefined);
      }
    }

    const fieldKey = getCourseFieldKey(pago.cursoSlug);

    // Si el usuario no existe aún en Firestore, creamos una ficha preliminar con su curso activo
    if (!uid) {
      uid = email.replace(/[^a-z0-9@._-]/gi, "-").toLowerCase();
      await firestoreSetDoc("usuarios", uid, {
        uid,
        email,
        nombre: pago.nombreUsuario || email.split("@")[0] || "Estudiante",
        rol: "alumno",
        activo: true,
        [fieldKey]: "aprobado",
        fechaRegistro: new Date().toISOString(),
        origenRegistro: "webpay",
      });
    } else {
      // Si el usuario ya existe, actualizamos su acceso y garantizamos activo: true
      await firestorePatchDoc("usuarios", uid, {
        [fieldKey]: "aprobado",
        activo: true,
      });
    }

    // Registrar formalmente la matrícula en la colección enrollments
    const enrollId = `${uid}_${pago.cursoSlug}`;
    await firestoreSetDoc("enrollments", enrollId, {
      uid,
      courseSlug: pago.cursoSlug,
      email,
      nombre: pago.nombreUsuario || "",
      modulosCompletados: [],
      fecha: new Date().toISOString(),
      buyOrder: pago.buyOrder,
      monto: pago.monto,
      origen: "webpay",
      estado: "activo",
    });

    console.info(`[webpay] Matrícula automática completada: ${enrollId} (email: ${email})`);
    return { success: true, uid };
  } catch (err) {
    console.error("[webpay] Error en matricularPorPago REST:", err);
    return { success: false, error: String(err) };
  }
}