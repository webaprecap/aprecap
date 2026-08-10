import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config();

const PANEL = "https://aprecap.cl:2222";
const SESSION_FILE = path.resolve(import.meta.dirname, "../session/panel-cookie.txt");

export function sessionCookie() {
  if (fs.existsSync(SESSION_FILE)) return fs.readFileSync(SESSION_FILE, "utf-8").trim();
  return "";
}

export async function panelLogin(force = false) {
  if (!force && sessionCookie()) return sessionCookie();
  const res = await fetch(`${PANEL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "Mozilla/5.0" },
    body: JSON.stringify({
      username: process.env.WP_HOST_USER,
      password: process.env.WP_HOST_PASS,
    }),
  });
  if (res.status !== 200) throw new Error(`Login panel falló (${res.status})`);
  const c = res.headers.getSetCookie()[0];
  if (!c) throw new Error("No session cookie");
  const cookie = c.split(";")[0];
  fs.mkdirSync(path.dirname(SESSION_FILE), { recursive: true });
  fs.writeFileSync(SESSION_FILE, cookie);
  console.log("✓ Sesión panel:", cookie);
  return cookie;
}

export async function panelGet(pathname, cookie = sessionCookie()) {
  const res = await fetch(`${PANEL}${pathname}`, {
    headers: { "User-Agent": "Mozilla/5.0", Cookie: cookie },
  });
  return { status: res.status, json: await res.json().catch(() => null) };
}

export async function panelPut(pathname, body, cookie = sessionCookie()) {
  const res = await fetch(`${PANEL}${pathname}`, {
    method: "PUT",
    headers: { "User-Agent": "Mozilla/5.0", Cookie: cookie, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, json: await res.json().catch(() => null) };
}

export async function panelPost(pathname, body, cookie = sessionCookie()) {
  const res = await fetch(`${PANEL}${pathname}`, {
    method: "POST",
    headers: { "User-Agent": "Mozilla/5.0", Cookie: cookie, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: res.status, json: await res.json().catch(() => null) };
}