import os
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        # Header line (pages > 1)
        if self._pageNumber > 1:
            self.saveState()
            self.setFillColor(colors.HexColor("#0e2a47"))
            self.rect(40, 805, 515, 3, fill=1, stroke=0)
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#0e2a47"))
            self.drawString(40, 815, "OTEC APRECAP — CAPACITACIÓN Y ASESORÍAS")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#666666"))
            self.drawRightString(555, 815, "Manual Técnico de Capacitación Laboral")
            self.restoreState()

        # Footer (all pages)
        self.saveState()
        self.setFillColor(colors.HexColor("#e63946"))
        self.rect(40, 45, 515, 1.5, fill=1, stroke=0)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#777777"))
        self.drawString(40, 32, "OTEC APRECAP · Norma Chilena NCh-2728 · contacto@aprecap.cl")
        page_text = f"Página {self._pageNumber} de {page_count}"
        self.drawRightString(555, 32, page_text)
        self.restoreState()

def build_pdf(filepath, title_doc, course_name, subtitle, sections):
    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=60
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#0e2a47"),
        spaceAfter=8
    )
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#e63946"),
        spaceAfter=15
    )
    course_badge = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#004b99"),
        spaceAfter=10
    )
    h2_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor("#0e2a47"),
        spaceBefore=12,
        spaceAfter=6
    )
    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#222222"),
        spaceAfter=8
    )
    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#222222"),
        leftIndent=15,
        spaceAfter=4
    )
    box_title = ParagraphStyle(
        'BoxTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#004b99"),
        spaceAfter=4
    )
    box_body = ParagraphStyle(
        'BoxBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.5,
        textColor=colors.HexColor("#1a1a1a"),
    )

    story = []

    # Title & Badge
    story.append(Paragraph(f"CURSO: {course_name.upper()}", course_badge))
    story.append(Paragraph(title_doc, title_style))
    if subtitle:
        story.append(Paragraph(subtitle, subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0e2a47"), spaceAfter=15))

    for sec in sections:
        if sec.get("type") == "h2":
            story.append(Paragraph(sec["text"], h2_style))
        elif sec.get("type") == "p":
            story.append(Paragraph(sec["text"], body_style))
        elif sec.get("type") == "bullet":
            story.append(Paragraph(f"• <b>{sec['bold']}</b> {sec['text']}", bullet_style))
        elif sec.get("type") == "box":
            box_content = [
                [Paragraph(sec["title"], box_title)],
                [Paragraph(sec["text"], box_body)]
            ]
            t = Table(box_content, colWidths=[515])
            t.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0f5fa")),
                ('BOX', (0,0), (-1,-1), 1.2, colors.HexColor("#004b99")),
                ('PADDING', (0,0), (-1,-1), 8),
                ('TOPPADDING', (0,0), (-1,0), 6),
                ('BOTTOMPADDING', (0,1), (-1,1), 6),
            ]))
            story.append(Spacer(1, 4))
            story.append(t)
            story.append(Spacer(1, 8))
        elif sec.get("type") == "pagebreak":
            story.append(PageBreak())

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generado PDF: {filepath}")

print("=== GENERANDO MANUALES TÉCNICOS A4 ===")

# -------------------------------------------------------------
# 1. CURSO: GUARDIA, NOCHERO, RONDÍN Y PORTERO
# -------------------------------------------------------------
dir_nochero_web = 'd:/aprecap/web/public/documentos-otec/guardia-nochero-rondin-portero'
dir_nochero_moodle = 'd:/aprecap/content/moodle/files/guardia-nochero-rondin-portero'
os.makedirs(dir_nochero_web, exist_ok=True)
os.makedirs(dir_nochero_moodle, exist_ok=True)

# 1.0 Programa del Curso
p0_sections = [
    {"type": "h2", "text": "1. Identificación y Fundamentación del Programa"},
    {"type": "p", "text": "El presente curso capacita de forma integral a trabajadores que desempeñan labores de conserjería, portería, nochero y rondines en edificios residenciales, condominios, recintos industriales e instalaciones comerciales, alineado con las exigencias de la <b>Ley N° 21.659 de Seguridad Privada</b> y el <b>Decreto Supremo N° 209</b>."},
    {"type": "h2", "text": "2. Objetivos Generales de Aprendizaje"},
    {"type": "bullet", "bold": "Marco Normativo:", "text": "Diferenciar con claridad las facultades, deberes y prohibiciones del conserje, portero y rondín respecto a los guardias de seguridad acreditados."},
    {"type": "bullet", "bold": "Control de Accesos:", "text": "Gestionar eficientemente el ingreso y salida de residentes, visitas, proveedores, contratistas y vehículos mediante registros físicos y digitales."},
    {"type": "bullet", "bold": "Gestión de Novedades:", "text": "Redactar correctamente el Libro de Novedades, consignando incidentes, encomiendas y rondas con valor administrativo y probatorio."},
    {"type": "bullet", "bold": "Rondas Preventivas:", "text": "Ejecutar patrullajes perimetrales estratégicos e inspecciones de puntos críticos para disuadir delitos y detectar fallas técnicas."},
    {"type": "bullet", "bold": "Control de Emergencias:", "text": "Activar protocolos de enlace inmediato con Carabineros, Bomberos y SAMU, ejecutando planes de evacuación y primeros auxilios básicos."},
    {"type": "h2", "text": "3. Estructura Modular del Curso"},
    {"type": "bullet", "bold": "Módulo 1:", "text": "Marco Legal, Diferenciación de Roles y Normativa Ley N° 21.659 (Subsecretaría de Prevención del Delito)."},
    {"type": "bullet", "bold": "Módulo 2:", "text": "Control de Accesos, Registro de Visitas y Gestión del Libro de Novedades."},
    {"type": "bullet", "bold": "Módulo 3:", "text": "Técnicas de Rondas Perimetrales, Prevención de Riesgos y Actuación ante Emergencias."},
    {"type": "box", "title": "CERTIFICACIÓN OFICIAL OTEC APRECAP", "text": "Al completar el estudio de los manuales y aprobar las evaluaciones modulares con nota mínima de 80%, el participante recibe su Certificado Oficial de Capacitación emitido por OTEC APRECAP bajo norma NCh-2728."}
]

build_pdf(
    f"{dir_nochero_web}/PROGRAMA_CURSO.pdf",
    "Programa de Capacitación: Guardia, Nochero, Rondín y Portero",
    "Guardia, Nochero, Rondín y Portero",
    "Estructura Curricular, Competencias Laborales y Normativa Vigente",
    p0_sections
)

# 1.1 Módulo 1: Marco Legal
m1_nochero = [
    {"type": "h2", "text": "1. El Nuevo Marco Regulatorio de la Seguridad Privada (Ley N° 21.659)"},
    {"type": "p", "text": "En Chile, la seguridad privada se rige por la <b>Ley N° 21.659</b> y su reglamento (Decreto Supremo N° 209), bajo la fiscalización técnica y administrativa de la <b>Subsecretaría de Prevención del Delito (SPD)</b> y Carabineros de Chile (OS-10)."},
    {"type": "p", "text": "La normativa reconoce formalmente las funciones auxiliares de porteros, nocheros, rondines y conserjes, estableciendo requisitos claros de idoneidad cívica, capacitación obligatoria y estándares de desempeño."},
    {"type": "h2", "text": "2. Diferenciación de Roles: ¿Qué puede y qué no puede hacer un Nochero o Portero?"},
    {"type": "bullet", "bold": "Conserje / Mayordomo:", "text": "Encargado de la administración operativa del edificio o condominio, supervisión de personal de aseo, control de áreas comunes y nexo con el comité de administración."},
    {"type": "bullet", "bold": "Portero:", "text": "Puesto fijo en garita o recepción. Su función principal es el control de acceso de personas y vehículos, atención de citofonía y recepción de encomiendas."},
    {"type": "bullet", "bold": "Nochero / Rondín:", "text": "Personal destinado a la vigilancia nocturna y recorrido perimetral de las instalaciones para verificar puertas, portones, luminarias y detectar anomalías."},
    {"type": "bullet", "bold": "Guardia de Seguridad (Diferencia Clave):", "text": "El guardia cuenta con acreditación SPD específica para labores de protección activa y directiva de funcionamiento formal. El nochero y portero cumplen labores de control de acceso y alerta temprana."},
    {"type": "box", "title": "PROHIBICIÓN ABSOLUTA DE PORTE DE ARMAS", "text": "Bajo ninguna circunstancia los nocheros, porteros, rondines o guardias de seguridad privada pueden portar armas de fuego. La defensa personal y el control de la instalación se basan en la disuasión, el control de acceso, los sistemas de alarma y la comunicación inmediata con Carabineros de Chile (133 / Plan Cuadrante)."},
    {"type": "h2", "text": "3. Obligaciones Legales y Laborales del Trabajador"},
    {"type": "bullet", "bold": "Uso de Credencial:", "text": "Portar en lugar visible su identificación mientras se encuentre de servicio."},
    {"type": "bullet", "bold": "Permanencia en el Puesto:", "text": "No abandonar el recinto asignado sin previo relevo formal autorizado."},
    {"type": "bullet", "bold": "Ley Karin (Ley N° 21.643):", "text": "Mantener un trato respetuoso, libre de discriminación y violencia con residentes, visitas y compañeros de trabajo."},
    {"type": "bullet", "bold": "Ley 40 Horas (Ley N° 21.561):", "text": "Cumplimiento de la jornada laboral reglamentaria y descansos legales establecidos en su contrato de trabajo."}
]

build_pdf(
    f"{dir_nochero_web}/M1_Marco_Legal_y_Normativa_Ley_21659.pdf",
    "Módulo 1: Marco Legal, Diferenciación de Roles y Normativa Ley 21.659",
    "Guardia, Nochero, Rondín y Portero",
    "Reglamentación SPD, facultades, prohibiciones y derechos laborales",
    m1_nochero
)

# 1.2 Módulo 2: Control de Accesos y Libro de Novedades
m2_nochero = [
    {"type": "h2", "text": "1. El Control de Acceso como Primera Barrera de Protección"},
    {"type": "p", "text": "El control de acceso es el conjunto de procedimientos destinados a permitir, restringir o denegar el ingreso de personas, vehículos y bultos a un recinto privado. Un control de acceso riguroso previene intrusiones, robos y situaciones de riesgo."},
    {"type": "h2", "text": "2. Procedimiento Estándar para Ingreso de Visitas y Proveedores"},
    {"type": "bullet", "bold": "1. Saludo y Solicitud Amable:", "text": "Saludar cortésmente, solicitar la identificación oficial (Cédula de Identidad) y consultar a qué departamento o sección se dirige."},
    {"type": "bullet", "bold": "2. Verificación y Autorización:", "text": "Comunicarse vía citófono o teléfono interno con el residente o encargado para confirmar la autorización de ingreso. Si no hay respuesta, NO se autoriza el paso."},
    {"type": "bullet", "bold": "3. Registro Escrito o Digital:", "text": "Anotar nombre completo, RUT, fecha, hora de entrada, destino y patente si ingresa con vehículo."},
    {"type": "bullet", "bold": "4. Entrega de Pases / Tarjetas:", "text": "Entregar tarjeta de visita o activar torniquete/barrera solo una vez completado el registro."},
    {"type": "h2", "text": "3. Importancia y Redacción del Libro de Novedades"},
    {"type": "p", "text": "El <b>Libro de Novedades</b> es un documento formal y legal foliado donde se asientan todos los sucesos de cada turno. Sirve como prueba ante fiscalizaciones de Carabineros (OS-10), inspecciones laborales y peritajes judiciales."},
    {"type": "box", "title": "REGLAS DE ORO PARA ESCRIBIR EN EL LIBRO DE NOVEDADES", "text": "1. Escribir con tinta azul o negra indeleble, con letra clara y sin faltas de ortografía.<br/>2. Queda estrictamente prohibido usar corrector líquido (Liquid Paper), borrar o arrancar hojas.<br/>3. En caso de error, colocar la palabra 'DIGO' entre paréntesis y continuar con la corrección.<br/>4. Cada turno debe iniciarse con la recepción del puesto y cerrarse con la firma y RUT del trabajador saliente y entrante."}
]

build_pdf(
    f"{dir_nochero_web}/M2_Control_de_Accesos_y_Libro_de_Novedades.pdf",
    "Módulo 2: Control de Accesos, Registro de Visitas y Gestión del Libro de Novedades",
    "Guardia, Nochero, Rondín y Portero",
    "Técnicas de recepción, verificación de identidad y llenado formal de libros",
    m2_nochero
)

# 1.3 Módulo 3: Rondas y Emergencias
m3_nochero = [
    {"type": "h2", "text": "1. Planificación y Ejecución de Rondas Preventivas"},
    {"type": "p", "text": "La ronda perimetral es la inspección física y dinámica de las instalaciones para disuadir conductas ilícitas, verificar el estado de los accesos y detectar anomalías técnicas (fugas de agua, luces apagadas, tableros recalentados o puertas mal cerradas)."},
    {"type": "bullet", "bold": "Horarios y Rutas Variables:", "text": "Nunca realizar la ronda a la misma hora exacta ni siguiendo el mismo camino; la rutina hace predecible el servicio ante delincuentes."},
    {"type": "bullet", "bold": "Equipamiento Básico:", "text": "Linterna de alta potencia cargada, radio transmisor / teléfono de emergencia, llaves maestras y bastón de ronda si está asignado."},
    {"type": "bullet", "bold": "Puntos Críticos a Revisar:", "text": "Salidas de emergencia, subterráneos, bodegas, salas de bombas, casetas de calderas, portones perimetrales y cercos eléctricos."},
    {"type": "h2", "text": "2. Protocolos de Actuación ante Emergencias"},
    {"type": "bullet", "bold": "Intrusión o Delito Flagrante:", "text": "No exponer la integridad física intentando enfrentar a personas armadas. Resguardarse en zona segura, accionar botón de pánico y llamar de inmediato al 133 (Carabineros) o 134 (PDI) indicando dirección exacta y características de los sospechosos."},
    {"type": "bullet", "bold": "Conato de Incendio:", "text": "Dar la alarma general, llamar a Bomberos (132). Si el fuego es incipiente, utilizar el extintor adecuado (PQS o CO2) atacando la base de la llama a favor del viento."},
    {"type": "bullet", "bold": "Accidentes Médicos:", "text": "Llamar al SAMU (131), mantener la calma del afectado, no mover a personas con posibles fracturas y guiar a los paramédicos al lugar exacto."},
    {"type": "box", "title": "NÚMEROS DE EMERGENCIA OBLIGATORIOS EN CASETA", "text": "• Carabineros de Chile: <b>133</b> / Teléfono Plan Cuadrante local.<br/>• Cuerpo de Bomberos: <b>132</b>.<br/>• SAMU (Ambulancia): <b>131</b>.<br/>• PDI: <b>134</b>."}
]

build_pdf(
    f"{dir_nochero_web}/M3_Rondas_de_Vigilancia_y_Emergencias.pdf",
    "Módulo 3: Técnicas de Rondas, Prevención de Riesgos y Respuesta ante Emergencias",
    "Guardia, Nochero, Rondín y Portero",
    "Patrullajes preventivos, detección de vulnerabilidades y protocolos de auxilio",
    m3_nochero
)

# Copiar a Moodle
for f in os.listdir(dir_nochero_web):
    shutil.copyfile(os.path.join(dir_nochero_web, f), os.path.join(dir_nochero_moodle, f))


# -------------------------------------------------------------
# 2. CURSO: ELECTRICIDAD BÁSICA INDUSTRIAL / DOMICILIARIA
# -------------------------------------------------------------
dir_elec_web = 'd:/aprecap/web/public/documentos-otec/electricidad-basica-industrial'
dir_elec_moodle = 'd:/aprecap/content/moodle/files/electricidad-basica-industrial'
os.makedirs(dir_elec_web, exist_ok=True)
os.makedirs(dir_elec_moodle, exist_ok=True)

# 2.0 Programa de Electricidad
p0_elec = [
    {"type": "h2", "text": "1. Fundamentación y Campo Laboral"},
    {"type": "p", "text": "El curso de <b>Electricidad Básica Industrial y Domiciliaria</b> entrega las competencias técnicas y normativas indispensables para proyectar, ejecutar, mantener y reparar instalaciones eléctricas en baja tensión (BT), conforme a los <b>Pliegos Técnicos Normativos RIC</b> de la <b>Superintendencia de Electricidad y Combustibles (SEC)</b>."},
    {"type": "h2", "text": "2. Objetivos de Aprendizaje"},
    {"type": "bullet", "bold": "Fundamentos Físicos:", "text": "Dominar las magnitudes de voltaje (V), corriente (I), resistencia (R) y potencia (P) aplicando la Ley de Ohm y Ley de Watt."},
    {"type": "bullet", "bold": "Circuitos y Mediciones:", "text": "Calcular y medir parámetros eléctricos en circuitos serie, paralelo y mixto mediante multímetro digital y pinza amperométrica."},
    {"type": "bullet", "bold": "Conductores y Canalizaciones:", "text": "Dimensionar conductores según sección (mm² / AWG), capacidad de corriente y caída de tensión reglamentaria."},
    {"type": "bullet", "bold": "Tableros y Protecciones:", "text": "Diseñar y alambrar tableros generales y de distribución con disyuntores termomagnéticos y protectores diferenciales."},
    {"type": "bullet", "bold": "Seguridad y Puesta a Tierra:", "text": "Instalar sistemas de puesta a tierra de protección y servicio, aplicando las 5 Reglas de Oro de seguridad eléctrica."},
    {"type": "h2", "text": "3. Estructura Curricular"},
    {"type": "bullet", "bold": "Módulo 1:", "text": "Fundamentos de Electricidad, Magnitudes, Circuitos y Ley de Ohm."},
    {"type": "bullet", "bold": "Módulo 2:", "text": "Conductores Eléctricos, Canalizaciones y Armado de Tableros de Distribución."},
    {"type": "bullet", "bold": "Módulo 3:", "text": "Sistemas de Protección, Puesta a Tierra y Prevención de Riesgos Eléctricos (Norma SEC)."}
]

build_pdf(
    f"{dir_elec_web}/PROGRAMA_CURSO.pdf",
    "Programa de Capacitación: Electricidad Básica Industrial",
    "Electricidad Básica Industrial",
    "Fundamentos técnicos, diseño de circuitos y normativa SEC / Pliegos RIC",
    p0_elec
)

# 2.1 Módulo 1: Fundamentos
m1_elec = [
    {"type": "h2", "text": "1. Magnitudes Eléctricas Fundamentales"},
    {"type": "bullet", "bold": "Tensión o Voltaje (V):", "text": "Diferencia de potencial eléctrico entre dos puntos que impulsa a los electrones a circular. En Chile, el voltaje monofásico estándar residencial es de <b>220 V (50 Hz)</b> y el trifásico industrial es de <b>380 V</b>."},
    {"type": "bullet", "bold": "Intensidad de Corriente (I):", "text": "Flujo de carga eléctrica que atraviesa la sección de un conductor por unidad de tiempo. Se mide en <b>Amperes (A)</b>."},
    {"type": "bullet", "bold": "Resistencia Eléctrica (R):", "text": "Oposición que presenta un material al paso de la corriente eléctrica. Se mide en <b>Ohmios (Ω)</b>."},
    {"type": "bullet", "bold": "Potencia Eléctrica (P):", "text": "Rapidez con que se realiza un trabajo o se transforma energía eléctrica en calor, luz o movimiento. Se mide en <b>Watts (W)</b> o Kilowatts (kW)."},
    {"type": "h2", "text": "2. Las Leyes Fundamentales: Ohm y Watt"},
    {"type": "p", "text": "La <b>Ley de Ohm</b> establece la relación directa entre voltaje, corriente y resistencia: <b>V = I · R</b>. De ella se derivan las fórmulas: <b>I = V / R</b> y <b>R = V / I</b>."},
    {"type": "p", "text": "La <b>Ley de Watt</b> permite calcular la potencia consumida: <b>P = V · I</b>. En circuitos de corriente alterna resistivos, la corriente consumida por un artefacto se obtiene como <b>I = P / V</b>."},
    {"type": "box", "title": "EJEMPLO PRÁCTICO DE CÁLCULO", "text": "Un termo eléctrico consume una potencia de 2200 W conectado a la red de 220 V.<br/>• Corriente: I = 2200 W / 220 V = <b>10 Amperes (A)</b>.<br/>• Resistencia interna: R = 220 V / 10 A = <b>22 Ohmios (Ω)</b>."}
]

build_pdf(
    f"{dir_elec_web}/M1_Fundamentos_de_Electricidad_y_Circuitos.pdf",
    "Módulo 1: Fundamentos de Electricidad, Magnitudes y Ley de Ohm",
    "Electricidad Básica Industrial",
    "Conceptos de voltaje, corriente, resistencia, potencia y cálculo de circuitos",
    m1_elec
)

# 2.2 Módulo 2: Conductores y Tableros
m2_elec = [
    {"type": "h2", "text": "1. Conductores Eléctricos y Código de Colores Reglamentario (SEC)"},
    {"type": "p", "text": "Según el <b>Pliego Técnico Normativo RIC N° 04</b> de la SEC, los conductores eléctricos deben respetar estrictamente el siguiente código de colores en corriente alterna monofásica:"},
    {"type": "bullet", "bold": "Fase (Línea Activa):", "text": "Color <b>AZUL, NEGRO o ROJO</b>."},
    {"type": "bullet", "bold": "Neutro (Retorno):", "text": "Color <b>BLANCO</b> (o Celeste bajo norma internacional)."},
    {"type": "bullet", "bold": "Tierra de Protección (PE):", "text": "Color <b>VERDE</b> o <b>VERDE CON LÍNEA AMARILLA</b>."},
    {"type": "h2", "text": "2. Secciones Típicas de Conductores según Consumo"},
    {"type": "bullet", "bold": "1.5 mm² (Alumbrado):", "text": "Circuitos de iluminación domiciliaria hasta 10 Amperes."},
    {"type": "bullet", "bold": "2.5 mm² (Enchufes):", "text": "Circuitos de enchufes de uso general y fuerza hasta 16 Amperes."},
    {"type": "bullet", "bold": "4.0 mm² a 6.0 mm² (Alimentadores):", "text": "Empalmes principales, circuitos de termos eléctricos, hornos y cocinas vitrocerámicas."},
    {"type": "h2", "text": "3. Componentes de un Tablero General de Distribución (TGD)"},
    {"type": "p", "text": "Todo tablero debe contar con un <b>Disyuntor General</b> que corte la energía total, seguido de <b>Protectores Diferenciales</b> por cada grupo de circuitos y <b>Disyuntores Termomagnéticos individuales</b> por cada circuito de alumbrado o enchufes."},
    {"type": "box", "title": "REGLAMENTO DE CANALIZACIONES (RIC N° 04)", "text": "Los conductores no pueden superar el 40% de ocupación del área útil de la tubería (conduit PVC o metálico EMT). Queda estrictamente prohibido realizar uniones o empalmes de cables dentro de tuberías; toda derivación debe realizarse dentro de cajas de paso o cajas de derivación accesibles."}
]

build_pdf(
    f"{dir_elec_web}/M2_Conductores_Canalizaciones_y_Tableros.pdf",
    "Módulo 2: Conductores Eléctricos, Canalizaciones y Tableros de Distribución",
    "Electricidad Básica Industrial",
    "Pliegos técnicos RIC, código de colores, dimensionamiento y montaje seguro",
    m2_elec
)

# 2.3 Módulo 3: Protecciones y Seguridad
m3_elec = [
    {"type": "h2", "text": "1. Dispositivos de Protección Eléctrica"},
    {"type": "bullet", "bold": "Disyuntor Termomagnético:", "text": "Protege a los cables contra <b>Sobrecargas</b> (parte térmica por bimetal) y <b>Cortocircuitos</b> (parte magnética por bobina instantánea)."},
    {"type": "bullet", "bold": "Protector Diferencial (ID):", "text": "Protege la <b>vida humana contra electrocución</b> por contacto directo o indirecto. Detecta fugas de corriente a tierra superiores a <b>30 mA (miliamperes)</b> en un tiempo inferior a 0.03 segundos."},
    {"type": "bullet", "bold": "Sistema de Puesta a Tierra (Malla / Barra Cooperweld):", "text": "Desvía las corrientes de falla hacia la tierra física, evitando que las carcasas metálicas de electrodomésticos queden energizadas."},
    {"type": "h2", "text": "2. Las 5 Reglas de Oro de la Seguridad Eléctrica"},
    {"type": "bullet", "bold": "1. Corte visible:", "text": "Desconectar todas las fuentes de alimentación."},
    {"type": "bullet", "bold": "2. Enclavamiento y bloqueo (LOTO):", "text": "Bloquear los aparatos de corte e instalar candado con tarjeta de advertencia para evitar reconexiones accidentales."},
    {"type": "bullet", "bold": "3. Comprobación de ausencia de tensión:", "text": "Verificar con multímetro o detector inductivo que no existe voltaje en los conductores a intervenir."},
    {"type": "bullet", "bold": "4. Puesta a tierra y en cortocircuito:", "text": "Cortocircuitar fases a tierra en líneas industriales de media/alta tensión."},
    {"type": "bullet", "bold": "5. Señalización y delimitación de la zona de trabajo:", "text": "Instalar conos, cintas de peligro y vallas para resguardar el área."},
    {"type": "box", "title": "EQUIPO DE PROTECCIÓN PERSONAL (EPP)", "text": "Todo trabajo eléctrico exige: Zapatos dieléctricos sin puntera de acero, guantes aislantes clase 00 (hasta 500V) o clase 0 (hasta 1000V), lentes de policarbonato contra arco eléctrico y herramientas con aislamiento certificado a 1000V (Norma IEC 60900)."}
]

build_pdf(
    f"{dir_elec_web}/M3_Protecciones_Puesta_a_Tierra_y_Seguridad.pdf",
    "Módulo 3: Protecciones Eléctricas, Puesta a Tierra y Prevención de Riesgos",
    "Electricidad Básica Industrial",
    "Disyuntores, diferenciales, 5 Reglas de Oro y protocolos de seguridad SEC",
    m3_elec
)

# Copiar a Moodle
for f in os.listdir(dir_elec_web):
    shutil.copyfile(os.path.join(dir_elec_web, f), os.path.join(dir_elec_moodle, f))

print("=== TODOS LOS MANUALES GENERADOS CON ÉXITO ===")
