# 🎯 Plan de Trabajo para la Próxima Sesión

---

## ⚙️ 1. Módulos Interactivos y Simuladores Técnicos en Cursos OTEC (Prioridad Alta)
* **Objetivo:** Llevar los cursos técnicos a un nivel superior mediante laboratorios visuales y simuladores interactivos paso a paso directamente en el navegador web (Canvas / SVG interactivo).
* **Simuladores a Desarrollar:**
  1. **Operador de Calderas y Generadores de Vapor (D.S. N° 10):**
     - Manómetro interactivo de presión (bar / psi) con zonas verde, amarilla y roja (sobrepresión).
     - Control visual de nivel de agua en tubo de nivel y purgas de fondo.
     - Protocolo interactivo de prueba de válvula de seguridad y corte por bajo nivel (corte de quemador).
  2. **Grúa Horquilla y Maquinaria:**
     - Checklist pre-operacional interactivo de 10 puntos (aceite, frenos, mástil, uñas, cadenas, cinturón).
     - Calculador visual interactivo de triángulo de estabilidad y centro de gravedad de la carga.
  3. **Manejo de Sustancias Peligrosas (NCh382 / SGA / D.S. 43):**
     - Evaluador interactivo de compatibilidad química para almacenamiento en bodega (matriz de segregación).
     - Identificador dinámico de pictogramas GHS/SGA y Rombo NFPA 704 con retroalimentación inmediata.
  4. **Trabajo en Altura (NCh1258):**
     - Checklist interactivo de inspección previa de arnés de cuerpo completo (puntos de impacto, costuras y argollas).
  5. **Electricidad Básica Industrial:**
     - Calculador visual de Ley de Ohm (V, I, R, P) y dimensionador de disyuntores/diferenciales según norma técnica RIC de la SEC.

---

## 🇨🇱 2. Fiestas Patrias (18 de Septiembre) — ✅ COMPLETADO
* **Estado:** 100% implementado, auditado y listo para producción.
* **Componentes activos:**
  - Control de activación en tiempo real desde `/panel/admin` (`fiestasPatrias.ts` / Firestore).
  - Guirnalda dieciochera modular que no se deforma, con orientación oficial según D.S. N° 1.534.
  - Hero patrio con bandera flameando y la Cordillera de los Andes nevada de fondo.
  - Sombrero huaso tradicional en Logo y en el botón flotante de WhatsApp.
  - Volantín tricolor "¡Especial 18!" en tarjetas de cursos.
  - Cero emojis "CL" rotos y respeto total a la paleta institucional de APRECAP.

---

## 💳 3. WebPay y Pasarela de Pagos (Pausado a la espera de confirmación)
* **Estado actual:** A la espera de que la administración confirme tarifas definitivas y flujo de cobro con Transbank.

---

## 📞 4. Simplificación de la Página de Contacto
* **Acción:** Dejar `/contacto` 100% directa con tarjetas estáticas de WhatsApp, correo, teléfono y ubicación de sede, removiendo formularios que puedan generar spam.

---

## 🔒 5. Seguridad en Rutas de Zoom
* **Acción:** Asegurar que las rutas de `/api/zoom` requieran token verificado de Firebase para roles `admin`, `superadmin` y `profesor`.
