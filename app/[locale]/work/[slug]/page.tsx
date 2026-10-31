import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import { getProject, getProjects, type Locale } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getProjects().flatMap((project) => [
    { locale: "en", slug: project.slug },
    { locale: "fa", slug: project.slug }
  ]);
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return pageMetadata(params.locale, `/work/${project.slug}`, project.title[params.locale], project.summary[params.locale]);
}

export default async function ProjectPage({ params }: { params: { locale: Locale; slug: string } }) {
  const locale = params.locale;
  const project = getProject(params.slug);
  if (!project) notFound();
  const t = await getTranslations({ locale, namespace: "work" });
  const all = getProjects();
  const index = all.findIndex((entry) => entry.slug === project.slug);
  const previous = index > 0 ? all[index - 1] : undefined;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : undefined;

  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={project.categoryLabel[locale]} title={project.title[locale]}><p>{project.summary[locale]}</p></PageIntro>

      <section className="case-study__image crop-frame mt-9 md:mt-12 bg-white rounded-xl border border-rule overflow-hidden">
        <Image src={project.coverUrl} alt={project.title[locale]} fill priority sizes="(max-width: 900px) 100vw, 92vw" className="object-contain p-4" />
      </section>

      {project.galleryUrls && project.galleryUrls.length > 0 && (
        <section className="case-study__gallery mt-10 grid grid-cols-1 md:grid-cols-2 gap-6" aria-label={locale === "fa" ? "گالری تصاویر پروژه" : "Project image gallery"}>
          {project.galleryUrls.map((url, i) => (
            <div key={url} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-rule bg-white shadow-sm">
              <Image src={url} alt={`${project.title[locale]} — ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4" />
            </div>
          ))}
        </section>
      )}

      <section className="case-study__facts section-space">
        <div><p className="eyebrow">{t("context")}</p><p className="mt-4 text-base leading-8">{project.context[locale]}</p></div>
        <div><p className="eyebrow">{t("shown")}</p><p className="mt-4 text-base leading-8">{project.shown[locale]}</p></div>
        <div><p className="eyebrow">{locale === "fa" ? "دسته‌بندی" : "Category"}</p><p className="mt-4 text-base leading-8 font-medium">{project.category}</p></div>
        <div><p className="eyebrow">{locale === "fa" ? "برچسب‌ها" : "Tags"}</p><p className="mt-4 text-sm leading-7 text-muted">{project.tags.join(" · ")}</p></div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-rule py-7 text-sm">
        {previous ? <Link href={`/work/${previous.slug}`} className="text-link">← {t("previous")}: {previous.title[locale]}</Link> : <span />}
        {next ? <Link href={`/work/${next.slug}`} className="text-link">{t("next")}: {next.title[locale]} →</Link> : null}
      </div>
      <p className="pb-5 text-xs text-muted">{t("source")}: {project.source}</p>
    </div>
  );
}
