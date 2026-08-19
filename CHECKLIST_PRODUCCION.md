# 🚀 Checklist de Despliegue a Producción - Instituto APRECAP

## ⚠️ TAREAS PENDIENTES ANTES DEL PASE A PRODUCCIÓN:

- [ ] **Restricción de Accesos / Bloqueo de Cursos en el Panel del Alumno:**
  - En modo desarrollo actual, los 3 cursos (OS-10, CCTV y Alarmas, Supervisor de Seguridad) se dejaron **DESBLOQUEADOS** para facilitar la revisión de contenidos.
  - **Antes de lanzar a Producción:** Re-activar en `web/src/app/panel/alumno/page.tsx` el control de permisos de Firestore (`accesoCCTV`, `accesoSupervisor`) de modo que solo OS-10 esté desbloqueado por defecto y los demás requieran la aprobación manual del Administrador vía solicitud de permiso.

- [ ] **Revisión de Variables de Entorno (.env):**
  - Asegurar `SANITY_API_TOKEN` y `NEXT_PUBLIC_SANITY_PROJECT_ID=mwwotgjc`.
  - Asegurar credenciales de Webpay Plus y Firebase Firestore en el dashboard de producción.
