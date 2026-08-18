import type { BancoModulo } from "./types";

// Preguntas fundamentadas en los PDFs oficiales "Seguridad Física de Instalaciones
// y Accesos" y "Técnicas de Vigilancia y Pauta de Puesto" del Manual OS-10 Aprecap.

export const bancoModulo2: BancoModulo = {
  numero: 2,
  titulo: "Seguridad Corporativa",
  alternativas: [
    {
      id: "m2_a1",
      pregunta:
        "¿Qué es el Estudio de Seguridad según el manual?",
      opciones: [
        "Un formulario que llena el guardia al inicio de cada turno",
        "Un documento elaborado por las entidades obligadas conforme a la Ley N° 21.659 que concluye con una apreciación de vulnerabilidades y análisis de áreas de riesgo",
        "Un certificado emitido por Carabineros para cada guardia",
        "Un registro mensual de incidentes de la instalación",
      ],
      respuestaCorrecta:
        "Un documento elaborado por las entidades obligadas conforme a la Ley N° 21.659 que concluye con una apreciación de vulnerabilidades y análisis de áreas de riesgo",
      explicacion:
        "El Estudio de Seguridad es un documento elaborado por las entidades obligadas (bancarias, financieras, públicas, de transporte de valores, estratégicas y de utilidad pública) conforme a la Ley N° 21.659, que basado en sus políticas de seguridad concluye con una apreciación de vulnerabilidades y un análisis de causas, objeto y áreas de riesgo. No es un formulario de turno del guardia, ni un certificado individual de Carabineros, ni un registro mensual de incidentes.",
    },
    {
      id: "m2_a2",
      pregunta:
        "¿De quién es la responsabilidad del Estudio de Seguridad y quién debe suscribirlo?",
      opciones: [
        "Del guardia jefe de turno, suscribiéndolo él mismo",
        "De Carabineros, que lo firma la Prefectura",
        "De la Gerencia de la entidad, suscrito por su representante legal",
        "De la empresa de seguridad contratada, firmado por su supervisor",
      ],
      respuestaCorrecta:
        "De la Gerencia de la entidad, suscrito por su representante legal",
      explicacion:
        "El manual señala que el Estudio de Seguridad es de responsabilidad de la Gerencia de la entidad y debe ser suscrito por su representante legal. El guardia jefe de turno no tiene esa responsabilidad gerencial; Carabineros solo fiscaliza y aprueba el documento, no lo elabora; y la empresa de seguridad contratada tampoco lo suscribe, pues el estudio pertenece a la entidad obligada.",
    },
    {
      id: "m2_a3",
      pregunta:
        "¿Por qué la barrera HUMANA es considerada la más importante?",
      opciones: [
        "Porque es la más económica de implementar",
        "Porque es la única barrera capaz de detectar al intruso, dar la alarma, detenerlo, obtener su identidad y neutralizarlo",
        "Porque reemplaza totalmente a la tecnología",
        "Porque no requiere capacitación",
      ],
      respuestaCorrecta:
        "Porque es la única barrera capaz de detectar al intruso, dar la alarma, detenerlo, obtener su identidad y neutralizarlo",
      explicacion:
        "La barrera humana es la más importante porque es la única capaz de detectar al intruso, dar la alarma, detenerlo, obtener su identidad y neutralizarlo, y aún no ha sido reemplazada por ningún elemento artificial. No es por su costo (una persona bien capacitada cuesta), no reemplaza la tecnología sino que la complementa, y sí exige capacitación permanente.",
    },
    {
      id: "m2_a4",
      pregunta:
        "En el ciclo de control de accesos, ¿cuál es la fase MÁS IMPORTANTE?",
      opciones: [
        "La verificación de identidad",
        "La autorización de acceso",
        "El registro, porque deja constancia escrita y auditable",
        "La escolta de visitas",
      ],
      respuestaCorrecta:
        "El registro, porque deja constancia escrita y auditable",
      explicacion:
        "El manual define el registro como la fase más importante del ciclo de control de accesos, porque deja constancia escrita y auditable de quién ingresó, cuándo y a qué lugar. La verificación de identidad y la autorización de acceso son fases necesarias del ciclo, pero no la más importante, y la escolta de visitas es una medida complementaria, no una fase del ciclo.",
    },
    {
      id: "m2_a5",
      pregunta:
        "¿Qué diferencia hay entre una RONDA y un PATRULLAJE?",
      opciones: [
        "La ronda se hace en vehículo y el patrullaje a pie",
        "La ronda es un control móvil con detenimiento, recorridos cortos y misiones específicas al interior; el patrullaje es el control general de zonas más extensas",
        "La ronda solo se ejecuta de día",
        "No existe diferencia entre ambos términos",
      ],
      respuestaCorrecta:
        "La ronda es un control móvil con detenimiento, recorridos cortos y misiones específicas al interior; el patrullaje es el control general de zonas más extensas",
      explicacion:
        "El manual distingue ambos conceptos: la ronda es un control móvil con detenimiento, recorridos cortos y misiones específicas al interior de la instalación, mientras que el patrullaje es el control general de zonas más extensas y requiere puntos de control para supervisar el desplazamiento. La diferencia no está en el vehículo (puede ser a pie en ambos), ni en el horario, y sí existe una diferencia técnica entre ambos.",
    },
    {
      id: "m2_a6",
      pregunta:
        "¿Cuándo se efectúa la PRIMERA ronda del turno?",
      opciones: [
        "Al momento de entregar el turno, antes de irse",
        "Al recibirse del turno; es la más importante de todas",
        "A medianoche, que es la hora de mayor riesgo",
        "Solo cuando se detecta una anomalía",
      ],
      respuestaCorrecta:
        "Al recibirse del turno; es la más importante de todas",
      explicacion:
        "El manual indica que la primera ronda se efectúa al recibirse del turno y es la más importante de todas, pues permite conocer el estado real de la instalación que se asume. Al entregar el turno se hace la rendición final, no la primera ronda; la medianoche no tiene esa jerarquía; y las rondas son preventivas, no solo ante anomalías.",
    },
    {
      id: "m2_a7",
      pregunta:
        "Ante un paquete sospechoso con posible amenaza de explosivo, ¿qué debe hacer el guardia?",
      opciones: [
        "Abrirlo cuidadosamente para verificar su contenido",
        "Trasladarlo fuera del recinto lo antes posible",
        "NO TOCAR, NO MOVER, NO LEVANTAR; observar, anotar y avisar de inmediato",
        "Cubrirlo con una manta y esperar",
      ],
      respuestaCorrecta:
        "NO TOCAR, NO MOVER, NO LEVANTAR; observar, anotar y avisar de inmediato",
      explicacion:
        "El manual lo resume con la regla 'NO TOCAR, NO MOVER, NO LEVANTAR; al tocar puede explotar'. Abrirlo o trasladarlo puede detonar el artefacto y exponer a las personas; cubrirlo con una manta no elimina el riesgo ni cumple el protocolo, que ordena observar, anotar y avisar de inmediato a las autoridades.",
    },
    {
      id: "m2_a8",
      pregunta:
        "¿A qué temperatura se activa generalmente un rociador automático (sprinkler)?",
      opciones: ["A 30°C", "A 100°C", "Aproximadamente a 57°C", "Al detectar humo visible"],
      respuestaCorrecta: "Aproximadamente a 57°C",
      explicacion:
        "El manual indica que los sprinklers se activan por la temperatura del incendio, generalmente a 57°C, proyectando agua sobre la zona del fuego. 30°C es una temperatura ambiente normal y no activaría el rociador; 100°C es la temperatura del agua en ebullición y ya sería un incendio avanzado; y la detección de humo es función del detector de humo fotoeléctrico, no del rociador.",
    },
    {
      id: "m2_a9",
      pregunta:
        "¿En qué sentido debe realizarse el registro de una instalación en busca de explosivos?",
      opciones: [
        "De adentro hacia afuera y de arriba hacia abajo",
        "De afuera hacia adentro y de abajo hacia arriba",
        "Desde el centro del edificio hacia los accesos",
        "Solo en las zonas de acceso del público",
      ],
      respuestaCorrecta: "De afuera hacia adentro y de abajo hacia arriba",
      explicacion:
        "El manual establece ese orden: de afuera hacia adentro y de abajo hacia arriba, para cubrir sistemáticamente toda la instalación. Los otros sentidos invierten la secuencia recomendada, y restringir la búsqueda solo a las zonas de público dejaría sin revisar las áreas interiores donde también pueden ocultarse artefactos.",
    },
    {
      id: "m2_a10",
      pregunta:
        "¿Qué es el SITIO DEL SUCESO según el manual?",
      opciones: [
        "El lugar donde ocurrió el accidente laboral exclusivamente",
        "Todo lugar con huellas, rastros o indicios relacionados directa o indirectamente con el hecho investigado",
        "La oficina donde se redacta el informe policial",
        "La dependencia de Carabineros donde se entrega al detenido",
      ],
      respuestaCorrecta:
        "Todo lugar con huellas, rastros o indicios relacionados directa o indirectamente con el hecho investigado",
      explicacion:
        "El manual define el Sitio del Suceso como todo lugar con huellas, rastros o indicios relacionados directa o indirectamente con el hecho investigado. No se limita a accidentes laborales; no es la oficina donde se redacta el informe (ese es un lugar administrativo); y tampoco es la dependencia policial donde se entrega al detenido.",
    },
  ],
  vf: [
    {
      id: "m2_v1",
      afirmacion:
        "El Estudio de Seguridad debe contener las cantidades mínimas y máximas de recurso humano con proyección de crecimiento dentro del plazo de dos años de vigencia del decreto.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual exige que el Estudio de Seguridad incluya las cantidades mínimas y máximas de recurso humano, con proyección de crecimiento dentro del plazo de dos años de vigencia del decreto.",
    },
    {
      id: "m2_v2",
      afirmacion:
        "El Estudio de Seguridad es elaborado por Carabineros de Chile y firmado por el guardia de turno.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el Estudio de Seguridad es de responsabilidad de la Gerencia de la entidad y lo suscribe su representante legal. Carabineros solo fiscaliza y aprueba el documento, y el guardia de turno no tiene participación en su elaboración ni firma.",
    },
    {
      id: "m2_v3",
      afirmacion:
        "La Directiva de Funcionamiento regula el objetivo del servicio, las tareas, los medios empleados, el espacio físico limitado y el tipo de uniforme.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: mediante la aprobación de la Directiva de Funcionamiento la Autoridad Fiscalizadora regula el objetivo del servicio contratado, sus tareas, los medios empleados, el espacio físico limitado y el tipo de uniforme.",
    },
    {
      id: "m2_v4",
      afirmacion:
        "El Jefe de Seguridad es el máximo responsable gerencial de la seguridad de una empresa privada y solo puede existir uno por empresa.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define al Jefe de Seguridad como el máximo responsable gerencial de la seguridad de la empresa privada, existiendo solo uno por empresa.",
    },
    {
      id: "m2_v5",
      afirmacion:
        "La autorización del Jefe de Seguridad lo acredita por un período de dos años renovable.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el texto indica que la autorización del Jefe de Seguridad lo acredita por un período de dos años renovable.",
    },
    {
      id: "m2_v6",
      afirmacion:
        "Una barrera de seguridad es todo obstáculo activo o pasivo que impide, retarda, disminuye o evita daños a personas o bienes.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición literal de barrera de seguridad del manual: todo obstáculo activo o pasivo que impide, retarda, disminuye o evita daños a personas o bienes.",
    },
    {
      id: "m2_v7",
      afirmacion:
        "Las barreras físicas dinámicas son los muros, paredes y rejas de una instalación.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: los muros, paredes y rejas fijas son barreras físicas ESTÁTICAS. Las barreras dinámicas son aquellas que se desplazan, como puertas, ventanas, rejas correderas y cortinas.",
    },
    {
      id: "m2_v8",
      afirmacion:
        "Los sensores PIR (infrarrojo pasivo) detectan la temperatura corporal de un ser vivo y se ubican en la parte superior de las esquinas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así el funcionamiento de los sensores PIR: detectan la temperatura corporal de un ser vivo y se instalan en la parte superior de las esquinas del recinto.",
    },
    {
      id: "m2_v9",
      afirmacion:
        "La barrera humana puede ser reemplazada por sistemas electrónicos modernos sin pérdida de eficacia.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual afirma que el elemento humano aún no ha sido reemplazado por ningún elemento artificial, y que la barrera humana es la más importante del sistema de seguridad.",
    },
    {
      id: "m2_v10",
      afirmacion:
        "NADIE puede quedar exento del control de accesos, aun tratándose de personas conocidas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo establece expresamente: nadie puede quedar exento del control de accesos, aun cuando se trate de personas conocidas, porque el control es la base de la seguridad del recinto.",
    },
    {
      id: "m2_v11",
      afirmacion:
        "La fase más importante del ciclo de control de accesos es la verificación de identidad.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la fase más importante del ciclo de control de accesos es el REGISTRO, porque deja constancia escrita y auditable. La verificación de identidad es necesaria, pero el manual destaca al registro como la fase más importante.",
    },
    {
      id: "m2_v12",
      afirmacion:
        "Al cerrar la instalación, el guardia debe revisar toda el área para evitar el ocultamiento de intrusos o paquetes sospechosos y tener especial cuidado con ceniceros, estufas y máquinas eléctricas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: son medidas expresas del protocolo de cierre del manual: revisar toda el área (evitando intrusos o paquetes ocultos) y prestar especial atención a ceniceros, estufas y máquinas eléctricas que puedan generar incendios.",
    },
    {
      id: "m2_v13",
      afirmacion:
        "Las rondas rutinarias, con los mismos horarios y recorridos, son recomendables porque dan previsibilidad al personal.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual dice lo contrario: las rondas rutinarias con horarios y recorridos fijos deben evitarse, porque vulneran un principio básico de la seguridad (la imprevisibilidad) y facilitan la planificación del delito. Se deben usar rutas y horarios diferentes.",
    },
    {
      id: "m2_v14",
      afirmacion:
        "Durante las rondas, el guardia puede salir de la instalación para observar vehículos sospechosos en las inmediaciones.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que los vehículos sospechosos deben observarse SIN salir de la instalación. Salir del perímetro abandona el puesto y puede exponer al guardia innecesariamente.",
    },
    {
      id: "m2_v15",
      afirmacion:
        "Ante amenaza de bomba, se debe cortar el fluido eléctrico y el agua, aislar el área evacuando personas y desviar o cortar el tránsito de vehículos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esas medidas ante amenaza de artefacto explosivo: cortar el fluido eléctrico y el agua, aislar el área evacuando personas y desviar o cortar el tránsito de vehículos.",
    },
    {
      id: "m2_v16",
      afirmacion:
        "El rociador automático (sprinkler) se activa al detectar humo mediante una célula fotoeléctrica.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el sprinkler reacciona a la TEMPERATURA (generalmente 57°C) y proyecta agua sobre la zona del fuego. La célula fotoeléctrica corresponde al detector de humo, un dispositivo distinto.",
    },
    {
      id: "m2_v17",
      afirmacion:
        "En un siniestro o incendio, el guardia debe recomendar el uso de ascensores para evacuar más rápido.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual es categórico: NO USAR ASCENSORES en un siniestro, porque pueden detenerse por el corte de energía o quedar atrapadas personas. La evacuación se hace por las escaleras.",
    },
    {
      id: "m2_v18",
      afirmacion:
        "La CRA (Central Receptora de Alarmas) recibe las señales de intrusión, alarmas técnicas o pánico; su personal confirma la alarma y avisa a la policía y/o al usuario.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: así describe el manual el funcionamiento de la Central Receptora de Alarmas: recibe las señales de intrusión, alarmas técnicas o de pánico, su personal confirma la alarma y avisa a la policía y/o al usuario.",
    },
    {
      id: "m2_v19",
      afirmacion:
        "El robo se diferencia del hurto porque el robo emplea violencia, intimidación o fuerza para apropiarse de cosa mueble ajena.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual cita los Arts. 432 y 439 del Código Penal: si la apropiación de cosa mueble ajena emplea violencia, intimidación o fuerza, es robo; si faltan esos elementos, es hurto.",
    },
    {
      id: "m2_v20",
      afirmacion:
        "La seguridad privada en una empresa debe verse como un gasto inevitable más que como una inversión.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual afirma lo contrario: la seguridad no debe verse como un gasto, sino como una inversión, porque protege las personas, los bienes y la continuidad operativa de la empresa.",
    },
  ],
};