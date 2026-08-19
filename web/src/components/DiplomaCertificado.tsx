export const CURSOS_CERTIFICADO = [
  {
    slug: "guardia-de-seguridad",
    nombre: "CURSO DE FORMACIÓN DE GUARDIA DE SEGURIDAD OS-10",
    horas: "90",
  },
  {
    slug: "operador-cctv-y-alarmas",
    nombre: "CURSO DE OPERADOR DE CCTV Y ALARMAS",
    horas: "40",
  },
  {
    slug: "supervisor-de-seguridad",
    nombre: "CURSO DE SUPERVISOR DE SEGURIDAD PRIVADA",
    horas: "140",
  },
  {
    slug: "baston-y-esposas",
    nombre: "CURSO DE BASTÓN Y ESPOSAS",
    horas: "8",
  },
];

function fechaHoyLarga(): string {
  const f = new Date();
  const dia = f.getDate();
  const mes = f.toLocaleDateString("es-CL", { month: "long" });
  const anio = f.getFullYear();
  return `${dia} de ${mes} de ${anio}`;
}

export default function DiplomaCertificado({
  nombre,
  rut,
  curso,
}: {
  nombre: string;
  rut: string;
  curso: { nombre: string; horas: string };
}) {
  return (
    <div className="certificado-aprecap mx-auto max-w-4xl rounded-sm bg-white p-2 shadow-lg">
      <div className="border-4 border-double border-apre-blue p-6 md:p-10">
        <div className="text-center">
          <img
            src="/logo/logo.png"
            alt="APRECAP"
            className="mx-auto h-20 w-20 object-contain"
          />
          <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-apre-blue">
            Organismo Técnico de Capacitación Acreditado por ICONTEC NCH 2728:2015
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-600">
            Autorizada por SENCE · Servicio Nacional de Capacitación y Empleo · Ministerio
            del Trabajo y Previsión Social
          </p>
          <p className="mt-2 text-sm font-bold text-apre-blue">
            Aprecap Spa · Centro de Capacitación y Desarrollo Humano
          </p>
          <p className="text-[11px] italic text-gray-500">Otorga el presente</p>

          <h2 className="mt-3 font-serif text-4xl font-black uppercase tracking-[0.3em] text-apre-red md:text-5xl">
            Certificado
          </h2>

          <p className="mt-6 text-xs uppercase tracking-widest text-gray-500">A</p>
          <p className="mx-auto mt-1 max-w-xl font-serif text-2xl font-bold uppercase text-gray-900 md:text-3xl">
            {nombre || "—"}
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-600">
            RUT: <span className="font-mono">{rut}</span>
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-700">
            Por su participación y aprobación en el curso de:
          </p>
          <p className="mx-auto mt-2 max-w-2xl font-serif text-lg font-bold uppercase text-apre-blue">
            “{curso.nombre}”
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-600">
            Duración: {curso.horas} horas
          </p>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6">
          <div className="flex-1 text-center">
            <div className="mx-auto w-48 border-t-2 border-gray-400 pt-2" />
            <p className="text-xs font-bold text-gray-800">Lorena Ortiz Rojas</p>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Directora Académica
            </p>
          </div>
          <div className="hidden h-16 w-16 items-center justify-center rounded-full border-2 border-apre-red/40 md:flex">
            <span className="text-[9px] font-black uppercase text-apre-red">Aprecap</span>
          </div>
          <div className="flex-1 text-center">
            <div className="mx-auto w-48 border-t-2 border-gray-400 pt-2" />
            <p className="text-xs font-bold text-gray-800">Ercio Saavedra Aravena</p>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Director · Gerente
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs font-semibold text-gray-600">
            Santiago, {fechaHoyLarga()}
          </p>
          <p className="mt-1 text-[11px] font-bold text-apre-blue">www.aprecap.cl</p>
        </div>
      </div>
    </div>
  );
}
