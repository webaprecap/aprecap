# Flujo del Sistema de Cursos en Aprecap

Este documento explica el flujo completo de cómo se gestiona, sube y visualiza un curso (por ejemplo, OS-10 o CCTV) en la plataforma APRECAP. La lógica está basada en el flujo exitoso del proyecto Sarmat, donde Sanity CMS actúa como la única fuente de la verdad para el contenido y los archivos.

## 1. Subida del Material a Sanity CMS

El administrador o creador de contenido no necesita modificar el código de la plataforma web. Todo se maneja a través de Sanity.

1. **Creación del Módulo en Sanity**: 
   - Se crea un nuevo documento tipo `courseModule` o `studyMaterialModule`.
   - Se le asigna un título y un número de orden.
2. **Asignación del Video (YouTube)**:
   - Los videos de las clases se suben previamente a YouTube de forma "Oculta" (Unlisted).
   - El enlace de YouTube (ej. `https://youtu.be/...`) se pega en el campo correspondiente (ej. `introVideoUrl`).
3. **Subida del PDF (Final)**:
   - El manual o presentación (ya listo y unificado por módulo) se sube directamente a Sanity mediante un campo tipo `file` (ej. `pdfFile`). No es necesario subdividir los PDFs.
4. **Guardar y Publicar**: Al publicar, Sanity expone estos datos a través de GROQ queries.

## 2. Visualización en la Plataforma Web (Frontend)

Una vez que el estudiante ingresa al módulo en la plataforma de Aprecap, el flujo de aprendizaje interactivo sigue este orden:

### Paso A: Reproducción del Video (`VideoTracker.tsx`)
- El alumno es recibido por el componente `VideoTracker`.
- Este componente incrusta el video de YouTube en un `iframe` responsivo (16:9).
- **Control de avance**: El `VideoTracker` lleva un conteo de los segundos que el usuario lleva viendo el video. El botón de "Continuar" para avanzar a la lectura no se habilita hasta que el alumno haya visto un tiempo mínimo determinado, o hasta que finalice el video.
- En caso de que el video ya haya sido completado antes (repaso), se permite el salto inmediato.

### Paso B: Visor Interactivo de PDF (`PDFSwipeViewer.tsx`)
- Tras desbloquear el video, el alumno accede al `PDFSwipeViewer`.
- Este componente utiliza `react-pdf` para renderizar el archivo PDF que se descargó dinámicamente desde Sanity.
- **Interacción Estilo Libro**: Gracias a `framer-motion` y `react-swipeable`, el usuario puede pasar las páginas deslizando hacia los lados en dispositivos móviles o usando botones en escritorio.
- El PDF se adapta al ancho de la pantalla y permite activar un modo pantalla completa.

### Paso C: Evaluaciones (`MiniQuiz.tsx` y `FinalExam`)
- **Quizzes**: Al terminar de leer el PDF (llegar a la última página), el sistema desbloquea un pequeño cuestionario con preguntas extraídas del material Markdown/PDF.
- **Examen Final**: Al completar todos los módulos de un curso, el alumno rinde un Examen Final completo que certifica su comprensión.

## 3. Consideraciones Técnicas Adicionales
- **Branding Independiente**: Aunque el código base es similar a Sarmat, todos los estilos, colores (azul y rojo) y logotipos mostrados en el `PDFSwipeViewer` y el resto de los componentes son propios de Aprecap.
- **Configuración CORS**: Para asegurar que Sanity y Firebase funcionen correctamente al entregar y autorizar datos en producción, siempre deben estar agregadas las URLs de `localhost` (para desarrollo) y el dominio final / `cloudflare` en los paneles de control (Sanity CORS settings y Firebase Auth authorized domains).
