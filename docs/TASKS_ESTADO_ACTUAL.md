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

---

## ⏳ TAREAS PENDIENTES Y PRÓXIMOS PASOS

- [ ] **Construcción de Ejercicios Prácticos Interactivos:**
  - Compilar `docs/EJERCICIOS_PRACTICOS_INTERACTIVOS.md` con los formularios y casos prácticos donde el alumno debe escribir o simular tareas en pantalla (Libro de Novedades, Informes OS-10, Pautas de Puesto).
- [ ] **Pase a Producción (Restricción de Permisos):**
  - **IMPORTANTE:** Antes del despliegue en servidor de producción, volver a habilitar la lógica de bloqueo condicional por permisos Firestore (`accesoCCTV`, `accesoSupervisor`, `accesoJefe`) en `web/src/app/panel/alumno/page.tsx`.

---

## 🔑 Credenciales del Sistema

- **Sanity CMS Project ID:** `mwwotgjc`
- **Sanity Dataset:** `production`
- **Repositorio GitHub:** `https://github.com/webaprecap/aprecap.git` (Rama `main`)
