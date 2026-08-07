# TAREAS — OTEC APRECAP · Digital Up SpA

> Checklist para ir marcando avance. Usa `- [x]` cuando la tarea esté terminada.
> Última actualización: 2026-08-07 · Enfoque: **HÍBRIDO (Moodle backend)**

## Fase 0 — Acuerdo y preparación

- [x] Inicializar repo Git en `D:\aprecap`
- [x] Crear `.gitignore`
- [x] Crear `.env` con credenciales (Moodle listo; host, Gmail y Zoom pendientes)
- [x] Configurar pnpm como único gestor (`.npmrc`)
- [x] Instalar dependencias de scripts (`@react-pdf/renderer`, `cheerio`, `dotenv`, `react`)
- [x] Crear `docs/PLAN.md`
- [x] Crear `docs/TAREAS.md`
- [x] Generar PDF del acuerdo con logo Digital Up (`acuerdo-aprecap-digitalup.pdf`, 6 págs)
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

## Fase 2 — Armazón del sitio nuevo (en curso)

- [x] Paleta oficial definida (extraída del logo, aprobada): `#002159` · `#FF1212` · `#29455B` · `#F4035E`
- [ ] Crear proyecto Next.js (pnpm) + Tailwind v4
- [ ] Configurar tokens de color en `globals.css`
- [ ] Componentes base: Header, Footer, botones, WhatsApp float
- [ ] Script `build-data.mjs` (content/*.md → src/data/*.ts)
- [ ] Página Inicio
- [ ] Página `/cursos` (listado estilo SARMAT)
- [ ] Páginas `/cursos/[slug]` (7 OTEC + 3 LearnPress)
- [ ] Páginas `/cursos-asincronicos/[slug]` (10 Moodle)
- [ ] Página Asesorías
- [ ] Página Blog + detalle
- [ ] Página Contacto
- [ ] Página Campus (Mi Campus)
- [ ] Política de Privacidad + Términos
- [ ] Capas env-gated: `lib/firebase.ts`, `lib/sanity.ts`, `lib/zoom.ts`, `lib/moodle.ts`
- [ ] `.env.example` con variables documentadas
- [ ] `pnpm lint` + `pnpm build` OK

## Fase 3 — Integraciones (algunas esperando credenciales del cliente)

### 1. Firebase (recibido: Gmail + proyecto aprecap-8aa89)
- [x] Proyecto creado + Auth Google habilitado
- [ ] `firestore.rules` definitivas (reemplazar temporales, expiran 06/09/2026)
- [ ] Crear proyecto Sanity + esquemas (curso, imagen)
- [ ] Subir logo e imágenes a Sanity
- [x] Repo GitHub creado (webaprecap/aprecap)
- [ ] Crear proyecto Cloudflare Pages/Workers
- [ ] Canal YouTube (subir videos → enlazar en Sanity)

### 2. Host (user/pass pendientes)
- [ ] DNS `aprecap.cl` → Cloudflare
- [ ] Tema custom Moodle (boost child con colores APRECAP)
- [ ] Google OAuth2 SSO en Moodle (mismo Gmail que el sitio)
- [ ] Habilitar web services Moodle + token (consulta REST desde el sitio)
- [ ] Revisar archivos del servidor por si hay material adicional

### 3. Zoom (cuenta recibida en `.env`)
- [ ] Crear app Server-to-Server OAuth en marketplace.zoom.us con la cuenta Zoom del cliente
- [ ] Claves en `.env` (ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET)
- [ ] Módulo reuniones en panel admin (crear/listar)
- [ ] Botón "Unirse" en aula del alumno

## Fase 4 — Leyes y seguridad (con Firebase activo)

- [ ] Consentimiento granular + registro en Firestore (Ley 21.719)
- [ ] Panel "Mis datos" (ARCO + exportar JSON) (Ley 21.719)
- [ ] Borrado en cascada al eliminar cuenta (Ley 21.719)
- [ ] Audit logs inmutables (Ley 21.663)
- [ ] MFA administradores (Ley 21.663)
- [ ] Backups programados (Ley 21.663)

## Fase 5 — Entrega

- [ ] Pruebas en producción
- [ ] Entrega al cliente (PDF firmado)
- [ ] Acuerdo de soporte mensual (documento aparte)
