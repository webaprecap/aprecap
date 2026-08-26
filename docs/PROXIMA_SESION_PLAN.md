# Plan de Trabajo para la Próxima Sesión

Este documento guarda los puntos que pusimos en pausa para retomarlos en la siguiente sesión, una vez que se hayan definido los detalles con el cliente.

## 1. WebPay y Precios (Pausado)
- **Estado actual:** El cliente debe confirmar cómo y cuándo se implementarán los cobros.
- **Acción futura:** Retomar la integración o ajustes en los precios y el flujo de pago con WebPay cuando se tenga la confirmación final.

## 2. Simplificación de la Página de Contacto (Pendiente)
- **Estado actual:** La página `/contacto` tiene un formulario funcional (`<ContactoForm />`) que envía datos a la API (`/api/contacto`).
- **Problema:** El cliente prefiere que sea solo informativa (números, correos, botones directos) para evitar formularios innecesarios y posible spam de bots.
- **Acción futura:** 
  - Eliminar el componente `<ContactoForm />` de `web/src/app/contacto/page.tsx`.
  - Dejar exclusivamente las tarjetas estáticas con la información de contacto y los botones de WhatsApp/Email.
  - Eliminar o deshabilitar la ruta de la API `web/src/app/api/contacto/route.ts`.

## 3. Seguridad Crítica en la API de Zoom (Riesgo Alto - Pendiente)
- **Estado actual:** Las rutas de la API de Zoom (`/api/zoom`) están abiertas; actualmente el cliente usa la plataforma y funciona, pero técnicamente cualquier persona con los conocimientos técnicos adecuados podría hacer peticiones a esa ruta.
- **Acción futura:** 
  - Agregar validación de autenticación (`verifyUserToken` de Firebase) en `web/src/app/api/zoom/route.ts`.
  - Asegurar que solo los usuarios logueados con rol de `admin`, `superadmin` o `profesor` puedan ejecutar las acciones de crear, borrar o forzar el cierre de reuniones.

## 4. Solicitar Acceso (Sin cambios)
- **Decisión:** Se mantendrá exactamente como está actualmente, sin añadir bloqueos adicionales por RUT, ya que el flujo de aprobación manual desde el panel funciona bien para el proceso del OTEC.
