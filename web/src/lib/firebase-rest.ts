/* eslint-disable @typescript-eslint/no-explicit-any */
// Capa REST de Firebase con Service Account (compatible con Node y Edge limitado).
// Verifica tokens de usuario (jose + JWKS de Google) y llama a la REST API de Firestore.
import { createRemoteJWKSet, jwtVerify } from "jose";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export function serviceAccountConfigured() {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT);
}

function serviceAccount(): any {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

let tokenCache: { token: string; expires: number } | null = null;

/** Obtiene token OAuth2 de la Service Account (scope firestore). */
export async function getServiceAccountToken(): Promise<string | null> {
  const sa = serviceAccount();
  if (!sa) return null;
  if (tokenCache && Date.now() < tokenCache.expires - 300000) return tokenCache.token;

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const jose = await import("jose");
  const key = await jose.importPKCS8(sa.private_key, "RS256");
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader(header)
    .sign(key);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  tokenCache = { token: data.access_token, expires: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/robot/v1/metadata/jwk/securetoken@system.gserviceaccount.com")
);

/** Verifica un ID token de Firebase Auth (JWT) y devuelve el payload o null. */
export async function verifyUserToken(token: string): Promise<{ uid: string; email?: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${PROJECT_ID}`,
      audience: PROJECT_ID,
    });
    return {
      uid: payload.sub as string,
      email: typeof payload.email === "string" ? payload.email : undefined,
    };
  } catch {
    return null;
  }
}

export async function firestoreFetch(path: string, init?: RequestInit): Promise<any> {
  const token = await getServiceAccountToken();
  if (!token || !PROJECT_ID) throw new Error("Service account no configurada");
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Firestore REST ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

export function toFirestoreValue(value: any): any {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toFirestoreValue) } };
  if (typeof value === "object") {
    return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toFirestoreValue(v)])) } };
  }
  return { stringValue: String(value) };
}

export function fromFirestoreValue(v: any): any {
  if (!v || typeof v !== "object") return v;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue" in v) return (v.arrayValue?.values ?? []).map(fromFirestoreValue);
  if ("mapValue" in v) {
    const out: Record<string, any> = {};
    for (const [k, f] of Object.entries(v.mapValue?.fields ?? {})) out[k] = fromFirestoreValue(f);
    return out;
  }
  return v;
}

/** Agrega un documento a una colección (server-side). */
export async function firestoreAddDoc(collectionName: string, data: Record<string, any>): Promise<string> {
  const res = await firestoreFetch(`?documentId=`, {
    method: "POST",
    body: JSON.stringify({ fields: toFirestoreValue(data).mapValue.fields }),
  });
  return res.name?.split("/").pop() ?? "";
}

/** Guarda/sobrescribe un documento con id específico (server-side). */
export async function firestoreSetDoc(collectionName: string, docId: string, data: Record<string, any>): Promise<void> {
  const fields = toFirestoreValue(data).mapValue?.fields || {};
  await firestoreFetch(`/${collectionName}/${docId}`, {
    method: "PATCH",
    body: JSON.stringify({ fields }),
  });
}

/** Actualiza campos específicos de un documento por id (server-side). */
export async function firestorePatchDoc(collectionName: string, docId: string, data: Record<string, any>): Promise<void> {
  const fields = toFirestoreValue(data).mapValue?.fields || {};
  const fieldNames = Object.keys(fields);
  if (fieldNames.length === 0) return;
  const updateMask = fieldNames.map((k) => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join("&");
  await firestoreFetch(`/${collectionName}/${docId}?${updateMask}`, {
    method: "PATCH",
    body: JSON.stringify({ fields }),
  });
}

/** Obtiene un documento por id (server-side). */
export async function firestoreGetDoc(collectionName: string, docId: string): Promise<any | null> {
  try {
    const res = await firestoreFetch(`/${collectionName}/${docId}`);
    if (!res || !res.fields) return null;
    const out: Record<string, any> = {};
    for (const [k, f] of Object.entries(res.fields ?? {})) out[k] = fromFirestoreValue(f);
    return out;
  } catch (e) {
    if (e instanceof Error && e.message.includes("404")) return null;
    throw e;
  }
}

/** Consulta documentos con filtro simple de igualdad (server-side). */
export async function firestoreQuery(
  collectionName: string,
  field: string,
  value: string | number | boolean
): Promise<{ id: string; data: Record<string, any> }[]> {
  const res = await firestoreFetch(":runQuery", {
    method: "POST",
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: collectionName }],
        where: {
          fieldFilter: {
            field: { fieldPath: field },
            op: "EQUAL",
            value: toFirestoreValue(value),
          },
        },
        limit: 500,
      },
    }),
  });
  return (res ?? [])
    .filter((r: any) => r.document)
    .map((r: any) => {
      const id = r.document.name?.split("/").pop() ?? "";
      const data: Record<string, any> = {};
      for (const [k, f] of Object.entries(r.document.fields ?? {})) data[k] = fromFirestoreValue(f);
      return { id, data };
    });
}

/** Ejecuta una transacción commit con N escrituras (server-side). */
export async function firestoreCommit(writes: any[]): Promise<void> {
  await firestoreFetch(":commit", {
    method: "POST",
    body: JSON.stringify({ writes }),
  });
}

/** Elimina un documento por id (server-side). */
export async function firestoreDeleteDoc(collectionName: string, docId: string): Promise<void> {
  await firestoreFetch(`/${collectionName}/${docId}`, { method: "DELETE" });
}
