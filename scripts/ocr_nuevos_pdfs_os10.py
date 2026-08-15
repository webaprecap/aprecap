import os, sys, subprocess, glob, pathlib

sys.stdout.reconfigure(encoding="utf-8")

PDF_DIR = r"D:\aprecap\docs\pdf os10"
OUT_DIR = r"D:\aprecap\docs\markdown_cursos\1_Guardia_OS10\pdfs_ocr"
TESSERACT = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
TESSDATA = r"C:\Users\Vickoto\AppData\Local\Temp\opencode\tessdata"
TMP_PAGE = r"C:\Users\Vickoto\AppData\Local\Temp\opencode\ocr_page.png"

NAME_OVERRIDES = {
    "OS-10_Tactical_Blueprint.pdf": "OS-10_Tactical_Blueprint_v2",
    "Seguridad_Física_y_Digital.pdf": "Seguridad_Fisica_y_Digital",
}

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(os.path.dirname(TMP_PAGE), exist_ok=True)

import fitz  # pymupdf

env = dict(os.environ)
env["TESSDATA_PREFIX"] = TESSDATA

def ocr_pdf(pdf_path, out_path):
    doc = fitz.open(pdf_path)
    pages = []
    n = len(doc)
    print(f"[OCR] {os.path.basename(pdf_path)} -> {n} paginas", flush=True)
    for i in range(n):
        page = doc.load_page(i)
        pix = page.get_pixmap(dpi=250)
        pix.save(TMP_PAGE)
        res = subprocess.run(
            [TESSERACT, TMP_PAGE, "stdout", "-l", "spa+eng", "--psm", "3"],
            capture_output=True, env=env
        )
        text = res.stdout.decode("utf-8", errors="replace").strip()
        pages.append(f"## Página {i+1}\n\n{text}\n\n---\n")
    doc.close()
    return "\n\n".join(pages)

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else None
    pdfs = sorted(glob.glob(os.path.join(PDF_DIR, "*.pdf")))
    for pdf in pdfs:
        base = os.path.basename(pdf)
        if target and target.lower() not in base.lower():
            continue
        stem = NAME_OVERRIDES.get(base, os.path.splitext(base)[0])
        out_path = os.path.join(OUT_DIR, stem + ".md")
        if os.path.exists(out_path):
            print(f"[SKIP] ya existe: {out_path}", flush=True)
            continue
        try:
            content = ocr_pdf(pdf, out_path)
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(f"# {stem}\n\n{content}")
            print(f"[OK] {out_path}", flush=True)
        except Exception as e:
            print(f"[ERROR] {base}: {e}", flush=True)

if __name__ == "__main__":
    main()
