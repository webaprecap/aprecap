# ⏳ Plan de Desbloqueo Progresivo por Tiempo (Drip Content)
## Cursos: Operador CCTV (4 Días) y Supervisor de Seguridad (7 Días)

---

## 🎯 1. Objetivo
Implementar un sistema de desbloqueo progresivo temporal para los cursos asincrónicos de **Operador CCTV** (4 días) y **Supervisor de Seguridad** (7 días), asegurando que el alumno avance según el ritmo pedagógico planificado y no complete todo el contenido en un solo día.

---

## 📅 2. Cronogramas Oficiales

### A. Curso Operador CCTV (4 Días Totales)
* **Día 1 (Inmediato):** Módulo 1 — Normativa Legal, Ley 21.659 y Principios de Seguridad (7 submódulos).
* **Día 2 (24 hrs):** Módulo 2 — Sistemas de CCTV, Alarmas y Monitoreo (7 submódulos).
* **Día 3 (48 hrs):** Módulo 3 — Televigilancia, Procedimientos y Operaciones (8 submódulos).
* **Día 4 (72 hrs):** 📝 **Examen Final CCTV** (60 preguntas, umbral 80%) y emisión de certificado al aprobar.

---

### B. Curso Supervisor de Seguridad (7 Días Totales)
* **Día 1 (Inmediato):** Módulo 1 — Normativa Laboral, Ley 21.659 y Reglamento 209 (7 submódulos).
* **Día 2 (24 hrs):** Módulo 2 — Prevención de Riesgos y Control de Emergencias (2 submódulos).
* **Día 3 (48 hrs):** Módulo 3 — Procedimientos de Gestión de Seguridad (2 submódulos).
* **Día 4 (72 hrs):** Módulo 4 — Liderazgo y Resolución de Conflictos (2 submódulos).
* **Día 5 (96 hrs):** Módulo 5 — Sistemas de Alarma, Comunicación y Enlace (2 submódulos).
* **Día 6 (120 hrs):** Módulo 6 — Eventos Masivos, Registros y Manejo de Incidentes (3 submódulos).
* **Día 7 (144 hrs):** 📝 **Examen Final Supervisor** (60 preguntas, umbral 80%) y emisión de certificado al aprobar.

---

## ⚙️ 3. Lógica Técnica y Reglas de Negocio

1. **Cálculo de Días Transcurridos**:
   * Se toma el campo `fechaAprobacion` o `enrolledAt` de la matrícula (`enrollments`) del alumno en Firestore.
   * `diasTranscurridos = Math.floor((Date.now() - fechaAprobacion.toMillis()) / (1000 * 60 * 60 * 24)) + 1`
   * Si `diasTranscurridos >= diaRequerido`, el módulo se desbloquea.

2. **Doble Condición de Desbloqueo**:
   * Para acceder a un módulo $N$, el alumno debe cumplir:
     1. **Tiempo transcurrido**: `diasTranscurridos >= diaRequerido`
     2. **Progreso previo**: Haber completado los módulos anteriores ($1 \dots N-1$).

3. **Bypass para Administradores y Profesores (Modo Auditoría)**:
   * Si `isAdmin === true` o el rol es `superadmin` / `admin` / `profesor`, los temporizadores quedan **100% deshabilitados** y pueden explorar cualquier módulo o examen en cualquier momento.

---

## 🎨 4. Interfaz de Usuario (UI / UX)

1. **Tarjeta del Módulo Bloqueado por Tiempo**:
   * Icono de candado con reloj: `🔒 Desbloqueo programado`.
   * Texto informativo: *"Disponible el [Fecha legible, ej: 24 de agosto] (Día X de tu curso)"*.
2. **Modal / Alerta Informativa**:
   * Si el alumno hace clic sobre un módulo futuro:
     *"⏳ Este módulo se habilitará el [Fecha] para cumplir con las horas pedagógicas exigidas por el plan formativo."*
3. **Banner de Tiempo en el Sidebar del Aula**:
   * Indicador visual: *"📅 Día X de [4/7] días de capacitación"*.

---

## 📋 5. Tareas para la Próxima Sesión

- [ ] Crear helper `lib/courseTiming.ts` con la matriz de días por curso (`getModuleUnlockStatus(cursoSlug, moduloIndex, fechaMatricula)`).
- [ ] Integrar validación de tiempo en `materiales/[slug]/page.tsx` (Sidebar y contenido principal).
- [ ] Integrar validación de tiempo en `evaluaciones/[slug]/page.tsx` para bloquear el examen final hasta el Día 4 (CCTV) / Día 7 (Supervisor).
- [ ] Mantener bypass irrestricto para `isAdmin` / `isProfesor`.
- [ ] Verificar con Chrome Headless el comportamiento para alumno vs administrador.
