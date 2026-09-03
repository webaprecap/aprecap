# 🚀 Checklist de Despliegue a Producción - Instituto APRECAP

> Guía detallada de conexión de dominio, Cloudflare y Zoho Mail:
> **`docs/GUIA_DESPLIEGUE_DOMINIO_CLOUDFLARE.md`** (local / gitignored por seguridad)

---

## 📋 ESTADO DE TAREAS Y PENDIENTES ANTES DEL PASE A PRODUCCIÓN:

### 🌐 1. Infraestructura, Dominio y Cloudflare (Pendiente configuración externa):
- [ ] **Cambiar Nameservers en NIC Chile (`nic.cl`):**
  - Reemplazar los nameservers antiguos de `servidoresph.com` por los 2 nameservers entregados por Cloudflare.
- [ ] **Configurar Custom Domain en Cloudflare Workers:**
  - En Cloudflare > Workers & Pages > `aprecap` > Settings > Custom Domains > Vincular `aprecap.cl` y `www.aprecap.cl`.
- [ ] **Configurar registros de correo (Zoho Mail) en Cloudflare DNS:**
  - Agregar los 3 registros MX (`mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com`) y el TXT SPF de Zoho Mail para que no se interrumpa el correo corporativo.
- [ ] **CORS en Sanity CMS:**
  - En `manage.sanity.io` > Proyecto `mwwotgjc` > API > CORS Origins > Agregar `https://aprecap.cl` y `https://www.aprecap.cl` con *Allow credentials*.
- [ ] **Dominios autorizados en Firebase Auth:**
  - En Firebase Console (`aprecap-8aa89`) > Authentication > Settings > Authorized Domains > Agregar `aprecap.cl` y `www.aprecap.cl`.

---

### 🛡️ 2. Seguridad, Reglas y Roles:
- [x] **Administradores Saavedra configurados en código:**
  - `csaavedraaprecap@gmail.com` y `erciosaavedra@gmail.com` agregados a `ADMIN_EMAILS` en `lib/roles.ts` y sincronizados en `AuthContext.tsx`.
- [x] **Reglas de Firestore actualizadas para perfil y temporales (`firestore.rules`):**
  - Reglas con soporte de borrado seguro de documentos temporales viejos (`resource.data.email == request.auth.token.email`) y actualización flexible de perfil sin fallas por campos administrativos ausentes. (Pendiente pegar en Firebase Console si aún no se ha publicado).
- [x] **Persistencia Definitiva de Alumnos y Carga Directa por UID:**
  - `AuthContext.tsx` prioriza `u.uid` oficial, erradicando la sobreescritura de datos personales al iniciar sesión.

---

### 🎓 3. Flujo de Cursos, Evaluaciones y Accesos (100% Completado):
- [x] **Restricción de Accesos / Bloqueo de Cursos en el Panel del Alumno:** 100% activo en `courseAccess.ts`, `panel/alumno/page.tsx`, `materiales/[slug]/page.tsx` y `cursos-otec/[slug]/page.tsx` (`CursoAccessGate` activo para alumnos sin matrícula).
- [x] **Landing Pages Informativas Oficiales OTEC (`/cursos/[slug]`):** Fichas públicas de los 10 cursos laborales OTEC con temario, horas, modalidad SENCE, botón WhatsApp y botón de solicitud de matrícula hacia `/solicitar-acceso`.
- [x] **Catálogo y Visor Universal OTEC A4:** Integrado visor sin barras nativas con Canvas HTML5 (`react-pdf`) y 49 manuales/PPTs técnicos alojados en Sanity CDN con proxy `/api/pdf`.
- [x] **Obligatoriedad de Datos Personales:** Validación estricta de Nombres, Apellidos, RUT chileno y Teléfono en `/solicitar-acceso` y panel de alumno para acreditación OS-10 y SENCE.
- [x] **Preferencias de Cookies y Cumplimiento Ley 21.719:** Banner de cookies interactivo con botón permanente en el pie de página (`[ 🍪 Preferencias de Cookies ]`).
- [x] **Aislamiento y Navegación Móvil de Panel Admin:** Barra lateral con scroll independiente y z-index optimizado; footer adaptativo con padding izquierdo condicional.
- [x] **Evaluaciones y Cuestionarios Interactivos OTEC:** 100% operativos con retroalimentación inmediata, nota al 80% y confeti.
- [x] **Quitar herramientas internas del navbar:** El botón "🧪 Vista previa exámenes" y botones de demo fueron completamente removidos del `Header.tsx`.
- [x] **Modo Demo eliminado:** Se removieron los bypasses y botones de prueba; rigen las evaluaciones reales con umbrales oficiales.
- [x] **Certificación diferenciada:** OS-10 y Bastón indican retiro presencial en sede física tras completar horas prácticas y examen de Carabineros; CCTV y Supervisor mantienen emisión digital.
- [x] **Favicon e Iconos oficiales:** Escudo oficial de APRECAP en `favicon.ico`, `icon.png`, `apple-icon.png` y metadatos de `layout.tsx`.
