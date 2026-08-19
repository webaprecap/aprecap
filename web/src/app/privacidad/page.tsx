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
            21.719 sobre Protección de Datos Personales, así como con la Ley N°
            21.663 sobre Ciberseguridad.
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
            5. Seguridad de la información
          </h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tus
            datos, incluyendo cifrado en tránsito (TLS), control de acceso por
            roles, registro de auditoría de eventos sensibles y reglas de
            seguridad en la base de datos.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            6. Ciberseguridad (Ley N° 21.663)
          </h2>
          <p>
            Acatando también la Ley N° 21.663 sobre Ciberseguridad, APRECAP
            protege sus datos mediante:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Autenticación en dos factores (MFA) para cuentas administrativas.</li>
            <li>Cifrado de las comunicaciones y almacenamiento seguro.</li>
            <li>Auditoría de eventos críticos (accesos, consentimientos y cambios).</li>
            <li>Reglas de acceso a datos por rol y mínimo privilegio.</li>
            <li>Revisión y mejora continua de los controles de seguridad.</li>
          </ul>
          <h2 className="text-xl font-extrabold text-apre-blue">
            7. Contacto
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
