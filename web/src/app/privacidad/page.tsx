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
          Política de Privacidad y Tratamiento de Datos
        </h1>
        <div className="prose mt-8 space-y-6 text-gray-700">
          <p>
            En <strong>OTEC APRECAP</strong> respetamos tu privacidad y protegemos tus datos
            personales de conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada,
            la Ley N° 21.719 que moderniza la normativa de protección de datos personales, y la
            Ley N° 21.663 sobre Ciberseguridad del Estado de Chile.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            1. Datos que recopilamos y recolección del RUT
          </h2>
          <p>
            Recopilamos los datos personales estrictamente necesarios para la prestación de nuestros
            servicios de capacitación y formación profesional: nombre completo, Rol Único Tributario
            (<strong>RUT</strong>), correo electrónico, número de teléfono y registros de matrícula y avance.
          </p>
          <p className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm leading-relaxed">
            <strong>Tratamiento del RUT:</strong> El RUT del estudiante es un dato identificatorio indispensable
            solicitado obligatoriamente con el único propósito de validar la identidad del alumno, emitir sus
            diplomas y certificados oficiales de aprobación, y reportar la nómina académica ante las entidades
            fiscalizadoras y reguladoras de la seguridad privada en Chile (Carabineros de Chile OS-10, Subsecretaría
            de Prevención del Delito conforme a la Ley N° 21.659 y el Servicio Nacional de Capacitación y Empleo - SENCE).
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            2. Finalidad y uso de tus datos
          </h2>
          <p>
            Tus datos se utilizan exclusivamente para:
          </p>
          <ul className="list-disc space-y-1.5 pl-6 text-sm">
            <li>Gestionar tu postulación, matrícula y acceso al campus y aula virtual.</li>
            <li>Emitir certificados, diplomas e informes de notas con validez oficial.</li>
            <li>Coordinar clases en vivo, material pedagógico y soporte docente.</li>
            <li>Cumplir con las exigencias legales y reglamentarias ante los organismos reguladores.</li>
          </ul>
          <p className="text-sm">
            APRECAP no comercializa, no cede ni transfiere tus datos personales a terceros con fines publicitarios.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            3. Consentimiento informado
          </h2>
          <p>
            Al solicitar acceso o matricularte en cualquiera de nuestros programas, otorgas tu consentimiento
            expreso, libre, previo e informado. Puedes consultar tus registros de consentimiento o solicitar su
            actualización en cualquier momento desde tu panel de usuario o escribiendo a {CONTACTO.email}.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            4. Derechos del Titular (Derechos ARCO)
          </h2>
          <p>
            Conforme a la legislación vigente, puedes ejercer en todo momento tus derechos de Acceso, Rectificación,
            Cancelación, Oposición y Portabilidad de tus datos personales a través del portal de privacidad en tu
            panel o dirigiéndote a {CONTACTO.email}.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            5. Medidas de Seguridad y Ciberseguridad (Ley N° 21.663)
          </h2>
          <p>
            Implementamos estrictas medidas técnicas y organizativas para resguardar la confidencialidad e integridad:
          </p>
          <ul className="list-disc space-y-1.5 pl-6 text-sm">
            <li>Cifrado en tránsito mediante protocolos TLS de alta seguridad.</li>
            <li>Autenticación de dos factores (MFA) para accesos administrativos.</li>
            <li>Control de acceso granular por roles y principio de mínimo privilegio.</li>
            <li>Registro inmutable y auditoría de eventos de seguridad.</li>
          </ul>

          <h2 className="text-xl font-extrabold text-apre-blue">
            6. Contacto y Delegado de Privacidad
          </h2>
          <p>
            Para consultas, rectificación de antecedentes o ejercicio de derechos ARCO, contáctanos en{" "}
            <a href={`mailto:${CONTACTO.email}`} className="font-bold text-apre-red hover:underline">
              {CONTACTO.email}
            </a>{" "}
            o en nuestras oficinas en {CONTACTO.direccion}, Santiago Centro.
          </p>
        </div>
      </div>
    </section>
  );
}
