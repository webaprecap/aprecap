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
        "Un documento elaborado por las entidades del Art. 3º del D.L. 3.607 que concluye con una apreciación de vulnerabilidades y análisis de áreas de riesgo",
        "Un certificado emitido por Carabineros para cada guardia",
        "Un registro mensual de incidentes de la instalación",
      ],
      respuestaCorrecta:
        "Un documento elaborado por las entidades del Art. 3º del D.L. 3.607 que concluye con una apreciación de vulnerabilidades y análisis de áreas de riesgo",
      explicacion:
        "El manual define así el Estudio de Seguridad, elaborado por entidades bancarias, financieras, públicas, de transporte de valores, estratégicas y de utilidad pública.",
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
        "El manual señala que el Estudio de Seguridad es de responsabilidad de la Gerencia de la entidad y debe ser suscrito por su representante legal.",
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
        "El manual destaca que la barrera humana es la más importante y que aún no ha sido reemplazada por ningún elemento artificial.",
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
        "El manual define el registro como la fase más importante del ciclo de control de accesos.",
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
        "Así distingue el manual ambos conceptos; el patrullaje además requiere puntos de control para supervisar el desplazamiento.",
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
        "El manual indica que la primera ronda se efectúa al recibirse del turno y es la más importante.",
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
        "El manual lo resume con la regla 'NO TOCAR, NO MOVER, NO LEVANTAR; al tocar puede explotar'.",
    },
    {
      id: "m2_a8",
      pregunta:
        "¿A qué temperatura se activa generalmente un rociador automático (sprinkler)?",
      opciones: ["A 30°C", "A 100°C", "Aproximadamente a 57°C", "Al detectar humo visible"],
      respuestaCorrecta: "Aproximadamente a 57°C",
      explicacion:
        "El manual indica que los sprinklers se activan por la temperatura del incendio, generalmente 57°C, proyectando agua sobre la zona del fuego.",
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
        "El manual establece ese orden: de afuera hacia adentro y de abajo hacia arriba.",
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
        "Así define el manual el Sitio del Suceso.",
    },
  ],
  vf: [
    {
      id: "m2_v1",
      afirmacion:
        "El Estudio de Seguridad debe contener las cantidades mínimas y máximas de recurso humano con proyección de crecimiento dentro del plazo de dos años de vigencia del decreto.",
      respuestaCorrecta: true,
      explicacion:
        "El manual exige incluir cantidades mínimas y máximas de personal con proyección a dos años.",
    },
    {
      id: "m2_v2",
      afirmacion:
        "El Estudio de Seguridad es elaborado por Carabineros de Chile y firmado por el guardia de turno.",
      respuestaCorrecta: false,
      explicacion:
        "Es de responsabilidad de la Gerencia de la entidad y lo suscribe su representante legal; Carabineros solo fiscaliza y aprueba.",
    },
    {
      id: "m2_v3",
      afirmacion:
        "La Directiva de Funcionamiento regula el objetivo del servicio, las tareas, los medios empleados, el espacio físico limitado y el tipo de uniforme.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esos elementos que se regulan mediante la aprobación de la Directiva de Funcionamiento.",
    },
    {
      id: "m2_v4",
      afirmacion:
        "El Jefe de Seguridad es el máximo responsable gerencial de la seguridad de una empresa privada y solo puede existir uno por empresa.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define al Jefe de Seguridad como máximo responsable, cargo gerencial, existiendo solo uno por empresa.",
    },
    {
      id: "m2_v5",
      afirmacion:
        "La autorización del Jefe de Seguridad lo acredita por un período de dos años renovable.",
      respuestaCorrecta: true,
      explicacion:
        "El texto indica que la autorización acredita por dos años renovables.",
    },
    {
      id: "m2_v6",
      afirmacion:
        "Una barrera de seguridad es todo obstáculo activo o pasivo que impide, retarda, disminuye o evita daños a personas o bienes.",
      respuestaCorrecta: true,
      explicacion:
        "Es la definición literal de barrera de seguridad del manual.",
    },
    {
      id: "m2_v7",
      afirmacion:
        "Las barreras físicas dinámicas son los muros, paredes y rejas de una instalación.",
      respuestaCorrecta: false,
      explicacion:
        "Muros, paredes y rejas son barreras físicas ESTÁTICAS; las dinámicas son puertas, ventanas, rejas de correderas y cortinas.",
    },
    {
      id: "m2_v8",
      afirmacion:
        "Los sensores PIR (infrarrojo pasivo) detectan la temperatura corporal de un ser vivo y se ubican en la parte superior de las esquinas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así el funcionamiento y ubicación de los PIR.",
    },
    {
      id: "m2_v9",
      afirmacion:
        "La barrera humana puede ser reemplazada por sistemas electrónicos modernos sin pérdida de eficacia.",
      respuestaCorrecta: false,
      explicacion:
        "El manual afirma que el elemento humano aún no ha sido reemplazado por ningún elemento artificial y es la barrera más importante.",
    },
    {
      id: "m2_v10",
      afirmacion:
        "NADIE puede quedar exento del control de accesos, aun tratándose de personas conocidas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo establece expresamente al describir el control de accesos.",
    },
    {
      id: "m2_v11",
      afirmacion:
        "La fase más importante del ciclo de control de accesos es la verificación de identidad.",
      respuestaCorrecta: false,
      explicacion:
        "La fase más importante es el REGISTRO, que deja constancia escrita.",
    },
    {
      id: "m2_v12",
      afirmacion:
        "Al cerrar la instalación, el guardia debe revisar toda el área para evitar el ocultamiento de intrusos o paquetes sospechosos y tener especial cuidado con ceniceros, estufas y máquinas eléctricas.",
      respuestaCorrecta: true,
      explicacion:
        "Son medidas expresas del protocolo de cierre del manual.",
    },
    {
      id: "m2_v13",
      afirmacion:
        "Las rondas rutinarias, con los mismos horarios y recorridos, son recomendables porque dan previsibilidad al personal.",
      respuestaCorrecta: false,
      explicacion:
        "El manual dice lo contrario: las rondas rutinarias deben evitarse porque vulneran un principio básico de la seguridad; se deben usar rutas diferentes.",
    },
    {
      id: "m2_v14",
      afirmacion:
        "Durante las rondas, el guardia puede salir de la instalación para observar vehículos sospechosos en las inmediaciones.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica observar vehículos sospechosos SIN salir de la instalación.",
    },
    {
      id: "m2_v15",
      afirmacion:
        "Ante amenaza de bomba, se debe cortar el fluido eléctrico y el agua, aislar el área evacuando personas y desviar o cortar el tránsito de vehículos.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esas medidas ante amenaza de artefacto explosivo.",
    },
    {
      id: "m2_v16",
      afirmacion:
        "El rociador automático (sprinkler) se activa al detectar humo mediante una célula fotoeléctrica.",
      respuestaCorrecta: false,
      explicacion:
        "El sprinkler reacciona a la temperatura (generalmente 57°C); la célula fotoeléctrica corresponde al detector de humo.",
    },
    {
      id: "m2_v17",
      afirmacion:
        "En un siniestro o incendio, el guardia debe recomendar el uso de ascensores para evacuar más rápido.",
      respuestaCorrecta: false,
      explicacion:
        "El manual es categórico: NO USAR ASCENSORES en un siniestro.",
    },
    {
      id: "m2_v18",
      afirmacion:
        "La CRA (Central Receptora de Alarmas) recibe las señales de intrusión, alarmas técnicas o pánico; su personal confirma la alarma y avisa a la policía y/o al usuario.",
      respuestaCorrecta: true,
      explicacion:
        "Así describe el manual el funcionamiento de la CRA.",
    },
    {
      id: "m2_v19",
      afirmacion:
        "El robo se diferencia del hurto porque el robo emplea violencia, intimidación o fuerza para apropiarse de cosa mueble ajena.",
      respuestaCorrecta: true,
      explicacion:
        "El manual cita los Arts. 432 y 439 del Código Penal: si faltan la violencia, intimidación o fuerza, es hurto.",
    },
    {
      id: "m2_v20",
      afirmacion:
        "La seguridad privada en una empresa debe verse como un gasto inevitable más que como una inversión.",
      respuestaCorrecta: false,
      explicacion:
        "El manual afirma lo contrario: la seguridad no debe verse como gasto, sino como inversión.",
    },
  ],
};
