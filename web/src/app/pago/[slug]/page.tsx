"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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

export default function PagarCursoPage() {
  const params = useParams<{ slug: string }>();
  const { user, userData } = useAuth();

  const slugInicial = Array.isArray(params?.slug) ? params.slug[0] : params?.slug ?? "";
  const inicial = todos.find((c) => c.slug === slugInicial);
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
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-apre-blue">Pagar por WebPay</h1>
          <p className="mt-2 text-sm text-gray-600">
            Elige el curso, ingresa el monto acordado con APRECAP y paga con tarjeta.
            Luego de coordinarlo con nosotros, tu cupo queda confirmado.
          </p>

          {err && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{err}</p>}

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-apre-blue">Curso *</label>
              <select
                value={cursoSlug}
                onChange={(e) => setCursoSlug(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
              >
                <option value="">Selecciona un curso…</option>
                {todos.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-apre-blue">
                Monto (CLP) * — entre $1.000 y $5.000.000
              </label>
              <input
                type="number"
                min={MONTO_MIN}
                max={MONTO_MAX}
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ej: 120000 — sin puntos (tal como acordamos)"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
              />
              {monto && Number(monto) > 0 && (
                <p className="mt-1 text-sm font-bold text-apre-blue">
                  Total a pagar: ${Number(monto).toLocaleString("es-CL")}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-apre-blue">Email de contacto *</label>
              <input
                type="email"
                value={emailFinal}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@correo.cl"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                Autorizo de manera expresa el tratamiento de mis datos (Nombre, RUT, Correo,
                información de pago) según la{" "}
                <Link href="/privacidad" className="font-bold text-apre-red hover:underline">
                  Política de Privacidad
                </Link>
                . Ley 21.719. *
              </span>
            </label>

            <button
              onClick={manejar}
              disabled={busy}
              className="w-full rounded-xl bg-apre-red px-5 py-3 font-bold text-white transition hover:bg-apre-red-dark disabled:opacity-60"
            >
              {busy ? "Conectando con WebPay…" : "Pagar con WebPay"}
            </button>
            <p className="text-center text-xs text-gray-500">
              Al pagar serás redirigido a la pasarela segura de Transbank (WebPay).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}