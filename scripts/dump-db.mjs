import fs from "node:fs";

const r = await fetch("https://aprecap.cl/?aprecap_dump=k3yDump22xX", {
  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 Safari/537.36" },
});
console.log("status", r.status);
const b = Buffer.from(await r.arrayBuffer());
const f = "D:/aprecap/session/backup/wp-full-dump.json";
fs.mkdirSync("D:/aprecap/session/backup", { recursive: true });
fs.writeFileSync(f, b);
console.log("guardado", f, b.length, "bytes");
try {
  const j = JSON.parse(b.toString("utf8"));
  const tabs = Object.keys(j.tables);
  console.log("tables:", tabs.length);
  console.log(tabs.join(", "));
  console.log("rows por tabla:", tabs.map((t) => `${t}=${j.tables[t].length}`).join(" "));
} catch (e) {
  console.log("no json valido:", e.message, "| head:", b.toString("utf8").slice(0, 200));
}