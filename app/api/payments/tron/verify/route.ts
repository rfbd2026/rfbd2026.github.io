import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const locale = request.headers.get("accept-language")?.toLowerCase().startsWith("fa") ? "fa" : "en";
  return NextResponse.json({ error: locale === "fa" ? "بررسی تراکنش تا زمان ارائه فایل‌های نهایی و پیکربندی کیف پول تست‌نت غیرفعال است." : "Transaction verification is disabled until final product files and a Nile testnet receiver are configured.", code: "verification_paused" }, { status: 423 });
}
