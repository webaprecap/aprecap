"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PagoResultado() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Cargando resultado…</p>}>
      <PagoResultadoInner />
    </Suspense>
  );
}

function PagoResultadoInner() {
  const params = useSearchParams();
  const estado = params.get("estado") ?? params.get("tbk_estado");
  const detalle = params.get("detalle") ?? "";
  const buyOrder = params.get("bo") ?? "";
  const ok = estado === "0" || estado === "AUTHORIZED";

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-lg px-4">
        <div
          className={`rounded-2xl border p-8 text-center shadow-sm ${
            ok ? "border-green-200 bg-white" : "border-red-200 bg-white"
          }`}
        >
          <div className="text-6xl">{ok ? "✅" : "❌"}</div>
          <h1 className="mt-4 text-2xl font-extrabold text-apre-blue">
            {ok ? "¡Pago aprobado!" : "Pago no confirmado"}
          </h1>
          <p className="mt-2 text-gray-600">
            {ok
              ? "Tu pago con WebPay se ha registrado correctamente. Recibirás la confirmación por correo."
              : detalle || "La transacción no fue aprobada. Intenta nuevamente o escríbenos por WhatsApp."}
          </p>
          {buyOrder && (
            <p className="mt-4 text-xs text-gray-400">
              Orden de compra: <strong>{buyOrder}</strong>
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/panel/alumno"
              className="rounded-xl bg-apre-red px-6 py-3 font-bold text-white transition hover:bg-apre-red-dark"
            >
              Ir a mi panel
            </Link>
            <Link href="/" className="rounded-xl bg-apre-blue px-6 py-3 font-bold text-white">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}