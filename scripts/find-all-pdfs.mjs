import fs from 'node:fs';
import path from 'node:path';

function findPdfs(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findPdfs(fullPath, list);
    } else if (entry.name.toLowerCase().endsWith('.pdf')) {
      list.push({ path: fullPath, name: entry.name });
    }
  }
  return list;
}

const allPdfs = findPdfs('D:/aprecap/content');

console.log(`Total de PDFs encontrados en content/: ${allPdfs.length}`);
for (const p of allPdfs) {
  const sizeMb = (fs.statSync(p.path).size / 1024 / 1024).toFixed(2);
  console.log(`- [${sizeMb} MB] ${p.name} (en ${p.path})`);
}
