"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function PrivacidadPanel() {
  const { user, userData } = useAuth();
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const llamarApi = async (accion: "export" | "delete") => {
    if (!user) return;
    setBusy(true);
    setMsg("");
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/privacidad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion, token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      if (accion === "export") {
        const blob = new Blob([JSON.stringify(data.data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mis-datos-aprecap-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setMsg("Datos exportados. Revisa tu descarga.");
      } else {
        setMsg("Cuenta eliminada. Serás redirigido…");
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="text-xl font-extrabold text-apre-blue">Mis Datos (Derechos ARCO)</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Conforme a la Ley N° 21.719 puedes acceder, exportar y eliminar tus
        datos personales en cualquier momento.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => llamarApi("export")}
          disabled={busy}
          className="rounded-xl bg-apre-blue px-5 py-2.5 text-sm font-bold text-white transition hover:bg-apre-blue-light disabled:opacity-50"
        >
          {busy ? "Procesando…" : "Descargar mis datos (JSON)"}
        </button>
        <button
          onClick={() => {
            if (confirm("¿Eliminar tu cuenta y todos tus datos? Esta acción no se puede deshacer.")) {
              llamarApi("delete");
            }
          }}
          disabled={busy}
          className="rounded-xl bg-apre-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-apre-red-dark disabled:opacity-50"
        >
          Eliminar mi cuenta
        </button>
      </div>
      {msg && (
        <p className="mt-3 text-sm font-semibold text-apre-blue">{msg}</p>
      )}
      {userData && (
        <p className="mt-4 text-xs text-gray-500">
          Cuenta: {userData.email} · Rol: {userData.rol} · Ley 21.719:{" "}
          {userData.ley21719Aceptada ? "aceptada" : "pendiente"}
        </p>
      )}
    </div>
  );
}
