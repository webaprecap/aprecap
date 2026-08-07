import type { ReactNode } from "react";

/** Renderiza markdown rescatado de forma segura (sin dangerouslySetInnerHTML). */
export default function Markdown({ children, className = "" }: { children: string; className?: string }) {
  const blocks: ReactNode[] = [];
  const lines = children.split(/\r?\n/);
  let list: string[] | null = null;
  let para: string[] = [];
  let key = 0;

  const flushPara = () => {
    if (para.length) {
      blocks.push(
        <p key={key++} className="mb-4 leading-relaxed text-gray-700">
          {inline(para.join(" "))}
        </p>
      );
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(
        <ul key={key++} className="mb-4 list-disc space-y-1 pl-6 text-gray-700">
          {list.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ul>
      );
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      flushPara();
      flushList();
      const level = Math.min(line.match(/^#+/)![0].length, 3);
      const text = line.replace(/^#+\s*/, "");
      const node = inline(text);
      if (level === 1) blocks.push(<h2 key={key++} className="mb-3 mt-6 text-2xl font-extrabold text-apre-blue">{node}</h2>);
      else if (level === 2) blocks.push(<h3 key={key++} className="mb-2 mt-5 text-xl font-bold text-apre-blue">{node}</h3>);
      else blocks.push(<h4 key={key++} className="mb-2 mt-4 text-lg font-bold text-apre-blue">{node}</h4>);
      continue;
    }
    if (/^[-•*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      flushPara();
      list = list ?? [];
      list.push(line.replace(/^[-•*]\s+/, "").replace(/^\d+\.\s+/, ""));
      continue;
    }
    if (/^!\[/.test(line)) {
      flushPara();
      flushList();
      const m = line.match(/!\[[^\]]*\]\(([^)]+)\)/);
      if (m) {
        blocks.push(
          <img key={key++} src={m[1]} alt="" className="my-4 max-h-80 rounded-xl object-cover" />
        );
      }
      continue;
    }
    para.push(line);
  }
  flushPara();
  flushList();

  return <div className={className}>{blocks}</div>;
}

function inline(text: string): ReactNode {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      out.push(<strong key={i++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      out.push(<em key={i++}>{token.slice(1, -1)}</em>);
    } else {
      const link = token.match(/\[([^\]]+)\]\(([^)\s]+)\)/);
      if (link) {
        out.push(
          <a
            key={i++}
            href={link[2]}
            target={link[2].startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="font-semibold text-apre-blue underline hover:text-apre-red"
          >
            {link[1]}
          </a>
        );
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
