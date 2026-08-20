# Reglas del Proyecto APRECAP

## Control de Accesos a Cursos en Producción
- El control de accesos y permisos por Firestore (`accesoOS10`, `accesoCCTV`, `accesoSupervisor`, `accesoBaston` y colección `enrollments`) se encuentra **100% activo en producción**.
- Los alumnos sin matrícula o permiso aprobado ven los cursos bloqueados y deben solicitar acceso desde el panel del alumno para ser aprobados por la administración.
- Los roles `admin`, `superadmin` y `profesor` tienen acceso global irrestricto.
