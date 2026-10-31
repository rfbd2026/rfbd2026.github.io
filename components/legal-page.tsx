import { PageIntro } from "@/components/ui";
import { legalContent, type LegalSlug } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export function legalMetadata(locale: Locale, slug: LegalSlug) {
  const content = legalContent[slug][locale];
  return pageMetadata(locale, `/${slug}`, content.title, content.intro);
}

export function LegalPage({ locale, slug }: { locale: Locale; slug: LegalSlug }) {
  const content = legalContent[slug][locale];
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={locale === "fa" ? "پیش‌نویس اطلاعاتی" : "Informational preview"} title={content.title}><p>{content.intro}</p></PageIntro>
      <article className="legal-article section-space">{content.sections.map((section) => <section className="legal-article__section" key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</article>
      <p className="border-t border-rule py-7 text-xs leading-6 text-muted">{locale === "fa" ? "این متن جایگزین بررسی حقوقی تخصصی نیست." : "This text is not a substitute for review by qualified legal counsel."}</p>
    </div>
  );
}
