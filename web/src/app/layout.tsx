import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { WhatsAppFloat } from "@/components/Buttons";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OTEC APRECAP — Capacitación, Asesorías y Seguridad Privada",
  description:
    "Organismo Técnico de Capacitación acreditado por SENCE y OS-10. Cursos, asesorías y servicios de seguridad privada en todo el territorio nacional.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo/logo-icon-512.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/logo-icon-512.png", sizes: "192x192", type: "image/png" },
      { url: "/logo/logo-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo/logo-icon-512.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  );
}
