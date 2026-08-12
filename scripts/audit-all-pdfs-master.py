import os
import pypdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("==========================================================")
print("AUDITORÍA MAESTRA DE ARCHIVOS PDF - INSTITUTO APRECAP")
print("==========================================================")

def scan_dir(root_dir):
    pdf_list = []
    for dirpath, _, filenames in os.walk(root_dir):
        for f in filenames:
            if f.lower().endswith('.pdf'):
                full_p = os.path.join(dirpath, f)
                size_mb = os.path.getsize(full_p) / 1024 / 1024
                pdf_list.push if False else pdf_list.append((full_p, f, size_mb))
    return pdf_list

# 1. Desktop PDFs
desktop_path = "C:/Users/Vickoto/Desktop/PDFs_Cursos_Aprecap"
desktop_pdfs = scan_dir(desktop_path)

print(f"\n📁 1. ARCHIVOS EN ESCRITORIO ({desktop_path}): {len(desktop_pdfs)} PDFs")
for fpath, fname, size in desktop_pdfs:
    rel = os.path.relpath(fpath, desktop_path)
    print(f"   ✓ [{size:6.2f} MB] {rel}")

# 2. Content Drive PDFs
drive_path = "D:/aprecap/content/drive/folders"
drive_pdfs = scan_dir(drive_path)

print(f"\n☁️ 2. ARCHIVOS GOOGLE DRIVE RESCATADOS ({drive_path}): {len(drive_pdfs)} PDFs")
for fpath, fname, size in drive_pdfs:
    rel = os.path.relpath(fpath, drive_path)
    print(f"   ✓ [{size:6.2f} MB] {rel}")

# 3. WP PDFs
wp_path = "D:/aprecap/content/wp-pdfs"
wp_pdfs = scan_dir(wp_path)

print(f"\n🌐 3. ARCHIVOS NATIVOS DE WORDPRESS ({wp_path}): {len(wp_pdfs)} PDFs")
for fpath, fname, size in wp_pdfs:
    print(f"   ✓ [{size:6.2f} MB] {fname}")

# 4. Moodle PDFs
moodle_path = "D:/aprecap/content/moodle/files"
moodle_pdfs = scan_dir(moodle_path)

print(f"\n🎓 4. ARCHIVOS MOODLE RESCATADOS ({moodle_path}): {len(moodle_pdfs)} PDFs")
for fpath, fname, size in moodle_pdfs:
    rel = os.path.relpath(fpath, moodle_path)
    print(f"   ✓ [{size:6.2f} MB] {rel}")

# 5. Public Web Materials PDFs
public_path = "D:/aprecap/web/public/materiales"
public_pdfs = scan_dir(public_path)

print(f"\n🚀 5. ARCHIVOS EN WEB PÚBLICA (/web/public/materiales): {len(public_pdfs)} PDFs")
for fpath, fname, size in public_pdfs:
    print(f"   ✓ [{size:6.2f} MB] {fname}")

print("\n==========================================================")
print(f"TOTAL GENERAL AUDITADO: {len(desktop_pdfs) + len(drive_pdfs) + len(wp_pdfs) + len(moodle_pdfs)} PDFs ÚNICOS REGISTRADOS")
print("==========================================================")
