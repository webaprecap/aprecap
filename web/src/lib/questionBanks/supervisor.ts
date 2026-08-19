/**
 * BANCO DE PREGUNTAS — MINIQUIZ Y EXAMEN FINAL SUPERVISOR DE SEGURIDAD (APRECAP)
 * 72 preguntas (4 por submódulo × 18) fundamentadas en los MDs del curso
 * (docs/markdown_cursos/3_Supervisor_de_Seguridad) y en el marco legal vigente
 * (Ley 21.659, D.S. 209, Ley 16.744, D.S. 594, Código del Trabajo, Código Penal,
 * Código Procesal Penal, Ley 19.628, Ley 21.643).
 * Examen final: 60 preguntas balanceadas entre módulos con opciones barajadas.
 * MiniQuiz: 5 preguntas aleatorias por módulo.
 */

import type { ExamQuestion, PreguntaAlternativa } from "./types";
import { barajarOpciones, seleccionarBalanceadas } from "./helpers";

const M1 = "Módulo 1 — Normativa Laboral y Legislación de la Seguridad Privada";
const M2 = "Módulo 2 — Prevención de Riesgos y Control de Emergencias";
const M3 = "Módulo 3 — Procedimientos de Gestión de Seguridad";
const M4 = "Módulo 4 — Liderazgo y Resolución de Conflictos";
const M5 = "Módulo 5 — Sistemas de Alarma, Comunicación y Enlace";
const M6 = "Módulo 6 — Eventos Masivos, Registros Operativos y Manejo de Incidentes";

function q(
  id: string,
  moduleTitle: string,
  question: string,
  options: string[],
  correctAnswer: string,
  explicacion: string
): ExamQuestion {
  return { id, moduleTitle, question, options, correctAnswer, explicacion };
}

export const SUPERVISOR_QUESTION_BANK: ExamQuestion[] = [
  // ══════════════════════════════════════════════
  // MÓDULO 1 — Normativa Laboral y Legislación (1.1–1.7)
  // ══════════════════════════════════════════════
  q(
    "sup1_01",
    M1,
    "Según el Código del Trabajo, la jornada ordinaria máxima de trabajo semanal es de:",
    ["40 horas", "45 horas", "48 horas", "50 horas"],
    "45 horas",
    "La jornada ordinaria máxima es de 45 horas semanales (Art. 22 del Código del Trabajo). 40 horas corresponde a la jornada pactada de muchas empresas, 48 a la jornada antigua previa a la reforma y 50 no está contemplada como máximo legal."
  ),
  q(
    "sup1_02",
    M1,
    "Respecto de las horas extraordinarias, el límite legal diario es de:",
    ["1 hora", "2 horas", "3 horas", "No existe límite si el trabajador acepta"],
    "2 horas",
    "Las horas extraordinarias no pueden exceder de 2 horas diarias (Art. 30 del Código del Trabajo), salvo situaciones de emergencia o cuando el trabajador esté exceptuado por el tipo de labor. 1 hora es un mínimo posible, no el límite; 3 horas o un límite ilimitado contradicen la norma."
  ),
  q(
    "sup1_03",
    M1,
    "El feriado anual de vacaciones que corresponde a todo trabajador es de:",
    ["10 días hábiles", "12 días corridos", "15 días hábiles", "20 días corridos"],
    "15 días hábiles",
    "Todo trabajador tiene derecho a un feriado anual de 15 días hábiles por cada año de servicio (Art. 67 del Código del Trabajo). Las otras cifras no corresponden al mínimo legal de feriado en Chile."
  ),
  q(
    "sup1_04",
    M1,
    "Si el contrato de trabajo no se escritura en el plazo legal, se considera que:",
    ["El contrato no tiene validez alguna",
     "Se presume que el trabajador tiene contrato indefinido",
     "El empleador solo debe pagar la mitad de las remuneraciones",
     "El trabajador pierde sus derechos laborales"],
    "Se presume que el trabajador tiene contrato indefinido",
    "El Art. 9 del Código del Trabajo sanciona la falta de escrituración: se presume que el trabajador está contratado por tiempo indefinido. La escrituración debe hacerse dentro de los 15 días siguientes al ingreso (o 5 días si el plazo es superior a 30 días). La falta de contrato escrito no anula los derechos ni las remuneraciones."
  ),
  q(
    "sup1_05",
    M1,
    "Una prohibición que la legislación impone a los guardias de seguridad privada es:",
    ["Portar siempre su credencial de identificación",
     "Detener a quien sorprende en delito flagrante",
     "Ejercer funciones propias de la policía, como realizar controles de identidad",
     "Dar aviso a Carabineros ante un delito"],
    "Ejercer funciones propias de la policía, como realizar controles de identidad",
    "La seguridad privada es complementaria y coadyuvante de la seguridad pública: los guardias NO pueden ejercer funciones policiales como controles de identidad, registros obligatorios o vigilancia de la vía pública. Portar credencial, detener en flagrancia (Art. 129 CPP) y dar aviso a Carabineros son conductas permitidas u obligatorias."
  ),
  q(
    "sup1_06",
    M1,
    "Según el D.S. 209, el personal de seguridad privada requiere para ejercer:",
    ["Solo mayoría de edad", "Acreditación/licencia otorgada por la autoridad competente",
     "Una carta de recomendación del empleador", "Aprobar un examen psicológico municipal"],
    "Acreditación/licencia otorgada por la autoridad competente",
    "El D.S. 209 exige que los agentes de seguridad privada estén acreditados por la autoridad (Prefectura de Carabineros OS-10) y que los guardias porten su credencial vigente. La mayoría de edad es un requisito, pero no el único; las recomendaciones o exámenes municipales no reemplazan la acreditación legal."
  ),
  q(
    "sup1_07",
    M1,
    "En materia de sanciones, las infracciones a la Ley 21.659 y su reglamento pueden ser sancionadas con:",
    ["Amonestación verbal del empleador", "Multas y cancelación de la autorización o licencia",
     "Prisión automática para el guardia", "Solo una advertencia escrita"],
    "Multas y cancelación de la autorización o licencia",
    "La Ley 21.659 establece multas y la cancelación/suspensión de la autorización de empresas y de las licencias de los agentes según la gravedad y reincidencia de la infracción. No se contempla pena de prisión automática ni simples amonestaciones como sanción legal del régimen."
  ),
  q(
    "sup1_08",
    M1,
    "La Ley N° 21.659 establece a favor del personal de seguridad que actúa conforme a la ley:",
    ["Inmunidad penal total", "Una presunción de buena fe en el ejercicio de sus funciones",
     "Exención automática de responsabilidad civil", "Permiso para usar cualquier medio de fuerza"],
    "Una presunción de buena fe en el ejercicio de sus funciones",
    "La Ley 21.659 consagra una presunción de buena fe para el personal de seguridad que actúa conforme a la ley, el reglamento y las directivas de funcionamiento, garantizando que sea tratado con respeto y protección por las autoridades. No otorga inmunidad penal, ni exime de responsabilidad civil, ni autoriza el uso arbitrario de la fuerza."
  ),
  q(
    "sup1_09",
    M1,
    "Ante la comisión de un delito flagrante, el guardia de seguridad debe:",
    ["Retener al autor en sus dependencias todo el tiempo que estime necesario",
     "Detenerlo y entregarlo de inmediato a Carabineros o al juez",
     "Juzgarlo en el lugar", "Solo anotar el hecho en el libro de novedades"],
    "Detenerlo y entregarlo de inmediato a Carabineros o al juez",
    "El Art. 129 del Código Procesal Penal faculta a cualquier persona para detener a quien sorprenda en flagrancia, pero obliga a entregarlo de inmediato a la policía o al juez. Retener por tiempo indefinido constituye un apremio ilegítimo, juzgar al detenido es ejercicio ilegal de funciones y no actuar omite el deber de dar cuenta."
  ),
  q(
    "sup1_10",
    M1,
    "Una de las hipótesis de flagrancia del Art. 130 del Código Procesal Penal es:",
    ["El que acaba de cometer el delito con posterioridad huye del lugar y es designado por el ofendido como autor",
     "El que cometió un delito hace un mes", "El que es mencionado en una denuncia anónima",
     "El que tiene antecedentes penales previos"],
    "El que acaba de cometer el delito con posterioridad huye del lugar y es designado por el ofendido como autor",
    "El Art. 130 CPP contempla cuatro hipótesis de flagrancia, entre ellas quien huye del lugar de la comisión del delito y es designado por el ofendido u otra persona como autor o cómplice. La flagrancia exige inmediatez temporal: un delito cometido hace un mes, una denuncia anónima o los antecedentes penales no configuran flagrancia."
  ),
  q(
    "sup1_11",
    M1,
    "La legítima defensa, según el Art. 10 N°4 del Código Penal, exige que:",
    ["La agresión sea ilegítima, haya necesidad racional del medio empleado y falta de provocación suficiente",
     "El guardia siempre pueda responder con igual o mayor fuerza",
     "No exista otra alternativa que huir aunque sea posible dialogar",
     "La agresión haya sido consumada antes de reaccionar"],
    "La agresión sea ilegítima, haya necesidad racional del medio empleado y falta de provocación suficiente",
    "La legítima defensa requiere agresión ilegítima actual o inminente, necesidad racional del medio empleado para impedirla o repelerla y falta de provocación suficiente por parte de quien se defiende. No autoriza represalias desproporcionadas, ni reacciones después de consumada la agresión, ni exige huir cuando la defensa es razonable."
  ),
  q(
    "sup1_12",
    M1,
    "Respecto de la persona detenida, el guardia tiene prohibido:",
    ["Entregarla de inmediato a Carabineros", "Comunicar el hecho a la jefatura",
     "Maltratarla física o sicológicamente o someterla a apremios ilegítimos",
     "Resguardar que no se fugue"],
    "Maltratarla física o sicológicamente o someterla a apremios ilegítimos",
    "El Art. 150 del Código Penal sanciona los apremios ilegítimos: está prohibido maltratar física o sicológicamente a detenidos o aplicarles castigos no autorizados. Entregar a Carabineros, comunicar a la jefatura y custodiar al detenido son conductas correctas y obligatorias del procedimiento."
  ),
  q(
    "sup1_13",
    M1,
    "Según la Ley N° 19.628, el tratamiento de datos personales exige:",
    ["Usarlos libremente por ser trabajador de seguridad",
     "El consentimiento del titular y respetar la finalidad para la que fueron recabados",
     "Compartirlos con cualquiera que los solicite", "Conservarlos sin límite de tiempo"],
    "El consentimiento del titular y respetar la finalidad para la que fueron recabados",
    "La Ley 19.628 protege los datos personales: solo pueden tratarse con el consentimiento del titular (salvo casos legales) y solo para la finalidad informada. Su uso libre, su difusión a terceros o su conservación indefinida vulneran la norma y exponen a responsabilidad al guardia y a la empresa."
  ),
  q(
    "sup1_14",
    M1,
    "El uso de la fuerza por parte del guardia debe regirse por el principio de:",
    ["Máxima fuerza disponible", "Proporcionalidad y gradualidad",
     "Fuerza preventiva ante cualquier sospecha", "Fuerza solo por orden de la jefatura"],
    "Proporcionalidad y gradualidad",
    "El uso de la fuerza es excepcional y debe ser proporcional a la amenaza y gradual: primero disuasión y comunicación, luego control físico mínimo, y solo en último caso técnicas de defensa. Usar máxima fuerza, actuar preventivamente o esperar una orden de la jefatura contradicen la normativa de derechos humanos y el reglamento."
  ),
  q(
    "sup1_15",
    M1,
    "Ante el uso de la fuerza en una intervención, el guardia debe:",
    ["Ocultar lo sucedido", "Registrar y dar cuenta del hecho a su jefatura y autoridades competentes",
     "Borrarlo del registro de novedades", "Decidir solo qué informar"],
    "Registrar y dar cuenta del hecho a su jefatura y autoridades competentes",
    "Todo uso de la fuerza debe quedar registrado y comunicado: se informa a la jefatura, se anota en el libro de novedades y se da cuenta a Carabineros si corresponde. Ocultar, borrar o filtrar la información compromete al guardia y a la empresa y dificulta la verificación de la legalidad de la actuación."
  ),
  q(
    "sup1_16",
    M1,
    "La Ley N° 16.744 establece un seguro obligatorio contra:",
    ["El desempleo", "Accidentes del trabajo y enfermedades profesionales",
     "Los daños a terceros", "La responsabilidad civil del empleador"],
    "Accidentes del trabajo y enfermedades profesionales",
    "La Ley 16.744 crea el Seguro Social contra Riesgos de Accidentes del Trabajo y Enfermedades Profesionales, que también cubre los accidentes del trayecto. No es un seguro de desempleo, ni de daños a terceros ni de responsabilidad civil."
  ),
  q(
    "sup1_17",
    M1,
    "El financiamiento del seguro de la Ley 16.744 corresponde:",
    ["Al trabajador, con descuento mensual de su sueldo",
     "Al empleador, mediante cotizaciones que no pueden descontarse al trabajador",
     "Al Estado exclusivamente", "A una cotización voluntaria del trabajador"],
    "Al empleador, mediante cotizaciones que no pueden descontarse al trabajador",
    "El seguro de la Ley 16.744 se financia con cotizaciones del empleador, que tiene prohibido descontarlas del sueldo del trabajador. El Estado no lo financia directamente y la cotización no es voluntaria."
  ),
  q(
    "sup1_18",
    M1,
    "Un accidente del trayecto es aquel que ocurre:",
    ["Solo dentro de la empresa",
     "En el trayecto directo entre la habitación y el lugar de trabajo (y viceversa)",
     "Durante las vacaciones del trabajador", "En cualquier traslado del trabajador"],
    "En el trayecto directo entre la habitación y el lugar de trabajo (y viceversa)",
    "El accidente del trayecto es el ocurrido en el recorrido directo entre la habitación y el lugar de trabajo, y viceversa, y está cubierto por la Ley 16.744. No cubre cualquier traslado ni los ocurridos en vacaciones o fuera de la relación trabajo-trayecto."
  ),
  q(
    "sup1_19",
    M1,
    "Los beneficios que otorga la Ley 16.744 se clasifican en:",
    ["Solo prestaciones económicas", "Prestaciones preventivas, médicas y económicas",
     "Solo atención de urgencia", "Créditos y subsidios de vivienda"],
    "Prestaciones preventivas, médicas y económicas",
    "El seguro de la Ley 16.744 es integral: otorga prestaciones preventivas (evitar accidentes y enfermedades), médicas (atención, medicamentos, rehabilitación) y económicas (subsidios, indemnizaciones y pensiones). No se limita a un tipo de prestación."
  ),
  q(
    "sup1_20",
    M1,
    "El D.S. 594 regula:",
    ["El transporte de valores", "Las condiciones sanitarias y ambientales básicas en los lugares de trabajo",
     "Las normas de tránsito", "El uso de armas de fuego"],
    "Las condiciones sanitarias y ambientales básicas en los lugares de trabajo",
    "El D.S. 594 del MINSAL establece las condiciones sanitarias y ambientales básicas de los lugares de trabajo: temperatura, ventilación, iluminación, agua potable, servicios higiénicos, etc. No regula el transporte de valores, el tránsito ni las armas de fuego."
  ),
  q(
    "sup1_21",
    M1,
    "Según el D.S. 594, ante temperaturas extremas en el puesto de trabajo, el empleador debe:",
    ["Nada, es responsabilidad del guardia", "Adoptar medidas de protección para los trabajadores",
     "Solo informar al sindicato", "Suspender el contrato"],
    "Adoptar medidas de protección para los trabajadores",
    "El D.S. 594 obliga al empleador a controlar las condiciones térmicas y adoptar medidas de protección frente a temperaturas extremas (calor o frío) para evitar daños a la salud de los trabajadores. Desentenderse, solo informar o suspender el contrato no cumplen la norma."
  ),
  q(
    "sup1_22",
    M1,
    "El empleador debe garantizar en los lugares de trabajo, según el D.S. 594:",
    ["Agua potable y servicios higiénicos adecuados",
     "Que cada trabajador lleve su propia agua", "Solo bebidas azucaradas en máquinas expendedoras",
     "Que los servicios se compartan con el público general"],
    "Agua potable y servicios higiénicos adecuados",
    "El D.S. 594 obliga a disponer de agua potable y servicios higiénicos adecuados para los trabajadores en los lugares de trabajo. Que el trabajador cargue su agua, que solo existan máquinas expendedoras o que los servicios se compartan con el público no cumplen la norma."
  ),
  q(
    "sup2_09",
    M2,
    "El primer paso del método básico de prevención de riesgos es:",
    ["Controlar el riesgo", "Identificar los peligros", "Capacitar al personal", "Sancionar los actos inseguros"],
    "Identificar los peligros",
    "El método de prevención parte por identificar los peligros (actos y condiciones subestándar), luego evaluar los riesgos, controlarlos, supervisar el cumplimiento y revisar el proceso. No se puede controlar, capacitar o sancionar lo que primero no se ha identificado en el puesto."
  ),
  q(
    "sup2_10",
    M2,
    "La jerarquía de controles de riesgo establece que la medida más efectiva es:",
    ["El uso de elementos de protección personal", "Eliminar el peligro",
     "Los controles administrativos", "La señalización del área"],
    "Eliminar el peligro",
    "La jerarquía de controles prioriza la eliminación del peligro (la medida más efectiva), seguida de sustitución, controles de ingeniería, controles administrativos y, como última barrera, los EPP. El EPP protege pero no elimina el riesgo; la señalización solo advierte."
  ),
  q(
    "sup2_11",
    M2,
    "En la matriz de riesgo, la magnitud del riesgo se determina combinando:",
    ["Probabilidad y consecuencia", "Edad y experiencia del trabajador",
     "Costo y tamaño de la empresa", "Turno y horario de trabajo"],
    "Probabilidad y consecuencia",
    "La matriz de riesgo combina la probabilidad de ocurrencia con la severidad/consecuencia del daño para priorizar los riesgos. La edad, el costo empresarial o el turno no definen la magnitud del riesgo en la matriz."
  ),
  q(
    "sup2_12",
    M2,
    "Un acto subestándar es:",
    ["Una falla del equipo de protección", "Una conducta incorrecta de la persona en la ejecución de su tarea",
     "Una condición física peligrosa del lugar", "Un defecto de diseño del edificio"],
    "Una conducta incorrecta de la persona en la ejecución de su tarea",
    "El acto subestándar (o acto inseguro) es la conducta incorrecta de la persona que se aparta del desempeño correcto de la tarea. La falla del equipo, la condición física peligrosa y el defecto de diseño son condiciones subestándar, es decir, condiciones del entorno, no actos."
  ),
  q(
    "sup2_13",
    M2,
    "Ante un incendio, la técnica de uso del extintor se resume en el método PASO, que significa:",
    ["Prevenir, Avisar, Salir, Observar", "Presionar, Apuntar a la base, Sostener, Oprimir (barrer)",
     "Pasar, Avisar, Salir, Orar", "Parar, Acercar, Sofocar, Organizar"],
    "Presionar, Apuntar a la base, Sostener, Oprimir (barrer)",
    "El método PASO para usar un extintor es: Presionar la palanca, Apuntar a la base del fuego, Sostener el extintor (o manguera) y Oprimir/realizar el barrido. Las otras combinaciones no corresponden a la técnica estándar de combate del fuego con extintor."
  ),
  q(
    "sup2_14",
    M2,
    "Las clases de fuego se clasifican según el material combustible. Un fuego de origen eléctrico corresponde a la clase:",
    ["Clase A", "Clase C", "Clase B", "Clase D"],
    "Clase C",
    "Los fuegos se clasifican en A (sólidos comunes como madera y papel), B (líquidos inflamables), C (gases y equipos eléctricos energizados) y D (metales combustibles). Un incendio eléctrico es clase C y exige extintores compatibles (polvo químico seco o CO2), nunca agua."
  ),

  // ══════════════════════════════════════════════
  // MÓDULO 2 — Prevención de Riesgos y Control de Emergencias (2.1–2.2)
  // ══════════════════════════════════════════════
  q(
    "sup2_01",
    M2,
    "En la identificación de riesgos del puesto, el guardia debe observar principalmente:",
    ["Solo las cámaras de vigilancia", "Actos y condiciones subestándar en su área de trabajo",
     "El clima y el estado del tiempo", "Los horarios de sus compañeros"],
    "Actos y condiciones subestándar en su área de trabajo",
    "La identificación de riesgos del puesto consiste en detectar actos subestándar (conductas incorrectas) y condiciones subestándar (instalaciones, equipos o ambiente fuera de norma). Las cámaras, el clima o los horarios no son el foco de la identificación de peligros de la prevención."
  ),
  q(
    "sup2_02",
    M2,
    "Una vez identificado un peligro en el puesto, el supervisor debe:",
    ["Esperar a que ocurra un accidente para actuar", "Evaluar el riesgo y aplicar medidas de control",
     "Ocultarlo para no alarmar al personal", "Dejarlo anotado sin seguimiento"],
    "Evaluar el riesgo y aplicar medidas de control",
    "La prevención continúa evaluando el riesgo (probabilidad y consecuencia) y aplicando medidas de control en orden jerárquico. Esperar el accidente, ocultar el peligro o dejar la novedad sin seguimiento son omisiones que agravan la exposición de las personas."
  ),
  q(
    "sup2_03",
    M2,
    "El objetivo principal de un plan de emergencia es:",
    ["Proteger la vida e integridad de las personas y reducir daños",
     "Cumplir un trámite administrativo", "Determinar responsabilidades después del accidente",
     "Reemplazar el trabajo de Bomberos"],
    "Proteger la vida e integridad de las personas y reducir daños",
    "El plan de emergencia organiza la respuesta (roles, vías de evacuación, puntos de encuentro, coordinación con organismos de socorro) con el objetivo de proteger la vida e integridad de las personas y minimizar daños. No es un trámite, no busca culpables y no reemplaza a los cuerpos de emergencia."
  ),
  q(
    "sup2_04",
    M2,
    "Ante la activación de una alarma de incendio, la primera acción del guardia debe ser:",
    ["Salir corriendo del recinto", "Verificar la zona y dar aviso siguiendo el plan de emergencia",
     "Esperar a que suene dos veces", "Apagar todas las alarmas para evitar pánico"],
    "Verificar la zona y dar aviso siguiendo el plan de emergencia",
    "El protocolo inicial ante una alarma es verificar la zona afectada, dar aviso según el plan de emergencia (Carabineros, Bomberos, jefatura) y coordinar la evacuación. Salir corriendo, esperar o silenciar las alarmas abandonan el control de la emergencia y ponen en riesgo a las personas."
  ),
  q(
    "sup2_05",
    M2,
    "Las brigadas de emergencia se organizan para:",
    ["Cumplir funciones policiales", "Apoyar la evacuación, primeros auxilios y combate inicial de incendios",
     "Reemplazar a los organismos de socorro", "Solo asistir a reuniones"],
    "Apoyar la evacuación, primeros auxilios y combate inicial de incendios",
    "Las brigadas están capacitadas para coordinar la evacuación, prestar primeros auxilios básicos y combatir incendios incipientes con extintores, mientras llegan los organismos de socorro. No ejercen funciones policiales ni reemplazan a Bomberos o Carabineros."
  ),
  q(
    "sup2_06",
    M2,
    "Al evacuar un recinto ante una emergencia, el personal debe:",
    ["Usar los ascensores", "Dirigirse a la zona de seguridad por las vías de evacuación señalizadas",
     "Llevar pertenencias personales", "Regresar por objetos olvidados"],
    "Dirigirse a la zona de seguridad por las vías de evacuación señalizadas",
    "La evacuación se realiza por las vías de evacuación señalizadas hacia la zona de seguridad o punto de encuentro, sin correr ni usar ascensores (pueden quedar sin energía o atrapados). Volver por pertenencias o ascensores expone innecesariamente a las personas."
  ),
  q(
    "sup2_07",
    M2,
    "El supervisor debe asegurarse de que todo el personal bajo su cargo:",
    ["Conozca el plan de emergencia y su rol en él",
     "Sepa dónde están las cámaras", "Tenga acceso a las redes sociales del recinto",
     "Pueda decidir por sí mismo qué normas cumplir"],
    "Conozca el plan de emergencia y su rol en él",
    "La supervisión en prevención implica que cada guardia conozca el plan de emergencia, las vías de evacuación y su rol específico (evacuador, primeros auxilios, comunicación). Las cámaras, las redes sociales o la decisión individual de normas no reemplazan la preparación para emergencias."
  ),
  q(
    "sup2_08",
    M2,
    "El control de incendios con extintor solo debe intentarse cuando:",
    ["El fuego es incipiente y hay vía de escape segura",
     "El fuego abarca todo el recinto", "No hay nadie más que pueda hacerlo",
     "La jefatura lo ordena por teléfono"],
    "El fuego es incipiente y hay vía de escape segura",
    "Se combate un fuego con extintor solo si es incipiente (tamaño pequeño) y existe una vía de escape segura disponible; si el fuego crece, se abandona y se evacúa. Intentar apagar un incendio grande, sin salida o por presión de una jefatura pone en peligro la vida del guardia."
  ),

  // ══════════════════════════════════════════════
  // MÓDULO 3 — Procedimientos de Gestión de Seguridad (3.1–3.2)
  // ══════════════════════════════════════════════
  q(
    "sup3_01",
    M3,
    "La directiva de funcionamiento es:",
    ["Un documento que norma la operación de seguridad de un puesto específico, aprobado por la autoridad",
     "Un contrato de trabajo", "Un manual de marca de extintores", "Una carta de recomendación"],
    "Un documento que norma la operación de seguridad de un puesto específico, aprobado por la autoridad",
    "La directiva de funcionamiento regula cómo se presta el servicio de seguridad en un puesto (funciones, procedimientos, dotación) y requiere aprobación de la autoridad (Prefectura OS-10). No es un contrato, un manual técnico ni una recomendación."
  ),
  q(
    "sup3_02",
    M3,
    "La autoridad fiscalizadora de la seguridad privada es:",
    ["El Ministerio de Educación", "La Prefectura de Carabineros OS-10 de Seguridad Privada",
     "La Superintendencia de Electricidad", "El Servicio Nacional de Aduanas"],
    "La Prefectura de Carabineros OS-10 de Seguridad Privada",
    "La fiscalización de la seguridad privada corresponde a la Prefectura de Carabineros de Chile a través de sus departamentos OS-10 de Seguridad Privada, que además aprueban directivas, estudios de seguridad y acreditan al personal. Los otros organismos no tienen esa competencia."
  ),
  q(
    "sup3_03",
    M3,
    "Un estudio de seguridad de una instalación tiene por objeto:",
    ["Identificar riesgos, vulnerabilidades y medidas de protección del recinto",
     "Determinar el sueldo del personal", "Promocionar la empresa", "Calcular el aforo de un estadio"],
    "Identificar riesgos, vulnerabilidades y medidas de protección del recinto",
    "El estudio de seguridad analiza la instalación para identificar riesgos y vulnerabilidades y proponer medidas de protección (controles de acceso, rondas, tecnologías). No define remuneraciones, no promociona servicios y el aforo de un evento es materia del plan de eventos masivos."
  ),
  q(
    "sup3_04",
    M3,
    "La pauta de puesto o instructivo operativo describe:",
    ["Las funciones, procedimientos y responsabilidades del guardia en ese puesto",
     "El reglamento interno de la empresa", "Las normas de tránsito", "El currículum del personal"],
    "Las funciones, procedimientos y responsabilidades del guardia en ese puesto",
    "La pauta de puesto detalla qué debe hacer el guardia en cada situación del puesto: rondas, control de accesos, registro de visitas, respuesta a alarmas y responsabilidades. No es el reglamento interno, normas de tránsito ni un currículum."
  ),
  q(
    "sup3_05",
    M3,
    "Cualquier cambio relevante en el servicio de seguridad de un puesto (dotación, funciones o tecnología) debe:",
    ["Comunicarse informalmente a los guardias", "Reflejarse en la directiva de funcionamiento y contar con la aprobación correspondiente",
     "Aplicarse de inmediato sin registro", "Decidirse solo por el guardia de turno"],
    "Reflejarse en la directiva de funcionamiento y contar con la aprobación correspondiente",
    "Los cambios que afectan la operación de seguridad (dotación, funciones, tecnología) deben actualizar la directiva de funcionamiento y someterse a la aprobación de la autoridad. Comunicarlos informalmente o aplicarlos sin registro vulnera la normativa y deja al servicio sin respaldo legal."
  ),
  q(
    "sup3_06",
    M3,
    "La relación del supervisor con la Prefectura OS-10 en la práctica implica:",
    ["Coordinar la fiscalización y dar cuenta de las novedades que exige la autoridad",
     "Evitar todo contacto con Carabineros", "Pagar permisos de funcionamiento",
     "Reemplazar las funciones del OS-10"],
    "Coordinar la fiscalización y dar cuenta de las novedades que exige la autoridad",
    "El supervisor mantiene relación formal con la OS-10: facilita la fiscalización, responde requerimientos y da cuenta de novedades (hechos delictuales, uso de fuerza, cambios de servicio). Evitar el contacto, pagar permisos o reemplazar sus funciones contradicen el marco regulatorio."
  ),
  q(
    "sup3_07",
    M3,
    "Al elaborar la pauta de puesto, el supervisor debe asegurarse de que:",
    ["Sea clara, específica y conocida por el guardia del puesto",
     "Contenga datos personales de los clientes", "Sea igual para todos los puestos",
     "Solo la conozca la jefatura"],
    "Sea clara, específica y conocida por el guardia del puesto",
    "La pauta de puesto debe ser clara y específica para ese puesto y conocida por el guardia que lo cubre, de modo que sepa exactamente qué hacer. Debe ajustarse a cada puesto, no contener datos personales de clientes y estar disponible para el personal operativo."
  ),
  q(
    "sup3_08",
    M3,
    "Una de las funciones permanentes del supervisor es:",
    ["Supervisar en terreno el cumplimiento de los procedimientos del puesto",
     "Redactar los contratos de la empresa", "Elegir a las autoridades fiscalizadoras",
     "Realizar solo labores administrativas de oficina"],
    "Supervisar en terreno el cumplimiento de los procedimientos del puesto",
    "El supervisor verifica en terreno que los guardias cumplan los procedimientos, usen correctamente los registros y mantengan los estándares de servicio. No redacta contratos, no elige autoridades y su rol combina terreno y gestión, no solo oficina."
  ),

  // ══════════════════════════════════════════════
  // MÓDULO 4 — Liderazgo y Resolución de Conflictos (4.1–4.2)
  // ══════════════════════════════════════════════
  q(
    "sup4_01",
    M4,
    "El supervisor de seguridad actúa principalmente como:",
    ["Nexo entre la jefatura de seguridad y el personal operativo",
     "Autoridad policial", "Reemplazo del gerente general", "Encargado de la contabilidad"],
    "Nexo entre la jefatura de seguridad y el personal operativo",
    "El supervisor es el nexo directo entre la jefatura y los guardias en terreno: transmite instrucciones, controla su cumplimiento y reporta novedades. No ejerce autoridad policial, no reemplaza a la gerencia ni asume funciones administrativas ajenas al servicio."
  ),
  q(
    "sup4_02",
    M4,
    "Una delegación efectiva de tareas implica:",
    ["Entregar la tarea con instrucciones claras, autoridad y seguimiento",
     "Entregar la tarea sin explicación alguna", "Hacerlo todo el jefe personalmente",
     "Delegar solo tareas de castigo"],
    "Entregar la tarea con instrucciones claras, autoridad y seguimiento",
    "Delegar bien exige definir la tarea, entregar instrucciones claras, otorgar la autoridad necesaria y hacer seguimiento del resultado. Delegar sin explicación, centralizar todo o delegar solo sanciones genera fallas, desmotivación y mal clima laboral."
  ),
  q(
    "sup4_03",
    M4,
    "Al corregir el desempeño de un guardia, el supervisor debe:",
    ["Hacerlo en privado, con hechos concretos y orientado a mejorar",
     "Hacerlo delante de los compañeros para que sirva de ejemplo",
     "Esperar la evaluación anual", "Dejarlo por escrito sin conversar"],
    "Hacerlo en privado, con hechos concretos y orientado a mejorar",
    "La corrección efectiva se hace en privado, se basa en hechos observables y se orienta a la mejora del desempeño. Corregir en público humilla y genera conflictos, postergar la corrección diluye el aprendizaje y comunicar solo por escrito pierde el diálogo necesario."
  ),
  q(
    "sup4_04",
    M4,
    "En la gestión de turnos, el supervisor debe velar porque:",
    ["El personal respete horarios, coberturas y registros de asistencia",
     "Los turnos se cambien sin aviso", "Un guardia cubra siempre dos puestos simultáneos",
     "Los descansos no existan en horas de mayor actividad"],
    "El personal respete horarios, coberturas y registros de asistencia",
    "La gestión de turnos asegura la continuidad del servicio: se controlan horarios, coberturas, suplencias y registros de asistencia. Cambiar turnos sin aviso, cubrir dos puestos a la vez o eliminar descansos degrada la seguridad y vulnera derechos laborales."
  ),
  q(
    "sup4_05",
    M4,
    "La Ley N° 21.643 (Ley Karin) regula principalmente:",
    ["El acoso laboral, el acoso sexual y la violencia en el trabajo",
     "El transporte de valores", "Las horas extraordinarias", "El uso de cámaras de seguridad"],
    "El acoso laboral, el acoso sexual y la violencia en el trabajo",
    "La Ley 21.643, conocida como Ley Karin, modifica el Código del Trabajo para prevenir, investigar y sancionar el acoso laboral, el acoso sexual y la violencia en el trabajo. No regula el transporte de valores, las horas extras ni las cámaras."
  ),
  q(
    "sup4_06",
    M4,
    "Según la Ley Karin, el empleador tiene la obligación de:",
    ["Adoptar medidas de prevención y un protocolo de investigación",
     "Solo responder cuando hay demanda judicial", "Mantener en reserva los casos para no investigarlos",
     "Delegar toda investigación a la policía"],
    "Adoptar medidas de prevención y un protocolo de investigación",
    "La Ley Karin impone al empleador el deber de prevención, adopción de medidas y un protocolo de investigación ante denuncias de acoso o violencia, con canales de denuncia seguros y confidenciales. No basta responder judicialmente, ocultar casos o derivar todo a la policía."
  ),
  q(
    "sup4_07",
    M4,
    "Los canales de denuncia de acoso contemplados por la Ley Karin incluyen:",
    ["La vía interna (protocolo de la empresa) y la vía externa (Inspección del Trabajo y tribunales)",
     "Solo una conversación con el supervisor", "Solo redes sociales", "Únicamente la denuncia a Carabineros"],
    "La vía interna (protocolo de la empresa) y la vía externa (Inspección del Trabajo y tribunales)",
    "La Ley Karin contempla la denuncia por la vía interna (protocolo de la empresa con reserva de identidad) y la vía externa ante la Inspección del Trabajo o los tribunales de justicia. Las conversaciones informales, redes sociales o solo Carabineros no son los canales formales de la norma."
  ),
  q(
    "sup4_08",
    M4,
    "Al mediar un conflicto entre personal en el puesto, el supervisor debe:",
    ["Escuchar a las partes por separado, mantener la neutralidad y buscar acuerdos",
     "Tomar partido por el de mayor antigüedad", "Ignorar el conflicto",
     "Resolverlo a la fuerza"],
    "Escuchar a las partes por separado, mantener la neutralidad y buscar acuerdos",
    "La mediación de conflictos parte por escuchar a cada parte, mantener la neutralidad, identificar el problema real y facilitar acuerdos. Tomar partido, ignorar el conflicto o resolverlo por la fuerza agravan la situación y deterioran el clima del equipo."
  ),

  // ══════════════════════════════════════════════
  // MÓDULO 5 — Sistemas de Alarma, Comunicación y Enlace (5.1–5.2)
  // ══════════════════════════════════════════════
  q(
    "sup5_01",
    M5,
    "Ante la activación de una alarma de intrusión, el protocolo correcto del guardia es:",
    ["Verificar la zona afectada por los medios disponibles y dar aviso según el plan",
     "Desactivar la alarma y continuar la ronda", "Ignorarla hasta que suene tres veces",
     "Llamar de inmediato al cliente sin verificar"],
    "Verificar la zona afectada por los medios disponibles y dar aviso según el plan",
    "La respuesta a una alarma exige verificar la zona (cámaras, rondín, sensores) para confirmar o descartar la intrusión y dar aviso según el plan de emergencia (Carabineros, jefatura, monitoreo). Desactivarla, ignorarla o llamar sin verificar degradan la respuesta de seguridad."
  ),
  q(
    "sup5_02",
    M5,
    "El mantenimiento preventivo de los sistemas de alarma tiene por objeto:",
    ["Garantizar la operación confiable del sistema y evitar fallas en los momentos críticos",
     "Aumentar el costo del servicio", "Reemplazar al personal de seguridad",
     "Solo cumplir trámites de garantía"],
    "Garantizar la operación confiable del sistema y evitar fallas en los momentos críticos",
    "El mantenimiento preventivo (pruebas periódicas, revisión de sensores, baterías y comunicaciones) asegura que el sistema funcione cuando se necesita. No busca aumentar costos, reemplazar al personal ni solo trámites de garantía."
  ),
  q(
    "sup5_03",
    M5,
    "Las grabaciones de las cámaras de vigilancia de una instalación deben:",
    ["Resguardarse de forma segura y utilizarse solo para la finalidad de seguridad, con acceso restringido",
     "Publicarse en redes sociales", "Entregarse a cualquier persona que las pida",
     "Borrase automáticamente al día siguiente"],
    "Resguardarse de forma segura y utilizarse solo para la finalidad de seguridad, con acceso restringido",
    "Las imágenes captadas son datos protegidos: se resguardan de forma segura, con acceso restringido al personal autorizado y se usan para la finalidad de seguridad (y se ponen a disposición de Carabineros/justicia cuando corresponde). Difundirlas, entregarlas libremente o borrarlas sin respaldo vulnera la Ley 19.628."
  ),
  q(
    "sup5_04",
    M5,
    "Al verificar un evento reportado por monitoreo, el guardia debe:",
    ["Registrar la verificación y el resultado en los canales establecidos",
     "Responder solo por teléfono", "Dejar constancia solo mental del hecho",
     "Esperar el turno siguiente para informar"],
    "Registrar la verificación y el resultado en los canales establecidos",
    "Toda verificación debe quedar registrada (hora, lugar, resultado, acciones adoptadas) en los canales formales (libro de novedades, central de monitoreo, jefatura). Responder solo por teléfono, dejar constancia mental o postergar el informe pierde trazabilidad y compromete el servicio."
  ),
  q(
    "sup5_05",
    M5,
    "La comunicación efectiva en el puesto de seguridad requiere que el mensaje sea:",
    ["Claro, completo y confirmado por el receptor",
     "Lo más largo y detallado posible", "Solo escrito", "Emitido una única vez sin confirmar"],
    "Claro, completo y confirmado por el receptor",
    "La comunicación efectiva es clara (sin ambigüedades), completa (con la información necesaria) y confirmada (el receptor repite o reconoce el mensaje). Mensajes extensos, solo escritos o sin confirmación generan errores en la transmisión de novedades críticas."
  ),
  q(
    "sup5_06",
    M5,
    "En el uso de la radio, un procedimiento correcto es:",
    ["Identificarse, transmitir mensajes breves y confirmar la recepción",
     "Transmitir sin identificarse", "Mantener la radio apagada durante el turno",
     "Ocupar el canal para conversaciones personales"],
    "Identificarse, transmitir mensajes breves y confirmar la recepción",
    "La radiofonía operativa exige identificarse (emisor y destinatario), transmitir mensajes breves y claros y confirmar la recepción para asegurar que la información llegó. No identificarse, apagar la radio o usar el canal para temas personales rompen el enlace de seguridad."
  ),
  q(
    "sup5_07",
    M5,
    "El libro de novedades debe registrar:",
    ["Los hechos relevantes del turno en forma cronológica y objetiva",
     "Solo los atrasos del personal", "Las opiniones personales del guardia",
     "Los datos personales de todos los visitantes sin necesidad"],
    "Los hechos relevantes del turno en forma cronológica y objetiva",
    "El libro de novedades consigna en orden cronológico los hechos relevantes del turno (incidentes, rondas, entregas de turno, visitas relevantes) de forma objetiva y verificable. No es para atrasos personales, opiniones subjetivas ni datos personales innecesarios (Ley 19.628)."
  ),
  q(
    "sup5_08",
    M5,
    "El enlace del supervisor con Carabineros ante un hecho delictual se materializa, entre otros, a través de:",
    ["El Plan Cuadrante y las unidades OS-10 de Seguridad Privada",
     "Contactos personales informales", "Redes sociales", "Una línea directa privada del municipio"],
    "El Plan Cuadrante y las unidades OS-10 de Seguridad Privada",
    "La coordinación formal con la policía se realiza a través del Plan Cuadrante de Carabineros y de las unidades OS-10 de Seguridad Privada, que fiscalizan el servicio y reciben las novedades relevantes. Los contactos informales, redes sociales o líneas municipales no son canales institucionales."
  ),

  // ══════════════════════════════════════════════
  // MÓDULO 6 — Eventos Masivos, Registros y Manejo de Incidentes (6.1–6.3)
  // ══════════════════════════════════════════════
  q(
    "sup6_01",
    M6,
    "Para la realización de un evento masivo, la organización debe contar con:",
    ["La autorización y el plan de seguridad aprobados por la autoridad competente (OS-10)",
     "Solo un permiso municipal de sonido", "La aprobación de la junta de vecinos",
     "Un seguro de accidentes del público"],
    "La autorización y el plan de seguridad aprobados por la autoridad competente (OS-10)",
    "Los eventos masivos exigen autorización previa y un plan de seguridad aprobado por la autoridad competente (Prefectura de Carabineros OS-10), conforme a la Ley 21.659 y el D.S. 208. El permiso de sonido, la junta de vecinos o un seguro no reemplazan esa autorización."
  ),
  q(
    "sup6_02",
    M6,
    "El aforo de un evento masivo debe:",
    ["Respetar estrictamente la capacidad autorizada del recinto",
     "Aumentarse si la gente llega", "Determinarse libremente por el organizador",
     "Ser el doble del autorizado para compensar costos"],
    "Respetar estrictamente la capacidad autorizada del recinto",
    "El aforo autorizado es un límite de seguridad establecido según la capacidad del recinto (vías de evacuación, zonas de seguridad). Superarlo pone en riesgo la integridad de los asistentes y constituye una infracción grave. El organizador no puede fijarlo ni ampliarlo a su arbitrio."
  ),
  q(
    "sup6_03",
    M6,
    "En un evento masivo, el plan de seguridad debe contemplar:",
    ["Control de accesos, roles del personal y procedimientos de evacuación",
     "Solo la venta de entradas", "La contratación de artistas", "El estacionamiento de los vehículos oficiales"],
    "Control de accesos, roles del personal y procedimientos de evacuación",
    "El plan de seguridad del evento define el control de accesos (registro, revisión), la dotación y roles del personal de seguridad y los procedimientos de evacuación y respuesta a emergencias. Las entradas, la cartelera o el estacionamiento no son contenidos del plan de seguridad."
  ),
  q(
    "sup6_04",
    M6,
    "Ante una emergencia durante un evento masivo, la prioridad es:",
    ["Evacuar ordenadamente a los asistentes protegiendo su integridad",
     "Proteger los equipos de sonido", "Cerrar las puertas para evitar fugas",
     "Esperar instrucciones sin actuar"],
    "Evacuar ordenadamente a los asistentes protegiendo su integridad",
    "La respuesta ante una emergencia en un evento prioriza la evacuación ordenada de las personas por las vías señalizadas hacia zonas seguras. Proteger equipos, bloquear salidas o esperar sin actuar ponen en peligro a los asistentes y contradicen el plan de emergencia."
  ),
  q(
    "sup6_05",
    M6,
    "El libro de novedades cumple la función de:",
    ["Registrar cronológicamente los hechos del servicio como respaldo oficial",
     "Anotar los chistes del turno", "Reemplazar los informes de ventas",
     "Guardar datos bancarios de los clientes"],
    "Registrar cronológicamente los hechos del servicio como respaldo oficial",
    "El libro de novedades es el registro oficial y cronológico de los hechos del servicio (incidentes, rondas, entregas de turno), que sirve de respaldo ante la jefatura, la empresa y la autoridad. No es un espacio para anécdotas, informes comerciales ni datos bancarios."
  ),
  q(
    "sup6_06",
    M6,
    "Ante un incidente, el informe (parte) debe contener:",
    ["Hechos objetivos, hora, lugar, personas involucradas, testigos y medidas adoptadas",
     "Solo la opinión del guardia", "El chisme del recinto", "Las calificaciones personales de los involucrados"],
    "Hechos objetivos, hora, lugar, personas involucradas, testigos y medidas adoptadas",
    "El parte o informe de incidente documenta los hechos de manera objetiva: fecha y hora, lugar, personas involucradas, testigos, descripción de lo ocurrido y medidas adoptadas. Las opiniones, chismes o calificaciones personales invalidan la utilidad del informe como respaldo."
  ),
  q(
    "sup6_07",
    M6,
    "Al registrar datos personales de personas en el control de accesos, se debe:",
    ["Usarlos solo para la finalidad de seguridad y resguardar su confidencialidad (Ley 19.628)",
     "Publicarlos en el diario mural", "Entregarlos a cualquier visitante que los pida",
     "Conservarlos para siempre sin control"],
    "Usarlos solo para la finalidad de seguridad y resguardar su confidencialidad (Ley 19.628)",
    "Los datos recabados en accesos y registros (nombre, RUT, motivo de visita) son personales: se utilizan solo para la finalidad de seguridad y deben resguardarse con acceso restringido. Difundirlos, entregarlos o conservarlos sin límite vulnera la Ley 19.628."
  ),
  q(
    "sup6_08",
    M6,
    "Para el resguardo de evidencia en el lugar de un incidente, el guardia debe:",
    ["Aislar el área y preservar el lugar hasta la llegada de la policía o la jefatura",
     "Recoger y trasladar los objetos para su análisis",
     "Limpiar el sector inmediatamente", "Dejar pasar a las personas al lugar"],
    "Aislar el área y preservar el lugar hasta la llegada de la policía o la jefatura",
    "La preservación de la escena consiste en aislar el área, impedir el acceso y no mover objetos hasta que llegue la autoridad competente. Recoger evidencia sin protocolo, limpiar el sector o permitir el ingreso de personas destruye la evidencia y compromete la investigación."
  ),
  q(
    "sup6_09",
    M6,
    "Ante un delito flagrante, la actuación del supervisor y su equipo debe ser:",
    ["Detener conforme al procedimiento y entregar de inmediato al autor a Carabineros",
     "Retener al autor hasta el día siguiente", "Juzgar el caso en el lugar",
     "Solo registrar el hecho sin actuar"],
    "Detener conforme al procedimiento y entregar de inmediato al autor a Carabineros",
    "En flagrancia se puede detener al autor (Art. 129 CPP), pero debe entregarse de inmediato a Carabineros, registrando el procedimiento. Retenerlo, juzgarlo en el lugar o no actuar constituyen abuso, omisión o usurpación de funciones."
  ),
  q(
    "sup6_10",
    M6,
    "Durante la contención de un incidente con uso de fuerza, el supervisor debe:",
    ["Controlar la proporcionalidad, resguardar la integridad y ordenar registrar la actuación",
     "Autorizar la fuerza máxima posible", "Alejarse del lugar",
     "Dejar que el personal decida libremente"],
    "Controlar la proporcionalidad, resguardar la integridad y ordenar registrar la actuación",
    "El supervisor dirige la contención velando por el uso proporcional de la fuerza, la protección de la integridad de las personas y el registro formal de la actuación (novedad e informe). Autorizar fuerza máxima, ausentarse o dejar a criterio individual vulnera la normativa."
  ),
  q(
    "sup6_11",
    M6,
    "Después de un incidente relevante en el turno, el supervisor debe:",
    ["Verificar la cobertura, contener al equipo y elaborar el informe de lo ocurrido",
     "Ocultar el hecho si no hubo heridos", "Borrarlo del libro de novedades",
     "Esperar que lo pregunten en la próxima fiscalización"],
    "Verificar la cobertura, contener al equipo y elaborar el informe de lo ocurrido",
    "El post-incidente implica asegurar la continuidad del servicio (cobertura), apoyar al personal involucrado (contención) y documentar los hechos en el informe y el libro de novedades. Ocultar, borrar o esperar a la fiscalización comprometen al servicio y al personal."
  ),
  q(
    "sup6_12",
    M6,
    "La coordinación del supervisor con la central de monitoreo y Carabineros ante un hecho en curso tiene por objeto:",
    ["Confirmar información y desplegar la respuesta más rápida y segura",
     "Esperar a que el hecho termine", "Evitar registrar la llamada",
     "Que solo el cliente decida la respuesta"],
    "Confirmar información y desplegar la respuesta más rápida y segura",
    "La coordinación en tiempo real (central de monitoreo, Carabineros, jefatura) permite confirmar la información, evitar duplicidad de avisos y activar la respuesta oportuna (verificación, evacuación, apoyo policial). Esperar, omitir registros o dejar la decisión solo al cliente retrasan la reacción."
  ),
];

/** Selecciona preguntas balanceadas entre módulos y baraja las opciones para el examen. */
export function getExamenFinalSupervisor(
  totalPreguntas = EXAMEN_FINAL_PREGUNTAS_SUPERVISOR
): ExamQuestion[] {
  return seleccionarBalanceadas(SUPERVISOR_QUESTION_BANK, totalPreguntas).map(barajarOpciones);
}

export function getPreguntasPorModulo(moduloIdx: number): ExamQuestion[] {
  const titulos = SUPERVISOR_QUESTION_BANK.map((p) => p.moduleTitle).filter(
    (t, i, arr) => arr.indexOf(t) === i
  );
  const titulo = titulos[moduloIdx];
  return titulo ? SUPERVISOR_QUESTION_BANK.filter((p) => p.moduleTitle === titulo) : [];
}

/** Convierte preguntas del banco Supervisor al formato del MiniQuiz (alternativas). */
export function getMiniQuizBancoSupervisor(moduloIdx: number): PreguntaAlternativa[] {
  return getPreguntasPorModulo(moduloIdx).map((p) => ({
    id: p.id,
    pregunta: p.question,
    opciones: p.options,
    respuestaCorrecta: p.correctAnswer,
    explicacion: p.explicacion,
  }));
}

export const MINIQUIZ_PREGUNTAS_SUPERVISOR = 5;
export const EXAMEN_FINAL_PREGUNTAS_SUPERVISOR = 60;
export const EXAMEN_FINAL_UMBRAL_SUPERVISOR = 80;