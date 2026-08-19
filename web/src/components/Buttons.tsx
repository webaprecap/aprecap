import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACTO } from "@/data/site";

export function Boton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "red" | "outline" | "whatsapp";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition";
  const styles = {
    primary: "bg-apre-blue text-white hover:bg-apre-blue-light",
    red: "bg-apre-red text-white hover:bg-apre-red-dark",
    outline: "border-2 border-apre-blue text-apre-blue hover:bg-apre-blue hover:text-white",
    whatsapp: "bg-whatsapp text-white hover:brightness-95",
  };
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function WhatsAppButton({ texto = "Hola, quiero más información" }: { texto?: string }) {
  return (
    <a
      href={`${CONTACTO.whatsappLink}?text=${encodeURIComponent(texto)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-5 py-3 text-sm font-bold text-white transition hover:brightness-95"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.7.9-.5 1.2.5.9 1.1 1.6 1.9 2.2.7.6 1.3.8 1.6 1 .2.1.4 0 .5-.2l.8-1c.2-.3.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.8-.1 1.3Z" />
      </svg>
      WhatsApp
    </a>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={`${CONTACTO.whatsappLink}?text=${encodeURIComponent("Hola, quiero información de los cursos de APRECAP")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/25 transition hover:scale-105 print:hidden"
    >
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.7.9-.5 1.2.5.9 1.1 1.6 1.9 2.2.7.6 1.3.8 1.6 1 .2.1.4 0 .5-.2l.8-1c.2-.3.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.8-.1 1.3Z" />
      </svg>
    </a>
  );
}
