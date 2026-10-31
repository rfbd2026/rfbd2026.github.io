import "server-only";

const SANDBOX_ORIGIN = "https://sandbox.zarinpal.com/pg/v4/payment";

export type ZarinPalRequestResult = { authority: string; startPayUrl: string };

export async function requestZarinPalSandboxPayment(input: {
  amountToman: number;
  description: string;
  callbackUrl: string;
  orderId: string;
  fetchImpl?: typeof fetch;
}): Promise<ZarinPalRequestResult> {
  if (process.env.PAYMENT_MODE !== "test") throw new Error("payment_mode_must_be_test");
  const base = process.env.ZARINPAL_API_BASE || SANDBOX_ORIGIN;
  if (base.replace(/\/$/, "") !== SANDBOX_ORIGIN) throw new Error("zarinpal_live_endpoint_blocked");
  const merchantId = process.env.ZARINPAL_MERCHANT_ID;
  if (!merchantId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(merchantId)) throw new Error("zarinpal_test_merchant_id_required");
  if (!Number.isSafeInteger(input.amountToman) || input.amountToman < 1000) throw new Error("invalid_irt_amount");
  const callback = new URL(input.callbackUrl);
  if (callback.protocol !== "https:") throw new Error("https_callback_required");
  const fetcher = input.fetchImpl || fetch;
  const response = await fetcher(`${SANDBOX_ORIGIN}/request.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      merchant_id: merchantId,
      amount: input.amountToman,
      currency: "IRT",
      description: input.description.slice(0, 255),
      callback_url: callback.toString(),
      metadata: { order_id: input.orderId }
    }),
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error("zarinpal_sandbox_unavailable");
  const payload = await response.json() as { data?: { code?: number; authority?: string }; errors?: unknown };
  if (payload.data?.code !== 100 || !payload.data.authority) throw new Error("zarinpal_sandbox_request_rejected");
  return { authority: payload.data.authority, startPayUrl: `https://sandbox.zarinpal.com/pg/StartPay/${encodeURIComponent(payload.data.authority)}` };
}
