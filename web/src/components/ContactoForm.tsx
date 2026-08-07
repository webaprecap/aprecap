"use client";

import { useState } from "react";

export default function ContactoForm() {
  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState<"idle" | "ok" | "error">("idle");
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setEstado("idle");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setEstado("ok");
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch {
      setEstado("error");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <label htmlFor="c-nombre" className="text-sm font-semibold text-apre-blue">
          Nombre
        </label>
        <input
          id="c-nombre"
          type="text"
          required
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-apre-red"
        />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm font-semibold text-apre-blue">
          Email
        </label>
        <input
          id="c-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-apre-red"
        />
      </div>
      <div>
        <label htmlFor="c-telefono" className="text-sm font-semibold text-apre-blue">
          Teléfono (opcional)
        </label>
        <input
          id="c-telefono"
          type="tel"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-apre-red"
        />
      </div>
      <div>
        <label htmlFor="c-mensaje" className="text-sm font-semibold text-apre-blue">
          Mensaje
        </label>
        <textarea
          id="c-mensaje"
          required
          rows={5}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-apre-red"
        />
      </div>
      <button
        type="submit"
        disabled={enviando}
        className="inline-flex w-full items-center justify-center rounded-lg bg-apre-red px-6 py-3 font-bold text-white transition hover:bg-apre-red-dark disabled:opacity-60"
      >
        {enviando ? "Enviando..." : "Enviar mensaje"}
      </button>
      {estado === "ok" && (
        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          Mensaje enviado. Te contactaremos pronto.
        </p>
      )}
      {estado === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos a{" "}
          <a className="font-semibold underline" href="mailto:web.aprecap@gmail.com">
            web.aprecap@gmail.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
