import type { DatosContacto } from "./types";

export const SITE_NAME = "OTEC APRECAP";
export const SITE_TAGLINE =
  "Capacitación · Asesorías · Seguridad Privada";

export const CONTACTO: DatosContacto = {
  direccion: "Santo Domingo 1160, oficina 407",
  metro: "Metro Plaza de Armas, salida línea 3, Catedral con Bandera",
  telefono: "+569 5402 4935",
  telefono2: "+562 24367 0572",
  whatsapp: "+569 5402 4935",
  whatsappLink: "https://wa.me/56954024935",
  email: "contacto@institutoaprecap.cl",
  email2: "contacto@aprecap.cl",
  horario: "Lunes a viernes, 09:00 a 17:00 hrs",
};

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/cursos", label: "Cursos y Capacitación" },
  { href: "/asesorias", label: "Asesorías" },
  { href: "/carta-del-director", label: "Carta del Director" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];
