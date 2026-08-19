import type { Metadata } from "next";
import { Boton, WhatsAppButton } from "@/components/Buttons";

export const metadata: Metadata = {
  title: "Carta del Director — OTEC APRECAP",
  description:
    "La historia de Ercio Saavedra Aravena, socio fundador de APRECAP SpA: más de tres décadas dedicadas a la seguridad privada, con respeto por los derechos humanos.",
};

export default function CartaDirectorPage() {
  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
            Carta del Director
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight">
            Una trayectoria dedicada a la{" "}
            <span className="text-apre-red">Seguridad Privada</span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Ercio Saavedra Aravena · Socio Fundador de APRECAP SpA
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="leading-relaxed text-gray-700">
            <p>
              Mi historia en la seguridad privada comenzó en el año{" "}
              <strong>1989</strong>, cuando inicié mi camino como Instructor de
              Seguridad Privada en la empresa{" "}
              <strong>“Seguridad y Servicios S.A.”</strong>, reconocida en
              aquella época como una empresa escuela del sector.
            </p>
            <p className="mt-4">
              Desde entonces, han sido más de tres décadas de aprendizaje,
              desafíos y experiencias que me han permitido conocer la seguridad
              privada desde distintas perspectivas: como instructor,
              profesional, asesor y responsable de operaciones.
            </p>
            <p className="mt-4">
              Durante mi trayectoria tuve la oportunidad de desempeñarme como{" "}
              <strong>Jefe de Seguridad, Subgerente y Gerente de
              Operaciones</strong>, en diversas empresas, asumiendo importantes
              responsabilidades administrativas y operacionales, enfrentando
              diariamente las exigencias que implica dirigir equipos,
              planificar servicios, gestionar recursos y responder ante las
              distintas situaciones que se presentan en el ámbito de la
              seguridad.
            </p>
            <p className="mt-4">
              Pero la experiencia laboral por sí sola no era suficiente.
              Comprendí que para seguir creciendo y aportar de mejor manera a
              este sector debía continuar preparándome. Así comenzó otro
              desafío personal: <strong>trabajar y estudiar al mismo
              tiempo</strong>, con esfuerzo y sacrificio, para obtener formación
              y títulos que me permitieran mantenerme actualizado y preparado
              frente a las nuevas exigencias de la seguridad privada.
            </p>
            <p className="mt-4">
              Ese esfuerzo me permitió complementar la experiencia adquirida en
              terreno con conocimientos académicos y profesionales,
              desarrollándome posteriormente como{" "}
              <strong>Asesor y Relator de Seguridad Privada</strong>,
              participando en procesos de capacitación y asesoría, y llevando
              también estos conocimientos a la práctica.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border-l-4 border-apre-red bg-gray-50 p-8">
            <h2 className="text-2xl font-extrabold text-apre-blue">
              EL NACIMIENTO DE APRECAP
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-gray-700">
              <p>
                En el año <strong>2022</strong>, decidí transformar toda esta
                experiencia en un proyecto que tuviera un propósito claro:
                aportar a la <strong>profesionalización de la seguridad
                privada</strong> a través de la capacitación y la asesoría.
              </p>
              <p>
                Así nace <strong>APRECAP SPA, Capacitación y Asesorías en
                Seguridad Privada</strong>.
              </p>
              <p>
                Aprecap representa para mí mucho más que una empresa. Es la
                continuación de un camino iniciado hace décadas, donde cada
                experiencia, cada desafío y cada aprendizaje se transforma hoy
                en conocimiento para quienes desean ingresar, desarrollarse y
                crecer profesionalmente en el mundo de la seguridad.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-extrabold text-apre-blue">
              Nuestro compromiso
            </h2>
            <p className="mt-3 text-gray-700">
              Entregamos una capacitación basada en tres pilares fundamentales:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  emoji: "🛡️",
                  titulo: "Experiencia en terreno",
                  desc: "Más de tres décadas de trabajo real en seguridad privada.",
                },
                {
                  emoji: "📘",
                  titulo: "Conocimiento",
                  desc: "Formación académica y normativa permanentemente actualizada.",
                },
                {
                  emoji: "🤝",
                  titulo: "Compromiso",
                  desc: "Con nuestros alumnos y clientes, en cada etapa de su formación.",
                },
              ].map((p) => (
                <div
                  key={p.titulo}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center"
                >
                  <div className="text-3xl">{p.emoji}</div>
                  <h3 className="mt-3 font-extrabold text-apre-blue">{p.titulo}</h3>
                  <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 leading-relaxed text-gray-700">
              Porque creemos que capacitar no es solamente transmitir
              conocimientos. Es entregar herramientas, experiencia y valores
              que permitan a cada persona desempeñarse con mayor seguridad,
              responsabilidad y profesionalismo.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Después de tantos años en este camino, mantengo intacta la
              motivación de seguir aprendiendo, enseñando y aportando.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Esta es mi historia. Esta es parte de la historia de Aprecap. Y
              este es nuestro compromiso:{" "}
              <strong>
                formar profesionales preparados para los desafíos de la
                seguridad privada del presente y del futuro.
              </strong>
            </p>
          </div>

          <div className="mt-12 rounded-2xl bg-apre-blue p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
              APRECAP, CAPACITACIÓN Y ASESORÍAS
            </p>
            <ul className="mt-4 space-y-2 text-lg font-semibold">
              <li>• Experiencia que enseña.</li>
              <li>• Conocimiento que prepara.</li>
              <li>• Compromiso que nos distingue.</li>
            </ul>
            <div className="mt-8 text-right">
              <p className="font-serif text-xl italic">Ercio Saavedra Aravena</p>
              <p className="text-sm text-white/70">
                Socio Fundador · Director de APRECAP SpA
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-extrabold text-apre-blue">
            Nuestra Esencia
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            Nos guía el respeto por las personas: creemos en una seguridad
            privada que protege derechos, dignidad y convivencia.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <span className="text-xs font-black uppercase tracking-widest text-apre-red">
                Misión
              </span>
              <p className="mt-3 leading-relaxed text-gray-700">
                Formar profesionales de la seguridad privada con excelencia
                técnica y un profundo respeto por los{" "}
                <strong>derechos humanos</strong>, la{" "}
                <strong>dignidad de las personas</strong> y el Estado de
                Derecho, entregando herramientas, experiencia y valores para
                desempeñarse con seguridad, responsabilidad y profesionalismo.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <span className="text-xs font-black uppercase tracking-widest text-apre-red">
                Visión
              </span>
              <p className="mt-3 leading-relaxed text-gray-700">
                Llegar a ser líderes en la capacitación y asesoría de seguridad
                privada, reconocidos por formar profesionales íntegros que
                protegen a las personas, sus bienes e información con{" "}
                <strong>responsabilidad, respeto y compromiso social</strong>,
                contribuyendo a un país más seguro y equitativo.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <span className="text-xs font-black uppercase tracking-widest text-apre-red">
                Valores
              </span>
              <p className="mt-3 leading-relaxed text-gray-700">
                Nos guían la <strong>honestidad</strong>, la{" "}
                <strong>transparencia</strong>, la{" "}
                <strong>responsabilidad social</strong> y la{" "}
                <strong>inclusión</strong>. Promovemos el respeto por los
                derechos humanos y la dignidad de todas las personas,{" "}
                <strong>rechazando toda forma de discriminación</strong>, y la
                mejora continua como pilar de nuestra cultura.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Boton href="/cursos" variant="red">
              Ver nuestros cursos
            </Boton>
            <WhatsAppButton texto="Hola, quiero saber más sobre APRECAP" />
          </div>
        </div>
      </section>
    </>
  );
}
