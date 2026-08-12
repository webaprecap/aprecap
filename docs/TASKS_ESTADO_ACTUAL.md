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

---

## ⏳ TAREAS PENDIENTES Y PRÓXIMOS PASOS

- [ ] **Construcción de Ejercicios Prácticos Interactivos:**
  - Compilar `docs/EJERCICIOS_PRACTICOS_INTERACTIVOS.md` con los formularios y casos prácticos donde el alumno debe escribir o simular tareas en pantalla (Libro de Novedades, Informes OS-10, Pautas de Puesto).
- [ ] **ELIMINAR MODO DEMO ANTES DE PRODUCCIÓN (importante):**
  - Quitar el botón temporal "🧪 Test Curso OS-10" del `Header.tsx` (buscar comentario `TEMP-TEST`, está en menú escritorio y móvil).
  - Quitar el modo demo (`?demo=1` + sessionStorage `aprecap_demo`): hook `web/src/lib/useModoDemo.ts`, prop `modoDemo` en `MiniQuiz.tsx` y `FinalExam.tsx`, badges "🧪 DEMO" y estilos `.demoBox` de los CSS. Solo se activa al entrar por el botón de test o con `?demo=1`; el flujo normal no se ve afectado.
- [ ] **Subir PDFs oficiales a Sanity** (hoy Sanity solo tiene `studySlide`; los 9 PDFs están en `web/public/materiales/os10/`).
- [ ] **Persistencia de resultados en Firestore** (hoy examen y progreso se guardan en localStorage; en producción replicar Sarmat: Firestore + límite de intentos + candados de módulos).
- [ ] **Configuración de CORS (Producción):**
  - Agregar URLs de `localhost` y Cloudflare en la configuración de **Sanity CMS**.
  - Agregar URLs de `localhost` y Cloudflare en la configuración de **Firebase**.
- [ ] **Pase a Producción (Restricción de Permisos):**
  - **IMPORTANTE:** Antes del despliegue en servidor de producción, volver a habilitar la lógica de bloqueo condicional por permisos Firestore (`accesoCCTV`, `accesoSupervisor`, `accesoJefe`) en `web/src/app/panel/alumno/page.tsx`, y añadir los candados de módulos/examen estilo Sarmat.

---

## 🔑 Credenciales del Sistema

- **Sanity CMS Project ID:** `mwwotgjc`
- **Sanity Dataset:** `production`
- **Repositorio GitHub:** `https://github.com/webaprecap/aprecap.git` (Rama `main`)
