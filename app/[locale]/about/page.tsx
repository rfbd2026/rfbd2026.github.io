import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

const experience = {
  en: [
    { years: "1396–1398 SH", role: "Graphic Designer", place: "Arafic Advertising Agency", note: "Brand advertising and initial graphic design practice." },
    { years: "1398–1399 SH", role: "Graphic Designer", place: "Morris Art Studio", note: "Studio work in brand design and creative illustration." },
    { years: "1399–1400 SH", role: "Graphic Designer", place: "Vijan Advertising Agency", note: "Agency work on advertising campaigns and visual materials." },
    { years: "1401–1404 SH", role: "Graphic Designer", place: "Golden Saffron", note: "Product packaging, visual identity, and brand design systems." }
  ],
  fa: [
    { years: "۱۳۹۶–۱۳۹۸", role: "طراح گرافیک", place: "کانون تبلیغات آرافیک", note: "طراحی تبلیغات و شروع فعالیت حرفه‌ای گرافیک." },
    { years: "۱۳۹۸–۱۳۹۹", role: "طراح گرافیک", place: "استودیو هنری مورس", note: "کار استودیویی روی دیزاین و تصویرسازی خلاقانه." },
    { years: "۱۳۹۹–۱۴۰۰", role: "طراح گرافیک", place: "آژانس تبلیغاتی ویژن", note: "طراحی کمپین‌های تبلیغاتی و متریال‌های بصری." },
    { years: "۱۴۰۱–۱۴۰۴", role: "طراح گرافیک", place: "Golden Saffron", note: "طراحی بسته‌بندی محصول، هویت بصری و سیستم‌های برندینگ." }
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
        <div className="about-story__index">
          <span className="about-years">{fa ? "۸+" : "8+"}</span>
          <span>{fa ? "سال تجربه حرفه‌ای در گرافیک و UI/UX" : "years of professional design & UI/UX experience"}</span>
          <span className="about-calendar">{fa ? "رزومه رسمی ۱۴۰۵ / 2026" : "Official 2026 Portfolio"}</span>
        </div>
        <div className="about-story__body">
          <p className="eyebrow">{fa ? "رویکرد طراحی" : "Design Approach"}</p>
          <p className="mt-4 font-display text-2xl leading-relaxed tracking-editorial sm:text-4xl">
            {fa 
              ? "متخصص در طراحی هویت بصری، بسته‌بندی محصولات و تبلیغات دیجیتال. متمرکز بر خلق طرح‌های کاربردی برای جذب مخاطب و تقویت برند با بهره‌گیری از هوش مصنوعی."
              : "Specialized in visual identity, product packaging, and digital advertising. Focused on creating functional designs that elevate brand identity and customer experience."
            }
          </p>
        </div>
      </section>

      <section className="timeline-section border-t border-rule py-12 md:py-16" aria-labelledby="timeline-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{fa ? "مسیر حرفه‌ای و شغلی" : "Work history"}</p>
            <h2 id="timeline-title" className="mt-4 font-display text-3xl tracking-editorial sm:text-5xl">{t("timeline")}</h2>
          </div>
          <p className="text-xs leading-6 text-muted">{fa ? "برگرفته از پورتفولیو رسمی" : "As certified in official portfolio"}</p>
        </div>
        <ol className="timeline-list mt-10">
          {rows.map((item, index) => (
            <li className="timeline-item" key={item.place}>
              <span className="timeline-item__count">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="timeline-item__years">{item.years}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
                <p className="mt-1 text-muted">{item.place}</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{item.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-details section-space border-t border-rule grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal className="paper-panel p-6 sm:p-9">
          <p className="eyebrow">{fa ? "تحصیلات و دوره‌های تخصصی" : "Education & Training"}</p>
          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-display text-xl font-semibold">{fa ? "کارشناسی ارشد ارتباط تصویری" : "M.A. in Visual Communication"}</h3>
              <p className="text-sm text-muted mt-1">{fa ? "مؤسسه آموزش عالی فردوس · ۱۳۹۹–۱۴۰۳" : "Ferdows Higher Education Institute · 2020–2024"}</p>
            </div>
            <div className="border-t border-rule pt-4">
              <h3 className="font-display text-xl font-semibold">{fa ? "برنامه‌نویسی و وب" : "Programming & Web Development"}</h3>
              <p className="text-sm text-muted mt-1">{fa ? "مجتمع فنی تهران · ۱۴۰۲ تاکنون" : "Tehran Technical Complex · 2023–Present"}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="paper-panel p-6 sm:p-9" delay={0.08}>
          <p className="eyebrow">{fa ? "مهارت‌ها و جعبه‌ابزار" : "Skills & Toolset"}</p>
          <div className="mt-5 space-y-4 text-sm leading-7">
            <div>
              <strong className="block text-ink">{fa ? "گرافیک و رابط کاربری (UI/UX):" : "Graphic & UI/UX Design:"}</strong>
              <p className="text-muted">Photoshop, Illustrator, Figma, Adobe XD</p>
            </div>
            <div>
              <strong className="block text-ink">{fa ? "تدوین و موشن‌گرافیک:" : "Video Editing & Motion:"}</strong>
              <p className="text-muted">After Effects, Premiere Pro</p>
            </div>
            <div>
              <strong className="block text-ink">{fa ? "سه‌بعدی و نشر/چاپ:" : "3D & Print Production:"}</strong>
              <p className="text-muted">Blender, SketchUp, InDesign</p>
            </div>
            <div>
              <strong className="block text-ink">{fa ? "پرامپتوگرافی و هوش مصنوعی:" : "AI Promptography & Synthesis:"}</strong>
              <p className="text-muted">{fa ? "خلق تصاویر پیشرفته و بهینه‌سازی روند طراحی خلاقانه" : "Advanced prompt engineering for visual ideation and creative design workflows"}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-rule py-10 flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="eyebrow">{fa ? "همکاری و سفارش پروژه" : "Let's collaborate"}</p>
          <p className="mt-2 text-sm text-muted">{fa ? "آماده پذیرش سفارش‌های هویت بصری، بسته‌بندی و پروژه‌های خلاقانه." : "Available for select visual identity, packaging, and digital projects."}</p>
        </div>
        <Link href="/contact" className="button button--ink">{t("cta")} <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
