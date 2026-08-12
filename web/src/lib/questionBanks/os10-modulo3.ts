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
        "El manual define G.E.M.A.: Gente (personal y administración), Equipo (herramientas o maquinarias), Material (con lo que se trabaja) y Ambiente (todo lo físico que rodea a la gente).",
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
        "El Decreto 54 regula la constitución y funcionamiento de los comités paritarios, que deben formarse en empresas con más de 25 personas.",
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
        "El manual indica que en la recopilación de información el objetivo es 'identificar las causas, no los culpables'.",
    },
    {
      id: "m3_a4",
      pregunta:
        "¿Cómo se denomina la propagación del fuego en que un cuerpo calentado libera calor por ondas o rayos en todas direcciones, en línea recta?",
      opciones: ["Conducción", "Convección", "Contacto directo", "Radiación"],
      respuestaCorrecta: "Radiación",
      explicacion:
        "El manual define la radiación como la liberación de calor por ondas que viajan en línea recta hasta ser absorbidas o reflejadas.",
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
        "El manual clasifica en Clase B los fuegos sobre la superficie de líquidos inflamables como gasolina, aceites, grasas, pinturas y disolventes.",
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
        "El manual prohíbe en fuegos Clase C los extintores a base de espuma o cualquier variante con agua, por peligro de electrocución.",
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
        "El manual define la sofocación como desplazar el oxígeno tapando el fuego y evitando su contacto con el aire.",
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
        "El manual fija la altura de 1,30 m medidos desde el suelo hasta la base, en sitios de fácil acceso y clara identificación.",
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
        "El manual define la red húmeda como gabinetes con mangueras de 25 m presurizadas y la red seca como cañerías secas de uso exclusivo de bomberos.",
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
        "El manual indica retroceder sin dar la espalda al fuego y dejar el extintor usado en un lugar apartado e identificado para su recarga.",
    },
  ],
  vf: [
    {
      id: "m3_v1",
      afirmacion:
        "El fuego es la oxidación de materiales combustibles con desprendimiento de luz y calor.",
      respuestaCorrecta: true,
      explicacion:
        "Es la definición de fuego del manual.",
    },
    {
      id: "m3_v2",
      afirmacion:
        "El accidente del trabajo es toda lesión que una persona sufra a causa o con ocasión del trabajo y que le produzca incapacidad o muerte.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define así el accidente del trabajo.",
    },
    {
      id: "m3_v3",
      afirmacion:
        "El Decreto 594 establece las condiciones sanitarias y ambientales básicas que debe cumplir todo lugar de trabajo, incluidos los límites permisibles de exposición a agentes químicos y físicos.",
      respuestaCorrecta: true,
      explicacion:
        "Así describe el manual el Reglamento de condiciones sanitarias en lugares de trabajo (Decreto 594).",
    },
    {
      id: "m3_v4",
      afirmacion:
        "Las causas INMEDIATAS son el origen de las acciones y condiciones subestándar, mientras las BÁSICAS surgen como consecuencia de ellas.",
      respuestaCorrecta: false,
      explicacion:
        "Es al revés: las causas inmediatas surgen como consecuencia de las causas básicas, que son el origen de las acciones y condiciones subestándar.",
    },
    {
      id: "m3_v5",
      afirmacion:
        "Las Observaciones de Seguridad Planeadas (OPT) sirven para identificar acciones subestándar (inseguras) del personal y detectar funciones críticas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define así el objetivo de las observaciones planeadas.",
    },
    {
      id: "m3_v6",
      afirmacion:
        "Las inspecciones planeadas generales consisten en caminar por un sector observando y anotando toda situación que pueda ser causa de accidente.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así las inspecciones planeadas generales, realizadas por el supervisor, jefe de planta, de mantención o jefe de seguridad.",
    },
    {
      id: "m3_v7",
      afirmacion:
        "En la investigación de un accidente, el encargado de realizarla es siempre un funcionario de Carabineros.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que el encargado de la investigación será el supervisor de la línea.",
    },
    {
      id: "m3_v8",
      afirmacion:
        "El cuarto elemento que se introduce cuando el fuego se ha iniciado es la REACCIÓN EN CADENA, que es una reacción química y no un elemento.",
      respuestaCorrecta: true,
      explicacion:
        "El manual señala que el cuarto elemento es la reacción en cadena, una reacción química, y que todas las reacciones son exotérmicas.",
    },
    {
      id: "m3_v9",
      afirmacion:
        "La CONDUCCIÓN es la transmisión de calor por medio de un medio circulante, ya sea gas o líquido.",
      respuestaCorrecta: false,
      explicacion:
        "Esa es la CONVECCIÓN; la conducción es la transferencia de calor entre cuerpos mediante un medio conductor, siendo los sólidos los más usuales.",
    },
    {
      id: "m3_v10",
      afirmacion:
        "El fuego Clase A se combate por enfriamiento con agua o con soluciones que contengan un alto contenido de este líquido.",
      respuestaCorrecta: true,
      explicacion:
        "El manual indica que los fuegos Clase A (maderas, papeles, géneros) se combaten por enfriamiento con agua.",
    },
    {
      id: "m3_v11",
      afirmacion:
        "Los fuegos Clase D involucran metales combustibles como Magnesio, Titanio, Zirconio, Potasio y Sodio.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lista esos metales en la Clase D, donde los equipos extintores normales pueden provocar reacciones químicas peligrosas.",
    },
    {
      id: "m3_v12",
      afirmacion:
        "El método de INHIBICIÓN interfiere la reacción química del fuego mediante agentes como el polvo químico seco y el anhídrido carbónico.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define así la inhibición, indicando que normalmente es el método más usado.",
    },
    {
      id: "m3_v13",
      afirmacion:
        "Los extintores portátiles son de 4, 6, 10 y 12 kilos, y los de 50 y 100 kilos usan carros para su transporte.",
      respuestaCorrecta: true,
      explicacion:
        "El manual entrega esas capacidades para extintores portátiles y de carro.",
    },
    {
      id: "m3_v14",
      afirmacion:
        "Al manejar un extintor, el chorro debe dirigirse a la parte superior de las llamas.",
      respuestaCorrecta: false,
      explicacion:
        "El chorro debe dirigirse a la BASE del fuego, en forma de abanico.",
    },
    {
      id: "m3_v15",
      afirmacion:
        "Las granadas extintoras se fabrican actualmente en grandes cantidades por su efectividad.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que ya no se fabrican por su escasa efectividad y que su fabricación está prohibida por Resolución Nº 05166 de 23-VIII-1974 del Servicio Nacional de Salud.",
    },
    {
      id: "m3_v16",
      afirmacion:
        "Los picos se usan durante el incendio para levantar planchas del techo y aumentar la ventilación.",
      respuestaCorrecta: false,
      explicacion:
        "Su uso principal es el despeje de cielos rasos DESPUÉS del incendio; usarlos durante el incendio solo aporta más oxígeno a la combustión y aumenta la intensidad del fuego.",
    },
    {
      id: "m3_v17",
      afirmacion:
        "La prevención de riesgos de incendios se basa en que, eliminando el combustible, el calor o el oxígeno, es posible extinguir el fuego; evitando que estos tres elementos se combinen, se evita la creación del fuego.",
      respuestaCorrecta: true,
      explicacion:
        "El manual formula exactamente ese principio de prevención.",
    },
    {
      id: "m3_v18",
      afirmacion:
        "Las materias inflamables o explosivas pueden mantenerse en cualquier dependencia de la empresa sin avisos especiales.",
      respuestaCorrecta: false,
      explicacion:
        "El manual exige ubicarlas en sitios aislados, con avisos visibles de 'PELIGRO' y 'NO FUMAR'.",
    },
    {
      id: "m3_v19",
      afirmacion:
        "El encargado de la investigación de accidentes, si los costos de la corrección son altos, puede esperar indefinidamente sin tomar acción.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que, aunque consulte a sus jefes, debe tomar cualquier acción inmediata factible hasta lograr la aprobación de las medidas recomendadas.",
    },
    {
      id: "m3_v20",
      afirmacion:
        "Las empresas con más de 100 trabajadores deben tener un departamento de Prevención de Riesgos con funciones de planificar, organizar y supervisar acciones permanentes para el control de riesgos.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo establece al inicio de la unidad de prevención de riesgos profesionales.",
    },
  ],
};
