# Plan de Implementación: Sección Cursos OTEC (Laborales y Técnicos)

> **Documento de Especificación y Plan de Tareas**  
> **Fecha:** Septiembre 2026  
> **Estado:** 📋 PLANIFICACIÓN (Sin cambios de código en ejecución hasta aprobación)

---

## 1. Resumen del Proyecto

Crear y estructurar la sección interactiva **Cursos OTEC** (Cursos Laborales y Oficios Técnicos rescatados), donde cada curso cuenta con su propio espacio interactivo dedicado:
- **Selector de Videos**: Cada video de YouTube cuenta con su propio botón individual y reproductor integrado.
- **Selector de Documentos y Manuales PDF**: Cada PDF se presenta con un **nombre descriptivo real** (identificado a partir de su contenido y temática, eliminando nombres genéricos como "M1", "M2").
- **Visualizador por Tipo de Cajón**: Se analizó el formato físico de todos los archivos rescatados, determinando que el 100% corresponden a **Documentos A4 Verticales (596 x 842 pt)**, requiriendo un visor de documentos verticales con lectura continua, zoom y descarga, sin subir los archivos a Sanity (servidos localmente desde la plataforma).

---

## 2. Inventario Detallado de Cursos, Nombres Reales de PDFs y Videos

### 1. 💻 Alfabetización Digital
* **Slug sugerido:** `alfabetizacion-digital`
* **Categoría:** Competencias Digitales y Ofimática
* **Formato de Documentos:** A4 Vertical (Lectura de manual)
* **Manuales y Documentos PDF Renombrados:**
  1. `PROGRAMA_CURSO_1_1_.pdf` ➔ **Programa Oficial del Curso: Alfabetización Digital**
  2. `M1_4_.pdf` ➔ **Módulo 1: Exploración Tecnológica y Conceptos del Computador**
  3. `M2_1_.pdf` ➔ **Módulo 2: Procesador de Texto Microsoft Word**
  4. `M3_1_.pdf` ➔ **Módulo 3: Planillas de Cálculo Microsoft Excel**
  5. `M4.pdf` ➔ **Módulo 4: Navegación en Internet y Correo Electrónico (Gmail)**
  6. `M5.pdf` ➔ **Módulo 5: Presentaciones Efectivas en Microsoft PowerPoint**
* **Botones de Videos Educativos (YouTube):**
  - 🎬 **Botón 1:** *Microaprendizaje: ¿Qué es una Computadora?* (`https://www.youtube.com/watch?v=xL8C5CIxDts`)
  - 🎬 **Botón 2:** *Introducción Práctica a Word* (`https://www.youtube.com/watch?v=pbvwCTld8BA`)
  - 🎬 **Botón 3:** *Excel Básico en 10 Minutos* (`https://www.youtube.com/watch?v=pDwZV7V7ECM`)
  - 🎬 **Botón 4:** *Conocimientos Básicos de Gmail* (`https://www.youtube.com/watch?v=OmmevPt_dSk`)
  - 🎬 **Botón 5:** *Cómo Diseñar Presentaciones en PowerPoint* (`https://www.youtube.com/watch?v=LIXfGkAca0g`)

---

### 2. 🏗️ Grúa Horquilla
* **Slug sugerido:** `grua-horquilla`
* **Categoría:** Operaciones y Maquinaria Pesada
* **Formato de Documentos:** A4 Vertical
* **Manuales y Documentos PDF Renombrados:**
  1. `PROGRAMA_DEL_CURSO_6_.pdf` ➔ **Programa del Curso: Operación Segura de Grúa Horquilla**
  2. `M1_4_.pdf` ➔ **Módulo 1: Conceptos Básicos y Componentes Principales de la Grúa Horquilla**
  3. `M2_1_.pdf` ➔ **Módulo 2: Normas de Seguridad Operacional y Estándares de Maniobra**
* **Botones de Videos Educativos (YouTube):**
  - 🎬 **Botón 1:** *Curso Teórico de Grúa Horquilla* (`https://www.youtube.com/watch?v=-P-0plrSlMI`)
  - 🎬 **Botón 2:** *Operación Segura de Grúa Horquilla en Terreno* (`https://www.youtube.com/watch?v=delOYWnWzK4`)
  - 🎬 **Botón 3:** *Prevención de Riesgos en la Operación de Grúas* (`https://www.youtube.com/watch?v=a_VoudzNlVY`)
  - 🎬 **Botón 4:** *Normas de Seguridad y Señalización de Maniobras* (`https://www.youtube.com/watch?v=7vYjlXDs5XE`)

---

### 3. 🪜 Trabajo en Altura
* **Slug sugerido:** `trabajo-en-altura`
* **Categoría:** Prevención de Riesgos Industriales
* **Formato de Documentos:** A4 Vertical
* **Manuales y Documentos PDF Renombrados:**
  1. `PROGRAMA_DEL_CURSO_6_.pdf` ➔ **Programa del Curso: Prevención y Trabajo Seguro en Altura**
  2. `M1_4_.pdf` ➔ **Módulo 1: Fundamentos y Lineamientos Técnicos del Trabajo en Altura**
  3. `M2_1_.pdf` ➔ **Módulo 2: Definiciones, Abreviaturas y Equipos de Protección Personal (EPP)**
  4. `M3_1_.pdf` ➔ **Módulo 3: Medidas de Seguridad y Evaluación de Salud Compatible**
  5. `M4.pdf` ➔ **Módulo 4: Trabajo Seguro en Andamios y Plataformas Elevadoras**
  6. `M5.pdf` ➔ **Módulo 5: Procedimientos y Protocolos de Respuesta ante Emergencias en Altura**
  7. `M6.pdf` ➔ **Módulo 6: Glosario Técnico y Sistemas de Detención de Caídas (SPDC)**
  8. `Ficha_Dia_logo_Seguridad.pdf` ➔ **Anexo Técnico: Ficha de Diálogo y Charla de Seguridad de 5 Minutos**
* **Botones de Videos Educativos (YouTube):**
  - 🎬 **Botón 1:** *Charla de Seguridad 5 Minutos: Trabajo Seguro en Altura* (`https://www.youtube.com/watch?v=CsOuAbrm2NQ`)

---

### 4. ☣️ Manejo de Sustancias Peligrosas
* **Slug sugerido:** `manejo-de-sustancias-peligrosas`
* **Categoría:** Sustancias Químicas y Medio Ambiente
* **Formato de Documentos:** A4 Vertical
* **Manuales y Documentos PDF Renombrados:**
  1. `PROGRAMA_DEL_CURSO_6_.pdf` ➔ **Programa del Curso: Manejo y Almacenamiento de Sustancias Peligrosas**
  2. `M1_4_.pdf` ➔ **Módulo 1: Definición, Criterios y Clasificación de Sustancias Peligrosas**
  3. `M2_1_.pdf` ➔ **Módulo 2: Identificación de Riesgos y Asignación de Números NU**
  4. `ANEXO_M2_1_.pdf` ➔ **Anexo Módulo 2: Códigos de Identificación en Contenedores Intermodales**
  5. `M3_1_.pdf` ➔ **Módulo 3: Intensificación de Riesgos y Manejo de Cilindros de Gas**
  6. `M4.pdf` ➔ **Módulo 4: Etiquetado de Envases Químicos según Estándares Internacionales (GHS/UE)**
  7. `M5.pdf` ➔ **Módulo 5: Hojas de Datos de Seguridad Norma Chilena NCh-2245**
  8. `5.2_Formato_de_Presentacio_n_de_una_HDS.pdf` ➔ **Guía 5.2: Formato Oficial de Presentación de una HDS**
  9. `5.4_Formato_de_Presentacio_n_de_una_HDST.pdf` ➔ **Guía 5.4: Formato Oficial de Presentación de una HDST**
* **Botones de Videos Educativos (YouTube):**
  - 🎬 **Botón 1:** *Fundamentos del Manejo de Sustancias Peligrosas* (`https://www.youtube.com/watch?v=jqmVDLhPIT8`)
  - 🎬 **Botón 2:** *Etiquetas y Clases de Sustancias Químicas* (`https://www.youtube.com/watch?v=3YgFdAOl4jM`)
  - 🎬 **Botón 3:** *Paneles Naranjas y Señalética ADR para Mercancías Peligrosas* (`https://www.youtube.com/watch?v=KNzAetAbgBc`)
  - 🎬 **Botón 4:** *Interpretación de Hojas de Seguridad HDS* (`https://www.youtube.com/watch?v=oCMtUyClFWA`)

---

### 5. 🧠 Técnicas de Autocuidado y Manejo de Estrés
* **Slug sugerido:** `tecnicas-de-autocuidado-y-manejo-de-estres`
* **Categoría:** Salud Ocupacional y Bienestar Laboral
* **Formato de Documentos:** A4 Vertical
* **Manuales y Documentos PDF Renombrados:**
  1. `PROGRAMA_DEL_CURSO.pdf` ➔ **Programa del Curso: Manejo de Emociones y Estrés en Situaciones de Crisis**
  2. `M1.pdf` ➔ **Módulo 1: Manejo de Crisis, Autoevaluación y Gestión del Estrés Laboral**
  3. `M2.pdf` ➔ **Módulo 2: Gestión de las Relaciones e Inteligencia Emocional en Equipos**
  4. `M3.pdf` ➔ **Módulo 3: Autogestión de las Emociones y Conducta ante Situaciones Críticas**
* **Botones de Videos Educativos (YouTube):**
  - 🎬 **Botón 1:** *Técnicas de Gestión del Estrés Laboral* (`https://www.youtube.com/watch?v=iIhGymicgtg`)
  - 🎬 **Botón 2:** *Beneficios del Mindfulness en el Trabajo* (`https://www.youtube.com/watch?v=awB9G2WZ_2w`)
  - 🎬 **Botón 3:** *Manejo del Estrés en Escenarios de Alta Presión* (`https://www.youtube.com/watch?v=mijHfogjbtk`)
  - 🎬 **Botón 4:** *Primeros Auxilios Psicológicos y Contención Emocional* (`https://www.youtube.com/watch?v=xDH5BMXIRWg`)
  - 🎬 **Botón 5:** *Comunicación Asertiva y Empática* (`https://www.youtube.com/watch?v=YBWIMFjzy5o`)
  - 🎬 **Botón 6:** *Pensamiento Positivo y Resiliencia Ocupacional* (`https://www.youtube.com/watch?v=XPA2KMQrvQM`)

---

### 6. 👥 Técnicas de Liderazgo Efectivo y Trabajo en Equipo
* **Slug sugerido:** `tecnicas-de-liderazgo-efectivo`
* **Categoría:** Liderazgo, Gestión y Habilidades Blandas
* **Formato de Documentos:** A4 Vertical
* **Manuales y Documentos PDF Renombrados:**
  1. `PROGRAMA_DEL_CURSO.pdf` ➔ **Programa del Curso: Liderazgo para Trabajo en Equipo y Gestión de Personas**
  2. `M1.pdf` ➔ **Módulo 1: La Motivación Humana y Claves para la Automotivación**
  3. `M2.pdf` ➔ **Módulo 2: La Comunicación Asertiva en el Ámbito Organizacional**
  4. `M3.pdf` ➔ **Módulo 3: La Asertividad y Resolución de Conflictos Laborales**
  5. `M4.pdf` ➔ **Módulo 4: Trabajo en Equipo, Sinergia y Cohesión Grupal**
  6. `M5.pdf` ➔ **Módulo 5: Técnicas y Estrategias para Liderar Equipos de Alto Desempeño**
  7. `M6.pdf` ➔ **Módulo 6: Gestión, Acompañamiento y Dirección de Personas**
* **Botones de Videos Educativos (YouTube):**
  - 🎬 **Botón 1:** *La Motivación • Cómo Motivarse a Uno Mismo* (`https://www.youtube.com/watch?v=haSDDcvjn3k`)
  - 🎬 **Botón 2:** *Comunicación Efectiva • Cómo Mejorar la Comunicación de Equipo* (`https://www.youtube.com/watch?v=YBWIMFjzy5o`)
  - 🎬 **Botón 3:** *La Importancia del Trabajo en Equipo en las Empresas* (`https://www.youtube.com/watch?v=LZGl-1FX_HA`)
  - 🎬 **Botón 4:** *Cómo Ser un Buen Líder • 5 Estrategias Prácticas de Liderazgo* (`https://www.youtube.com/watch?v=16z28DjRTAA`)
  - 🎬 **Botón 5:** *Claves para una Buena Gestión de Personas* (`https://www.youtube.com/watch?v=3dsJXtwH4ds`)

---

### 7. 🕳️ Trabajo en Espacios Confinados
* **Slug sugerido:** `trabajo-en-espacios-confinados`
* **Categoría:** Seguridad Industrial y Espacios Críticos
* **Formato de Documentos:** A4 Vertical
* **Manuales y Documentos PDF Renombrados:**
  1. `TRABAJO_EN_ESPACIOS_CONFINADOS_1_.pdf` ➔ **Programa del Curso: Trabajo Seguro en Espacios Confinados**
  2. `M1.pdf` ➔ **Módulo 1: Introducción, Riesgos Generales y Específicos**
  3. `TALLER_M1.pdf` ➔ **Taller Práctico Módulo 1: Medición de Atmósferas y Permisos de Ingreso**
  4. `M2.pdf` ➔ **Módulo 2: Procedimientos de Trabajo y Equipos de Seguridad**
  5. `M3.pdf` ➔ **Módulo 3: Guía Técnica y Marco Normativo de Aplicación**

---

### 8. 🤝 Gestión y Promoción del Buen Trato
* **Slug sugerido:** `gestion-y-promocion-del-buen-trato`
* **Categoría:** Clima Laboral y Relaciones Humanas
* **Formato de Documentos:** A4 Vertical
* **Manuales y Documentos PDF Renombrados:**
  1. `Programa_BT.pdf` ➔ **Programa Oficial: Gestión y Promoción del Buen Trato Laboral**

---

### 9. ⚙️ Operador de Calderas y Generadores de Vapor
* **Slug sugerido:** `operador-de-calderas`
* **Categoría:** Especialidades Técnicas e Instalaciones Térmicas
* **Formato de Documentos:** A4 Vertical
* **Manuales y Documentos PDF Renombrados:**
  1. `GENERALIDADES-CURSO-OPERADOR-DE-CALDERAS-Y-GENERADORES-DE-VAPOR.pdf` ➔ **Programa Oficial: Generalidades y Competencias del Operador de Calderas**
  2. `Curso-Operador-de-Calderas-y-Generadores-de-Vapor.pdf` ➔ **Manual Integral: Operación Segura y Mantenimiento de Generadores de Vapor (Decreto Supremo N° 10)**

---

## 3. Especificación del Diseño y Cajones de Visualización

### A. Estructura de la Página del Curso (`/cursos-otec/[slug]`)
1. **Encabezado del Curso**: Título oficial, categoría de la OTEC, duración sugerida, badge de certificación SENCE / OTEC APRECAP y botón de inscripción rápida.
2. **Zona de Contenidos Interactivos**:
   - **Pestaña / Bloque de Videos**:
     - Fila de botones interactivos (`🎬 Video 1`, `🎬 Video 2`, etc.) con título y duración.
     - Reproductor dinámico de YouTube (incrustación segura con preview y controles).
   - **Pestaña / Bloque de Manuales y Documentos PDF**:
     - Lista de botones o tarjetas con los **nombres reales** de cada manual.
     - Visor tipo **Cajón A4**:
       - Contenedor con aspect-ratio A4 vertical.
       - Controles integrados: Zoom (+ / -), página anterior/siguiente, modo pantalla completa y descarga directa.
       - Barra de progreso de lectura.

### B. Distribución de Archivos Locales (Sin Sanity)
- Los PDFs se ubicarán en `web/public/documentos-otec/[slug]/` para servir de manera estática y ultrarrápida sin depender de servicios externos hasta que el cliente ordene su carga a un CDN o Sanity.

---

## 4. Plan de Tareas por Fases

- [ ] **Fase 1: Preparación de Datos y Catálogo**
  - [ ] Crear estructura de datos centralizada `web/src/data/cursos-otec-laborales.ts` con todos los cursos, videos de YouTube y PDFs con sus nombres descriptivos.
  - [ ] Organizar y copiar los PDFs rescatados en `web/public/documentos-otec/[slug]/`.

- [ ] **Fase 2: Componentes de Visualización**
  - [ ] Crear el componente `CajonVisorA4.tsx` adaptado a manuales verticales (scroll fluido, paginación, zoom, botón de descarga).
  - [ ] Crear el componente `SelectorVideosOTEC.tsx` con botones independientes para cada video de YouTube.

- [ ] **Fase 3: Páginas y Rutas**
  - [ ] Crear la página de catálogo `/cursos-otec` o sección integrada en el home y menú.
  - [ ] Crear la plantilla dinámica `/cursos-otec/[slug]` con layout responsive (panel lateral de selección + cajón central de lectura y video).

- [ ] **Fase 4: Verificación y Pruebas**
  - [ ] Comprobar renderizado de cada video y legibilidad de cada PDF en resoluciones desktop y móviles.
  - [ ] Ejecutar `npx tsc --noEmit` y `npm run build`.
