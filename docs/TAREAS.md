# TAREAS — OTEC APRECAP · Digital Up SpA

> Checklist para ir marcando avance. Usa `- [x]` cuando la tarea esté terminada.
> Última actualización: 2026-08-07 · Enfoque: **HÍBRIDO (Moodle backend)**
> ⏭️ **Próxima sesión (mañana)**: credenciales Zoom del cliente → claves en `.env` · user/pass WordPress para rescatar lecciones · confirmar horas Jefe de Seguridad · ver detalles abajo.

## 🔜 Próxima sesión — pendientes del cliente

- [ ] **Zoom**: el cliente crea la app **Server-to-Server OAuth** en https://marketplace.zoom.us/develop/create (scopes `meeting:write:admin` + `meeting:read:admin`) y trae los 3 valores (Account ID, Client ID, Client Secret) → pegarlos en `web/.env` (`ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`). El código ya está listo (`lib/zoom.ts` + `/api/zoom` + pestaña "Reuniones Zoom" y generación automática en clases).
- [ ] **WordPress user/pass**: entregar credenciales para rescatar el contenido real de las lecciones de los 3 cursos LearnPress → recrear en Moodle.
- [ ] **Confirmar horas Jefe de Seguridad**: el sitio tiene 3 cifras distintas (420 LP, 140 jefe-seguridad-privada, 400 catálogo OTEC) — definir cuál es la correcta.
- [ ] **PDF del acuerdo firmado** (entregado, falta firma).
- [ ] Decidir si se usa **Sanity** (imágenes) o se deja el contenido estático actual.

## Fase 0 — Acuerdo y preparación (completada)

- [x] Inicializar repo Git en `D:\aprecap`
- [x] Crear `.gitignore`
- [x] Crear `.env` con credenciales (Moodle listo; host, Gmail y Zoom pendientes)
- [x] Configurar pnpm como único gestor (`.npmrc`)
- [x] Instalar dependencias de scripts (`@react-pdf/renderer`, `cheerio`, `dotenv`, `react`)
- [x] Crear `docs/PLAN.md`
- [x] Crear `docs/TAREAS.md`
- [x] Crear `docs/BITACORA.md` (bitácora de sesiones, 2026-08-07)
- [x] Generar PDF del acuerdo con logo Digital Up (`acuerdo-aprecap-digitalup.pdf`, 6 págs)
- [x] Recibido: Gmail del cliente + proyecto Firebase `aprecap-8aa89`
- [ ] Entregar PDF al cliente y obtener su firma

## Fase 1 — Rescate de contenido (completada)

- [x] Scrape WordPress (12 páginas → `content/pages/*.md`)
- [x] Scrape blog (6 posts → `content/blog/*.md`)
- [x] Scrape cursos LearnPress (3 cursos → `content/cursos/*.md`)
- [x] `content/index.md` generado
- [x] Logo descargado (3 versiones → `public/logo/`)
- [x] Scrape Moodle (10 cursos → `content/moodle/*.md`)
- [x] PDFs de cursos descargados (43 archivos, ~301 MB → `content/moodle/files/`)
- [x] Videos externos registrados (25 enlaces YouTube en los MD)
- [x] ~~Extraer quizzes~~ **ELIMINADA** — se usan directamente en Moodle (enfoque híbrido)

## Fase 2 — Armazón del sitio nuevo (completada)

- [x] Paleta oficial definida (extraída del logo, aprobada): `#002159` · `#FF1212` · `#29455B` · `#F4035E`
- [x] Crear proyecto Next.js (pnpm) + Tailwind v4
- [x] Configurar tokens de color en `globals.css`
- [x] Componentes base: Header (con botón Ingresar/Mi Panel), Footer, botones, WhatsApp float
- [x] Script `build-data.mjs` (content/*.md → src/data/*.ts) con limpieza de ruido del scrape
- [x] Página Inicio (estadísticas +200/+400/+500 **eliminadas** por decisión del cliente)
- [x] Página `/cursos` (listado estilo SARMAT)
- [x] Páginas `/cursos/[slug]` (7 OTEC + 3 LearnPress) con **curriculum limpio por módulos**
- [x] Páginas `/cursos-asincronicos/[slug]` (10 Moodle)
- [x] Página Asesorías
- [x] Página Blog + detalle (limpieza `/\n/ Por` y `> Fuente/> Rescatado`)
- [x] Página Contacto (formulario → `/api/contacto`)
- [x] Página Campus (Mi Campus)
- [x] Política de Privacidad + Términos
- [x] Capas env-gated: `lib/firebase.ts`, `lib/zoom.ts`, `lib/moodle.ts` (Sanity desestimado por ahora)
- [x] `.env.example` con variables documentadas (`NEXT_PUBLIC_SUPERADMIN_EMAIL`, `NEXT_PUBLIC_MFA_REQUIRED`)
- [x] `pnpm lint` + `pnpm build` OK

## Fase 3 — Firebase, paneles y roles (completada)

- [x] Proyecto Firebase `aprecap-8aa89` + Auth Google habilitado
- [x] **`firestore.rules` definitivas desplegadas por CLI** (2026-08-07, permanentes — ya no expiran como las de consola). Incluye: `isTeacher()`, superadmin `contacto.digitalup@gmail.com`, self-create rol profesor, profesor lee enrollments/meetings, colección `clases` (escritura solo admin)
- [x] Setup CLI: `firebase-tools` (devDep) + `firebase.json` + login con `web.aprecap@gmail.com` + deploy `--project aprecap-8aa89`
- [x] Auth Google + roles: `alumno`, `profesor`, `admin`, `superadmin` (`lib/roles.ts`)
- [x] **MFA administradores** con flag `NEXT_PUBLIC_MFA_REQUIRED` (off por defecto para pruebas; al activarlo exige enroll a admin/superadmin/profesor)
- [x] API server-side: `/api/privacidad` (exportar JSON, borrado en cascada, `verifyUserToken`), `/api/contacto`, `/api/zoom` (env-gated)
- [x] Libs: `firebase-rest.ts` (jose, Service Account), `firebase-admin.ts`, `auditLogger.ts`
- [x] **Solicitud de acceso** estilo SARMAT: nombres + apellido paterno/materno, teléfono, tipo (alumno/profesor), mensaje, consentimientos Ley 21.719, bloqueo de duplicados pendientes
- [x] **Panel admin** (`/panel/admin`): Solicitudes (aprobar con rol), Usuarios y Matrículas (+ marcar avance por módulo), Reuniones Zoom, **Clases en Vivo** (crear/iniciar/finalizar/eliminar, solo admin), Contacto, Auditoría
- [x] **Panel alumno** (`/panel/alumno`): Mis cursos con **barra de avance** + detalle ✅, **Clases EN VIVO** (alerta modal "¡Tu clase está en línea!" estilo SARMAT + tarjetas con botón Unirse), campus Moodle, WhatsApp
- [x] **Panel profesor** (`/panel/profesor`): clase activa (Unirse), alumnos matriculados por curso, campus Moodle
- [x] Routers `/panel` y `/login` por rol; botón **Ingresar / Mi Panel** en el header (desktop y móvil)
- [x] Consentimiento granular + registro en Firestore (Ley 21.719)
- [x] Panel "Mis datos" (ARCO + exportar JSON) (Ley 21.719)
- [x] Borrado en cascada al eliminar cuenta (Ley 21.719)
- [x] Audit logs inmutables (solo escritura server-side) (Ley 21.663)

## Fase 4 — Integraciones pendientes (credenciales del cliente)

### Host (user/pass pendientes)
- [ ] DNS `aprecap.cl` → Cloudflare
- [ ] Tema custom Moodle (boost child con colores APRECAP)
- [ ] Google OAuth2 SSO en Moodle (mismo Gmail que el sitio)
- [ ] Habilitar web services Moodle + token (consulta REST desde el sitio)
- [ ] Revisar archivos del servidor por si hay material adicional
- [ ] Rescatar contenido de lecciones LearnPress (user/pass WP) → recrear en Moodle

### Zoom (pendiente: el cliente crea la app)
- [ ] Crear app Server-to-Server OAuth en marketplace.zoom.us con la cuenta Zoom del cliente
- [ ] Claves en `web/.env` (ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET)
- [x] Código listo: `lib/zoom.ts`, `/api/zoom`, pestaña "Reuniones Zoom" en admin, botón Unirse en alumno (por ahora con link manual en clases en vivo)

### Otros
- [ ] Backups programados de Firestore (Ley 21.663)
- [ ] Protocolo de notificación CSIRT documentado (3h/72h)
- [ ] Subir logos a Sanity / YouTube (si se decide usarlos)
- [ ] Repo GitHub ya creado (webaprecap/aprecap) — despliegue Cloudflare Pages/Workers pendiente de decisión

## Fase 5 — Entrega

- [ ] Pruebas en producción
- [ ] Entrega al cliente (PDF firmado)
- [ ] Acuerdo de soporte mensual (documento aparte)

## Extras de esta sesión

- [x] Enlace WhatsApp para la promo de Facebook de **SARMAT** (fuera del repo): `https://wa.me/56951621840?text=Hola%2C%20vengo%20por%20la%20publicaci%C3%B3n%20de%20Facebook%20de%20SARMAT%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20cursos.`
- [x] Estadísticas +200 Cursos / +400 Asesorías / +500 Egresados eliminadas del home (fuente `content/pages/inicio.md`)
