# 🚀 Checklist de Despliegue a Producción - Instituto APRECAP

> Checklist completo de flujo de cursos, candados y seguridad:
> **`docs/PRE_PRODUCCION_FLUJO_CURSOS.md`** (candados por módulo, examen bloqueado,
> progreso Firestore, acceso aprobado por admin, intentos ilimitados, legal 21.719/21.663,
> deploy de `firestore.rules`, requisitos Ley 21.659 Art. 46, quitar vista previa de exámenes).

## ⚠️ TAREAS PENDIENTES ANTES DEL PASE A PRODUCCIÓN:

- [ ] **Restricción de Accesos / Bloqueo de Cursos en el Panel del Alumno:**
  - En modo desarrollo actual, los 4 cursos (OS-10, CCTV y Alarmas, Supervisor de Seguridad y Bastón y Esposas) se dejaron **DESBLOQUEADOS** para facilitar la revisión de contenidos.
  - **Antes de lanzar a Producción:** Re-activar en `web/src/app/panel/alumno/page.tsx` el control de permisos de Firestore (`accesoCCTV`, `accesoSupervisor`) de modo que solo OS-10 esté desbloqueado por defecto y los demás requieran la aprobación manual del Administrador vía solicitud de permiso.

- [ ] **Candados de módulos y examen final:** ver checklist en `docs/PRE_PRODUCCION_FLUJO_CURSOS.md` (módulo siguiente desbloqueado al aprobar quiz; examen final bloqueado hasta completar módulos; VideoTracker).

- [ ] **Deploy de reglas de Firestore:** `firebase deploy --only firestore:rules` (archivo `firestore.rules` en la raíz).

- [ ] **Quitar herramientas internas antes de producción:** botón "🧪 Vista previa exámenes" del navbar y página `/prueba-felicitaciones`.

- [ ] **Revisión de Variables de Entorno (.env):**
  - Asegurar `SANITY_API_TOKEN` y `NEXT_PUBLIC_SANITY_PROJECT_ID=mwwotgjc`.
  - Asegurar credenciales de Webpay Plus y Firebase Firestore en el dashboard de producción.
