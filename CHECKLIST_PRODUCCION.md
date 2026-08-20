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

### 🛡️ 2. Seguridad, Reglas y Roles (Código listo, pendiente publicación):
- [x] **Administradores Saavedra configurados en código:**
  - `conysaavedra.o@gmail.com` y `erciosaavedra@gmail.com` agregados a `ADMIN_EMAILS` en `lib/roles.ts` y sincronizados en `AuthContext.tsx`.
- [ ] **Publicar reglas de Firestore en consola / CLI:**
  - Desplegar o pegar `firestore.rules` en Firebase Console para que apliquen los permisos de los nuevos administradores.

---

### 🎓 3. Flujo de Cursos y Evaluaciones:
- [x] **Modo Demo eliminado:** Se removieron los bypasses y botones de prueba; ahora rigen las evaluaciones reales con nota mínima de aprobación (60% en quizzes).
- [x] **Certificación diferenciada:** Se ajustó para que OS-10 y Bastón indiquen retiro presencial en sede APRECAP tras completar las horas prácticas y examen de Carabineros, mientras que CCTV y Supervisor mantienen su certificación online.
- [x] **Favicon e Iconos oficiales:** Escudo oficial de APRECAP reemplazado en `favicon.ico`, `icon.png`, `apple-icon.png` y metadatos de `layout.tsx`.
- [ ] **Restricción de Accesos / Bloqueo de Cursos en el Panel del Alumno:**
  - Durante el desarrollo local se mantienen desbloqueados para revisión.
  - **Antes del lanzamiento final:** Asegurar que los cursos que requieran matrícula administrativa activen el bloqueo condicional (`accesoCCTV`, `accesoSupervisor`) en `web/src/app/panel/alumno/page.tsx`.
