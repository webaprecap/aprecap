import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, renderToFile } from '@react-pdf/renderer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const LOGO_PATH = 'D:/DigitalUp/public/logo.jpeg';
const OUT_PATH = path.join(ROOT, 'acuerdo-aprecap-digitalup.pdf');

const logoB64 = fs.readFileSync(LOGO_PATH, 'base64');
const LOGO = `data:image/jpeg;base64,${logoB64}`;

const FUENTE_TITULO = '#0b2b74';
const FUENTE_CIAN = '#04b9d6';
const TEXTO = '#1f2937';
const GRIS = '#6b7280';
const VERDE = '#12b485';

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9.3,
    color: TEXTO,
    paddingTop: 36,
    paddingBottom: 46,
    paddingHorizontal: 40,
    lineHeight: 1.4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
    borderBottom: `2 solid ${FUENTE_CIAN}`,
    paddingBottom: 14,
  },
  logo: { width: 78, height: 78, objectFit: 'contain' },
  headerTxt: { flex: 1 },
  headerTitulo: { fontSize: 15, fontWeight: 'bold', color: FUENTE_TITULO },
  headerSub: { fontSize: 9, color: GRIS, marginTop: 2 },
  titulo: { fontSize: 13, fontWeight: 'bold', color: FUENTE_TITULO, marginBottom: 6, marginTop: 14 },
  sub: { fontSize: 10.5, fontWeight: 'bold', color: FUENTE_CIAN, marginTop: 10, marginBottom: 4 },
  parrafo: { marginBottom: 6 },
  fila: { flexDirection: 'row', marginBottom: 2 },
  etiqueta: { width: 130, fontWeight: 'bold', color: FUENTE_TITULO },
  valor: { flex: 1 },
  tabla: { marginTop: 4, marginBottom: 8 },
  th: { backgroundColor: FUENTE_TITULO, color: '#ffffff', fontWeight: 'bold', padding: 4, fontSize: 8.2 },
  th2: { backgroundColor: FUENTE_CIAN, color: '#04263c', fontWeight: 'bold', padding: 4, fontSize: 8.2 },
  td: { padding: 4, fontSize: 8.2, borderBottomWidth: 0.5, borderBottomColor: '#d1d5db' },
  caja: { border: `1.5 solid ${VERDE}`, borderRadius: 6, padding: 10, marginTop: 10, marginBottom: 6 },
  cajaTitulo: { fontWeight: 'bold', color: VERDE, fontSize: 10, marginBottom: 4 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  bulletPunto: { width: 8, color: FUENTE_CIAN, fontWeight: 'bold' },
  bulletTxt: { flex: 1 },
  firma: { flexDirection: 'row', marginTop: 40, gap: 30 },
  firmaCaja: { flex: 1 },
  firmaLinea: { borderBottom: `1 solid ${TEXTO}`, marginTop: 34, marginBottom: 4 },
  firmaNombre: { textAlign: 'center', fontSize: 8.5, color: GRIS },
  pie: {
    position: 'absolute',
    bottom: 22,
    left: 45,
    right: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.5,
    color: GRIS,
    borderTop: `0.5 solid ${FUENTE_CIAN}`,
    paddingTop: 5,
  },
});

const ViewEl = (props, children) => h(View, props, ...children);
const TextEl = (props, ...children) => h(Text, props, ...children);
const Th = (props, txt) => TextEl({ style: [s.th, props.style] }, txt);
const Th2 = (props, txt) => TextEl({ style: [s.th2, props.style] }, txt);
const Td = (props, txt) => TextEl({ style: [s.td, props.style] }, txt);

const Fila = (props) =>
  ViewEl({ style: s.fila }, [
    TextEl({ style: s.etiqueta }, props.etiqueta),
    TextEl({ style: s.valor }, props.valor),
  ]);

const Bullet = (props) =>
  ViewEl({ style: s.bullet }, [
    TextEl({ style: s.bulletPunto }, '•'),
    TextEl({ style: s.bulletTxt }, props.txt),
  ]);

const GLOSARIO = [
  ['Sitio web', 'La página que la gente ve en internet, la cara pública de su empresa.'],
  ['Hosting / Alojamiento', 'El lugar físico (servidor) donde vive la web, como una bodega digital que se arrienda.'],
  ['Dominio / DNS', 'Dominio es su dirección en internet (aprecap.cl). DNS es el sistema que conecta esa dirección con la web.'],
  ['Base de datos', 'El archivador digital donde se guardan los alumnos, cursos e inscripciones.'],
  ['Login / Sesión', 'Entrar a la plataforma con usuario y contraseña.'],
  ['Google Auth', 'Entrar usando el correo de Google, sin necesidad de crear otra clave.'],
  ['Campus virtual', 'El lugar donde cada alumno entra y ve sus cursos, videos y material.'],
  ['Panel de administración', 'El escritorio desde donde ustedes administran cursos, horarios, Zoom y contenido sin depender de un programador.'],
  ['Moodle', 'La plataforma actual donde están sus cursos en línea.'],
  ['Curso asincrónico', 'Curso grabado que el alumno puede ver en cualquier horario.'],
  ['B-Learning', 'Modalidad mixta: contenido en línea más clases en vivo (por Zoom).'],
  ['Zoom', 'Aplicación de videollamadas que usan para las clases en vivo. Se integrará a cada curso.'],
  ['YouTube', 'Plataforma donde se subirán los videos de los cursos para que no ocupen espacio en el sitio.'],
  ['Sanity', 'El archivador digital donde se guardan las imágenes del sitio.'],
  ['Firebase', 'El servicio de Google que guarda los datos (alumnos, inscripciones) y el login con Gmail.'],
  ['Cloudflare', 'Empresa que aloja la web y la protege de ataques. Hace que cargue rápido y seguro.'],
  ['API', 'Un "puente" que conecta dos sistemas entre sí (por ejemplo, la web con Zoom o con YouTube).'],
  ['Ciberseguridad', 'Todas las medidas para proteger la web y los datos contra ataques o robos de información.'],
  ['MFA / Doble verificación', 'Segundo paso de seguridad al entrar: además de la clave, un código que llega al celular.'],
  ['Backup / Respaldo', 'Copia de seguridad de los datos para recuperarlos si algo falla.'],
  ['Auditoría', 'Registro detallado e imborrable de quién hizo qué y cuándo dentro del sistema.'],
  ['Consentimiento', 'El permiso explícito que pediremos a cada alumno antes de guardar y usar sus datos.'],
  ['Derechos ARCO', 'Derechos del alumno sobre sus datos: Acceder, Rectificar, Cancelar (eliminar) y Oponerse al uso.'],
  ['Portabilidad de datos', 'Que el alumno pueda descargar una copia de sus propios datos cuando quiera.'],
  ['CSIRT', 'Equipo nacional chileno de respuesta ante ataques cibernéticos, al que se notifican incidentes.'],
  ['IVA', 'Impuesto del 19% sobre servicios. En este proyecto NO se cobrará.'],
];

const CajaResumen = () =>
  ViewEl({ style: s.caja }, [
    TextEl({ style: s.cajaTitulo }, 'RESUMEN DEL ACUERDO'),
    Fila({ etiqueta: 'Empresa', valor: 'Digital Up SpA — Víctor Manuel Aguilera Muñoz (dueño)' }),
    Fila({ etiqueta: 'Cliente', valor: 'OTEC APRECAP (acreditada SENCE y Carabineros OS-10)' }),
    Fila({ etiqueta: 'Objeto', valor: 'Rediseño integral del sitio web y plataforma educativa con campus virtual' }),
    Fila({ etiqueta: 'Valor total', valor: '$250.000 CLP — SIN IVA (19%) por esta ocasión' }),
    Fila({ etiqueta: 'Forma de pago', valor: '2 cuotas: $125.000 al inicio del proyecto y $125.000 a la entrega' }),
  ]);

const TablaHoyDespues = () => {
  const filas = [
    ['La página de "Inscribirme a un curso" aparece vacía y no se puede inscribir nadie.', 'Cada curso tendrá su propia página con toda la información y botones claros de contacto e inscripción por WhatsApp.'],
    ['El sitio se ve anticuado y se adapta mal al celular.', 'Un sitio moderno, rápido y que se ve perfecto en celular, tablet y computador.'],
    ['Los cursos en línea (Moodle) están separados del sitio.', 'Los 10 cursos asincrónicos tendrán su página en el sitio y cada alumno tendrá su aula virtual con su curso.'],
    ['Para entrar a los cursos cada alumno necesita clave especial.', 'Los alumnos entran con su correo de Google (más fácil y seguro).'],
    ['Administrar cursos o contenido requiere ayuda técnica.', 'Panel de administración: ustedes publican cursos, fechas, enlace de Zoom y material sin depender de nadie.'],
    ['Las clases B-Learning con Zoom no están integradas.', 'Cada curso tendrá su enlace de reunión Zoom visible para alumnos y administradores.'],
    ['Los videos ocupan espacio y no están organizados.', 'Los videos se suben a YouTube (no ocupan espacio en la web) y se enlazan en cada curso.'],
    ['No hay respaldo claro de los datos de alumnos.', 'Datos seguros en la nube de Google con respaldos automáticos y protección legal.'],
  ];
  return ViewEl({ style: s.tabla }, [
    ViewEl({ style: { flexDirection: 'row' } }, [
      Th({ style: { width: '46%' } }, 'HOY (situación actual)'),
      Th2({ style: { width: '54%' } }, 'DESPUÉS (con el proyecto)'),
    ]),
    ...filas.map((f, i) =>
      ViewEl({ key: i, style: { flexDirection: 'row' } }, [
        Td({ style: { width: '46%' } }, f[0]),
        Td({ style: { width: '54%' } }, f[1]),
      ])
    ),
  ]);
};

const TablaPago = () => {
  const filas = [
    ['Valor total del proyecto', '$250.000 CLP'],
    ['Cuota 1 — Inicio del proyecto', '$125.000 CLP'],
    ['Cuota 2 — Entrega del proyecto', '$125.000 CLP'],
    ['IVA 19%', 'NO se cobra en este proyecto (cortesía Digital Up)'],
  ];
  return ViewEl({ style: s.tabla }, [
    ViewEl({ style: { flexDirection: 'row' } }, [
      Th({ style: { width: '50%' } }, 'Concepto'),
      Th2({ style: { width: '50%' } }, 'Valor'),
    ]),
    ...filas.map((f, i) =>
      ViewEl({ key: i, style: { flexDirection: 'row' } }, [
        Td({ style: { width: '50%' } }, f[0]),
        Td({ style: { width: '50%', fontWeight: 'bold', color: VERDE } }, f[1]),
      ])
    ),
  ]);
};

const Pie = () =>
  ViewEl({ style: s.pie }, [
    TextEl({}, 'Digital Up SpA — Acuerdo de Servicios OTEC APRECAP'),
    TextEl({ render: ({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}` }),
  ]);

const Acuerdo = () =>
  h(Document, { title: 'Acuerdo de Servicios — OTEC APRECAP', author: 'Digital Up SpA', subject: 'Rediseño plataforma web OTEC APRECAP' }, [
    // ============ PÁGINA 1 ============
    h(Page, { size: 'LETTER', style: s.page }, [
      ViewEl({ style: s.header }, [
        h(Image, { src: LOGO, style: s.logo }),
        ViewEl({ style: s.headerTxt }, [
          TextEl({ style: s.headerTitulo }, 'DIGITAL UP SpA'),
          TextEl({ style: s.headerSub }, 'Desarrollo de software · Diseño web · Ciberseguridad · Cumplimiento normativo'),
          TextEl({ style: { fontSize: 12, fontWeight: 'bold', color: FUENTE_TITULO, marginTop: 8 } }, 'ACUERDO DE SERVICIOS — REDISEÑO PLATAFORMA WEB'),
          TextEl({ style: { fontSize: 9, color: GRIS } }, 'Cliente: OTEC APRECAP — Capacitación · Asesorías · Seguridad Privada'),
        ]),
      ]),
      CajaResumen(),

      TextEl({ style: s.titulo }, '1. Objeto del servicio'),
      TextEl(
        { style: s.parrafo },
        'Digital Up SpA desarrollará para OTEC APRECAP una nueva plataforma web que reemplaza y mejora el sitio actual, rescatando todo el contenido existente (textos, cursos, blog, videos) para que no se pierda nada, e incorporando un campus virtual donde los alumnos se registran con su correo de Google, ven sus cursos y el equipo de APRECAP administra todo desde un panel de control.'
      ),

      TextEl({ style: s.titulo }, '2. Qué vamos a hacer, explicado simple'),
      TablaHoyDespues(),

      TextEl({ style: s.titulo }, '3. Lo que rescataremos y protegeremos'),
      Bullet({ txt: 'Todo el texto del sitio actual: páginas, cursos, blog (6 artículos), datos de contacto y asesorías.' }),
      Bullet({ txt: 'Los 10 cursos del campus virtual (Moodle), su contenido y sus videos, que se subirán a YouTube.' }),
      Bullet({ txt: 'El logo oficial de APRECAP y los textos de identidad (misión, visión, valores).' }),
      Bullet({ txt: 'Toda la información rescatada quedará como respaldo local del cliente (es su propio material).' }),

      TextEl({ style: s.sub }, '4. Tecnología que usaremos (sin tecnicismos)'),
      Bullet({ txt: 'Google: los alumnos y administradores entran con su correo Gmail (seguro y sin claves extra).' }),
      Bullet({ txt: 'Nube de Google (Firebase): guarda alumnos, inscripciones, progreso y permisos, con respaldos automáticos.' }),
      Bullet({ txt: 'YouTube: aloja los videos de los cursos para que el sitio sea rápido y no ocupe espacio propio.' }),
      Bullet({ txt: 'Cloudflare: aloja la web, la hace cargar rápido en todo Chile y la protege de ataques.' }),
      Bullet({ txt: 'Zoom: se integra para que cada curso muestre su enlace de clase en vivo.' }),
      Bullet({ txt: 'GitHub: guarda el código del proyecto con historial, para seguridad y mantención futura.' }),

      Pie('Página 1 de 3'),
    ]),

    // ============ PÁGINA 2 ============
    h(Page, { size: 'LETTER', style: s.page }, [
      TextEl({ style: s.titulo }, '5. Cumplimiento legal y ciberseguridad (explicado simple)'),

      TextEl({ style: s.sub }, '5.1 Ley de Protección de Datos Personales (Ley N° 21.719)'),
      TextEl(
        { style: s.parrafo },
        'Esta ley chilena protege los datos de las personas. Entrará plenamente en vigencia el 1 de diciembre de 2026 y nuestro sitio cumplirá con ella desde el día uno:'
      ),
      Bullet({ txt: 'Consentimiento: antes de guardar datos de un alumno le pediremos permiso explícito, con casillas sin marcar por defecto, y quedará registrado cuándo y qué aceptó.' }),
      Bullet({ txt: 'Derechos ARCO: cada alumno podrá ver sus datos (Acceder), corregirlos (Rectificar), eliminarlos (Cancelar) y negarse a usos no autorizados (Oponerse).' }),
      Bullet({ txt: 'Portabilidad: botón "Descargar mis datos" para que el alumno obtenga copia de su información en formato JSON.' }),
      Bullet({ txt: 'Supresión definitiva: si un alumno pide eliminar su cuenta, se borra todo su rastro de la base de datos de forma automática (derecho al olvido).' }),
      Bullet({ txt: 'Minimización: solo se piden los datos estrictamente necesarios para el funcionamiento.' }),

      TextEl({ style: s.sub }, '5.2 Ley Marco de Ciberseguridad (Ley N° 21.663)'),
      TextEl(
        { style: s.parrafo },
        'Esta ley (vigente desde el 1 de marzo de 2025) exige proteger la infraestructura digital. Implementaremos:'
      ),
      Bullet({ txt: 'Registro de auditoría: bitácora imborrable de quién hizo qué y cuándo en el sistema, para trazabilidad ante cualquier incidente.' }),
      Bullet({ txt: 'Doble verificación (MFA) para los administradores: se exige un segundo paso de seguridad al entrar.' }),
      Bullet({ txt: 'Cifrado: toda la comunicación con la web va encriptada (HTTPS / TLS 1.3) y los datos sensibles protegidos.' }),
      Bullet({ txt: 'Respaldos automáticos de la base de datos, con copia aislada y probada.' }),
      Bullet({ txt: 'Protocolo ante incidentes: procedimiento documentado para notificar al CSIRT Nacional dentro de los plazos legales (3 horas alerta temprana / 72 horas informe).' }),
      Bullet({ txt: 'Reglas estrictas en la base de datos para que ningún usuario pueda ver o modificar datos de otros.' }),

      ViewEl({ style: s.caja }, [
        TextEl({ style: s.cajaTitulo }, '¿Qué significa esto para APRECAP?'),
        TextEl(
          { style: s.parrafo },
          'Que su plataforma estará preparada para las nuevas leyes chilenas de datos y ciberseguridad, protegiendo a sus alumnos y a la propia empresa frente a multas que pueden llegar a miles de millones de pesos. Es el mismo estándar de cumplimiento que ya aplicamos en otros proyectos (como SARMAT Capacitaciones).'
        ),
      ]),

      TextEl({ style: s.titulo }, '6. Glosario — explicación para todos'),
      TextEl({ style: s.parrafo }, 'Para que no queden dudas con los términos técnicos:'),
      ViewEl({ style: s.tabla }, [
        ViewEl({ style: { flexDirection: 'row' } }, [
          Th({ style: { width: '30%' } }, 'Término'),
          Th2({ style: { width: '70%' } }, 'Qué significa'),
        ]),
        ...GLOSARIO.map((g, i) =>
          ViewEl({ key: i, style: { flexDirection: 'row' } }, [
            Td({ style: { width: '30%', fontWeight: 'bold', color: FUENTE_TITULO } }, g[0]),
            Td({ style: { width: '70%' } }, g[1]),
          ])
        ),
      ]),

      Pie('Página 2 de 3'),
    ]),

    // ============ PÁGINA 3 ============
    h(Page, { size: 'LETTER', style: s.page }, [
      TextEl({ style: s.titulo }, '7. Entregables del cliente'),
      TextEl({ style: s.parrafo }, 'Para poder ejecutar el proyecto, el cliente OTEC APRECAP se compromete a entregar:'),
      Bullet({ txt: 'Un correo Gmail oficial de la empresa, que se enlazará a todos los servicios (Google/Firebase, YouTube, Sanity, Cloudflare, GitHub).' }),
      Bullet({ txt: 'Credenciales de acceso al campus virtual (Moodle) — ya entregadas.' }),
      Bullet({ txt: 'Usuario y contraseña del host del sitio actual (necesarios para cambiar el DNS del dominio aprecap.cl y acceder a los archivos del servidor).' }),
      Bullet({ txt: 'Los colores oficiales que quiere para la nueva web (se definirán al inicio de la etapa de diseño).' }),
      Bullet({ txt: 'El material o videos adicionales que quiera incorporar a los cursos (si los hubiera).' }),

      TextEl({ style: s.titulo }, '8. Etapas del proyecto'),
      Bullet({ txt: 'Etapa 1 — Acuerdo y preparación: firma del presente documento, entrega de credenciales y configuración del entorno (Gmail, GitHub, Cloudflare).' }),
      Bullet({ txt: 'Etapa 2 — Rescate de contenido: extracción y respaldo de todo el contenido del sitio actual y del campus virtual, incluidos los videos.' }),
      Bullet({ txt: 'Etapa 3 — Diseño y construcción: nuevo sitio web, catálogo de cursos con página por curso, campus virtual, panel de administración y login con Google.' }),
      Bullet({ txt: 'Etapa 4 — Ciberseguridad y leyes: implementación de los requisitos de la Ley 21.719 y Ley 21.663, políticas de privacidad y términos.' }),
      Bullet({ txt: 'Etapa 5 — Despliegue: puesta en producción en Cloudflare, conexión del dominio aprecap.cl y pruebas finales.' }),
      Bullet({ txt: 'Etapa 6 — Entrega: entrega del proyecto terminado, capacitación de uso del panel y firma del acuerdo de soporte mensual.' }),

      TextEl({ style: s.titulo }, '9. Condiciones económicas'),
      TablaPago(),
      TextEl(
        { style: s.parrafo },
        'El pago no incluye costos mensuales de los servicios en la nube (Google, Cloudflare, Sanity), los que se contemplarán en el acuerdo de soporte mensual posterior a la entrega.'
      ),

      TextEl({ style: s.titulo }, '10. Soporte y mantención futura'),
      TextEl(
        { style: s.parrafo },
        'Al entregar el proyecto se firmará un acuerdo separado de soporte mensual, donde se definirán los servicios de mantención, actualizaciones, copias de seguridad y acompañamiento, junto con sus costos. Este acuerdo no está incluido en el valor del presente proyecto.'
      ),

      TextEl({ style: s.titulo }, '11. Firma del acuerdo'),
      TextEl({ style: s.parrafo }, 'Las partes declaran conocer y aceptar todas las cláusulas del presente acuerdo.'),
      ViewEl({ style: s.firma }, [
        ViewEl({ style: s.firmaCaja }, [
          TextEl({ style: { fontWeight: 'bold', color: FUENTE_TITULO, textAlign: 'center' } }, 'OTEC APRECAP'),
          TextEl({ style: { fontSize: 8.5, color: GRIS, textAlign: 'center', marginTop: 2 } }, 'Representante del cliente'),
          ViewEl({ style: s.firmaLinea }, []),
          TextEl({ style: s.firmaNombre }, 'Firma · Nombre · RUT · Fecha'),
        ]),
        ViewEl({ style: s.firmaCaja }, [
          TextEl({ style: { fontWeight: 'bold', color: FUENTE_TITULO, textAlign: 'center' } }, 'DIGITAL UP SpA'),
          TextEl({ style: { fontSize: 8.5, color: GRIS, textAlign: 'center', marginTop: 2 } }, 'Víctor Manuel Aguilera Muñoz — Dueño'),
          ViewEl({ style: s.firmaLinea }, []),
          TextEl({ style: s.firmaNombre }, 'Firma · RUT · Fecha'),
        ]),
      ]),

      ViewEl({ style: { marginTop: 22, border: `1 solid ${FUENTE_CIAN}`, borderRadius: 6, padding: 8 } }, [
        TextEl(
          { style: { fontSize: 8, color: GRIS } },
          'Documento generado por Digital Up SpA para OTEC APRECAP. Este acuerdo contempla la implementación de las Leyes N° 21.719 (Protección de Datos Personales) y N° 21.663 (Marco de Ciberseguridad) de Chile.'
        ),
      ]),

      Pie('Página 3 de 3'),
    ]),
  ]);

renderToFile(Acuerdo(), OUT_PATH)
  .then(() => console.log(`PDF generado: ${OUT_PATH}`))
  .catch((err) => {
    console.error('Error generando PDF:', err);
    process.exit(1);
  });
