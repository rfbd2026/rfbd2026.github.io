"use client";

import { FormEvent, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/content/projects";

export function NewsletterForm({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage(locale === "fa" ? "برای ثبت ایمیل، گزینه رضایت را انتخاب کنید." : "Please consent before saving your email.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true, locale })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not save your interest.");
      setStatus("saved");
      setMessage(t("subscribed"));
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : t("error"));
    }
  }

  return (
    <div className="newsletter-box">
      <form onSubmit={submit} className="grid gap-3" aria-describedby="newsletter-note">
        <label className="sr-only" htmlFor="newsletter-email">{t("emailPlaceholder")}</label>
        <input id="newsletter-email" className="field" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t("emailPlaceholder")} />
        <label className="consent-row"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><span>{locale === "fa" ? "با ثبت نشانی، اجازه می‌دهم برای اطلاع‌رسانی‌های بعدی نگهداری شود. تا زمان مجوزدهی، ایمیلی ارسال نمی‌شود." : "Save my address for future updates. No email will be sent until the owner authorizes email delivery."}</span></label>
        <p id="newsletter-note" className="text-xs leading-6 text-muted">{t("emailDeliveryPaused")}</p>
        <div className="flex flex-wrap items-center gap-4"><button className="button button--ink" type="submit" disabled={status === "loading"}>{status === "loading" ? (locale === "fa" ? "در حال ثبت…" : "Saving…") : t("subscribe")}</button><Link href="/downloads/free-50-color-palettes.json" className="text-link" download>{locale === "fa" ? "دانلود مستقیم فایل رایگان" : "Download the free file now"}</Link></div>
        <p className={`form-status ${status === "error" ? "form-status--error" : ""}`} aria-live="polite">{message}</p>
      </form>
    </div>
  );
}
