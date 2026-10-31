import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const locale = request.headers.get("accept-language")?.toLowerCase().startsWith("fa") ? "fa" : "en";
  return NextResponse.json({ error: locale === "fa" ? "پرداخت آزمایشی تا زمان ارائه فایل‌های نهایی و نشانی عمومی کیف پول تست‌نت غیرفعال است." : "The testnet payment demo is unavailable until final product files and a public testnet receiver address are supplied.", code: "testnet_setup_pending" }, { status: 423 });
}
