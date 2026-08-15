import sys
import pypdf

sys.stdout.reconfigure(encoding="utf-8")

PDF = r"D:\aprecap\docs\MANUAL DE SEGURIDAD PRIVADA_OS-10_actualizado.pdf"
OUT_DIR = r"D:\aprecap\docs\markdown_cursos\1_Guardia_OS10"

MODULOS = [
    {"nombre": "Modulo_2_Respeto_Promocion_Derechos_Humanos.md",
     "titulo": "Modulo 2 Respeto y Promocion de los Derechos Humanos",
     "inicio": 84, "fin": 87},
    {"nombre": "Modulo_3_Privacidad_Uso_Datos_Personales.md",
     "titulo": "Modulo 3 Privacidad y Uso de Datos Personales",
     "inicio": 87, "fin": 90},
    {"nombre": "Modulo_4_Probidad_No_Discriminacion_Perspectiva_Genero_Valores_Etica.md",
     "titulo": "Modulo 4 Probidad, No Discriminacion y Perspectiva de Genero, Valores y Etica",
     "inicio": 91, "fin": 96},
    {"nombre": "Modulo_7_Eventos_Masivos_Ley_21659.md",
     "titulo": "Modulo 7 Eventos Masivos de la Ley 21.659 sobre Seguridad Privada",
     "inicio": 96, "fin": 98},
    {"nombre": "Modulo_10_Seguridad_de_Instalaciones.md",
     "titulo": "Modulo 10 Seguridad de Instalaciones",
     "inicio": 131, "fin": 141},
]

reader = pypdf.PdfReader(PDF)

for mod in MODULOS:
    partes = [f"# {mod['titulo']}\n"]
    for p in range(mod["inicio"] - 1, mod["fin"]):
        txt = reader.pages[p].extract_text() or ""
        lineas = [line.strip() for line in txt.split("\n") if line.strip()]
        partes.append(f"## Página {p + 1}\n")
        partes.append("\n".join(lineas))
        partes.append("\n---\n")
    contenido = "\n\n".join(partes)
    path = f"{OUT_DIR}\\{mod['nombre']}"
    with open(path, "w", encoding="utf-8") as f:
        f.write(contenido + "\n")
    print(f"[OK] {mod['nombre']}  (paginas {mod['inicio']}-{mod['fin']}, {len(contenido)} chars)")
