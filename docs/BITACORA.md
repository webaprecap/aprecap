# BITÁCORA — OTEC APRECAP · Digital Up SpA

> Registro cronológico de sesiones y avances del proyecto.
> Empresa desarrolladora: **Digital Up SpA** — Víctor Manuel Aguilera Muñoz.

---

## Sesión 1 — 2026-08-07 · Acuerdo, rescate y armazón del sitio

### Acuerdo y preparación
- Repo Git inicializado en `D:\aprecap` (rama `main`), `.gitignore`, `.env` con credenciales Moodle.
- pnpm configurado como único gestor.
- **Acuerdo Digital Up ↔ cliente** generado en PDF (`acuerdo-aprecap-digitalup.pdf`, 6 páginas con glosario). Pendiente firma.
- Recibidos del cliente: Gmail (`CLIENT_GMAIL`) y proyecto Firebase **`aprecap-8aa89`** (Auth Google habilitado).
- Cliente confirmó el **enfoque híbrido**: sitio nuevo Next.js + Moodle como campus (quizzes/exámenes quedan en Moodle, sin migración).

### Rescate de contenido (completado)
- WordPress: 12 páginas, 6 posts de blog, 3 cursos LearnPress → `content/*.md`.
- Moodle: 10 cursos → `content/moodle/*.md` + **43 PDFs (~301 MB)** en `content/moodle/files/` + 25 videos YouTube registrados.
- Logo en 3 versiones → `public/logo/`.

### Sitio nuevo (Next.js 16 + Tailwind v4 + TypeScript)
- Paleta oficial extraída del logo y aprobada: `#002159` · `#FF1212` · `#29455B` · `#F4035E`.
- `scripts/build-data.mjs`: convierte `content/*.md` → `web/src/data/*.ts`.
- Páginas: Inicio, `/cursos` (7 OTEC + 3 LP), `/cursos-asincronicos` (10 Moodle), Asesorías, Blog + detalle, Contacto, Campus, Privacidad, Términos.
- Capas env-gated: `lib/firebase.ts`, `lib/zoom.ts`, `lib/moodle.ts`. Sanity desestimado (contenido estático alcanza).
- Commits: `662bba2` (armazón + acuerdo) y `909c381` (énfasis SPD Ley 21.659, logos oficiales, sin estadísticas del home).

---

## Sesión 2 — 2026-08-07 · Firebase, autenticación y paneles alumno/admin

- API de Firebase Auth con Google en Firebase v12; **MFA SMS** reescrito a la API estable (`getMultiFactorResolver`, `PhoneMultiFactorGenerator.assertion`).
- Server-side: `/api/privacidad` (exportar JSON, borrado en cascada, `verifyUserToken` con jose), `/api/contacto`, `/api/zoom`; libs `firebase-rest.ts`, `firebase-admin.ts`, `auditLogger.ts`.
- Consentimiento granular **Ley 21.719** (ConsentModal + registro en Firestore, versionado).
- Audit logs inmutables **Ley 21.663** (solo escritura server-side).
- Paneles **alumno** (`/panel/alumno`: cursos, campus, WhatsApp) y **admin** (`/panel/admin`: solicitudes, usuarios, matrículas, reuniones Zoom, contacto, auditoría).
- AuthProvider montado en el layout; ContactoForm conectado a `/api/contacto`.
- Commit `fe7efc0` pusheado a GitHub (`webaprecap/aprecap`).

---

## Sesión 3 — 2026-08-07 · Rol profesor, superadmin, solicitud estilo SARMAT y contenido limpio

### Decisiones del cliente
- **Superadmin**: `contacto.digitalup@gmail.com` (email oficial de Digital Up SpA, confirmado en el proyecto SARMAT). Admin sigue siendo `web.aprecap@gmail.com`.
- **Rol `profesor` agregado** (los profesores tendrán su propio apartado).
- **MFA desactivado para pruebas** con flag `NEXT_PUBLIC_MFA_REQUIRED=false` (si se activa, exige enroll a admin/superadmin/profesor).
- **Curriculum informativo**: se muestra "qué vamos a enseñar" **sin links al WordPress**; el contenido real de las lecciones se rescatará con el user/pass del WP (pendiente) y se recreará en Moodle.
- Se detectó discrepancia de **horas de Jefe de Seguridad** (420 en LP, 140 en jefe-seguridad-privada, 400 en catálogo OTEC) — sin confirmar.

### Implementado
- `roles.ts`: UserRole incluye `profesor`; fallback superadmin → `contacto.digitalup@gmail.com`.
- `/solicitar-acceso` reescrito estilo SARMAT: nombres + apellido paterno/materno, teléfono, tipo (alumno/profesor), mensaje, consentimientos, **bloqueo de solicitudes pendientes duplicadas**.
- Admin aprueba creando el usuario con **nombre completo + rol según tipoSolicitud** + `solicitudId`.
- Panel **profesor** (`/panel/profesor`): reuniones Zoom, alumnos matriculados, campus; routers login/panel por rol.
- **Contenido limpio**: curriculum de los 3 cursos LP parseado a `[{seccion, titulo, tipo, minutos, preguntas}]` (sin duplicados ni URLs WP) y renderizado por módulos; eliminados `> Fuente:/Rescatado/`, ruido `/\n/ Por` del blog y la página `courses` vacía; `Markdown.tsx` ahora renderiza links.
- Commit `771dace`.

---

## Sesión 4 — 2026-08-07 · Reglas Firestore permanentes (CLI) y pulido

- **Firebase CLI** instalado (`firebase-tools` + `firebase.json` + `pnpm-workspace.yaml` con `re2: true`).
- Reglas desplegadas por CLI como **permanentes** (las de la consola web expiran a los 90 días; ahora no). Login con `web.aprecap@gmail.com`, deploy `--only firestore:rules --project aprecap-8aa89`.
- Estadísticas **+200 Cursos / +400 Asesorías / +500 Egresados** eliminadas del home (fuente `content/pages/inicio.md`).
- **Botón Ingresar / Mi Panel** agregado al header (desktop y móvil, según sesión).
- Commit `e3f7255` + `dd7b0c8`.

---

## Sesión 5 — 2026-08-07 · Clases en vivo (estilo SARMAT) y avance de cursos

### Enlace WhatsApp promo Facebook — proyecto SARMAT (externo)
- Entregado al cliente el enlace para el CTA del anuncio: `https://wa.me/56951621840?text=Hola%2C%20vengo%20por%20la%20publicaci%C3%B3n%20de%20Facebook%20de%20SARMAT%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20cursos.`

### APRECAP — flujo de clases en vivo (solo el admin controla)
- Nueva colección Firestore `clases` (`estado: inactiva|activa|finalizada`, `cursoSlug` opcional, `joinUrl` opcional). Reglas: lectura de activas para alumnos/profesores, **escritura solo admin**. Reglas redeployadas por CLI.
- **Admin**: pestaña "Clases en Vivo" — crea, inicia (🔴 EN VIVO), finaliza, reinicia y elimina.
- **Alumno**: alerta modal **"¡Tu clase está en línea!"** con botón "Unirme" (estilo SARMAT) + tarjetas EN VIVO filtradas por matrícula (clase global = todos).
- **Profesor**: ve la clase activa con botón "Unirse".
- **Avance de cursos**: el admin marca módulos completados por matrícula (`modulosCompletados` en `enrollments`); el alumno ve barra de avance % + detalle ✅ por módulo.
- Verificación: rutas de los 3 paneles responden 200 en dev, lint 0 errores, build OK.
- Commit `9c5d08c`.

---

## Pendientes para la próxima sesión (2026-08-08 →)

1. **Zoom (cliente)**: crear app Server-to-Server en marketplace.zoom.us (scopes `meeting:write:admin`, `meeting:read:admin`) y entregar Account ID / Client ID / Client Secret → `web/.env`. El código ya está listo.
2. **WordPress user/pass (cliente)**: rescatar el contenido real de las lecciones de los 3 cursos LP → recrear en Moodle.
3. **Confirmar horas de Jefe de Seguridad** (420 / 140 / 400).
4. **Firma del acuerdo PDF** (entregado).
5. Backups de Firestore (Ley 21.663), despliegue Cloudflare, pruebas en producción.
