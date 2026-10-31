import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/ui";
import { ImageToPaletteTool } from "@/components/image-to-palette-tool";
import { FontPairingTool } from "@/components/font-pairing-tool";
import { SafeZoneTool } from "@/components/safe-zone-tool";
import { getToolArticle } from "@/lib/content/tool-articles";
import { markdownBlocks } from "@/lib/content/localized-markdown";
import { getTool, toolCatalog } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export function generateStaticParams() {
  return toolCatalog.flatMap((tool) => [{ locale: "en", slug: tool.slug }, { locale: "fa", slug: tool.slug }]);
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const tool = getTool(params.slug);
  const article = getToolArticle(params.slug);
  if (!tool || !article) return {};
  const t = await getTranslations({ locale: params.locale, namespace: "tools" });
  return pageMetadata(params.locale, `/tools/${tool.slug}`, t(tool.key), t(tool.descriptionKey));
}

export default async function ToolPage({ params }: { params: { locale: Locale; slug: string } }) {
  const locale = params.locale;
  const tool = getTool(params.slug);
  const article = getToolArticle(params.slug);
  if (!tool || !article) notFound();
  const t = await getTranslations({ locale, namespace: "tools" });
  const pageTitle = t(tool.key);
  const blocks = markdownBlocks(article.body[locale]);

  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={pageTitle}><p>{t(tool.descriptionKey)}</p></PageIntro>
      <section className="tool-workspace section-space">
        {tool.kind === "palette" ? <ImageToPaletteTool locale={locale} /> : tool.kind === "font" ? <FontPairingTool locale={locale} /> : <SafeZoneTool locale={locale} />}
      </section>
      <article className="tool-article border-t border-rule py-12 md:py-16" aria-labelledby="tool-article-title">
        <header><p className="eyebrow">{locale === "fa" ? "راهنمای کاربردی" : "Practical guide"}</p><h2 id="tool-article-title" className="mt-4 max-w-4xl font-display text-3xl tracking-editorial sm:text-5xl">{article.title[locale]}</h2></header>
        <div className="tool-article__body mt-8">{blocks.map((block, index) => block.type === "heading" ? <h3 key={index}>{block.text}</h3> : <p key={index}>{block.text}</p>)}</div>
      </article>
    </div>
  );
}
