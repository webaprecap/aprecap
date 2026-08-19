import { CONTACTO } from "@/data/site";
import ScrollReveal from "./ScrollReveal";

export default function GoogleMapLocation() {
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${CONTACTO.direccion}, Santiago, Chile`
  )}`;
  const iframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${CONTACTO.direccion}, Santiago, Chile`
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="border-t border-gray-100 bg-slate-50 py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-blue/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-apre-blue">
              <span>📍</span> Sede Central APRECAP
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-apre-blue md:text-4xl">
              Encuéntranos en Santiago Centro
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Visítanos para inscripciones presenciales, asesorías técnicas de seguridad privada o
              retiro de tus diplomas y certificados oficiales.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Tarjeta de Información */}
          <div className="space-y-4 lg:col-span-5">
            <ScrollReveal animation="fade-right" delay={150} duration={700}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 transition hover:shadow-md">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-apre-red/10 text-xl text-apre-red">
                    🏢
                  </span>
                  <div>
                    <h3 className="font-extrabold text-apre-blue">Dirección</h3>
                    <p className="text-sm text-gray-700">{CONTACTO.direccion}</p>
                    <p className="mt-0.5 text-xs font-semibold text-gray-500">{CONTACTO.metro}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-apre-blue/10 text-xl text-apre-blue">
                    🕒
                  </span>
                  <div>
                    <h3 className="font-extrabold text-apre-blue">Horario de Atención</h3>
                    <p className="text-sm text-gray-700">{CONTACTO.horario}</p>
                    <p className="mt-0.5 text-xs text-emerald-600 font-bold">Atención Continua</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-whatsapp/10 text-xl text-whatsapp">
                    📞
                  </span>
                  <div>
                    <h3 className="font-extrabold text-apre-blue">Contacto Directo</h3>
                    <p className="text-sm text-gray-700">
                      <a href={`tel:${CONTACTO.telefono.replace(/\s/g, "")}`} className="hover:text-apre-red font-bold">
                        {CONTACTO.telefono}
                      </a>
                    </p>
                    <p className="text-xs text-gray-500">{CONTACTO.email}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-apre-blue px-4 py-3 text-xs font-extrabold text-white transition hover:bg-apre-blue/90 shadow-sm"
                  >
                    <span>🗺️</span>
                    <span>Abrir en Google Maps</span>
                  </a>
                  <a
                    href={CONTACTO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-xs font-extrabold text-white transition hover:brightness-105 shadow-sm"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Iframe Interactivo de Google Maps */}
          <div className="lg:col-span-7 h-[380px] relative">
            <ScrollReveal animation="fade-left" delay={250} duration={700} className="h-full">
              <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-md h-full transition hover:shadow-xl">
                <iframe
                  title="Ubicación OTEC APRECAP en Google Maps"
                  src={iframeSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
