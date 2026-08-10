// Capa servidor WebPay (Webpay Plus 3D) — nunca importar desde 'use client'.
import { WebpayPlus, IntegrationCommerceCodes, IntegrationApiKeys } from "transbank-sdk";

export const WEBPAY_MIN = 1000;
export const WEBPAY_MAX = 5_000_000;

export function webpayConfig() {
  const mode = process.env.WEBPAY_MODE?.toLowerCase() || "integration";
  return {
    mode,
    commerceCode: process.env.WEBPAY_COMMERCE_CODE || String(IntegrationCommerceCodes.WEBPAY_PLUS),
    apiKey: process.env.WEBPAY_API_KEY || IntegrationApiKeys.WEBPAY,
  };
}

export function webpayTransaction() {
  const { mode, commerceCode, apiKey } = webpayConfig();
  return mode === "production"
    ? WebpayPlus.Transaction.buildForProduction(commerceCode, apiKey)
    : WebpayPlus.Transaction.buildForIntegration(commerceCode, apiKey);
}

export function buildReturnUrl(requestUrl: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (base) return `${base.replace(/\/$/, "")}/pago/resultado`;
  return `${requestUrl.split("/api/webpay")[0]}/pago/resultado`;
}

/** Estado humano de la respuesta oficial de Transbank */
export function metodoPagoDe(resp: {
  payment_type_code?: string;
  installments_number?: number;
  amount?: number;
  card_detail?: { card_number?: string };
}) {
  const code = resp.payment_type_code?.toUpperCase() ?? "";
  let metodo = "Tarjeta";
  if (code === "VD") metodo = "Débito";
  else if (code === "VN") metodo = "Crédito";
  else if (code === "VC") metodo = "Crédito en cuotas";
  else if (code === "SI") metodo = "Cuotas sin intereses";
  else if ("NC".startsWith(code)) metodo = "Crédito";
  const cuotas = resp.installments_number || 0;
  return { metodo, cuotas, montoCuota: cuotas > 1 ? Math.round((resp.amount || 0) / cuotas) : 0 };
}