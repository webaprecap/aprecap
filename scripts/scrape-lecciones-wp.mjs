/**
 * scrape-lecciones-wp.mjs — Rescata el contenido REAL de las lecciones y
 * evaluaciones de los 3 cursos LearnPress, usando las credenciales de
 * WordPress del cliente (pdte: recrear el contenido en Moodle).
 *
 * Uso: node scripts/scrape-lecciones-wp.mjs
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import * as cheerio from "cheerio";

dotenv.config();

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "content", "lecciones");
const WP_URL = process.env.WP_URL || "https://aprecap.cl";
const WP_USER = process.env.WP_USER;
const WP_PASS = process.env.WP_PASS;

const UA = { "User-Agent": "DigitalUp-Rescue/1.0" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let CURSO_ACTUAL = "";

function cookiesToString(map) {
  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

async function login() {
  // 1) GET wp-login.php para recibir las cookies de sesión (test_cookie, etc.)
  let res = await fetch(`${WP_URL}/wp-login.php`, { headers: UA, redirect: "manual" });
  const cookies = new Map();
  for (const c of res.headers.getSetCookie()) {
    const [pair] = c.split(";");
    const eq = pair.indexOf("=");
    cookies.set(pair.slice(0, eq), pair.slice(eq + 1));
  }

  // 2) POST con credenciales
  res = await fetch(`${WP_URL}/wp-login.php`, {
    method: "POST",
    headers: {
      ...UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookiesToString(cookies),
    },
    body: new URLSearchParams({
      log: WP_USER,
      pwd: WP_PASS,
      testcookie: "1",
      redirect_to: `${WP_URL}/wp-admin/`,
      "wp-submit": "Log In",
    }),
    redirect: "manual",
  });
  for (const c of res.headers.getSetCookie()) {
    const [pair] = c.split(";");
    const eq = pair.indexOf("=");
    const key = pair.slice(0, eq);
    if (key.startsWith("wordpress_logged_in") || key.startsWith("wordpress_sec")) {
      cookies.set(key, pair.slice(eq + 1));
    }
  }

  if (![...cookies.keys()].some((k) => k.startsWith("wordpress_logged_in"))) {
    throw new Error("Login a WordPress falló (revisar WP_USER/WP_PASS en .env)");
  }
  console.log("✓ Sesión WordPress iniciada");
  return cookies;
}

async function fetchHtml(url, cookies) {
  const res = await fetch(url, { headers: { ...UA, Cookie: cookiesToString(cookies) } });
  const html = await res.text();
  if (html.includes('wp-login.php')) {
    throw new Error("Redirigido al login (sin permisos para ver esta página)");
  }
  return html;
}

function nodeToMarkdown($, el, md = []) {
  const $el = $(el);
  if ($el.is("script, style, noscript, iframe, svg, form, button, input, figure figcaption")) return;
  const tag = el.tagName ? el.tagName.toLowerCase() : "";
  const text = $el.text().trim().replace(/\s+/g, " ");

  switch (tag) {
    case "h1": md.push(`# ${text}\n`); return;
    case "h2": md.push(`## ${text}\n`); return;
    case "h3": md.push(`### ${text}\n`); return;
    case "h4": md.push(`#### ${text}\n`); return;
    case "h5": md.push(`##### ${text}\n`); return;
    case "p": if (text) md.push(`${text}\n`); return;
    case "li": {
      const nested = $el.find("ul, ol");
      md.push(`- ${text}`);
      if (nested.length) nested.each((_, ul) => nodeToMarkdown($, ul, md));
      return;
    }
    case "ul":
    case "ol":
      $el.children("li").each((_, li) => nodeToMarkdown($, li, md));
      md.push("");
      return;
    case "table": {
      const rows = [];
      $el.find("tr").each((_, tr) => {
        const cells = $(tr)
          .find("th, td")
          .map((_, c) => $(c).text().trim().replace(/\s+/g, " ").replace(/\|/g, "\\|"))
          .get();
        if (cells.length) rows.push(cells);
      });
      if (rows.length) {
        md.push(`| ${rows[0].join(" | ")} |`);
        md.push(`| ${rows[0].map(() => "---").join(" | ")} |`);
        for (const row of rows.slice(1)) md.push(`| ${row.join(" | ")} |`);
      }
      md.push("");
      return;
    }
    case "img": {
      const src = $el.attr("src");
      if (src) md.push(`![${$el.attr("alt") || ""}](${src})`);
      return;
    }
    default: {
      const children = $el.children();
      if (!children.length && text) {
        md.push(`${text}`);
      } else {
        $el.contents().each((_, child) => {
          if (child.type === "tag") nodeToMarkdown($, child, md);
          else if (child.type === "text" && child.data.trim()) md.push(`${child.data.trim()}`);
        });
      }
    }
  }
}

function extractFromHtml(html, url, tipo) {
  const $ = cheerio.load(html);
  // Selectores del contenido real de LearnPress (campus/lección)
  const main =
    $(".lp-content-area, .learn-press-content, .entry-content, article .wrapper-content, #learn-press-content")
      .first()
      .filter((_, el) => $(el).text().trim().length > 50) ||
    $("#content, main, .site-main").first();

  const md = [];
  md.push(`# ${tipo === "quizz" ? "Evaluación" : "Lección"} — ${CURSO_ACTUAL}`);
  md.push("");
  md.push(`> Fuente: ${url}`);
  md.push(`> Rescatado: ${new Date().toISOString().slice(0, 10)}`);
  md.push("");

  const el = main.length ? main[0] : $("body")[0];
  nodeToMarkdown($, el, md);

  const videos = [];
  $("iframe, video source").each((_, v) => {
    const src = $(v).attr("src");
    if (src) videos.push(src);
  });
  $("a").each((_, a) => {
    const href = $(a).attr("href") || "";
    if (/youtube\.com|youtu\.be/.test(href)) videos.push(href);
  });

  md.push("");
  md.push("## Elementos multimedia");
  md.push(...(videos.length ? [...new Set(videos)].map((v) => `- ${v}`) : ["- (ninguno)"]));
  md.push("");
  return md.join("\n");
}

async function main() {
  const cookies = await login();

  const logs = [];
  const cursosDir = path.join(ROOT, "content", "cursos");
  for (const f of fs.readdirSync(cursosDir).filter((x) => x.endsWith(".md")).sort()) {
    const md = fs.readFileSync(path.join(cursosDir, f), "utf-8");
    const re = /https:\/\/aprecap\.cl\/courses\/([a-z0-9-]+)\/(lessons|quizzes)\/([a-z0-9-]+)\//g;
    let m;
    const vistos = new Set();
    while ((m = re.exec(md)) !== null) {
      const curso = m[1];
      const tipo = m[2];
      const slug = m[3];
      const key = `${curso}/${tipo}/${slug}`;
      if (vistos.has(key)) continue;
      vistos.add(key);
      logs.push({ curso, tipo, slug });
    }
  }

  console.log(`Encontradas: ${logs.length} lecciones/evaluaciones\n`);
  let ok = 0;
  for (const { curso, tipo, slug } of logs) {
    const url = `${WP_URL}/courses/${curso}/${tipo}/${slug}/`;
    CURSO_ACTUAL = curso;
    const outDir = path.join(OUT, curso);
    fs.mkdirSync(outDir, { recursive: true });
    const file = path.join(outDir, `${tipo}-${slug}.md`);
    console.log(`- [${tipo}] ${curso}/${slug}`);
    try {
      const html = await fetchHtml(url, cookies);
      const md = extractFromHtml(html, url, tipo);
      fs.writeFileSync(file, md);
      ok++;
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
    await sleep(700);
  }
  console.log(`\nOK: ${ok}/${logs.length} guardadas en content/lecciones/`);
}

main().catch((err) => {
  console.error("Fallo global:", err);
  process.exit(1);
});