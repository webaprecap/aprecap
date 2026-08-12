import pypdf
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

src_pdf = "D:/aprecap/content/wp-pdfs/MANUAL-DE-SEGURIDAD-PRIVADA-OS10.pdf"
dest_dir = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/1_Guardia_OS10"

os.makedirs(dest_dir, exist_ok=True)

reader = pypdf.PdfReader(src_pdf)
print(f"Abriendo Manual de OS-10 de {len(reader.pages)} páginas...")

# Definición de rangos de páginas (1-indexed inclusive) para los 8 módulos de OS-10
modules_ranges = [
    {
        "filename": "Modulo_1_Legislacion_de_Seguridad_Privada.pdf",
        "start": 1,
        "end": 20
    },
    {
        "filename": "Modulo_2_Prevencion_de_Riesgos_y_Control_de_Incendios.pdf",
        "start": 21,
        "end": 30
    },
    {
        "filename": "Modulo_3_Valores_Etica_y_Psicoprevencion.pdf",
        "start": 31,
        "end": 38
    },
    {
        "filename": "Modulo_4_Tecnicas_de_Vigilancia_y_Pauta_de_Puesto.pdf",
        "start": 39,
        "end": 43
    },
    {
        "filename": "Modulo_5_Seguridad_Fisica_de_Instalaciones_y_Accesos.pdf",
        "start": 44,
        "end": 58
    },
    {
        "filename": "Modulo_6_Sistemas_de_Comunicacion_y_Enlace.pdf",
        "start": 59,
        "end": 68
    },
    {
        "filename": "Modulo_7_Primeros_Auxilios.pdf",
        "start": 69,
        "end": 77
    },
    {
        "filename": "Modulo_8_Defensa_Personal_y_Uso_del_Baston.pdf",
        "start": 78,
        "end": 80
    }
]

print("\nCortando el manual en 8 PDFs individuales por módulo...")
for mod in modules_ranges:
    writer = pypdf.PdfWriter()
    # 0-indexed start and end
    for p in range(mod["start"] - 1, mod["end"]):
        writer.add_page(reader.pages[p])
    
    output_path = os.path.join(dest_dir, mod["filename"])
    with open(output_path, "wb") as f:
        writer.write(f)
    size_mb = (os.path.getsize(output_path) / 1024 / 1024)
    print(f"  ✓ Creado: {mod['filename']} (Págs {mod['start']}-{mod['end']}, {size_mb:.2f} MB)")

# Guardar copia del manual completo de 80 páginas
writer_full = pypdf.PdfWriter()
for page in reader.pages:
    writer_full.add_page(page)
full_dest = os.path.join(dest_dir, "Manual_Completo_OS10_80_Paginas.pdf")
with open(full_dest, "wb") as f:
    writer_full.write(f)
print(f"\n  ✓ Guardado: Manual_Completo_OS10_80_Paginas.pdf ({os.path.getsize(full_dest)/1024/1024:.2f} MB)")
