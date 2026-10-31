import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import { toolCatalog } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "tools" });
  return pageMetadata(params.locale, "/tools", t("title"), t("intro"));
}

export default async function ToolsIndexPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "tools" });
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}><p>{t("intro")}</p></PageIntro>
      <div className="tool-index-grid section-space">
        {toolCatalog.map((tool, index) => <Link href={`/tools/${tool.slug}`} key={tool.slug} className="tool-index-card"><span className="tool-index-card__number">{String(index + 1).padStart(2, "0")}</span><h2 className="mt-8 font-display text-2xl tracking-editorial">{t(tool.key)}</h2><p className="mt-3 text-sm leading-7 text-muted">{t(tool.descriptionKey)}</p><span className="text-link mt-6">{t("openTool")} ↗</span></Link>)}
      </div>
    </div>
  );
}
