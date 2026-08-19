import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — OTEC APRECAP",
  description:
    "Artículos sobre seguridad privada, formación y novedades de OTEC APRECAP.",
};

function extractPreview(body: string): string {
  return body
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !/^#{1,6}\s/.test(l) && !/^!\[/.test(l))
    .join(" ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/#{1,6}\s*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 260);
}

export default function BlogPage() {
  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
            Noticias y Artículos
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">Blog</h1>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-8">
            {blogPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  {p.images.length > 0 && (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-48 w-full object-cover md:h-auto md:w-64"
                    />
                  )}
                  <div className="flex-1 p-6">
                    <h2 className="text-xl font-extrabold text-apre-blue transition group-hover:text-apre-red">
                      {p.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {extractPreview(p.body)}…
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-apre-red">
                      Leer artículo
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
