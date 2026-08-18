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
