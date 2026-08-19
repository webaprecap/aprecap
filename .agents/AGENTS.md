# Reglas del Proyecto APRECAP

## Control de Accesos a Cursos en Producción
- Durante el desarrollo local, todos los cursos (Guardia OS-10, Operador CCTV, Supervisor de Seguridad) se mantienen desbloqueados para previsualización inmediata del cliente.
- **IMPORTANTE ANTES DE PRODUCCIÓN:** Volver a activar la lógica de bloqueo condicional por permisos Firestore (`accesoCCTV`, `accesoSupervisor`) en `web/src/app/panel/alumno/page.tsx` para que requieran solicitud y aprobación administrativa.
