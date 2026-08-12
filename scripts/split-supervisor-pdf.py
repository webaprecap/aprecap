import pypdf
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

src_pdf = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/3_Supervisor_de_Seguridad/Modulo_1_Manual_Formacion_Supervisor_Seguridad.pdf"
dest_dir = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/3_Supervisor_de_Seguridad"

reader = pypdf.PdfReader(src_pdf)
print(f"Abriendo Manual de Supervisor de Seguridad de {len(reader.pages)} páginas...")

modules_ranges = [
    {
        "filename": "Modulo_1_Normativa_Laboral_y_Prevencion_de_Riesgos.pdf",
        "start": 1,
        "end": 64
    },
    {
        "filename": "Modulo_2_Prevencion_de_Riesgos_y_Control_de_Emergencias.pdf",
        "start": 65,
        "end": 112
    },
    {
        "filename": "Modulo_3_Procedimientos_de_Gestion_de_Seguridad.pdf",
        "start": 113,
        "end": 141
    },
    {
        "filename": "Modulo_4_Liderazgo_y_Resolucion_de_Conflictos.pdf",
        "start": 142,
        "end": 159
    },
    {
        "filename": "Modulo_5_Sistemas_de_Alarma_Comunicacion_y_Enlace.pdf",
        "start": 160,
        "end": 207
    }
]

print("\nCortando el manual de Supervisor en 5 PDFs individuales por módulo...")
for mod in modules_ranges:
    writer = pypdf.PdfWriter()
    for p in range(mod["start"] - 1, mod["end"]):
        writer.add_page(reader.pages[p])
    
    output_path = os.path.join(dest_dir, mod["filename"])
    with open(output_path, "wb") as f:
        writer.write(f)
    size_mb = (os.path.getsize(output_path) / 1024 / 1024)
    print(f"  ✓ Creado: {mod['filename']} (Págs {mod['start']}-{mod['end']}, {size_mb:.2f} MB)")

# Rename the original 207-page manual for clarity
full_dest = os.path.join(dest_dir, "Manual_Completo_Supervisor_207_Paginas.pdf")
if not os.path.exists(full_dest):
    os.rename(src_pdf, full_dest)
    print(f"\n  ✓ Renombrado manual completo a: Manual_Completo_Supervisor_207_Paginas.pdf")
