import os, sys, subprocess, glob, pathlib

sys.stdout.reconfigure(encoding="utf-8")

PDFS = [
    {
        "src": r"D:\aprecap\content\drive\folders\1mxl3Wr_U_7__6qUgQu9vV-dcvCstcv5i\Capitulo IV CCTV.pdf",
        "out": r"D:\aprecap\docs\markdown_cursos\2_Operador_CCTV_y_Alarmas\pdfs_ocr\Capitulo_IV_CCTV.md",
    },
    {
        "src": r"D:\aprecap\content\drive\folders\1mxl3Wr_U_7__6qUgQu9vV-dcvCstcv5i\Capitulo VI Centrales de Alarma, Incendio y Emergencias.pdf",
        "out": r"D:\aprecap\docs\markdown_cursos\2_Operador_CCTV_y_Alarmas\pdfs_ocr\Capitulo_VI_Centrales_Alarma_Incendio_Emergencias.md",
    },
]

TESSERACT = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
TESSDATA = r"C:\Users\Vickoto\AppData\Local\Temp\opencode\tessdata"
TMP_PAGE = r"C:\Users\Vickoto\AppData\Local\Temp\opencode\ocr_cctv_page.png"

import fitz  # pymupdf

env = dict(os.environ)
env["TESSDATA_PREFIX"] = TESSDATA

def ocr_pdf(pdf_path, out_path, max_pages=None):
    doc = fitz.open(pdf_path)
    n = min(len(doc), max_pages or len(doc))
    pages = []
    print(f"[OCR] {os.path.basename(pdf_path)} -> {n}/{len(doc)} paginas", flush=True)
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
        if (i + 1) % 10 == 0:
            print(f"  ... {i+1}/{n} paginas procesadas", flush=True)
    doc.close()
    return "\n\n".join(pages)

def main():
    os.makedirs(os.path.dirname(PDFS[0]["out"]), exist_ok=True)
    for item in PDFS:
        if os.path.exists(item["out"]):
            print(f"[SKIP] ya existe: {item['out']}", flush=True)
            continue
        content = ocr_pdf(item["src"], item["out"])
        stem = os.path.splitext(os.path.basename(item["out"]))[0]
        with open(item["out"], "w", encoding="utf-8") as f:
            f.write(f"# {stem}\n\n{content}")
        print(f"[OK] {item['out']}", flush=True)

if __name__ == "__main__":
    main()
