# Antes de Producción — Flujo de Cursos, Candados y Seguridad

> Checklist obligatorio ANTES de habilitar la plataforma para alumnos reales.
> Referencia: lógica del proyecto sarmat (`C:\sarmat subible\sarmat-web`), adaptada a APRECAP.
> Actualizado: 2026-08-19

---

## 1. Candados del flujo de cursos y módulos (PENDIENTE DE IMPLEMENTAR)

Hoy el curso (`web/src/app/materiales/[slug]/page.tsx`) deja navegar libremente entre módulos
y rendir el examen final sin requisitos. Antes de producción hay que:

- [ ] **Candado por módulo**: el módulo N+1 se desbloquea solo al aprobar el quiz del módulo N.
  - Sarmat exige responder bien todas las preguntas del MiniQuiz (100%). Definir el umbral de APRECAP
    (propuesta: aprobar con 60% como el resto de los quizzes, MINIQUIZ_UMBRAL_APROBACION).
  - Mostrar candado 🔒 en el sidebar para módulos no desbloqueados (índice máximo desbloqueado).
- [ ] **Examen final bloqueado** hasta completar todos los módulos del curso.
  - Mensaje tipo "🔒 Examen Final Bloqueado — debes completar X/Y módulos".
  - Umbral del examen final: 80% (ya implementado en los 4 exámenes).
- [ ] **Video obligatorio**: mínimo de segundos de visualización antes de continuar.
  - El componente `VideoTracker` ya existe; revisar su configuración (minWatchSeconds) y aplicarlo en todo el flujo.
- [ ] **Flujo por módulo**: Video → PDF (PDFSwipeViewer) → MiniQuiz → "Módulo completado" → siguiente módulo.
  - Ya existe el esqueleto en `materiales/[slug]` (pasos video/pdf/quiz/completed); falta conectarlo a los candados.

## 2. Intentos y reglas de evaluación (definido)

- **Intentos: ILIMITADOS en todos los cursos** (decisión del cliente). A diferencia de sarmat
  (máx. 3 intentos en CCTV), en APRECAP el alumno puede reintentar cuantas veces necesite.
- Umbrales vigentes: MiniQuiz 60% · Examen Final 80% · OS-10 V/F 80% (140 preguntas).
- Exámenes sin límite de tiempo y con randomización de preguntas/opciones (ya implementado).

## 3. Persistencia y acceso

- [ ] **Progreso en Firestore**: hoy el avance vive solo en `localStorage`
  (`aprecap_progreso_{slug}`, `aprecap_examen_{slug}_pct/_aprobado`). Migrar a Firestore
  (colección `enrollments`, campos tipo `modulosCompletados`, `maxModulo`) con prioridad
  Firestore → localStorage (como sarmat), para no perder avance entre dispositivos.
- [ ] **Acceso al curso aprobado por admin**: sarmat usa `accesoCCTV: pendiente|aceptado|rechazado`
  en `usuarios` y una página protegida. Definir lo equivalente para los 4 cursos de APRECAP
  (propuesta: campo `accesoCursos` con estado por curso) + protección de rutas por rol.
- [ ] **Protección de rutas por rol**: verificar que `/materiales`, `/evaluaciones`,
  `/cuestionarios` y `/panel/*` exijan sesión y rol correcto (hoy `/materiales` es público).

## 4. Seguridad y cumplimiento legal

- [ ] **Deploy de `firestore.rules`** (raíz del repo) al proyecto de Firebase:
  `firebase deploy --only firestore:rules`. Reglas por rol, `audit_logs` inmutable,
  `pagos` solo escritura server-side.
- [ ] **Ley 21.719 (Datos)**: CookieBanner global (✅ implementado), ConsentModal en paneles (✅),
  PrivacidadPanel con derechos ARCO (✅), consentimientos versionados en `consents` (✅).
- [ ] **Ley 21.663 (Ciberseguridad)**: MFA por SMS para admin/profesor (✅), auditoría
  server-side en `audit_logs` (✅), cifrado TLS (✅), mención en /privacidad y /terminos (✅).
- [ ] Revisar que ningún secreto/API key esté en el cliente (Firebase config pública OK,
  claves de Admin SDK solo en server).

## 5. Contenido y páginas pendientes

- [ ] **Página de Requisitos Ley 21.659 (Art. 46)**: sarmat lista 13 documentos citando los
  numerales del artículo 46. Crear equivalente en APRECAP (página pública de requisitos).
- [ ] **Códigos de certificación SPD/OS-10**: NO se agregan códigos ni claims de sarmat.
  El sitio solo declara "Autorizados por OS-10, SENCE y Subsecretaría de Prevención del Delito".
- [ ] **Fotos reales de cursos**: las cards de OS-10 y Bastón usan imágenes genéricas
  (`capacitacion.png`); reemplazar cuando el cliente entregue fotos propias.
- [ ] Módulo curricular de **Derechos Humanos** (sarmat tiene 15 preguntas + módulo CCTV
  "marco legal, DDHH y privacidad"): evaluar incorporarlo a los cursos (la misión/visión
  pública con enfoque DDHH ya está en "Carta del Director" y home).
- [ ] Quitar/ocultar la página `/prueba-felicitaciones` y el botón "🧪 Vista previa exámenes"
  del navbar antes de producción (herramienta interna de demostración).
- [ ] Revisar `/evaluaciones` (página índice legacy, `data/evaluaciones-banco.ts`) — decidir si
  se mantiene o se retira.

## 6. Verificación final (checklist de producción)

- [ ] `npx tsc --noEmit` sin errores · `npm run lint` limpio.
- [ ] Build de producción (`npm run build`) correcto.
- [ ] Flujo completo de prueba: registro → aprobación admin → curso → videos/PDFs → quizzes →
  examen final → diploma (panel alumno y generador admin).
- [ ] Regresión: home (2 secciones, 4 cursos), /cursos, carta del director, blog, contacto,
  pagos WebPay, reuniones Zoom, clases en vivo.
- [ ] Prueba en móvil del navbar/sidebar del panel admin.
- [ ] Deploy de `firestore.rules` + revisión de reglas con `firebase emulators` o equivalente.
