// Firebase Admin REST layer (Cloudflare Workers Edge compatible).
// Sustituye el uso de firebase-admin/node:fs por peticiones REST directas.
import {
  firestoreGetDoc,
  firestoreSetDoc,
  firestorePatchDoc,
} from "./firebase-rest";

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