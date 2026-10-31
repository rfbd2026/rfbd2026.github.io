import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import { getJournalArticles } from "@/lib/content/journal";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "journal" });
  return pageMetadata(params.locale, "/journal", t("title"), t("intro"));
}

export default async function JournalPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "journal" });
  const articles = getJournalArticles();
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}><p>{t("intro")}</p></PageIntro>
      <div className="journal-grid section-space">
        {articles.map((article, index) => <article className="journal-card" key={article.slug}><p className="eyebrow">{article.category[locale]} <span aria-hidden="true">·</span> <time dateTime={article.date}>{article.date}</time></p><h2 className="mt-4 font-display text-2xl leading-snug tracking-editorial"><Link className="no-underline hover:text-cobalt" href={`/journal/${article.slug}`}>{article.title[locale]}</Link></h2><p className="mt-3 text-sm leading-7 text-muted">{article.summary[locale]}</p><Link className="text-link mt-5" href={`/journal/${article.slug}`}>{t("readArticle")} ↗</Link><span className="journal-card__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></article>)}
      </div>
    </div>
  );
}
