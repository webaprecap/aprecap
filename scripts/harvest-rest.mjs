import fs from "node:fs";
import path from "node:path";

const KEY = "x9QpT2wVmN6kLdRz";
const BASE = "https://aprecap.cl/wp-json/wp/v2";
const OUT = path.resolve(import.meta.dirname, "../session/harvest");
const UA = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 Safari/537.36",
};

fs.mkdirSync(OUT, { recursive: true });

async function fetchAll(type) {
  const all = [];
  let page = 1;
  for (;;) {
    const res = await fetch(
      `${BASE}/${type}?per_page=100&page=${page}&aprecap_rescue=${KEY}`,
      { headers: UA }
    );
    if (res.status !== 200) {
      console.log(`${type}: paro (status ${res.status}, page ${page})`);
      break;
    }
    const j = await res.json();
    if (!Array.isArray(j) || j.length === 0) break;
    all.push(...j);
    console.log(`${type}: pág ${page} → ${j.length} (total ${all.length})`);
    if (j.length < 100) break;
    page++;
    await new Promise((r) => setTimeout(r, 500));
  }
  return all;
}

const lessons = await fetchAll("lp_lesson");
const quizzes = await fetchAll("lp_quiz");
const questions = await fetchAll("lp_question");
const courses = await fetchAll("lp_course");

fs.writeFileSync(path.join(OUT, "lp_lesson.json"), JSON.stringify(lessons, null, 1));
fs.writeFileSync(path.join(OUT, "lp_quiz.json"), JSON.stringify(quizzes, null, 1));
fs.writeFileSync(path.join(OUT, "lp_question.json"), JSON.stringify(questions, null, 1));
fs.writeFileSync(path.join(OUT, "lp_course.json"), JSON.stringify(courses, null, 1));
console.log(`\nGuardado: ${lessons.length} lecciones, ${quizzes.length} quizzes, ${questions.length} preguntas, ${courses.length} cursos`);