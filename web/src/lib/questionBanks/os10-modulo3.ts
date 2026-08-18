import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Prevención de Riesgos y Control de
// Incendios" del Manual Curso de Guardias de Seguridad Privada OS-10 Aprecap.

export const bancoModulo3: BancoModulo = {
  numero: 3,
  titulo: "Riesgos y Control de Incendios",
  alternativas: [
    {
      id: "m3_a1",
      pregunta:
        "¿Qué significan las siglas del sistema G.E.M.A. en la anatomía del accidente?",
      opciones: [
        "Gerencia, Estado, Mutualidad y Ambiente",
        "Gente, Equipo, Material y Ambiente",
        "Gravedad, Evidencia, Magnitud y Acción",
        "Guardia, Empresa, Mando y Accidente",
      ],
      respuestaCorrecta: "Gente, Equipo, Material y Ambiente",
      explicacion:
        "El manual define G.E.M.A.: Gente (personal y administración), Equipo (herramientas o maquinarias), Material (con lo que se trabaja) y Ambiente (todo lo físico que rodea a la gente). 'Gerencia, Estado, Mutualidad y Ambiente' mezcla instituciones que no forman parte del sistema; las otras alternativas combinan términos ajenos al modelo de análisis de accidentes.",
    },
    {
      id: "m3_a2",
      pregunta:
        "¿Qué establece el DECRETO 54 citado en el manual?",
      opciones: [
        "Las condiciones sanitarias y ambientales básicas de todo lugar de trabajo",
        "La constitución y funcionamiento de comités paritarios de higiene y seguridad en empresas con más de 25 trabajadores",
        "El seguro obligatorio contra accidentes del trabajo",
        "Las horas máximas de jornada ordinaria",
      ],
      respuestaCorrecta:
        "La constitución y funcionamiento de comités paritarios de higiene y seguridad en empresas con más de 25 trabajadores",
      explicacion:
        "El Decreto 54 regula la constitución y funcionamiento de los comités paritarios de higiene y seguridad, que deben formarse en empresas con más de 25 personas. Las condiciones sanitarias y ambientales las fija el Decreto 594 (no el 54); el seguro obligatorio contra accidentes del trabajo lo establece la Ley 16.744; y las horas de jornada no son materia de este decreto.",
    },
    {
      id: "m3_a3",
      pregunta:
        "¿Cuál es el objetivo de la INVESTIGACIÓN DE ACCIDENTES?",
      opciones: [
        "Buscar y sancionar a los culpables del accidente",
        "Identificar las causas, nunca los culpables",
        "Determinar los costos del accidente para cobrarlos",
        "Cumplir un trámite administrativo",
      ],
      respuestaCorrecta: "Identificar las causas, nunca los culpables",
      explicacion:
        "El manual indica que en la recopilación de información el objetivo es 'identificar las causas, no los culpables'. La investigación no busca sancionar personas (eso inhibiría la información de los testigos), no persigue cobrar costos, ni es un mero trámite: su fin es corregir las causas para evitar que el accidente se repita.",
    },
    {
      id: "m3_a4",
      pregunta:
        "¿Cómo se denomina la propagación del fuego en que un cuerpo calentado libera calor por ondas o rayos en todas direcciones, en línea recta?",
      opciones: ["Conducción", "Convección", "Contacto directo", "Radiación"],
      respuestaCorrecta: "Radiación",
      explicacion:
        "El manual define la radiación como la liberación de calor por ondas que viajan en línea recta hasta ser absorbidas o reflejadas. La conducción transfiere calor entre cuerpos mediante un medio conductor (los sólidos son los más usuales); la convección lo transmite por un medio circulante, gas o líquido; y 'contacto directo' no es un mecanismo de propagación del fuego.",
    },
    {
      id: "m3_a5",
      pregunta:
        "¿A qué corresponde el FUEGO CLASE B?",
      opciones: [
        "Fuegos en materiales sólidos comunes como maderas y papeles",
        "Fuegos en equipos eléctricos energizados",
        "Fuegos de líquidos inflamables como gasolina, aceites, grasas y pinturas",
        "Fuegos en metales combustibles como magnesio o sodio",
      ],
      respuestaCorrecta:
        "Fuegos de líquidos inflamables como gasolina, aceites, grasas y pinturas",
      explicacion:
        "El manual clasifica en Clase B los fuegos sobre la superficie de líquidos inflamables como gasolina, aceites, grasas, pinturas y disolventes. Maderas y papeles son Clase A; los equipos eléctricos energizados son Clase C; y los metales combustibles como magnesio o sodio son Clase D.",
    },
    {
      id: "m3_a6",
      pregunta:
        "¿Qué extintores NUNCA deben usarse en fuegos CLASE C (equipos eléctricos) por peligro de electrocución?",
      opciones: [
        "Los de dióxido de carbono (CO2)",
        "Los de polvo químico seco",
        "Los de base de espuma o cualquier variante que contenga agua",
        "Los extintores de polvo químico especial",
      ],
      respuestaCorrecta:
        "Los de base de espuma o cualquier variante que contenga agua",
      explicacion:
        "El manual prohíbe en fuegos Clase C los extintores a base de espuma o cualquier variante que contenga agua, porque el agua conduce la electricidad y puede electrocutar al operador. El CO2 y el polvo químico seco (incluido el especial) son aptos para fuegos eléctricos porque no conducen la corriente.",
    },
    {
      id: "m3_a7",
      pregunta:
        "¿En qué consiste el método de extinción por SOFOCACIÓN?",
      opciones: [
        "Reducir la temperatura de los combustibles",
        "Desplazar el oxígeno presente en la combustión, tapando el fuego por completo",
        "Eliminar o aislar el material combustible que se quema",
        "Interferir la reacción química con polvo químico seco",
      ],
      respuestaCorrecta:
        "Desplazar el oxígeno presente en la combustión, tapando el fuego por completo",
      explicacion:
        "El manual define la sofocación como desplazar el oxígeno tapando el fuego por completo y evitando su contacto con el aire. Reducir la temperatura es el enfriamiento; eliminar o aislar el combustible es la remoción o eliminación; e interferir la reacción química es la inhibición.",
    },
    {
      id: "m3_a8",
      pregunta:
        "¿A qué altura deben ubicarse los extintores según el manual?",
      opciones: [
        "A 1,30 metros medidos desde el suelo hasta la base del extintor",
        "A 1,30 metros medidos desde el suelo hasta la parte superior",
        "A la altura de los ojos del guardia",
        "No existe una altura reglamentaria",
      ],
      respuestaCorrecta:
        "A 1,30 metros medidos desde el suelo hasta la base del extintor",
      explicacion:
        "El manual fija la altura de 1,30 metros medidos desde el suelo hasta la BASE del extintor, en sitios de fácil acceso y clara identificación. Si se midiera hasta la parte superior el extintor quedaría demasiado alto para tomarlo con facilidad; la altura de los ojos no es el criterio; y sí existe una altura reglamentaria.",
    },
    {
      id: "m3_a9",
      pregunta:
        "¿Cuál es la diferencia entre la RED HÚMEDA y la RED SECA?",
      opciones: [
        "La red húmeda corresponde a gabinetes con mangueras de 25 m constantemente presurizadas; la red seca son cañerías sin agua de uso exclusivo de Bomberos",
        "La red seca es para uso del personal y la húmeda exclusiva de Bomberos",
        "La red húmeda usa polvo químico y la seca usa CO2",
        "No existe diferencia entre ambas",
      ],
      respuestaCorrecta:
        "La red húmeda corresponde a gabinetes con mangueras de 25 m constantemente presurizadas; la red seca son cañerías sin agua de uso exclusivo de Bomberos",
      explicacion:
        "El manual define la red húmeda como gabinetes con mangueras de 25 m constantemente presurizadas, y la red seca como cañerías secas (sin agua) de uso exclusivo de Bomberos. Es la inversa de lo que dice la alternativa incorrecta: el personal usa la red húmeda y Bomberos la red seca; ninguna usa polvo químico ni CO2; y sí existe diferencia entre ambas.",
    },
    {
      id: "m3_a10",
      pregunta:
        "Según el manual, al apagar un fuego con extintor, ¿qué debe hacerse una vez extinguido?",
      opciones: [
        "Acercarse al fuego para comprobar que no hay brasas",
        "Retroceder sin darle la espalda al fuego extinguido",
        "Abandonar el lugar corriendo de inmediato",
        "Dejar el extintor en el suelo junto al fuego",
      ],
      respuestaCorrecta:
        "Retroceder sin darle la espalda al fuego extinguido",
      explicacion:
        "El manual indica retroceder SIN dar la espalda al fuego extinguido, por si reaviva, y dejar el extintor usado en un lugar apartado e identificado para su recarga. Acercarse al fuego recién extinguido es peligroso si reaviva; abandonar corriendo no permite vigilar el área; y dejar el extintor junto al fuego impide su recarga y obstruye el lugar.",
    },
  ],
  vf: [
    {
      id: "m3_v1",
      afirmacion:
        "El fuego es la oxidación de materiales combustibles con desprendimiento de luz y calor.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición de fuego del manual: oxidación de materiales combustibles con desprendimiento de luz y calor.",
    },
    {
      id: "m3_v2",
      afirmacion:
        "El accidente del trabajo es toda lesión que una persona sufra a causa o con ocasión del trabajo y que le produzca incapacidad o muerte.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define así el accidente del trabajo: toda lesión sufrida a causa o con ocasión del trabajo que produzca incapacidad o muerte.",
    },
    {
      id: "m3_v3",
      afirmacion:
        "El Decreto 594 establece las condiciones sanitarias y ambientales básicas que debe cumplir todo lugar de trabajo, incluidos los límites permisibles de exposición a agentes químicos y físicos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: así describe el manual el Reglamento de condiciones sanitarias y ambientales básicas en los lugares de trabajo (Decreto 594), que además fija los límites permisibles de exposición a agentes químicos y físicos.",
    },
    {
      id: "m3_v4",
      afirmacion:
        "Las causas INMEDIATAS son el origen de las acciones y condiciones subestándar, mientras las BÁSICAS surgen como consecuencia de ellas.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la relación está invertida. Las causas BÁSICAS son el origen de las acciones y condiciones subestándar, y las causas INMEDIATAS (las acciones y condiciones subestándar) surgen como consecuencia de ellas.",
    },
    {
      id: "m3_v5",
      afirmacion:
        "Las Observaciones de Seguridad Planeadas (OPT) sirven para identificar acciones subestándar (inseguras) del personal y detectar funciones críticas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define así el objetivo de las observaciones planeadas: identificar acciones subestándar o inseguras del personal y detectar las funciones críticas de cada puesto.",
    },
    {
      id: "m3_v6",
      afirmacion:
        "Las inspecciones planeadas generales consisten en caminar por un sector observando y anotando toda situación que pueda ser causa de accidente.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así las inspecciones planeadas generales: caminar por un sector observando y anotando toda situación que pueda ser causa de accidente; las realiza el supervisor, jefe de planta, de mantención o jefe de seguridad.",
    },
    {
      id: "m3_v7",
      afirmacion:
        "En la investigación de un accidente, el encargado de realizarla es siempre un funcionario de Carabineros.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que el encargado de la investigación será el supervisor de la línea del accidentado. Carabineros puede intervenir en otros aspectos, pero la investigación de accidentes laborales corresponde a la línea de supervisión de la empresa.",
    },
    {
      id: "m3_v8",
      afirmacion:
        "El cuarto elemento que se introduce cuando el fuego se ha iniciado es la REACCIÓN EN CADENA, que es una reacción química y no un elemento.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual señala que el cuarto elemento es la reacción en cadena, que es una reacción química y no un elemento propiamente tal, y que todas las reacciones son exotérmicas.",
    },
    {
      id: "m3_v9",
      afirmacion:
        "La CONDUCCIÓN es la transmisión de calor por medio de un medio circulante, ya sea gas o líquido.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la transmisión de calor por un medio circulante (gas o líquido) es la CONVECCIÓN. La conducción es la transferencia de calor entre cuerpos mediante un medio conductor, siendo los sólidos los más usuales.",
    },
    {
      id: "m3_v10",
      afirmacion:
        "El fuego Clase A se combate por enfriamiento con agua o con soluciones que contengan un alto contenido de este líquido.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual indica que los fuegos Clase A (maderas, papeles, géneros y materiales sólidos comunes) se combaten por enfriamiento, con agua o soluciones de alto contenido de agua.",
    },
    {
      id: "m3_v11",
      afirmacion:
        "Los fuegos Clase D involucran metales combustibles como Magnesio, Titanio, Zirconio, Potasio y Sodio.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lista esos metales en la Clase D y advierte que en ellos los equipos extintores normales pueden provocar reacciones químicas peligrosas.",
    },
    {
      id: "m3_v12",
      afirmacion:
        "El método de INHIBICIÓN interfiere la reacción química del fuego mediante agentes como el polvo químico seco y el anhídrido carbónico.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define así la inhibición: interferir la reacción química del fuego mediante agentes como el polvo químico seco y el anhídrido carbónico, siendo normalmente el método más usado.",
    },
    {
      id: "m3_v13",
      afirmacion:
        "Los extintores portátiles son de 4, 6, 10 y 12 kilos, y los de 50 y 100 kilos usan carros para su transporte.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual entrega esas capacidades: los extintores portátiles son de 4, 6, 10 y 12 kilos, y los de 50 y 100 kilos se transportan en carros por su peso.",
    },
    {
      id: "m3_v14",
      afirmacion:
        "Al manejar un extintor, el chorro debe dirigirse a la parte superior de las llamas.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el chorro debe dirigirse a la BASE del fuego, en forma de abanico, para atacar la zona donde se origina la combustión. Apuntar a la parte superior de las llamas no extingue el fuego porque el agente no llega al combustible.",
    },
    {
      id: "m3_v15",
      afirmacion:
        "Las granadas extintoras se fabrican actualmente en grandes cantidades por su efectividad.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que las granadas extintoras ya no se fabrican por su escasa efectividad, y que su fabricación está prohibida por Resolución Nº 05166 de 23-VIII-1974 del Servicio Nacional de Salud.",
    },
    {
      id: "m3_v16",
      afirmacion:
        "Los picos se usan durante el incendio para levantar planchas del techo y aumentar la ventilación.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el uso principal de los picos es el despeje de cielos rasos DESPUÉS del incendio. Usarlos durante el incendio solo aporta más oxígeno a la combustión y aumenta la intensidad del fuego.",
    },
    {
      id: "m3_v17",
      afirmacion:
        "La prevención de riesgos de incendios se basa en que, eliminando el combustible, el calor o el oxígeno, es posible extinguir el fuego; evitando que estos tres elementos se combinen, se evita la creación del fuego.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual formula exactamente ese principio de prevención: eliminar uno de los tres elementos (combustible, calor u oxígeno) extingue el fuego, y evitar que se combinen impide su creación.",
    },
    {
      id: "m3_v18",
      afirmacion:
        "Las materias inflamables o explosivas pueden mantenerse en cualquier dependencia de la empresa sin avisos especiales.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual exige ubicarlas en sitios aislados y con avisos visibles de 'PELIGRO' y 'NO FUMAR', para evitar que cualquier fuente de calor o chispa inicie un incendio o explosión.",
    },
    {
      id: "m3_v19",
      afirmacion:
        "El encargado de la investigación de accidentes, si los costos de la corrección son altos, puede esperar indefinidamente sin tomar acción.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que, aunque consulte a sus jefes, el encargado debe tomar cualquier acción inmediata factible hasta lograr la aprobación de las medidas recomendadas. Esperar indefinidamente prolonga el riesgo de nuevos accidentes.",
    },
    {
      id: "m3_v20",
      afirmacion:
        "Las empresas con más de 100 trabajadores deben tener un departamento de Prevención de Riesgos con funciones de planificar, organizar y supervisar acciones permanentes para el control de riesgos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo establece al inicio de la unidad de prevención de riesgos profesionales: las empresas con más de 100 trabajadores deben contar con un departamento de Prevención de Riesgos que planifique, organice y supervise acciones permanentes para el control de riesgos.",
    },
  ],
};