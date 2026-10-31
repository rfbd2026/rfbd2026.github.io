import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects, type Locale } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo";
import { HomeServices } from "@/components/home-services";
import { HomePortfolioStrip } from "@/components/home-portfolio-strip";
import { HomeCommunity } from "@/components/home-community";
import { Reveal } from "@/components/reveal";
import { HeroWordmark, CrimsonCursor } from "@/components/hero-motion";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return pageMetadata(params.locale, "/", t("title"), t("description"));
}

const serviceCopy = {
  en: [
    { number: "01", title: "Visual identity", description: "A clear visual language built to stay recognizable across the places a brand appears." },
    { number: "02", title: "Packaging systems", description: "Packaging families with a consistent point of view, from the first label to the full range." },
    { number: "03", title: "Product stories", description: "A visual narrative that helps people understand what a product is and why it matters." },
    { number: "04", title: "Campaign graphics", description: "Posters and promotional layouts shaped around one strong idea." },
    { number: "05", title: "Illustration", description: "Distinctive characters and images made to give a brand its own visual voice." },
    { number: "06", title: "Editorial design", description: "Thoughtful catalogues and layouts that make complex information easier to follow." }
  ],
  fa: [
    { number: "۰۱", title: "هویت بصری", description: "زبان بصری روشن برای اینکه برند در موقعیت‌های مختلف قابل تشخیص بماند." },
    { number: "۰۲", title: "سیستم بسته‌بندی", description: "خانواده‌ای از بسته‌بندی‌ها با نگاه یکدست؛ از نخستین لیبل تا مجموعه کامل." },
    { number: "۰۳", title: "روایت محصول", description: "روایتی بصری برای اینکه مخاطب محصول و اهمیت آن را بهتر درک کند." },
    { number: "۰۴", title: "گرافیک کمپین", description: "پوستر و چیدمان‌های تبلیغاتی که حول یک ایده روشن شکل می‌گیرند." },
    { number: "۰۵", title: "تصویرسازی", description: "شخصیت و تصویرهای متمایز برای شکل دادن به صدای بصری برند." },
    { number: "۰۶", title: "طراحی تحریریه", description: "کاتالوگ و صفحه‌آرایی سنجیده برای خوانایی بهتر اطلاعات پیچیده." }
  ]
} as const;

const communityCopy = {
  en: {
    label: "A SPACE FOR MAKERS",
    title: "Ideas become clearer when shared.",
    intro: "Short notes on the choices behind visual work — for people who care about how things are made.",
    cta: "Read studio notes",
    notes: [
      { index: "01", title: "Make a mark mean something.", description: "A good symbol earns its place by carrying a point of view." },
      { index: "02", title: "Treat the shelf as a page.", description: "Packaging has a few seconds to make its story easy to read." },
      { index: "03", title: "Let the system do the work.", description: "Consistency gives every new piece a familiar place to land." }
    ]
  },
  fa: {
    label: "برای اهل ساختن",
    title: "ایده‌ها با گفت‌وگو روشن‌تر می‌شوند.",
    intro: "یادداشت‌هایی کوتاه درباره انتخاب‌های پشت کار بصری؛ برای کسانی که به شیوه ساخته‌شدن چیزها اهمیت می‌دهند.",
    cta: "خواندن یادداشت‌های استودیو",
    notes: [
      { index: "۰۱", title: "به نشانه معنا بدهید.", description: "یک نماد خوب با داشتن نگاه مشخص، جای خود را پیدا می‌کند." },
      { index: "۰۲", title: "قفسه را مثل صفحه ببینید.", description: "بسته‌بندی چند ثانیه فرصت دارد تا داستانش را ساده روایت کند." },
      { index: "۰۳", title: "بگذارید سیستم کار کند.", description: "یکدستی به هر بخش تازه، جای آشنایی برای نشستن می‌دهد." }
    ]
  }
} as const;

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });
  const projects = getFeaturedProjects();
  const services = serviceCopy[locale];
  const community = communityCopy[locale];
  const isPersian = locale === "fa";
  const portfolioItems = projects.map((project) => ({ slug: project.slug, title: project.title[locale], category: project.categoryLabel[locale] }));

  return (
    <div className="step1-home step2-home">
      <CrimsonCursor />
      <section className="step1-hero" aria-labelledby="home-hero-title">
        <div className="step1-hero__inner">
          <div className="step1-hero__topline">
            <span>{isPersian ? "فورت ورث · تگزاس" : "FORT WORTH · TEXAS"}</span>
            <span>{isPersian ? "طراح مستقل · بیش از ۸ سال تجربه" : "INDEPENDENT DESIGNER · 8+ YEARS"}</span>
          </div>
          <div className="step1-hero__brand" dir="ltr">
            <p className="step1-hero__brand-kicker">A / B — AREF BAHADORI</p>
            <HeroWordmark />
          </div>
          <div className="step1-hero__bottom">
            <div className="step1-hero__copy">
              <p className="step1-kicker">{t("eyebrow")}</p>
              <h2>{t("headline")}</h2>
              <p>{t("intro")}</p>
            </div>
            <div className="step1-hero__links">
              <Link href="/work" className="step1-hero__link"><span>01</span><strong>{t("ctaWork")}</strong><ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a href="#home-services" className="step1-hero__link"><span>02</span><strong>{isPersian ? "دیدن خدمات" : "Explore services"}</strong><ArrowDown size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <span className="step1-hero__side-note" aria-hidden="true">{isPersian ? "کار خوب از نشانه فراتر می‌رود" : "GOOD WORK GOES BEYOND THE MARK"}</span>
        </div>
      </section>

      <div className="step1-shell">
        <Reveal delay={0.04}><HomeServices label={isPersian ? "حوزه‌های کاری · ۰۱—۰۶" : "AREAS OF PRACTICE · 01—06"} title={isPersian ? "سیستم‌های بصری برای محصول." : "Visual systems for products."} intro={isPersian ? "از هویت و بسته‌بندی تا روایت دیجیتال؛ هر بخش در خدمت یک زبان روشن است." : "From identity and packaging to digital product stories, each part works toward one clear visual language."} items={[...services]} /></Reveal>
        <Reveal delay={0.08}><HomePortfolioStrip label={isPersian ? "پروژه‌های منتخب · ۰۱" : "SELECTED WORK · 01"} title={isPersian ? "کارهایی از نشانه تا تجربه." : "Work from mark to moment."} intro={isPersian ? "نمونه‌هایی از پورتفولیو؛ کارت‌ها فعلاً تصویرهای جایگزین دارند." : "A selection from the portfolio. Abstract placeholders stand in for project images in this layout preview."} items={portfolioItems} scrollLabel={isPersian ? "پیمایش دستی با حرکت کمتر" : "Drag to browse"} loopLabel={isPersian ? "حرکت پیوسته · مکث با اشاره یا تمرکز" : "Slow loop · hover or focus to pause"} moreLabel={common("viewAll")} pauseLabel={isPersian ? "توقف حرکت" : "Pause movement"} resumeLabel={isPersian ? "ادامه حرکت" : "Resume movement"} /></Reveal>
      </div>

      <HomeCommunity label={community.label} title={community.title} intro={community.intro} notes={[...community.notes]} cta={community.cta} />

      <div className="step1-shell">
        <Reveal delay={0.06}>
          <section className="step1-contact" aria-labelledby="home-contact-title">
            <div className="step1-contact__copy">
              <p className="step1-kicker">{isPersian ? "گام بعدی" : "NEXT — LET'S TALK"}</p>
              <h2 id="home-contact-title">{isPersian ? "چه چیزی می‌سازید؟" : "What are you making?"}</h2>
              <p>{isPersian ? "درباره محصول، مخاطبان و جایی که هویت بصری‌تان می‌تواند بهتر عمل کند بنویسید." : "Tell me about the product, the people it is for, and where its visual identity could work harder."}</p>
            </div>
            <Link href="/contact" className="step1-contact__button">{t("contactCta")}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
