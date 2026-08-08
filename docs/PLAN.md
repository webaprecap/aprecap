# Plan de Proyecto — OTEC APRECAP · Digital Up SpA

> Proyecto: Rediseño integral de la plataforma web de **OTEC APRECAP** (`aprecap.cl`)
> Empresa desarrolladora: **Digital Up SpA** — Víctor Manuel Aguilera Muñoz (dueño)
> Última actualización: 2026-08-07

---

## Fase 0 — Acuerdo y preparación

- [x] Inicializar repositorio Git en `D:\aprecap` (rama `main`)
- [x] Crear `.gitignore` (excluye `.env`, `node_modules`, `content/`, PDFs, etc.)
- [x] Crear `.env` con credenciales Moodle (`MOODLE_USER`, `MOODLE_PASS`) + placeholders de host, Gmail y Zoom del cliente
- [x] Configurar pnpm como único gestor de paquetes (`.npmrc` + `packageManager`)
- [x] **Generar PDF del acuerdo** `acuerdo-aprecap-digitalup.pdf` (6 páginas, explicado simple + glosario) — listo para entregar
- [x] Recibido: Gmail del cliente (`CLIENT_GMAIL` + pass en `.env`) y proyecto **Firebase Aprecap** (`aprecap-8aa89`, Auth Google habilitado)
- [ ] Recibir del cliente: user/pass del host (DNS + archivos), user/pass de WordPress, user/pass de Zoom
- [ ] Firma del acuerdo PDF

## Fase 1 — Rescate de contenido (completada)

- [x] **WordPress** (`scrape-wp.mjs`): 12 páginas + 6 posts de blog + 3 cursos LearnPress → `content/pages|blog|cursos/*.md` + `content/index.md`
- [x] **Logo** (`download-logo.mjs`): PNG 1280×1280 transparente → `public/logo/` (3 versiones)
- [x] **Moodle** (`scrape-moodle.mjs`): 10 cursos → `content/moodle/*.md` + 43 PDFs (~301 MB) → `content/moodle/files/` + 25 videos (todos YouTube) registrados en los MD
- [x] ~~Extraer quizzes~~ **ELIMINADA**: los 34 quizzes/exámenes se usan directamente en Moodle (enfoque híbrido), con tema custom

## Fase 2 — Nuevo sitio web (completada)

### 🏗️ Arquitectura: enfoque HÍBRIDO
```
[ Sitio nuevo Next.js (frontend + paneles) ]      [ Campus Moodle (backend LMS) ]
  ├─ Inicio / Cursos / Blog / Contacto             ├─ Cursos, quizzes, exámenes,
  ├─ Firebase (login Google + Firestore)           │  foros, notas (todo lo actual)
  ├─ Paneles: alumno / profesor / admin            ├─ + Google SSO (pendiente host)
  └─ "Mi Campus": Entrar a mi curso ──────────────┘  + tema custom con colores APRECAP
       Zoom API → admin crea reuniones → Firestore `clases` → alumno ve alerta EN VIVO → "Unirse"
```
- **Los quizzes/exámenes/notas se mantienen en Moodle** (cero riesgo, cero migración)
- El catálogo público se alimenta del contenido rescatado (estático); el aula vive en Moodle
- Las capas Firebase/Zoom/Moodle-REST quedan codificadas y **env-gated** (se activan al llegar las credenciales)
- **Curriculum de los 3 cursos LP es informativo** ("qué vamos a enseñar", sin links al WP); el contenido real de las lecciones se rescata con el user/pass de WordPress y se recrea en Moodle

### Stack tecnológico (todo con pnpm)
| Pieza | Tecnología |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript + Tailwind v4 |
| Login | Firebase Auth con Google (alumnos, profesores y admin) |
| Base de datos | Firebase Firestore (usuarios, solicitudes, matrículas, clases, consentimientos, audit logs) |
| Roles | `alumno` · `profesor` · `admin` · `superadmin` (`contacto.digitalup@gmail.com`) |
| Imágenes | Contenido estático rescatado (Sanity opcional, desestimado por ahora) |
| Videos | YouTube (se enlazan, no ocupan espacio local) |
| Zoom | **API Server-to-Server OAuth** (app se crea con la cuenta Zoom del cliente — código listo) |
| Moodle | Backend LMS del campus (REST API para consultas del sitio) |
| Reglas Firestore | Publicadas por **CLI de Firebase (permanentes, sin expiración)** |
| Repo | GitHub `webaprecap/aprecap` |
| Despliegue | Cloudflare Pages/Workers (patrón SARMAT) — pendiente |
| Dominio | `aprecap.cl` → Cloudflare (DNS con user/pass del host) |

### 🎨 Paleta oficial (extraída del logo, aprobada por el cliente)
```css
--apre-blue: #002159      /* primario (57% del logo) */
--apre-blue-light: #29455B
--apre-red: #FF1212       /* acento (28%) */
--apre-red-dark: #CC0E0E  /* hover */
--apre-pink: #F4035E      /* acento opcional (badges profesor) */
/* neutros + WhatsApp #25D366 + fuente Inter */
```

### Páginas del sitio (todas en producción local, build OK)
- `/` Inicio (hero, misión/visión/valores, CTA — **sin** las estadísticas +200/+400/+500, eliminadas por decisión del cliente)
- `/cursos` — listado estilo SARMAT (grid de cards, badges, chips, WhatsApp)
- Página por curso: **7 cursos OTEC + 3 LearnPress** (`/cursos/[slug]`) con curriculum por módulos (badges ⏱/📝)
- **10 cursos asincrónicos** (`/cursos-asincronicos/[slug]`): video embed YouTube, PDFs, "Entrar al campus"
- `/asesorias` — Guardias y Asesorías en Seguridad Privada
- `/blog` + `/blog/[slug]` — 6 posts rescatados y limpios
- `/contacto` — formulario (→ Firestore) + datos
- `/privacidad` + `/terminos` — Ley 21.719 / 21.663
- `/campus` — "Mi Campus": explicación + acceso al Moodle (SSO cuando se configure)
- `/login`, `/solicitar-acceso`, `/panel` (router por rol), `/panel/alumno`, `/panel/profesor`, `/panel/admin`

### Paneles (estilo SARMAT, completados)
- **Alumno** (`/panel/alumno`): clases EN VIVO con **alerta modal** cuando el admin inicia clase (botón "Unirme"), mis cursos con **avance por módulo** (barra % + ✅), acceso al campus Moodle, WhatsApp, privacidad/consentimientos
- **Profesor** (`/panel/profesor`): clase activa del admin (Unirse), alumnos matriculados por curso, campus Moodle
- **Admin** (`/panel/admin`): Solicitudes de acceso (aprobar/rechazar con rol), Usuarios y Matrículas (matricular/desmatricular + marcar avance), Reuniones Zoom (API, env-gated), **Clases en Vivo** (solo el admin crea/inicia/finaliza), Contacto, Auditoría

### Cumplimiento legal (replicando lo hecho en SARMAT)
- **Ley 21.719 (Protección de Datos Personales)** — vigente 01/12/2026:
  - Consentimiento granular explícito, sin checkboxes premarcados, con registro en Firestore (timestamp, versión, IP/userAgent)
  - Derechos ARCO: ver, rectificar, cancelar, oponerse
  - Portabilidad: botón "Descargar mis datos" (JSON)
  - Supresión definitiva: borrado en cascada al eliminar cuenta
- **Ley 21.663 (Marco de Ciberseguridad)** — vigente 01/03/2025:
  - Logs de auditoría inmutables (`audit_logs`, solo escritura server-side)
  - Reglas estrictas en Firestore (`firestore.rules`) desplegadas por CLI (permanentes)
  - MFA / doble verificación para administradores (flag `NEXT_PUBLIC_MFA_REQUIRED`, off para pruebas)
  - HTTPS/HSTS obligatorio, TLS 1.3
  - Backups programados y protocolo de notificación CSIRT (3h/72h) — **pendiente**
- Páginas de **Política de Privacidad** y **Términos y Condiciones** en el sitio

## Fase 3 — Integraciones pendientes (credenciales del cliente)

| # | Pendiente | Lo que se hará al recibirlo |
|---|---|---|
| 1 | **Host user/pass** | DNS `aprecap.cl` → Cloudflare · tema custom Moodle (boost child con colores) · Google OAuth2 SSO en Moodle · revisar archivos del servidor |
| 2 | **WordPress user/pass** | Rescatar contenido de las lecciones de los 3 cursos LP → recrear en Moodle |
| 3 | **Zoom: app Server-to-Server** | El cliente la crea en marketplace.zoom.us (scopes `meeting:write:admin`, `meeting:read:admin`) y entrega Account ID / Client ID / Client Secret → `web/.env` → generación automática de reuniones en clases en vivo |
| 4 | **Horas Jefe de Seguridad** | Definir la cifra correcta (420 LP / 140 jefe-seguridad-privada / 400 catálogo OTEC) |
| 5 | **Firebase backups** | Programar exportaciones periódicas de Firestore (Ley 21.663) |

## Fase 4 — Entrega

- [x] `pnpm lint` + `pnpm build` OK (repetir antes de cada entrega)
- [ ] Pruebas en producción (flujo completo: solicitar acceso → aprobar → paneles → clase en vivo)
- [ ] Deploy en Cloudflare + configuración DNS final
- [ ] Entrega al cliente (PDF firmado)
- [ ] Firma de acuerdo de **soporte mensual** con costos (documento aparte, post-entrega)
