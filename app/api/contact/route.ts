import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { allowRequest } from "@/lib/rate-limit";
import { contactSubmissionSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorText(locale: "en" | "fa") {
  return locale === "fa" ? "ثبت درخواست در حال حاضر ممکن نیست. لطفاً بعداً دوباره تلاش کنید." : "The site could not save your inquiry. Please try again later.";
}

export async function POST(request: Request) {
  const fallbackLocale = request.headers.get("accept-language")?.toLowerCase().startsWith("fa") ? "fa" : "en";
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: fallbackLocale === "fa" ? "درخواست معتبر نیست." : "Invalid request." }, { status: 415 });
  }
  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (declaredLength > 12000) return NextResponse.json({ error: errorText(fallbackLocale) }, { status: 413 });

  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({ error: errorText(fallbackLocale) }, { status: 400 }); }
  const parsed = contactSubmissionSchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: fallbackLocale === "fa" ? "لطفاً فیلدهای ضروری و رضایت را بررسی کنید." : "Please check the required fields and consent." }, { status: 400 });
  const { name, email, company, service, message, locale, website } = parsed.data;
  if (website) return NextResponse.json({ ok: true });
  if (!allowRequest(request, "contact", 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: locale === "fa" ? "تعداد درخواست‌ها زیاد است؛ کمی بعد تلاش کنید." : "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    await getDb().execute(
      "INSERT INTO contact_inquiries (id, name, email, company, service, message, locale) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [randomUUID(), name, email.toLowerCase(), company, service, message, locale]
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: errorText(locale) }, { status: 503 });
  }
}
