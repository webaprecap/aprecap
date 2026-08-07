"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export const CONSENT_VERSION = "v1.0-Ley21719";

export default function ConsentModal() {
  const { userData, loading, acceptConsent } = useAuth();
  const [saving, setSaving] = useState(false);

  const show =
    !loading && !!userData && userData.ley21719Aceptada !== true;

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="text-2xl font-extrabold text-apre-blue">
          Actualización de Política de Privacidad
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Conforme a la <strong>Ley N° 21.719</strong> sobre Protección de Datos
          Personales (vigente desde el 01/12/2026), necesitamos tu consentimiento
          explícito para tratar tus datos personales: nombre, correo, teléfono y
          datos de matrícula, con el único fin de gestionar tu cuenta, tus cursos
          y la comunicación académica.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          No vendemos ni cedemos tus datos a terceros. Puedes ejercer tus
          derechos ARCO y solicitar tu eliminación desde el panel{" "}
          <em>Mis Datos</em>.
        </p>
        <Link
          href="/privacidad"
          className="mt-2 inline-block text-sm font-bold text-apre-red hover:underline"
        >
          Leer Política de Privacidad completa
        </Link>

        {saving ? (
          <p className="mt-6 text-center text-sm text-gray-500">Guardando consentimiento…</p>
        ) : (
          <button
            onClick={async () => {
              setSaving(true);
              await acceptConsent(CONSENT_VERSION);
              setSaving(false);
            }}
            className="mt-6 w-full rounded-xl bg-apre-red px-5 py-3 font-bold text-white transition hover:bg-apre-red-dark"
          >
            Acepto y continúo
          </button>
        )}
      </div>
    </div>
  );
}
