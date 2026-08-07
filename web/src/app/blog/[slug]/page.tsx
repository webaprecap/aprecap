import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Boton, WhatsAppButton } from "@/components/Buttons";
import Markdown from "@/components/Markdown";
import { blogPosts } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) return { title: "Artículo no encontrado — OTEC APRECAP" };
  return {
    title: `${p.title} — OTEC APRECAP`,
    description: p.body.slice(0, 160),
  };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
          Blog APRECAP
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-apre-blue">{p.title}</h1>
        {p.images.length > 0 && (
          <img
            src={p.images[0]}
            alt={p.title}
            className="mt-8 w-full rounded-2xl object-cover"
          />
        )}
        <Markdown className="mt-8">{p.body}</Markdown>
        <div className="mt-12 rounded-2xl bg-gray-50 p-8 text-center">
          <h2 className="text-xl font-extrabold text-apre-blue">
            ¿Te interesa capacitarte en seguridad?
          </h2>
          <p className="mt-2 text-gray-600">
            Contáctanos por WhatsApp y te asesoramos con los cursos de OTEC
            APRECAP.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <WhatsAppButton />
            <Boton href="/cursos" variant="red">
              Ver cursos
            </Boton>
          </div>
        </div>
      </div>
    </article>
  );
}
