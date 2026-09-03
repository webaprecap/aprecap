export interface VideoOTEC {
  id: string;
  titulo: string;
  youtubeUrl: string;
  youtubeId: string;
  duracionAprox?: string;
  descripcion?: string;
}

export interface DocumentoPDFOTEC {
  id: string;
  nombre: string;
  archivo: string; // ruta relativa en /documentos-otec/[slug]/...
  descripcion?: string;
  paginas?: number;
  esPrograma?: boolean;
}

export interface EvaluacionOTEC {
  id: string;
  titulo: string;
  tipo: "modulo" | "final";
}

export interface CursoOTECLaboral {
  slug: string;
  titulo: string;
  categoria: string;
  icono: string;
  horas: string;
  modalidad: string;
  resumen: string;
  objetivo: string;
  videos: VideoOTEC[];
  documentos: DocumentoPDFOTEC[];
  evaluaciones: EvaluacionOTEC[];
}

export const CURSOS_OTEC_LABORALES: CursoOTECLaboral[] = [
  {
    slug: "alfabetizacion-digital",
    titulo: "Alfabetización Digital y Ofimática",
    categoria: "Competencias Digitales y Ofimática",
    icono: "💻",
    horas: "40 hrs",
    modalidad: "Online Asincrónica (Autoaprendizaje)",
    resumen:
      "Formación integral en computación básica, navegación en internet, procesadores de texto Word, planillas de cálculo Excel, correo electrónico y presentaciones multimedia en PowerPoint.",
    objetivo:
      "Entregar al participante competencias digitales esenciales para desempeñarse eficientemente en entornos laborales automatizados y administrativos modernos.",
    videos: [
      {
        id: "ad-v1",
        titulo: "¿Qué es una Computadora?",
        youtubeUrl: "https://www.youtube.com/watch?v=xL8C5CIxDts",
        youtubeId: "xL8C5CIxDts",
        duracionAprox: "5 min",
        descripcion: "Microaprendizaje sobre hardware, software y periféricos esenciales.",
      },
      {
        id: "ad-v2",
        titulo: "Introducción Práctica a Word",
        youtubeUrl: "https://www.youtube.com/watch?v=pbvwCTld8BA",
        youtubeId: "pbvwCTld8BA",
        duracionAprox: "10 min",
        descripcion: "Edición de documentos, formatos de texto, márgenes y exportación a PDF.",
      },
      {
        id: "ad-v3",
        titulo: "Excel Básico en 10 Minutos",
        youtubeUrl: "https://www.youtube.com/watch?v=pDwZV7V7ECM",
        youtubeId: "pDwZV7V7ECM",
        duracionAprox: "10 min",
        descripcion: "Creación de tablas, fórmulas aritméticas básicas y gráficos de datos.",
      },
      {
        id: "ad-v4",
        titulo: "Conocimientos Básicos de Gmail",
        youtubeUrl: "https://www.youtube.com/watch?v=OmmevPt_dSk",
        youtubeId: "OmmevPt_dSk",
        duracionAprox: "8 min",
        descripcion: "Envío seguro de correos, gestión de adjuntos, filtros y etiquetas.",
      },
      {
        id: "ad-v5",
        titulo: "Diseño de Presentaciones en PowerPoint",
        youtubeUrl: "https://www.youtube.com/watch?v=LIXfGkAca0g",
        youtubeId: "LIXfGkAca0g",
        duracionAprox: "12 min",
        descripcion: "Estructuración de diapositivas, transiciones y elementos visuales de impacto.",
      },
    ],
    documentos: [
      {
        id: "ad-p0",
        nombre: "Programa Oficial del Curso: Alfabetización Digital",
        archivo: "/documentos-otec/alfabetizacion-digital/PROGRAMA_CURSO_1_1_.pdf",
        descripcion: "Estructura académica, objetivos de aprendizaje y metodología.",
        esPrograma: true,
      },
      {
        id: "ad-p1",
        nombre: "Módulo 1: Exploración Tecnológica y Conceptos del Computador",
        archivo: "/documentos-otec/alfabetizacion-digital/M1_4_.pdf",
        descripcion: "Componentes del computador, sistema operativo y periféricos de entrada y salida.",
      },
      {
        id: "ad-p2",
        nombre: "Módulo 2: Procesador de Texto Microsoft Word",
        archivo: "/documentos-otec/alfabetizacion-digital/M2_1_.pdf",
        descripcion: "Redacción formal, diseño de página, tablas, viñetas y formato de informes.",
      },
      {
        id: "ad-p3",
        nombre: "Módulo 3: Planillas de Cálculo Microsoft Excel",
        archivo: "/documentos-otec/alfabetizacion-digital/M3_1_.pdf",
        descripcion: "Organización de datos en celdas, operadores matemáticos y funciones esenciales.",
      },
      {
        id: "ad-p4",
        nombre: "Módulo 4: Navegación en Internet y Correo Electrónico",
        archivo: "/documentos-otec/alfabetizacion-digital/M4.pdf",
        descripcion: "Búsquedas avanzadas, seguridad web y comunicación corporativa por correo.",
      },
      {
        id: "ad-p5",
        nombre: "Módulo 5: Presentaciones Efectivas en Microsoft PowerPoint",
        archivo: "/documentos-otec/alfabetizacion-digital/M5.pdf",
        descripcion: "Creación de presentaciones dinámicas para reuniones y capacitaciones.",
      },
    ],
    evaluaciones: [
      { id: "ad-e1", titulo: "Evaluación Módulo 1", tipo: "modulo" },
      { id: "ad-e2", titulo: "Evaluación Módulo 2", tipo: "modulo" },
      { id: "ad-e3", titulo: "Evaluación Módulo 3", tipo: "modulo" },
      { id: "ad-e4", titulo: "Evaluación Módulo 4", tipo: "modulo" },
      { id: "ad-e5", titulo: "Evaluación Módulo 5", tipo: "modulo" },
      { id: "ad-ef", titulo: "Evaluación Final Integradora", tipo: "final" },
    ],
  },
  {
    slug: "grua-horquilla",
    titulo: "Operación Segura de Grúa Horquilla",
    categoria: "Operaciones y Maquinaria Pesada",
    icono: "🏗️",
    horas: "32 hrs",
    modalidad: "Online Asincrónica con Apoyo Técnico",
    resumen:
      "Técnicas de conducción preventiva, componentes mecánicos, estabilidad de carga, normas de seguridad y estándares operacionales para operadores de grúas horquilla.",
    objetivo:
      "Formar operadores responsables y calificados bajo altos estándares de prevención de riesgos mecánicos y operacionales en bodegas y centros logísticos.",
    videos: [
      {
        id: "gh-v1",
        titulo: "Curso Teórico de Grúa Horquilla",
        youtubeUrl: "https://www.youtube.com/watch?v=-P-0plrSlMI",
        youtubeId: "-P-0plrSlMI",
        duracionAprox: "15 min",
        descripcion: "Principios de funcionamiento y centro de gravedad del equipo.",
      },
      {
        id: "gh-v2",
        titulo: "Operación Segura de Grúa Horquilla en Terreno",
        youtubeUrl: "https://www.youtube.com/watch?v=delOYWnWzK4",
        youtubeId: "delOYWnWzK4",
        duracionAprox: "12 min",
        descripcion: "Maniobras de carga, descarga y circulación en pasillos estrechos.",
      },
      {
        id: "gh-v3",
        titulo: "Prevención de Riesgos en la Operación de Grúas",
        youtubeUrl: "https://www.youtube.com/watch?v=a_VoudzNlVY",
        youtubeId: "a_VoudzNlVY",
        duracionAprox: "10 min",
        descripcion: "Inspección pre-operacional y checklist de seguridad antes del encendido.",
      },
      {
        id: "gh-v4",
        titulo: "Normas de Seguridad y Señalización de Maniobras",
        youtubeUrl: "https://www.youtube.com/watch?v=7vYjlXDs5XE",
        youtubeId: "7vYjlXDs5XE",
        duracionAprox: "8 min",
        descripcion: "Coordinación con señaleros y cumplimiento de normas CMDIC.",
      },
    ],
    documentos: [
      {
        id: "gh-p0",
        nombre: "Programa del Curso: Operación Segura de Grúa Horquilla",
        archivo: "/documentos-otec/grua-horquilla/PROGRAMA_DEL_CURSO_6_.pdf",
        descripcion: "Contenidos, horas y perfiles de egreso.",
        esPrograma: true,
      },
      {
        id: "gh-p1",
        nombre: "Módulo 1: Conceptos Básicos y Componentes de la Grúa Horquilla",
        archivo: "/documentos-otec/grua-horquilla/M1_4_.pdf",
        descripcion: "Sistemas hidráulicos, mástil, uñas de carga, contrapeso y controles.",
      },
      {
        id: "gh-p2",
        nombre: "Módulo 2: Normas de Seguridad Operacional y Estándares de Maniobra",
        archivo: "/documentos-otec/grua-horquilla/M2_1_.pdf",
        descripcion: "Estándares CMDIC, señalética, instrucciones para señaleros y prevención de volcamientos.",
      },
    ],
    evaluaciones: [
      { id: "gh-e1", titulo: "Evaluación Módulo 1", tipo: "modulo" },
      { id: "gh-e2", titulo: "Evaluación Módulo 2", tipo: "modulo" },
      { id: "gh-ef", titulo: "Evaluación Final Teórica", tipo: "final" },
    ],
  },
  {
    slug: "trabajo-en-altura",
    titulo: "Prevención y Trabajo Seguro en Altura",
    categoria: "Prevención de Riesgos Industriales",
    icono: "🪜",
    horas: "24 hrs",
    modalidad: "Online Asincrónica",
    resumen:
      "Normativa de seguridad, sistemas personales de detención de caídas (SPDC), arneses, líneas de vida, trabajo seguro en andamios y respuesta a emergencias.",
    objetivo:
      "Capacitar en la correcta identificación de riesgos de caída a distinto nivel, uso de EPP certificados y aplicación de protocolos de seguridad en faenas en altura.",
    videos: [
      {
        id: "ta-v1",
        titulo: "Charla de Seguridad 5 Minutos: Trabajo en Altura",
        youtubeUrl: "https://www.youtube.com/watch?v=CsOuAbrm2NQ",
        youtubeId: "CsOuAbrm2NQ",
        duracionAprox: "5 min",
        descripcion: "Conceptos vitales de anclaje, inspección de arnés y prevención activa.",
      },
    ],
    documentos: [
      {
        id: "ta-p0",
        nombre: "Programa del Curso: Prevención y Trabajo Seguro en Altura",
        archivo: "/documentos-otec/trabajo-en-altura/PROGRAMA_DEL_CURSO_6_.pdf",
        descripcion: "Programa académico y marco de evaluación.",
        esPrograma: true,
      },
      {
        id: "ta-p1",
        nombre: "Módulo 1: Fundamentos y Lineamientos Técnicos del Trabajo en Altura",
        archivo: "/documentos-otec/trabajo-en-altura/M1_4_.pdf",
        descripcion: "Definición legal de trabajo en altura (>1.8m), caída libre y causas de accidentes.",
      },
      {
        id: "ta-p2",
        nombre: "Módulo 2: Definiciones, Abreviaturas y Equipos de Protección (EPP)",
        archivo: "/documentos-otec/trabajo-en-altura/M2_1_.pdf",
        descripcion: "Absorbedor de choque, mosquetones, líneas de sujeción y conectores certificados.",
      },
      {
        id: "ta-p3",
        nombre: "Módulo 3: Medidas de Seguridad y Salud Compatible",
        archivo: "/documentos-otec/trabajo-en-altura/M3_1_.pdf",
        descripcion: "Exámenes ocupacionales para altura geográfica y física, mareos y vértigo.",
      },
      {
        id: "ta-p4",
        nombre: "Módulo 4: Trabajo Seguro en Andamios y Plataformas Elevadoras",
        archivo: "/documentos-otec/trabajo-en-altura/M4.pdf",
        descripcion: "Inspección de tablones, crucetas, barandas de protección y tarjeta verde.",
      },
      {
        id: "ta-p5",
        nombre: "Módulo 5: Procedimientos y Protocolos ante Emergencias en Altura",
        archivo: "/documentos-otec/trabajo-en-altura/M5.pdf",
        descripcion: "Rescate en suspensión, síndrome del arnés (trauma por ortostatismo) y primeros auxilios.",
      },
      {
        id: "ta-p6",
        nombre: "Módulo 6: Glosario Técnico y Sistemas de Detención de Caídas (SPDC)",
        archivo: "/documentos-otec/trabajo-en-altura/M6.pdf",
        descripcion: "Compilación de términos normativos chilenos e internacionales.",
      },
      {
        id: "ta-p7",
        nombre: "Anexo Técnico: Ficha de Diálogo y Charla de Seguridad",
        archivo: "/documentos-otec/trabajo-en-altura/Ficha_Dia_logo_Seguridad.pdf",
        descripcion: "Guía práctica para supervisores y líderes de cuadrilla en faena.",
      },
    ],
    evaluaciones: [
      { id: "ta-e1", titulo: "Evaluación Módulo 1", tipo: "modulo" },
      { id: "ta-e2", titulo: "Evaluación Módulo 2", tipo: "modulo" },
      { id: "ta-e3", titulo: "Evaluación Módulo 3", tipo: "modulo" },
      { id: "ta-e4", titulo: "Evaluación Módulo 4", tipo: "modulo" },
      { id: "ta-e5", titulo: "Evaluación Módulo 5", tipo: "modulo" },
      { id: "ta-ef", titulo: "Evaluación Final Integral", tipo: "final" },
    ],
  },
  {
    slug: "manejo-de-sustancias-peligrosas",
    titulo: "Manejo y Almacenamiento de Sustancias Peligrosas",
    categoria: "Sustancias Químicas y Medio Ambiente",
    icono: "☣️",
    horas: "30 hrs",
    modalidad: "Online Asincrónica",
    resumen:
      "Clasificación NCh-382 y GHS de sustancias peligrosas, rotulación ADR/NCh-2190, interpretación de Hojas de Datos de Seguridad (HDS/HDST) y almacenamiento según D.S. 43.",
    objetivo:
      "Instruir en el manejo seguro de reactivos y productos químicos peligrosos, mitigando riesgos de toxicidad, inflamabilidad, corrosión y derrames en bodega.",
    videos: [
      {
        id: "sp-v1",
        titulo: "Fundamentos de Sustancias Peligrosas",
        youtubeUrl: "https://www.youtube.com/watch?v=jqmVDLhPIT8",
        youtubeId: "jqmVDLhPIT8",
        duracionAprox: "10 min",
        descripcion: "Clasificación de las 9 clases de sustancias peligrosas de la ONU.",
      },
      {
        id: "sp-v2",
        titulo: "Etiquetas y Clases de Sustancias Químicas",
        youtubeUrl: "https://www.youtube.com/watch?v=3YgFdAOl4jM",
        youtubeId: "3YgFdAOl4jM",
        duracionAprox: "12 min",
        descripcion: "Pictogramas de peligro, rombo NFPA 704 y sistema globalmente armonizado.",
      },
      {
        id: "sp-v3",
        titulo: "Paneles Naranjas y Señalética ADR en Transporte",
        youtubeUrl: "https://www.youtube.com/watch?v=KNzAetAbgBc",
        youtubeId: "KNzAetAbgBc",
        duracionAprox: "8 min",
        descripcion: "Identificación de código Kemler y número ONU en camiones cisterna.",
      },
      {
        id: "sp-v4",
        titulo: "Interpretación de Hojas de Seguridad HDS",
        youtubeUrl: "https://www.youtube.com/watch?v=oCMtUyClFWA",
        youtubeId: "oCMtUyClFWA",
        duracionAprox: "14 min",
        descripcion: "Estructura de 16 secciones de la NCh-2245 para respuesta ante derrames.",
      },
    ],
    documentos: [
      {
        id: "sp-p0",
        nombre: "Programa del Curso: Manejo y Almacenamiento de Sustancias Peligrosas",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/PROGRAMA_DEL_CURSO_6_.pdf",
        descripcion: "Estructura curricular y normativa legal asociada (D.S. 43 y D.S. 594).",
        esPrograma: true,
      },
      {
        id: "sp-p1",
        nombre: "Módulo 1: Definición, Criterios y Clasificación de Sustancias Peligrosas",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/M1_4_.pdf",
        descripcion: "Propiedades fisicoquímicas, explosivos, gases, líquidos inflamables y tóxicos.",
      },
      {
        id: "sp-p2",
        nombre: "Módulo 2: Identificación de Riesgos y Asignación de Números NU",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/M2_1_.pdf",
        descripcion: "Codificación internacional para transporte y rotulación de bultos.",
      },
      {
        id: "sp-p2a",
        nombre: "Anexo Módulo 2: Códigos de Riesgo en Contenedores Intermodales",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/ANEXO_M2_1_.pdf",
        descripcion: "Guía de lectura para contenedores marítimos y terrestres.",
      },
      {
        id: "sp-p3",
        nombre: "Módulo 3: Intensificación de Riesgos y Manejo de Cilindros de Gas",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/M3_1_.pdf",
        descripcion: "Almacenamiento seguro, encadenamiento y segregación de gases comprimidos.",
      },
      {
        id: "sp-p4",
        nombre: "Módulo 4: Etiquetado de Envases Químicos según Estándares GHS/UE",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/M4.pdf",
        descripcion: "Frases H (peligro) y frases P (prudencia), palabras de advertencia.",
      },
      {
        id: "sp-p5",
        nombre: "Módulo 5: Hojas de Datos de Seguridad Norma Chilena NCh-2245",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/M5.pdf",
        descripcion: "Las 16 secciones reglamentarias de una HDS y obligaciones del empleador.",
      },
      {
        id: "sp-p5a",
        nombre: "Guía 5.2: Formato Oficial de Presentación de una HDS",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/5.2_Formato_de_Presentacio_n_de_una_HDS.pdf",
        descripcion: "Plantilla tipo para documentación en bodegas químicas.",
      },
      {
        id: "sp-p5b",
        nombre: "Guía 5.4: Formato Oficial de Presentación de una HDST",
        archivo: "/documentos-otec/manejo-de-sustancias-peligrosas/5.4_Formato_de_Presentacio_n_de_una_HDST.pdf",
        descripcion: "Hoja de datos de seguridad para transporte terrestre de mercancías.",
      },
    ],
    evaluaciones: [
      { id: "sp-e1", titulo: "Evaluación Módulo 1", tipo: "modulo" },
      { id: "sp-e2", titulo: "Evaluación Módulo 2", tipo: "modulo" },
      { id: "sp-e3", titulo: "Evaluación Módulo 3", tipo: "modulo" },
      { id: "sp-e5", titulo: "Evaluación Módulo 5", tipo: "modulo" },
      { id: "sp-ef", titulo: "Evaluación Final Integral", tipo: "final" },
    ],
  },
  {
    slug: "tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia",
    titulo: "Técnicas de Autocuidado y Manejo de Estrés Laboral",
    categoria: "Salud Ocupacional y Bienestar Laboral",
    icono: "🧠",
    horas: "20 hrs",
    modalidad: "Online Asincrónica",
    resumen:
      "Herramientas psicológicas y prácticas para prevenir el síndrome de Burnout, gestionar crisis laborales, regular emociones y fomentar hábitos de trabajo saludables.",
    objetivo:
      "Desarrollar habilidades de afrontamiento y resiliencia en trabajadores expuestos a ambientes laborales de alta demanda y exigencia.",
    videos: [
      {
        id: "ae-v1",
        titulo: "Técnicas de Gestión del Estrés Laboral",
        youtubeUrl: "https://www.youtube.com/watch?v=iIhGymicgtg",
        youtubeId: "iIhGymicgtg",
        duracionAprox: "10 min",
        descripcion: "Identificación de estresores primarios y secundarios en el trabajo.",
      },
      {
        id: "ae-v2",
        titulo: "Beneficios del Mindfulness en el Trabajo",
        youtubeUrl: "https://www.youtube.com/watch?v=awB9G2WZ_2w",
        youtubeId: "awB9G2WZ_2w",
        duracionAprox: "8 min",
        descripcion: "Ejercicios de respiración consciente para reducir la ansiedad.",
      },
      {
        id: "ae-v3",
        titulo: "Manejo del Estrés en Escenarios de Alta Presión",
        youtubeUrl: "https://www.youtube.com/watch?v=mijHfogjbtk",
        youtubeId: "mijHfogjbtk",
        duracionAprox: "12 min",
        descripcion: "Estrategias de control y contención durante contingencias operativas.",
      },
      {
        id: "ae-v4",
        titulo: "Primeros Auxilios Psicológicos (PAP)",
        youtubeUrl: "https://www.youtube.com/watch?v=xDH5BMXIRWg",
        youtubeId: "xDH5BMXIRWg",
        duracionAprox: "15 min",
        descripcion: "Protocolo de escucha activa y contención ante eventos traumáticos.",
      },
      {
        id: "ae-v5",
        titulo: "Comunicación Asertiva y Empática",
        youtubeUrl: "https://www.youtube.com/watch?v=YBWIMFjzy5o",
        youtubeId: "YBWIMFjzy5o",
        duracionAprox: "11 min",
        descripcion: "Técnicas para expresar límites sin generar confrontación.",
      },
      {
        id: "ae-v6",
        titulo: "Pensamiento Positivo y Resiliencia Ocupacional",
        youtubeUrl: "https://www.youtube.com/watch?v=XPA2KMQrvQM",
        youtubeId: "XPA2KMQrvQM",
        duracionAprox: "9 min",
        descripcion: "Reestructuración cognitiva y refuerzo de la autoeficacia laboral.",
      },
    ],
    documentos: [
      {
        id: "ae-p0",
        nombre: "Programa del Curso: Manejo de Emociones y Estrés en Situaciones de Crisis",
        archivo: "/documentos-otec/tecnicas-de-autocuidado-y-manejo-de-estres/PROGRAMA_DEL_CURSO.pdf",
        descripcion: "Fundamentación técnica, objetivos y módulos de salud mental.",
        esPrograma: true,
      },
      {
        id: "ae-p1",
        nombre: "Módulo 1: Manejo de Crisis, Autoevaluación y Gestión del Estrés",
        archivo: "/documentos-otec/tecnicas-de-autocuidado-y-manejo-de-estres/M1.pdf",
        descripcion: "Síntomas fisiológicos del estrés, escalas de autoevaluación y fases de crisis.",
      },
      {
        id: "ae-p2",
        nombre: "Módulo 2: Gestión de las Relaciones e Inteligencia Emocional en Equipos",
        archivo: "/documentos-otec/tecnicas-de-autocuidado-y-manejo-de-estres/M2.pdf",
        descripcion: "Dinámica relacional, empatía y clima laboral saludable.",
      },
      {
        id: "ae-p3",
        nombre: "Módulo 3: Autogestión de las Emociones y Conducta ante Situaciones Críticas",
        archivo: "/documentos-otec/tecnicas-de-autocuidado-y-manejo-de-estres/M3.pdf",
        descripcion: "Técnicas de autorregulación emocional y toma de decisiones bajo presión.",
      },
    ],
    evaluaciones: [
      { id: "ae-e1", titulo: "Evaluación Módulo 1", tipo: "modulo" },
      { id: "ae-e2", titulo: "Evaluación Módulo 2", tipo: "modulo" },
      { id: "ae-e3", titulo: "Evaluación Módulo 3", tipo: "modulo" },
      { id: "ae-ef", titulo: "Evaluación Final", tipo: "final" },
    ],
  },
  {
    slug: "tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas",
    titulo: "Liderazgo Efectivo, Trabajo en Equipo y Gestión de Personas",
    categoria: "Liderazgo y Habilidades Directivas",
    icono: "👥",
    horas: "30 hrs",
    modalidad: "Online Asincrónica",
    resumen:
      "Técnicas de motivación, comunicación interpersonal asertiva, resolución de conflictos, dinámicas de trabajo en equipo y estrategias para liderar grupos humanos con éxito.",
    objetivo:
      "Entregar competencias prácticas a jefaturas intermedias y coordinadores para guiar equipos de alto desempeño y clima laboral positivo.",
    videos: [
      {
        id: "lid-v1",
        titulo: "La Motivación • Cómo Motivarse a Uno Mismo",
        youtubeUrl: "https://www.youtube.com/watch?v=haSDDcvjn3k",
        youtubeId: "haSDDcvjn3k",
        duracionAprox: "10 min",
        descripcion: "Motivación intrínseca vs extrínseca en el logro de objetivos.",
      },
      {
        id: "lid-v2",
        titulo: "Comunicación Efectiva • Mejorar la Comunicación de Equipo",
        youtubeUrl: "https://www.youtube.com/watch?v=YBWIMFjzy5o",
        youtubeId: "YBWIMFjzy5o",
        duracionAprox: "11 min",
        descripcion: "Barreras de la comunicación, retroalimentación y escucha activa.",
      },
      {
        id: "lid-v3",
        titulo: "La Importancia del Trabajo en Equipo en las Organizaciones",
        youtubeUrl: "https://www.youtube.com/watch?v=LZGl-1FX_HA",
        youtubeId: "LZGl-1FX_HA",
        duracionAprox: "8 min",
        descripcion: "Sinergia, roles complementarios y confianza mutua.",
      },
      {
        id: "lid-v4",
        titulo: "Cómo Ser un Buen Líder • 5 Estrategias Prácticas",
        youtubeUrl: "https://www.youtube.com/watch?v=16z28DjRTAA",
        youtubeId: "16z28DjRTAA",
        duracionAprox: "13 min",
        descripcion: "Estilos de liderazgo situacional y empoderamiento de colaboradores.",
      },
      {
        id: "lid-v5",
        titulo: "Claves para una Buena Gestión de Personas",
        youtubeUrl: "https://www.youtube.com/watch?v=3dsJXtwH4ds",
        youtubeId: "3dsJXtwH4ds",
        duracionAprox: "9 min",
        descripcion: "Gestión del talento, reconocimiento y alineamiento con metas.",
      },
    ],
    documentos: [
      {
        id: "lid-p0",
        nombre: "Programa del Curso: Liderazgo para Trabajo en Equipo y Gestión de Personas",
        archivo: "/documentos-otec/tecnicas-de-liderazgo-efectivo/PROGRAMA_DEL_CURSO.pdf",
        descripcion: "Estructura académica de liderazgo transformacional y gestión de personas.",
        esPrograma: true,
      },
      {
        id: "lid-p1",
        nombre: "Módulo 1: La Motivación Humana y Claves para la Automotivación",
        archivo: "/documentos-otec/tecnicas-de-liderazgo-efectivo/M1.pdf",
        descripcion: "Factores motivacionales, necesidades humanas y actitud proactiva.",
      },
      {
        id: "lid-p2",
        nombre: "Módulo 2: La Comunicación Asertiva en el Ámbito Organizacional",
        archivo: "/documentos-otec/tecnicas-de-liderazgo-efectivo/M2.pdf",
        descripcion: "Canales de comunicación, lenguaje verbal/no verbal y feedback positivo.",
      },
      {
        id: "lid-p3",
        nombre: "Módulo 3: La Asertividad y Resolución de Conflictos Laborales",
        archivo: "/documentos-otec/tecnicas-de-liderazgo-efectivo/M3.pdf",
        descripcion: "Técnicas de negociación, manejo de discrepancias y acuerdos ganar-ganar.",
      },
      {
        id: "lid-p4",
        nombre: "Módulo 4: Trabajo en Equipo, Sinergia y Cohesión Grupal",
        archivo: "/documentos-otec/tecnicas-de-liderazgo-efectivo/M4.pdf",
        descripcion: "Diferencia entre grupo y equipo, etapas de desarrollo y metas compartidas.",
      },
      {
        id: "lid-p5",
        nombre: "Módulo 5: Técnicas y Estrategias para Liderar Equipos de Alto Desempeño",
        archivo: "/documentos-otec/tecnicas-de-liderazgo-efectivo/M5.pdf",
        descripcion: "Delegación eficaz, toma de decisiones y fomento del compromiso.",
      },
      {
        id: "lid-p6",
        nombre: "Módulo 6: Gestión, Acompañamiento y Dirección de Personas",
        archivo: "/documentos-otec/tecnicas-de-liderazgo-efectivo/M6.pdf",
        descripcion: "Coaching laboral, evaluación del desempeño y desarrollo de colaboradores.",
      },
    ],
    evaluaciones: [
      { id: "lid-e1", titulo: "Evaluación Módulo 1", tipo: "modulo" },
      { id: "lid-e2", titulo: "Evaluación Módulo 2", tipo: "modulo" },
      { id: "lid-e3", titulo: "Evaluación Módulo 3", tipo: "modulo" },
      { id: "lid-e4", titulo: "Evaluación Módulo 4", tipo: "modulo" },
      { id: "lid-e5", titulo: "Evaluación Módulo 5", tipo: "modulo" },
      { id: "lid-e6", titulo: "Evaluación Módulo 6", tipo: "modulo" },
      { id: "lid-ef", titulo: "Evaluación Final", tipo: "final" },
    ],
  },
  {
    slug: "trabajo-en-espacios-confinados",
    titulo: "Prevención y Trabajo Seguro en Espacios Confinados",
    categoria: "Seguridad Industrial y Espacios Críticos",
    icono: "🕳️",
    horas: "24 hrs",
    modalidad: "Online Asincrónica",
    resumen:
      "Protocolos de entrada a espacios confinados, medición de atmósferas peligrosas (oxígeno, gases tóxicos/combustibles), ventilación forzada y permisos de trabajo seguro (PTS).",
    objetivo:
      "Entrenar a los trabajadores en la identificación rigurosa de riesgos atmosféricos y mecánicos antes y durante labores en recintos confinados.",
    videos: [],
    documentos: [
      {
        id: "ec-p0",
        nombre: "Programa del Curso: Trabajo Seguro en Espacios Confinados",
        archivo: "/documentos-otec/trabajo-en-espacios-confinados/TRABAJO_EN_ESPACIOS_CONFINADOS_1_.pdf",
        descripcion: "Objetivos de prevención y requisitos de ingreso a recintos confinados.",
        esPrograma: true,
      },
      {
        id: "ec-p1",
        nombre: "Módulo 1: Introducción, Riesgos Generales y Específicos",
        archivo: "/documentos-otec/trabajo-en-espacios-confinados/M1.pdf",
        descripcion: "Definición técnica de espacio confinado, asfixia, intoxicación e incendio.",
      },
      {
        id: "ec-p1t",
        nombre: "Taller Práctico Módulo 1: Medición de Atmósferas y Permisos de Ingreso",
        archivo: "/documentos-otec/trabajo-en-espacios-confinados/TALLER_M1.pdf",
        descripcion: "Casos prácticos de medición con detector de gases multigas.",
      },
      {
        id: "ec-p2",
        nombre: "Módulo 2: Procedimientos de Trabajo y Equipos de Seguridad",
        archivo: "/documentos-otec/trabajo-en-espacios-confinados/M2.pdf",
        descripcion: "Equipos ERA (respiración autónoma), trípodes de rescate y vigía exterior.",
      },
      {
        id: "ec-p3",
        nombre: "Módulo 3: Guía Técnica y Marco Normativo de Aplicación",
        archivo: "/documentos-otec/trabajo-en-espacios-confinados/M3.pdf",
        descripcion: "Reglamentos D.S. 594, roles del vigía, supervisor y cuadrilla de rescate.",
      },
    ],
    evaluaciones: [
      { id: "ec-e1", titulo: "Evaluación Módulo 1", tipo: "modulo" },
      { id: "ec-e2", titulo: "Evaluación Módulo 2", tipo: "modulo" },
      { id: "ec-ef", titulo: "Evaluación Final", tipo: "final" },
    ],
  },
  {
    slug: "gestion-y-promocion-del-buen-trato",
    titulo: "Gestión y Promoción del Buen Trato Laboral",
    categoria: "Clima Laboral y Relaciones Humanas",
    icono: "🤝",
    horas: "16 hrs",
    modalidad: "Online Asincrónica",
    resumen:
      "Fundamentos del buen trato en ambientes organizacionales, convivencia laboral, prevención del acoso laboral (Ley Karin) y dignidad en las relaciones laborales.",
    objetivo:
      "Fomentar una cultura organizacional orientada al respeto mutuo, no discriminación y resolución pacífica de diferencias en el trabajo.",
    videos: [],
    documentos: [
      {
        id: "bt-p0",
        nombre: "Programa Oficial: Gestión y Promoción del Buen Trato Laboral",
        archivo: "/documentos-otec/gestion-y-promocion-del-buen-trato/Programa_BT.pdf",
        descripcion: "Marco ético, lineamientos y compromisos de buen trato.",
        esPrograma: true,
      },
    ],
    evaluaciones: [],
  },
  {
    slug: "operador-de-calderas-y-generadores-de-vapor",
    titulo: "Operador de Calderas y Generadores de Vapor",
    categoria: "Especialidades Técnicas e Instalaciones Térmicas",
    icono: "⚙️",
    horas: "40 hrs",
    modalidad: "Online Asincrónica con Material Técnico",
    resumen:
      "Operación segura de calderas de vapor, autoclaves y fluidos térmicos según el Decreto Supremo N° 10 del Ministerio de Salud. Mantenimiento preventivo y control de presiones.",
    objetivo:
      "Preparar al operador en los fundamentos termodinámicos, componentes de seguridad, válvulas de alivio y protocolos operacionales para rendir examen de operador de calderas.",
    videos: [],
    documentos: [
      {
        id: "cal-p0",
        nombre: "Programa Oficial: Generalidades y Competencias del Operador de Calderas",
        archivo: "/documentos-otec/operador-de-calderas/GENERALIDADES-CURSO-OPERADOR-DE-CALDERAS-Y-GENERADORES-DE-VAPOR.pdf",
        descripcion: "Generalidades del curso y perfil del operador.",
        esPrograma: true,
      },
      {
        id: "cal-p1",
        nombre: "Manual Integral: Operación Segura y Mantenimiento de Generadores de Vapor (D.S. N° 10)",
        archivo: "/documentos-otec/operador-de-calderas/Curso-Operador-de-Calderas-y-Generadores-de-Vapor.pdf",
        descripcion: "Manual de estudio completo con termodinámica, válvulas de seguridad, purgas y combustión.",
      },
    ],
    evaluaciones: [],
  },
  {
    slug: "guardia-nochero-rondin-portero",
    titulo: "Guardia, Nochero, Rondín y Portero",
    categoria: "Seguridad y Vigilancia de Instalaciones",
    icono: "🛡️",
    horas: "32 hrs",
    modalidad: "Online Asincrónica (Autoaprendizaje)",
    resumen:
      "Formación especializada en control de accesos, libro de novedades, rondas perimetrales y respuesta ante emergencias bajo la Ley N° 21.659 de Seguridad Privada.",
    objetivo:
      "Capacitar al personal auxiliar de seguridad y conserjería en procedimientos técnicos de control, registro formal y protocolos de enlace con Carabineros y Bomberos.",
    videos: [],
    documentos: [
      {
        id: "gn-p0",
        nombre: "Programa del Curso: Guardia, Nochero, Rondín y Portero",
        archivo: "/documentos-otec/guardia-nochero-rondin-portero/PROGRAMA_CURSO.pdf",
        descripcion: "Estructura académica, perfil de egreso y normativa aplicable.",
        esPrograma: true,
      },
      {
        id: "gn-p1",
        nombre: "Módulo 1: Marco Legal, Diferenciación de Roles y Normativa Ley 21.659",
        archivo: "/documentos-otec/guardia-nochero-rondin-portero/M1_Marco_Legal_y_Normativa_Ley_21659.pdf",
        descripcion: "Reglamentación SPD, facultades, prohibición de armas y deberes laborales.",
      },
      {
        id: "gn-p2",
        nombre: "Módulo 2: Control de Accesos, Registro de Visitas y Libro de Novedades",
        archivo: "/documentos-otec/guardia-nochero-rondin-portero/M2_Control_de_Accesos_y_Libro_de_Novedades.pdf",
        descripcion: "Técnicas de verificación de identidad, registro de encomiendas y llenado formal de libros.",
      },
      {
        id: "gn-p3",
        nombre: "Módulo 3: Técnicas de Rondas, Prevención de Riesgos y Emergencias",
        archivo: "/documentos-otec/guardia-nochero-rondin-portero/M3_Rondas_de_Vigilancia_y_Emergencias.pdf",
        descripcion: "Patrullajes preventivos, detección de vulnerabilidades y protocolos de auxilio.",
      },
    ],
    evaluaciones: [
      { id: "gn-e1", titulo: "Evaluación Módulo 1", tipo: "modulo" },
      { id: "gn-e2", titulo: "Evaluación Módulo 2", tipo: "modulo" },
      { id: "gn-e3", titulo: "Evaluación Módulo 3", tipo: "modulo" },
      { id: "gn-ef", titulo: "Evaluación Final", tipo: "final" },
    ],
  },
];

const SLUG_ALIASES: Record<string, string> = {
  "tecnicas-de-liderazgo-efectivo": "tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas",
  "tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas": "tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas",
  "tecnicas-de-autocuidado-y-manejo-de-estres": "tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia",
  "tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia": "tecnicas-de-autocuidado-y-manejo-de-estres-en-contextos-laborales-de-alta-exigencia",
  "operador-de-calderas": "operador-de-calderas-y-generadores-de-vapor",
  "operador-de-calderas-y-generadores-de-vapor": "operador-de-calderas-y-generadores-de-vapor",
  "nochero-portero-y-rondin": "guardia-nochero-rondin-portero",
  "guardia-nochero-rondin-portero": "guardia-nochero-rondin-portero",
};

export function getCursoOTECLaboralBySlug(slug: string): CursoOTECLaboral | undefined {
  const resolved = SLUG_ALIASES[slug] || slug;
  return CURSOS_OTEC_LABORALES.find((c) => c.slug === resolved || c.slug === slug);
}
