/**
 * extract-pdfs.mjs — Extrae el texto de los PDFs de cada módulo (Moodle + Drive)
 * y genera un MD por módulo en content/modulos-info/<curso>/.
 *
 * Uso: node scripts/extract-pdfs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { PDFParse } from "pdf-parse";

const ROOT = path.resolve(import.meta.dirname, "..");
const MOODLE_DIR = path.join(ROOT, "content", "moodle");
const MOODLE_FILES = path.join(ROOT, "content", "moodle", "files");
const DRIVE_DIR = path.join(ROOT, "content", "drive", "folders");
const OUT_DIR = path.join(ROOT, "content", "modulos-info");

// Mapeo de carpetas de Drive → módulos del curso Jefe de Seguridad (LP 420h)
const DRIVE_MAP = {
  "1RxoWAM4w-VLrUflmeuuntKXHZpFUeo10": { modulo: 1, nombre: "Legislación laboral y seguridad" },
  "1PxsATcR7B9l81DjekpDXpSSpT4LqAU1t": { modulo: 2, nombre: "Prevención de Riesgos" },
  "1SMAfGvblCOGnOWFob86L4sGeuQpx_SLE": { modulo: 3, nombre: "Administración" },
  "1EftN7OKG2URVxBS4BsVX7wYAlu7a4Mz4": { modulo: 4, nombre: "Planificación Estratégica" },
  "1z0Yg8e2Y2MBrjkjmE6665OXT6MvTHA_A": { modulo: 5, nombre: "Gestión Operativa" },
  "1L5u-8tCCf96vWeSe8UVr97nHTlO_00A_": { modulo: 6, nombre: "Seguridad Condominios" },
  "1Hiy5Btvv7nFMqVUJhGCU_ccnMn16PTAK": { modulo: 7, nombre: "Psicología de la Emergencia" },
  "1mxl3Wr_U_7__6qUgQu9vV-dcvCstcv5i": { modulo: 8, nombre: "Seguridad Electrónica" },
  "1Y2i1vDdWlSiI48fYOhFL4gjT5_ZbhwU8": { modulo: 0, nombre: "Material adicional" },
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function cleanText(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function extractPdf(filePath) {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const parser = new PDFParse({ data });
    const result = await parser.getText();
    return cleanText(result.text || "");
  } catch (err) {
    return `[Error extrayendo PDF: ${err.message}]`;
  }
}

function moduloDe(titulo, archivo) {
  const t = /M[oó]dulo\s+(\d+)/i.exec(titulo || "");
  if (t) return Number(t[1]);
  const a = /(?:M|ANEXO[_\s]?M)[_\s]?(\d+)/i.exec(archivo || "");
  if (a) return Number(a[1]);
  return null;
}

/* ---------- Parseo de los MD de cursos Moodle ---------- */
function parseMoodleCurso(slug, md) {
  const titulo = (md.match(/^# (.+)$/m) || [])[1]?.trim() || slug;
  const modulos = new Map(); // n -> { titulos:Set, archivos:[], videos:[] }
  const otros = [];
  const videos = [];
  const recursos = [];
  const lines = md.split("\n");
  let current = null;
  for (const line of lines) {
    const res = /\[resource\]\s+(.+?)\s*\*\*/.exec(line);
    if (res) {
      current = { titulo: res[1].trim().replace(/\s+Archivo$/, ""), archivos: [] };
      recursos.push(current);
      continue;
    }
    if (current) {
      const arch = /^\s*[-*]\s+Archivo:\s*`(.+?)`/.exec(line);
      if (arch) {
        current.archivos.push(arch[1].trim());
        continue;
      }
    }
    const vid = /\[url\]\s+(.+?)\s+URL/.exec(line);
    if (vid) {
      const dest = lines[lines.indexOf(line) + 1] || "";
      const m = /youtube\.com\/watch\?v=([\w-]+)/.exec(dest);
      if (m) videos.push({ titulo: vid[1].trim(), youtubeId: m[1] });
    }
  }
  for (const r of recursos) {
    for (const rel of r.archivos) {
      const abs = path.join(ROOT, rel.replace(/\\/g, "/"));
      if (!fs.existsSync(abs)) continue;
      const n = moduloDe(r.titulo, path.basename(abs));
      if (n == null) {
        otros.push({ archivo: abs, titulo: r.titulo });
      } else {
        if (!modulos.has(n)) modulos.set(n, { titulos: new Set(), archivos: [], videos: [] });
        modulos.get(n).titulos.add(r.titulo);
        modulos.get(n).archivos.push(abs);
      }
    }
  }
  for (const v of videos) {
    const m = /[Mm][oó]dulo\s*(\d+)/.exec(v.titulo);
    const n = m ? Number(m[1]) : null;
    if (n && modulos.has(n)) modulos.get(n).videos.push(v);
    else otros.push({ video: v });
  }
  return { slug, titulo, modulos, otros };
}

/* ---------- Cursos desde Drive (jefe-de-seguridad) ---------- */
function cursosDrive() {
  const modulos = new Map();
  const otros = [];
  for (const id of Object.keys(DRIVE_MAP)) {
    const dir = path.join(DRIVE_DIR, id);
    if (!fs.existsSync(dir)) continue;
    const info = DRIVE_MAP[id];
    const archivos = [];
    for (const f of fs.readdirSync(dir)) {
      if (!/\.pdf$/i.test(f)) continue;
      archivos.push(path.join(dir, f));
    }
    if (info.modulo === 0) {
      for (const a of archivos) otros.push({ archivo: a, titulo: path.basename(a) });
      continue;
    }
    if (!modulos.has(info.modulo)) modulos.set(info.modulo, { titulos: new Set(), archivos: [], videos: [] });
    modulos.get(info.modulo).titulos.add(info.nombre);
    for (const a of archivos) modulos.get(info.modulo).archivos.push(a);
  }
  return { slug: "jefe-de-seguridad", titulo: "Jefe de Seguridad", modulos, otros };
}

/* ---------- Generación de MDs ---------- */
async function escribirCurso(curso) {
  const out = path.join(OUT_DIR, curso.slug);
  fs.mkdirSync(out, { recursive: true });

  const nums = [...curso.modulos.keys()].sort((a, b) => a - b);
  const videosTotales = nums.reduce((acc, n) => acc + curso.modulos.get(n).videos.length, 0);
  let index = [`# ${curso.titulo}`, "", `> Curso: \`${curso.slug}\` · Módulos: ${nums.length} · Archivos PDF: ${nums.reduce((a, n) => a + curso.modulos.get(n).archivos.length, 0)} · Videos: ${videosTotales}`, "", "## Módulos", ""];
  for (const n of nums) {
    const mod = curso.modulos.get(n);
    const nombre = mod.titulos.size ? [...mod.titulos][0] : `Módulo ${n}`;
    index.push(`- [Módulo ${n}: ${nombre}](./${pad(n)}-${slugify(nombre)}.md) — ${mod.archivos.length} PDF · ${mod.videos.length} video(s)`);
  }
  if (curso.otros.length) index.push("", `## Otros archivos (sin módulo asignado): ${curso.otros.length}`);
  fs.writeFileSync(path.join(out, "_index.md"), index.join("\n") + "\n", "utf8");

  for (const n of nums) {
    const mod = curso.modulos.get(n);
    const nombre = [...mod.titulos][0] || `Módulo ${n}`;
    const file = path.join(out, `${pad(n)}-${slugify(nombre)}.md`);
    escribirModulo(file, curso, n, nombre, mod);
  }

  if (curso.otros.length) {
    const lines = [`# ${curso.titulo} — Otros archivos`, "", "> Archivos y videos del curso que no pertenecen a un módulo específico.", ""];
    for (const o of curso.otros) {
      lines.push(`## ${o.video ? "Vídeo: " + o.video.titulo : o.titulo}`, "");
      if (o.archivo) {
        lines.push(`> Fuente: \`${rel(o.archivo)}\``, "");
        const texto = await extractPdf(o.archivo);
        lines.push(texto || "_PDF sin texto extraíble (escaneado/imagen)._", "");
      } else {
        lines.push(`> https://www.youtube.com/watch?v=${o.video.youtubeId}`, "");
      }
    }
    fs.writeFileSync(path.join(out, "_otros.md"), lines.join("\n") + "\n", "utf8");
  }

  return { curso: curso.slug, modulos: nums.length, pdfs: nums.reduce((a, n) => a + curso.modulos.get(n).archivos.length, 0) };
}

async function escribirModulo(file, curso, n, nombre, mod) {
  const lines = [`# ${curso.titulo} — Módulo ${n}: ${nombre}`, ""];
  for (const t of mod.titulos) lines.push(`> Fuente: ${t}`);
  lines.push(
    "",
    `- Módulo: ${n}`,
    `- PDFs: ${mod.archivos.map((a) => "`" + rel(a) + "`").join(", ")}`,
    mod.videos.length ? `- Videos: ${mod.videos.map((v) => `[${v.titulo}](https://www.youtube.com/watch?v=${v.youtubeId})`).join(" · ")}` : "",
    "",
    "## Información extraída de los PDFs",
    ""
  );
  const cuerpos = [];
  for (const a of mod.archivos) {
    const texto = await extractPdf(a);
    const basename = path.basename(a);
    if (texto.startsWith("[Error") || texto === "") {
      cuerpos.push(`### ${basename}`, "", texto || "_PDF sin texto extraíble (escaneado/imagen)._", "");
    } else {
      cuerpos.push(`### ${basename}`, "", texto, "");
    }
  }
  fs.writeFileSync(file, lines.join("\n") + "\n" + cuerpos.join("\n") + "\n", "utf8");
}

function rel(p) {
  return path.relative(ROOT, p).replace(/\\/g, "/");
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/* ---------- Main ---------- */
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const cursos = [];

  for (const f of fs.readdirSync(MOODLE_DIR)) {
    if (!f.endsWith(".md")) continue;
    const md = fs.readFileSync(path.join(MOODLE_DIR, f), "utf8");
    cursos.push(parseMoodleCurso(f.replace(/\.md$/, ""), md));
  }

  cursos.push(cursosDrive());

  const reporte = [];
  for (const c of cursos) {
    if (c.modulos.size === 0 && c.otros.length === 0) continue;
    reporte.push(await escribirCurso(c));
  }

  console.table(reporte);
  console.log(`\nOK: ${reporte.length} cursos generados en content/modulos-info/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
