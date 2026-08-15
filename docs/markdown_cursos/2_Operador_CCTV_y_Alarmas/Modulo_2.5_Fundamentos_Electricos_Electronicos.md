# Submódulo 2.5: Fundamentos Eléctricos y Electrónicos del Sistema

## 1. El sistema integral de seguridad

Todo sistema integral de seguridad de una organización, para ser operativo y hacer frente con eficacia a los riesgos a los que está expuesto, debe incorporar un conjunto de medios y medidas que se diferencian en tres grandes grupos:

### Medios humanos

- Personal encargado de velar por la seguridad de la organización, con la calificación y formación específica que requiere cada caso para el eficaz cumplimiento de su misión en los roles preventivo y reactivo.
- Está constituido por los agentes de la seguridad pública, institucional y privada.

### Medidas organizativas

- Aplicables para lograr los fines de seguridad mediante la adecuada gestión de los medios humanos y técnicos.
- Se materializan en planes, normas y estrategias (por ejemplo, el plan de seguridad y las directivas de funcionamiento).

### Medios técnicos

- Surgen como apoyo a los medios humanos.
- Tienen por objeto lograr mayor efectividad en las tareas de control y vigilancia, facilitar una mayor agilidad en la intervención y racionalizar el empleo de efectivos humanos.
- Aquí se ubican los sistemas electrónicos de seguridad: alarmas, CCTV, control de accesos y detección.

## 2. Conceptos eléctricos básicos aplicados

- **Voltaje (tensión):** diferencia de potencial que impulsa la corriente eléctrica. Se mide en voltios (V). Los equipos de seguridad suelen operar en corriente continua de baja tensión (por ejemplo, 12 V o 24 V CC), alimentados por transformadores o fuentes de poder.
- **Corriente:** flujo de carga eléctrica a través de un conductor. Se mide en amperios (A).
- **Corriente alterna (CA) y corriente continua (CC):** la red eléctrica domiciliaria entrega corriente alterna (por ejemplo, 220 V CA en Chile); los equipos electrónicos trabajan internamente en corriente continua.
- **Potencia:** energía consumida por unidad de tiempo. Se mide en watts (W). Determina la capacidad de las fuentes de alimentación y el consumo de los equipos.
- **Continuidad:** propiedad de un circuito cerrado que permite el paso de la corriente; la apertura de un circuito (corte de cable) es detectada por los sistemas supervisados y genera una condición de problema.

## 3. Alimentación y respaldo de energía

- **Fuentes de poder:** convierten la corriente alterna de la red en la tensión continua que requieren cámaras, centrales y detectores.
- **Baterías de respaldo:** mantienen operativo el sistema ante cortes de suministro. La normativa de seguridad exige que los sistemas críticos (alarmas, cajeros) sigan funcionando sin energía de red.
- **UPS (sistema de energía ininterrumpida):** protege los equipos de cortes y variaciones de voltaje, entregando energía limpia y tiempo de operación adicional.
- **PoE (Power over Ethernet):** tecnología que transmite energía y datos por un mismo cable de red (par trenzado), simplificando la instalación de cámaras IP, teléfonos y otros dispositivos. Se basa en el estándar IEEE 802.3af/at y requiere de un switch o inyector PoE.
- **Regletas y PDU (unidades de distribución de energía):** centralizan el suministro eléctrico de múltiples dispositivos dentro de gabinetes o racks, entregando un punto de corte manual y protección con fusibles.

## 4. La señal de video y su fragilidad

- La señal de video emitida por una cámara es del orden de **1 a 1,2 voltios pico a pico**; es una señal débil y sensible a interferencias.
- Si se pierde una cantidad significativa de señal (0,1 voltios o más), las imágenes tendrán muy poco o ningún contraste.
- Si se pierde suficiente amplitud, se pierde la sincronización horizontal y la imagen brinca o se vuelve inestable.
- El buen diseño de un sistema busca minimizar interferencias y pérdidas en todos los tramos de transmisión.

## 5. Ruido, interferencias y puesta a tierra

- **Interferencias:** señales no deseadas que degradan la imagen (motores, líneas eléctricas, equipos de radiofrecuencia). Se mitigan con blindaje de cables y separación de canalizaciones.
- **Puesta a tierra:** conexión de los equipos a tierra de protección para disipar sobretensiones y reducir ruido; mejora la seguridad de las personas y la estabilidad de los equipos.
- **Transitorios y sobretensiones:** variaciones bruscas de voltaje que pueden dañar los equipos; los protectores y UPS ayudan a absorberlas.

## 6. Relevancia para el operador

- Conocer estos fundamentos permite al operador detectar problemas (imagen con interferencias, equipos que se reinician, pérdida de señal) y describirlos correctamente al personal técnico.
- La correcta alimentación y respaldo determinan que el sistema siga grabando durante emergencias, cuando más se necesita.
- Un operador informado contribuye a la mantención preventiva: reporta ruidos, recalentamientos, baterías agotadas y conexiones defectuosas antes de que generen fallas.
