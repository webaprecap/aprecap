# Plan de Proyecto — OTEC APRECAP · Digital Up SpA

> Proyecto: Rediseño integral de la plataforma web de **OTEC APRECAP** (`aprecap.cl`)
> Empresa desarrolladora: **Digital Up SpA** — Víctor Manuel Aguilera Muñoz (dueño)

---

## Fase 0 — Acuerdo y preparación

- [x] Inicializar repositorio Git en `D:\aprecap` (rama `main`)
- [x] Crear `.gitignore` (excluye `.env`, `node_modules`, `content/`, PDFs, etc.)
- [x] Crear `.env` con credenciales Moodle (`MOODLE_USER`, `MOODLE_PASS`) + placeholders de host y Gmail del cliente
- [x] Configurar pnpm como único gestor de paquetes (`.npmrc` + `packageManager`)
- [x] **Generar PDF del acuerdo** `acuerdo-aprecap-digitalup.pdf` (6 páginas, explicado simple + glosario) — listo para entregar
- [x] Recibido: Gmail del cliente (`CLIENT_GMAIL` + pass en `.env`) y proyecto **Firebase Aprecap** (`aprecap-8aa89`, Auth Google habilitado)
- [ ] Recibir del cliente: user/pass del host (DNS + archivos), user/pass de Zoom

## Fase 1 — Rescate de contenido (completada)

- [x] **WordPress** (`scrape-wp.mjs`): 12 páginas + 6 posts de blog + 3 cursos LearnPress → `content/pages|blog|cursos/*.md` + `content/index.md`
- [x] **Logo** (`download-logo.mjs`): PNG 1280×1280 transparente → `public/logo/` (3 versiones)
- [x] **Moodle** (`scrape-moodle.mjs`): 10 cursos → `content/moodle/*.md` + 43 PDFs (~301 MB) → `content/moodle/files/` + 25 videos (todos YouTube) registrados en los MD
- [x] ~~Extraer quizzes~~ **ELIMINADA**: los 34 quizzes/exámenes se usan directamente en Moodle (enfoque híbrido), con tema custom

## Fase 2 — Nuevo sitio web (en curso)

### 🏗️ Arquitectura: enfoque HÍBRIDO
```
[ Sitio nuevo Next.js (frontend bonito) ]      [ Campus Moodle (backend LMS) ]
  ├─ Inicio / Cursos / Blog / Contacto           ├─ Cursos, quizzes, exámenes,
  ├─ Firebase (login Google)                     │  foros, notas (todo lo actual)
  ├─ Sanity (imágenes)                           ├─ + Google SSO (pendiente host)
  └─ "Mi Campus": Entrar a mi curso ────────────┘  + tema custom con colores APRECAP
       Zoom API → panel admin crea reuniones → Firebase → alumno ve "Unirse"
```
- **Los quizzes/exámenes/notas se mantienen en Moodle** (cero riesgo, cero migración)
- El catálogo público se alimenta del contenido rescatado (estático); el aula vive en Moodle
- Las capas Firebase/Sanity/Zoom/Moodle-REST quedan codificadas y **env-gated** (se activan al llegar las credenciales)

### Stack tecnológico (todo con pnpm)
| Pieza | Tecnología |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript + Tailwind v4 |
| Login | Firebase Auth con Google (alumnos + admin) |
| Base de datos | Firebase Firestore (matrículas, reuniones, consentimientos, audit logs) |
| Imágenes | Sanity CMS |
| Videos | YouTube (se enlazan, no ocupan espacio local) |
| Zoom | **API Server-to-Server OAuth** (app se crea con el user/pass de Zoom del cliente) |
| Moodle | Backend LMS del campus (REST API para consultas del sitio) |
| Repo | GitHub |
| Despliegue | Cloudflare Pages/Workers (patrón SARMAT) |
| Dominio | `aprecap.cl` → Cloudflare (DNS con user/pass del host) |

### 🎨 Paleta oficial (extraída del logo, aprobada por el cliente)
```css
--apre-blue: #002159      /* primario (57% del logo) */
--apre-blue-light: #29455B
--apre-red: #FF1212       /* acento (28%) */
--apre-red-dark: #CC0E0E  /* hover */
--apre-pink: #F4035E      /* acento opcional */
/* neutros + WhatsApp #25D366 + fuente Inter */
```

### Páginas del sitio
- `/` Inicio (hero, misión/visión/valores, estadísticas, CTA)
- `/cursos` — listado estilo SARMAT (grid de cards, badges, chips, WhatsApp)
- Página por curso: **7 cursos OTEC + 3 LearnPress** (`/cursos/[slug]`)
- **10 cursos asincrónicos** (`/cursos-asincronicos/[slug]`): video embed YouTube, PDFs, "Entrar al campus"
- `/asesorias` — Guardias y Asesorías en Seguridad Privada
- `/blog` + `/blog/[slug]` — 6 posts rescatados
- `/contacto` — formulario + datos (dirección, teléfonos, WhatsApp, email)
- `/privacidad` + `/terminos` — Ley 21.719 / 21.663
- `/campus` — "Mi Campus": explicación + acceso al Moodle (SSO cuando se configure)
- `/login`, `/panel`, `/mi-curso` — cuando lleguen credenciales (codificadas, env-gated)

### Cumplimiento legal (replicando lo hecho en SARMAT)
- **Ley 21.719 (Protección de Datos Personales)** — vigente 01/12/2026:
  - Consentimiento granular explícito, sin checkboxes premarcados, con registro en Firestore (timestamp, versión, IP/userAgent)
  - Derechos ARCO: ver, rectificar, cancelar, oponerse
  - Portabilidad: botón "Descargar mis datos" (JSON)
  - Supresión definitiva: borrado en cascada al eliminar cuenta
- **Ley 21.663 (Marco de Ciberseguridad)** — vigente 01/03/2025:
  - Logs de auditoría inmutables (`audit_logs`, solo escritura server-side)
  - Reglas estrictas en Firestore (`firestore.rules`)
  - MFA / doble verificación para administradores
  - HTTPS/HSTS obligatorio, TLS 1.3
  - Backups programados y protocolo de notificación CSIRT (3h/72h)
- Páginas de **Política de Privacidad** y **Términos y Condiciones** en el sitio

## Fase 3 — Integraciones pendientes (credenciales del cliente)

| # | Pendiente | Lo que se hará al recibirlo |
|---|---|---|
| 1 | **Host user/pass** | DNS `aprecap.cl` → Cloudflare · tema custom Moodle (boost child con colores) · Google OAuth2 SSO en Moodle |
| 2 | **Zoom user/pass** | Crear app Server-to-Server en marketplace.zoom.us → claves en `.env` → módulo reuniones en panel admin + botón "Unirse" en aula |
| 3 | **Firebase: reglas definitivas** | Reemplazar reglas temporales (expiran 06/09/2026) por `firestore.rules` estrictas (roles, aislamiento, audit_logs) |

## Fase 4 — Entrega

- [ ] `pnpm lint` + `pnpm build` + pruebas locales
- [ ] Deploy en Cloudflare + configuración DNS final
- [ ] Entrega al cliente (PDF firmado)
- [ ] Firma de acuerdo de **soporte mensual** con costos (documento aparte, post-entrega)
