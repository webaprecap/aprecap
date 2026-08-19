"use client";

import { useEffect, useState } from "react";

type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
};

const COOKIE_KEY = "aprecap_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({ necessary: true, analytics: false });

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePrefs = (cookiePrefs: CookiePrefs) => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({ ...cookiePrefs, date: new Date().toISOString(), version: "v1.0" })
    );
    setVisible(false);
  };

  const acceptAll = () => savePrefs({ necessary: true, analytics: true });
  const acceptNecessary = () => savePrefs({ necessary: true, analytics: false });
  const saveCustom = () => savePrefs(prefs);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 print:hidden">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🍪</span>
          <p className="text-sm leading-relaxed text-gray-700">
            Utilizamos cookies propias para asegurar el funcionamiento técnico
            de la plataforma y cookies de terceros para analizar estadísticas
            de uso, conforme a la{" "}
            <strong>Ley N° 21.719 sobre Protección de Datos Personales</strong>.
            Ninguna cookie publicitaria se activará sin tu consentimiento
            explícito.
          </p>
        </div>

        {showConfig ? (
          <div className="mt-4 space-y-3">
            <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
              <input type="checkbox" checked disabled className="mt-0.5" />
              <div>
                <strong className="block text-sm text-apre-blue">Cookies Necesarias</strong>
                <span className="text-xs text-gray-600">
                  Imprescindibles para el funcionamiento del sitio (siempre activas).
                </span>
              </div>
            </label>
            <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                className="mt-0.5"
              />
              <div>
                <strong className="block text-sm text-apre-blue">Cookies de Analítica</strong>
                <span className="text-xs text-gray-600">
                  Nos ayudan a entender cómo se usa la web y a mejorar la experiencia.
                </span>
              </div>
            </label>
            <button
              onClick={saveCustom}
              className="w-full rounded-xl bg-apre-blue py-2.5 text-sm font-bold text-white transition hover:bg-apre-blue-light"
            >
              Guardar Preferencias
            </button>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 rounded-xl bg-apre-red px-4 py-2.5 text-sm font-bold text-white transition hover:bg-apre-red-dark"
            >
              Aceptar Todo
            </button>
            <button
              onClick={acceptNecessary}
              className="flex-1 rounded-xl border-2 border-apre-blue px-4 py-2.5 text-sm font-bold text-apre-blue transition hover:bg-apre-blue hover:text-white"
            >
              Solo Necesarias
            </button>
            <button
              onClick={() => setShowConfig(true)}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 transition hover:bg-gray-100"
            >
              Configurar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
