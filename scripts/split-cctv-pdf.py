import pypdf
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

src_pdf = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/2_Operador_CCTV_y_Alarmas/Modulo_1_Manual_CCTV_y_Centrales_de_Alarma.pdf"
dest_dir = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/2_Operador_CCTV_y_Alarmas"

reader = pypdf.PdfReader(src_pdf)
print(f"Abriendo Manual de Operador CCTV y Alarmas de {len(reader.pages)} páginas...")

modules_ranges = [
    {
        "filename": "Modulo_1_Fundamentos_Legales_CCTV_y_Alarmas.pdf",
        "start": 1,
        "end": 22
    },
    {
        "filename": "Modulo_2_Sistemas_Electronicos_de_Seguridad_Privada.pdf",
        "start": 23,
        "end": 40
    },
    {
        "filename": "Modulo_3_Televigilancia_y_Operacion_Centro_Control.pdf",
        "start": 41,
        "end": 67
    }
]

print("\nCortando el manual de CCTV en 3 PDFs individuales por módulo...")
for mod in modules_ranges:
    writer = pypdf.PdfWriter()
    for p in range(mod["start"] - 1, mod["end"]):
        writer.add_page(reader.pages[p])
    
    output_path = os.path.join(dest_dir, mod["filename"])
    with open(output_path, "wb") as f:
        writer.write(f)
    size_mb = (os.path.getsize(output_path) / 1024 / 1024)
    print(f"  ✓ Creado: {mod['filename']} (Págs {mod['start']}-{mod['end']}, {size_mb:.2f} MB)")

full_dest = os.path.join(dest_dir, "Manual_Completo_CCTV_67_Paginas.pdf")
if not os.path.exists(full_dest):
    os.rename(src_pdf, full_dest)
    print(f"\n  ✓ Renombrado manual completo a: Manual_Completo_CCTV_67_Paginas.pdf")
