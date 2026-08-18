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
        "Maxwell publicó la teoría de las ondas electromagnéticas en 1873, pero no las generó; quince años más tarde el físico alemán Heinrich Hertz logró generarlas eléctricamente por primera vez. Gutenberg inventó la imprenta de tipos móviles en el siglo XV y Marconi trabajó con la telegrafía sin hilos, pero ninguno fue el primero en generar esas ondas.",
    },
    {
      id: "m4_a2",
      pregunta:
        "¿En qué unidades se mide la FRECUENCIA de una onda?",
      opciones: ["Metros y centímetros", "Hertz", "Decibeles", "Volts"],
      respuestaCorrecta: "Hertz",
      explicacion:
        "El manual indica que la frecuencia se mide en Hertz (ciclos por segundo). La longitud de onda se mide en metros, centímetros y milímetros; los decibeles miden niveles sonoros o de señal; y los volts miden voltaje eléctrico.",
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
        "El manual ubica la VHF (Very High Frequency) entre 30 y 300 MHz, usada en enlaces de radio a corta distancia, TV y FM. El rango 3 a 30 MHz corresponde a HF; 300 MHz a 3 GHz corresponde a UHF; y 10 a 30 KHz está muy por debajo de la banda VHF.",
    },
    {
      id: "m4_a4",
      pregunta:
        "¿Qué potencia generalmente NO sobrepasan los equipos de radio PORTÁTILES?",
      opciones: ["5 watts", "25 watts", "50 watts", "100 watts"],
      respuestaCorrecta: "5 watts",
      explicacion:
        "El manual indica que los equipos portátiles no sobrepasan generalmente los 5 watts de potencia. Los 25 watts corresponden a los equipos móviles (vehiculares); 50 y 100 watts son potencias típicas de equipos base, no de portátiles.",
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
        "El PTT (Push To Talk, pulsar para hablar) realiza el control de transmisión y recepción del equipo: al pulsarlo se transmite y al soltarlo se recibe. Explorar canales es la función Scan; regular la sensibilidad del receptor es el Squelch (SQ); y la frecuencia se selecciona por teclado o perilla, no con el PTT.",
    },
    {
      id: "m4_a6",
      pregunta:
        "¿Cuántos satélites como mínimo debe localizar automáticamente un receptor GPS para determinar la posición?",
      opciones: ["1 satélite", "2 satélites", "3 satélites", "4 satélites"],
      respuestaCorrecta: "4 satélites",
      explicacion:
        "El manual indica que el aparato localiza automáticamente como mínimo CUATRO satélites y triangula la posición con al menos tres de ellos. Con 1 o 2 satélites es imposible triangular una posición, y con 3 solo se obtendría la ubicación aproximada sin la precisión del ajuste con el cuarto.",
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
        "El manual define las balizas como una sirena audiovisual con luz intermitente (bulbo) o sin luz, y de sonido lineal. Los botones de emergencia son pulsadores (como la seta de parada); avisar por voz la evacuación es función de los parlantes; y las señales de luz que avisan de un hecho son los sistemas de señales luminosas, no las balizas.",
    },
    {
      id: "m4_a8",
      pregunta:
        "El pulsador seta de PARADA DE EMERGENCIA tiene accionador de color:",
      opciones: ["Negro", "Amarillo", "Rojo", "Verde"],
      respuestaCorrecta: "Rojo",
      explicacion:
        "El pulsador seta de PARADA DE EMERGENCIA usa accionador ROJO, color universal de emergencia. El accionador NEGRO corresponde al pulsador STOP para desconexión de zonas; el amarillo se usa en otros controles; y el verde no se asocia a parada de emergencia.",
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
        "El manual describe esas cuatro etapas del proceso comunicativo (lo que se quiere decir, lo que se dice, lo que se escucha y lo que se cree escuchar) que producen pérdida de información. No se refiere a la lluvia, a cambios de códigos semanales ni a equipos digitales: es una degradación propia del proceso comunicativo humano.",
    },
    {
      id: "m4_a10",
      pregunta:
        "¿Qué valor moral define el manual como 'enfrentar toda situación con entereza, dominando el temor'?",
      opciones: ["Honradez", "Lealtad", "Valentía", "Obediencia"],
      respuestaCorrecta: "Valentía",
      explicacion:
        "El manual define la valentía como enfrentar toda situación con entereza, dominando el temor. La honradez se relaciona con la rectitud y el buen proceder; la lealtad con la fidelidad a la empresa y los compañeros; y la obediencia con el cumplimiento de las órdenes, no con dominar el temor.",
    },
  ],
  vf: [
    {
      id: "m4_v1",
      afirmacion:
        "La primera etapa de la comunicación fue la era de los signos y señales, anterior al lenguaje.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual ubica en la prehistoria la era de los signos y señales como la primera etapa de la comunicación, anterior al lenguaje articulado.",
    },
    {
      id: "m4_v2",
      afirmacion:
        "Johann Gutenberg inventó la imprenta de tipos móviles en el siglo XV, reemplazando a los manuscritos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual atribuye a Gutenberg, en el siglo XV, la invención de la imprenta de tipos móviles, que reemplazó a los manuscritos y masificó la lectura.",
    },
    {
      id: "m4_v3",
      afirmacion:
        "La teoría de Maxwell sobre las ondas electromagnéticas se refería sobre todo a las ondas de radio de alta potencia.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la teoría de Maxwell publicada en 1873 se refería sobre todo a las ondas de LUZ. Quince años después, Hertz logró generarlas eléctricamente por primera vez.",
    },
    {
      id: "m4_v4",
      afirmacion:
        "El término MICROONDAS identifica a las ondas electromagnéticas entre 300 MHz y 300 GHz.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define así el rango de las microondas: ondas electromagnéticas entre 300 MHz y 300 GHz.",
    },
    {
      id: "m4_v5",
      afirmacion:
        "Las ondas de radio requieren del aire como medio físico para propagarse.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual señala que las ondas de radio se propagan tanto por el aire como por el espacio vacío, sin requerir un medio de transporte, a diferencia de las ondas sonoras.",
    },
    {
      id: "m4_v6",
      afirmacion:
        "Las ondas electromagnéticas se atenúan con la distancia, y esa desventaja se minimiza empleando una potencia elevada en la generación de la onda.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo indica expresamente: las ondas electromagnéticas se atenúan con la distancia y esa desventaja se minimiza empleando una potencia elevada al generar la onda.",
    },
    {
      id: "m4_v7",
      afirmacion:
        "Los cargadores lentos de equipos de radio necesitan 1 hora, mientras los rápidos necesitan 8 horas.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: la relación está invertida. El cargador LENTO necesita 8 horas y el cargador RÁPIDO necesita 1 hora.",
    },
    {
      id: "m4_v8",
      afirmacion:
        "El control de Squelch (SQ) regula la sensibilidad del receptor y debe manejarse en el umbral entre el ruido y el silenciamiento.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así la operación del Squelch: regula la sensibilidad del receptor y debe manejarse en el umbral entre el ruido y el silenciamiento, para no perder llamadas débiles.",
    },
    {
      id: "m4_v9",
      afirmacion:
        "El guardia puede prestar su equipo de radio a un compañero siempre que sea por menos de una hora.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica NO abandonar ni prestar el equipo de radio, porque es el soporte de enlace del guardia y un importante medio de trabajo. El tiempo no cambia la regla.",
    },
    {
      id: "m4_v10",
      afirmacion:
        "El código Morse sustituye letras, números y signos ortográficos por puntos y rayas, donde el punto equivale a una señal de corta duración.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual describe así el código Morse: sustituye letras, números y signos ortográficos por puntos y rayas, siendo el punto una señal de corta duración y la raya una de larga duración.",
    },
    {
      id: "m4_v11",
      afirmacion:
        "Una desventaja del código Morse es que el receptor debe conocer el código y no puede transmitir información musical o visual.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual menciona ambas limitaciones del Morse: quien recibe debe conocer el código, y no es posible transmitir información musical o visual a través de él.",
    },
    {
      id: "m4_v12",
      afirmacion:
        "Es imposible NO comunicar.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual lo afirma como principio de la comunicación: es imposible no comunicar, porque aun el silencio o la inacción transmiten información.",
    },
    {
      id: "m4_v13",
      afirmacion:
        "Toda comunicación es solo digital, es decir, basada en letras y palabras escritas.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que toda comunicación es tanto DIGITAL (letras y palabras) como ANÁLOGA (voz, postura, gestos). Limitar la comunicación a lo digital ignora el componente no verbal.",
    },
    {
      id: "m4_v14",
      afirmacion:
        "Los equipos de radio BASE permanecen fijos en una posición determinada.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define los equipos base como aquellos que permanecen fijos en una posición determinada, existiendo además repetidores y antenas para ampliar la cobertura.",
    },
    {
      id: "m4_v15",
      afirmacion:
        "Los walkie talkie PMR-446 requieren pagar una cuota de conexión a un operador telefónico.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que los PMR-446 no tienen cuota de conexión ni pagos a un operador telefónico: son de 'comprar y utilizar'.",
    },
    {
      id: "m4_v16",
      afirmacion:
        "La policía, bomberos y organismos estatales usan FM de banda estrecha en frecuencias especiales para sus transmisiones de voz.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual señala que, mientras la marina y la aviación usan AM en VHF, la policía, bomberos y organismos estatales usan FM de banda estrecha en frecuencias especiales para sus transmisiones de voz.",
    },
    {
      id: "m4_v17",
      afirmacion:
        "La central de alarmas solo existe en versiones de 2 zonas.",
      respuestaCorrecta: false,
      explicacion:
        "Es FALSA: el manual indica que existen centrales de alarmas de 2 zonas, de 6 zonas o más, con zonas que pueden activarse o desactivarse individualmente.",
    },
    {
      id: "m4_v18",
      afirmacion:
        "Los parlantes permiten avisar al personal presente en la instalación la ocurrencia de un siniestro para proceder a la evacuación.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual define así la función de los parlantes: avisar al personal presente en la instalación la ocurrencia de un siniestro para proceder a la evacuación.",
    },
    {
      id: "m4_v19",
      afirmacion:
        "La ética es una palabra de origen griego que significa 'costumbres' y es la ciencia que trata las costumbres y la conducta del ser humano.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: el manual entrega esa definición de ética: palabra de origen griego que significa 'costumbres', ciencia que trata las costumbres y la conducta del ser humano.",
    },
    {
      id: "m4_v20",
      afirmacion:
        "La moral es el conjunto de conceptos y creencias por las cuales un individuo determina si sus actos son correctos o incorrectos.",
      respuestaCorrecta: true,
      explicacion:
        "Es VERDADERA: es la definición de moral entregada por el manual: el conjunto de conceptos y creencias por las cuales un individuo determina si sus actos son correctos o incorrectos.",
    },
  ],
};