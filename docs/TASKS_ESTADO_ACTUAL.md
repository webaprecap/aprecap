# 📌 Estado de Tareas y Transferencia de Contexto (Agent Handoff)

> **Documento de Control y Continuidad para Agentes IA y Desarrolladores.**

---

## ✅ TRABAJO REALIZADO Y COMPLETADO

1. **Extracción y Generación de Archivos Markdown (`docs/markdown_cursos/`):**
   - **Guardia OS-10 (8 Archivos .md):** `Modulo_1` al `Modulo_8` con el 100% del texto extraído plana por plana.
   - **Operador CCTV y Alarmas (3 Archivos .md):** `Modulo_1` al `Modulo_3` con el 100% del texto extraído.
   - **Supervisor de Seguridad (5 Archivos .md):** `Modulo_1` al `Modulo_5` con el 100% del texto extraído.
   - **Jefe de Seguridad Privada (8 Archivos .md):** `Modulo_1` al `Modulo_8` + `Material_Adicional.md` con 2.4 MB de contenido completo extraído.

2. **Organización de PDFs en el Escritorio:**
   - Ubicación: `C:\Users\Vickoto\Desktop\PDFs_Cursos_Aprecap\`
   - Carpetas independientes creadas para `1_Guardia_OS10`, `2_Operador_CCTV_y_Alarmas`, `3_Supervisor_de_Seguridad` y `4_Jefe_de_Seguridad` con sus 8 subcarpetas por módulo.

3. **Plataforma Web e Interfaz por Curso:**
   - Creadas las rutas dedicadas por curso:
     - `/materiales/guardia-de-seguridad`
     - `/materiales/operador-cctv-y-alarmas`
     - `/materiales/supervisor-de-seguridad`
     - `/materiales/jefe-de-seguridad-privada`
   - La interfaz muestra únicamente el curso activo con su acordeón de sub-módulos (`1.1`, `1.2`, `1.3`, `2.1`...).

4. **Sanity CMS e Integración:**
   - Proyecto Sanity `mwwotgjc` (Dataset `production`) sincronizado con 25 diapositivas iniciales de prueba.

5. **Sistema de Quizzes y Examen Final OS-10 (NUEVO — replicando Sarmat):**
   - **Fuente de contenido:** los 9 PDFs oficiales del curso (`Downloads/os10 aprecap`, copiados a `web/public/materiales/os10/`). Se hizo OCR de referencia en `docs/markdown_cursos/1_Guardia_OS10/pdfs_ocr/`; las preguntas se redactaron **fundamentadas frase a frase** en las extracciones oficiales del manual (`Modulo_X_*.md`), NO con conocimiento inventado.
   - **Bancos de preguntas (TS local, como Sarmat):** `web/src/lib/questionBanks/`
     - `types.ts` (interfaces + shuffle), `os10.ts` (agregador + selección random), `os10-modulo1..9.ts`
     - Por módulo: **10 alternativas (4 opciones) + 20 V/F** → 270 preguntas, 90 por curso.
     - MiniQuiz: **5 al azar** con opciones/letras re-mezcladas en cada intento. Umbral **60%**.
     - Examen Final: **90 V/F** (10 por módulo del pool de 180). Umbral **80%**. Feedback por módulo al reprobar.
   - **Componentes (branding Aprecap):** `web/src/components/cursos/MiniQuiz.tsx` + `.module.css`, `FinalExam.tsx` + `.module.css`.
   - **Página Examen Final:** `/evaluaciones/guardia-de-seguridad` (`web/src/app/evaluaciones/[slug]/page.tsx`).
   - **Flujo del módulo (video → PDF → quiz → siguiente):** integrado en `web/src/app/materiales/[slug]/page.tsx` con pasos `video | pdf | quiz | completed`, progreso guardado en localStorage (`aprecap_progreso_<slug>`), botón "Examen Final" en sidebar. **SIN candados** (lógica de bloqueo queda para producción, igual que Sarmat).
   - **Verificado con Puppeteer:** examen completo (90 preguntas, resultado %), MiniQuiz (reintento, letras re-mezcladas, aprobación, avance de módulo), video YouTube + paso al PDF. Sin errores de hidratación ni JS.
   - `canvas-confetti` agregado a dependencias de `web/`.

6. **Módulos 10–14 del Curso OS-10 + PDFs en Sanity (NUEVO):**
   - **5 módulos nuevos** agregados a `/materiales/guardia-de-seguridad` (video → PDF → quiz), en este orden:
     10. Evolución del Guardia (`m1p-fI3uwek` → `The_Ethical_Shield.pdf`)
     11. Seguridad de Instalaciones OS-10 (`AHhDEfJAM1s` → `OS-10_Tactical_Blueprint_v2.pdf`, versión 14 págs.)
     12. Ética y Eventos Masivos (`bsLIP7v5-A8` → `Mass_Events_Tactical_Blueprint.pdf`)
     13. Derechos y Deberes Legales (`Xvp-GwrbWW0` → `Human_Rights_in_Private_Security.pdf`)
     14. Protección Moderna Integral (`G9UWNolIgCA` → `Seguridad_Física_y_Digital.pdf`)
   - **14 PDFs subidos a Sanity** (`mwwotgjc/production`): los 9 existentes (de `C:\Users\Vickoto\Downloads\os10 aprecap`) + los 5 nuevos (`docs/pdf os10`). Mapeo en `scripts/sanity-pdf-urls.json`; script `scripts/upload-pdfs-sanity.mjs` (idempotente por sha256).
   - `web/src/data/materiales-estudio.ts` ahora referencia todos los `pdfUrl` del curso OS-10 desde `https://cdn.sanity.io/files/...`.
   - **Proxy de PDFs** `web/src/app/api/pdf/route.ts` (solo permite `cdn.sanity.io`): `PDFSwipeViewer` redirige las URLs de Sanity por `/api/pdf?url=...` para evitar CORS (react-pdf manda Origin y el proyecto Sanity lo rechaza hasta registrar los origins en el panel).
   - **Bancos de preguntas nuevos** `os10-modulo10..14.ts` (10 alternativas + 20 V/F c/u, fundamentados en OCR en `docs/markdown_cursos/1_Guardia_OS10/pdfs_ocr/`). Examen final ahora **140 V/F** (10 por módulo × 14); header de `/evaluaciones/[slug]` calcula el total dinámicamente.
   - Verificado con Puppeteer (Chrome headless): 14 módulos en sidebar, video YouTube módulo 10, PDF vía proxy 200 + canvas react-pdf, MiniQuiz en modo demo, "Módulo 10 Completado", examen "140 preguntas".

7. **Apartado Cuestionarios Oficiales del Cliente (NUEVO — reemplaza el examen final):**
   - Nueva página `/cuestionarios/guardia-de-seguridad` con los **8 cuestionarios oficiales** que el cliente entrega en sus cursos, digitalizados con las **mismas preguntas y respuestas** (extraídos de `C:\Users\Vickoto\Downloads\os10 aprecap\cuestionarios`; textos de trabajo en `scripts/cuestionarios-extraidos/`):
     1. Cuestionario de Preguntas para Examen OS-10 (82 preguntas con alternativas de 4 opciones y corrección inmediata).
     2. Prueba de Diagnóstico General (150 preguntas: V/F + alternativas + desarrollo).
     3. Prueba Ley 16.744 (40 V/F con casos prácticos).
     4. Prueba Prevención de Riesgos (80 V/F).
     5. Prueba Control de Emergencia (50 V/F).
     6. Prueba Seguridad de Instalaciones (50 V/F).
     7. Prueba Sistemas de Alarmas, Comunicación y Enlace - Revisada (50 V/F).
     8. Prueba Alarmas y Comunicación y Enlace - Rev (37 V/F).
   - Componentes: `web/src/components/cuestionarios/CuestionarioVFView.tsx` (interactivo con puntaje + corrección completa al entregar, sin nota mínima, reintentos ilimitados).
   - **Actualización 2026-08 (petición del cliente):** los 8 cuestionarios ahora usan **corrección inmediata por pregunta** (verde/rojo + muestra la respuesta correcta y el porqué). Las 82 preguntas abiertas se convirtieron en **alternativas de 4 opciones** (la correcta oficial + 3 distractores creados), las 5 de desarrollo de la prueba de 150 también pasaron a alternativas, y las V/F se mantienen con botones Verdadero/Falso. Se eliminó el botón "Ver respuesta" (solo queda "Mostrar todas las respuestas" visible en desarrollo local). Al completar todas las preguntas se muestra el **resultado final con porcentaje** y botón "Reintentar".
   - **Examen final eliminado** (el cliente no quiere examen final, solo sus cuestionarios): se quitó el botón "Examen Final" del sidebar de `/materiales/guardia-de-seguridad` y `/evaluaciones/[slug]` ahora redirige a `/cuestionarios/[slug]`. Los **MiniQuiz por módulo se mantienen** (video → PDF → quiz).
   - Enlaces: sidebar del curso ("📋 Cuestionarios Oficiales") y tarjeta OS-10 del panel del alumno.

8. **Diploma digital APRECAP (NUEVO):**
   - Página `/panel/alumno/certificado` con el certificado del cliente (modelo `JUANA GONZALEZ.docx`) digitalizado con mejor tipografía y estilo APRECAP.
   - **Nombre**: editable, auto-completado desde el perfil del estudiante. **RUT**: automático desde el perfil (no editable). **Fecha**: automática al día de emisión. **Curso**: selector con los cursos aprobados y su duración (OS-10 90h, CCTV 40h, Supervisor 140h, Jefe 140h).
   - Botón "Imprimir / Guardar como PDF" (impresión A4 con la zona de configuración oculta).
   - Acceso desde el panel del alumno ("📜 Certificados y Diplomas").

9. **Módulo de solo lectura Res. Ex. N° 2.183 (NUEVO):**
   - Agregado como módulo 15 del curso OS-10 (acordeón): "Resolución Exenta N° 2183 · Capacitación y Exámenes (Lectura)".
   - 8 diapositivas con los puntos clave (base legal Ley 21.659 y D.S. 209/208, tipos de curso, duraciones 100/90/60 horas pedagógicas, malla legal y técnica, examen teórico de 60 preguntas en 120 minutos, examen práctico, fiscalización Carabineros). Sin video ni quiz (solo lectura vía PPTSlideViewer).

10. **Material reservado (pendiente):** `Curso bastón y esposas presentación.pptx` se guarda para el futuro **curso de Bastón y Esposas** (no se construye aún).

11. **Curso CCTV montado con 22 submódulos video+PDF (NUEVO):**
    - El curso `operador-cctv-y-alarmas` en `web/src/data/materiales-estudio.ts` quedó con sus **3 módulos oficiales y 22 submódulos** (1.1–1.7, 2.1–2.7, 3.1–3.8), cada uno con `videoUrl` (YouTube del cliente) y `pdfUrl` (Sanity `cdn.sanity.io`, servido vía proxy `/api/pdf`).
    - Los 22 PDFs generados desde los MDs fueron renombrados con el nombre oficial del submódulo, subidos a Sanity (`mwwotgjc/production`) y mapeados en `scripts/sanity-cctv-pdf-urls.json` (script: `scripts/upload-cctv-pdfs-sanity.mjs`).
    - Los 22 videos (en `C:\Users\Vickoto\Downloads\cctv aprecap\`) fueron renombrados con el mismo esquema `Modulo_X.Y_...`.
    - `SubModuloData` ahora soporta `videoUrl` (y `slides` pasó a opcional); la página `/materiales/[slug]` usa el video y PDF del submódulo activo y reinicia el paso "video" al cambiar de submódulo. Flujo por submódulo: **video → PDF → completado** (sin quiz, el curso no tiene banco).
    - Verificado con Chrome headless: video YouTube 1.1 (`pZbUu8NOLts`), PDF de Sanity renderizado vía proxy (200), cambio de submódulo reinicia en video (1.7 `WDbDDQEbNVg`), submódulo 3.8 (`nyKt6Fb5FYg`) OK.

11. **MDs del curso CCTV consolidados y robustecidos (NUEVO):**
    - `docs/markdown_cursos/2_Operador_CCTV_y_Alarmas/` quedó con **3 MDs consolidados** (uno por módulo) con toda la info del curso, **sin secciones prácticas ni evaluaciones** (solo contenido de estudio, listos para generar los PDFs del curso):
      - `Modulo_1_Fundamentos_Legales_CCTV_y_Alarmas.md` (1.1–1.5 + nuevos 1.6 Privacidad/uso de imágenes y 1.7 Evidencia digital e informes).
      - `Modulo_2_Sistemas_Electronicos_de_Seguridad_Privada.md` (2.1–2.4 + nuevos 2.5 Fundamentos eléctricos, 2.6 Componentes/arquitectura CCTV y 2.7 Detección de incendio y evacuación).
      - `Modulo_3_Televigilancia_y_Operacion_Centro_Control.md` (3.1–3.4 + nuevos 3.5 Operación del guardia/centro, 3.6 Ciberseguridad y bodycams, 3.7 Analítica/IA y 3.8 Gestión de crisis y custodia digital).
    - **Fuentes propias usadas:** manual de 67 págs (`content/wp-pdfs/CIRCUITOS-...pdf`), slides de `materiales-estudio.ts`, lecciones WP, `GENERALIDADES-CURSO-CCTV-ALARMAS-1.pdf`, **OCR nuevo** de `Capitulo IV CCTV.pdf` (114 págs) y `Capitulo VI Centrales...pdf` (28 págs) en `pdfs_ocr/`, y texto de los 4 PPTs de Seguridad Electrónica en `scripts/cctv-extraidos/` (scripts: `scripts/ocr_cctv_drive_pdfs.py`).
    - Se eliminaron los 13 MDs delgados de submódulos (evitar duplicados).
    - **Estructura final por petición del cliente:** **22 MDs de submódulos separados** (uno por cada PDF a generar en NotebookLM: 1.1–1.7, 2.1–2.7, 3.1–3.8) con nombres descriptivos, más los 3 MDs consolidados como referencia de módulo completo. Los submódulos antes delgados (1.5, 2.2, 2.4, 3.1, 3.2, 3.3) fueron robustecidos con el material extraído (PPTs CAP I/II/III, Capítulo IV y VI) y estándares técnicos públicos.
    - Sarmat se usó solo como referencia de estructura/profundidad (su curso CCTV tiene 10 módulos teóricos + 3 prácticos); los temas faltantes se integraron como submódulos dentro de los 3 módulos oficiales de Aprecap, redactados con contenido propio.
    - **Siguiente paso (cliente):** llevar los 22 MDs de submódulos a NotebookLM para generar los PDFs por separado y traer los links de YouTube de los videos para montar los módulos en la plataforma.

---

## ⏳ TAREAS PENDIENTES Y PRÓXIMOS PASOS

- [ ] **Construcción de Ejercicios Prácticos Interactivos:**
  - Compilar `docs/EJERCICIOS_PRACTICOS_INTERACTIVOS.md` con los formularios y casos prácticos donde el alumno debe escribir o simular tareas en pantalla (Libro de Novedades, Informes OS-10, Pautas de Puesto).
- [ ] **ELIMINAR MODO DEMO ANTES DE PRODUCCIÓN (importante):**
  - Quitar el botón temporal "🧪 Test Curso OS-10" del `Header.tsx` (buscar comentario `TEMP-TEST`, está en menú escritorio y móvil).
  - Quitar el modo demo (`?demo=1` + sessionStorage `aprecap_demo`): hook `web/src/lib/useModoDemo.ts`, prop `modoDemo` en `MiniQuiz.tsx` y `FinalExam.tsx`, badges "🧪 DEMO" y estilos `.demoBox` de los CSS. Solo se activa al entrar por el botón de test o con `?demo=1`; el flujo normal no se ve afectado.
- [x] **Subir PDFs oficiales a Sanity** (14 PDFs del curso OS-10 subidos a `mwwotgjc/production` y referenciados desde `cdn.sanity.io`; visor usa proxy `/api/pdf`).
- [ ] **Registrar origins en CORS de Sanity** (panel sanity.io/manage): agregar `http://localhost:3000` y el dominio Cloudflare para poder usar URLs directas `cdn.sanity.io` sin el proxy `/api/pdf`.
- [ ] **Persistencia de resultados en Firestore** (hoy los puntajes de cuestionarios y el progreso se guardan en localStorage; en producción replicar Sarmat: Firestore + límite de intentos + candados de módulos).
- [ ] **Configuración de CORS (Producción):**
  - Agregar URLs de `localhost` y Cloudflare en la configuración de **Sanity CMS**.
  - Agregar URLs de `localhost` y Cloudflare en la configuración de **Firebase**.
- [ ] **Pase a Producción (Restricción de Permisos):**
  - **IMPORTANTE:** Antes del despliegue en servidor de producción, volver a habilitar la lógica de bloqueo condicional por permisos Firestore (`accesoCCTV`, `accesoSupervisor`, `accesoJefe`) en `web/src/app/panel/alumno/page.tsx`, y añadir los candados de módulos/examen estilo Sarmat.

---

- [ ] **Curso de Bast?n y Esposas (futuro):** construir el curso con `Curso bast?n y esposas presentaci?n.pptx` (material reservado en `C:\Users\Vickoto\Downloads\os10 aprecap\cuestionarios`).

## 🔑 Credenciales del Sistema

- **Sanity CMS Project ID:** `mwwotgjc`
- **Sanity Dataset:** `production`
- **Repositorio GitHub:** `https://github.com/webaprecap/aprecap.git` (Rama `main`)
