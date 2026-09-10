# Auditoría de Ciberseguridad, Vulnerabilidades y Cumplimiento Normativo — OTEC APRECAP

> **Proyecto:** Instituto APRECAP (`aprecap-web`)  
> **Fecha de Emisión:** Septiembre 2026  
> **Arquitectura:** Next.js 16.3.0 (App Router) + Cloudflare Workers (`@opennextjs/cloudflare`) + Firebase Firestore + Sanity CMS  
> **Marco Regulatorio:** Ley N° 21.719 (Protección de Datos Personales) y Ley N° 21.663 (Ley Marco de Ciberseguridad de Chile)

---

## 1. Resumen Ejecutivo

La presente auditoría evalúa la seguridad, integridad, protección de datos y resiliencia técnica de la plataforma web de **OTEC APRECAP**. Se identificó una arquitectura moderna y bien adaptada a Cloudflare Workers mediante llamadas REST nativas (`firebase-rest.ts`), pero con brechas de seguridad significativas en el control de acceso a Firestore, exposición de APIs corporativas y almacenamiento de credenciales en entornos locales.

### Resumen de Vulnerabilidades Detectadas

| ID | Vulnerabilidad | Severidad | CVSS v3.1 | Impacto Principal |
| :--- | :--- | :---: | :---: | :--- |
| **VULN-APR-01** | Exfiltración masiva de datos en Firestore (`allow list`) | 🔴 **Crítica** | **8.5** | Fuga de base de datos de usuarios (RUT, email, fono) |
| **VULN-APR-02** | Fuga de Host Key y API de Zoom desprotegida | 🟠 **Alta** | **8.1** | Secuestro y cancelación de clases virtuales en vivo |
| **VULN-APR-03** | Llave privada maestra en raíz local (`service-account.json`) | 🟠 **Alta** | **7.8** | Compromiso total del proyecto Google Cloud / Firebase |
| **VULN-APR-04** | Ausencia total de cabeceras HTTP de seguridad | 🟠 **Alta** | **7.2** | Clickjacking, inyección y robo de contexto |
| **VULN-APR-05** | Flujo de pago WebPay sin matriculación automática | 🟡 **Media** | **5.5** | Falla de lógica de negocio (alumno bloqueado tras pagar) |
| **VULN-APR-06** | Autenticación MFA desactivada por defecto | 🟡 **Media** | **5.3** | Riesgo de secuestro de cuentas administrativas |
| **VULN-APR-07** | Endpoint Cron de Zoom sin validación de Secret Token | 🟢 **Baja** | **3.7** | Ejecución no autorizada de tareas de mantenimiento |

---

## 2. Detalle de Vulnerabilidades y Soluciones

---

### 🔴 VULN-APR-01: Exfiltración Masiva de Datos de Usuarios en Firestore Rules
* **Severidad:** Crítica (CVSS: 8.5 - `AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N`)
* **Ubicación:** [`web/firestore.rules`](../web/firestore.rules#L24-L32)
* **Infracción Legal:** Ley N° 21.719 (Art. 4, Principio de Confidencialidad y Seguridad de Datos Personales).

#### Análisis Técnico
En las reglas de Firestore actuales para la colección `usuarios`:
```javascript
match /usuarios/{userId} {
  allow get: if isSignedIn() && (
    userId == request.auth.uid ||
    isAdmin() ||
    isTeacher()
  );
  allow list: if isSignedIn(); // ⚠️ VULNERABILIDAD CRÍTICA
  ...
}
```
En Firestore Security Rules, la regla `list` aplica a consultas sobre la colección (`collection(db, 'usuarios')`). Al indicar `allow list: if isSignedIn();`, **cualquier persona que cree una cuenta gratuita de estudiante o visitante puede descargar todos los documentos de la colección**.

#### Prueba de Concepto (PoC)
Cualquier usuario autenticado ejecuta en la consola de JavaScript:
```javascript
const snap = await getDocs(collection(db, "usuarios"));
console.table(snap.docs.map(d => ({
  id: d.id,
  nombre: d.data().nombre,
  rut: d.data().rut,
  email: d.data().email,
  telefono: d.data().telefono,
  rol: d.data().rol
})));
```
El atacante obtiene de manera inmediata la nómina completa de guardias de seguridad inscritos, alumnos, profesores y administradores con sus datos de contacto y cédula de identidad chilena (RUT).

#### Código Seguro Recomendado
Restringir el listado exclusivamente a los roles que lo requieren para la operación académica:
```javascript
match /usuarios/{userId} {
  allow get: if isSignedIn() && (
    userId == request.auth.uid ||
    isAdmin() ||
    isTeacher()
  );
  // Solo administradores y profesores pueden listar el directorio de usuarios
  allow list: if isAdmin() || isTeacher();
  ...
}
```

---

### 🟠 VULN-APR-02: Endpoints de Zoom Expuestos sin Autenticación y Fuga de Host Key
* **Severidad:** Alta (CVSS: 8.1 - `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`)
* **Ubicación:** [`web/src/app/api/zoom/route.ts`](../web/src/app/api/zoom/route.ts)
* **Categoría OWASP:** A01:2021 – Broken Access Control

#### Análisis Técnico
La ruta `/api/zoom` interactúa con la cuenta corporativa de Zoom mediante credenciales Server-to-Server, pero carece de verificación de sesión o rol:
1. **Fuga de Host Key (`GET /api/zoom`):** Retorna la propiedad `hostKey` de Zoom en texto claro a cualquier visitante anónimo. Un atacante con este PIN puede ingresar a cualquier sala de clase de APRECAP y tomar el control total de anfitrión (expulsar profesores, proyectar contenido no deseado).
2. **Creación y Cancelación Arbitraria (`POST` y `DELETE`):** Cualquier usuario externo puede enviar solicitudes para saturar la cuenta de reuniones o eliminar reuniones de clases agendadas mediante `DELETE /api/zoom?id=MEETING_ID`.

#### Código Seguro Recomendado
Verificar el token de sesión de Firebase del usuario antes de ejecutar cualquier acción:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

async function validarRolDocente(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.substring(7);
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: "https://securetoken.google.com/aprecap-8aa89",
      audience: "aprecap-8aa89",
    });
    // Validar rol o email administrativo
    const email = String(payload.email || "").toLowerCase();
    const emailsAutorizados = ["web.aprecap@gmail.com", "csaavedraaprecap@gmail.com", "erciosaavedra@gmail.com", "contacto.digitalup@gmail.com"];
    return emailsAutorizados.includes(email);
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!(await validarRolDocente(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  // Procesar listado seguro...
}
```

---

### 🟠 VULN-APR-03: Clave Privada de Servicio en Raíz del Proyecto (`service-account.json`)
* **Severidad:** Alta (CVSS: 7.8)
* **Ubicación:** [`web/service-account.json`](../web/service-account.json)
* **Categoría OWASP:** A07:2021 – Identification and Authentication Failures

#### Análisis Técnico
El archivo `service-account.json` contiene la clave RSA privada completa de la cuenta de servicio de Google Cloud:
```json
{
  "type": "service_account",
  "project_id": "aprecap-8aa89",
  "private_key_id": "13b76c6c0f54cb7f050892ebd44a4f064d61ece4",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "firebase-adminsdk-fbsvc@aprecap-8aa89.iam.gserviceaccount.com"
}
```
Aunque se encuentra ignorado por `.gitignore`, tener un archivo plano con las credenciales maestras en el disco local expone al proyecto a fugas mediante copias de seguridad no encriptadas, compresión de carpetas o transferencias FTP accidentales.

#### Solución Recomendada
1. Trasladar la clave privada a variables de entorno encriptadas (`FIREBASE_SERVICE_ACCOUNT_KEY`) o secretos de Cloudflare:
   ```bash
   npx wrangler secret put FIREBASE_PRIVATE_KEY
   ```
2. Eliminar el archivo físico `web/service-account.json`.

---

### 🟠 VULN-APR-04: Ausencia Total de Cabeceras HTTP de Seguridad
* **Severidad:** Alta (CVSS: 7.2)
* **Ubicación:** [`web/next.config.ts`](../web/next.config.ts)
* **Infracción Legal:** Ley N° 21.663 Art. 7 (Estándares Mínimos de Ciberseguridad Web).

#### Análisis Técnico
El archivo `next.config.ts` no implementa directivas de encabezados HTTP. El navegador de los alumnos carga la plataforma sin protección contra:
* **Clickjacking:** Atacantes pueden incrustar la pasarela de pago o el aula virtual dentro de un `<iframe>` invisible y capturar clics del usuario.
* **MIME Sniffing:** Ausencia de `X-Content-Type-Options: nosniff`.
* **Carencia de HSTS:** Conexiones iniciales en HTTP no forzadas a HTTPS.

#### Código Seguro Recomendado
Agregar la configuración de `headers()` en `web/next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  // ... configuraciones previas ...
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'; frame-src 'self' blob: https://cdn.sanity.io https://*.zoom.us https://www.youtube.com;",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self 'https://*.zoom.us'), microphone=(self 'https://*.zoom.us'), display-capture=(self 'https://*.zoom.us')",
          },
        ],
      },
    ];
  },
};
```

---

### 🟡 VULN-APR-05: Flujo de Pago WebPay sin Matriculación Automática
* **Severidad:** Media (Riesgo Operativo / Experiencia de Usuario)
* **Ubicación:** [`web/src/app/api/webpay/return/route.ts`](../web/src/app/api/webpay/return/route.ts)

#### Análisis Técnico
Cuando Transbank confirma la transacción (`res.status === "AUTHORIZED"`), el endpoint actualiza el documento en la colección `pagos` a estado `"aprobado"`. Sin embargo, **no inserta el registro correspondiente en la colección `enrollments`**.
* Como consecuencia, el alumno paga exitosamente, pero al llegar a su panel de estudio (`/panel/alumno`), el sistema no encuentra su matrícula y le bloquea el contenido, obligando a una intervención manual de administración.

#### Código Seguro Recomendado
Crear el documento de matrícula directamente tras la confirmación bancaria:
```typescript
if (estado === "aprobado" && existente.uidUsuario) {
  const enrollmentId = `${existente.uidUsuario}_${existente.cursoSlug}`;
  await firestoreSetDoc("enrollments", enrollmentId, {
    uid: existente.uidUsuario,
    email: existente.email,
    courseSlug: existente.cursoSlug,
    cursoNombre: existente.cursoNombre,
    fecha: new Date().toISOString(),
    origen: "webpay-automatico",
    buyOrder: buyOrder,
    estado: "activo",
  });
}
```

---

### 🟡 VULN-APR-06: Autenticación Multi-Factor (MFA) Inactiva por Defecto
* **Severidad:** Media (CVSS: 5.3)
* **Ubicación:** [`web/src/contexts/AuthContext.tsx`](../web/src/contexts/AuthContext.tsx#L38)

#### Análisis Técnico
La función `mfaRequired()` depende de `process.env.NEXT_PUBLIC_MFA_REQUIRED === "true"`. En entornos productivos sin esta variable, los administradores con acceso a la gestión de alumnos, pagos y calificaciones pueden operar con un único factor de autenticación simple, aumentando la superficie de ataque ante robo de cuentas de Google.

---

### 🟢 VULN-APR-07: Endpoint Cron de Zoom sin Validación de Secret Token
* **Severidad:** Baja (CVSS: 3.7)
* **Ubicación:** [`web/src/app/api/cron/zoom-cleanup/route.ts`](../web/src/app/api/cron/zoom-cleanup/route.ts)

#### Análisis Técnico
El endpoint no valida el encabezado de autorización provisto por el programador de tareas (Cloudflare Cron Triggers), permitiendo que terceros invoquen limpiezas de reuniones a discreción.

---

## 3. Plan de Mitigación Inmediata

1. **Paso 1 (Inmediato):** Modificar `web/firestore.rules` para que `allow list` en `/usuarios/{userId}` requiera `isAdmin() || isTeacher()`. Publicar las reglas en la consola de Firebase.
2. **Paso 2:** Implementar autenticación por token en `/api/zoom` y sanitizar la respuesta del `hostKey`.
3. **Paso 3:** Eliminar `web/service-account.json` y almacenar la clave en variables seguras.
4. **Paso 4:** Pegar las cabeceras HTTP de seguridad en `web/next.config.ts`.
5. **Paso 5:** Incorporar la matriculación automática en `web/src/app/api/webpay/return/route.ts`.
