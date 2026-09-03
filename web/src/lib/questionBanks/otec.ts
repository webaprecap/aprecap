import { PreguntaAlternativa, shuffleArray } from "./types";

export interface ModuloQuizOTEC {
  id: string;
  cursoSlug: string;
  evaluacionId: string;
  titulo: string;
  preguntas: PreguntaAlternativa[];
}

export const BANCO_QUIZ_OTEC: Record<string, ModuloQuizOTEC> = {
  // ALFABETIZACIÓN DIGITAL
  "alfabetizacion-digital-m1": {
    id: "alfabetizacion-digital-m1",
    cursoSlug: "alfabetizacion-digital",
    evaluacionId: "ev-m1",
    titulo: "Evaluación Módulo 1: Introducción a la Computación y Hardware",
    preguntas: [
      {
        id: "ad-1",
        pregunta: "¿Cuál es la función principal de la Memoria RAM en un computador?",
        opciones: [
          "Almacenar temporalmente los datos y programas en ejecución para acceso rápido del procesador.",
          "Guardar permanentemente todos los archivos del disco duro.",
          "Proteger el computador contra virus e intrusiones.",
          "Conectar el equipo a la red de internet."
        ],
        respuestaCorrecta: "Almacenar temporalmente los datos y programas en ejecución para acceso rápido del procesador.",
        explicacion: "La memoria RAM es una memoria de acceso aleatorio y volátil que guarda los datos que la CPU necesita procesar en tiempo real."
      },
      {
        id: "ad-2",
        pregunta: "¿Qué componente se considera el 'cerebro' del computador encargándose del cálculo y procesamiento?",
        opciones: [
          "CPU (Procesador Central)",
          "Tarjeta de Video (GPU)",
          "Fuente de Poder",
          "Disco de Estado Sólido (SSD)"
        ],
        respuestaCorrecta: "CPU (Procesador Central)",
        explicacion: "La Unidad Central de Procesamiento (CPU) ejecuta las instrucciones y procesa los datos de todos los programas."
      },
      {
        id: "ad-3",
        pregunta: "¿Cuál de los siguientes es un dispositivo de entrada de datos?",
        opciones: [
          "Teclado y Mouse",
          "Monitor",
          "Impresora",
          "Parlantes"
        ],
        respuestaCorrecta: "Teclado y Mouse",
        explicacion: "Los periféricos de entrada permiten al usuario ingresar datos e instrucciones al sistema."
      }
    ]
  },
  "alfabetizacion-digital-m2": {
    id: "alfabetizacion-digital-m2",
    cursoSlug: "alfabetizacion-digital",
    evaluacionId: "ev-m2",
    titulo: "Evaluación Módulo 2: Sistema Operativo y Gestión de Archivos",
    preguntas: [
      {
        id: "ad-4",
        pregunta: "¿Qué combinación de teclas permite copiar un texto o archivo seleccionado en Windows?",
        opciones: [
          "Ctrl + C",
          "Ctrl + V",
          "Ctrl + X",
          "Ctrl + Z"
        ],
        respuestaCorrecta: "Ctrl + C",
        explicacion: "Ctrl + C copia el elemento seleccionado al portapapeles; Ctrl + V lo pega en la nueva ubicación."
      },
      {
        id: "ad-5",
        pregunta: "¿Para qué sirve el Explorador de Archivos de Windows?",
        opciones: [
          "Organizar, buscar, crear carpetas y gestionar documentos en el almacenamiento.",
          "Navegar por sitios web de internet.",
          "Diseñar presentaciones interactivas.",
          "Reproducir videos en alta definición."
        ],
        respuestaCorrecta: "Organizar, buscar, crear carpetas y gestionar documentos en el almacenamiento.",
        explicacion: "El Explorador de Archivos es la herramienta central para administrar la estructura de carpetas y ficheros del equipo."
      }
    ]
  },
  "alfabetizacion-digital-final": {
    id: "alfabetizacion-digital-final",
    cursoSlug: "alfabetizacion-digital",
    evaluacionId: "ev-final",
    titulo: "Examen Final: Alfabetización Digital y Ofimática",
    preguntas: [
      {
        id: "ad-f1",
        pregunta: "En una hoja de cálculo (Excel), ¿con qué símbolo debe comenzar obligatoriamente cualquier fórmula o función?",
        opciones: [
          "Signo igual (=)",
          "Signo más (+)",
          "Signo arroba (@)",
          "Signo porcentaje (%)"
        ],
        respuestaCorrecta: "Signo igual (=)",
        explicacion: "El signo '=' le indica al software de hojas de cálculo que lo que sigue es una fórmula a calcular."
      },
      {
        id: "ad-f2",
        pregunta: "¿Cuál es la mejor práctica de seguridad al recibir un correo electrónico con un enlace sospechoso de remitente desconocido?",
        opciones: [
          "No hacer clic en el enlace, no descargar adjuntos y reportarlo o eliminarlo.",
          "Abrir el enlace inmediatamente para comprobar de qué se trata.",
          "Reenviar el correo a todos los compañeros de trabajo.",
          "Descargar el archivo adjunto para verificar su contenido."
        ],
        respuestaCorrecta: "No hacer clic en el enlace, no descargar adjuntos y reportarlo o eliminarlo.",
        explicacion: "El phishing busca robar credenciales o infectar equipos mediante enlaces engañosos en correos electrónicos."
      }
    ]
  },

  // OPERACIÓN DE GRÚA HORQUILLA
  "grua-horquilla-m1": {
    id: "grua-horquilla-m1",
    cursoSlug: "grua-horquilla",
    evaluacionId: "ev-m1",
    titulo: "Evaluación Módulo 1: Seguridad, Inspección Pre-Operacional y Normativa",
    preguntas: [
      {
        id: "gh-1",
        pregunta: "¿Qué es el 'Triángulo de Estabilidad' en una grúa horquilla?",
        opciones: [
          "La zona geométrica formada por las dos ruedas delanteras y el punto de pivote del eje trasero donde debe permanecer el centro de gravedad.",
          "La señal de emergencia reflectante ubicada en la parte trasera del equipo.",
          "Las tres velocidades de avance permitidas en el patio de maniobras.",
          "El sistema de frenos de tres puntos de apoyo."
        ],
        respuestaCorrecta: "La zona geométrica formada por las dos ruedas delanteras y el punto de pivote del eje trasero donde debe permanecer el centro de gravedad.",
        explicacion: "Si el centro de gravedad combinado de la máquina y la carga sale del triángulo de estabilidad, la grúa volcará inevitablemente."
      },
      {
        id: "gh-2",
        pregunta: "¿Qué debe hacer el operador antes de encender la grúa horquilla al inicio de cada jornada?",
        opciones: [
          "Realizar el Check-List o inspección pre-operacional de fluidos, frenos, neumáticos, luces y horquillas.",
          "Acelerar al máximo para calentar el motor inmediatamente.",
          "Cargar peso al máximo para probar la resistencia hidráulica.",
          "Quitar el cinturón de seguridad para mayor movilidad."
        ],
        respuestaCorrecta: "Realizar el Check-List o inspección pre-operacional de fluidos, frenos, neumáticos, luces y horquillas.",
        explicacion: "El check-list diario es obligatorio por ley y garantiza que el equipo está en condiciones seguras de operación."
      }
    ]
  },
  "grua-horquilla-final": {
    id: "grua-horquilla-final",
    cursoSlug: "grua-horquilla",
    evaluacionId: "ev-final",
    titulo: "Examen Final: Operación Segura de Grúa Horquilla",
    preguntas: [
      {
        id: "gh-f1",
        pregunta: "¿A qué altura del suelo deben transportarse las horquillas con carga durante el desplazamiento?",
        opciones: [
          "Entre 15 a 20 centímetros del suelo con el mástil inclinado hacia atrás.",
          "A 1 metro del suelo para ver los obstáculos.",
          "En la altura máxima del mástil.",
          "Arrastrando sobre el pavimento."
        ],
        respuestaCorrecta: "Entre 15 a 20 centímetros del suelo con el mástil inclinado hacia atrás.",
        explicacion: "Transportar la carga baja (15-20 cm) mantiene el centro de gravedad lo más bajo y estable posible."
      },
      {
        id: "gh-f2",
        pregunta: "Si una carga voluminosa bloquea la visibilidad frontal del operador, ¿cómo debe circular la grúa?",
        opciones: [
          "En reversa con la mirada en el sentido de la marcha y tocando bocina.",
          "Hacia adelante sacando la cabeza por fuera de la cabina.",
          "Aumentando la velocidad para pasar rápido el tramo.",
          "Con las horquillas elevadas por sobre la altura del operador."
        ],
        respuestaCorrecta: "En reversa con la mirada en el sentido de la marcha y tocando bocina.",
        explicacion: "Cuando la carga obstruye la visión hacia adelante, el operador debe desplazarse en reversa de manera segura."
      }
    ]
  },

  // TRABAJO EN ALTURA
  "trabajo-en-altura-m1": {
    id: "trabajo-en-altura-m1",
    cursoSlug: "trabajo-en-altura",
    evaluacionId: "ev-m1",
    titulo: "Evaluación Módulo 1: Marco Normativo y Equipos de Protección contra Caídas",
    preguntas: [
      {
        id: "ta-1",
        pregunta: "En la normativa chilena (DS 594 y guías ISP), ¿a partir de qué altura sobre el nivel del suelo se considera obligatoriamente trabajo en altura?",
        opciones: [
          "A partir de 1,80 metros.",
          "A partir de 3,00 metros.",
          "A partir de 5,00 metros.",
          "A partir de 0,50 metros."
        ],
        respuestaCorrecta: "A partir de 1,80 metros.",
        explicacion: "Toda labor que se ejecute a 1.80 metros o más de altura con riesgo de caída libre requiere sistema anticaídas."
      },
      {
        id: "ta-2",
        pregunta: "¿Qué componente del arnés de cuerpo completo es el que disipa la energía en caso de una caída libre?",
        opciones: [
          "El absorbedor de impacto (shocker) del cabo de vida.",
          "El mosquetón de acero inoxidable.",
          "La cinta de ajuste pectoral.",
          "El anillo dorsal de posicionamiento."
        ],
        respuestaCorrecta: "El absorbedor de impacto (shocker) del cabo de vida.",
        explicacion: "El absorbedor de impacto se desgarra progresivamente para reducir la fuerza de detención sobre el cuerpo a menos de 6 kN (600 kg)."
      }
    ]
  },
  "trabajo-en-altura-final": {
    id: "trabajo-en-altura-final",
    cursoSlug: "trabajo-en-altura",
    evaluacionId: "ev-final",
    titulo: "Examen Final: Trabajo Seguro en Altura",
    preguntas: [
      {
        id: "ta-f1",
        pregunta: "¿Qué resistencia mínima debe certificar un punto de anclaje estructural para un trabajador?",
        opciones: [
          "5.000 lbs (2.268 kg o 22,2 kN).",
          "500 kg.",
          "100 kg.",
          "1.000 lbs."
        ],
        respuestaCorrecta: "5.000 lbs (2.268 kg o 22,2 kN).",
        explicacion: "Según la norma OSHA y las directrices chilenas ISP, un punto de anclaje debe soportar al menos 5.000 libras por persona."
      },
      {
        id: "ta-f2",
        pregunta: "¿Por qué el cinturón liniero de cintura NO está permitido para detención de caídas libres?",
        opciones: [
          "Porque puede causar asfixia, lesiones graves en la columna y no distribuye la fuerza de impacto.",
          "Porque es muy pesado para trabajar.",
          "Porque se desgasta rápidamente con el sol.",
          "Porque solo se utiliza en trabajos submarinos."
        ],
        respuestaCorrecta: "Porque puede causar asfixia, lesiones graves en la columna y no distribuye la fuerza de impacto.",
        explicacion: "El cinturón solo sirve para restricción o posicionamiento; para detención de caída solo es legal el arnés de cuerpo completo."
      }
    ]
  },

  // SUSTANCIAS PELIGROSAS
  "manejo-de-sustancias-peligrosas-m1": {
    id: "manejo-de-sustancias-peligrosas-m1",
    cursoSlug: "manejo-de-sustancias-peligrosas",
    evaluacionId: "ev-m1",
    titulo: "Evaluación Módulo 1: Decreto Supremo 43 y Clasificación NCh382",
    preguntas: [
      {
        id: "sp-1",
        pregunta: "¿Qué documento obligatorio en español debe acompañar a toda sustancia peligrosa con sus 16 secciones de seguridad?",
        opciones: [
          "Hoja de Datos de Seguridad (HDS / SDS).",
          "Boleta de compra.",
          "Guía de despacho simple.",
          "Permiso de circulación."
        ],
        respuestaCorrecta: "Hoja de Datos de Seguridad (HDS / SDS).",
        explicacion: "La Hoja de Datos de Seguridad (HDS) detalla propiedades, primeros auxilios, medidas contra incendios y control de derrames."
      },
      {
        id: "sp-2",
        pregunta: "En el rombo de seguridad NFPA 704, ¿qué color representa el riesgo de inflamabilidad?",
        opciones: [
          "Rojo.",
          "Azul.",
          "Amarillo.",
          "Blanco."
        ],
        respuestaCorrecta: "Rojo.",
        explicacion: "En NFPA 704: Rojo = Inflamabilidad, Azul = Salud, Amarillo = Reactividad, Blanco = Riesgos Especiales."
      }
    ]
  },
  "manejo-de-sustancias-peligrosas-final": {
    id: "manejo-de-sustancias-peligrosas-final",
    cursoSlug: "manejo-de-sustancias-peligrosas",
    evaluacionId: "ev-final",
    titulo: "Examen Final: Manejo Seguro y Almacenamiento de Sustancias Peligrosas",
    preguntas: [
      {
        id: "sp-f1",
        pregunta: "¿Qué función cumple el pretil o cubeto de retención en una bodega de sustancias peligrosas?",
        opciones: [
          "Contener el 100% del envase mayor o el 20% del volumen total almacenado en caso de derrame.",
          "Servir de tarima para elevar los pallets.",
          "Facilitar la entrada de carretillas de carga.",
          "Ventilar los gases inflamables hacia el exterior."
        ],
        respuestaCorrecta: "Contener el 100% del envase mayor o el 20% del volumen total almacenado en caso de derrame.",
        explicacion: "El sistema de contención estanco evita que los químicos se filtren al suelo o al alcantarillado ante fugas o roturas."
      }
    ]
  },

  // GUARDIA, NOCHERO, RONDÍN Y PORTERO
  "guardia-nochero-rondin-portero-gn-e1": {
    id: "guardia-nochero-rondin-portero-gn-e1",
    cursoSlug: "guardia-nochero-rondin-portero",
    evaluacionId: "gn-e1",
    titulo: "Evaluación Módulo 1: Marco Legal y Normativa Ley N° 21.659",
    preguntas: [
      {
        id: "gn-1-1",
        pregunta: "¿Pueden los nocheros, porteros o conserjes portar armas de fuego durante su servicio?",
        opciones: [
          "No, existe una prohibición legal absoluta para todo el personal de seguridad privada auxiliar.",
          "Sí, siempre que cuenten con permiso de caza.",
          "Sí, si el comité de administración del edificio lo autoriza por escrito.",
          "Solo durante los turnos de noche."
        ],
        respuestaCorrecta: "No, existe una prohibición legal absoluta para todo el personal de seguridad privada auxiliar.",
        explicacion: "La Ley N° 21.659 y el D.S. N° 209 prohíben taxativamente el porte de armas de fuego a guardias, nocheros y porteros."
      },
      {
        id: "gn-1-2",
        pregunta: "¿Cuál es la principal autoridad encargada de regular y fiscalizar la seguridad privada en Chile?",
        opciones: [
          "La Subsecretaría de Prevención del Delito (SPD) en coordinación con Carabineros de Chile (OS-10).",
          "El Ministerio de Obras Públicas.",
          "La Municipalidad de cada comuna exclusivamente.",
          "La Dirección del Trabajo únicamente."
        ],
        respuestaCorrecta: "La Subsecretaría de Prevención del Delito (SPD) en coordinación con Carabineros de Chile (OS-10).",
        explicacion: "La Ley 21.659 asigna la rectoría técnica a la SPD con apoyo fiscalizador operativo de Carabineros de Chile."
      }
    ]
  },
  "guardia-nochero-rondin-portero-gn-ef": {
    id: "guardia-nochero-rondin-portero-gn-ef",
    cursoSlug: "guardia-nochero-rondin-portero",
    evaluacionId: "gn-ef",
    titulo: "Evaluación Final: Guardia, Nochero, Rondín y Portero",
    preguntas: [
      {
        id: "gn-f1",
        pregunta: "¿Cuál es el procedimiento correcto ante un error al escribir en el Libro de Novedades?",
        opciones: [
          "Escribir la palabra (DIGO) entre paréntesis y continuar con el texto correcto.",
          "Aplicar corrector líquido blanco (Liquid Paper).",
          "Arrancar la hoja dañada del libro foliado.",
          "Tachar fuertemente con plumón negro."
        ],
        respuestaCorrecta: "Escribir la palabra (DIGO) entre paréntesis y continuar con el texto correcto.",
        explicacion: "El libro foliado es un documento de valor probatorio que no admite borrones, enmendaduras ni hojas arrancadas."
      },
      {
        id: "gn-f2",
        pregunta: "¿Cuál es el número de emergencia telefónica de Carabineros de Chile?",
        opciones: [
          "133",
          "131",
          "132",
          "134"
        ],
        respuestaCorrecta: "133",
        explicacion: "El 133 es el número nacional de emergencias de Carabineros de Chile (132 es Bomberos, 131 SAMU y 134 PDI)."
      }
    ]
  }
};

export function getQuizOTEC(cursoSlug: string, evaluacionId: string): ModuloQuizOTEC | null {
  const key = `${cursoSlug}-${evaluacionId.replace("ev-", "")}`;
  if (BANCO_QUIZ_OTEC[key]) {
    return BANCO_QUIZ_OTEC[key];
  }
  // Búsqueda flexible
  const match = Object.values(BANCO_QUIZ_OTEC).find(
    (q) => q.cursoSlug === cursoSlug && q.evaluacionId === evaluacionId
  );
  return match || null;
}
