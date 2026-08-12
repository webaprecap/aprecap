import type { BancoModulo } from "./types";

// Preguntas fundamentadas en el PDF oficial "Sistemas de Comunicación y Enlace"
// del Manual Curso de Guardias de Seguridad Privada OS-10 Aprecap.

export const bancoModulo4: BancoModulo = {
  numero: 4,
  titulo: "Comunicación",
  alternativas: [
    {
      id: "m4_a1",
      pregunta:
        "¿Quién generó eléctricamente por primera vez las ondas electromagnéticas?",
      opciones: [
        "James Clerk Maxwell",
        "Johann Gutenberg",
        "Heinrich Hertz",
        "Guglielmo Marconi",
      ],
      respuestaCorrecta: "Heinrich Hertz",
      explicacion:
        "Maxwell publicó la teoría en 1873; quince años más tarde el físico alemán Heinrich Hertz logró generar eléctricamente tales ondas.",
    },
    {
      id: "m4_a2",
      pregunta:
        "¿En qué unidades se mide la FRECUENCIA de una onda?",
      opciones: ["Metros y centímetros", "Hertz", "Decibeles", "Volts"],
      respuestaCorrecta: "Hertz",
      explicacion:
        "El manual indica que la frecuencia se mide en Hertz; la longitud de onda se mide en metros, cm y mm.",
    },
    {
      id: "m4_a3",
      pregunta:
        "¿Qué rango de frecuencias corresponde a la banda VHF?",
      opciones: [
        "3 a 30 MHz",
        "30 a 300 MHz",
        "300 MHz a 3 GHz",
        "10 a 30 KHz",
      ],
      respuestaCorrecta: "30 a 300 MHz",
      explicacion:
        "El manual ubica la VHF entre 30 y 300 MHz (enlaces de radio a corta distancia, TV y FM); el rango 3-30 MHz es HF.",
    },
    {
      id: "m4_a4",
      pregunta:
        "¿Qué potencia generalmente NO sobrepasan los equipos de radio PORTÁTILES?",
      opciones: ["5 watts", "25 watts", "50 watts", "100 watts"],
      respuestaCorrecta: "5 watts",
      explicacion:
        "El manual indica que los portátiles no sobrepasan los 5 watts; los equipos móviles usan generalmente 25 watts.",
    },
    {
      id: "m4_a5",
      pregunta:
        "¿Qué función cumple el botón PTT de un radiotransmisor?",
      opciones: [
        "Explorar señales en todos los canales programados",
        "Regular la sensibilidad del receptor",
        "Seleccionar la frecuencia de operación",
        "Realizar el control de transmisión y recepción del equipo",
      ],
      respuestaCorrecta:
        "Realizar el control de transmisión y recepción del equipo",
      explicacion:
        "El PTT (pulsar para hablar) realiza el control de transmisión y recepción; el Scan explora canales y el Squelch regula la sensibilidad.",
    },
    {
      id: "m4_a6",
      pregunta:
        "¿Cuántos satélites como mínimo debe localizar automáticamente un receptor GPS para determinar la posición?",
      opciones: ["1 satélite", "2 satélites", "3 satélites", "4 satélites"],
      respuestaCorrecta: "4 satélites",
      explicacion:
        "El manual indica que el aparato localiza automáticamente como mínimo CUATRO satélites y triangula la posición con al menos 3.",
    },
    {
      id: "m4_a7",
      pregunta:
        "¿Qué son las BALIZAS dentro de los dispositivos de señalización?",
      opciones: [
        "Botones para presionar en caso de emergencia",
        "Una sirena audiovisual con luz intermitente o sin luz, de sonido lineal",
        "Equipos que permiten avisar por voz la evacuación",
        "Sistemas de señales de luz que avisan de un hecho",
      ],
      respuestaCorrecta:
        "Una sirena audiovisual con luz intermitente o sin luz, de sonido lineal",
      explicacion:
        "El manual define las balizas como sirena audiovisual con luz intermitente (bulbo) o sin luz, y sonido lineal.",
    },
    {
      id: "m4_a8",
      pregunta:
        "El pulsador seta de PARADA DE EMERGENCIA tiene accionador de color:",
      opciones: ["Negro", "Amarillo", "Rojo", "Verde"],
      respuestaCorrecta: "Rojo",
      explicacion:
        "El pulsador seta de PARADA DE EMERGENCIA usa accionador ROJO; el pulsador STOP para desconexión de zonas usa accionador NEGRO.",
    },
    {
      id: "m4_a9",
      pregunta:
        "¿En qué consiste el proceso de degradación del mensaje descrito en el manual?",
      opciones: [
        "En que la señal de radio pierde potencia con la lluvia",
        "En que el mensaje sufre cuatro cambios: lo que se quiere decir, lo que realmente se dice, lo que se escucha y lo que se cree escuchar, con pérdida de información",
        "En que los códigos cambian cada semana",
        "En que los equipos digitales degradan la voz",
      ],
      respuestaCorrecta:
        "En que el mensaje sufre cuatro cambios: lo que se quiere decir, lo que realmente se dice, lo que se escucha y lo que se cree escuchar, con pérdida de información",
      explicacion:
        "El manual describe esas cuatro etapas del proceso comunicativo que producen pérdida de información.",
    },
    {
      id: "m4_a10",
      pregunta:
        "¿Qué valor moral define el manual como 'enfrentar toda situación con entereza, dominando el temor'?",
      opciones: ["Honradez", "Lealtad", "Valentía", "Obediencia"],
      respuestaCorrecta: "Valentía",
      explicacion:
        "El manual define la valentía como enfrentar toda situación con entereza, dominando el temor.",
    },
  ],
  vf: [
    {
      id: "m4_v1",
      afirmacion:
        "La primera etapa de la comunicación fue la era de los signos y señales, anterior al lenguaje.",
      respuestaCorrecta: true,
      explicacion:
        "El manual ubica en la prehistoria la era de los signos y señales como primera etapa de la comunicación.",
    },
    {
      id: "m4_v2",
      afirmacion:
        "Johann Gutenberg inventó la imprenta de tipos móviles en el siglo XV, reemplazando a los manuscritos.",
      respuestaCorrecta: true,
      explicacion:
        "El manual atribuye a Gutenberg, en el siglo XV, la invención de la imprenta de tipos móviles.",
    },
    {
      id: "m4_v3",
      afirmacion:
        "La teoría de Maxwell sobre las ondas electromagnéticas se refería sobre todo a las ondas de radio de alta potencia.",
      respuestaCorrecta: false,
      explicacion:
        "La teoría de Maxwell se refería sobre todo a las ondas de LUZ.",
    },
    {
      id: "m4_v4",
      afirmacion:
        "El término MICROONDAS identifica a las ondas electromagnéticas entre 300 MHz y 300 GHz.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define así el rango de microondas.",
    },
    {
      id: "m4_v5",
      afirmacion:
        "Las ondas de radio requieren del aire como medio físico para propagarse.",
      respuestaCorrecta: false,
      explicacion:
        "El manual señala que se propagan tanto por el aire como por el espacio vacío, sin requerir un medio de transporte.",
    },
    {
      id: "m4_v6",
      afirmacion:
        "Las ondas electromagnéticas se atenúan con la distancia, y esa desventaja se minimiza empleando una potencia elevada en la generación de la onda.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo indica expresamente.",
    },
    {
      id: "m4_v7",
      afirmacion:
        "Los cargadores lentos de equipos de radio necesitan 1 hora, mientras los rápidos necesitan 8 horas.",
      respuestaCorrecta: false,
      explicacion:
        "Es al revés: el cargador lento necesita 8 horas y el rápido 1 hora.",
    },
    {
      id: "m4_v8",
      afirmacion:
        "El control de Squelch (SQ) regula la sensibilidad del receptor y debe manejarse en el umbral entre el ruido y el silenciamiento.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así la operación del Squelch.",
    },
    {
      id: "m4_v9",
      afirmacion:
        "El guardia puede prestar su equipo de radio a un compañero siempre que sea por menos de una hora.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica no abandonar ni prestar el equipo: es el soporte de enlace y un importante medio de trabajo.",
    },
    {
      id: "m4_v10",
      afirmacion:
        "El código Morse sustituye letras, números y signos ortográficos por puntos y rayas, donde el punto equivale a una señal de corta duración.",
      respuestaCorrecta: true,
      explicacion:
        "El manual describe así el código Morse.",
    },
    {
      id: "m4_v11",
      afirmacion:
        "Una desventaja del código Morse es que el receptor debe conocer el código y no puede transmitir información musical o visual.",
      respuestaCorrecta: true,
      explicacion:
        "El manual menciona ambas limitaciones del Morse.",
    },
    {
      id: "m4_v12",
      afirmacion:
        "Es imposible NO comunicar.",
      respuestaCorrecta: true,
      explicacion:
        "El manual lo afirma como principio: es imposible no comunicar.",
    },
    {
      id: "m4_v13",
      afirmacion:
        "Toda comunicación es solo digital, es decir, basada en letras y palabras escritas.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que toda comunicación es tanto digital (letra, palabra) como análoga (voz, postura, gestos).",
    },
    {
      id: "m4_v14",
      afirmacion:
        "Los equipos de radio BASE permanecen fijos en una posición determinada.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define los equipos base como fijos en una posición, existiendo además repetidores y antenas.",
    },
    {
      id: "m4_v15",
      afirmacion:
        "Los walkie talkie PMR-446 requieren pagar una cuota de conexión a un operador telefónico.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que no tienen cuota de conexión ni pagos a operador: son 'comprar y utilizar'.",
    },
    {
      id: "m4_v16",
      afirmacion:
        "La policía, bomberos y organismos estatales usan FM de banda estrecha en frecuencias especiales para sus transmisiones de voz.",
      respuestaCorrecta: true,
      explicacion:
        "El manual señala que marina y aviación usan AM en VHF, mientras policía, bomberos y organismos estatales usan FM de banda estrecha.",
    },
    {
      id: "m4_v17",
      afirmacion:
        "La central de alarmas solo existe en versiones de 2 zonas.",
      respuestaCorrecta: false,
      explicacion:
        "El manual indica que existen centrales de 2 zonas, de 6 zonas o más, con zonas activables o desactivables individualmente.",
    },
    {
      id: "m4_v18",
      afirmacion:
        "Los parlantes permiten avisar al personal presente en la instalación la ocurrencia de un siniestro para proceder a la evacuación.",
      respuestaCorrecta: true,
      explicacion:
        "El manual define así la función de los parlantes.",
    },
    {
      id: "m4_v19",
      afirmacion:
        "La ética es una palabra de origen griego que significa 'costumbres' y es la ciencia que trata las costumbres y la conducta del ser humano.",
      respuestaCorrecta: true,
      explicacion:
        "El manual entrega esa definición de ética.",
    },
    {
      id: "m4_v20",
      afirmacion:
        "La moral es el conjunto de conceptos y creencias por las cuales un individuo determina si sus actos son correctos o incorrectos.",
      respuestaCorrecta: true,
      explicacion:
        "Es la definición de moral entregada por el manual.",
    },
  ],
};
