import { NextResponse } from "next/server";
import { checkoutPausedMessage } from "@/lib/payments/gates";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const locale = request.headers.get("accept-language")?.toLowerCase().startsWith("fa") ? "fa" : "en";
  return NextResponse.json({ error: checkoutPausedMessage(locale), code: "native_files_pending" }, { status: 423 });
}
