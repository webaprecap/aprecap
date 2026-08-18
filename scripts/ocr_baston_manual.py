import os, sys, subprocess

sys.stdout.reconfigure(encoding="utf-8")

PDF_DIR = r"C:\Users\Vickoto\Downloads\os10 aprecap\cuestionarios"
OUT_DIR = r"D:\aprecap\scripts\baston-extraidos"
TESSERACT = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
TESSDATA = r"C:\Users\Vickoto\AppData\Local\Temp\opencode\tessdata"

import fitz  # pymupdf

env = dict(os.environ)
env["TESSDATA_PREFIX"] = TESSDATA

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    target = [f for f in os.listdir(PDF_DIR) if f.lower().endswith(".pdf") and "bast" in f.lower()]
    if not target:
        print("[ERROR] no se encontro el PDF de baston")
        return
    pdf = os.path.join(PDF_DIR, target[0])
    doc = fitz.open(pdf)
    partes = [f"# {target[0]}\n"]
    for i in range(len(doc)):
        pix = doc.load_page(i).get_pixmap(dpi=250)
        res = subprocess.run(
            [TESSERACT, "stdin", "stdout", "-l", "spa+eng", "--psm", "3"],
            input=pix.tobytes("png"), capture_output=True, env=env
        )
        texto = res.stdout.decode("utf-8", errors="replace").strip()
        partes.append(f"## Pagina {i+1}\n\n{texto}\n\n---\n")
        print(f"[OCR] pagina {i+1}/{len(doc)} ({len(texto)} chars)", flush=True)
    doc.close()
    out = os.path.join(OUT_DIR, "Curso_baston_y_esposas_manual.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n\n".join(partes))
    print(f"[OK] {out}")

if __name__ == "__main__":
    main()
