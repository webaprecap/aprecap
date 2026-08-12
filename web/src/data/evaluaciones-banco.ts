export interface PreguntaEvaluacion {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number; // Índice 0-based de la opción correcta
  explicacion?: string;
}

export interface EvaluacionModulo {
  id: string;
  courseSlug: string;
  moduloNombre: string;
  duracionMinutos: number;
  minimoAprobacionPct: number;
  preguntas: PreguntaEvaluacion[];
}

export const bancoEvaluaciones: EvaluacionModulo[] = [
  {
    id: "eval-os10-mod1",
    courseSlug: "guardia-de-seguridad",
    moduloNombre: "Módulo 1: Legislación Laboral y Seguridad Privada",
    duracionMinutos: 45,
    minimoAprobacionPct: 75,
    preguntas: [
      {
        id: 1,
        pregunta: "El Estado de Derecho busca principalmente:",
        opciones: [
          "Favorecer a las autoridades",
          "Permitir el control militar",
          "Garantizar el respeto de los derechos de las personas"
        ],
        respuestaCorrecta: 2,
        explicacion: "El Estado de Derecho garantiza que el poder esté limitado por la ley para resguardar los derechos de todos los ciudadanos."
      },
      {
        id: 2,
        pregunta: "Según la Constitución Política de Chile, las personas nacen:",
        opciones: [
          "Libres e iguales en dignidad y derechos",
          "Dependientes del Estado",
          "Con distintos privilegios según su estrato social"
        ],
        respuestaCorrecta: 0,
        explicacion: "Artículo 1° de la CPR de Chile: 'Las personas nacen libres e iguales en dignidad y derechos'."
      },
      {
        id: 3,
        pregunta: "El principio de separación de funciones de los poderes del Estado implica:",
        opciones: [
          "Un solo poder centralizado",
          "Dividir el poder en Ejecutivo, Legislativo y Judicial",
          "Eliminar la autonomía judicial"
        ],
        respuestaCorrecta: 1
      },
      {
        id: 4,
        pregunta: "Cualquier persona o guardia de seguridad puede detener a quien sorprenda en delito flagrante según el Art. 129 del CPP.",
        opciones: [
          "Verdadero",
          "Falso"
        ],
        respuestaCorrecta: 0,
        explicacion: "Cualquier ciudadano está facultado legalmente para detener a un sujeto en flagrancia y entregarlo de inmediato a las fuerzas policiales."
      },
      {
        id: 5,
        pregunta: "Los vigilantes y guardias privados tienen como función principal:",
        opciones: [
          "Mantener el orden público en las calles",
          "Proteger bienes y personas dentro de recintos o instalaciones privadas",
          "Supervisar a Carabineros de Chile"
        ],
        respuestaCorrecta: 1
      },
      {
        id: 6,
        pregunta: "El objetivo de la Ley N° 16.744 es:",
        opciones: [
          "Regular la indemnización por vacaciones",
          "Establecer el seguro obligatorio contra accidentes del trabajo y enfermedades profesionales",
          "Definir el salario mínimo mensual"
        ],
        respuestaCorrecta: 1
      },
      {
        id: 7,
        pregunta: "El Decreto N° 222 se refiere a normativas de seguridad en:",
        opciones: [
          "Seguridad e infraestructura en cajeros automáticos",
          "Control de armas y explosivos",
          "Transporte de valores interurbano"
        ],
        respuestaCorrecta: 0
      },
      {
        id: 8,
        pregunta: "Según la Ley N° 17.798, el control de armas en el territorio nacional corresponde al:",
        opciones: [
          "Ministerio de Defensa Nacional (DGMN / Carabineros)",
          "Ministerio del Interior y Seguridad Pública",
          "Fiscalía Nacional"
        ],
        respuestaCorrecta: 0
      }
    ]
  },
  {
    id: "eval-cctv-mod1",
    courseSlug: "operador-cctv-y-alarmas",
    moduloNombre: "Módulo 1: Operaciones de Centro de Control CCTV y Alarmas",
    duracionMinutos: 40,
    minimoAprobacionPct: 75,
    preguntas: [
      {
        id: 1,
        pregunta: "En un sistema de CCTV, las cámaras PTZ corresponden a aquellas que permiten:",
        opciones: [
          "Grabar únicamente audio ambiental",
          "Movimiento horizontal (Pan), vertical (Tilt) y acercamiento óptico (Zoom)",
          "Funcionar exclusivamente sin energía eléctrica"
        ],
        respuestaCorrecta: 1
      },
      {
        id: 2,
        pregunta: "Ante la activación de un sensor PIR de intrusión, la primera acción del Operador de CCTV debe ser:",
        opciones: [
          "Ignorar la alarma hasta que suene nuevamente",
          "Verificar de inmediato la zona a través de las cámaras fijas o PTZ asociadas",
          "Llamar directamente al gerente sin comprobar la cámara"
        ],
        respuestaCorrecta: 1
      },
      {
        id: 3,
        pregunta: "El equipo encargado de registrar y almacenar digitalmente las imágenes de cámaras IP se denomina:",
        opciones: [
          "NVR (Network Video Recorder)",
          "UPS (Uninterruptible Power Supply)",
          "DVR Análogo clásico"
        ],
        respuestaCorrecta: 0
      }
    ]
  },
  {
    id: "eval-supervisor-mod1",
    courseSlug: "supervisor-de-seguridad",
    moduloNombre: "Módulo 1: Liderazgo y Supervisión Operativa",
    duracionMinutos: 60,
    minimoAprobacionPct: 80,
    preguntas: [
      {
        id: 1,
        pregunta: "El nexo directo entre la Jefatura de Seguridad y el personal operativo de guardias en terreno es:",
        opciones: [
          "El Gerente General",
          "El Supervisor de Seguridad Privada",
          "El cliente externo"
        ],
        respuestaCorrecta: 1
      },
      {
        id: 2,
        pregunta: "El documento legal obligatorio que norma el funcionamiento de los guardias en un puesto específico se denomina:",
        opciones: [
          "Directiva de Funcionamiento aprobada por OS-10",
          "Manual de Marcas de Reloj",
          "Reglamento de Higiene Interno"
        ],
        respuestaCorrecta: 0
      }
    ]
  }
];
