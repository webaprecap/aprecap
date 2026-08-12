import pypdf
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_sup = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/3_Supervisor_de_Seguridad/Modulo_1_Manual_Formacion_Supervisor_Seguridad.pdf"

if os.path.exists(pdf_sup):
    reader = pypdf.PdfReader(pdf_sup)
    print(f"=== MANUAL SUPERVISOR (207 págs) ===")
    for i, page in enumerate(reader.pages):
        txt = page.extract_text() or ""
        lines = [l.strip() for l in txt.split('\n') if l.strip()]
        for line in lines:
            if re.search(r'(MÓDULO|MODULO|CAPÍTULO|CAPITULO|UNIDAD|LEGISLACIÓN|ADMINISTRACIÓN|PREVENCIÓN|PSICOLOGÍA|SEGURIDAD|LIDERAZGO)', line, re.IGNORECASE):
                if len(line) < 100 and ('MÓDULO' in line.upper() or 'MODULO' in line.upper() or 'CAPITULO' in line.upper() or 'CAPÍTULO' in line.upper() or 'UNIDAD' in line.upper()):
                    print(f"Pág {i+1:03d}: {line}")
