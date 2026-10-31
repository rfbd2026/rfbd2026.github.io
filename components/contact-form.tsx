"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/content/projects";

const services = ["identity", "packaging", "digital", "other"] as const;

export function ContactForm({ locale, initialService = "" }: { locale: Locale; initialService?: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || t("required"));
      setStatus("sent");
      setMessage(t("sent"));
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : t("required"));
    }
  }

  return (
    <form onSubmit={submit} className="contact-form" aria-describedby="contact-email-note">
      <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-grid">
        <label className="field-wrap"><span>{t("name")} *</span><input className="field" name="name" required minLength={2} maxLength={120} autoComplete="name" /></label>
        <label className="field-wrap"><span>{t("email")} *</span><input className="field" name="email" type="email" required maxLength={254} autoComplete="email" /></label>
        <label className="field-wrap"><span>{t("company")}</span><input className="field" name="company" maxLength={180} autoComplete="organization" /></label>
        <label className="field-wrap"><span>{t("service")} *</span><select className="field" name="service" required defaultValue={services.includes(initialService as typeof services[number]) ? initialService : "other"}>{services.map((service) => <option key={service} value={service}>{t(service)}</option>)}</select></label>
      </div>
      <label className="field-wrap mt-5"><span>{t("message")} *</span><textarea className="field min-h-36 resize-y" name="message" required minLength={20} maxLength={5000} rows={6} /></label>
      <label className="consent-row mt-5"><input type="checkbox" name="consent" value="true" required /><span>{locale === "fa" ? "با ثبت این درخواست، اجازه می‌دهم اطلاعاتم برای پاسخ دستی به همین درخواست نگهداری شود. ایمیل خودکار ارسال نمی‌شود." : "I consent to storing this information for a manual response to this inquiry. No automatic email will be sent."}</span></label>
      <p id="contact-email-note" className="mt-3 text-xs leading-6 text-muted">{locale === "fa" ? "درخواست در سایت ثبت می‌شود؛ در حال حاضر ایمیل خودکار برای مشتری ارسال نمی‌شود." : "The inquiry is recorded on the site; no automatic customer email is sent while email delivery is disabled."}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4"><button className="button button--ink" type="submit" disabled={status === "loading"}>{status === "loading" ? (locale === "fa" ? "در حال ثبت…" : "Saving…") : t("send")}</button><p className={`form-status ${status === "error" ? "form-status--error" : ""}`} aria-live="polite">{message}</p></div>
    </form>
  );
}
