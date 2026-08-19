# TAREAS — OTEC APRECAP · Digital Up SpA

> Checklist para ir marcando avance. Usa `- [x]` cuando la tarea esté terminada.
> Última actualización: 2026-08-08 · Enfoque: **HÍBRIDO (Moodle backend)** · Pack: textos + WebPay + Zoom (en curso)
> ⏭️ **Próxima sesión**: verificación manual del pack (abajo) — reiniciar dev server antes, para cargar las claves Zoom.

## 🔜 Próxima sesión — verificación manual del pack (web en `localhost:3000`)

- [ ] **Reiniciar el dev server** (`pnpm --dir web dev`) para cargar `ZOOM_*` y `WEBPAY_*` recién escritos en `web/.env`
- [ ] **Pago WebPay completo en navegador**: `/pago/{curso}` → monto libre (≥ $1.000) → consent → Pagar → en WebPay usar tarjeta de prueba VISA `4051 8856 0001 5322`, CVV `123`, RUT `11.111.111-1`, fecha futura → volver y ver `/pago/resultado` aprobado → ver el pago en panel admin > tab Pagos y exportar CSV
- [ ] **Tab "Pagos 💳"** en `/panel/admin` con usuario admin: listado, filtros, subtotales, CSV con BOM UTF-8
- [ ] **Zoom**: crear una reunión desde el panel admin (ya no falla env-gated: `ZOOM_ACCOUNT_ID/CLIENT_ID/CLIENT_SECRET` están en `web/.env` y la app fue verificada por API) y que aparezca en alumno/profesor
- [ ] **WebPay producción**: pedir al cliente commerce code + API key reales de Transbank → `web/.env` (`WEBPAY_MODE=production`)

## ✔️ Hecho el 2026-08-08 — Pack: textos cliente + WebPay + Zoom activada

- [x] **Fix ruta alumno** ("Redirigiendo…"): `/panel`, `/login`, `/solicitar-acceso` → `/panel/alumno`
- [x] **Textos del cliente aplicados**: hero "Autoridad Fiscalizadora: OS-10 de Carabineros"; tarjeta ICONTEC (NCh 2728:2015); quitado servicio "Guardias para eventos y empresas"; caption Logo "Capacitaciones y Asesorías"; **precios eliminados** del catálogo (types/cursos/[slug]); cursos OTEC renombrados: **Nochero, Portero y Rondín (32h)** y nuevo **Bastón y Esposas (8h)**
- [x] **WebPay (Transbank) implementado**: `transbank-sdk@6.1.1`; `lib/webpay.ts` + `lib/admin-firebase.ts` (SDK Admin, `web/service-account.json`, gitignored); POST `/api/webpay` (crea tx, guarda pago + consentimiento Ley 21.719); `/api/webpay/return` (commit y redirect a resultado); páginas `/pago/[slug]` (monto libre, todos los cursos) y `/pago/resultado`; botón "Pagar por WebPay" en cursos OTEC y LP
- [x] **Panel admin tab Pagos**: listado en vivo, filtros curso/estado, subtotales, **export CSV** (`pagos-aprecap-<fecha>.csv`)
- [x] **Firestore rules**: colección `pagos` (lectura admin, escritura server-side) — **desplegadas** por CLI
- [x] **Zoom**: app Server-to-Server OAuth **creada y activada por el cliente y verificada por API** (token 200, scopes `meeting:read:list_meetings:admin` + `meeting:write:meeting:admin`); 3 claves ya en `web/.env`
- [x] Calidad: `tsc --noEmit` + `eslint` + `next build` (49 rutas) **OK**; smoke test `POST /api/webpay` (transacción creada en sandbox + docs `pagos`/`consents` en Firestore) y return con token inválido → redirect correcto

## 🔜 Pendientes generales (sesiones anteriores, aún vivos)

- [ ] **WordPress user/pass** (cliente): rescatar lecciones reales de los 3 cursos LearnPress → recrear en Moodle
- [x] ~~**Confirmar horas Jefe de Seguridad**~~ → ✅ **CANCELADA 2026-08-19**: el curso de Jefe de Seguridad dejó de ofrecerse; se eliminó de la plataforma (secciones, catálogo y certificado). PDFs y MDs se conservan para uso futuro
- [ ] **PDF del acuerdo firmado** (entregado, falta firma)
- [ ] Decidir si se usa **Sanity** o se deja el contenido estático
- [ ] Verificación manual del pack (sección "Próxima sesión" arriba)

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

### Zoom (hecho: app creada, activada y verificada por API)
- [x] Crear app Server-to-Server OAuth en marketplace.zoom.us con la cuenta Zoom del cliente
- [x] Claves en `web/.env` (ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET) y verificar token (`users/me/meetings` → 200)
- [x] Código listo: `lib/zoom.ts`, `/api/zoom`, pestaña "Reuniones Zoom" en admin, botón Unirse en alumno (por ahora con link manual en clases en vivo)
- [ ] Probar creación de reunión desde el panel admin (dev server reiniciado)

### WebPay (implementado; verificación manual pendiente)
- [x] Código completo (ver sección "Hecho el 2026-08-08" arriba)
- [ ] Prueba real en navegador con tarjeta de prueba + revisar tab Pagos/CSV
- [ ] Credenciales de **producción** de Transbank del cliente (commerce code + API key) → `web/.env`

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


## Sesiones 2026-08-12 → 2026-08-15 — Curso OS-10 + Cuestionarios + Curso CCTV (completado)

- [x] Módulos OS-10 10–14 con videos del cliente + bancos de preguntas (OCR de PDFs)
- [x] 14 PDFs OS-10 subidos a Sanity y servidos vía proxy `/api/pdf` (CORS)
- [x] Cuestionarios oficiales del cliente digitalizados (8 pruebas, 539 preguntas, corrección inmediata por pregunta, alternativas de 4 opciones)
- [x] Examen final eliminado (cliente) — `/evaluaciones` redirige a `/cuestionarios`
- [x] Diploma digital `/panel/alumno/certificado` (nombre editable, RUT/fecha/curso automáticos)
- [x] Módulo 15 OS-10 de lectura (Res. Ex. N° 2183)
- [x] MDs CCTV: 22 submódulos + 3 consolidados (OCR Cap. IV/VI + PPTs + manual + investigación)
- [x] 22 PDFs CCTV a Sanity; 44 archivos locales renombrados `Modulo_X.Y_...`
- [x] Curso CCTV montado con 22 submódulos video+PDF (verificado headless)
- [x] Push a GitHub (`5d74e8f`)

## Pendientes nuevos (2026-08-15)

- [ ] Verificar certificado digital con datos reales de un alumno
- [ ] Replicar editor de certificados estilo Sarmat en `/panel/admin` (ruta ref.: Sarmat `/admin` → "Generar Certificados")
- [ ] Curso de Bastón y Esposas (material reservado: `Curso bastón y esposas presentación.pptx`)
- [ ] Quizzes/cuestionarios del curso CCTV (si el cliente los pide; hoy es video → PDF → completado)
- [ ] ELIMINAR modo demo antes de producción (`Header.tsx` TEMP-TEST, `useModoDemo`, badges demo)
- [ ] CORS Sanity (localhost + Cloudflare en sanity.io/manage)
- [ ] Persistencia en Firestore de progreso y puntajes (hoy localStorage)
- [ ] Pase a producción: candados de módulos + permisos Firestore (accesoCCTV/Supervisor)
