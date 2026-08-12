# 📐 Plan del Proyecto - Instituto APRECAP

## 🎯 Estrategia y Visión General
El proyecto APRECAP busca construir una plataforma educativa y campus virtual moderno (estilo SARMAT) para la formación de profesionales en Seguridad Privada en Chile (Guardia OS-10, Operador CCTV, Supervisor de Seguridad y Jefe de Seguridad Privada).

---

## 🛠️ Arquitectura de Desarrollo de Contenidos

### 1. Extracción Completa a Markdown (`docs/markdown_cursos/`)
- En lugar de saturar el código fuente con textos gigantescos, **el 100% del texto teórico** de todos los manuales y PDFs oficiales se extrae a archivos de formato Markdown (`.md`) dentro de `d:/aprecap/docs/markdown_cursos/`.
- La información está segmentada por **Cursos, Módulos y Sub-Módulos (`1.1`, `1.2`, `1.3`, `2.1`...)** plana por plana.

### 2. Creación de Diapositivas PPT y Grabación de Videos
- El equipo docente utilizará los archivos `.md` como guion base para armar las presentaciones PPT oficiales y grabar los videos explicativos por módulo.
- Una vez finalizados, las presentaciones PPT se convertirán a PDF y se subirán a **Sanity CMS** (`mwwotgjc`) para su visualización desde el visor interactivo de diapositivas en la web.

### 3. Ejercicios Prácticos e Interactivos en Código
- Se compilará en `docs/EJERCICIOS_PRACTICOS_INTERACTIVOS.md` la lista de actividades prácticas (Libros de Novedades, Informes de Incidente OS-10, Pautas de Puesto, Consolas CCTV).
- Estos formularios e interactivos se programarán a medida en React/Next.js para que el alumno escriba y practique directamente en pantalla.

### 4. Control de Permisos y Pase a Producción
- **En Desarrollo Local:** Todos los cursos se mantienen desbloqueados para previsualización inmediata.
- **Antes de Producción:** Se re-activará la lógica de bloqueo condicional por permisos Firestore (`accesoCCTV`, `accesoSupervisor`, `accesoJefe`) en `web/src/app/panel/alumno/page.tsx` para requerir solicitud y aprobación administrativa previa.
