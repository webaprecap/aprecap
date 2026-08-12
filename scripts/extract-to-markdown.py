import os
import sys
import re
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

docs_dir = "D:/aprecap/docs/markdown_cursos"
os.makedirs(docs_dir, exist_ok=True)

def extract_pdf_text_clean(pdf_path):
    if not os.path.exists(pdf_path):
        return ""
    reader = pypdf.PdfReader(pdf_path)
    full_text = []
    for i, page in enumerate(reader.pages):
        txt = page.extract_text() or ""
        lines = [line.strip() for line in txt.split('\n') if line.strip()]
        page_clean = "\n".join(lines)
        full_text.append(f"<!-- PÁGINA {i+1} -->\n{page_clean}\n")
    return "\n\n".join(full_text)

# 1. CURSO GUARDIA OS-10
os10_dir = os.path.join(docs_dir, "1_Guardia_OS10")
os.makedirs(os10_dir, exist_ok=True)

os10_manual = "D:/aprecap/content/wp-pdfs/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf"
reader_os10 = pypdf.PdfReader(os10_manual)

os10_ranges = [
    {"num": 1, "name": "Modulo_1_Legislacion_de_Seguridad_Privada.md", "start": 1, "end": 20},
    {"num": 2, "name": "Modulo_2_Prevencion_de_Riesgos_y_Control_de_Incendios.md", "start": 21, "end": 30},
    {"num": 3, "name": "Modulo_3_Valores_Etica_y_Psicoprevencion.md", "start": 31, "end": 38},
    {"num": 4, "name": "Modulo_4_Tecnicas_de_Vigilancia_y_Pauta_de_Puesto.md", "start": 39, "end": 43},
    {"num": 5, "name": "Modulo_5_Seguridad_Fisica_de_Instalaciones_y_Accesos.md", "start": 44, "end": 58},
    {"num": 6, "name": "Modulo_6_Sistemas_de_Comunicacion_y_Enlace.md", "start": 59, "end": 68},
    {"num": 7, "name": "Modulo_7_Primeros_Auxilios.md", "start": 69, "end": 77},
    {"num": 8, "name": "Modulo_8_Defensa_Personal_y_Uso_del_Baston.md", "start": 78, "end": 80}
]

print("Generando archivos Markdown (.md) para OS-10...")
for item in os10_ranges:
    text_content = []
    text_content.append(f"# {item['name'].replace('.md', '').replace('_', ' ')}\n")
    for p in range(item['start'] - 1, item['end']):
        txt = reader_os10.pages[p].extract_text() or ""
        lines = [line.strip() for line in txt.split('\n') if line.strip()]
        text_content.append(f"## Página {p+1}\n")
        text_content.append("\n".join(lines))
        text_content.append("\n---\n")
    
    out_file = os.path.join(os10_dir, item['name'])
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n\n".join(text_content))
    print(f"  ✓ {item['name']} creado ({os.path.getsize(out_file)/1024:.1f} KB)")

# 2. CURSO OPERADOR CCTV Y ALARMAS
cctv_dir = os.path.join(docs_dir, "2_Operador_CCTV_y_Alarmas")
os.makedirs(cctv_dir, exist_ok=True)
cctv_manual = "D:/aprecap/content/wp-pdfs/CIRCUITOS-CERRADOS-DE-TELEVISION-Y-ALARMAS.pdf"
reader_cctv = pypdf.PdfReader(cctv_manual)

cctv_ranges = [
    {"num": 1, "name": "Modulo_1_Fundamentos_Legales_CCTV_y_Alarmas.md", "start": 1, "end": 22},
    {"num": 2, "name": "Modulo_2_Sistemas_Electronicos_de_Seguridad_Privada.md", "start": 23, "end": 40},
    {"num": 3, "name": "Modulo_3_Televigilancia_y_Operacion_Centro_Control.md", "start": 41, "end": 67}
]

print("\nGenerando archivos Markdown (.md) para CCTV...")
for item in cctv_ranges:
    text_content = []
    text_content.append(f"# {item['name'].replace('.md', '').replace('_', ' ')}\n")
    for p in range(item['start'] - 1, item['end']):
        txt = reader_cctv.pages[p].extract_text() or ""
        lines = [line.strip() for line in txt.split('\n') if line.strip()]
        text_content.append(f"## Página {p+1}\n")
        text_content.append("\n".join(lines))
        text_content.append("\n---\n")
    
    out_file = os.path.join(cctv_dir, item['name'])
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n\n".join(text_content))
    print(f"  ✓ {item['name']} creado ({os.path.getsize(out_file)/1024:.1f} KB)")

# 3. CURSO SUPERVISOR DE SEGURIDAD
sup_dir = os.path.join(docs_dir, "3_Supervisor_de_Seguridad")
os.makedirs(sup_dir, exist_ok=True)
sup_manual = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/3_Supervisor_de_Seguridad/Manual_Completo_Supervisor_207_Paginas.pdf"
if not os.path.exists(sup_manual):
    sup_manual = "D:/aprecap/content/wp-pdfs/FORMACION-SUPERVISOR-DE-SEGURIDAD-PRIVADA.pdf"
reader_sup = pypdf.PdfReader(sup_manual)

sup_ranges = [
    {"num": 1, "name": "Modulo_1_Normativa_Laboral_y_Prevencion_de_Riesgos.md", "start": 1, "end": 64},
    {"num": 2, "name": "Modulo_2_Prevencion_de_Riesgos_y_Control_de_Emergencias.md", "start": 65, "end": 112},
    {"num": 3, "name": "Modulo_3_Procedimientos_de_Gestion_de_Seguridad.md", "start": 113, "end": 141},
    {"num": 4, "name": "Modulo_4_Liderazgo_y_Resolucion_de_Conflictos.md", "start": 142, "end": 159},
    {"num": 5, "name": "Modulo_5_Sistemas_de_Alarma_Comunicacion_y_Enlace.md", "start": 160, "end": 207}
]

print("\nGenerando archivos Markdown (.md) para Supervisor de Seguridad...")
for item in sup_ranges:
    text_content = []
    text_content.append(f"# {item['name'].replace('.md', '').replace('_', ' ')}\n")
    for p in range(item['start'] - 1, item['end']):
        txt = reader_sup.pages[p].extract_text() or ""
        lines = [line.strip() for line in txt.split('\n') if line.strip()]
        text_content.append(f"## Página {p+1}\n")
        text_content.append("\n".join(lines))
        text_content.append("\n---\n")
    
    out_file = os.path.join(sup_dir, item['name'])
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n\n".join(text_content))
    print(f"  ✓ {item['name']} creado ({os.path.getsize(out_file)/1024:.1f} KB)")

# 4. CURSO JEFE DE SEGURIDAD PRIVADA (Desde subcarpetas de Google Drive en Escritorio)
jefe_desktop = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/4_Jefe_de_Seguridad"
jefe_dir = os.path.join(docs_dir, "4_Jefe_de_Seguridad")
os.makedirs(jefe_dir, exist_ok=True)

print("\nGenerando archivos Markdown (.md) para Jefe de Seguridad desde carpetas por módulo...")
if os.path.exists(jefe_desktop):
    for sub in sorted(os.listdir(jefe_desktop)):
        sub_path = os.path.join(jefe_desktop, sub)
        if os.path.isdir(sub_path):
            text_content = []
            text_content.append(f"# {sub.replace('_', ' ')}\n")
            for fname in sorted(os.listdir(sub_path)):
                if fname.lower().endswith('.pdf'):
                    fpath = os.path.join(sub_path, fname)
                    text_content.append(f"## Archivo: {fname}\n")
                    try:
                        r = pypdf.PdfReader(fpath)
                        for page_i, page in enumerate(r.pages):
                            txt = page.extract_text() or ""
                            lines = [l.strip() for l in txt.split('\n') if l.strip()]
                            text_content.append(f"### Página {page_i+1}\n" + "\n".join(lines) + "\n")
                    except Exception as e:
                        text_content.append(f"Error procesando {fname}: {e}\n")
                    text_content.append("\n---\n")
            out_file = os.path.join(jefe_dir, f"{sub}.md")
            with open(out_file, "w", encoding="utf-8") as f:
                f.write("\n\n".join(text_content))
            print(f"  ✓ {sub}.md creado ({os.path.getsize(out_file)/1024:.1f} KB)")

print("\n¡Extracción a Markdown (.md) completada exitosamente!")
