# Módulo 2: Sistemas Electrónicos de Seguridad Privada

---

## Submódulo 2.1: Tarjetas de Control de Acceso Electrónico y Tecnologías Biométricas

### 1. El sistema de control de accesos

El control de acceso describe toda técnica utilizada para controlar el paso entrante o saliente de un área o sistema. Sus objetivos principales son:

- **Reducción del riesgo:** regular el acceso de empleados y visitas, protegiendo los bienes de valor.
- **Reducción de los costos de seguridad:** optimizar el uso de guardias, disminuyendo los puntos y tiempos de vigilancia.
- **Ambiente seguro:** generar condiciones para que las personas trabajen con mayor seguridad.

El control de acceso es solo una parte del sistema integral de seguridad: se complementa con detectores de intrusión, alarmas, guardias, CCTV y detectores de humo y fuego.

### 2. Tecnologías de tarjetas de control de acceso

- **Banda magnética:** datos digitales (unos y ceros) grabados en una banda magnética, similar a las tarjetas bancarias. Ventaja: gran capacidad de información y homologación. Desventaja: vulnerabilidad a rayaduras, campos magnéticos y dobleces (mitigada con tarjetas de alta coercitividad).
- **Tecnología Wiegand:** hilos metálicos incrustados en el plástico. Ventaja: alta inmunidad a campos magnéticos y gran durabilidad. Desventaja: mayor costo y capacidad de datos limitada.
- **Proximidad (RFID):** circuito electrónico sintonizado y resonante (bobinas y condensadores) inserto en la tarjeta. Al aproximarse al lector, este capta la frecuencia de resonancia propia de la tarjeta y la envía a la unidad central. Ventaja: inmunidad a la clonación. Desventaja: costo mayor y posibilidad de falsas lecturas entre tarjetas similares.
- **Infrarroja:** lector óptico que escanea códigos de barras internos mediante luz infrarroja. Ventaja: alta inmunidad y precio competitivo. Desventaja: falta de normas de homologación entre proveedores.

### 3. Funcionamiento general del sistema

El usuario presenta su tarjeta al lector. El sensor envía la información a la unidad central de procesamiento (CPU), que la transforma en un número y la compara con los códigos autorizados para ese punto de control, permitiendo o denegando el acceso. Todo el flujo de información queda registrado en memoria y puede ser consultado o impreso.

### 4. Dispositivos complementarios

- **Identificación adicional:** teclado con número de identificación personal (PIN) o código secreto posterior a la lectura de la tarjeta, duplicando la seguridad.
- **Tarjetas con fotografía y firma del titular:** permiten verificar visualmente que la tarjeta corresponde a quien la presenta.
- **Antipass-back:** evita que dos personas ingresen con la misma tarjeta; una vez usada en un lector de entrada, exige pasar por el lector de salida antes de volver a usarse en el ingreso.
- **Cabinas de doble puerta, torniquetes y rotatorios:** permiten el paso unitario del personal. Precaución: deben instalarse en lugares específicos porque reducen el flujo de personas y deben respetar la normativa contra incendios.

### 5. Flujo de personal y control de información

- El flujo normal de una puerta con control de acceso es de **6 a 20 personas por minuto**. Se debe evaluar el comportamiento del sistema en el peor escenario (flujo multiplicado en emergencias).
- El sistema genera un listado de eventos que permite saber dónde y cuándo estuvo cada persona. En emergencias informa del personal que se encontraba en un área determinada y a qué hora ingresó.

### 6. Tecnologías biométricas de identificación

- **Huella digital y geometría de mano:** captura tridimensional de crestas dactilares o dimensiones de la mano.
- **Reconocimiento facial:** escaneo y comparación de puntos fiduciarios del rostro.
- **Reconocimiento de iris y retina:** patrones vasculares únicos del ojo humano.
- **Reconocimiento de voz y firma:** espectro vocal y dinámica de presión y tiempo al firmar.
- **Sensores de olor:** análisis de compuestos químicos volátiles únicos.

---

## Submódulo 2.2: Detectores de Metales, Arcos Electrónicos y Exclusas de Control

### 1. Detectores de metales en accesos restringidos

- Son barreras electrónicas que generan un campo electromagnético para detectar elementos metálicos (armas, herramientas y objetos prohibidos).
- Emiten alertas sonoras y lumínicas al detectar metal en una persona o bulto.

### 2. Arcos detectores automáticos y exclusas (Sistema Rot-Acces)

- **Exclusas giratorias automáticas:** sistema de doble puerta con arco detector incorporado.
- **Capacidad operativa:** flujo continuo de hasta **20 personas por minuto** en ambos sentidos.
- **Detectores manuales de metales:** paletas electromagnéticas utilizadas por vigilantes o guardias para inspección corporal directa, complementando los arcos fijos.

---

## Submódulo 2.3: Detectores de Intrusión, Sensores Pasivos/Activos y Barreras Fotoeléctricas

### 1. Conceptos generales

- **Señal de robo:** protección de recintos sin personal en su interior (cobertura de puertas, ventanas, techos y muros).
- Los detectores se dividen en **exteriores** e **interiores**, según las condiciones ambientales a las que están expuestos.

### 2. Clasificación de los detectores de intrusión

- **Protección de perímetro exterior:** barreras infrarrojas activas, microondas, cable sensor y otros, instalados en cercos y límites.
- **Protección de perímetro interior:** sensores volumétricos, de cortina y de contacto magnético en puertas y ventanas.
- **Barreras de protección electrónica:** sistemas que combinan emisor y receptor para cubrir vanos o pasillos.
- **Protección electrónica de objetos:** sensores de proximidad o de contacto sobre bienes específicos.
- **Pulsadores para asaltos:** dispositivos de activación manual o inalámbrica (anti-asalto).
- **Detectores de incendio:** integrados al sistema de seguridad (se desarrollan en el submódulo 2.7).

### 3. Sensores pasivos y activos

- **Sensores pasivos (PIR):** miden la radiación infrarroja emitida por cuerpos en movimiento, sin emitir energía propia. Las personas y animales irradian ondas infrarrojas en el área del infrarrojo extremo, entre **8.000 y 20.000 nanómetros (nm)**. La temperatura máxima de la piel de una persona vestida es de **33 a 35 °C**, y el cuerpo humano es uno de los mejores irradiadores, con un factor de emisión de **0,96 a 0,98**.
- **Sensores activos:** combinan un emisor y un receptor (por ejemplo, diodo IRED emisor y fototransistor receptor). Se activan cuando un cuerpo interrumpe el haz.
- **Barreras fotoeléctricas:** emiten un haz de luz infrarroja invisible; la interrupción del haz activa inmediatamente el circuito de alarma.

### 4. Proceso de detección de un PIR

- El sensor requiere lentes Fresnel o espejos segmentados para enfocar la radiación infrarroja del objetivo.
- El sensor solo detecta diferencias de temperatura; por eso la observación debe ser discontinua, lograda mediante los segmentos del espejo o de la lente.
- El vidrio común permite el paso de la luz visible pero es prácticamente opaco a la radiación infrarroja del rango pasivo; por ello los PIR se instalan con visión directa del área protegida.
- Las falsas alarmas pueden producirse por fuentes de calor cercanas, mascotas, corrientes de aire y cambios bruscos de temperatura; la instalación y el ajuste deben considerarlo.

---

## Submódulo 2.4: Centrales de Alarma, Paneles de Control y Zonas de Protección

### 1. Arquitectura de una central de alarmas

- **Panel principal de control (CPU):** procesa las señales transmitidas por los sensores de intrusión, humo, pánico y sabotaje. Es el cerebro del sistema.
- **Zonas de alarma:** segmentación de la instalación en áreas independientes (perimetral, interior, 24 horas, incendio y tamper), permitiendo identificar con precisión el origen de la señal.
- **Comunicadores:** transmiten los eventos hacia la central de monitoreo por línea telefónica, GPRS/4G, IP Ethernet o radiofrecuencia.

### 2. Diagrama en bloques del sistema convencional

Un sistema de alarmas convencional se compone de:

- **Detectores o iniciadores:** elementos que detectan la condición anormal (intrusión, incendio, pánico).
- **Panel de control:** recibe las señales de las zonas y ejecuta la respuesta programada.
- **Anunciadores:** sirenas, luces estroboscópicas y parlantes que dan aviso local.
- **Fuente de poder y batería:** garantizan el funcionamiento continuo, incluso con corte de energía eléctrica.

### 3. Sistemas de alarmas por regiones

- Los sistemas por regiones o direccionables identifican cada dispositivo individualmente (no solo la zona), lo que acelera la localización del evento y reduce el tiempo de respuesta.
- Permiten supervisar permanentemente el estado de cada detector y detectar sabotajes o desconexiones (condición de "problema" o trouble).

### 4. Buenas prácticas del operador con la central

- Conocer la distribución de zonas y su significado operativo.
- Mantener en secreto las claves de operación; solo personal autorizado debe manipular la central.
- Verificar el estado de baterías y comunicadores al inicio de cada turno.
- Registrar toda activación, prueba y mantenimiento en el libro de novedades.

---

## Submódulo 2.5: Fundamentos Eléctricos y Electrónicos del Sistema

### 1. El sistema integral de seguridad

Todo sistema integral de seguridad combina tres grupos de medios:

- **Medios humanos:** personal con calificación y formación específica para cumplir roles preventivos y reactivos (agentes de la seguridad pública, institucional y privada).
- **Medidas organizativas:** planes, normas y estrategias que gestionan adecuadamente los medios humanos y técnicos.
- **Medios técnicos:** sistemas electrónicos que apoyan a los medios humanos, aumentando la efectividad del control y la vigilancia, agilizando la intervención y racionalizando el empleo de efectivos.

### 2. Conceptos eléctricos básicos aplicados

- **Voltaje (tensión):** diferencia de potencial que impulsa la corriente eléctrica. Se mide en voltios (V). Los equipos de seguridad suelen operar en corriente continua de baja tensión (por ejemplo, 12 V o 24 V CC), alimentados por transformadores o fuentes de poder.
- **Corriente:** flujo de carga eléctrica por un conductor. Se mide en amperios (A).
- **Corriente alterna (CA) y continua (CC):** la red eléctrica domiciliaria entrega corriente alterna (por ejemplo, 220 V CA en Chile); los equipos electrónicos internamente trabajan en corriente continua.
- **Potencia:** energía consumida por unidad de tiempo. Se mide en watts (W). Determina la capacidad de las fuentes de alimentación necesarias.
- **Continuidad:** propiedad de un circuito cerrado que permite el paso de la corriente; la apertura de un circuito (corte de cable) es detectada por los sistemas supervisados.

### 3. Alimentación y respaldo de energía

- **Fuentes de poder:** convierten la corriente alterna de la red en la tensión continua que requieren cámaras, centrales y detectores.
- **Baterías de respaldo:** mantienen operativo el sistema ante cortes de suministro. La normativa de seguridad exige que los sistemas críticos (alarmas, cajeros) sigan funcionando sin energía de red.
- **UPS (sistema de energía ininterrumpida):** protege los equipos de cortes y variaciones de voltaje, entregando energía limpia y tiempo de operación adicional.
- **PoE (Power over Ethernet):** tecnología que transmite energía y datos por un mismo cable de red (par trenzado), simplificando la instalación de cámaras IP y otros dispositivos.

### 4. La señal de video y su fragilidad

- La señal de video emitida por una cámara es del orden de **1 a 1,2 voltios pico a pico**; es una señal débil y sensible a interferencias.
- La pérdida de amplitud significativa (del orden de 0,1 voltios o más) degrada el contraste de la imagen; pérdidas mayores provocan inestabilidad o pérdida de sincronía.
- El buen diseño de un sistema busca minimizar interferencias y pérdidas en todos los tramos de transmisión.

---

## Submódulo 2.6: Componentes y Arquitectura del Sistema CCTV

### 1. Aplicaciones del CCTV

- **Aplicaciones de vigilancia:** observación remota de áreas en tiempo real.
- **Aplicaciones de seguridad:** registro probatorio de eventos y disuasión.
- **Herramienta de administración:** verificación de procesos, control de flujos y supervisión de zonas de trabajo.

### 2. Sistemas básicos y complejos

- **Sistema básico:** una cámara conectada directamente a un monitor. Primer paso de todo diseño: definir el objetivo del sistema.
- **Sistemas complejos:** incorporan equipos de procesamiento para gestionar múltiples cámaras:
  - **Secuenciador:** muestra una cámara a la vez, alternándolas en forma programada.
  - **QUAD:** divide la pantalla en cuatro cuadrantes mostrando cuatro cámaras simultáneamente.
  - **Multiplexor:** permite ver y grabar varias cámaras al mismo tiempo, combinando las señales sin perder información.
  - **Videograbadora:** registra las imágenes para su consulta posterior.

### 3. Luminotecnia aplicada al CCTV

- **Flujo luminoso:** cantidad total de luz radiada por una fuente por segundo; se expresa en **lúmenes (lm)**. Una ampolleta incandescente de 100 watts entrega entre 1.200 y 1.800 lúmenes.
- **Iluminancia:** flujo luminoso incidente sobre una superficie; se expresa en **lux (lx)**. Un lux equivale a un lumen por metro cuadrado. Una instalación de buena calidad para lectura requiere entre 500 y 1.000 lux sobre el plano de trabajo.
- **Sensibilidad de la cámara:** se mide en lux. A menor cantidad de luz, se requiere mayor sensibilidad. Las cámaras actuales oscilan entre **2 lux y 0,04 lux**; una cámara de 0,1 lux puede ver con cierta nitidez con la luz de una vela a 30 cm.
- **Fuentes de luz:** naturales (sol) o artificiales (incandescentes, fluorescentes, LED). La elección entre cámaras color o blanco y negro depende de la iluminación disponible: las cámaras blanco y negro funcionan con menos luz que las de color.

### 4. La cámara y el lente

Consideraciones para una acertada selección del lente:

1. Clase de cámara y su formato.
2. Distancia desde la cámara hacia la escena.
3. Campo de visión deseado.
4. Tipo de iris.
5. Presentación en blanco y negro o color.

- **Formato de la cámara:** está determinado por el tamaño de la sección de imagen utilizable en la que el lente enfoca la luz (por ejemplo, formato de 1/3" o 1/4"). El lente debe ser compatible con el formato de la cámara.
- **Distancia focal:** determina el ángulo visual y el campo de imagen. A mayor distancia focal, mayor acercamiento y menor ángulo. Referencia de cobertura de un lente de 1/3" a 10 metros de distancia:
  - 2,8 mm: 17,1 m horizontales x 12,9 m verticales.
  - 4 mm: 12 m x 9 m.
  - 6 mm: 8 m x 6 m.
  - 8 mm: 6 m x 4,5 m.
  - 12 mm: 4 m x 3 m.
  - 16 mm: 3 m x 2,3 m.
- **Gran angular:** lente de distancia focal corta que cubre un campo amplio, adecuado para áreas grandes a corta distancia.

### 5. Cámaras domo y PTZ

- **Cámaras domo:** cámaras PTZ (pan/tilt/zoom: giro horizontal, giro vertical y acercamiento) alojadas en cubiertas oscuras de plexiglás llamadas domos.
- Beneficios de las cámaras domo:
  - **Disuasión:** el sospechoso no puede determinar hacia dónde apunta la cámara.
  - **Economía:** una cámara móvil puede cubrir el trabajo de varias fijas.
  - **Estética:** integración visual discreta en el entorno.

### 6. El iris del lente

- **Función:** controla la cantidad de luz que pasa a través del lente para ser enfocada en el sensor.
- **Iris fijo:** mantiene una apertura constante, adecuado para ambientes con iluminación estable.
- **Iris manual:** el instalador ajusta la apertura según la luz disponible.
- **Auto iris:** ajusta automáticamente la apertura en proporción directa al voltaje de la señal de video de salida (muestreo de video), ideal para ambientes con luz variable.
- La apertura no debe ser demasiado pequeña, porque distorsiona la imagen.

### 7. Métodos de transmisión

- La elección del método de transmisión depende de la distancia, el ambiente y los costos. Todos los métodos sufren interferencias o pérdidas; el buen diseño las minimiza.
- **Cable coaxial:** proporciona una conexión física continua entre la cámara y el monitor. Es blindado para minimizar interferencias. Es el método más corriente y económico para señales de corto alcance en CCTV tradicional.
- **Par trenzado (UTP):** utilizado en sistemas IP, con o sin baluns convertidores para sistemas analógicos.
- **Fibra óptica:** transmite mediante modulación de luz; ideal para grandes distancias y ambientes con alta interferencia.
- **Enlaces inalámbricos:** microondas o Wi-Fi para puntos donde el cableado es inviable.

### 8. El monitor

- Es el equipo que reproduce la imagen creada por la cámara. Es similar a un televisor, pero sin circuito de sintonía.
- Su característica principal es la durabilidad de la pantalla: en CCTV se exige operación continua 24/7, por años, sin degradación de la calidad de imagen, en ambientes exigentes.
- Existen monitores en blanco y negro y en color, en distintos tamaños y resoluciones.

### 9. Video digital versus video analógico

- **Sistema analógico (VCR):** cámaras conectadas a procesadores de video y videograbadoras de cinta. Las imágenes se degradan con el tiempo y el almacenamiento es voluminoso.
- **Sistema digital (DVR/NVR):**
  - Graba digitalmente en disco rígido; la información no se degrada con el tiempo.
  - Permite monitoreo a través de red local (LAN) o Internet, con acceso desde cualquier ubicación autorizada.
  - Es más rápido, escalable y fácil de administrar; se integra con instalaciones existentes.
  - Un DVR gestiona cámaras analógicas (digitalizando la señal); un NVR gestiona cámaras IP conectadas a la red.
- **Compresión de video:** los grabadores utilizan códecs (como H.264 o H.265) para reducir el espacio de almacenamiento manteniendo calidad aceptable.

### 10. Almacenamiento de la información

- El almacenamiento se efectúa en medios magnéticos: cintas (analógico) o discos duros (digital).
- Los plazos de retención de grabaciones están regulados por la normativa de seguridad (ver Módulo 1): 15 a 30 días hábiles según el tipo de instalación, y hasta 24 meses ante delitos o ataques.
- Se recomienda configurar grabación cíclica con capacidad suficiente para cumplir los plazos legales, y respaldar los eventos relevantes antes de que se sobrescriban.

---

## Submódulo 2.7: Centrales de Alarma, Detección de Incendio y Evacuación

### 1. El fuego y el triángulo del fuego

- **Fuego:** reacción química de óxido-reducción de carácter exotérmico. Cuando se descontrola se genera un incendio.
- **Triángulo del fuego:** para que exista fuego se requieren tres factores: **combustible, oxígeno y calor**. La eliminación de cualquiera de ellos extingue el fuego.
  - **Combustible:** materia que arde; determina el tipo de fuego y su velocidad de propagación.
  - **Oxígeno (comburente):** presente en el aire en un 21% en volumen; bajo el 15% la combustión se extingue.
  - **Calor:** energía de activación (cigarrillos, chispas, fallas eléctricas, etc.).

### 2. Sistemas de detección de incendio

- Es imprescindible contar con un sistema de detección fiable, de alerta temprana, que cubra todo el edificio.
- Según la norma **NFPA-72**, los detectores automáticos de fuego están diseñados para detectar la presencia de fuego e iniciar una acción, pudiendo activar sistemas de alarma, extinción y control.
- Los detectores deben estar certificados (por ejemplo, normas UL), y su selección y ubicación son determinantes para su eficacia.

### 3. Tipos de detectores automáticos de fuego

Se clasifican según la característica del fuego que detectan: **humo, calor, llama, gas** y combinaciones. Los más utilizados en edificios son los de humo y calor; los de llama y gas se usan en ambientes con riesgo de explosión.

#### Detectores de humo

- **Iónicos:** detectan partículas de combustión invisibles (menores a una micra), presentes en fuegos con llama de desarrollo rápido. Utilizan una cámara de ionización con una fuente radiactiva (Americio Am-241); el humo reduce la corriente de la cámara y genera la alarma. La versión de doble cámara (sensible y de referencia) compensa los efectos de humedad y presión. Son vulnerables al polvo, corrientes de aire e insectos. Adecuados para lugares con grasa, gas, químicos o papel.
- **Fotoeléctricos:** detectan el humo por su efecto sobre un haz de luz (oscurecimiento o difusión). Son ideales para fuegos de combustión lenta con partículas de 0,3 a 10 micras (tejidos, madera, espuma), recomendados para oficinas y viviendas.
- **De haz proyectado:** operan por oscurecimiento de un haz de luz; protegen grandes áreas abiertas (alcance de 100 metros o más), como naves y salones de altura.

#### Otros detectores

- **Detectores de calor (térmicos):** responden a temperatura fija o a velocidad de aumento de temperatura.
- **Detectores de llama:** sensibles a la radiación ultravioleta o infrarroja de las llamas.
- **Detectores de gas:** detectan concentraciones de gases combustibles o tóxicos.
- **Palancas manuales:** estaciones de activación manual ubicadas en vías de evacuación.

### 4. Componentes del sistema de detección de incendio

- **Panel de control:** supervisa los circuitos, procesa las alarmas y activa los anunciadores.
- **Iniciadores:** detectores de fuego, palancas manuales, monitores de flujo y supervisores de válvulas.
- **Anunciadores:** sirenas, luces estroboscópicas y parlantes.
- **Fuentes de poder y batería:** garantizan operación continua ante cortes de energía.
- **Supervisión eléctrica:** el cableado debe ser supervisado; si se retira un detector, el circuito se abre y se genera una condición de "problema" (trouble).

### 5. Extinción y evacuación

- **Sprinklers (rociadores):** sistemas de agua a presión que se activan automáticamente ante el calor de un incendio, reduciendo las pérdidas cuando la prevención falla.
- **Vías de evacuación:** deben permanecer expeditas y señalizadas.
- **Zona de seguridad:** área preestablecida de concentración del personal evacuado.
- **Prohibiciones en siniestros:** queda prohibido el uso de ascensores durante un incendio (riesgo de atrapamiento y efecto chimenea).
- **Acciones del operador ante alarma de incendio:** avisar a Bomberos, Carabineros y a la jefatura de seguridad, activar el plan de evacuación y, en lo posible, cortar la energía que alimenta la red eléctrica.

### 6. Mantenimiento y buenas prácticas

- Realizar pruebas periódicas de detectores, baterías y sirenas.
- Mantener los detectores libres de polvo y suciedad.
- Registrar toda prueba, alarma y mantenimiento en el libro de novedades.
- Verificar que extintores y red seca se encuentren accesibles y operativos.
