import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

const experience = {
  en: [
    { years: "1396–1398 SH", role: "Graphic Designer", place: "Arafic Advertising Agency", note: "My first role as a graphic designer." },
    { years: "1398–1399 SH", role: "Graphic Designer", place: "Morris Art Studio", note: "Studio work in design and illustration." },
    { years: "1399–1400 SH", role: "Graphic Designer", place: "Vijan Advertising Agency", note: "Agency work on advertising projects." },
    { years: "1401–1404 SH", role: "Graphic Designer", place: "Golden Saffron", note: "Product and brand work." }
  ],
  fa: [
    { years: "۱۳۹۶–۱۳۹۸", role: "طراح گرافیک", place: "کانون تبلیغاتی آرافیک", note: "اولین تجربه کاری من به‌عنوان طراح گرافیک." },
    { years: "۱۳۹۸–۱۳۹۹", role: "طراح گرافیک", place: "استودیو هنری موریس", note: "کار در استودیو." },
    { years: "۱۳۹۹–۱۴۰۰", role: "طراح گرافیک", place: "آژانس تبلیغاتی ویژن", note: "کار در آژانس تبلیغاتی." },
    { years: "۱۴۰۱–۱۴۰۴", role: "طراح گرافیک", place: "گلدن زعفران", note: "کار روی محصول و برند." }
  ]
} as const;

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "about" });
  return pageMetadata(params.locale, "/about", t("title"), t("lead"));
}

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "about" });
  const rows = experience[locale];
  const fa = locale === "fa";

  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}><p>{t("lead")}</p></PageIntro>
      <section className="about-story section-space">
        <div className="about-story__index"><span className="about-years">{fa ? "۸+" : "8+"}</span><span>{fa ? "سال تجربه حرفه‌ای" : "years of professional experience"}</span><span className="about-calendar">{fa ? "طبق رزومه" : "As listed in my CV"}</span></div>
        <div className="about-story__body"><p className="eyebrow">{t("philosophyTitle")}</p><p className="mt-4 font-display text-2xl leading-relaxed tracking-editorial sm:text-4xl">{t("philosophy")}</p></div>
      </section>

      <section className="timeline-section border-t border-rule py-12 md:py-16" aria-labelledby="timeline-title">
        <div className="section-heading"><div><p className="eyebrow">{fa ? "مسیر حرفه‌ای" : "Work history"}</p><h2 id="timeline-title" className="mt-4 font-display text-3xl tracking-editorial sm:text-5xl">{t("timeline")}</h2></div><p className="text-xs leading-6 text-muted">{fa ? "سال‌ها شمسی هستند." : "Years are in the Solar Hijri calendar (SH)."}</p></div>
        <ol className="timeline-list mt-10">
          {rows.map((item, index) => <li className="timeline-item" key={item.place}><span className="timeline-item__count">{String(index + 1).padStart(2, "0")}</span><div><p className="timeline-item__years">{item.years}</p><h3 className="mt-2 text-xl font-semibold">{item.role}</h3><p className="mt-1 text-muted">{item.place}</p><p className="mt-3 max-w-xl text-sm leading-7 text-muted">{item.note}</p></div></li>)}
        </ol>
      </section>

      <section className="about-details section-space border-t border-rule">
        <Reveal className="paper-panel p-6 sm:p-9"><p className="eyebrow">{fa ? "تحصیلات" : "Education"}</p><h2 className="mt-4 font-display text-2xl sm:text-3xl">{fa ? "کارشناسی ارشد ارتباط تصویری" : "M.A. in Visual Communication"}</h2><p className="mt-3 text-sm text-muted">{fa ? "مؤسسه آموزش عالی فردوس · ۱۳۹۹–۱۴۰۳" : "Ferdows Higher Education Institute · 1399–1403 SH"}</p></Reveal>
        <Reveal className="paper-panel p-6 sm:p-9" delay={0.08}><p className="eyebrow">{t("toolsTitle")}</p><p className="mt-4 text-base leading-8">{t("tools")}</p><p className="mt-5 text-sm leading-7 text-muted">{fa ? "با ابزارهای هوش مصنوعی و پرامپت‌نویسی برای تصویر هم آشنا هستم." : "I’m also familiar with AI image generation and prompt writing."}</p></Reveal>
      </section>

      <section className="border-t border-rule py-10"><p className="eyebrow">{t("pressTitle")}</p><p className="mt-3 text-sm text-muted">{t("pressText")}</p><Link href="/contact" className="text-link mt-7">{t("cta")} <span aria-hidden="true">↗</span></Link></section>
    </div>
  );
}
