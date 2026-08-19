"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import DiplomaCertificado, { CURSOS_CERTIFICADO } from "@/components/DiplomaCertificado";

export default function CertificadoPage() {
  const { userData, signOut } = useAuth();
  const router = useRouter();
  const [nombre, setNombre] = useState<string>("");
  const [cursoSlug, setCursoSlug] = useState<string>("");

  useEffect(() => {
    if (userData && userData.rol === "alumno") {
      router.push("/panel/alumno");
    }
  }, [userData, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const rut = useMemo(() => {
    const r = userData && typeof userData.rut === "string" ? userData.rut : "";
    return r || "—";
  }, [userData]);

  const nombreEfectivo = nombre.trim() || userData?.nombre || "";
  const cursoEfectivo =
    CURSOS_CERTIFICADO.find((c) => c.slug === cursoSlug) ?? CURSOS_CERTIFICADO[0];

  const cambiarCurso = (slug: string) => {
    setCursoSlug(slug);
  };

  return (
    <>
      <section className="bg-apre-blue text-white py-8 print:hidden">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-red border border-apre-red/30">
              <span>📜</span> Diploma Digital APRECAP
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-black">Generador de Certificados</h1>
            <p className="mt-1 text-xs text-white/80">
              Tu diploma se completa automáticamente con tus datos de estudiante, la fecha de hoy
              y el curso aprobado. Solo puedes editar tu nombre.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/panel/alumno"
              className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
            >
              ← Volver a mi Panel
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 shadow-xs"
            >
              <span>🚪</span> Cerrar sesión
            </button>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-8 min-h-[75vh] print:p-0 print:bg-white">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-12 print:block print:p-0">
          {/* Panel de configuración */}
          <aside className="lg:col-span-4 print:hidden">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-apre-blue">
                  Nombre del estudiante (editable)
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={userData?.nombre || "Escribe tu nombre completo"}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-gray-500">
                  Se toma automáticamente de tu perfil; puedes corregirlo antes de imprimir.
                </p>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-wider text-apre-blue">
                  RUT (automático)
                </label>
                <input
                  type="text"
                  value={rut}
                  disabled
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
                />
                <p className="mt-1 text-[11px] text-gray-500">
                  Se obtiene de tu perfil y no es editable.
                </p>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-wider text-apre-blue">
                  Curso aprobado
                </label>
                <select
                  value={cursoSlug || CURSOS_CERTIFICADO[0].slug}
                  onChange={(e) => cambiarCurso(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                >
                  {CURSOS_CERTIFICADO.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.nombre} ({c.horas} horas)
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-gray-500">
                  La fecha se agrega automáticamente según el día de emisión.
                </p>
              </div>

              <button
                onClick={() => {
                  const nombreLimpio = (nombreEfectivo || "Alumno")
                    .trim()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-zA-Z0-9\s-_]/g, "")
                    .replace(/\s+/g, "_");

                  const cursoLimpio = (cursoEfectivo.slug || "curso")
                    .trim()
                    .replace(/[^a-zA-Z0-9\s-_]/g, "")
                    .replace(/\s+/g, "_");

                  const tituloOriginal = typeof document !== "undefined" ? document.title : "";
                  if (typeof document !== "undefined") {
                    document.title = `Certificado_${cursoLimpio}_${nombreLimpio}`;
                  }

                  window.print();

                  setTimeout(() => {
                    if (typeof document !== "undefined" && tituloOriginal) {
                      document.title = tituloOriginal;
                    }
                  }, 2000);
                }}
                className="w-full rounded-xl bg-apre-red py-3 text-sm font-black text-white transition hover:bg-apre-red-dark shadow-sm"
              >
                🖨 Imprimir / Guardar como PDF
              </button>
            </div>
          </aside>

          {/* Diploma */}
          <main className="lg:col-span-8">
            <DiplomaCertificado
              nombre={nombreEfectivo}
              rut={rut}
              curso={cursoEfectivo}
            />
          </main>
        </div>
      </section>
    </>
  );
}
