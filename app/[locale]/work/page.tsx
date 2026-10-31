import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/ui";
import { ProjectGallery } from "@/components/project-gallery";
import { PortfolioBookViewer } from "@/components/portfolio-book-viewer";
import { getProjects, type Locale } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "work" });
  return pageMetadata(params.locale, "/work", t("title"), t("intro"));
}

export default async function WorkPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "work" });
  const filters = [
    { id: "all", label: t("all") },
    { id: "branding", label: t("branding") },
    { id: "packaging", label: t("packaging") },
    { id: "poster", label: t("poster") },
    { id: "social", label: t("social") },
    { id: "typography", label: t("typography") },
    { id: "illustration", label: t("illustration") },
    { id: "digital", label: t("digital") }
  ];
  const projects = getProjects();

  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}><p>{t("intro")}</p></PageIntro>

      <PortfolioBookViewer locale={locale} />

      <section className="py-9 md:py-12" aria-label={locale === "fa" ? "فهرست پروژه‌ها" : "Project index"}>
        <ProjectGallery projects={projects} locale={locale} filters={filters} />
      </section>
    </div>
  );
}
