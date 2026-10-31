import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "review" });
  return pageMetadata(params.locale, "/review", t("title"), t("intro"));
}

export default async function ReviewPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "review" });
  const fa = locale === "fa";
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}><p>{t("intro")}</p></PageIntro>
      <section className="review-offer section-space">
        <div className="review-offer__price"><span className="eyebrow">{t("duration")}</span><strong>{fa ? t("priceFa") : t("priceEn")}</strong><span className="text-sm text-muted">{fa ? t("priceEn") : t("priceFa")}</span></div>
        <div className="review-offer__details"><h2 className="font-display text-2xl tracking-editorial sm:text-3xl">{fa ? "یک گفت‌وگوی متمرکز درباره مسیر بعدی پورتفولیو" : "A focused conversation about the next edit"}</h2><p className="mt-4 text-sm leading-7 text-muted">{t("intro")}</p><Link href="/contact?service=portfolio-review" className="button button--blue mt-7">{t("book")} <span aria-hidden="true">↗</span></Link><p className="mt-4 text-xs leading-6 text-muted">{t("paymentPaused")}</p></div>
      </section>
      <section className="review-faq border-t border-rule py-10"><p className="eyebrow">{t("faq")}</p><p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{t("faqText")}</p></section>
    </div>
  );
}
