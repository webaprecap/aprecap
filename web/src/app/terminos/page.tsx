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
          Términos y Condiciones del Servicio
        </h1>
        <div className="prose mt-8 space-y-6 text-gray-700">
          <h2 className="text-xl font-extrabold text-apre-blue">
            1. Información general y Acreditaciones
          </h2>
          <p>
            <strong>OTEC APRECAP</strong> es un Organismo Técnico de Capacitación acreditado bajo la norma
            chilena NCh 2728:2015 por ICONTEC, autorizado por el Servicio Nacional de Capacitación y Empleo (SENCE),
            y certificado por la Prefectura de Seguridad Privada OS-10 de Carabineros de Chile y la Subsecretaría
            de Prevención del Delito conforme a la Ley N° 21.659.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            2. Matrícula, Identificación y Recolección de RUT
          </h2>
          <p>
            La postulación y matrícula a cualquier programa de capacitación exige la identificación fidedigna del
            postulante mediante su Rol Único Tributario (<strong>RUT</strong>), nombres y apellidos. La recolección
            del RUT es obligatoria para la acreditación académica y la emisión de diplomas y certificados con validez legal.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            3. Emisión de Diplomas y Certificados
          </h2>
          <p>
            El Certificado o Diploma Oficial de aprobación será emitido exclusivamente por la administración de
            APRECAP una vez que el estudiante haya superado el 100% de los módulos y evaluaciones finales con el
            porcentaje mínimo exigido. Los diplomas emitidos cuentan con códigos de validación y firmas de las autoridades académicas.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            4. Uso del Campus Virtual y Clases en Vivo
          </h2>
          <p>
            El material educativo, presentaciones interactivas y accesos a sesiones en vivo por Zoom son de uso
            personal e intransferible del alumno matriculado. Queda estrictamente prohibida la reproducción no autorizada,
            comercialización o cesión de credenciales de acceso a terceros.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            5. Protección de Datos y Privacidad (Ley N° 21.719)
          </h2>
          <p>
            El tratamiento de los datos personales se realiza bajo estricto cumplimiento de la Ley N° 19.628 y la
            Ley N° 21.719. Los titulares pueden ejercer sus derechos ARCO en cualquier momento mediante comunicación a{" "}
            {CONTACTO.email}.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            6. Ciberseguridad (Ley N° 21.663)
          </h2>
          <p>
            La plataforma incorpora controles avanzados de ciberseguridad, incluyendo autenticación multifactor (MFA),
            cifrado en tránsito TLS y auditoría de accesos.
          </p>

          <h2 className="text-xl font-extrabold text-apre-blue">
            7. Ley Aplicable y Jurisdicción
          </h2>
          <p>
            Estos términos se rigen por las leyes de la República de Chile. Para cualquier controversia, las partes
            se someten a la jurisdicción de los tribunales ordinarios de justicia de la ciudad de Santiago.
          </p>
        </div>
      </div>
    </section>
  );
}
