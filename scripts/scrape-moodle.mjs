import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASE = (process.env.MOODLE_URL || 'https://aprecap.cl/campus').replace(/\/$/, '');
const USER = process.env.MOODLE_USER;
const PASS = process.env.MOODLE_PASS;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DigitalUp-Rescue/1.0';

const OUT_MD = path.join(ROOT, 'content', 'moodle');
const OUT_VID = path.join(ROOT, 'content', 'moodle', 'videos');
const OUT_FILES = path.join(ROOT, 'content', 'moodle', 'files');
const TIMEOUT = 25000;
const DOWNLOAD_TIMEOUT = 180000;

const VIDEOS_EXT = new Set(['.mp4', '.webm', '.mov', '.m4v', '.avi', '.mkv', '.ogv']);
const FILES_EXT = new Set(['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt']);

// ---------- Cookie jar manual ----------
const jar = new Map();
function setCookies(res) {
  try {
    for (const c of res.headers.getSetCookie()) {
      const m = c.match(/^([^=;]+)=([^;]*)/);
      if (m) jar.set(m[1].trim(), m[2].trim());
    }
  } catch {
    const raw = res.headers.get('set-cookie');
    if (raw) {
      for (const c of raw.split(',')) {
        const m = c.match(/^([^=;]+)=([^;]*)/);
        if (m) jar.set(m[1].trim(), m[2].trim());
      }
    }
  }
}
function cookieHeader() {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
}

// ---------- fetch con timeout, reintentos y redirects manuales ----------
async function fetchPage(url, { method = 'GET', body = null, tries = 3, binary = false, stopAtRedirect = false, timeout = TIMEOUT } = {}) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeout);
    try {
      let current = url;
      for (let hop = 0; hop < 8; hop++) {
        const opts = {
          method,
          redirect: 'manual',
          signal: ctrl.signal,
          headers: {
            'User-Agent': UA,
            Accept: binary ? '*/*' : 'text/html,application/xhtml+xml',
            Cookie: cookieHeader(),
          },
        };
        if (body) {
          opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          opts.body = body;
        }
        const res = await fetch(current, opts);
        setCookies(res);
        if (res.status >= 300 && res.status < 400) {
          const loc = res.headers.get('location');
          if (!loc) throw new Error(`Redirect ${res.status} sin Location`);
          if (stopAtRedirect) return { redirect: loc.startsWith('http') ? loc : new URL(loc, current).toString() };
          current = loc.startsWith('http') ? loc : new URL(loc, current).toString();
          method = 'GET';
          body = null;
          continue;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return binary ? Buffer.from(await res.arrayBuffer()) : await res.text();
      }
      throw new Error('Demasiados redirects');
    } catch (err) {
      lastErr = err;
      console.warn(`  [reintento ${i + 1}/${tries}] ${url} -> ${err.message}`);
      await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr;
}

const q = (obj) => new URLSearchParams(obj).toString();
const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- Login ----------
async function login() {
  console.log('Login en Moodle...');
  const html = await fetchPage(`${BASE}/login/index.php`);
  const token = html.match(/name="logintoken" value="([^"]+)"/)?.[1];
  if (!token) throw new Error('No se encontro logintoken');
  const body = q({ username: USER, password: PASS, logintoken: token });
  const after = await fetchPage(`${BASE}/login/index.php`, { method: 'POST', body });
  const logged = /logout\.php|MoodleSession/.test(after) && !/Invalid login|loginerror/.test(after);
  if (!logged) throw new Error('Login fallido: credenciales invalidas');
  console.log('Login OK (sesion admin activa)');
}

// ---------- Lista de cursos ----------
async function listCourses() {
  const html = await fetchPage(`${BASE}/`);
  const ids = [...new Set([...html.matchAll(/course\/view\.php\?id=(\d+)/g)].map((m) => Number(m[1])))];
  const courses = [];
  for (const id of ids) {
    try {
      const page = await fetchPage(`${BASE}/course/view.php?id=${id}`);
      const $ = cheerio.load(page);
      const title = $('title').text().replace(/^Curso:\s*/i, '').trim() || `Curso ${id}`;
      courses.push({ id, title, url: `${BASE}/course/view.php?id=${id}` });
      console.log(`  curso ${id}: ${title}`);
    } catch (err) {
      console.warn(`  curso ${id}: no accesible (${err.message})`);
    }
    await sleep(500);
  }
  return courses;
}

// ---------- Descarga de archivo ----------
async function downloadFile(url, destDir, label) {
  const buf = await fetchPage(url, { binary: true, tries: 3, timeout: DOWNLOAD_TIMEOUT });
  fs.mkdirSync(destDir, { recursive: true });
  const fname = decodeURIComponent(url.split('/').pop().split('?')[0]);
  let finalName = fname.replace(/[^\w.\-]+/g, '_');
  if (!path.extname(finalName)) finalName += '.bin';
  const dest = path.join(destDir, finalName);
  if (fs.existsSync(dest)) {
    console.log(`  [ya existe] ${label} -> ${path.relative(ROOT, dest)}`);
    return dest;
  }
  fs.writeFileSync(dest, buf);
  console.log(`  [descargado] ${label} (${(buf.length / 1024).toFixed(1)} KB) -> ${path.relative(ROOT, dest)}`);
  return dest;
}

function isExternalVideo(u) {
  const lower = u.toLowerCase();
  return /youtube\.com|youtu\.be|vimeo\.com|wistia|vzaar|dailymotion|twitch/.test(lower);
}

// ---------- Procesar un modulo del curso ----------
async function processModule($, li, courseVidDir, courseFileDir, mdLines) {
  const cls = (li.attr('class') || '').split(/\s+/);
  const modType = cls.find((c) => c.startsWith('modtype_'))?.replace('modtype_', '') || 'unknown';
  const link = li.find('a[href*="/mod/"]').first();
  const href = link.attr('href') || '';
  const name = link.find('.instancename').text().trim() || link.text().trim() || '(sin nombre)';
  const idM = href.match(/mod\/(\w+)\/view\.php\?id=(\d+)/);
  const mod = idM ? idM[1] : modType;
  const instId = idM ? Number(idM[2]) : null;
  const full = href.startsWith('http') ? href : `${BASE}${href}`;

  mdLines.push(`- **[${mod}] ${name}** — ${full}`);

  if (!instId) return { type: mod, name, video: null, external: null };

  if (mod === 'resource') {
    try {
      const page = await fetchPage(`${BASE}/mod/resource/view.php?id=${instId}`, { stopAtRedirect: true });
      let files = [];
      if (page.redirect) {
        files = [page.redirect];
      } else if (typeof page === 'string') {
        files = [...new Set([...page.matchAll(/href="(https?:\/\/[^"]*pluginfile\.php[^"]+)"/g)].map((m) => m[1]))];
      }
      for (const f of files) {
        const ext = path.extname(f.split('?')[0]).toLowerCase();
        if (VIDEOS_EXT.has(ext)) {
          const dest = await downloadFile(f, courseVidDir, name);
          mdLines.push(`    - Video: \`${path.relative(ROOT, dest)}\``);
        } else if (FILES_EXT.has(ext)) {
          const dest = await downloadFile(f, courseFileDir, name);
          mdLines.push(`    - Archivo: \`${path.relative(ROOT, dest)}\``);
        } else {
          mdLines.push(`    - Archivo: ${f}`);
        }
      }
    } catch (err) {
      mdLines.push(`    - (error al leer resource: ${err.message})`);
    }
    return { type: mod, name };
  }

  if (mod === 'url') {
    try {
      const page = await fetchPage(`${BASE}/mod/url/view.php?id=${instId}`);
      const $u = cheerio.load(page);
      let dest = '';
      dest =
        $u('meta[http-equiv="refresh"]').attr('content')?.match(/url=([^"']+)/)?.[1] || '';
      if (!dest)
        dest = $u('.urlworkaround a[href^="http"]').first().attr('href') || '';
      if (!dest)
        dest = $u('a.btn[href^="http"]')
          .filter((_, el) => !$u(el).attr('href').includes('aprecap.cl'))
          .first()
          .attr('href') || '';
      if (!dest)
        dest =
          page.match(/window\.location(?:\s*\.href)?\s*=\s*'([^']+)'/)?.[1] ||
          page.match(/window\.location(?:\s*\.href)?\s*=\s*"([^"]+)"/)?.[1] ||
          '';
      if (dest) {
        if (dest.startsWith('/')) dest = new URL(dest, BASE).toString();
        mdLines.push(`    - Destino: ${dest}`);
        if (isExternalVideo(dest)) mdLines.push(`    - → Video externo (${new URL(dest).hostname}) — NO descargado`);
      } else {
        mdLines.push(`    - (no se pudo extraer destino)`);
      }
      return { type: mod, name, external: dest };
    } catch (err) {
      mdLines.push(`    - (error al leer url: ${err.message})`);
    }
  }

  if (mod === 'page' || mod === 'folder' || mod === 'book') {
    try {
      const page = await fetchPage(`${BASE}/mod/${mod}/view.php?id=${instId}`);
      const $p = cheerio.load(page);
      const body = $p('#region-main, .content, #intro').text().replace(/\s+/g, ' ').trim();
      if (body) mdLines.push(`    - Contenido: ${body.slice(0, 600)}`);
      const files = [...new Set([...page.matchAll(/(?:href|src)="(https?:\/\/[^"]*pluginfile\.php[^"]+)"/g)].map((m) => m[1]))];
      for (const f of files) {
        const ext = path.extname(f.split('?')[0]).toLowerCase();
        if (VIDEOS_EXT.has(ext)) {
          const dest = await downloadFile(f, courseVidDir, name);
          mdLines.push(`    - Video: \`${path.relative(ROOT, dest)}\``);
        }
      }
    } catch (err) {
      mdLines.push(`    - (error al leer ${mod}: ${err.message})`);
    }
  }

  return { type: mod, name };
}

// ---------- Procesar un curso completo ----------
async function processCourse(course) {
  console.log(`\n=== Curso: ${course.title} (id ${course.id}) ===`);
  const page = await fetchPage(course.url);
  const $ = cheerio.load(page);

  const title = $('h1, .page-header-headings h1').first().text().trim() || course.title;
  const summary = $('#course-summary, .course-summary, .summarytext').first().text().replace(/\s+/g, ' ').trim();

  const vidDir = path.join(OUT_VID, `${slug(title)}`);
  fs.mkdirSync(vidDir, { recursive: true });
  const fileDir = path.join(OUT_FILES, `${slug(title)}`);
  fs.mkdirSync(fileDir, { recursive: true });

  const mdLines = [];
  mdLines.push(`# ${title}`);
  mdLines.push('');
  mdLines.push(`> URL: ${course.url}`);
  mdLines.push(`> ID Moodle: ${course.id}`);
  mdLines.push(`> Rescatado: ${new Date().toISOString().slice(0, 10)}`);
  mdLines.push('');
  if (summary) {
    mdLines.push('## Resumen');
    mdLines.push('');
    mdLines.push(summary);
    mdLines.push('');
  }

  const stats = { videos: 0, externos: 0 };
  const modules = [];
  $('li.activity').each((_, li) => {
    if ($(li).find('a[href*="/mod/"]').length) modules.push($(li));
  });
  for (const li of modules) {
    const r = await processModule($, $(li), vidDir, fileDir, mdLines);
    if (r?.type === 'url' && r.external) stats.externos++;
    if (r?.type === 'resource' || r?.type === 'page' || r?.type === 'folder') stats.videos++;
    await sleep(300);
  }

  mdLines.push('');
  const out = path.join(OUT_MD, `${slug(title)}.md`);
  fs.writeFileSync(out, mdLines.join('\n'));
  console.log(`OK -> ${path.relative(ROOT, out)}`);
  return { course, stats, mdFile: out };
}

// ---------- Main ----------
async function main() {
  if (!USER || !PASS) {
    console.error('Faltan MOODLE_USER/MOODLE_PASS en .env');
    process.exit(1);
  }
  fs.mkdirSync(OUT_MD, { recursive: true });
  fs.mkdirSync(OUT_VID, { recursive: true });

  await login();
  const courses = await listCourses();
  console.log(`\nTotal cursos: ${courses.length}`);

  const index = ['# Campus Virtual (Moodle) — Inventario', '', `> Generado: ${new Date().toISOString()}`, ''];
  for (const course of courses) {
    const result = await processCourse(course);
    const vidCount = fs.existsSync(path.join(OUT_VID, `${slug(result.course.title)}`))
      ? fs.readdirSync(path.join(OUT_VID, `${slug(result.course.title)}`)).length
      : 0;
    index.push(
      `- **${result.course.title}** (id ${result.course.id}) — \`content/moodle/${slug(result.course.title)}.md\` — ${vidCount} videos propios, ${result.stats.externos} videos externos`
    );
    await sleep(800);
  }
  fs.writeFileSync(path.join(OUT_MD, 'index.md'), index.join('\n'));
  console.log('\nOK: content/moodle/index.md generado');
}

main().catch((err) => {
  console.error('Fallo global:', err);
  process.exit(1);
});
