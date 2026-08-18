"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const CURSOS_CERTIFICADO = [
  {
    slug: "guardia-de-seguridad",
    nombre: "CURSO DE FORMACIÓN DE GUARDIA DE SEGURIDAD OS-10",
    horas: "90",
  },
  {
    slug: "operador-cctv-y-alarmas",
    nombre: "CURSO DE OPERADOR DE CCTV Y ALARMAS",
    horas: "40",
  },
  {
    slug: "supervisor-de-seguridad",
    nombre: "CURSO DE SUPERVISOR DE SEGURIDAD PRIVADA",
    horas: "140",
  },
  {
    slug: "jefe-de-seguridad-privada",
    nombre: "CURSO DE JEFE DE SEGURIDAD PRIVADA",
    horas: "140",
  },
  {
    slug: "baston-y-esposas",
    nombre: "CURSO DE BASTÓN Y ESPOSAS",
    horas: "8",
  },
];

function fechaHoyLarga(): string {
  const f = new Date();
  const dia = f.getDate();
  const mes = f.toLocaleDateString("es-CL", { month: "long" });
  const anio = f.getFullYear();
  return `${dia} de ${mes} de ${anio}`;
}

export default function CertificadoPage() {
  const { userData } = useAuth();
  const [nombre, setNombre] = useState<string>("");
  const [cursoSlug, setCursoSlug] = useState<string>("");

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
      <section className="bg-apre-blue text-white py-8">
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
          <Link
            href="/panel/alumno"
            className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
          >
            ← Volver a mi Panel
          </Link>
        </div>
      </section>

      <section className="bg-slate-100 py-8 min-h-[75vh]">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-12">
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
                onClick={() => window.print()}
                className="w-full rounded-xl bg-apre-red py-3 text-sm font-black text-white transition hover:bg-apre-red-dark shadow-sm"
              >
                🖨 Imprimir / Guardar como PDF
              </button>
            </div>
          </aside>

          {/* Diploma */}
          <main className="lg:col-span-8">
            <div className="certificado-aprecap mx-auto max-w-4xl rounded-sm bg-white p-2 shadow-lg">
              <div className="border-4 border-double border-apre-blue p-6 md:p-10">
                <div className="text-center">
                  <img
                    src="/logo/logo.png"
                    alt="APRECAP"
                    className="mx-auto h-20 w-20 object-contain"
                  />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-apre-blue">
                    Organismo Técnico de Capacitación Acreditado por ICONTEC NCH 2728:2015
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                    Autorizada por SENCE · Servicio Nacional de Capacitación y Empleo · Ministerio
                    del Trabajo y Previsión Social
                  </p>
                  <p className="mt-2 text-sm font-bold text-apre-blue">
                    Aprecap Spa · Centro de Capacitación y Desarrollo Humano
                  </p>
                  <p className="text-[11px] italic text-gray-500">Otorga el presente</p>

                  <h2 className="mt-3 font-serif text-4xl font-black uppercase tracking-[0.3em] text-apre-red md:text-5xl">
                    Certificado
                  </h2>

                  <p className="mt-6 text-xs uppercase tracking-widest text-gray-500">A</p>
                  <p className="mx-auto mt-1 max-w-xl font-serif text-2xl font-bold uppercase text-gray-900 md:text-3xl">
                    {nombreEfectivo || "—"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-600">
                    RUT: <span className="font-mono">{rut}</span>
                  </p>

                  <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-700">
                    Por su participación y aprobación en el curso de:
                  </p>
                  <p className="mx-auto mt-2 max-w-2xl font-serif text-lg font-bold uppercase text-apre-blue">
                    “{cursoEfectivo.nombre}”
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Duración: {cursoEfectivo.horas} horas
                  </p>
                </div>

                <div className="mt-10 flex items-end justify-between gap-6">
                  <div className="flex-1 text-center">
                    <div className="mx-auto w-48 border-t-2 border-gray-400 pt-2" />
                    <p className="text-xs font-bold text-gray-800">Lorena Ortiz Rojas</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Directora Académica
                    </p>
                  </div>
                  <div className="hidden h-16 w-16 items-center justify-center rounded-full border-2 border-apre-red/40 md:flex">
                    <span className="text-[9px] font-black uppercase text-apre-red">Aprecap</span>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="mx-auto w-48 border-t-2 border-gray-400 pt-2" />
                    <p className="text-xs font-bold text-gray-800">Ercio Saavedra Aravena</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Director · Gerente
                    </p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-xs font-semibold text-gray-600">
                    Santiago, {fechaHoyLarga()}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-apre-blue">www.aprecap.cl</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
