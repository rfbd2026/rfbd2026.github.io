import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "contact" });
  return pageMetadata(params.locale, "/contact", t("title"), t("intro"));
}

export default async function ContactPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "contact" });
  const calendarUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}><p>{t("intro")}</p></PageIntro>
      <section className="contact-layout section-space">
        <Suspense fallback={<div className="contact-form" />}>
          <ContactForm locale={locale} />
        </Suspense>
        <aside className="contact-aside">
          <div className="paper-panel p-6 sm:p-8 mb-6 border-s-4 border-s-[var(--cobalt)]">
            <p className="eyebrow">{locale === "fa" ? "اطلاعات تماس مستقیم" : "Direct Contact Details"}</p>
            <div className="mt-4 space-y-3.5 text-sm leading-7">
              <div>
                <span className="text-muted block text-xs">{locale === "fa" ? "ایمیل رسمی:" : "Official Email:"}</span>
                <a href="mailto:arefiawe@gmail.com" className="text-link font-medium">arefiawe@gmail.com</a>
              </div>
              <div>
                <span className="text-muted block text-xs">{locale === "fa" ? "تلفن و واتس‌اپ:" : "Phone / WhatsApp:"}</span>
                <a href="https://wa.me/989157997912" target="_blank" rel="noopener noreferrer" className="text-link font-medium" dir="ltr">+98 915 799 7912</a>
              </div>
              <div>
                <span className="text-muted block text-xs">{locale === "fa" ? "تلگرام:" : "Telegram:"}</span>
                <a href="https://t.me/RF_BH" target="_blank" rel="noopener noreferrer" className="text-link font-medium" dir="ltr">@RF_BH</a>
              </div>
            </div>
          </div>

          <div className="paper-panel p-6 sm:p-8"><p className="eyebrow">{locale === "fa" ? "جلسه مشاوره" : "A focused session"}</p><h2 className="mt-4 font-display text-2xl">{locale === "fa" ? "بازبینی ۳۰ دقیقه‌ای پورتفولیو" : "30-minute Portfolio Review"}</h2><p className="mt-3 text-sm leading-7 text-muted">{locale === "fa" ? "۳٬۵۰۰٬۰۰۰ تومان" : "$79"}</p><p className="mt-2 text-xs leading-6 text-muted">{locale === "fa" ? "پرداخت هنوز باز نشده است." : "Payment isn’t open yet."}</p></div>
          <div className="mt-5 border border-rule p-6 sm:p-8"><p className="eyebrow">{t("calendly")}</p>{calendarUrl ? <a className="text-link mt-4" href={calendarUrl} target="_blank" rel="noopener noreferrer">{locale === "fa" ? "باز کردن صفحه رزرو" : "Open scheduling page"} ↗</a> : <p className="mt-4 text-sm leading-7 text-muted">{t("calendlyUnavailable")}</p>}</div>
        </aside>
      </section>
    </div>
  );
}
