import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import { markdownBlocks } from "@/lib/content/localized-markdown";
import { getJournalArticle, getJournalArticles } from "@/lib/content/journal";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export function generateStaticParams() {
  return getJournalArticles().flatMap((article) => [{ locale: "en", slug: article.slug }, { locale: "fa", slug: article.slug }]);
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const article = getJournalArticle(params.slug);
  if (!article) return {};
  return pageMetadata(params.locale, `/journal/${article.slug}`, article.title[params.locale], article.summary[params.locale]);
}

export default async function JournalArticlePage({ params }: { params: { locale: Locale; slug: string } }) {
  const locale = params.locale;
  const article = getJournalArticle(params.slug);
  if (!article) notFound();
  const t = await getTranslations({ locale, namespace: "journal" });
  const blocks = markdownBlocks(article.body[locale]);
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={article.category[locale]} title={article.title[locale]}><p>{article.summary[locale]}</p></PageIntro>
      <article className="journal-article section-space"><p className="journal-article__byline"><span>{t("byline")}</span><span>·</span><time dateTime={article.date}>{article.date}</time></p><div className="tool-article__body mt-8">{blocks.map((block, index) => block.type === "heading" ? <h2 key={index}>{block.text}</h2> : <p key={index}>{block.text}</p>)}</div></article>
      <div className="border-t border-rule py-8"><Link href="/journal" className="text-link">← {t("back")}</Link></div>
    </div>
  );
}
