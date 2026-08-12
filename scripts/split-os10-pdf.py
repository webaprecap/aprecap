import pypdf
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "D:/aprecap/content/wp-pdfs/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf"
reader = pypdf.PdfReader(pdf_path)

print(f"Total páginas del Manual OS-10: {len(reader.pages)}")

sections = []

for i, page in enumerate(reader.pages):
    txt = page.extract_text() or ""
    lines = [line.strip() for line in txt.split('\n') if line.strip()]
    for line in lines:
        if re.search(r'(UNIDAD TEMÁTICA|UNIDAD TEMATICA|MÓDULO|MODULO|MATERIA|PREVENCIÓN DE RIESGOS|CONTROL DE INCENDIOS|PRIMEROS AUXILIOS|DEFENSA PERSONAL|SISTEMAS DE COMUNICACIÓN|VALORES Y ÉTICA|SEGURIDAD FÍSICA)', line, re.IGNORECASE):
            if len(line) < 120:
                print(f"Pág {i+1:02d}: {line}")
                sections.append((i+1, line))
