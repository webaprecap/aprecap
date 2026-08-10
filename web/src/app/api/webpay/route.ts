import { NextRequest, NextResponse } from "next/server";
import { webpayTransaction, buildReturnUrl, WEBPAY_MIN, WEBPAY_MAX } from "@/lib/webpay";
import { guardarPago, guardarConsentimiento } from "@/lib/admin-firebase";
import { cursosLP } from "@/data/cursos";
import { cursosOtec } from "@/data/cursos-otec";

const CONSENT_VERSION = "v2.0-pago-ley21719";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const slug = String(body.cursoSlug ?? "").trim();
  const monto = Number(body.monto);
  const email = String(body.email ?? "").trim().toLowerCase();
  const consentimiento = body.consent === true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ingresa un email válido." }, { status: 400 });
  }
  if (!Number.isInteger(monto) || monto < WEBPAY_MIN || monto > WEBPAY_MAX) {
    return NextResponse.json(
      { error: `El monto debe estar entre $${WEBPAY_MIN.toLocaleString("es-CL")} y $${WEBPAY_MAX.toLocaleString("es-CL")}.` },
      { status: 400 }
    );
  }
  if (!consentimiento) {
    return NextResponse.json(
      { error: "Debes aceptar el consentimiento de datos (Ley 21.719)." },
      { status: 400 }
    );
  }

  const curso = cursosLP.find((c) => c.slug === slug) || cursosOtec.find((c) => c.slug === slug);
  if (!curso) {
    return NextResponse.json({ error: "Curso no encontrado." }, { status: 400 });
  }

  const buyOrder = `AP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const sessionId = `${email}-${slug}`;
  const returnUrl = buildReturnUrl(req.url);

  try {
    const tx = webpayTransaction();
    const res = await tx.create(buyOrder, sessionId, monto, returnUrl);

    const uid = String(body.uid ?? "");
    const nome = String(body.nombre ?? "");
    let consentRef: string | undefined;
    if (uid) {
      consentRef = (await guardarConsentimiento({
        uid,
        email,
        version: CONSENT_VERSION,
        userAgent: String(body.userAgent ?? "").slice(0, 500),
      })) ?? undefined;
    }

    await guardarPago({
      buyOrder,
      token: res.token,
      cursoSlug: slug,
      cursoNombre: curso.title,
      email,
      uidUsuario: uid || undefined,
      nombreUsuario: nome || undefined,
      monto,
      estado: "creado",
      fechaCreacion: new Date(),
      versionConsentimiento: CONSENT_VERSION,
      consentRef,
    });

    return NextResponse.json({ token: res.token, url: res.url, amount: monto, buyOrder });
  } catch (e) {
    console.error("WebPay create error", e);
    return NextResponse.json({ error: "No se pudo iniciar el pago. Intenta de nuevo." }, { status: 502 });
  }
}