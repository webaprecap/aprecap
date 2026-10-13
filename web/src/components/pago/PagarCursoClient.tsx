"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { cursosLP } from "@/data/cursos";
import { cursosOtec } from "@/data/cursos-otec";

const MONTO_MIN = 1000;
const MONTO_MAX = 5_000_000;

const todos = [
  ...cursosLP.map((c) => ({ slug: c.slug, title: c.title })),
  ...cursosOtec.map((c) => ({ slug: c.slug, title: c.title })),
];

export default function PagarCursoClient({ slug }: { slug: string }) {
  const { user, userData } = useAuth();

  const inicial = todos.find((c) => c.slug === slug);
  const [cursoSlug, setCursoSlug] = useState(inicial?.slug ?? "");
  const [monto, setMonto] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [consent, setConsent] = useState(false);
  const [email, setEmail] = useState("");
  const emailFinal = email || user?.email || "";

  const manejar = async () => {
    setErr("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFinal)) return setErr("Ingresa un email válido.");
    const m = Number(monto);
    if (!Number.isInteger(m) || m < MONTO_MIN || m > MONTO_MAX)
      return setErr(`El monto debe estar entre $${MONTO_MIN.toLocaleString("es-CL")} y $${MONTO_MAX.toLocaleString("es-CL")}.`);
    if (!consent) return setErr("Debes aceptar el consentimiento de datos (Ley 21.719).");
    setBusy(true);
    try {
      const res = await fetch("/api/webpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cursoSlug,
          monto: m,
          email: emailFinal,
          consent,
          uid: user?.uid ?? "",
          nombre: userData?.nombre || user?.displayName || "",
          userAgent: navigator.userAgent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al iniciar el pago.");
      window.location.href = data.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "No se pudo iniciar el pago. Intenta de nuevo.");
      setBusy(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 text-white min-h-[80vh]">
      <div className="mx-auto max-w-xl px-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-300">
            <span>💳</span> Pago Seguro Webpay Plus (Transbank)
          </div>
          <h1 className="mt-3 text-2xl md:text-3xl font-black">
            Pago Online de Matrícula o Cuota
          </h1>
          <p className="mt-2 text-xs md:text-sm text-slate-300">
            Paga en cuotas con tarjeta de crédito o débito a través del portal oficial de Transbank.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Curso / Programa
              </label>
              <select
                value={cursoSlug}
                onChange={(e) => setCursoSlug(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="">Selecciona un curso</option>
                {todos.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Monto a pagar (CLP $)
              </label>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ej: 50000"
                min={MONTO_MIN}
                max={MONTO_MAX}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Mínimo: ${MONTO_MIN.toLocaleString("es-CL")} · Máximo: ${MONTO_MAX.toLocaleString("es-CL")}
              </p>
            </div>

            {!user && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Correo Electrónico del Alumno
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu-correo@ejemplo.cl"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-0"
                />
                <span>
                  Acepto el tratamiento de datos para la gestión del pago y matrícula según la Ley N° 21.719 y los{" "}
                  <Link href="/terminos" prefetch={false} className="underline text-cyan-400 hover:text-cyan-300">
                    términos del servicio
                  </Link>.
                </span>
              </label>
            </div>

            {err && (
              <div className="rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300">
                ⚠️ {err}
              </div>
            )}

            <button
              type="button"
              onClick={manejar}
              disabled={busy || !monto || !cursoSlug}
              className="mt-4 w-full rounded-xl bg-cyan-400 py-3 text-xs md:text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {busy ? "Conectando con Transbank..." : `Continuar a Webpay · $${Number(monto || 0).toLocaleString("es-CL")}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
