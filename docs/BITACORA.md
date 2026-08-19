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

---

## Sesión 2026-08-12 · OS-10 módulos 10–14 + PDFs en Sanity
- 5 módulos nuevos (10–14) con videos del cliente y PDFs de `docs/pdf os10`; OCR de los 5 PDFs → `pdfs_ocr/`.
- **14 PDFs subidos a Sanity** (`mwwotgjc/production`) con `scripts/upload-pdfs-sanity.mjs`; `materiales-estudio.ts` apunta a `cdn.sanity.io`.
- Proxy `/api/pdf` (solo cdn.sanity.io) para evitar CORS en el visor; bancos `os10-modulo10..14.ts` (10 alt + 20 V/F c/u).
- Verificación con Chrome headless: módulos, video, PDF vía proxy, MiniQuiz demo, examen 140.

## Sesión 2026-08-13/14 · Cuestionarios oficiales + diploma + Res. 2183
- **Cuestionarios del cliente digitalizados** (8, 539 preguntas): extracción Word COM/pypdf → `scripts/cuestionarios-extraidos/` → `web/src/data/cuestionarios*.ts` → página `/cuestionarios/guardia-de-seguridad`.
- **Examen final ELIMINADO** (el cliente no lo quiere): `/evaluaciones/[slug]` redirige a cuestionarios; MiniQuiz por módulo se mantiene.
- **Corrección inmediata**: 82 abiertas → alternativas de 4 opciones (3 distractores creados) + feedback por pregunta (verde/rojo + correcta + porqué); V/F con botones; resultado final con % y reintento; "Mostrar respuestas" solo dev.
- **Diploma digital** `/panel/alumno/certificado` (nombre editable, RUT/fecha/curso automáticos, imprimir/PDF). Ruta Sarmat verificada: `/admin` → tab "Generar Certificados" (queda pendiente replicar editor admin).
- **Módulo 15 OS-10 de lectura**: Res. Ex. N° 2183 (8 diapositivas con puntos clave).

## Sesión 2026-08-14/15 · Curso CCTV completo (MDs → PDFs → videos → montaje)
- MDs CCTV robustecidos: OCR `Capitulo IV CCTV.pdf` (114 págs) + `Capitulo VI` (28 págs) → `pdfs_ocr/`; texto de 4 PPTs → `scripts/cctv-extraidos/`; **22 MDs de submódulos + 3 consolidados** (solo info, sin prácticas).
- Cliente generó PDFs (NotebookLM) y subió videos: carpeta `Downloads\cctv aprecap` → **44 archivos renombrados** a `Modulo_X.Y_...` (22 PDFs + 22 MP4).
- **22 PDFs a Sanity** (`scripts/upload-cctv-pdfs-sanity.mjs` → `scripts/sanity-cctv-pdf-urls.json`, todos 200).
- **Curso montado**: `operador-cctv-y-alarmas` con 3 módulos × 22 submódulos (video YouTube + PDF Sanity); `SubModuloData.videoUrl`; flujo video → PDF → completado; reset a video al cambiar submódulo. Verificado con Chrome headless (1.1, 1.7, 3.8 + PDF proxy).
- **Push a GitHub**: commit `5d74e8f` (79 archivos) a `main`.

---

## Sesión 2026-08-18 · Actualización legal, MDs Supervisor y Redcompra
- **Auditoría legal al día**: DL 3.607 derogado (Ley 21.659) corregido en MDs CCTV y banco os10-modulo2; Ley 19.628/21.719 precisada (vigencia dic-2026) en MD 1.6 y banco os10-modulo14; notas "en lo compatible" en MDs 1.3/1.4/1.5.
- **Cuestionario web**: pregunta 21 de la prueba de 150 → Ley N° 21.659 (cliente aprobó actualizar la respuesta oficial).
- **Escritorio**: `C:\Users\Vickoto\Desktop\MDs_CCTV_Actualizados\` con 7 MDs `cctv_...` corregidos para regenerar PDFs en NotebookLM (reemplazo en producción pendiente).
- **Curso Supervisor**: 14 MDs de submódulos + 6 consolidados con ley vigente (Ley 21.561 jornada 42h/2026, Ley Karin 21.643, 16.744, DS 594, 21.659/D.S. 208 eventos masivos). Listos para NotebookLM.
- **Redcompra/WebPay ocultado**: 3 botones eliminados de `cursos/[slug]`; rutas y tab admin intactas.
- **Pruebas**: tsc + eslint + Chrome headless (OS-10, cuestionarios, CCTV, cursos sin WebPay, certificado) → todo OK.
- **Pendiente mañana**: prueba manual de Zoom (crear reunión admin → visible alumno/profesor).

## Sesión 2026-08-18 (2) · Módulo 1 CCTV reformado en producción
- **Cliente regeneró Módulo 1** con los MDs corregidos: 6 PDFs nuevos (NotebookLM) + 6 videos nuevos en YouTube, en `Downloads\cctv aprecap\modulo 1 reformado`.
- **6 PDFs nuevos subidos a Sanity** (IDs `7c8925…`, `bc2e5e…`, `2a5233…`, `5c4b9f…`, `cdb6aa…`, `772ff2…`); `scripts/sanity-cctv-pdf-urls.json` actualizado (mismas keys, URLs/sha nuevos).
- **6 assets viejos de M1 (1.1–1.6) quedaron huérfanos** (DELETE por API da 401): lista de IDs para borrado manual en `scripts/sanity-old-m1-assets-to-delete.txt` (sanity.io/manage → Assets).
- **`materiales-estudio.ts`**: submódulos 1.1–1.6 con videos nuevos (`OCoA-tyikk8`, `xbG8RJOXYvI`, `4P8PaxuBYiU`, `IIcy36PrH7E`, `KeXxMe68R2Y`, `ubn3jJV-d20`) y PDFs nuevos; nombre 1.1 → "Definición de Operador de CCTV y Nueva Ley (Ley N° 21.659)". 1.7 y Módulos 2–3 intactos.
- **Verificación**: tsc OK; bundle del curso con 7 videos y 7 PDFs nuevos, sin rastro de los viejos; PDFs 1.1–1.7 vía `/api/pdf` → 200; headless OK (submódulo 1.1 renderiza video+PDF nuevos).
- **Pendiente**: borrado manual de los 6 assets viejos (opcional), commit+push de la jornada, prueba manual de Zoom.

## Sesión 2026-08-18 (3) · Quizzes y Examen Final del curso CCTV
- **Banco de preguntas CCTV**: `web/src/lib/questionBanks/cctv.ts` con **63 preguntas** (M1 legal: 21, M2 sistemas: 22, M3 televigilancia: 20; 4 opciones c/u) extraídas de los 3 MDs consolidados. Helper `selectBalancedQuestions(60)` → 20 preguntas por módulo, preguntas y opciones randomizadas (Fisher-Yates); `getPreguntasPorModulo` + `getMiniQuizBancoCctv` (convierte al formato `PreguntaAlternativa` del MiniQuiz).
- **MiniQuiz por módulo (5 preguntas)**: curso `operador-cctv-y-alarmas` marcado con `banco: "cctv"` (tipo `"os10" | "cctv"`); `materiales/[slug]/page.tsx` usa el banco CCTV por módulo; los 3 módulos quedan evaluables.
- **Examen Final CCTV** (`CCTVFinalExam.tsx` + ruta `/evaluaciones/operador-cctv-y-alarmas`): 60 preguntas una a la vez con opciones A–D, dots de navegación, contador de respondidas, "ENTREGAR EXAMEN" (aviso si faltan respuestas), **umbral 80%, reintentos ilimitados**, feedback por módulo fallado, confetti al aprobar y resultado guardado en `localStorage` (`aprecap_examen_..._pct/_aprobado`). El resto de slugs sigue redirigiendo a `/cuestionarios/`.
- **Acceso al examen**: sidebar del curso con botón "📝 Examen Final CCTV" y tarjeta de finalización con "📝 Rendir Examen Final CCTV" (solo visible al completar los 3 módulos); para OS-10 se mantienen los links a Cuestionarios Oficiales.
- **Verificación**: tsc OK; script de chequeo (63 preguntas, examen 20/20/20 con IDs únicos, MiniQuiz 5, shuffle conserva la correcta); Chrome headless OK (sidebar con botón de examen; `/evaluaciones/operador-cctv-y-alarmas` renderiza examen con umbral 80% y 60 preguntas).
- **Pendiente**: commit+push de la jornada (fijado al final de esta sesión), borrado manual de assets viejos M1 (opcional), prueba manual de Zoom.

## Sesión 2026-08-18 (4) · Fundamentos de retroalimentación + estilo APRECAP en quizzes CCTV
- **Fundamentos en las 63 preguntas del banco** (`cctv.ts`): campo `explicacion` en cada pregunta del Módulo 1, 2 y 3, explicando por qué la respuesta correcta es correcta y **por qué cada opción incorrecta está mal** (citas normativas D.S. 41/1122/1814/222, Leyes 21.659/19.327/21.719/19.628, NFPA-72, y referencias de los MDs 2 y 3). Se verificó que ninguna pregunta de M1 tiene ley derogada como correcta (DL 3.607 solo aparece como distractor).
- **MiniQuiz**: ahora muestra automáticamente el bloque "Fundamento" al equivocarse (y con botón ℹ️ en cualquier pregunta), porque el campo `explicacion` ya no va vacío. Tag del banner corregido a "Evaluación del Módulo" (ya no dice "Formato OS-10", pues el componente ahora se usa también en CCTV).
- **Examen Final CCTV** (`CCTVFinalExam.tsx`) rehecho con **`FinalExam.module.css` (estilo visual APRECAP)**: header cyan, opciones A–D en grilla, dots numerados, botón ENTREGAR verde, aviso de preguntas faltantes, tarjeta de resultado con círculo SVG y lista de módulos fallados (se eliminó el estilo Tailwind genérico).
- **Revisión post-entrega del examen**: botón "🔍 Revisar mis respuestas y fundamentos" que muestra las 60 preguntas paginadas de 10 en 10, con la respuesta del usuario marcada (verde/rojo), la correcta destacada y el **fundamento explicando por qué las demás opciones están mal** (se muestra automáticamente en las falladas, y con botón ℹ️ en el resto).
- **Verificación**: tsc OK; Chrome headless OK (examen renderiza con contador, dots y opciones; página del curso sin el tag "Formato OS-10" y con el botón de examen).
- **Pendiente**: commit+push de esta sesión, borrado manual de assets viejos M1 (opcional), prueba manual de Zoom.


## Sesión 2026-08-18 (5) · Fundamentos de calidad en las 420 preguntas OS-10
- **Auditoría previa**: script de análisis sobre los 14 bancos (`os10-modulo1..14.ts`) mostró 420 preguntas con explicaciones vacías o genéricas ("El manual señala/enumera..."), solo 4 con "por qué" y ninguna que explicara por qué los distractores estaban mal. El cliente aprobó reescribir las 420 completas.
- **Reescritura total (módulos 1 al 14, 30 preguntas c/u)**:
  - Alternativas (10 por módulo): `explicacion` explica por qué la correcta es correcta (con cita normativa: Arts. 19 N°7 y 130 CPP, 432/439 CP, Código del Trabajo, Decretos 54/594, Leyes 16.744/21.659/19.628/21.719, etc.) y **por qué cada opción incorrecta está mal**, descartándola una a una.
  - V/F (20 por módulo): formato "Es VERDADERA/FALSA: ..." con la razón, corrigiendo además errores de contenido (ej. ahogado azul/blanco invertido, cargador lento/rápido, causas inmediatas/básicas, rasgo depresivo/obsesivo, 20.000/10.000 UTM).
  - Se mantuvieron intactos `id`, `pregunta`/`afirmacion`, `opciones` y `respuestaCorrecta` (solo cambió `explicacion`).
- **Verificación**: tsc OK; 14 bancos con 10 alternativas + 20 V/F (420 en total), 0 explicaciones vacías; muestreo de las 30 preguntas por archivo confirma fundamentos sustantivos y ningún texto genérico; examen OS-10 y cuestionarios intactos (el componente `FinalExam.tsx` antiguo quedó huérfano: solo `CCTVFinalExam` se usa en `/evaluaciones/[slug]`).
- **Pendiente**: commit+push de esta sesión, borrado manual de assets viejos M1 (opcional), prueba manual de Zoom.

## Sesión 2026-08-18 (8) · Revisión del cliente: Reglamento 209 + Legislación aplicada (curso Supervisor)
- **Documentos de la revisión** (cliente) en `C:\Users\Vickoto\Desktop\supervisor revisado\`: `Curso_Supervisor_Consolidado.docx` con notas a mano ("agregar PUNTO 1-2 Reglamento 209 como módulo", "LEGISLACIÓN APLICADA A LA SEGURIDAD PRIVADA (SE ADJUNTA) — se basa en la nueva Ley 21.659", rojo = Ley Karin 4.2 + Eventos Masivos 6.1, duplicados en el punto 2 amarillo de la legislación), `Decreto-209_27-MAY-2025 (1).pdf` (83 págs, 136 artículos, Reglamento de la Ley 21.659 publicado el 27-MAY-2025) y `legislación aplicable a la seguridad privada.docx` (613 párrafos, 18 secciones: Ley 21.659, sanciones 650–13.500 UTM, seguro 132 UF, vigilante vs guardia, derecho penal, flagrancia art. 129 CPP, Ley Karin, DD.HH., uso de la fuerza ONU, Ley 21.719, Res. 1185).
- **Decisión del cliente**: el contenido nuevo va en el **Módulo 1 reordenado** — nuevos 1.2 (Reglamento 209, resumen), 1.3 (Ley 21.659 en la práctica), 1.4 (Derecho penal y detención), 1.5 (DD.HH., uso de la fuerza y datos personales); el antiguo 1.2 (Ley 16.744) pasó a **1.6** y el 1.3 (DS 594) a **1.7** (`git mv`). La plataforma se armará después, cuando el cliente entregue los PDFs y links de YouTube.
- **MDs creados/actualizados (18 submódulos + 6 consolidados)**: 4 nuevos (1.2–1.5, solo contenido de estudio: sin "notebook lm", ni PDFs, ni videos, ni plataformas, ni actividades — verificado por grep); corregido "Decreto Supremo N° 209 (2024)" → "(publicado el 27 de mayo de 2025)" en Modulo_3 y 3.1, con detalle de artículos (guardias 87–94 con seguro 132 UF, jefe/encargado 22–24, supervisor 108, plataforma 115, registro 118–127, fiscalización 128–136); Modulo_1.1 + Resolución N° 1.185 (turnos 4x4/5x5/6x6/7x7 de 12h o 6x2 de 8h + 6 días anuales); Modulo_4.2 + definiciones Ley Karin (violencia por terceros, acoso laboral, acoso sexual); Modulo_6.1 + derechos y deberes de los asistentes; Modulo_6.2 + sección datos personales (Ley 21.719/19.628); Modulo_6.3 + sección detención en flagrancia (5 situaciones art. 129 CPP) y acta de entrega; Modulo_1 consolidado retitulado ("Normativa Laboral y Legislación de la Seguridad Privada") con los 7 submódulos.
- **Docx de revisión regenerado**: `scripts/md_to_docx_supervisor.py` → 18 submódulos, OUT `C:\Users\Vickoto\Desktop\Curso_Supervisor_Consolidado_v2.docx`.
- **Verificación**: grep de palabras prohibidas en los 24 MDs → solo falsos positivos ("actividad preventiva"); estructura OK (18 submódulos 1.1–1.7, 2.1–2.2, 3.1–3.2, 4.1–4.2, 5.1–5.2, 6.1–6.3, todos con "Reglas de oro").
- **Pendiente**: commit+push de esta sesión; cuando el cliente entregue PDFs y links YouTube → montar el curso en la plataforma (patrón bastón/CCTV).

## Sesión 2026-08-18 (9) · Curso Supervisor montado en la plataforma (18 submódulos)
- **Materiales del cliente**: `C:\Users\Vickoto\Downloads\supervisor aprecap\` con 6 carpetas de módulo (**18 MP4 + 18 PDFs**, NotebookLM) y `videos supervisor.txt` con los links de YouTube (17; faltaba `Seguridad_Laboral` → el cliente pasó el link `7jFHf8I_vNw`).
- **Verificación de links con oEmbed de YouTube**: los 18 IDs resuelven a los títulos correctos; se detectó que "Seguridad y Sus Límites" (`k-aQSMYdK5c`) está en la carpeta `modulo 1` (el txt del cliente lo agrupaba en módulo 2) → asignado a 1.7 DS 594, quedando M1 completo con 7/7.
- **`videos supervisor.txt` arreglado**: 18 videos en orden de submódulos, links corregidos y nombres normalizados ("Ley 21 659" → "Ley 21.659", "comunicacion y enlace" → "Comunicación y Enlace"; "Seguridad y Sus Límites" movido a módulo 1; "Seguridad Laboral" agregado en módulo 2).
- **18 PDFs subidos a Sanity** con `scripts/upload-supervisor-pdfs-sanity.mjs` (patrón idempotente de bastón; mapeo en `scripts/sanity-supervisor-pdf-urls.json`, local fuera de git). Emparejados por carpeta y nombre (ej. Labor_Compliance_Essentials→1.1, Guía_Técnica_DS_209→1.2, Security_Legal_Manual→1.4, Tactical_Fire_Safety→2.2, Mass_Event_Security_Management→6.1...).
- **Curso en plataforma** (`web/src/data/materiales-estudio.ts`): slug `supervisor-de-seguridad` reescrito (eliminados los slides/PDF placeholder "FORMACION-SUPERVISOR...") → **6 módulos × 18 submódulos** con `videoUrl` (YouTube) + `pdfUrl` (Sanity), flujo **video → PDF → completado**, sin banco ni quizzes (decisión del cliente): M1 Normativa Laboral y Legislación de la Seguridad Privada (1.1-1.7) · M2 Prevención de Riesgos y Control de Emergencias (2.1-2.2) · M3 Procedimientos de Gestión de Seguridad (3.1-3.2) · M4 Liderazgo y Resolución de Conflictos (4.1-4.2) · M5 Sistemas de Alarma, Comunicación y Enlace (5.1-5.2) · M6 Eventos Masivos, Registros y Manejo de Incidentes (6.1-6.3).
- **Verificación**: tsc OK; server dev temporal en 3001 → Chrome headless: 6 módulos renderizados, submódulos del M1 expandido, iframe YouTube del video activo (`kzuNrJpBI6Q`) y link PDF Sanity correcto por submódulo; sin paso de quiz. El server dev del usuario (3000) estaba sirviendo datos viejos (no reflejaba el cambio) y quedó restaurado con el contenido nuevo.
- **Pendiente**: commit+push de esta sesión.

## Sesión 2026-08-18 (7) · Quizzes y Examen Final para el curso Bastón y Esposas
- **Banco de preguntas** `web/src/lib/questionBanks/baston.ts`: **33 preguntas** (M1: 12, M2: 9, M3: 6, M4: 6 — 3 por submódulo) con 4 opciones y `explicacion` de calidad (por qué la correcta es correcta + por qué cada distractor está mal), fundamentadas en los 11 MDs de `docs/markdown_cursos/5_Baston_y_Esposas/`. Helpers: `getPreguntasPorModulo`, `getMiniQuizBancoBaston`, `getExamenFinalBaston`; constantes `MINIQUIZ_PREGUNTAS_BASTON = 5`, `EXAMEN_FINAL_PREGUNTAS_BASTON = 20`, `EXAMEN_FINAL_UMBRAL_BASTON = 80`.
- **Refactor compartido**: tipo `ExamQuestion` movido a `questionBanks/types.ts`; helpers genéricos `seleccionarBalanceadas`/`barajarOpciones` en `questionBanks/helpers.ts`; el examen APRECAP se unificó en `components/cursos/FinalExam.tsx` (parametrizado por banco, total, umbral, tag), reemplazando al huérfano Sarmat-style y a `CCTVFinalExam.tsx` (eliminado). CCTV conserva el mismo comportamiento (60 preguntas, 80%, keys `aprecap_examen_operador-cctv-y-alarmas_*`).
- **Wiring**: `banco: "baston"` en `materiales-estudio.ts` (tipo `"os10" | "cctv" | "baston"`); MiniQuiz 5 al azar por módulo (umbral 60%, fundamento al fallar) en el paso 3 del flujo video → PDF → quiz; link sidebar y CTA final "📝 Examen Final Bastón y Esposas" → `/evaluaciones/baston-y-esposas` (20 preguntas, 80%, reintentos ilimitados, revisión post-entrega con fundamentos, `localStorage aprecap_examen_baston-y-esposas_*`).
- **Verificación**: tsc OK; script de chequeo (33 preguntas, 0 con problemas, 12/9/6/6, todos los módulos ≥5 para MiniQuiz); Chrome headless OK (`/evaluaciones/baston-y-esposas` con 20 preguntas y 4 opciones; `/evaluaciones/operador-cctv-y-alarmas` sin regresión con 60 preguntas; `/materiales/baston-y-esposas` con "Paso 3: MiniQuiz", progreso y link de examen).
- **Pendiente**: commit+push de esta sesión, borrado manual de assets viejos M1 (opcional), prueba manual de Zoom.

## Sesión 2026-08-19 (10) · Quizzes y Examen Final Supervisor + justificaciones OS-10 + baja de Jefe de Seguridad
- **Decisiones del cliente** (reunión con question tool): el examen final ya NO justifica respuestas (solo % y módulos fallados, como Sarmat CCTV) en **todos** los cursos; examen Supervisor = **60 preguntas / 80%**; banco de **72 preguntas únicas** (4 por submódulo, sin duplicados tipo Sarmat); OS-10: **justificar las 307 V/F** temáticas y dar **fundamentos reales a las 82 alternativas**; crear **Examen Final OS-10 (140 V/F, 80%)**; el curso **Jefe de Seguridad deja de ofrecerse** → retirarlo de la plataforma **conservando** PDFs (`web/public/materiales/`), MDs (`docs/markdown_cursos/4_Jefe_de_Seguridad/`) y `scripts/copy-jefe-pdfs-to-public.mjs`.
- **Banco Supervisor** (`web/src/lib/questionBanks/supervisor.ts`): **72 preguntas** (M1: 22, M2: 14, M3: 8, M4: 8, M5: 8, M6: 12; IDs `sup1_01`…`sup6_12`, todas con `explicacion` de calidad). Helpers `getExamenFinalSupervisor` (balanceado 60) / `getPreguntasPorModulo` / `getMiniQuizBancoSupervisor`; constantes 5/60/80. Verificación: 72 únicas, 0 repetidas.
- **Examen Final unificado**: `FinalExam.tsx` **sin revisión post-entrega ni fundamentos** (aplica a Supervisor 60, CCTV 60 y Bastón 20); resultado solo con %, "correctas X de N" y módulos fallados. `FinalExamVF.tsx` **nuevo** para OS-10: **140 V/F** (10 por módulo × 14, random, sin justificación, `localStorage aprecap_examen_guardia-de-seguridad_*`).
- **Wiring**: `evaluaciones/[slug]` con casos `supervisor-de-seguridad` (60/80) y `guardia-de-seguridad` (140/80); `materiales/[slug]` sidebar + CTA con "📝 Examen Final Supervisor de Seguridad" / "📝 Examen Final OS-10" (OS-10 mantiene "📋 Cuestionarios Oficiales" secundario); `materiales-estudio.ts` tipo banco += "supervisor" y `banco: "supervisor"` en el curso.
- **OS-10 cuestionarios justificados**: helper `vf()` con 4º arg → **307 V/F** (ley-16744 40, prevención 80, emergencia 50, instalaciones 50, alarmas revisada 50, alarmas rev. 37) con explicación "Es VERDADERA/FALSA: …"; helper `alt()` con `explicacion` obligatoria → **82 alternativas** (c-1…c-82) con fundamento legal/técnico real (antes caían al texto de la correcta) + 5 `alt()` de la Prueba de 150 (g-21/24/25/33/34) que rompían tsc. Verificado: 307 V/F y 87 alt() con explicación, 0 vacías.
- **Baja de Jefe de Seguridad (solo plataforma)**: eliminadas entradas de `materiales-estudio.ts` (jefe-de-seguridad-privada, 8 módulos), `cursos.ts` (2: jefe-de-seguridad-privada y jefe-de-seguridad), `cursos-otec.ts` (jefe-de-seguridad-otec), tarjeta CURSO 4 + import `cursosLP` en `panel/alumno`, entrada `CURSOS_CERTIFICADO`, mención en meta de `/cursos`, sección "#### Curso de Jefes de Seguridad" + imagen en `pages.ts`, mención en `/asesorias`. La entrada "Supervisor de Seguridad" que vivía bajo el slug de jefe se reincorporó con su slug correcto (`supervisor-de-seguridad`, 140 h) para que home y /cursos sigan mostrando el curso.
- **Docs**: AGENTS.md y CHECKLIST_PRODUCCION.md → 3 cursos; tareas de horas Jefe canceladas en TASKS/TAREAS/PLAN; PLAN_PROYECTO actualizado.
- **Verificación**: script de checks (72 supervisor únicas; 307 V/F + 87 alt() con explicación; sin "jefe" en data; constantes; sin modoRevisión) → todo OK; `tsc --noEmit` 0 errores; server temporal 3001 → **22 checks headless OK** (home/cursos sin Jefe, materiales con links de examen, exámenes supervisor 60 / OS-10 140 / CCTV 60 / bastón 20 sin revisión, panel sin CURSO JEFE); server 3000 reiniciado con el contenido nuevo.
- **Pendiente**: commit+push de esta sesión.

## Sesión 2026-08-18 (6) · Curso Bastón y Esposas montado en la plataforma (11 submódulos)
- **Materiales del cliente**: `C:\Users\Vickoto\Downloads\baston y esposas aprecap\` con 4 carpetas de módulo (11 MP4 + 11 PDFs) y lista de links de YouTube en `videos modulos.txt`.
- **11 PDFs subidos a Sanity** (`mwwotgjc/production`) con nuevo script idempotente `scripts/upload-baston-pdfs-sanity.mjs` (mapeo local `scripts/sanity-baston-pdf-urls.json`, fuera de git por `scripts/*.json`). Los PDFs no tienen capa de texto (extracción pypdf vacía); se emparejaron con videos por nombre dentro de cada carpeta.
- **Curso en plataforma** (`web/src/data/materiales-estudio.ts`): slug `baston-y-esposas`, 4 módulos / **11 submódulos** con `videoUrl` (YouTube del cliente) + `pdfUrl` (Sanity), flujo **video → PDF → completado** (sin banco, sin MiniQuiz, decisión del cliente):
  - M1 Defensa Personal Policial: 1.1 DPP y Factor Sorpresa (6YCBsH29R9s / Professional_Physical_Defense_Tactics) · 1.2 Tiempo-Distancia (n7VQspOgJYw / Tactical_Distance_Management) · 1.3 Conciencia Situacional (IbCYF_MTHWM / Estrategias_de_Seguridad_Preventiva) · 1.4 Legítima Defensa (WVBOoEUrees / Marco_Legal_de_la_Legítima_Defensa).
  - M2 Comunicación y Técnicas de Control: 2.1 Comunicación Persuasiva y Desescalada (nHXye4YVCpg / APRECAP_Tactical_De-escalation) · 2.2 Palancas y Torsiones (RppFH2g-AwE / APRECAP_Secure_Apprehension_Manual) · 2.3 Técnicas vs Tácticas (nCcOtL8oTks / Tactical_Defense_Mastery).
  - M3 Uso de la Fuerza y Marco Legal: 3.1 Línea de Evolución y Niveles (2La8Un0FRb0 / Protocolo_de_Uso_de_la_Fuerza) · 3.2 Marco Legal Ley 21.659/D.S. 209 (JmG9mIF9IQA / Marco_Legal_Seguridad_Privada).
  - M4 Implementos: 4.1 Bastón Telescópico (rzlK94mwXXA / Tactical_Baton_Protocol) · 4.2 Esposas (JsiJ_fQyLE4 / Protocolo_Técnico_de_Grilletes).
- **Panel alumno**: 5ª tarjeta "Curso Bastón y Esposas" (🥋) → `/materiales/baston-y-esposas`. **Diploma**: entrada "CURSO DE BASTÓN Y ESPOSAS · 8 horas" en `CURSOS_CERTIFICADO`.
- **Verificación**: tsc OK; Chrome headless en `/materiales/baston-y-esposas` (banner, 4 módulos, 4 submódulos visibles del M1 expandido, iframe YouTube del video activo, PDF Sanity vía proxy) y en `/panel/alumno/certificado` (opción "CURSO DE BASTÓN Y ESPOSAS (8 horas)"). `/panel/alumno` requiere login (tarjeta verificada por tsc + patrón de las otras 4).
- **Pendiente**: commit+push de esta sesión, borrado manual de assets viejos M1 (opcional), prueba manual de Zoom.
