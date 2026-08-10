import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const DUMP = JSON.parse(fs.readFileSync("D:/aprecap/session/backup/wp-full-dump.json", "utf8"));
const REST = {
  lessons: JSON.parse(fs.readFileSync("D:/aprecap/session/harvest/lp_lesson.json", "utf8")),
  quizzes: JSON.parse(fs.readFileSync("D:/aprecap/session/harvest/lp_quiz.json", "utf8")),
  courses: JSON.parse(fs.readFileSync("D:/aprecap/session/harvest/lp_course.json", "utf8")),
};
const OUT_DIR = "D:/aprecap/content/lecciones";

const posts = Object.fromEntries(DUMP.tables.wpik_posts.map((p) => [p.ID, p]));
const answersByQ = {};
for (const a of DUMP.tables.wpik_learnpress_question_answers) {
  (answersByQ[a.question_id] ??= []).push(a);
}
const quizQuestions = {};
for (const q of DUMP.tables.wpik_learnpress_quiz_questions) {
  (quizQuestions[q.quiz_id] ??= []).push(q);
}
for (const k of Object.keys(quizQuestions)) {
  quizQuestions[k].sort((a, b) => (a.question_order ?? 0) - (b.question_order ?? 0));
}

function mdFromHtml(html) {
  const $ = cheerio.load(`<div id="root">${html || ""}</div>`);
  const md = [];
  nodeToMarkdown($("#root")[0], $, md);
  return md.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function nodeToMarkdown(el, $, md) {
  if (!el || !el.tagName) return;
  const $el = $(el);
  if ($el.is("script, style, noscript, iframe, svg, form, button")) return;
  const tag = el.tagName.toLowerCase();
  const text = $el
    .contents()
    .filter((_, c) => c.type === "text")
    .text()
    .trim();
  switch (tag) {
    case "h1": md.push(`# ${text}`); return;
    case "h2": md.push(`## ${text}`); return;
    case "h3": md.push(`### ${text}`); return;
    case "h4": md.push(`#### ${text}`); return;
    case "p": md.push(`${text}`); return;
    case "blockquote": md.push(`> ${text}`); return;
    case "ul":
    case "ol":
      $el.children("li").each((_, li) => nodeToMarkdown(li, $, md));
      return;
    case "li": {
      md.push(`- ${text}`);
      $el.children("ul, ol").each((_, ul) => nodeToMarkdown(ul, $, md));
      return;
    }
    case "table": {
      const rows = [];
      $el.find("tr").each((_, tr) => {
        const cells = $(tr).find("th, td").map((_, c) => $(c).text().trim().replace(/\s+/g, " ")).get();
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
    case "br":
      md.push("");
      return;
    default:
      $el.contents().each((_, c) => {
        if (c.type === "tag") nodeToMarkdown(c, $, md);
        else if (c.type === "text" && c.data.trim()) md.push(mdFromHtml(c.data));
      });
      if (tag === "div" && md.length && md[md.length - 1] !== "") md.push("");
  }
}

const slug = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const lessonById = Object.fromEntries(REST.lessons.map((l) => [l.id, l]));
const quizById = Object.fromEntries(REST.quizzes.map((q) => [q.id, q]));
const mdOne = (t) => (t || "").trim();
const rel = (p) => p.replace(/\\/g, "/").replace(OUT_DIR.replace(/\\/g, "/"), ".");
const slugOnly = (s) => slug(s);

let nLecciones = 0;
let nQuizzes = 0;
let nPreguntas = 0;

for (const course of REST.courses) {
  if (course.status !== "publish") continue;
  const ld = DUMP.tables.wpik_learnpress_courses.find((x) => String(x.ID) === String(course.id));
  let json = {};
  try {
    json = JSON.parse(ld?.json || "{}");
  } catch {}
  const sections = json.sections_items || [];
  const slugCurso = course.slug || json.post_name;
  const dir = path.join(OUT_DIR, slugCurso);
  fs.mkdirSync(dir, { recursive: true });

  const index = [
    `# ${course.title?.rendered || course.name}`,
    "",
    `> Fuente: ${course.link} | Rescatado: ${course.date_gmt}`,
    "",
    `**Módulos:** ${sections.length}`,
    "",
  ];

  for (const sec of sections) {
    const modDir = path.join(dir, `${String(sec.section_order).padStart(2, "0")}-${slug(sec.section_name)}`);
    fs.mkdirSync(modDir, { recursive: true });
    for (let i = 0; i < (sec.items || []).length; i++) {
      const it = sec.items[i];
      const num = String(i + 1).padStart(2, "0");
      if (it.item_type === "lp_lesson") {
        const l = lessonById[it.item_id];
        const post = l || posts[it.item_id];
        if (!post) continue;
        const html = post.content?.rendered ?? post.post_content;
        const videos = [...new Set((html || "").match(/https?:\/\/[^\s"'<>]+?\.(?:mp4|webm|ogg)[^\s"'<>]*/gi) || [])];
        const file = path.join(modDir, `${num}-${slug(l?.title?.rendered || post.post_title || "leccion")}.md`);
        fs.writeFileSync(
          file,
          [
            `# ${post.title?.rendered || post.post_title || it.title}`,
            "",
            `> Módulo: ${sec.section_name} | Lección ${i + 1}`,
            `> ID WordPress: ${it.item_id}`,
            "",
            mdFromHtml(html),
            videos.length ? `\n## Enlaces de video\n${videos.map((v) => `- ${v}`).join("\n")}` : "",
          ]
            .join("\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim() + "\n",
        );
        index.push(`- ${sec.section_name} › ${post.title?.rendered || post.post_title} — [lección](${rel(file)})`);
        nLecciones++;
      }
      if (it.item_type === "lp_quiz") {
        const qz = quizById[it.item_id];
        if (!qz) continue;
        const lines = [
          `# ${qz.title?.rendered || qz.title}`,
          "",
          `> Módulo: ${sec.section_name} | Evaluación`,
          `> Fuente: ${qz.link}`,
          "",
        ];
        const qids = (quizQuestions[it.item_id] || []).map((x) => posts[x.question_id]).filter(Boolean);
        for (let qi = 0; qi < qids.length; qi++) {
          const q = qids[qi];
          const resp = (answersByQ[q.ID] || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
          lines.push(`**${qi + 1}. ${mdOne(mdFromHtml(q.post_content)) || q.post_title}**`);
          if (!resp.length) {
            lines.push("- (sin opciones registradas)");
          }
          for (const a of resp) {
            lines.push(`- ${a.is_true === "yes" ? "✅" : "⬜"} ${a.title}`);
          }
          lines.push("");
        }
        const file = path.join(modDir, `${num}-quiz-${slugOnly(qz.title?.rendered || "evaluacion")}.md`);
        fs.writeFileSync(file, lines.join("\n").trim() + "\n");
        index.push(`${sec.section_name} — ${qz.title?.rendered || qz.title} — ver [cuestionario](${rel(file)})`);
        nPreguntas += qids.length;
        nQuizzes++;
      }
    }
  }
  fs.writeFileSync(path.join(dir, "_index.md"), index.join("\n"));
  console.log(`✓ ${slugCurso}: ${sections.length} módulos → content/lecciones/${slugCurso}`);
}
console.log(`\nResumen: ${nLecciones} lecciones, ${nQuizzes} quizzes, ${nPreguntas} preguntas en content/lecciones/`);