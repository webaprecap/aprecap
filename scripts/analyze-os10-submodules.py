import pypdf
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "D:/aprecap/content/wp-pdfs/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf"
reader = pypdf.PdfReader(pdf_path)

print(f"Total páginas MANUAL OS-10: {len(reader.pages)}")

# Print text of all pages with headings
for i, page in enumerate(reader.pages):
    txt = page.extract_text() or ""
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    
    # Print headings or prominent lines
    for line in lines:
        if re.search(r'(módulo|modulo|unidad|materia|capítulo|capitulo|primera|segunda|tercera|cuarta|quinta|sexta|séptima|octava|ley|decreto|aritmética|primeros auxilios|prevención|seguridad|psicoprevención|defensa|bastón|comunicación)', line, re.IGNORECASE):
            if len(line) < 120:
                print(f"Pág {i+1:02d}: {line}")
