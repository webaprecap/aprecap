/**
 * build-data.mjs — Convierte el contenido rescatado (content/*.md) en
 * datos tipados para la web (web/src/data/*.ts).
 *
 * Uso: node scripts/build-data.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");
const OUT = path.join(ROOT, "web", "src", "data");

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readMd(file) {
  return fs.readFileSync(file, "utf-8").replace(/^\uFEFF/, "");
}

function stripMeta(md) {
  // Quita líneas de metadatos (> Fuente / > Rescatado / > URL / > ID Moodle) donde sea que estén
  const lines = md
    .split(/\r?\n/)
    .filter((l) => !/^\s*>\s*(Fuente|Rescatado|URL|ID Moodle):/i.test(l));
  let body = lines.join("\n");
  // Quita la primera línea H1 (título del scrape) y ruido de autor del blog ("/\n/ Por")
  body = body.replace(/^#\s+.+$/m, "");
  body = body.replace(/^[ \t]*\/\n[ \t]*\/[ \t]*Por[ \t]*$/m, "");
  body = body.replace(/^[ \t]*\/[ \t]*$/m, "");
  // Quita ítems de lista vacíos (menús de WordPress)
  body = body.replace(/^[ \t]*[-•*][ \t]*$/gm, "");
  // Quita sección "## Enlaces encontrados" (todo lo que sigue)
  const idx = body.indexOf("## Enlaces encontrados");
  if (idx !== -1) body = body.slice(0, idx);
  return body.trim();
}

function imagesFrom(md) {
  const out = [];
  const re = /!\[[^\]]*\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(md)) !== null) {
    const url = m[1];
    if (url.startsWith("http") && !out.includes(url)) out.push(url);
  }
  return out;
}

function sections(md) {
  // Devuelve array de { heading, content } para headings #### o ### con contenido siguiente
  const res = [];
  const re = /^(#{2,6})\s+(.+)$/gm;
  let m;
  const parts = [];
  let last = { depth: 99, title: "", start: 0 };
  while ((m = re.exec(md)) !== null) {
    parts.push({ depth: m[1].length, title: m[2].trim(), start: m.index });
  }
  for (let j = 0; j < parts.length; j++) {
    const end = j + 1 < parts.length ? parts[j + 1].start : md.length;
    if (parts[j].depth <= 4) {
      res.push({ title: parts[j].title, content: md.slice(parts[j].start, end).trim() });
    }
  }
  return res;
}

function listItems(text) {
  const items = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*[-•*]\s+(.+)/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

function firstMatch(md, re) {
  const m = md.match(re);
  return m ? m[1].trim() : "";
}

function cleanTitle(t) {
  return t.replace(/\s*[–-]\s*Otec\s*Aprecap\s*$/i, "").trim();
}

function parseCurriculum(raw) {
  // Convierte el curriculum crudo de LearnPress (con ruido del scrape) en
  // [{ seccion, titulo, tipo, minutos?, preguntas? }], sin URLs del WP.
  const items = [];
  const seen = new Set();
  const re = /^\s*[-•*]\s*\[(.+?)\]\(([^)]+)\)\s*$/gm;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const label = m[1];
    const url = m[2];
    if (!/aprecap\.cl\/courses\//.test(url) || seen.has(url)) continue;
    seen.add(url);
    const tipo = /\/quizzes\//.test(url) ? "evaluacion" : "leccion";
    let titulo = label;
    const pm = titulo.match(/(\d{1,2})\s*preguntas?\s*$/);
    const preguntas = pm ? parseInt(pm[1], 10) : undefined;
    if (pm) titulo = titulo.slice(0, pm.index);
    const mm = titulo.match(/(\d{1,2})\s*minutos?\s*$/);
    const minutos = mm ? parseInt(mm[1], 10) : undefined;
    if (mm) titulo = titulo.slice(0, mm.index);
    const num = titulo.match(/^(\d+)\.(\d+)\s*/);
    if (num) titulo = titulo.replace(/^\d+\.\d+\s*/, "");
    const mod = titulo.match(/Módulo\s+(\d+)/i);
    const seccion = mod ? `Módulo ${mod[1]}` : num ? `Módulo ${num[1]}` : "";
    titulo = titulo.replace(/^Módulo\s+\d+\s*:\s*/i, "").trim();
    if (!titulo) titulo = seccion || "Lección";
    const item = { seccion, titulo, tipo };
    if (minutos !== undefined) item.minutos = minutos;
    if (preguntas !== undefined) item.preguntas = preguntas;
    items.push(item);
  }
  return items;
}

/* ---------- Páginas (content/pages) ---------- */
function parsePages() {
  const pages = [];
  const dir = path.join(CONTENT, "pages");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md")).sort()) {
    const md = readMd(path.join(dir, f));
    const clean = stripMeta(md);
    const title = cleanTitle(firstMatch(md, /^#\s+(.+?)\s*$/m) || f.replace(/\.md$/, ""));
    const display = cleanTitle(firstMatch(clean, /^#\s+(.+?)\s*$/m) || title);
    let body = clean.replace(/^#\s+.+$/m, "").trim();
    // Quita enlaces de navegación del scrape (menús del WordPress que quedaron en el cuerpo)
    body = body
      .split(/\r?\n/)
      .filter((l) => !/^\s*[-•*]\s*\[[^\]]*\]\(https:\/\/aprecap\.cl/i.test(l))
      .join("\n")
      .trim();
    if (!body) continue; // páginas sin contenido real (p. ej. courses)
    pages.push({
      slug: f.replace(/\.md$/, ""),
      title,
      heading: display,
      source: firstMatch(md, /> Fuente: (.+)$/),
      body,
      images: imagesFrom(clean),
    });
  }
  return pages;
}

/* ---------- Blog (content/blog) ---------- */
function parseBlog() {
  const posts = [];
  const dir = path.join(CONTENT, "blog");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md")).sort()) {
    const md = readMd(path.join(dir, f));
    const clean = stripMeta(md);
    const title = cleanTitle(firstMatch(clean, /^#\s+(.+?)\s*$/m) || f.replace(/\.md$/, ""));
    const date = firstMatch(md, /\/2(\d{3})\/(\d{2})\/(\d{2})\//) ? "" : "";
    const dateMatch = md.match(/https:\/\/aprecap\.cl\/(\d{4})\/(\d{2})\/(\d{2})\//);
    posts.push({
      slug: f.replace(/\.md$/, ""),
      title,
      source: firstMatch(md, /> Fuente: (.+)$/),
      date: dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : "",
      body: clean.replace(/^#\s+.+$/m, "").trim(),
      images: imagesFrom(clean),
    });
  }
  return posts;
}

/* ---------- Cursos LearnPress (content/cursos) ---------- */
function parseCursos() {
  const cursos = [];
  const dir = path.join(CONTENT, "cursos");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md")).sort()) {
    const md = readMd(path.join(dir, f));
    const clean = stripMeta(md);
    const title = cleanTitle(firstMatch(clean, /^#\s+(.+?)\s*$/m) || f.replace(/\.md$/, ""));
    const price = firstMatch(md, /\$\s?([\d.]+)/);
    const duration = firstMatch(md, /(\d+)\s*horas?/i);
    const students = firstMatch(md, /(\d+)\s*estudiantes/);
    const quizzes = firstMatch(md, /(\d+)\s*cuestionarios/);
    const image =
      imagesFrom(md).find((u) => u.includes("wp-content/uploads")) || "";
    const secs = sections(clean);
    const get = (t) => {
      const s = secs.find((x) => x.title.toLowerCase().includes(t.toLowerCase()));
      return s ? s.content : "";
    };
    const desc = firstMatch(md, /Descripción del curso:\s*\n*([\s\S]*?)(?=\n\n[\u{1F4E6}]|\n\n🎯|$)/u).trim();
    cursos.push({
      slug: f.replace(/\.md$/, ""),
      title,
      source: firstMatch(md, /> Fuente: (.+)$/),
      image,
      price: price ? `$${price}` : "",
      duration: duration ? `${duration} horas` : "",
      students: students ? parseInt(students, 10) : 0,
      quizzes: quizzes ? parseInt(quizzes, 10) : 0,
      description: desc || get("Descripción del curso"),
      competencias: listItems(get("Competencia a desarrollar")),
      requisitos: listItems(get("Requisitos")),
      caracteristicas: listItems(get("Caracteristicas")),
      audiencia: listItems(get("Audiencia objetivo")),
      curriculum: parseCurriculum(get("Currículum")),
      faq: secs.filter((x) => x.content.includes("¿")).map((x) => ({ q: x.title, a: x.content })),
    });
  }
  return cursos;
}

/* ---------- Cursos Moodle (content/moodle) ---------- */
function parseMoodle() {
  const cursos = [];
  const dir = path.join(CONTENT, "moodle");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md") && x !== "index.md").sort()) {
    const md = readMd(path.join(dir, f));
    const activities = [];
    const files = [];
    const videos = [];
    for (const line of md.split(/\r?\n/)) {
      const act = line.match(/^\s*-\s*\*\*\[([a-z]+)\]\s+(.+?)\*\*\s*—\s*(.+)$/i);
      if (act) {
        let name = act[2].trim();
        name = name.replace(/\s+(Foro|Archivo|URL|Cuestionario)\s*$/i, "");
        activities.push({ type: act[1].toLowerCase(), name, url: act[3].trim() });
        continue;
      }
      const f2 = line.match(/Archivo: `(.+?)`/);
      if (f2) files.push(f2[1].replace(/\\/g, "/"));
      const v = line.match(/Destino: (https:\/\/www\.youtube\.com\/watch\?v=[\w-]+)/);
      if (v) videos.push(v[1]);
    }
    const title = firstMatch(md, /^#\s+(.+?)\s*$/m);
    cursos.push({
      slug: f.replace(/\.md$/, ""),
      title,
      url: firstMatch(md, /^> URL: (.+)$/m),
      moodleId: firstMatch(md, /^> ID Moodle: (\d+)$/m),
      activities,
      files: files.map((x) => x.split("/").pop()),
      filePaths: files,
      videos,
    });
  }
  return cursos;
}

function writeTs(name, content) {
  const file = path.join(OUT, `${name}.ts`);
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(file, content, "utf-8");
  console.log(`✓ ${path.relative(ROOT, file)}`);
}

const pages = parsePages();
const blog = parseBlog();
const cursos = parseCursos();
const moodle = parseMoodle();

writeTs("pages", `import type { Pagina } from "./types";\n\nexport const paginas: Pagina[] = ${JSON.stringify(pages, null, 2)};\n`);
writeTs("blog", `import type { BlogPost } from "./types";\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(blog, null, 2)};\n`);
writeTs("cursos", `import type { CursoLP } from "./types";\n\nexport const cursosLP: CursoLP[] = ${JSON.stringify(cursos, null, 2)};\n`);
writeTs("moodle", `import type { CursoMoodle } from "./types";\n\nexport const cursosMoodle: CursoMoodle[] = ${JSON.stringify(moodle, null, 2)};\n`);

console.log(`\nResumen: ${pages.length} páginas · ${blog.length} posts · ${cursos.length} cursos LP · ${moodle.length} cursos Moodle`);
