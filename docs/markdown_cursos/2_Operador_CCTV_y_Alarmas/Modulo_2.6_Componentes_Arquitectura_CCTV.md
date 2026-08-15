# Submódulo 2.6: Componentes y Arquitectura del Sistema CCTV

## 1. Aplicaciones del CCTV

- **Aplicaciones de vigilancia:** observación remota de áreas en tiempo real.
- **Aplicaciones de seguridad:** registro probatorio de eventos y disuasión.
- **Herramienta de administración:** verificación de procesos, control de flujos y supervisión de zonas de trabajo.

## 2. Sistemas básicos y complejos

- **Sistema básico:** una cámara conectada directamente a un monitor. Es el primer paso de todo diseño: definir el objetivo del sistema.
- **Sistemas complejos:** incorporan equipos de procesamiento para gestionar múltiples cámaras:
  - **Secuenciador:** muestra una cámara a la vez, alternándolas en forma programada.
  - **QUAD:** divide la pantalla en cuatro cuadrantes mostrando cuatro cámaras simultáneamente.
  - **Multiplexor:** permite ver y grabar varias cámaras al mismo tiempo, combinando las señales sin perder información.
  - **Videograbadora:** registra las imágenes para su consulta posterior.

## 3. Luminotecnia aplicada al CCTV

- **Flujo luminoso:** cantidad total de luz radiada por una fuente por segundo; se expresa en **lúmenes (lm)**. Una ampolleta incandescente de 100 watts entrega entre 1.200 y 1.800 lúmenes.
- **Iluminancia:** flujo luminoso incidente sobre una superficie; se expresa en **lux (lx)**. Un lux equivale a un lumen por metro cuadrado. Una instalación de buena calidad para lectura y escritura requiere entre 500 y 1.000 lux sobre el plano de trabajo.
- **Sensibilidad de la cámara:** se mide en lux. A menor cantidad de luz, se requiere mayor sensibilidad. Las cámaras actuales oscilan entre **2 lux y 0,04 lux**; una cámara de 0,1 lux puede ver con cierta nitidez con la luz de una vela a 30 cm.
- **Fuentes de luz:** naturales (sol) o artificiales (incandescentes, fluorescentes, LED). La elección entre cámaras color o blanco y negro depende de la iluminación disponible: las cámaras blanco y negro funcionan con menos luz que las de color.

## 4. La cámara y el lente

Consideraciones para una acertada selección del lente:

1. Clase de cámara y su formato.
2. Distancia desde la cámara hacia la escena.
3. Campo de visión deseado.
4. Tipo de iris.
5. Presentación en blanco y negro o color.

### Formato de la cámara

- Está determinado por el tamaño de la sección de imagen utilizable en la que el lente enfoca la luz (por ejemplo, formato de 1/3" o 1/4").
- El lente debe ser compatible con el formato de la cámara.

### Distancia focal y campo de visión

- La distancia focal determina el ángulo visual y el campo de imagen: a mayor distancia focal, mayor acercamiento y menor ángulo.
- Referencia de cobertura de un lente de 1/3" a 10 metros de distancia:

| Lente (mm) | Horizontal (m) | Vertical (m) |
|------------|----------------|--------------|
| 2,8        | 17,1           | 12,9         |
| 4          | 12             | 9            |
| 6          | 8              | 6            |
| 8          | 6              | 4,5          |
| 12         | 4              | 3            |
| 16         | 3              | 2,3          |

- **Gran angular:** lente de distancia focal corta que cubre un campo amplio, adecuado para áreas grandes a corta distancia.

## 5. Cámaras domo y PTZ

- **Cámaras domo:** cámaras PTZ (pan/tilt/zoom: giro horizontal, giro vertical y acercamiento) alojadas en cubiertas oscuras de plexiglás llamadas domos.
- Beneficios de las cámaras domo:
  - **Disuasión:** el sospechoso no puede determinar hacia dónde apunta la cámara.
  - **Economía:** una cámara móvil puede cubrir el trabajo de varias fijas.
  - **Estética:** integración visual discreta en el entorno.

## 6. El iris del lente

- **Función:** controla la cantidad de luz que pasa a través del lente para ser enfocada en el sensor.
- **Iris fijo:** mantiene una apertura constante; adecuado para ambientes con iluminación estable.
- **Iris manual:** el instalador ajusta la apertura según la luz disponible.
- **Auto iris:** ajusta automáticamente la apertura en proporción directa al voltaje de la señal de video de salida (proceso de muestreo de video), ideal para ambientes con luz variable.
- La apertura no debe ser demasiado pequeña, porque distorsiona la imagen.

## 7. Métodos de transmisión

- La elección del método depende de la distancia, el ambiente y los costos. Todos los métodos sufren interferencias o pérdidas; el buen diseño las minimiza.
- **Cable coaxial:** conexión física continua entre la cámara y el monitor. Es blindado para minimizar interferencias. Es el método más corriente y económico para señales de corto alcance en CCTV tradicional. Estructura: conductor central de cobre, aislante, malla de blindaje y cubierta protectora.
- **Par trenzado (UTP):** utilizado en sistemas IP, con o sin baluns convertidores para sistemas analógicos.
- **Fibra óptica:** transmite mediante modulación de luz; ideal para grandes distancias y ambientes con alta interferencia.
- **Enlaces inalámbricos:** microondas o Wi-Fi para puntos donde el cableado es inviable.

## 8. El monitor

- Es el equipo que reproduce la imagen creada por la cámara. Es similar a un televisor, pero sin circuito de sintonía.
- Su característica principal es la durabilidad de la pantalla: en CCTV se exige operación continua 24/7, por años, sin degradación de la calidad de imagen, en ambientes exigentes u hostiles.
- Existen monitores en blanco y negro y en color, en distintos tamaños y resoluciones; los monitores de seguridad se seleccionan según la cantidad de cámaras y la exigencia de detalle.

## 9. Video digital versus video analógico

### Sistema analógico (VCR)

- Cámaras conectadas a procesadores de video y videograbadoras de cinta.
- Las imágenes se degradan con el tiempo y el almacenamiento es voluminoso.

### Sistema digital (DVR/NVR)

- Graba digitalmente en disco rígido; la información guardada no se degrada con el tiempo.
- Permite monitoreo a través de red local (LAN) o Internet, con acceso desde cualquier ubicación autorizada.
- Es más rápido, escalable y fácil de administrar; se integra con instalaciones existentes.
- **DVR (Digital Video Recorder):** gestiona cámaras analógicas, digitalizando la señal para grabarla.
- **NVR (Network Video Recorder):** gestiona cámaras IP conectadas a la red.
- La compresión de video (códecs como H.264 o H.265) reduce el espacio de almacenamiento manteniendo calidad aceptable.

## 10. Almacenamiento de la información

- El almacenamiento se efectúa en medios magnéticos: cintas (analógico) o discos duros (digital).
- Los plazos de retención de grabaciones están regulados por la normativa de seguridad: 15 a 30 días hábiles según el tipo de instalación, 90 días en estadios y hasta 24 meses ante delitos en cajeros.
- Se recomienda configurar grabación cíclica con capacidad suficiente para cumplir los plazos legales y respaldar los eventos relevantes antes de que se sobrescriban.

## 11. Topología típica de un sistema integrado

- **Captura:** cámaras en terreno (analógicas con alimentación por fuente centralizada; IP con PoE desde el switch).
- **Transmisión:** coaxial hacia el DVR para analógicas; cable UTP hacia el switch para IP.
- **Procesamiento y grabación:** el switch agrupa las cámaras IP hacia el NVR; DVR y NVR graban en discos duros internos.
- **Visualización:** estación de monitoreo (PC con software VMS) proyecta las imágenes en monitores con múltiples divisiones.
- **Acceso remoto:** el router envía la señal de forma segura a internet, permitiendo a la gerencia monitorear desde dispositivos móviles.
- **Respaldo eléctrico:** todo el equipamiento crítico se conecta a UPS para evitar apagones.

## 12. Buenas prácticas del operador

- Conocer el mapa de cámaras, coberturas y puntos ciegos de la instalación.
- Verificar la grabación y la hora correcta de los equipos al inicio del turno.
- Reportar imágenes con interferencias, cámaras fuera de foco o grabadores con fallas.
- Mantener la confidencialidad de la información observada y registrada.
