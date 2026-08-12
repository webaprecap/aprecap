import os
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

src_drive = "D:/aprecap/content/drive/folders"
desktop_jefe = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/4_Jefe_de_Seguridad"

modules_map = {
    "1RxoWAM4w-VLrUflmeuuntKXHZpFUeo10": "Modulo_1_Legislacion_Laboral_y_Seguridad_Privada",
    "1PxsATcR7B9l81DjekpDXpSSpT4LqAU1t": "Modulo_2_Prevencion_de_Riesgos",
    "1SMAfGvblCOGnOWFob86L4sGeuQpx_SLE": "Modulo_3_Administracion",
    "1EftN7OKG2URVxBS4BsVX7wYAlu7a4Mz4": "Modulo_4_Planificacion_Estrategica",
    "1z0Yg8e2Y2MBrjkjmE6665OXT6MvTHA_A": "Modulo_5_Gestion_Operativa",
    "1L5u-8tCCf96vWeSe8UVr97nHTlO_00A_": "Modulo_6_Seguridad_Condominios",
    "1Hiy5Btvv7nFMqVUJhGCU_ccnMn16PTAK": "Modulo_7_Psicologia_de_la_Emergencia",
    "1mxl3Wr_U_7__6qUgQu9vV-dcvCstcv5i": "Modulo_8_Seguridad_Electronica",
    "1Y2i1vDdWlSiI48fYOhFL4gjT5_ZbhwU8": "Material_Adicional"
}

print("Organizando las 8 subcarpetas oficiales del Curso Jefe de Seguridad en tu Escritorio...")
os.makedirs(desktop_jefe, exist_ok=True)

# Copy GENERALIDADES-CURSO-JEFE-DE-SEGURIDAD.pdf if exists
gen_pdf = "D:/aprecap/content/wp-pdfs/GENERALIDADES-CURSO-JEFE-DE-SEGURIDAD.pdf"
if os.path.exists(gen_pdf):
    shutil.copy(gen_pdf, os.path.join(desktop_jefe, "Programa_Oficial_Jefe_de_Seguridad.pdf"))

for folder_id, mod_name in modules_map.items():
    src_folder = os.path.join(src_drive, folder_id)
    dest_mod_dir = os.path.join(desktop_jefe, mod_name)
    os.makedirs(dest_mod_dir, exist_ok=True)
    
    if os.path.exists(src_folder):
        count = 0
        for item in os.listdir(src_folder):
            if item.lower().endswith(('.pdf', '.ppt', '.pptx', '.doc', '.docx')):
                src_item = os.path.join(src_folder, item)
                dest_item = os.path.join(dest_mod_dir, item)
                shutil.copy(src_item, dest_item)
                count += 1
        print(f"  ✓ {mod_name}: {count} archivos organizados")
    else:
        print(f"  ⚠️ No encontrada fuente para {mod_name}")

print("\n¡Proceso completado! Revisa C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap/4_Jefe_de_Seguridad")
