import type { Metadata } from "next";
import { CONTACTO } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de Privacidad — OTEC APRECAP",
};

export default function PrivacidadPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold text-apre-blue">
          Política de Privacidad
        </h1>
        <div className="prose mt-8 space-y-6 text-gray-700">
          <p>
            En OTEC APRECAP respetamos tu privacidad y protegemos tus datos
            personales de conformidad con la Ley N° 19.628 y la nueva Ley N°
            21.719 sobre Protección de Datos Personales.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            1. Datos que recopilamos
          </h2>
          <p>
            Recopilamos únicamente los datos necesarios para brindarte nuestros
            servicios: nombre, correo electrónico, teléfono y datos de
            matrícula. Cuando inicias sesión con Google, recibimos tu nombre y
            correo electrónico de tu cuenta.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            2. Uso de tus datos
          </h2>
          <p>
            Tus datos se utilizan exclusivamente para: gestionar tu matrícula,
            comunicarte información de tus cursos, enviar material educativo y
            cumplir obligaciones legales. No vendemos ni cedemos tus datos a
            terceros.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            3. Consentimiento
          </h2>
          <p>
            Al matricularse, se solicita tu consentimiento explícito y
            granular. Puedes revocar tu consentimiento en cualquier momento
            escribiéndonos a {CONTACTO.email}.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            4. Tus derechos (ARCO)
          </h2>
          <p>
            Puedes acceder, rectificar, cancelar u oponerte al tratamiento de
            tus datos, así como solicitar su portabilidad o eliminación
            definitiva, escribiendo a {CONTACTO.email}.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            5. Seguridad
          </h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tus
            datos, incluyendo cifrado en tránsito (TLS) y control de acceso.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            6. Contacto
          </h2>
          <p>
            Ante cualquier consulta sobre esta política, escríbenos a{" "}
            {CONTACTO.email} o llámanos al {CONTACTO.telefono}.
          </p>
        </div>
      </div>
    </section>
  );
}
