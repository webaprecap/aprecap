# MANUAL OPERATIVO Y GUÍA PASO A PASO
## Sistema de Clases en Vivo, Integración Zoom y Gestión de Anfitriones (Host)
### OTEC APRECAP — Plataforma de Capacitación y Campus Virtual

---

## 1. Introducción y Resumen del Ecosistema

Este documento sirve como manual oficial de procedimientos para los **Administradores** y **Docentes/Profesores** del Organismo Técnico de Capacitación **APRECAP**.

La plataforma integra la infraestructura de **Zoom** directamente en el portal web institucional (`aprecap.cl`), permitiendo dictar capacitaciones con transmisión en vivo protegida, control de acceso por matrícula y gestión completa de sesiones en la nube.

```mermaid
flowchart TD
    A["Administrador APRECAP"] -->|Crea / Programa clase| B["Campus Virtual APRECAP"]
    B -->|API Server-to-Server| C["Cuenta Zoom Institucional"]
    C -->|Genera| D["ID de Reunión + Contraseña + Start URL + Join URL"]
    D -->|Inyecta datos| B
    
    E["Docente / Profesor"] -->|Clic en '👑 Abrir en Zoom (Host)'| F["Inicia sesión como Anfitrión Principal"]
    A -->|Clic en '👑 Abrir en Zoom (Host)'| G["Ingresa como Anfitrión / Co-Anfitrión"]
    H["Alumno Matriculado"] -->|Entra a 'Aula Virtual'| I["Transmisión directa sin contraseñas"]
```

---

## 2. Guía Paso a Paso para Administradores

### A. Cómo Crear o Programar una Clase en Vivo

1. Ingresa a tu portal en **`aprecap.cl/login`** con tus credenciales de Administrador.
2. En el menú lateral, dirígete a la pestaña **"🔴 Clases en Vivo (Admin)"**.
3. En el formulario de creación:
   * **Nombre de la clase:** Escribe el título visible (ej. *Curso Guardia OS-10 - Módulo Marco Legal*).
   * **Curso asignado:** Selecciona el curso correspondiente (o *Global* para todos).
   * **Tipo de Horario:**
     * **En Vivo Inmediata (1 Clic):** Abre la sala en vivo al instante.
     * **Programada (Puntual):** Fija una fecha y rango de horas específico.
     * **Ciclo por Rango de Días:** Fija un período (ej. del 1 al 15 de un mes, de lunes a viernes de 08:00 a 15:00 hrs).
4. Haz clic en el botón verde **"⚡ Crear y Abrir Sala Zoom en Vivo (1 Clic)"** o **"🗓️ Programar con Zoom API"**.
5. **Listo:** La sala queda sincronizada en Zoom, registrada en Firestore y visible para docentes y alumnos autorizados.

---

### B. Dónde Ver las Credenciales y Contraseñas de la Sala

En cada tarjeta de clase en tu panel de administración dispones de los siguientes identificadores y herramientas:

| Elemento | Descripción | Acción |
| :--- | :--- | :--- |
| 🆔 **ID de Reunión** | Número único de 9 a 11 dígitos (ej. `881 9129 1790`). | Clic en **📋 Copiar** para enviarlo a quien use la App nativa. |
| 🔑 **Contraseña / Código** | Clave de acceso numérico generada por Zoom. | Clic en **📋 Copiar** en caso de que la App de Zoom la solicite. |
| 🔗 **Enlace Alumnos** | Enlace de invitación web directo. | Clic en **Copiar Enlace Alumnos** para compartir por WhatsApp o correo. |
| 👑 **Abrir en Zoom (Host)** | Botón dorado de acceso administrativo. | Abre la app de Zoom con control de **Anfitrión**. |
| 🚀 **Probar Aula Virtual** | Abre el reproductor web integrado de APRECAP. | Permite validar cómo ven la clase los alumnos. |

---

### C. Cómo Iniciar y Controlar la Clase como Anfitrión

1. En la tarjeta de la clase, haz clic en el botón dorado **`👑 Abrir en Zoom (Host)`**.
2. Tu navegador abrirá automáticamente la aplicación de Zoom reconociéndote como el **Anfitrión (Host)**.
3. Tendrás control completo para:
   * Compartir pantalla y audio de tu computador.
   * Grabar la clase en la nube de Zoom.
   * Silenciar a todos los participantes.
   * Nombrar Co-anfitriones al docente u otros administradores.

---

## 3. Guía Paso a Paso para Docentes / Profesores

### A. Cómo Acceder al Panel de Docente
1. Inicia sesión en **`aprecap.cl/login`** con tu cuenta de Profesor.
2. En la pantalla principal verás la sección **"📹 Sala de Clases Virtuales"** con todas las clases activas y programadas.

### B. Cómo Dictar la Clase y Compartir Pantalla
1. Ubica la clase que te corresponde dictar.
2. Haz clic en el botón dorado **`👑 Abrir en Zoom (Host)`**.
3. Al entrar a Zoom:
   * Si eres el primero en conectarte, serás el **Anfitrión Principal**.
   * Podrás presionar el botón verde **"Compartir pantalla"** para proyectar diapositivas, PDFs, videos y pizarras.
   * Si necesitas silenciar a los alumnos para iniciar tu explicación, abre **Participantes $\rightarrow$ Silenciar a todos**.

---

## 4. Gestión de Roles: Anfitrión (Host) vs. Co-anfitrión (Co-Host)

### Regla Fundamental de Zoom:
En cada sala de Zoom solo puede existir **UN Anfitrión Principal**, pero **ilimitados Co-anfitriones**.

```
                           ┌───────────────────────────────┐
                           │      SALA DE CLASES ZOOM      │
                           └──────────────┬────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌────────────────────────┐                      ┌────────────────────────┐
     │ ANFITRIÓN PRINCIPAL    │                      │     CO-ANFITRIÓN       │
     │ (Host)                 │                      │       (Co-Host)        │
     ├────────────────────────┤                      ├────────────────────────┤
     │ • Compartir pantalla   │                      │ • Compartir pantalla   │
     │ • Grabar en la nube    │                      │ • Grabar en la nube    │
     │ • Silenciar alumnos    │                      │ • Silenciar alumnos    │
     │ • Admitir / Expulsar   │                      │ • Admitir / Expulsar   │
     │ • Nombrar co-hosts     │                      │ • Manejar salas grupos │
     │ • Finalizar sala       │                      │                        │
     └────────────────────────┘                      └────────────────────────┘
```

### ¿Qué pasa cuando el Admin y el Profesor están juntos en la clase?

1. **Si el Profesor entra primero:** El profesor queda como Anfitrión Principal y dicta normalmente.
2. **Si el Admin entra primero:** El admin queda como Anfitrión Principal. Cuando el profesor entre a la sala, el admin debe:
   * Abrir la lista de **Participantes** en Zoom.
   * Buscar el nombre del profesor.
   * Hacer **clic derecho** sobre su nombre $\rightarrow$ Seleccionar **"Hacer coanfitrión" (Make Co-Host)**.
   * **Listo:** En ese instante el profesor ya puede compartir su pantalla y controlar la clase.

---

## 5. Uso de la Clave de Anfitrión (Host Key de 6 dígitos)

### ¿Qué es la Clave de Anfitrión?
Es un código de seguridad de 6 dígitos numéricos asignado a la cuenta institucional de Zoom de APRECAP.

### ¿Para qué sirve?
Permite que **cualquier profesor o administrador tome el control de Anfitrión** si por alguna razón entró como alumno o desde la app de Zoom sin el botón directo.

### Paso a paso para usar la Clave de Anfitrión dentro de Zoom:
1. Dentro de la videollamada de Zoom, haz clic en el botón **"Participantes"** (en la barra inferior).
2. En la parte inferior derecha de la lista de participantes, haz clic en **"Reclamar el rol de anfitrión" (Claim Host)**.
3. Escribe tu **Clave de Anfitrión de 6 dígitos** (visible en la tarjeta dorada de tu panel de APRECAP).
4. Haz clic en **Reclamar**. Zoom te otorgará de inmediato la corona de Anfitrión.

---

## 6. Preguntas Frecuentes y Resolución de Problemas (Troubleshooting)

### P1: ¿Por qué en la pantalla web me pedía "Código de acceso de la reunión"?
* **Causa:** Zoom exige una contraseña para evitar accesos no autorizados. En reuniones creadas anteriormente o si se abría sin el parámetro cifrado, Zoom mostraba una casilla vacía solicitando el código.
* **Solución actual:**
  1. En todas las clases nuevas, la plataforma **inyecta la contraseña automáticamente en segundo plano**, por lo que los alumnos y profesores entran directo sin escribir nada.
  2. Si la casilla llegase a aparecer (ej. en una reunión antigua), en la **barra gris inferior de APRECAP** está el botón **`🔑 Contraseña: [Copiar]`** para pegarlo en un clic.

---

### P2: ¿Por qué el profesor decía que no podía compartir pantalla?
* **Causa:** El profesor había entrado como *Participante común (alumno)* y el administrador que estaba adentro también había entrado como participante. Al no haber un Anfitrión activo en Zoom, la sala bloqueaba compartir pantalla por seguridad.
* **Solución:**
  1. El profesor debe hacer clic en el botón dorado **`👑 Abrir en Zoom (Host)`**.
  2. O el administrador que esté dentro debe hacer clic derecho sobre el profesor y marcar **"Hacer coanfitrión"**.

---

### P3: ¿Cómo silenciar a todos los alumnos que tengan micrófonos abiertos?
* En la barra inferior de Zoom, haz clic en **Participantes**.
* Abajo haz clic en el botón **"Silenciar a todos" (Mute All)**.
* Desmarca la casilla *"Permitir que los participantes reactiven su propio micrófono"* si deseas que solo hablen cuando tú les des la palabra.

---

### P4: ¿Dónde quedan las grabaciones de las clases?
* Las clases iniciadas por los docentes con el botón de Anfitrión se graban automáticamente en la **Nube de Zoom**.
* En el Panel de Administración de APRECAP, ve a la pestaña **"📹 Grabaciones Zoom"** para:
  * Descargar el video en formato MP4 en alta definición.
  * Publicarlo en 1 clic en la sección de **"Clases Grabadas y Repeticiones"** para que los alumnos lo revisen en streaming protegido.

---

*Documento técnico y operativo generado para OTEC APRECAP — Versión 2.0.*
