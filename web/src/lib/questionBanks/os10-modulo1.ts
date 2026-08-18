import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Legislación de Seguridad Privada"
// del Manual Curso de Guardias de Seguridad Privada OS-10 de Aprecap.

export const bancoModulo1: BancoModulo = {
  numero: 1,
  titulo: "Legislación OS 10",
  alternativas: [
    {
      id: "m1_a1",
      pregunta:
        "Según el manual, el Estado existe cuando se reúnen tres elementos. ¿Cuáles son?",
      opciones: [
        "Una Nación, un territorio determinado y una Autoridad común",
        "Población, cultura e idioma",
        "Gobierno, parlamento y tribunales",
        "Constitución, leyes y decretos",
      ],
      respuestaCorrecta:
        "Una Nación, un territorio determinado y una Autoridad común",
      explicacion:
        "El manual señala que existe Estado cuando se reúnen tres elementos: una Nación (grupo de personas que quieren vivir en comunidad), un territorio determinado y una Autoridad común. 'Población, cultura e idioma' no corresponde, pues la cultura y el idioma no son elementos del Estado. 'Gobierno, parlamento y tribunales' son órganos de un Estado ya constituido, no elementos de su existencia. 'Constitución, leyes y decretos' son instrumentos normativos, no elementos definitorios del Estado.",
    },
    {
      id: "m1_a2",
      pregunta:
        "¿Qué establece el Art. 19 N°7 letra b) de la Constitución Política respecto de la libertad personal?",
      opciones: [
        "Que toda persona puede ser detenida por cualquier autoridad sin orden previa",
        "Que nadie puede ser privado de su libertad personal ni ésta restringida sino en los casos y forma determinados por la Constitución o las leyes",
        "Que la libertad personal solo aplica a los ciudadanos mayores de 21 años",
        "Que la libertad personal puede suspenderse en estado de emergencia sin formalidad alguna",
      ],
      respuestaCorrecta:
        "Que nadie puede ser privado de su libertad personal ni ésta restringida sino en los casos y forma determinados por la Constitución o las leyes",
      explicacion:
        "El Art. 19 N°7 letra b) de la C.P.R. establece que nadie puede ser privado de su libertad personal ni ésta restringida sino en los casos y forma determinados por la Constitución o las leyes. La opción 'detenida por cualquier autoridad sin orden previa' está mal porque la detención exige orden de un funcionario público facultado por ley, salvo flagrancia. 'Solo a los mayores de 21 años' no existe en la norma, que protege a todas las personas. La 'suspensión sin formalidad alguna en emergencia' tampoco procede: incluso en esos casos se exige la forma legal.",
    },
    {
      id: "m1_a3",
      pregunta:
        "Según el Código Penal, ¿quién es el CÓMPLICE en un delito?",
      opciones: [
        "El que toma parte inmediata y directa en la ejecución del acto",
        "El que coopera a la ejecución por actos anteriores o simultáneos",
        "El que interviene con posterioridad ocultando efectos o instrumentos del delito",
        "El que recibe beneficio económico exclusivo del delito",
      ],
      respuestaCorrecta:
        "El que coopera a la ejecución por actos anteriores o simultáneos",
      explicacion:
        "El Art. 14 del Código Penal define al cómplice como quien coopera a la ejecución del hecho por actos anteriores o simultáneos. 'Tomar parte inmediata y directa en la ejecución' es la definición del AUTOR, no del cómplice. 'Intervenir con posterioridad ocultando efectos o instrumentos' describe al ENCUBRIDOR, que actúa después del delito. 'Recibir beneficio económico del delito' no configura ninguna categoría de participación del Art. 14.",
    },
    {
      id: "m1_a4",
      pregunta:
        "¿Quién se considera en situación de FLAGRANCIA según el manual?",
      opciones: [
        "Solo el que actualmente se encontrare cometiendo el delito",
        "El que huye del lugar y fuere designado por el ofendido u otra persona como autor o cómplice",
        "Cualquier persona que haya cometido un delito durante el último mes",
        "Solo el que acabare de cometer el delito, sin importar la designación de testigos",
      ],
      respuestaCorrecta:
        "El que huye del lugar y fuere designado por el ofendido u otra persona como autor o cómplice",
      explicacion:
        "El Art. 130 del Código Procesal Penal contempla varias situaciones de flagrancia; una de ellas es quien huye del lugar de la comisión del delito y es designado por el ofendido u otra persona como autor o cómplice. 'Solo el que actualmente se encontrare cometiendo el delito' está mal porque es solo una de las hipótesis, no la única. 'Cualquier delito cometido durante el último mes' no existe: la flagrancia exige inmediatez temporal. 'Solo el que acabare de cometerlo, sin importar la designación' también es incompleto y omite las demás hipótesis legales.",
    },
    {
      id: "m1_a5",
      pregunta:
        "¿Qué faculta el Art. 129 del Código (detención por particulares)?",
      opciones: [
        "Solo Carabineros puede detener a un delincuente sorprendido en flagrante delito",
        "Cualquier persona está facultada para detener a un delincuente sorprendido en flagrante delito, para ponerlo inmediatamente a disposición de Carabineros o del juez",
        "El guardia puede retener al detenido en sus dependencias hasta por 48 horas",
        "Solo el ofendido puede detener al delincuente",
      ],
      respuestaCorrecta:
        "Cualquier persona está facultada para detener a un delincuente sorprendido en flagrante delito, para ponerlo inmediatamente a disposición de Carabineros o del juez",
      explicacion:
        "El Art. 129 faculta a CUALQUIER persona para detener al sorprendido en flagrante delito, con la obligación de ponerlo inmediatamente a disposición de Carabineros o del juez competente. 'Solo Carabineros' está mal: la norma extiende la facultad a cualquier particular. 'Retener hasta por 48 horas en dependencias' es incorrecto porque la entrega debe ser INMEDIATA. 'Solo el ofendido' tampoco corresponde: la facultad alcanza a cualquier persona, no solo a la víctima.",
    },
    {
      id: "m1_a6",
      pregunta:
        "¿Qué tres requisitos deben concurrir para que la LEGÍTIMA DEFENSA exima de responsabilidad?",
      opciones: [
        "Ser guardia acreditado, estar de turno y usar solo el bastón",
        "Agresión ilegítima, necesidad racional del medio empleado y falta de provocación suficiente",
        "Aviso previo a Carabineros, autorización del jefe y buen comportamiento",
        "Ser agredido con arma de fuego, estar uniformado y pedir refuerzos",
      ],
      respuestaCorrecta:
        "Agresión ilegítima, necesidad racional del medio empleado y falta de provocación suficiente",
      explicacion:
        "El Art. 10 N°3 del Código Penal exige para la legítima defensa eximente tres requisitos: agresión ilegítima, necesidad racional del medio empleado y falta de provocación suficiente por parte del que se defiende. 'Ser guardia acreditado, estar de turno y usar bastón' no son requisitos legales de la eximente. 'Aviso previo a Carabineros, autorización del jefe y buen comportamiento' son exigencias inventadas, no del Código Penal. 'Ser agredido con arma de fuego, estar uniformado y pedir refuerzos' tampoco configura la eximente: la defensa procede ante cualquier agresión ilegítima, no solo con arma de fuego.",
    },
    {
      id: "m1_a7",
      pregunta:
        "¿Cuál de las siguientes es una circunstancia AGRAVANTE de responsabilidad penal según el manual?",
      opciones: [
        "Irreprochable conducta anterior",
        "Reparar con celo el mal causado",
        "Ejecutar el delito mediante precio, recompensa o promesa",
        "Confesar el delito pudiendo eludir la justicia",
      ],
      respuestaCorrecta:
        "Ejecutar el delito mediante precio, recompensa o promesa",
      explicacion:
        "El Art. 12 N°2 del Código Penal agrava la responsabilidad por cometer el delito mediante precio, recompensa o promesa. La 'irreprochable conducta anterior' es una ATENUANTE (Art. 11 N°5). 'Reparar con celo el mal causado' es atenuante (Art. 11 N°6). 'Confesar el delito pudiendo eludir la justicia' también es atenuante (Art. 11 N°7). Solo la opción del precio, recompensa o promesa es agravante.",
    },
    {
      id: "m1_a8",
      pregunta:
        "Según el manual, ¿qué plazo máximo tiene la formalización de la investigación?",
      opciones: ["1 año", "2 años", "5 años", "No tiene plazo límite"],
      respuestaCorrecta: "2 años",
      explicacion:
        "El manual señala que la formalización de la investigación no puede durar más de 2 años. '1 año' es menor al plazo legal, '5 años' lo supera, y 'no tiene plazo límite' es falso: la duración máxima está expresamente fijada en 2 años.",
    },
    {
      id: "m1_a9",
      pregunta:
        "¿Cuál es una diferencia clave entre el VIGILANTE PRIVADO y el GUARDIA DE SEGURIDAD?",
      opciones: [
        "El vigilante puede y debe portar armas de fuego cortas y bastón tipo policial; el guardia no puede usar armas de fuego a ningún título",
        "El guardia puede portar arma de fuego si es carabinero en retiro",
        "Ambos tienen las mismas exigencias de edad y servicio militar",
        "El guardia se rige por un Estudio de Seguridad y el vigilante por una Directiva de Funcionamiento",
      ],
      respuestaCorrecta:
        "El vigilante puede y debe portar armas de fuego cortas y bastón tipo policial; el guardia no puede usar armas de fuego a ningún título",
      explicacion:
        "El manual indica que el vigilante privado puede y debe portar armas de fuego cortas y bastón tipo policial dentro de la instalación, mientras que el guardia no puede usar armas de fuego a ningún título, ni siquiera si es retirado de Carabineros o FF.AA. 'El guardia carabinero retirado puede portar' es falso: la prohibición es absoluta. 'Ambos tienen las mismas exigencias' es falso: el vigilante exige 21 años y servicio militar cumplido; el guardia solo 18 años, sin exigencia de servicio militar. La última opción invierte la regla: el GUARDIA se rige por una Directiva de Funcionamiento y el VIGILANTE por un Estudio de Seguridad.",
    },
    {
      id: "m1_a10",
      pregunta:
        "¿En qué plazo debe constar por escrito el contrato de trabajo indefinido?",
      opciones: [
        "5 días desde la incorporación del trabajador",
        "15 días desde la incorporación del trabajador",
        "30 días desde la incorporación del trabajador",
        "No existe plazo legal",
      ],
      respuestaCorrecta: "15 días desde la incorporación del trabajador",
      explicacion:
        "El Art. 9 del Código del Trabajo obliga a constar el contrato por escrito dentro de 15 días desde la incorporación (o 5 días solo si es contrato por obra, trabajo o servicio determinado o de duración inferior a 30 días). '5 días' está mal como respuesta general porque ese plazo es solo para contratos por obra determinada. '30 días' excede el plazo legal. 'No existe plazo legal' es falso: el empleador que no formalice el contrato en plazo es sancionado.",
    },
  ],
  vf: [
    {
      id: "m1_v1",
      afirmacion:
        "El Estado moderno es la Nación jurídicamente constituida y posee poder político para declarar, normar y administrar el derecho.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define al Estado moderno como la Nación jurídicamente constituida, con poder político para declarar, normar y administrar el derecho, siendo además perpetuo y soberano.",
    },
    {
      id: "m1_v2",
      afirmacion:
        "En Chile existen personas y grupos privilegiados que no están sujetos a las leyes comunes.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual afirma lo contrario: en Chile no hay personas ni grupos privilegiados, no hay esclavos y el que pisa su territorio queda libre (igualdad ante la ley).",
    },
    {
      id: "m1_v3",
      afirmacion:
        "El hogar sólo puede allanarse y las comunicaciones privadas interceptarse o registrarse en los casos determinados por la Ley.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la inviolabilidad del hogar y de toda forma de comunicación privada permite el allanamiento o interceptación solo en los casos determinados por la Ley.",
    },
    {
      id: "m1_v4",
      afirmacion:
        "Según el Art. 1º del Código Penal, delito es toda acción u omisión voluntaria penada por la Ley.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición literal del Art. 1° del Código Penal citada en el manual: delito es toda acción u omisión voluntaria penada por la Ley.",
    },
    {
      id: "m1_v5",
      afirmacion:
        "Los encubridores son quienes cooperan a la ejecución del delito por actos anteriores o simultáneos.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: los encubridores intervienen CON POSTERIORIDAD al delito, ocultando o inutilizando el cuerpo, efectos o instrumentos, o facilitando la fuga del culpable. Quienes cooperan con actos anteriores o simultáneos son los CÓMPLICES.",
    },
    {
      id: "m1_v6",
      afirmacion:
        "El sorprendido en delito flagrante puede ser detenido con el solo objeto de ser puesto a disposición del juez competente dentro de las 24 horas siguientes.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el detenido en flagrancia puede ser aprehendido por el solo objeto de ser puesto a disposición del juez competente dentro de las 24 horas siguientes (Art. 19 N°7 C.P.R.).",
    },
    {
      id: "m1_v7",
      afirmacion:
        "Un guardia de seguridad puede interrogar personas y requerir documentación a los transeúntes durante su turno.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: los guardias de seguridad no pueden interrogar personas ni requerir documentación, como tampoco detener sospechosos ni ejercer acciones de la Ley de Tránsito: son facultades exclusivas de Carabineros, y el guardia que las usurpe queda sujeto a fiscalización.",
    },
    {
      id: "m1_v8",
      afirmacion:
        "El menor de 14 años está exento de responsabilidad criminal.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el Art. 10 del Código Penal exime de responsabilidad criminal al menor de 14 años, y también al loco o demente, salvo que haya actuado en intervalo lúcido.",
    },
    {
      id: "m1_v9",
      afirmacion:
        "Un guardia retirado de las Fuerzas Armadas está autorizado a portar arma de fuego durante su servicio de guardia.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual prohíbe a los guardias usar armas de fuego a ningún título, incluso a quienes sean retirados de las FF.AA. o de Carabineros y estén autorizados a portarlas por otras normas (Ley de Control de Armas y D.S. N° 93).",
    },
    {
      id: "m1_v10",
      afirmacion:
        "La Ley 19.303 obliga a colaborar con la autoridad a las entidades que manejen montos en caja, en cualquier momento del día, iguales o superiores a 500 UF.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: la Ley 19.303 obliga a colaborar con la autoridad a las entidades que, por sus actividades, reciban, mantengan o paguen valores en caja por montos iguales o superiores a 500 UF en cualquier momento del día.",
    },
    {
      id: "m1_v11",
      afirmacion:
        "El guardia de seguridad se rige por una Directiva de Funcionamiento, mientras que el vigilante privado se rige por un Estudio de Seguridad.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual asigna la Directiva de Funcionamiento a los guardias de seguridad y el Estudio de Seguridad a los vigilantes privados (Art. 3° D.L. 3.607).",
    },
    {
      id: "m1_v12",
      afirmacion:
        "La jornada ordinaria de trabajo no podrá exceder de 48 horas semanales.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el Art. 22 del Código del Trabajo fija un máximo de 45 horas ordinarias semanales, no 48. El tope de 48 horas corresponde a la legislación anterior.",
    },
    {
      id: "m1_v13",
      afirmacion:
        "Las horas extraordinarias pueden pactarse hasta un máximo de dos por día y se pagan con un recargo del 50% sobre el sueldo convenido.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: los Arts. 31 y 32 del Código del Trabajo establecen el tope de dos horas extraordinarias diarias y el recargo del 50% sobre el sueldo convenido.",
    },
    {
      id: "m1_v14",
      afirmacion:
        "El trabajador con más de un año de servicio tiene derecho a un feriado anual de quince días corridos.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el feriado anual es de quince días HÁBILES, no corridos, según el Art. 67 del Código del Trabajo.",
    },
    {
      id: "m1_v15",
      afirmacion:
        "Según el Art. 159 del Código del Trabajo, el contrato de trabajo puede terminar por mutuo acuerdo de las partes.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el mutuo acuerdo de las partes es la primera causal de terminación del contrato contemplada en el Art. 159 del Código del Trabajo.",
    },
    {
      id: "m1_v16",
      afirmacion:
        "El Art. 160 del Código del Trabajo contempla causales de término en que el trabajador pierde el derecho a indemnización, como la falta de probidad o las vías de hecho.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el Art. 160 contempla causales imputables al trabajador (falta de probidad, vías de hecho, injurias, etc.) en que este pierde el derecho a indemnización por años de servicio.",
    },
    {
      id: "m1_v17",
      afirmacion:
        "El seguro de la Ley 16.744 se financia con una cotización básica general y una adicional, ambas de cargo del trabajador.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: ambas cotizaciones del seguro de la Ley 16.744 (la básica general y la adicional diferenciada) son de cargo del EMPLEADOR, no del trabajador.",
    },
    {
      id: "m1_v18",
      afirmacion:
        "El procedimiento abreviado permite al imputado renunciar al juicio oral cuando la pena no puede ser superior a cinco años.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: en el procedimiento abreviado el imputado, asesorado por su abogado, puede renunciar libre e informadamente al juicio oral, siempre que la pena probable no sea superior a cinco años.",
    },
    {
      id: "m1_v19",
      afirmacion:
        "El juicio oral se realiza ante un tribunal integrado por tres jueces y el veredicto debe dictarse a más tardar en 5 días.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el juicio oral se desarrolla ante el Tribunal Oral en lo Penal integrado por tres jueces, y el veredicto de condena o absolución debe dictarse a más tardar en 5 días.",
    },
    {
      id: "m1_v20",
      afirmacion:
        "Ante un delito flagrante, el guardia debe registrar en el Libro de Novedades los datos del detenido: nombre, edad, estado civil, domicilio, características físicas y vestimentas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esos datos a consignar en el Libro de Novedades al detener en flagrancia: tipo de delito, día, hora, lugar, nombre, edad, estado civil, profesión, nacionalidad, domicilio, características físicas, vestimentas y objetos que portaba.",
    },
  ],
};