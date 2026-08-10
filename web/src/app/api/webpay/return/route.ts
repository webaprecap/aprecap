import { NextResponse } from "next/server";
import { webpayTransaction } from "@/lib/webpay";
import { actualizarPago, obtenerPago } from "@/lib/admin-firebase";
import { metodoPagoDe } from "@/lib/webpay";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token_ws") || url.searchParams.get("TBK_TOKEN");
  const base = process.env.NEXT_PUBLIC_SITE_URL || `${url.protocol}//${url.host}`;
  const resultUrl = `${base.replace(/\/$/, "")}/pago/resultado`;

  if (!token) {
    return NextResponse.redirect(
      `${resultUrl}?estado=error&detalle=${encodeURIComponent("No se recibió el token de la transacción.")}`
    );
  }

  try {
    const tx = webpayTransaction();
    const res = await tx.commit(token);
    const estado = res.status === "AUTHORIZED" ? "aprobado" : "rechazado";
    const { metodo, cuotas, montoCuota } = metodoPagoDe(res);

    const buyOrder = res.buy_order || String(res.buyOrder || "");
    if (buyOrder) {
      const existente = await obtenerPago(buyOrder);
      if (existente) {
        await actualizarPago(buyOrder, {
          estado,
          metodo,
          cuotas: cuotas || undefined,
          montoCuota: montoCuota || undefined,
          authorizationCode: res.authorization_code || String(res.authorizationCode || ""),
          cardNumber: res.card_detail?.card_number || undefined,
          buyOrderTbk: res.buy_order || String(res.buyOrder || ""),
          fechaPago: new Date(),
        });
      } else {
        console.warn("[webpay] buyOrder desconocido en commit:", buyOrder);
      }
    }

    const query = estado === "aprobado" ? "estado=0&bo=" + encodeURIComponent(buyOrder) : "estado=1";
    return NextResponse.redirect(`${resultUrl}?${query}`);
  } catch (e) {
    console.error("WebPay commit error", e);
    return NextResponse.redirect(
      `${resultUrl}?estado=1&detalle=${encodeURIComponent("No se pudo confirmar el pago.")}`
    );
  }
}