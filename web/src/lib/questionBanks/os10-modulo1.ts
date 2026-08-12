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
        "El manual señala que existe Estado cuando se reúnen una Nación, un territorio determinado y una Autoridad común.",
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
        "El texto cita el Art. 19 N°7 letra b) CPR: nadie puede ser privado de su libertad ni ésta restringida sino en los casos y forma determinados por la Constitución o las leyes.",
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
        "El manual define al cómplice como quien coopera a la ejecución por actos anteriores o simultáneos; el encubridor actúa con posterioridad.",
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
        "Entre las situaciones de flagrancia el texto incluye al que huye del lugar y es designado por el ofendido u otra persona como autor o cómplice.",
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
        "El Art. 129 faculta a cualquier persona a detener en flagrancia con entrega inmediata a Carabineros o al juez.",
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
        "El texto exige esos tres requisitos para la legítima defensa eximente: agresión ilegítima, necesidad racional del medio y falta de provocación suficiente.",
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
        "El manual lista como agravante cometer el delito mediante precio, recompensa o promesa; las otras son atenuantes.",
    },
    {
      id: "m1_a8",
      pregunta:
        "Según el manual, ¿qué plazo máximo tiene la formalización de la investigación?",
      opciones: ["1 año", "2 años", "5 años", "No tiene plazo límite"],
      respuestaCorrecta: "2 años",
      explicacion:
        "El texto señala que la formalización de la investigación no puede durar más de 2 años.",
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
        "El manual indica que el vigilante privado puede y debe portar armas de fuego cortas y bastón, mientras los guardias no pueden usar armas de fuego a ningún título, incluso retirados de FF.AA.",
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
        "El Art. 9 del Código del Trabajo citado establece 15 días (o 5 días si es por obra, trabajo o servicio determinado o de duración inferior a 30 días).",
    },
  ],
  vf: [
    {
      id: "m1_v1",
      afirmacion:
        "El Estado moderno es la Nación jurídicamente constituida y posee poder político para declarar, normar y administrar el derecho.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define al Estado moderno con esas características, siendo además perpetuo y soberano.",
    },
    {
      id: "m1_v2",
      afirmacion:
        "En Chile existen personas y grupos privilegiados que no están sujetos a las leyes comunes.",
      respuestaCorrecta: false,
      explicacion:
        "El texto afirma lo contrario: en Chile no hay personas ni grupos privilegiados, no hay esclavos y el que pise su territorio queda libre.",
    },
    {
      id: "m1_v3",
      afirmacion:
        "El hogar sólo puede allanarse y las comunicaciones privadas interceptarse o registrarse en los casos determinados por la Ley.",
      respuestaCorrecta: true,
      explicacion:
        "Así lo señala el texto sobre la inviolabilidad del hogar y las comunicaciones privadas.",
    },
    {
      id: "m1_v4",
      afirmacion:
        "Según el Art. 1º del Código Penal, delito es toda acción u omisión voluntaria penada por la Ley.",
      respuestaCorrecta: true,
      explicacion:
        "Es la definición literal de delito citada en el manual.",
    },
    {
      id: "m1_v5",
      afirmacion:
        "Los encubridores son quienes cooperan a la ejecución del delito por actos anteriores o simultáneos.",
      respuestaCorrecta: false,
      explicacion:
        "Los encubridores intervienen con posterioridad ocultando efectos o instrumentos; los que cooperan con actos anteriores o simultáneos son cómplices.",
    },
    {
      id: "m1_v6",
      afirmacion:
        "El sorprendido en delito flagrante puede ser detenido con el solo objeto de ser puesto a disposición del juez competente dentro de las 24 horas siguientes.",
      respuestaCorrecta: true,
      explicacion:
        "El manual fija el plazo de 24 horas para poner al detenido a disposición del juez.",
    },
    {
      id: "m1_v7",
      afirmacion:
        "Un guardia de seguridad puede interrogar personas y requerir documentación a los transeúntes durante su turno.",
      respuestaCorrecta: false,
      explicacion:
        "Los guardias no pueden interrogar personas ni requerir documentación: son facultades exclusivas de Carabineros.",
    },
    {
      id: "m1_v8",
      afirmacion:
        "El menor de 14 años está exento de responsabilidad criminal.",
      respuestaCorrecta: true,
      explicacion:
        "El Art. 10 del Código Penal citado exime de responsabilidad al menor de 14 años y al loco o demente salvo intervalo lúcido.",
    },
    {
      id: "m1_v9",
      afirmacion:
        "Un guardia retirado de las Fuerzas Armadas está autorizado a portar arma de fuego durante su servicio de guardia.",
      respuestaCorrecta: false,
      explicacion:
        "El manual prohíbe a los guardias usar armas de fuego a ningún título, incluso a retirados de FF.AA. o Carabineros autorizados por otras normas.",
    },
    {
      id: "m1_v10",
      afirmacion:
        "La Ley 19.303 obliga a colaborar con la autoridad a las entidades que manejen montos en caja, en cualquier momento del día, iguales o superiores a 500 UF.",
      respuestaCorrecta: true,
      explicacion:
        "Así lo establece el texto sobre la Ley 19.303 y su umbral de 500 UF.",
    },
    {
      id: "m1_v11",
      afirmacion:
        "El guardia de seguridad se rige por una Directiva de Funcionamiento, mientras que el vigilante privado se rige por un Estudio de Seguridad.",
      respuestaCorrecta: true,
      explicacion:
        "El manual asigna la Directiva de Funcionamiento a los guardias y el Estudio de Seguridad a los vigilantes privados.",
    },
    {
      id: "m1_v12",
      afirmacion:
        "La jornada ordinaria de trabajo no podrá exceder de 48 horas semanales.",
      respuestaCorrecta: false,
      explicacion:
        "El Art. 22 del Código del Trabajo citado fija un máximo de 45 horas semanales.",
    },
    {
      id: "m1_v13",
      afirmacion:
        "Las horas extraordinarias pueden pactarse hasta un máximo de dos por día y se pagan con un recargo del 50% sobre el sueldo convenido.",
      respuestaCorrecta: true,
      explicacion:
        "Los Arts. 31 y 32 citados establecen el tope de dos horas diarias y el recargo del 50%.",
    },
    {
      id: "m1_v14",
      afirmacion:
        "El trabajador con más de un año de servicio tiene derecho a un feriado anual de quince días corridos.",
      respuestaCorrecta: false,
      explicacion:
        "El feriado es de quince días HÁBILES, no corridos, según el Art. 67 del Código del Trabajo citado.",
    },
    {
      id: "m1_v15",
      afirmacion:
        "Según el Art. 159 del Código del Trabajo, el contrato de trabajo puede terminar por mutuo acuerdo de las partes.",
      respuestaCorrecta: true,
      explicacion:
        "El mutuo acuerdo es la primera causal del Art. 159 citado en el manual.",
    },
    {
      id: "m1_v16",
      afirmacion:
        "El Art. 160 del Código del Trabajo contempla causales de término en que el trabajador pierde el derecho a indemnización, como la falta de probidad o las vías de hecho.",
      respuestaCorrecta: true,
      explicacion:
        "Así lo detalla el manual al listar las causales del Art. 160.",
    },
    {
      id: "m1_v17",
      afirmacion:
        "El seguro de la Ley 16.744 se financia con una cotización básica general y una adicional, ambas de cargo del trabajador.",
      respuestaCorrecta: false,
      explicacion:
        "Ambas cotizaciones son de cargo del EMPLEADOR, según el Art. 211 citado.",
    },
    {
      id: "m1_v18",
      afirmacion:
        "El procedimiento abreviado permite al imputado renunciar al juicio oral cuando la pena no puede ser superior a cinco años.",
      respuestaCorrecta: true,
      explicacion:
        "El manual fija en cinco años el tope de pena del procedimiento abreviado.",
    },
    {
      id: "m1_v19",
      afirmacion:
        "El juicio oral se realiza ante un tribunal integrado por tres jueces y el veredicto debe dictarse a más tardar en 5 días.",
      respuestaCorrecta: true,
      explicacion:
        "Así lo describe el manual en la cuarta etapa del sistema procesal penal.",
    },
    {
      id: "m1_v20",
      afirmacion:
        "Ante un delito flagrante, el guardia debe registrar en el Libro de Novedades los datos del detenido: nombre, edad, estado civil, domicilio, características físicas y vestimentas.",
      respuestaCorrecta: true,
      explicacion:
        "El manual enumera esos datos a consignar en el Libro de Novedades al detener en flagrancia.",
    },
  ],
};
