import os
import shutil
import pymupdf

def apply_box(doc, page_idx, rect, title, body_text):
    page = doc[page_idx]
    # Draw container box
    page.draw_rect(rect, color=(0.06, 0.29, 0.56), fill=(0.96, 0.98, 1.0), width=1.5)
    # Title
    title_rect = pymupdf.Rect(rect.x0 + 12, rect.y0 + 10, rect.x1 - 12, rect.y0 + 28)
    page.insert_textbox(title_rect, title, fontsize=10.5, fontname='helv', color=(0.06, 0.29, 0.56), align=0)
    # Body text
    body_rect = pymupdf.Rect(rect.x0 + 12, rect.y0 + 32, rect.x1 - 12, rect.y1 - 8)
    page.insert_textbox(body_rect, body_text, fontsize=9.0, fontname='helv', color=(0.15, 0.15, 0.15), align=3)

def update_pdf(source_rel_path, updates_fn):
    base_moodle = os.path.join('d:/aprecap/content/moodle/files', source_rel_path)
    base_web = os.path.join('d:/aprecap/web/public/documentos-otec', source_rel_path)
    
    if not os.path.exists(base_moodle):
        print(f"[WARN] No existe {base_moodle}")
        return

    doc = pymupdf.open(base_moodle)
    updates_fn(doc)
    
    temp_file = 'd:/aprecap/scripts/_temp_update.pdf'
    doc.save(temp_file)
    doc.close()
    
    shutil.copyfile(temp_file, base_moodle)
    os.makedirs(os.path.dirname(base_web), exist_ok=True)
    shutil.copyfile(temp_file, base_web)
    
    if os.path.exists(temp_file):
        os.remove(temp_file)
    print(f"[OK] Actualizado: {source_rel_path}")

print("--- APLICANDO ACTUALIZACIONES LEGALES EN MANUALES PDF ---")

# 1. LIDERAZGO M3 (Página 8)
def update_lid_m3(doc):
    rect = pymupdf.Rect(85, 600, 515, 745)
    title = "MARCO LEGAL VIGENTE: LEY KARIN (LEY N° 21.643)"
    text = (
        "La comunicación asertiva en las organizaciones es la principal herramienta para prevenir conductas "
        "de hostigamiento y maltrato. La Ley Karin (N° 21.643) prohíbe y sanciona toda manifestación de acoso "
        "laboral, sexual o violencia en el trabajo, exigiendo canales formales de diálogo y resolución respetuosa."
    )
    apply_box(doc, len(doc) - 1, rect, title, text)

update_pdf('tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas/M3.pdf', update_lid_m3)

# 2. LIDERAZGO M5 (Página 7)
def update_lid_m5(doc):
    rect = pymupdf.Rect(85, 605, 515, 750)
    title = "MARCO LEGAL VIGENTE: LEY KARIN (LEY N° 21.643)"
    text = (
        "En Chile, el liderazgo de equipos exige resguardar un ambiente laboral libre de violencia, "
        "hostigamiento y acoso laboral o sexual. Con la entrada en vigencia de la Ley Karin (N° 21.643), "
        "todo líder y jefatura tiene el deber legal de aplicar los protocolos internos de prevención, "
        "erradicar cualquier práctica de menoscabo y velar activamente por la dignidad de los colaboradores."
    )
    apply_box(doc, 6, rect, title, text)

update_pdf('tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas/M5.pdf', update_lid_m5)

# 3. LIDERAZGO M6 (Última Página)
def update_lid_m6(doc):
    rect = pymupdf.Rect(85, 610, 515, 755)
    title = "OBLIGACIÓN DE LAS JEFATURAS: PROTOCOLOS LEY KARIN"
    text = (
        "La dirección y gestión de personas obliga legalmente a los supervisores y directivos a tramitar de inmediato "
        "cualquier denuncia de acoso o violencia laboral ante el departamento de RRHH o la Dirección del Trabajo, "
        "adoptando medidas cautelares de protección para resguardar la salud e integridad de los involucrados."
    )
    apply_box(doc, len(doc) - 1, rect, title, text)

update_pdf('tecnicas-de-liderazgo-efectivo-para-el-trabajo-en-equipo-y-gestion-de-personas/M6.pdf', update_lid_m6)

# 4. SUSTANCIAS PELIGROSAS M1 (Página 8)
def update_sp_m1(doc):
    rect = pymupdf.Rect(85, 595, 515, 745)
    title = "ACTUALIZACIÓN NORMATIVA: NCh382:2021 Y SISTEMA SGA / GHS"
    text = (
        "En Chile rige la norma NCh382:2021 y el Decreto Supremo N° 57 (MINSAL/MMA), que incorporan el Sistema "
        "Globalmente Armonizado (SGA / GHS) para la clasificación de peligros, pictogramas de seguridad en rombo rojo "
        "y Hojas de Datos de Seguridad (HDS) de 16 secciones obligatorias para todo almacenamiento químico (D.S. 43)."
    )
    apply_box(doc, len(doc) - 1, rect, title, text)

update_pdf('manejo-de-sustancias-peligrosas/M1_4_.pdf', update_sp_m1)

# 5. SUSTANCIAS PELIGROSAS M4 (Página 6)
def update_sp_m4(doc):
    rect = pymupdf.Rect(85, 605, 515, 750)
    title = "ESTÁNDAR OFICIAL DE ETIQUETADO QUÍMICO SGA / GHS"
    text = (
        "Todo envase, estanque o embalaje de sustancias peligrosas debe contar obligatoriamente con etiquetas que "
        "incluyan: Identificación del producto, Palabra de Advertencia (PELIGRO / ATENCIÓN), Indicaciones de Peligro "
        "(Frases H), Consejos de Prudencia (Frases P) y los pictogramas de riesgo químico oficiales."
    )
    apply_box(doc, len(doc) - 1, rect, title, text)

update_pdf('manejo-de-sustancias-peligrosas/M4.pdf', update_sp_m4)

print("--- ACTUALIZACIONES LOCALES COMPLETADAS ---")
