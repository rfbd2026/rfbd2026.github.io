import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const locale = request.headers.get("accept-language")?.toLowerCase().startsWith("fa") ? "fa" : "en";
  return NextResponse.json({ error: locale === "fa" ? "پرداخت فعال نیست؛ هیچ سفارشی ثبت نشد." : "Checkout is paused; no order was recorded.", code: "checkout_paused" }, { status: 423 });
}
