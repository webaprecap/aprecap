import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const API = 'https://aprecap.cl/wp-json/wp/v2';

const OUT = {
  pages: path.join(ROOT, 'content', 'pages'),
  blog: path.join(ROOT, 'content', 'blog'),
  cursos: path.join(ROOT, 'content', 'cursos'),
};

const PAGE_INCLUDE = new Set([
  'inicio',
  'cursos-y-capacitacion',
  'courses',
  'guardias-y-asesorias',
  'contacto',
  'blog',
  'aula-virtual',
  'material-curso-os10',
  'material-curso-supervisor-de-seguridad',
  'material-curso-jefe-de-seguridad',
  'material-curso-operador-cctv',
  'material-curso-operador-de-calderas',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'DigitalUp-Rescue/1.0' } });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn(`  reintento ${i + 1} para ${url}: ${err.message}`);
    }
    await sleep(2000 * (i + 1));
  }
  throw new Error(`No se pudo obtener ${url}`);
}

function sanitizeFilename(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase()
    .replace(/-+/g, '-');
}

function nodeToMarkdown($, el, md = []) {
  const $el = $(el);
  if ($el.is('script, style, noscript, iframe, svg, form, button, input')) return;
  const tag = el.tagName ? el.tagName.toLowerCase() : '';
  const text = $el.text().trim().replace(/\s+/g, ' ');

  switch (tag) {
    case 'h1': md.push(`# ${text}\n`); return;
    case 'h2': md.push(`## ${text}\n`); return;
    case 'h3': md.push(`### ${text}\n`); return;
    case 'h4': md.push(`#### ${text}\n`); return;
    case 'h5': md.push(`##### ${text}\n`); return;
    case 'h6': md.push(`###### ${text}\n`); return;
    case 'p': if (text) md.push(`${text}\n`); return;
    case 'li': {
      const link = $el.find('a').first();
      const item = link.length ? `[${link.text().trim()}](${link.attr('href')})` : text;
      const nested = $el.find('ul, ol');
      md.push(`- ${item}`);
      if (nested.length) nested.each((_, ul) => nodeToMarkdown($, ul, md));
      return;
    }
    case 'ul':
    case 'ol':
      $el.children('li').each((_, li) => nodeToMarkdown($, li, md));
      md.push('');
      return;
    case 'table': {
      const rows = [];
      $el.find('tr').each((_, tr) => {
        const cells = $(tr)
          .find('th, td')
          .map((_, c) => $(c).text().trim().replace(/\s+/g, ' ').replace(/\|/g, '\\|'))
          .get();
        if (cells.length) rows.push(cells);
      });
      if (rows.length) {
        const header = rows[0];
        md.push(`| ${header.join(' | ')} |`);
        md.push(`| ${header.map(() => '---').join(' | ')} |`);
        for (const row of rows.slice(1)) md.push(`| ${row.join(' | ')} |`);
      }
      md.push('');
      return;
    }
    case 'img': {
      const src = $el.attr('src');
      if (src) md.push(`![${$el.attr('alt') || ''}](${src})`);
      return;
    }
    case 'a': return;
    default: {
      const children = $el.children();
      if (!children.length && text) {
        md.push(`${text}`);
      } else {
        $el.contents().each((_, child) => {
          if (child.type === 'tag') nodeToMarkdown($, child, md);
          else if (child.type === 'text' && child.data.trim()) md.push(`${child.data.trim()}`);
        });
      }
    }
  }
}

async function extractPage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'DigitalUp-Rescue/1.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim();
  const main =
    $('#content, #primary, main, .entry-content, .site-main').first() ||
    $('body');

  const md = [];
  md.push(`# ${title}`);
  md.push('');
  md.push(`> Fuente: ${url}`);
  md.push(`> Rescatado: ${new Date().toISOString().slice(0, 10)}`);
  md.push('');

  if (main.length) {
    nodeToMarkdown($, main[0], md);
  } else {
    $('body').contents().each((_, el) => nodeToMarkdown($, el, md));
  }

  const enlaces = [];
  $('main a, #content a, .entry-content a').each((_, a) => {
    const href = $(a).attr('href');
    const t = $(a).text().trim().replace(/\s+/g, ' ');
    if (href && href.startsWith('http') && t) enlaces.push(`- [${t}](${href})`);
  });

  md.push('');
  md.push('## Enlaces encontrados');
  md.push(...(enlaces.length ? [...new Set(enlaces)] : ['- (ninguno)']));
  md.push('');
  return md.join('\n');
}

function normalizeContent(md, url) {
  const head = md.split('\n').slice(0, 6).join('\n');
  const body = md.split('\n').slice(6).join('\n');
  const clean = body
    .split('\n')
    .filter((line) => !/^\s*(Buscar por|Mi cuenta|Ir al contenido|Contáctanos)\s*$/.test(line))
    .join('\n');
  return `${head}\n${clean}`;
}

function slugFor(entry) {
  const label = entry.title?.rendered?.replace(/<[^>]+>/g, '').trim() || entry.slug;
  return `${sanitizeFilename(entry.slug)}`;
}

async function main() {
  for (const dir of Object.values(OUT)) fs.mkdirSync(dir, { recursive: true });

  console.log('=== PAGINAS ===');
  const pages = await getJSON(`${API}/pages?per_page=100`);
  const indexLines = ['# Inventario de contenido rescatado — aprecap.cl', '', `> Generado: ${new Date().toISOString()}`, ''];
  let totalPags = 0;

  for (const page of pages) {
    if (!PAGE_INCLUDE.has(page.slug)) continue;
    const url = page.link;
    console.log(`- ${page.slug} (${url})`);
    try {
      const md = normalizeContent(await extractPage(url), url);
      const file = path.join(OUT.pages, `${slugFor(page)}.md`);
      fs.writeFileSync(file, md);
      indexLines.push(`- [Página] ${page.title.rendered.replace(/<[^>]+>/g, '')} -> \`content/pages/${slugFor(page)}.md\``);
      totalPags++;
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
    await sleep(600);
  }

  console.log('=== BLOG ===');
  const posts = await getJSON(`${API}/posts?per_page=100`);
  for (const post of posts) {
    console.log(`- ${post.slug}`);
    try {
      const md = normalizeContent(await extractPage(post.link), post.link);
      const file = path.join(OUT.blog, `${slugFor(post)}.md`);
      fs.writeFileSync(file, md);
      indexLines.push(`- [Blog] ${post.title.rendered.replace(/<[^>]+>/g, '')} -> \`content/blog/${slugFor(post)}.md\``);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
    await sleep(600);
  }

  console.log('=== CURSOS LEARNPRESS ===');
  const cursos = await getJSON(`${API}/lp_course?per_page=100`);
  for (const curso of cursos) {
    console.log(`- ${curso.slug}`);
    try {
      const md = normalizeContent(await extractPage(curso.link), curso.link);
      const file = path.join(OUT.cursos, `${slugFor(curso)}.md`);
      fs.writeFileSync(file, md);
      indexLines.push(`- [Curso LP] ${curso.title.rendered.replace(/<[^>]+>/g, '')} -> \`content/cursos/${slugFor(curso)}.md\``);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
    await sleep(600);
  }

  indexLines.push('', `## Resumen`, '', `- Páginas: ${totalPags}`, `- Posts: ${posts.length}`, `- Cursos LearnPress: ${cursos.length}`);
  fs.writeFileSync(path.join(ROOT, 'content', 'index.md'), indexLines.join('\n'));
  console.log('\nOK: content/index.md generado');
}

main().catch((err) => {
  console.error('Fallo global:', err);
  process.exit(1);
});
