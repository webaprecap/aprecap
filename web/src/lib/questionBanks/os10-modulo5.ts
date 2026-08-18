import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Primeros Auxilios"
// del Manual Curso de Guardias de Seguridad Privada OS-10 Aprecap.

export const bancoModulo5: BancoModulo = {
  numero: 5,
  titulo: "Guía de Primeros Auxilios",
  alternativas: [
    {
      id: "m5_a1",
      pregunta:
        "¿Cuál es el primer paso del protocolo de actuación ante una emergencia?",
      opciones: [
        "Evaluar el estado de la víctima",
        "Buscar ayuda y alertar a los servicios sanitarios",
        "Comprobar las condiciones de seguridad para no convertirse en una víctima más",
        "Tomar el pulso de la víctima",
      ],
      respuestaCorrecta:
        "Comprobar las condiciones de seguridad para no convertirse en una víctima más",
      explicacion:
        "El manual establece como primer paso comprobar las condiciones de seguridad (fuego, escapes de gas, tóxicos, derrumbamiento, electrocución), para no convertirse en una víctima más. Evaluar a la víctima, alertar a los servicios sanitarios y tomar el pulso son pasos posteriores: no sirve atender a una víctima si el entorno sigue siendo peligroso.",
    },
    {
      id: "m5_a2",
      pregunta:
        "¿Cuál es el número telefónico del SAMU?",
      opciones: ["131", "132", "133", "134"],
      respuestaCorrecta: "131",
      explicacion:
        "El manual asigna el 131 al SAMU (Servicio de Atención Médica de Urgencia). El 132 corresponde a Bomberos, el 133 a Carabineros y el 134 a Investigaciones (PDI).",
    },
    {
      id: "m5_a3",
      pregunta:
        "¿En qué consiste la maniobra de Heimlich?",
      opciones: [
        "Compresiones torácicas continuas sobre el esternón",
        "Compresiones abdominales que presionan el diafragma para expulsar el cuerpo extraño con el aire de reserva",
        "Golpes secos en la espalda con la víctima de pie",
        "Ventilaciones boca a boca repetidas",
      ],
      respuestaCorrecta:
        "Compresiones abdominales que presionan el diafragma para expulsar el cuerpo extraño con el aire de reserva",
      explicacion:
        "El manual describe la maniobra de Heimlich como compresiones abdominales que presionan el diafragma, usando el aire de reserva para expulsar el cuerpo extraño. Las compresiones torácicas continuas sobre el esternón son parte del RCP (masaje cardíaco); los golpes en la espalda son otra técnica menos efectiva; y las ventilaciones boca a boca no expulsan el cuerpo extraño.",
    },
    {
      id: "m5_a4",
      pregunta:
        "¿Cuál es la proporción de RCP para ADULTOS indicada en el manual?",
      opciones: [
        "15 compresiones torácicas por 2 ventilaciones",
        "2 compresiones por 15 ventilaciones",
        "30 compresiones por 5 ventilaciones",
        "5 compresiones por 1 ventilación",
      ],
      respuestaCorrecta: "15 compresiones torácicas por 2 ventilaciones",
      explicacion:
        "El manual indica 15 compresiones torácicas por 2 ventilaciones en adultos, a una velocidad de 80 a 100 compresiones por minuto. Invertir la proporción (2 compresiones por 15 ventilaciones) o usar 30x5 no corresponde a lo indicado; y 5 compresiones por 1 ventilación es la proporción para bebés y niños mayores de un año.",
    },
    {
      id: "m5_a5",
      pregunta:
        "¿Cómo se caracteriza una quemadura de 2º GRADO?",
      opciones: [
        "Afecta solo la epidermis, con enrojecimiento y sin ampollas",
        "Provoca ampollas, inflamación, es bastante dolorosa y es exudativa",
        "Piel seca, chamuscada, con escara y sin dolor",
        "Daño que alcanza músculo y hueso",
      ],
      respuestaCorrecta:
        "Provoca ampollas, inflamación, es bastante dolorosa y es exudativa",
      explicacion:
        "El manual describe la quemadura de 2º grado como dolorosa, con ampollas, inflamación y exudación. El enrojecimiento sin ampollas es propio del 1º grado; la piel seca, chamuscada, con escara y sin dolor es del 3º grado; y el daño a músculo y hueso corresponde a quemaduras aún más profundas.",
    },
    {
      id: "m5_a6",
      pregunta:
        "¿Cuál es la diferencia entre LUXACIÓN y ESGUINCE?",
      opciones: [
        "La luxación es una separación permanente de las superficies articulares; el esguince es una separación momentánea con distensión de ligamentos",
        "El esguince es más grave que la luxación",
        "La luxación afecta solo tobillos y el esguince solo rodillas",
        "No hay diferencia, son sinónimos",
      ],
      respuestaCorrecta:
        "La luxación es una separación permanente de las superficies articulares; el esguince es una separación momentánea con distensión de ligamentos",
      explicacion:
        "El manual distingue ambos: la luxación es una separación PERMANENTE de las superficies articulares, mientras el esguince es una separación MOMENTÁNEA con distensión de ligamentos. La luxación es más grave que el esguince (no al revés); ambas pueden afectar cualquier articulación; y no son sinónimos.",
    },
    {
      id: "m5_a7",
      pregunta:
        "¿Qué NUNCA se debe hacer ante una quemadura con ampollas?",
      opciones: [
        "Refrescar la zona quemada con agua durante 10 a 15 minutos",
        "Pinchar la ampolla o aplicar pasta de dientes, mantequilla, pomadas o lociones sin indicación médica",
        "Quitar anillos o relojes de la zona afectada",
        "Cubrir la quemadura para protegerla",
      ],
      respuestaCorrecta:
        "Pinchar la ampolla o aplicar pasta de dientes, mantequilla, pomadas o lociones sin indicación médica",
      explicacion:
        "El manual prohíbe pinchar las ampollas y aplicar pastas de dientes, mantequilla, pomadas o lociones sin indicación médica, porque favorecen la infección. Refrescar con agua, quitar anillos o relojes y cubrir la quemadura son medidas recomendadas y correctas.",
    },
    {
      id: "m5_a8",
      pregunta:
        "¿Qué señal es característica de un traumatismo cráneo-encefálico (TEC)?",
      opciones: [
        "Salida de sangre o líquido cefalorraquídeo transparente por oídos o nariz",
        "Ampollas en la zona del golpe",
        "Sangrado rojo oscuro y continuo",
        "Imposibilidad de mover un dedo de la mano",
      ],
      respuestaCorrecta:
        "Salida de sangre o líquido cefalorraquídeo transparente por oídos o nariz",
      explicacion:
        "El manual lista entre las señales del TEC la salida de sangre o líquido transparente (cefalorraquídeo) por oídos y/o nariz, que indica fractura de la base del cráneo. Las ampollas son propias de quemaduras; el sangrado rojo oscuro y continuo es característico de hemorragia venosa; y la imposibilidad de mover un dedo es señal de fractura de extremidad, no de TEC.",
    },
    {
      id: "m5_a9",
      pregunta:
        "¿Cómo se caracteriza la hemorragia ARTERIAL?",
      opciones: [
        "Sangre rojo oscuro que sale en forma continua",
        "Sangre en pequeñas gotas",
        "Sangre rojo brillante que sale a borbotones, de forma pulsátil",
        "No tiene características especiales",
      ],
      respuestaCorrecta:
        "Sangre rojo brillante que sale a borbotones, de forma pulsátil",
      explicacion:
        "El manual describe la hemorragia arterial como sangre rojo BRILLANTE que sale a BORBOTONES, de forma pulsátil, por la presión del corazón. El rojo oscuro y continuo corresponde a la hemorragia VENOSA; las pequeñas gotas a la capilar; y sí tiene características muy especiales, pues es la más grave.",
    },
    {
      id: "m5_a10",
      pregunta:
        "Según el manual, el TORNIQUETE es:",
      opciones: [
        "El primer recurso ante cualquier hemorragia",
        "El último recurso ('la vida o la extremidad') y no debe ser removido salvo por un médico",
        "Una técnica que debe aflojarse cada 15 minutos",
        "Un procedimiento exclusivo para heridas capilares",
      ],
      respuestaCorrecta:
        "El último recurso ('la vida o la extremidad') y no debe ser removido salvo por un médico",
      explicacion:
        "El manual lo define como absolutamente el ÚLTIMO recurso, cuando se juega 'la vida o la extremidad', y advierte que una vez aplicado no debe ser removido salvo por un médico, porque aflojarlo libera toxinas al torrente sanguíneo. No es el primer recurso (primero van ABC, presión directa, elevación y puntos arteriales); no se afloja cada 15 minutos; y las heridas capilares se controlan con simple presión.",
    },
  ],
  vf: [
    {
      id: "m5_v1",
      afirmacion:
        "Los primeros auxilios son la primera atención, en forma temporal, a una víctima de accidente o emergencia, hasta recibir ayuda médica especializada.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición de primeros auxilios del manual: primera atención temporal a una víctima de accidente o emergencia, hasta recibir ayuda médica especializada.",
    },
    {
      id: "m5_v2",
      afirmacion:
        "Los propósitos de los primeros auxilios incluyen conservar la vida, evitar complicaciones y asegurar el traslado a un centro asistencial.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esos propósitos de los primeros auxilios: conservar la vida, evitar complicaciones, asegurar el traslado a un centro asistencial y ayudar a la recuperación.",
    },
    {
      id: "m5_v3",
      afirmacion:
        "El número de Bomberos es el 134.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el número de Bomberos es el 132. El 134 corresponde a Investigaciones (PDI); el 131 es el SAMU y el 133 Carabineros.",
    },
    {
      id: "m5_v4",
      afirmacion:
        "Al llamar a los servicios de emergencia se debe informar la localización exacta, la naturaleza y gravedad del accidente, y el número, edad y sexo de los accidentados.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual detalla esa información que se debe entregar al alertar a los servicios de emergencia, para que llegue la ayuda adecuada y preparada.",
    },
    {
      id: "m5_v5",
      afirmacion:
        "Mientras llega la ayuda, se debe dar de comer y beber al accidentado para que recupere fuerzas.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual prohíbe dar de comer o beber al herido y administrar medicamentos por cuenta propia, porque puede agravar lesiones internas o complicar una eventual cirugía.",
    },
    {
      id: "m5_v6",
      afirmacion:
        "Para tomar el pulso en la muñeca se usan dos dedos, nunca el pulgar, sobre la arteria radial.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual indica usar dos dedos, nunca el pulgar (que tiene pulso propio), sobre la arteria radial, a unos 2 cm del final del dedo pulgar.",
    },
    {
      id: "m5_v7",
      afirmacion:
        "El ahogado AZUL corresponde a agua en los pulmones, con muerte a los 20 minutos aproximadamente.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: los términos están invertidos. El ahogado AZUL corresponde al cierre de la glotis (muerte a los 5 minutos), y el ahogado BLANCO es el de agua en los pulmones, con muerte a los 20 minutos aproximadamente.",
    },
    {
      id: "m5_v8",
      afirmacion:
        "En el ABC de la resucitación, la letra A significa abrir vías respiratorias, la B restaurar la respiración y la C restaurar la circulación.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define así las letras del ABC de la resucitación: A = abrir vías respiratorias, B = restaurar la respiración y C = restaurar la circulación.",
    },
    {
      id: "m5_v9",
      afirmacion:
        "En bebés y niños mayores de un año, la RCP se realiza con 5 compresiones y 1 soplo.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual indica 5 compresiones y 1 soplo para bebés y niños mayores de un año, distinta de la proporción de 15x2 usada en adultos.",
    },
    {
      id: "m5_v10",
      afirmacion:
        "La velocidad correcta del masaje cardíaco en adultos es de 40 a 50 compresiones por minuto.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la velocidad indicada por el manual es de 80 a 100 compresiones por minuto. 40 a 50 sería demasiado lenta para mantener la circulación.",
    },
    {
      id: "m5_v11",
      afirmacion:
        "La gravedad de una quemadura depende de su extensión: 25% del cuerpo en adultos y 10% en niños, además de la zona afectada.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual fija esos porcentajes de extensión (25% en adultos y 10% en niños) y la zona afectada como criterios para evaluar la gravedad de una quemadura.",
    },
    {
      id: "m5_v12",
      afirmacion:
        "Las zonas críticas en una quemadura son la cabeza, las manos, los pies y los genitales.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual enumera esas zonas como críticas: una quemadura en la cabeza, manos, pies o genitales siempre se considera grave.",
    },
    {
      id: "m5_v13",
      afirmacion:
        "Una quemadura de 3º grado se caracteriza por piel seca y chamuscada, con escara, sin dolor y sin ampollas.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así la quemadura de 3º grado (piel seca y chamuscada, escara, sin dolor porque la quemadura destruye las terminaciones nerviosas, y sin ampollas), que siempre requiere hospital.",
    },
    {
      id: "m5_v14",
      afirmacion:
        "Ante una fractura abierta, se debe intentar colocar el hueso dentro de la herida antes de inmovilizar.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual prohíbe intentar colocar el hueso dentro de la herida y retirar fragmentos de hueso. Solo se debe inmovilizar y trasladar, porque manipular el hueso aumenta el daño y la infección.",
    },
    {
      id: "m5_v15",
      afirmacion:
        "Ante una luxación, se debe inmovilizar la articulación tal como se encuentre y NO intentar reducirla.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual indica inmovilizar la articulación tal como se encuentre y NO intentar reducirla, porque la reducción debe hacerla un profesional médico para no lesionar vasos ni nervios.",
    },
    {
      id: "m5_v16",
      afirmacion:
        "Ante sospecha de lesión de columna, se debe mover a la víctima y trasladarla inmovilizada sobre una superficie rígida y plana.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual indica NO mover a la víctima innecesariamente y trasladarla inmovilizada sobre una superficie rígida y plana, para no agravar una eventual lesión de la médula.",
    },
    {
      id: "m5_v17",
      afirmacion:
        "Ante una herida abdominal con salida de intestino, se debe reintroducir el intestino en su posición y luego vendar.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual prohíbe intentar colocar el intestino en su posición. Se debe cubrir todo con un vendaje y no dar de beber, dejando la reducción al personal médico.",
    },
    {
      id: "m5_v18",
      afirmacion:
        "Una herida de pecho con burbujeo por entrada de aire debe cubrirse con gasa grande impidiendo el paso del aire.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual indica cubrir la herida de pecho con una gasa grande impidiendo el paso del aire, para evitar que el pulmón colapse (neumotórax).",
    },
    {
      id: "m5_v19",
      afirmacion:
        "El orden de los primeros auxilios ante una hemorragia es: ABC, presión directa, elevación de la extremidad, compresión de puntos arteriales y torniquete como último recurso.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual establece esa secuencia para el control de hemorragias: primero el ABC, luego presión directa, elevación de la extremidad, compresión de puntos arteriales y, como último recurso, el torniquete.",
    },
    {
      id: "m5_v20",
      afirmacion:
        "La intoxicación es el envenenamiento por sustancias tóxicas que ingresan por ingestión, inhalación o a través de la piel.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición de intoxicación del manual: envenenamiento por sustancias tóxicas que ingresan por ingestión, inhalación o a través de la piel.",
    },
  ],
};