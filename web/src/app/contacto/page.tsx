import type { Metadata } from "next";
import { Boton, WhatsAppButton } from "@/components/Buttons";
import ContactoForm from "@/components/ContactoForm";
import { CONTACTO } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto — OTEC APRECAP",
  description:
    "Contáctanos: Santo Domingo 1160, oficina 407, Metro Plaza de Armas. WhatsApp y teléfonos de OTEC APRECAP.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
            Estamos para ayudarte
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">Contacto</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
            ¿Quieres que te contactemos? Déjanos tus datos y lo haremos tan
            pronto sea posible.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="font-extrabold text-apre-blue">Dirección</h2>
              <p className="mt-2 text-gray-700">{CONTACTO.direccion}</p>
              <p className="mt-1 text-sm text-gray-500">{CONTACTO.metro}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="font-extrabold text-apre-blue">Teléfonos de Contacto Directo</h2>
              <div className="mt-2 space-y-2">
                <p className="text-gray-700 font-semibold flex items-center gap-2">
                  <span>📱</span>
                  <a href={`tel:${CONTACTO.telefono.replace(/\s/g, "")}`} className="hover:text-apre-red transition">
                    {CONTACTO.telefono}
                  </a>
                </p>
                <p className="text-gray-700 font-semibold flex items-center gap-2">
                  <span>📱</span>
                  <a href={`tel:${CONTACTO.telefono2.replace(/\s/g, "")}`} className="hover:text-apre-red transition">
                    {CONTACTO.telefono2}
                  </a>
                </p>
                {CONTACTO.telefonoFijo && (
                  <p className="text-gray-700 font-semibold flex items-center gap-2">
                    <span>☎️</span>
                    <a href={`tel:${CONTACTO.telefonoFijo.replace(/\s/g, "")}`} className="hover:text-apre-red transition">
                      Oficina: {CONTACTO.telefonoFijo}
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="font-extrabold text-apre-blue">Email</h2>
              <p className="mt-2 text-gray-700">
                <a href={`mailto:${CONTACTO.email}`} className="hover:text-apre-red">
                  {CONTACTO.email}
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="font-extrabold text-apre-blue">Horario</h2>
              <p className="mt-2 text-gray-700">{CONTACTO.horario}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="font-extrabold text-apre-blue">Redes Sociales</h2>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/aprecapcapacitaciones/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-pink-50 border border-pink-200 px-3.5 py-2 text-xs font-bold text-pink-700 hover:bg-pink-100 transition"
                >
                  <span>📷</span> Instagram
                </a>
                <a
                  href="https://www.facebook.com/p/Aprecap-Capacitaciones-61551079025667/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
                >
                  <span>👥</span> Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-apre-blue">
              Escríbenos
            </h2>
            <p className="mt-2 text-gray-600">
              Completa el formulario y te responderemos a la brevedad.
            </p>
            <div className="mt-6">
              <ContactoForm />
            </div>
            <p className="mt-6 text-gray-600">
              Prefieres otra vía? Responde más rápido por WhatsApp, o escríbenos
              directamente a nuestro correo.
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <WhatsAppButton texto="Hola, quiero información de OTEC APRECAP" />
              <Boton href={`mailto:${CONTACTO.email}`} variant="outline">
                Enviar correo
              </Boton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
