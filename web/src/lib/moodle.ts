// Capa Moodle (REST API) — env-gated.
// Requiere habilitar web services en el campus y un token de administración.
// Consultas de solo lectura para el sitio público.

const MOODLE_URL = process.env.MOODLE_URL;
const MOODLE_TOKEN = process.env.MOODLE_TOKEN;

export function moodleEnabled() {
  return Boolean(MOODLE_URL && MOODLE_TOKEN);
}

export async function moodleCall<T>(functionName: string, params: Record<string, string | number> = {}): Promise<T> {
  if (!moodleEnabled()) throw new Error("Moodle no configurado");
  const url = new URL("/webservice/rest/server.php", MOODLE_URL!);
  url.searchParams.set("wstoken", MOODLE_TOKEN!);
  url.searchParams.set("moodlewsrestformat", "json");
  url.searchParams.set("wsfunction", functionName);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`Moodle API ${res.status}`);
  return res.json() as Promise<T>;
}

export interface MoodleCourse {
  id: number;
  fullname: string;
  shortname: string;
  summary: string;
}

export async function getCourses(): Promise<MoodleCourse[]> {
  return moodleCall<MoodleCourse[]>("core_course_get_courses");
}

export async function getCourseContents(courseId: number) {
  return moodleCall("core_course_get_contents", { courseid: courseId });
}
