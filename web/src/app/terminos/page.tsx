import type { Metadata } from "next";
import { CONTACTO } from "@/data/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones — OTEC APRECAP",
};

export default function TerminosPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold text-apre-blue">
          Términos y Condiciones
        </h1>
        <div className="prose mt-8 space-y-6 text-gray-700">
          <h2 className="text-xl font-extrabold text-apre-blue">
            1. Información general
          </h2>
          <p>
            OTEC APRECAP es un Organismo Técnico de Capacitación acreditado por
            SENCE (NCH-2728:2015) y por la Prefectura de Seguridad Privada
            OS-10 de Carabineros de Chile.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            2. Matrícula e inscripción
          </h2>
          <p>
            La inscripción a un curso implica la aceptación de estos términos.
            El alumno debe cumplir con los requisitos de ingreso indicados en
            cada curso. El certificado se otorga al aprobar todas las
            evaluaciones del programa.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            3. Uso del Campus Virtual
          </h2>
          <p>
            El material educativo del Campus Virtual es de uso exclusivo del
            alumno matriculado y no puede ser distribuido ni comercializado.
            Queda prohibido compartir credenciales de acceso.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            4. Contenido
          </h2>
          <p>
            Los programas, materiales y contenidos pueden ser actualizados para
            mantener la vigencia normativa, sin afectar los derechos del alumno
            matriculado.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            5. Responsabilidad
          </h2>
          <p>
            La información publicada en este sitio es referencial. Para
            confirmar condiciones, horarios y valores de cada curso, contacta
            a nuestro equipo en {CONTACTO.email} o al {CONTACTO.telefono}.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            6. Privacidad y Datos (Ley N° 21.719)
          </h2>
          <p>
            El tratamiento de tus datos personales se rige por nuestra Política
            de Privacidad y por la Ley N° 21.719 sobre Protección de Datos
            Personales. Puedes ejercer tus derechos de acceso, rectificación,
            cancelación, oposición y portabilidad escribiendo a {CONTACTO.email}.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            7. Ciberseguridad (Ley N° 21.663)
          </h2>
          <p>
            Adoptamos medidas de ciberseguridad conforme a la Ley N° 21.663:
            autenticación en dos factores para cuentas administrativas,
            cifrado en tránsito, auditoría de eventos críticos y control de
            acceso por roles. Te pedimos no compartir tus credenciales y
            notificarnos cualquier incidente de seguridad a {CONTACTO.email}.
          </p>
          <h2 className="text-xl font-extrabold text-apre-blue">
            8. Ley aplicable
          </h2>
          <p>
            Estos términos se rigen por la legislación de la República de
            Chile. Cualquier controversia será sometida a los tribunales de la
            ciudad de Santiago.
          </p>
        </div>
      </div>
    </section>
  );
}
