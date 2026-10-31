import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { allowRequest } from "@/lib/rate-limit";
import { newsletterSubmissionSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const fallbackLocale = request.headers.get("accept-language")?.toLowerCase().startsWith("fa") ? "fa" : "en";
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: fallbackLocale === "fa" ? "درخواست معتبر نیست." : "Invalid request." }, { status: 415 });
  }
  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (declaredLength > 3000) return NextResponse.json({ error: fallbackLocale === "fa" ? "درخواست معتبر نیست." : "Invalid request." }, { status: 413 });
  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({ error: fallbackLocale === "fa" ? "نشانی ایمیل و رضایت لازم است." : "An email address and consent are required." }, { status: 400 }); }
  const parsed = newsletterSubmissionSchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: fallbackLocale === "fa" ? "نشانی ایمیل و رضایت لازم است." : "An email address and consent are required." }, { status: 400 });
  const { email, locale } = parsed.data;
  if (!allowRequest(request, "newsletter", 4, 60 * 60 * 1000)) {
    return NextResponse.json({ error: locale === "fa" ? "تعداد درخواست‌ها زیاد است؛ کمی بعد تلاش کنید." : "Too many requests. Please try again later." }, { status: 429 });
  }
  try {
    await getDb().execute(
      "INSERT INTO newsletter_signups (id, email, locale) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE locale = VALUES(locale), consented_at = CURRENT_TIMESTAMP",
      [randomUUID(), email.toLowerCase(), locale]
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: locale === "fa" ? "ثبت علاقه‌مندی در حال حاضر ممکن نیست." : "The site could not save your interest. Please try again later." }, { status: 503 });
  }
}
