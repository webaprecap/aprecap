import pypdf
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

desktop_base = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap"

for folder in ["2_Operador_CCTV_y_Alarmas", "3_Supervisor_de_Seguridad", "4_Jefe_de_Seguridad"]:
    folder_path = os.path.join(desktop_base, folder)
    print(f"\n==========================================")
    print(f"CARPETA: {folder}")
    print(f"==========================================")
    if not os.path.exists(folder_path):
        continue
    for fname in os.listdir(folder_path):
        if fname.endswith(".pdf"):
            fpath = os.path.join(folder_path, fname)
            try:
                reader = pypdf.PdfReader(fpath)
                num_pages = len(reader.pages)
                print(f"- {fname} ({num_pages} págs)")
                # Print first page text preview
                p1_text = reader.pages[0].extract_text() or ""
                p1_clean = " ".join(p1_text.split()[:15])
                print(f"  Pág 1 preview: {p1_clean}")
            except Exception as e:
                print(f"  Error leyendo {fname}: {e}")
