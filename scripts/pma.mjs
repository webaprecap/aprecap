import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const PMA_BASE = "https://da004.servidoresph.com/phpMyAdmin";
const COOKIES = [
  "__Secure-pma_lang_https=en",
  "__Secure-phpMyAdmin_https=58rumlk1hnjvtlhfak29mtc4ed",
].join("; ");

let _token = null;
export async function pmaToken(force = false) {
  if (_token && !force) return _token;
  const res = await fetch(`${PMA_BASE}/index.php?route=/`, {
    headers: { "User-Agent": "Mozilla/5.0", Cookie: COOKIES },
  });
  const html = await res.text();
  const m = html.match(/name="token"\s+value="([a-f0-9]{32})"/) || html.match(/token=([a-f0-9]{32})/);
  if (!m) throw new Error("No token en la página de pma");
  _token = m[1];
  return _token;
}

export async function pmaSql(sql, { db = "institutoaprecap_555", maxRows = 2000 } = {}) {
  const token = await pmaToken();
  const form = new URLSearchParams({
    token,
    sql_query: sql,
    db,
    server: "1",
    ajax_request: "false",
    pos: "0",
    limit: `0,${maxRows}`,
  });
  const res = await fetch(`${PMA_BASE}/index.php?route=/sql`, {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: COOKIES,
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: `${PMA_BASE}/index.php?route=/&token=${token}`,
    },
    body: form.toString(),
  });
  const html = await res.text();
  return parseSqlTable(html);
}

export function parseSqlTable(html) {
  const $ = cheerio.load(html);
  const headers = [];
  const rows = [];
  $("table thead th, table tr th").each((_, th) => {
    const t = $(th).text().trim();
    if (t && !headers.includes(t)) headers.push(t);
  });
  $("table tbody tr").each((_, tr) => {
    const cells = $(tr)
      .find("td")
      .map((_, td) => $(td).text().trim())
      .get();
    if (cells.length) rows.push(cells);
  });
  return { headers, rows };
}

export async function pmaUsersBackup() {
  const r = await pmaSql("SELECT ID, user_login, user_email, user_pass FROM wpik_users");
  fs.writeFileSync(path.resolve(import.meta.dirname, "../session/wp-users-backup.json"), JSON.stringify(r, null, 2));
  return r;
}