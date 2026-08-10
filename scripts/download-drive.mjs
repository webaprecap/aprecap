import fs from "node:fs";
import path from "node:path";

const HARVEST_DIR = "D:/aprecap/session/harvest";
const OUT_DIR = "D:/aprecap/content/drive";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

fs.mkdirSync(path.join(OUT_DIR, "folders"), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, "files"), { recursive: true });

const links = new Map();
function scan(src, html) {
  const re = /https:\/\/drive\.google\.com\/(?:drive\/folders\/|file\/d\/|open\?id=|uc\?id=)([A-Za-z0-9_-]{25,})/g;
  for (const m of (html || "").matchAll(re)) {
    const kind = m[0].includes("folders/") ? "folder" : "file";
    const key = `${kind}|${m[1]}`;
    if (!links.has(key)) links.set(key, { kind, id: m[1], by: [] });
    links.get(key).by.push(src);
  }
}
for (const f of ["lp_lesson.json", "lp_quiz.json", "lp_question.json", "lp_course.json"]) {
  const arr = JSON.parse(fs.readFileSync(path.join(HARVEST_DIR, f), "utf8"));
  for (const o of arr) {
    const title = o.title?.rendered ?? o.title ?? o.slug ?? f;
    scan(`[${f}] ${title}`, `${o.content?.rendered ?? ""} ${o.excerpt?.rendered ?? ""}`);
  }
}
const dump = JSON.parse(fs.readFileSync("D:/aprecap/session/backup/wp-full-dump.json", "utf8"));
for (const p of dump.tables.wpik_posts) {
  const html = `${p.post_content ?? ""} ${p.post_excerpt ?? ""}`;
  if (/drive\.google\.com/.test(html)) scan(p.post_title || String(p.ID), html);
}

console.log(`enlaces Drive: ${links.size}`);
for (const [k, v] of links) console.log(`- ${k} ← ${[...new Set(v.by)].join(" | ").slice(0, 100)}`);

const safeName = (s) => {
  const bad = /[<>:"/\\|?*\x00-\x1f]/g;
  const base = path.basename(s || "archivo").replace(bad, "_");
  const ext = path.extname(base);
  return { name: base.slice(0, base.length - ext.length).slice(0, 80) || "archivo", ext: ext.toLowerCase().slice(0, 10) || "" };
};

async function getFile(id, label) {
  const r1 = await fetch(`https://drive.google.com/uc?export=download&id=${id}`, {
    headers: { "user-agent": UA, referer: "https://drive.google.com/" },
    redirect: "follow",
  });
  if (r1.status !== 200) return { error: `status ${r1.status}`, buf: null };
  const ct = r1.headers.get("content-type") || "";
  const raw = Buffer.from(await r1.arrayBuffer());
  if (ct.includes("text/html")) {
    const text = raw.toString("utf8");
    if (text.includes("requireAccess") || /You need to sign in|Cuenta requerida|signin/i.test(text))
      return { error: "requiere login", buf: null };
    const formAct = (text.match(/<form[^>]*action="([^"]+)"/) || [])[1];
    if (formAct && /download-form/.test(text)) {
      const fields = [...text.matchAll(/<input[^>]*name="([^"]+)"[^>]*value="([^"]*)"[^>]*>/g)].map((m) => [m[1], m[2]]);
      const qs = new URLSearchParams(fields);
      const get = await fetch(`${formAct}?${qs}`, {
        headers: { "user-agent": UA, referer: `https://drive.google.com/uc?export=download&id=${id}` },
      });
      if ((get.headers.get("content-type") || "").includes("text/html")) return { error: "página de virus inesperada", buf: null };
      return { buf: Buffer.from(await get.arrayBuffer()), ct: get.headers.get("content-type") || "" };
    }
    const uuid = (text.match(/name="(?:uuid|confirm)"[^>]*value="([^"]+)"/) || [])[1];
    if (uuid) {
      const formUrl = (text.match(/<form[^>]*action="([^"]+)"/) || [])[1] || `https://drive.google.com/uc?export=download`;
      const post = await fetch(formUrl, {
        method: "POST",
        headers: { "user-agent": UA, referer: `https://drive.google.com/uc?export=download&id=${id}`, "content-type": "application/x-www-form-urlencoded" },
        body: `id=${id}&export=download&confirm=t&uuid=${encodeURIComponent(uuid)}&name=${encodeURIComponent(id)}`,
      });
      if ((post.headers.get("content-type") || "").includes("text/html")) return { error: "página de virus inesperada", buf: null };
      return { buf: Buffer.from(await post.arrayBuffer()), ct: post.headers.get("content-type") || "" };
    }
    const conf = (text.match(/confirm=([A-Za-z0-9_-]+)/) || [])[1];
    if (conf) {
      const r2 = await fetch(`https://drive.google.com/uc?export=download&id=${id}&confirm=${conf}`, {
        headers: { "user-agent": UA, referer: `https://drive.google.com/uc?export=download&id=${id}` },
      });
      if ((r2.headers.get("content-type") || "").includes("text/html")) return { error: "página de virus inesperada", buf: null };
      return { buf: Buffer.from(await r2.arrayBuffer()), ct: r2.headers.get("content-type") || "" };
    }
    return { error: "html sin confirm", buf: null };
  }
  return { buf: raw, ct };
}

function parseFolderHtml(html) {
  return [...html.matchAll(/class="JxSEve" aria-label="([^"]+)"[\s\S]{0,400}?data-id="([A-Za-z0-9_-]{25,})"/g)].map((m) => ({
    label: m[1].replace(/\s+Shared$/i, "").trim(),
    id: m[2],
    isFolder: /\bFolder\b/i.test(m[1].slice(-10)),
  }));
}

async function dowloadFolderPage(id, dir) {
  const page = await fetch(`https://drive.google.com/drive/folders/${id}`, {
    headers: { "user-agent": UA, referer: "https://drive.google.com/" },
  });
  const html = await page.text();
  const items = parseFolderHtml(html);
  fs.mkdirSync(dir, { recursive: true });
  const manifest = [];
  for (const it of items) {
    if (it.isFolder) {
      const sub = path.join(dir, "sub", safeName(it.label).name);
      fs.mkdirSync(sub, { recursive: true });
      console.log(`  → subcarpeta: ${it.label} (${it.id})`);
      const subItems = await dowloadFolder(it.id, sub);
      manifest.push({ name: it.label, id: it.id, folder: true, items: subItems });
      continue;
    }
    const d = await getFile(it.id, it.label);
    if (d.error || !d.buf || d.buf.length === 0) {
      console.log(`  ! ${it.label}: ${d.error || "vacío"}`);
      manifest.push({ name: it.label, id: it.id, error: true });
      continue;
    }
    const { name, ext } = safeName(it.label);
    const fname = `${name}${ext}`;
    fs.writeFileSync(path.join(dir, fname), d.buf);
    manifest.push({ name: it.label, id: it.id, size: d.buf.length });
    console.log(`  + ${fname} (${(d.buf.length / 1024 / 1024).toFixed(2)} MB)`);
    ok++;
  }
  return manifest;
}

let ok = 0, fail = 0;
const ONLY = process.argv[2] ? process.argv[2].split(",") : null;

async function dowloadFolder(id, dir) {
  const manifest = await dowloadFolderPage(id, dir);
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2));
}

for (const L of links.values()) {
  if (ONLY && !ONLY.includes(L.id)) continue;
  if (L.kind === "file") {
    const d = await getFile(L.id, L.by[0]);
    if (d.error || !d.buf || d.buf.length === 0) { console.log(`! file ${L.id}: ${d.error || "vacío"}`); fail++; continue; }
    const dir = path.join(OUT_DIR, "files", L.id);
    fs.mkdirSync(dir, { recursive: true });
    const orig = (L.by[0].split("] ")[1] || "").trim() || "archivo";
    const { name, ext } = safeName(orig);
    fs.writeFileSync(path.join(dir, `${name}${ext}`), d.buf);
    console.log(`+ file ${L.id}: ${(d.buf.length / 1024 / 1024).toFixed(2)} MB → ${name}${ext}`);
    ok++;
    continue;
  }
  const dir = path.join(OUT_DIR, "folders", L.id);
  fs.mkdirSync(dir, { recursive: true });
  const manifest = await dowloadFolderPage(L.id, dir);
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`✓ folder ${L.id}: ${manifest.length} ítems`);
}
console.log(`\nResumen: ${ok} archivos descargados, ${fail} errores`);