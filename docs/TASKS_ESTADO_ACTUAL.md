# 📌 Estado de Tareas y Transferencia de Contexto (Agent Handoff)

> **Documento de Control y Continuidad para Agentes IA y Desarrolladores.**
> Última actualización: 2026-08-18

---

## ✅ TRABAJO REALIZADO Y COMPLETADO

### A. Plataforma base (sesiones previas)
1. **Extracción y generación de Markdown (`docs/markdown_cursos/`):** Guardia OS-10 (Módulos 1–8 + extras), Operador CCTV (3 módulos), Supervisor (5) y Jefe de Seguridad (8 + material adicional) con el 100% del texto extraído plana por plana.
2. **Rutas dedicadas por curso:** `/materiales/guardia-de-seguridad`, `/materiales/operador-cctv-y-alarmas`, `/materiales/supervisor-de-seguridad`, `/materiales/jefe-de-seguridad-privada` con acordeón de submódulos.
3. **Sanity CMS:** proyecto `mwwotgjc` (dataset `production`).
4. **Quizzes OS-10 (MiniQuiz por módulo):** bancos `web/src/lib/questionBanks/os10-modulo1..14.ts` (10 alternativas + 20 V/F por módulo), MiniQuiz de 5 al azar con umbral 60%, flujo módulo **video → PDF → quiz** con progreso en localStorage. **El Examen Final fue ELIMINADO por petición del cliente** (ver punto C).

### B. Curso OS-10 (Guardia de Seguridad)
5. **Módulos 10–14 nuevos** en `/materiales/guardia-de-seguridad` (video → PDF → quiz):
   10. Evolución del Guardia (`m1p-fI3uwek` → `The_Ethical_Shield.pdf`)
   11. Seguridad de Instalaciones OS-10 (`AHhDEfJAM1s` → `OS-10_Tactical_Blueprint_v2.pdf`, 14 págs)
   12. Ética y Eventos Masivos (`bsLIP7v5-A8` → `Mass_Events_Tactical_Blueprint.pdf`)
   13. Derechos y Deberes Legales (`Xvp-GwrbWW0` → `Human_Rights_in_Private_Security.pdf`)
   14. Protección Moderna Integral (`G9UWNolIgCA` → `Seguridad_Física_y_Digital.pdf`)
6. **14 PDFs de OS-10 subidos a Sanity** (`mwwotgjc/production`) desde `cdn.sanity.io`; mapeo en `scripts/sanity-pdf-urls.json` (script idempotente `scripts/upload-pdfs-sanity.mjs`). El visor usa el **proxy `/api/pdf`** (solo `cdn.sanity.io`) para evitar CORS.
7. **Bancos nuevos `os10-modulo10..14.ts`** fundamentados en OCR (`docs/markdown_cursos/1_Guardia_OS10/pdfs_ocr/`); los 14 bancos quedaron en `OS10_BANCOS` (aunque el examen final ya no se usa).
8. **Módulo 15 de solo lectura "Resolución Exenta N° 2183 · Capacitación y Exámenes"** (8 diapositivas con los puntos clave: Ley 21.659, D.S. 209/208, duraciones 100/90/60 horas pedagógicas, examen teórico 60 preguntas/120 min, fiscalización Carabineros). Sin video ni quiz.

### C. Cuestionarios oficiales del cliente (reemplazan el examen final)
9. **Página `/cuestionarios/guardia-de-seguridad`** con los **8 cuestionarios oficiales** digitalizados con las mismas preguntas y respuestas (fuente: `C:\Users\Vickoto\Downloads\os10 aprecap\cuestionarios`; textos de trabajo en `scripts/cuestionarios-extraidos/`):
   1. Cuestionario de Preguntas para Examen OS-10 (82 preguntas)
   2. Prueba de Diagnóstico General (150 preguntas)
   3. Prueba Ley 16.744 (40) · 4. Prueba Prevención de Riesgos (80)
   5. Prueba Control de Emergencia (50) · 6. Prueba Seguridad de Instalaciones (50)
   7. Prueba Sistemas de Alarmas, Comunicación y Enlace - Revisada (50)
   8. Prueba Alarmas y Comunicación y Enlace - Rev (37)
   → Total: **539 preguntas** (verificado programáticamente: 0 claves faltantes, 0 IDs duplicados).
10. **Corrección inmediata por pregunta** (petición del cliente): al responder se marca verde/rojo, se muestra "✘ Incorrecto. La respuesta correcta era: …" + explicación ("Por qué"). Las **82 preguntas abiertas se convirtieron en alternativas de 4 opciones** (correcta oficial + 3 distractores creados); las 5 de desarrollo de la prueba de 150 también. Las **V/F se mantienen con botones Verdadero/Falso**. Puntaje en vivo y **resultado final con porcentaje + "Reintentar"** al completar todo. Sin "Ver respuesta" (solo "Mostrar todas las respuestas" visible en desarrollo local).
11. **Examen final eliminado**: `/evaluaciones/[slug]` redirige a `/cuestionarios/[slug]`; el sidebar del curso enlaza "📋 Cuestionarios Oficiales". Los **MiniQuiz por módulo se mantienen**.
12. Enlaces desde el panel del alumno (tarjeta OS-10).

### D. Diploma digital APRECAP
13. Página `/panel/alumno/certificado`: certificado del cliente (modelo `JUANA GONZALEZ.docx`) con tipografía mejorada. **Nombre** editable (auto desde el perfil), **RUT** automático, **fecha** = día de emisión, **curso** según el aprobado (OS-10 90h, CCTV 40h, Supervisor 140h, Jefe 140h). Botón "Imprimir / Guardar como PDF". Acceso desde el panel alumno.
14. **Referencia Sarmat verificada**: el editor WYSIWYG de certificados vive en `/admin` → pestaña "🎓 Generar Certificados" (`CertificadosTab.tsx` + `CertificateDocument.tsx` + `lib/pdfAssets.ts`, solo admin). Queda pendiente replicarlo en `/panel/admin` de Aprecap (ver pendientes).

### E. Curso CCTV — MDs, PDFs y montaje completo
15. **MDs consolidados y robustecidos** en `docs/markdown_cursos/2_Operador_CCTV_y_Alarmas/`:
    - **22 MDs de submódulos separados** (1.1–1.7, 2.1–2.7, 3.1–3.8, un PDF por NotebookLM) + **3 MDs consolidados** (referencia por módulo).
    - Sin secciones prácticas, quizzes ni menciones a PDFs/NotebookLM (solo contenido de estudio).
    - Fuentes: manual de 67 págs, slides, lecciones WP, GENERALIDADES, **OCR de `Capitulo IV CCTV.pdf` (114 págs) y `Capitulo VI` (28 págs)** en `pdfs_ocr/`, **texto de los 4 PPTs de Seguridad Electrónica** en `scripts/cctv-extraidos/` (scripts: `scripts/ocr_cctv_drive_pdfs.py`).
    - Sarmat usado solo como referencia de estructura/profundidad; los temas faltantes se integraron como submódulos nuevos con contenido propio.
16. **PDFs generados (cliente, vía NotebookLM) → renombrados y subidos a Sanity**: los 22 PDFs de `C:\Users\Vickoto\Downloads\cctv aprecap\` quedaron con el nombre oficial `Modulo_X.Y_...pdf` y fueron subidos a `mwwotgjc/production` (mapeo en `scripts/sanity-cctv-pdf-urls.json`, script `scripts/upload-cctv-pdfs-sanity.mjs`; los 22 responden 200).
17. **Videos renombrados**: los 22 MP4 de la misma carpeta quedaron con el esquema `Modulo_X.Y_...mp4` (incluidos los 2 "Módulo 1" ambiguos, resueltos por el cliente como 1.2 y 1.6).
18. **Curso montado**: `operador-cctv-y-alarmas` en `materiales-estudio.ts` con **3 módulos y 22 submódulos** (videoUrl YouTube del cliente + pdfUrl Sanity). `SubModuloData` ahora soporta `videoUrl` (y `slides` opcional). La página `/materiales/[slug]` usa video/PDF del submódulo activo y **reinicia el paso a "video" al cambiar de submódulo**. Flujo por submódulo: **video → PDF → completado** (sin quiz, el curso no tiene banco).
19. **Verificado con Chrome headless**: videos 1.1 (`pZbUu8NOLts`), 1.7 (`WDbDDQEbNVg`), 3.8 (`nyKt6Fb5FYg`); PDF de Sanity renderiza vía proxy (200); cambio de submódulo reinicia en video. `tsc` limpio.
20. **Links de YouTube del cliente** (los 22, formato `https://youtu.be/...`) quedaron aplicados en `materiales-estudio.ts`.

### F. Repositorio
21. **Push a GitHub** (`webaprecap/aprecap`, rama `main`): commit `5d74e8f` con 79 archivos (módulos, cuestionarios, curso CCTV, certificado, MDs, scripts). `.env`, `service-account.json`, mapeos JSON de Sanity y PDFs locales quedaron excluidos por `.gitignore`.

### H. Actualización legal + Curso Supervisor + Redcompra (2026-08-18)
23. **Auditoría de leyes desactualizadas (a ley chilena vigente al 18-08-2026) y correcciones aplicadas:**
    - **DL 3.607 (1981) DEROGADO por la Ley 21.659**: corregido en MDs CCTV 1.1/1.2 (+ consolidado M1), banco web `os10-modulo2.ts` (Estudio de Seguridad) y notas en MDs 1.3/1.4/1.5 ("vigente en lo compatible con la Ley 21.659").
    - **Ley 19.628 vs 21.719**: precisado en MD CCTV 1.6 (+ consolidado) y bancos `os10-modulo14.ts`: 19.628 vigente; 21.719 (Ley Marco de Protección de Datos) entra en vigor pleno dic-2026 y deroga la 19.628; derechos ARCOP.
    - **Cuestionario (web)**: pregunta 21 de la Prueba de 150 actualizada a "Carabineros, por medio de la Ley N° 21.659" (sin info antigua al estudiante, decisión del cliente).
    - **Copias con fix para regenerar PDFs**: `C:\Users\Vickoto\Desktop\MDs_CCTV_Actualizados\` con 7 archivos `cctv_...md` (1.1–1.6 + consolidado M1). ✅ **COMPLETADO**: el cliente regeneró los PDFs (NotebookLM) y los nuevos están en producción (ver sección I).
24. **MDs del curso Supervisor creados** en `docs/markdown_cursos/3_Supervisor_de_Seguridad/`: **14 submódulos + 6 consolidados** (1.1 Contrato/jornada con Ley 21.561 (42h vigente 2026/40h 2028) y Ley Karin 21.643 · 1.2 Ley 16.744 (DIAT/DIEP) · 1.3 DS 594/40/54 · 2.1 Prevención · 2.2 Incendios y emergencias · 3.1 Directivas y OS-10 · 3.2 Estudios y pautas · 4.1 Liderazgo · 4.2 Conflictos + Ley Karin · 5.1 Alarmas · 5.2 Comunicación/enlace · 6.1 Eventos Masivos (Ley 21.659/D.S. 208) · 6.2 Registros operativos · 6.3 Manejo de incidentes). Fuentes: manual oficial del curso + PDFs del Drive + leyes vigentes verificadas. Reglas cumplidas: solo info, sin menciones a plataformas, sin prácticas ni quizzes.
25. **Redcompra/WebPay ocultado (temporal)**: eliminados los 3 botones "Pagar por WebPay" de `cursos/[slug]/page.tsx` (se mantiene WhatsApp/contacto). Rutas `/pago`, `/api/webpay` y tab de pagos del admin intactas para reactivación posterior.
26. **Pruebas ejecutadas (Chrome headless + tsc + eslint)**: OS-10 (15 módulos, sin examen final, link cuestionarios), cuestionarios (8, pregunta 21 con Ley 21.659), CCTV (acordeón OK), cursos sin botón WebPay, certificado renderiza. Todo OK.

### I. Módulo 1 CCTV reformado en producción (2026-08-18)
28. **Reemplazo del Módulo 1 del curso CCTV (1.1–1.6) por la versión reformada** del cliente (PDFs regenerados con NotebookLM desde los MDs corregidos + videos nuevos en YouTube):
    - **6 PDFs nuevos subidos a Sanity** (IDs `7c8925…`, `bc2e5e…`, `2a5233…`, `5c4b9f…`, `cdb6aa…`, `772ff2…`) desde `C:\Users\Vickoto\Downloads\cctv aprecap\modulo 1 reformado\` (ya renombrados `Modulo_1.X_...pdf`). Mapeo actualizado en `scripts/sanity-cctv-pdf-urls.json` (mismas keys, URLs/sha nuevos; 1.7 y Módulos 2–3 intactos).
    - **6 assets viejos de M1 (1.1–1.6) dejados huérfanos**: el token de Sanity no permite DELETE (401). Lista de IDs para borrado manual en `scripts/sanity-old-m1-assets-to-delete.txt` (sanity.io/manage → Assets → Files).
    - **`materiales-estudio.ts`**: submódulos 1.1–1.6 → videos nuevos (`OCoA-tyikk8`, `xbG8RJOXYvI`, `4P8PaxuBYiU`, `IIcy36PrH7E`, `KeXxMe68R2Y`, `ubn3jJV-d20`) + PDFs nuevos; nombre 1.1 → "Definición de Operador de CCTV y Nueva Ley (Ley N° 21.659)". 1.7 (`WDbDDQEbNVg` + `1be37303…`) sin cambios.
    - **Verificación**: tsc OK; bundle del curso con los 7 videos y 7 PDFs nuevos y **sin rastro de los 6 videos/PDFs viejos**; los 7 PDFs responden 200 vía proxy `/api/pdf`; headless OK (submódulo 1.1 renderiza video+PDF nuevos).
    - **Pendiente del cliente**: borrar manualmente los 6 assets viejos en sanity.io/manage (opcional, no afectan el curso).

### J. Quizzes y Examen Final del curso CCTV (2026-08-18)
29. **Banco de preguntas CCTV** (`web/src/lib/questionBanks/cctv.ts`): **63 preguntas de alternativas (4 opciones c/u)** extraídas de los MDs consolidados — M1 legal: 21 · M2 sistemas: 22 · M3 televigilancia: 20. `selectBalancedQuestions(60)` → examen de **60 preguntas balanceadas 20/20/20** con preguntas y opciones randomizadas; `getPreguntasPorModulo` + `getMiniQuizBancoCctv` (formato `PreguntaAlternativa`).
30. **MiniQuiz por módulo (5 preguntas)**: curso CCTV marcado `banco: "cctv"` en `materiales-estudio.ts` (tipo `"os10" | "cctv"`); `materiales/[slug]/page.tsx` inyecta el banco del módulo expandido; los 3 módulos ahora son evaluables (video → PDF → quiz).
31. **Examen Final CCTV** (`web/src/components/cursos/CCTVFinalExam.tsx` en `/evaluaciones/operador-cctv-y-alarmas`): una pregunta a la vez (opciones A–D), dots de navegación, contador, "ENTREGAR EXAMEN" con aviso de faltantes, **umbral 80%** (decisión cliente), **reintentos ilimitados**, feedback por módulo fallado, confetti al aprobar, resultado en localStorage (`aprecap_examen_operador-cctv-y-alarmas_pct/_aprobado`). El resto de slugs de `/evaluaciones/` sigue redirigiendo a `/cuestionarios/`.
32. **Acceso**: botón "📝 Examen Final CCTV" en sidebar y tarjeta de finalización del curso (los links de Cuestionarios Oficiales quedaron solo para OS-10). Visible al completar los 3 módulos.
33. **Verificación**: tsc OK; script de chequeo (63 preguntas, examen 20/20/20 IDs únicos, MiniQuiz 5, shuffle conserva la correcta); Chrome headless OK (sidebar + examen renderizan con 80% y 60 preguntas).
34. **Pendiente de esta jornada**: commit+push (autorizado por el cliente).

### K. Fundamentos de retroalimentación y estilo APRECAP en quizzes CCTV (2026-08-18)
35. **Fundamentos en el banco** (`cctv.ts`): campo `explicacion` escrito en las **63 preguntas** (M1/M2/M3), cada uno explica por qué la correcta es correcta y por qué las 3 opciones incorrectas están mal, con citas normativas (D.S. 41/1122/1814/222, Leyes 21.659/19.327/21.719/19.628, NFPA-72, contenidos de los MDs 2 y 3). Spot-check: ninguna pregunta de M1 tiene ley derogada como correcta (DL 3.607 solo como distractor).
36. **MiniQuiz**: el campo `explicacion` ya no va vacío → al fallar una pregunta se muestra automáticamente el bloque "Fundamento" (y con botón ℹ️ en el resto). Tag del banner corregido a "Evaluación del Módulo" (era "Formato OS-10").
37. **Examen Final CCTV en estilo APRECAP**: `CCTVFinalExam.tsx` ahora usa `FinalExam.module.css` (header cyan, grilla de opciones A–D, dots numerados, ENTREGAR verde, aviso de faltantes, tarjeta de resultado con círculo SVG, módulos fallados). Se eliminó el estilo Tailwind genérico que podía asimilarse a otras plataformas.
38. **Revisión post-entrega**: botón "🔍 Revisar mis respuestas y fundamentos" → las 60 preguntas paginadas de 10 en 10, respuesta del usuario marcada verde/rojo, correcta destacada y fundamento visible (automático en falladas, botón ℹ️ en las demás).
39. **Verificación**: tsc OK; Chrome headless OK (examen renderiza contador "Respondidas 0 de 60", dots de navegación y opciones; curso sin tag "Formato OS-10" y con botón de examen en sidebar).
40. **Pendiente**: commit+push de esta sesión.

### L. Fundamentos de calidad en las 420 preguntas OS-10 (2026-08-18)
41. **Auditoría previa**: script de análisis sobre los 14 bancos `os10-modulo1..14.ts` → **420 preguntas** (10 alternativas + 20 V/F por módulo) con explicaciones vacías o genéricas ("El manual señala/enumera..."), solo 4 con "por qué" y ninguna explicando por qué los distractores estaban mal. El cliente aprobó reescribir las 420 completas.
42. **Reescritura total de `explicacion`** (solo ese campo; `id`, `pregunta`/`afirmacion`, `opciones` y `respuestaCorrecta` intactos):
    - **Alternativas**: por qué la correcta es correcta (citas normativas: Arts. 19 N°7/130 CPP, 432/439 CP, Código del Trabajo, Decretos 54/594, Leyes 16.744/21.659/19.628/21.719, Belém do Pará, etc.) + **por qué cada opción incorrecta está mal**, descartándola una a una.
    - **V/F**: formato "Es VERDADERA/FALSA: ..." con la razón; se corrigieron errores de contenido detectados (ahogado azul/blanco invertido, cargador lento/rápido invertido, causas inmediatas/básicas invertidas, rasgo depresivo/obsesivo, 20.000 vs 10.000 UTM, etc.).
43. **Verificación**: tsc OK; 14 bancos con 10 + 20 (420 en total) y 0 explicaciones vacías; muestreo por archivo sin textos genéricos; cuestionarios oficiales y examen CCTV intactos (`FinalExam.tsx` de OS-10 quedó huérfano: solo `CCTVFinalExam` se renderiza en `/evaluaciones/[slug]`).
44. **Pendiente**: commit+push de esta sesión.

### M. Curso Bastón y Esposas montado en la plataforma (2026-08-18)
45. **Materiales del cliente**: `C:\Users\Vickoto\Downloads\baston y esposas aprecap\` (4 carpetas de módulo, 11 MP4 + 11 PDFs + `videos modulos.txt` con los links de YouTube).
46. **11 PDFs subidos a Sanity** (`mwwotgjc/production`) con `scripts/upload-baston-pdfs-sanity.mjs` (idempotente, mapeo local `scripts/sanity-baston-pdf-urls.json`; los PDFs no tienen capa de texto, emparejados con videos por nombre de carpeta).
47. **Curso `baston-y-esposas` en `materiales-estudio.ts`**: 4 módulos / 11 submódulos (nombres de los MDs), `videoUrl` YouTube + `pdfUrl` Sanity, flujo **video → PDF → completado** sin quiz (decisión del cliente): 1.1 DPP · 1.2 Tiempo-Distancia · 1.3 Conciencia Situacional · 1.4 Legítima Defensa · 2.1 Comunicación/Desescalada · 2.2 Palancas y Torsiones · 2.3 Técnicas vs Tácticas · 3.1 Línea de Evolución · 3.2 Marco Legal · 4.1 Bastón Telescópico · 4.2 Esposas.
48. **Panel alumno**: 5ª tarjeta "Curso Bastón y Esposas" (🥋) → `/materiales/baston-y-esposas`. **Diploma**: "CURSO DE BASTÓN Y ESPOSAS · 8 horas" agregado a `CURSOS_CERTIFICADO`.
49. **Verificación**: tsc OK; headless en `/materiales/baston-y-esposas` (banner, 4 módulos, submódulos del M1, iframe YouTube, PDF vía proxy) y `/panel/alumno/certificado` (opción 8 horas). `/panel/alumno` requiere login.
50. **Pendiente**: commit+push de esta sesión; los MP4 locales del cliente son copias (se usan los links de YouTube).

### N. Quizzes y Examen Final del curso Bastón y Esposas (2026-08-18)
51. **Banco `baston.ts`**: **33 preguntas** (M1: 12, M2: 9, M3: 6, M4: 6; 3 por submódulo) con fundamentos de calidad (correcta + descarte de distractores), basadas en los 11 MDs del curso. Helpers `getMiniQuizBancoBaston`/`getPreguntasPorModulo`/`getExamenFinalBaston`; constantes 5/20/80.
52. **Refactor compartido**: `ExamQuestion` → `questionBanks/types.ts`; `seleccionarBalanceadas`/`barajarOpciones` → `questionBanks/helpers.ts`; examen APRECAP unificado en `components/cursos/FinalExam.tsx` (genérico por banco/total/umbral/tag). Se eliminaron `CCTVFinalExam.tsx` y el `FinalExam.tsx` huérfano de OS-10; CCTV mantiene su comportamiento (60/80%, keys localStorage intactas).
53. **MiniQuiz por módulo**: curso con `banco: "baston"`, 5 preguntas al azar, umbral 60%, fundamento al fallar, flujo video → PDF → quiz con progreso; link sidebar "📝 Examen Final Bastón y Esposas".
54. **Examen final** `/evaluaciones/baston-y-esposas`: 20 preguntas balanceadas (5 por módulo), umbral 80%, reintentos ilimitados, revisión post-entrega paginada con fundamentos, resultado en `localStorage` (`aprecap_examen_baston-y-esposas_*`).
55. **Verificación**: tsc OK; 33 preguntas sin defectos (0 vacías, 4 opciones c/u, módulos ≥5); headless OK en examen bastón (20 preguntas), examen CCTV (sin regresión, 60) y materiales bastón (paso quiz + link examen).
56. **Pendiente**: commit+push de esta sesión.

### O. Revisión del cliente: Reglamento 209 + Legislación aplicada — curso Supervisor (2026-08-18)
57. **Documentos de la revisión** en `C:\Users\Vickoto\Desktop\supervisor revisado\`: `Curso_Supervisor_Consolidado.docx` (notas a mano: agregar "PUNTO 1-2 Reglamento 209" como módulo, módulo de "LEGISLACIÓN APLICADA A LA SEGURIDAD PRIVADA" basado en la Ley 21.659, contenido en rojo de 4.2/6.1 duplicado en el punto 2 amarillo), `Decreto-209_27-MAY-2025 (1).pdf` (136 artículos, publicado 27-MAY-2025) y `legislación aplicable a la seguridad privada.docx` (613 párrafos: Ley 21.659 con sanciones 650–13.500 UTM y seguro 132 UF, derecho penal, flagrancia art. 129 CPP, Ley Karin, DD.HH., uso de la fuerza, Ley 21.719, Res. 1185).
58. **Módulo 1 reordenado (decisión del cliente)**: nuevos submódulos **1.2** (Reglamento 209 — resumen), **1.3** (Ley 21.659 en la práctica), **1.4** (Derecho penal y detención), **1.5** (DD.HH., uso de la fuerza y datos personales); el antiguo 1.2 (Ley 16.744) → **1.6** y el 1.3 (DS 594) → **1.7** (renombrados con `git mv`). Total 18 submódulos + 6 consolidados.
59. **Actualizaciones**: Modulo_3 y 3.1 corrigen "Decreto Supremo N° 209 (2024)" → publicado 27-MAY-2025, con detalle de artículos (guardias 87–94, seguro 132 UF, jefe/encargado 22–24, supervisor 108, plataforma 115, registro 118–127, fiscalización OS-10 128–136); Modulo_1.1 + Res. N° 1.185 (turnos 4x4/5x5/6x6/7x7 de 12 h o 6x2 de 8 h + 6 días anuales); Modulo_4.2 + definiciones Ley Karin (violencia por terceros, acoso laboral, acoso sexual); Modulo_6.1 + derechos/deberes de los asistentes; Modulo_6.2 + datos personales (Ley 21.719/19.628); Modulo_6.3 + detención en flagrancia (5 situaciones) y acta de entrega; consolidado Modulo_1 retitulado con los 7 submódulos.
60. **Docx regenerado**: `scripts/md_to_docx_supervisor.py` (SUBMODULOS 18, OUT `C:\Users\Vickoto\Desktop\Curso_Supervisor_Consolidado_v2.docx`). Verificación: grep de palabras prohibidas → 0 (solo falsos positivos "actividad preventiva"); 24 MDs con estructura y "Reglas de oro" correctas.
61. **Pendiente**: commit+push; montar el curso en la plataforma cuando el cliente entregue PDFs y links de YouTube (patrón bastón/CCTV).

### P. Curso Supervisor montado en la plataforma (18 submódulos) (2026-08-18)
62. **Materiales del cliente**: `C:\Users\Vickoto\Downloads\supervisor aprecap\` (6 carpetas, 18 MP4 + 18 PDFs) + `videos supervisor.txt`. Links verificados con oEmbed de YouTube (18/18 resuelven al título correcto); faltaba el link de `Seguridad_Laboral.mp4` → el cliente lo aportó (`7jFHf8I_vNw`).
63. **Emparejamiento por carpeta/nombre**: "Seguridad y Sus Límites" (`k-aQSMYdK5c`) está en la carpeta `modulo 1` → 1.7 DS 594 (el txt del cliente lo agrupaba mal en módulo 2); M1 queda 7/7 y M2 con Prevención de Riesgos (2.1) + Seguridad Laboral (2.2).
64. **`videos supervisor.txt` arreglado**: 18 videos en orden de submódulos, nombres normalizados, link de Seguridad Laboral agregado.
65. **18 PDFs a Sanity** (`scripts/upload-supervisor-pdfs-sanity.mjs`, patrón bastón idempotente; mapeo `scripts/sanity-supervisor-pdf-urls.json` local): Guía_Técnica_DS_209, Labor_Compliance_Essentials, Ley_21.659_Security_Framework, Security_Legal_Manual, Seguridad_Privada_Integral, Seguro_Social_Ley_16744, Workplace_Safety_Blueprint, Tactical_Risk_Prevention, Tactical_Fire_Safety, Private_Security_Operational_Blueprint, Strategic_Security_Architecture, Liderazgo_y_Supervisión_de_Equipos, Conflict_Management_and_Ley_Karin, Integrated_Security_Systems, Tactical_Communication_Manual, Mass_Event_Security_Management, Operational_Security_Documentation, Manual_Operativo_de_Seguridad.
66. **Curso en plataforma** (`materiales-estudio.ts`): `supervisor-de-seguridad` → 6 módulos × 18 submódulos (`sup-X-Y`) con `videoUrl` + `pdfUrl` Sanity; eliminados slides y PDF placeholder; sin `banco` (solo video → PDF → completado, decisión del cliente). Panel alumno (tarjeta CURSO 3) y diploma ya existían.
67. **Verificación**: tsc OK; headless en server temporal (3001) → 6 módulos, iframe video activo y PDF Sanity por submódulo; sin paso quiz. Server dev del usuario (3000) restaurado con el contenido nuevo (estaba con datos viejos en caché).
68. **Pendiente**: commit+push de esta sesión.

### G. Curso Bastón y Esposas — MDs listos (nuevo)
22. **MDs del curso Bastón y Esposas** creados en `docs/markdown_cursos/5_Baston_y_Esposas/` con las mismas reglas que CCTV (solo info de estudio, sin menciones a plataformas externas, sin actividades prácticas ni quizzes):
    - **11 submódulos** (1.1 DPP y factor sorpresa · 1.2 Tiempo/distancia y distancia preventiva · 1.3 Conciencia situacional · 1.4 Legítima defensa · 2.1 Comunicación persuasiva y desescalada · 2.2 Palancas y torsiones · 2.3 Técnicas vs tácticas · 3.1 Línea y niveles del uso de la fuerza · 3.2 Marco legal (Ley 21.659, D.S. 209, Código Penal) · 4.1 Bastón telescópico y zonas de golpeo · 4.2 Esposas) + **4 MDs consolidados** por módulo (referencia).
    - Fuente principal: manual del cliente `Curso bastón y esposas presentación.pdf` (18 páginas, OCR → `scripts/baston-extraidos/`, script `scripts/ocr_baston_manual.py`). Enriquecido solo con fuentes verificables (Código Penal: legítima defensa; Ley 21.659 y D.S. 209 del Diario Oficial ya en el repo; estándares generales de defensa personal y distancia de reacción). **Nada copiado de Sarmat** (sus PDFs/videos quedaron excluidos por instrucción del cliente).
    - **Pendiente del cliente:** generar los PDFs en NotebookLM y grabar/aportar los videos del curso (no existen videos propios de Aprecap de bastón y esposas).

---

## ⏳ TAREAS PENDIENTES Y PRÓXIMOS PASOS

- [ ] **Verificar certificado digital con datos reales** (el alumno imprime su diploma; validar nombre/RUT/fecha/curso y la impresión a PDF en navegador).
- [ ] **Editor de certificados estilo Sarmat para admin** (pendiente): replicar `CertificadosTab` (WYSIWYG: textos/colores/imágenes arrastrables + PDF con `@react-pdf/renderer`) en `/panel/admin` de Aprecap. Ruta de referencia verificada: Sarmat `/admin` → pestaña "🎓 Generar Certificados".
- [ ] **Curso de Bastón y Esposas (en curso):** los 11 MDs de submódulos ya están listos en `docs/markdown_cursos/5_Baston_y_Esposas/`. Falta: cliente genera PDFs (NotebookLM) + graba/aporta videos del curso → luego se monta en la plataforma (Sanity + YouTube, flujo video → PDF como CCTV).
- [ ] **Curso Supervisor — montaje en plataforma (en curso):** ✅ **MDs completados (2026-08-18)**: 18 submódulos (Módulo 1 reordenado con Reglamento 209, Ley 21.659, Derecho penal y DD.HH.) + 6 consolidados, docx de revisión `Curso_Supervisor_Consolidado_v2.docx` — ver sección O. ✅ **Plataforma montada (2026-08-18)**: 18 submódulos con video YouTube + PDF Sanity, `videos supervisor.txt` arreglado — ver sección P. Queda pendiente solo si el cliente pide quizzes/examen.
- [ ] **Quizzes/Cuestionarios del curso CCTV** ✅ **COMPLETADO (2026-08-18)**: banco de 63 preguntas, MiniQuiz de 5 por módulo y Examen Final de 60 preguntas (80%, reintentos ilimitados) — ver sección J.
- [ ] **ELIMINAR MODO DEMO ANTES DE PRODUCCIÓN (importante):**
  - Quitar el botón temporal "🧪 Test Curso OS-10" del `Header.tsx` (comentario `TEMP-TEST`, menú escritorio y móvil).
  - Quitar el modo demo (`?demo=1` + sessionStorage `aprecap_demo`): `lib/useModoDemo.ts`, prop `modoDemo` en `MiniQuiz.tsx` y `FinalExam.tsx`, badges "🧪 DEMO" y estilos `.demoBox`.
- [ ] **Registrar origins en CORS de Sanity** (panel sanity.io/manage): `http://localhost:3000` y el dominio Cloudflare, para poder usar `cdn.sanity.io` directo sin el proxy `/api/pdf`.
- [ ] **Persistencia de resultados en Firestore** (hoy puntajes de cuestionarios y progreso se guardan en localStorage): replicar Sarmat (Firestore + límite de intentos + candados de módulos).
- [ ] **Configuración de CORS (producción):** agregar URLs de `localhost` y Cloudflare en **Sanity** y **Firebase**.
- [ ] **Pase a Producción (Restricción de Permisos):**
  - Reactivar la lógica de bloqueo condicional por permisos Firestore (`accesoCCTV`, `accesoSupervisor`, `accesoJefe`) en `web/src/app/panel/alumno/page.tsx`.
  - Añadir candados de módulos/examen estilo Sarmat.
- [ ] **Ejercicios Prácticos Interactivos:** compilar `docs/EJERCICIOS_PRACTICOS_INTERACTIVOS.md` (Libro de Novedades, Informes OS-10, Pautas de Puesto).
- [ ] **Tareas del cliente anteriores aún vivas:** WP user/pass (rescatar lecciones LearnPress), confirmar horas del Jefe de Seguridad (420/140/400), PDF del acuerdo firmado.

---

## 🔑 Credenciales del Sistema

- **Sanity CMS Project ID:** `mwwotgjc` · Dataset: `production`
- **Repositorio GitHub:** `https://github.com/webaprecap/aprecap.git` (Rama `main`)
- **Materiales locales del cliente:**
  - OS-10: `C:\Users\Vickoto\Downloads\os10 aprecap\` (PDFs, videos y cuestionarios)
  - CCTV: `C:\Users\Vickoto\Downloads\cctv aprecap\` (22 videos + 22 PDFs renombrados `Modulo_X.Y_...`)
  - Bastón y esposas: `C:\Users\Vickoto\Downloads\os10 aprecap\cuestionarios\Curso bastón y esposas presentación.pptx` (reservado)
