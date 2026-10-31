import Image from "next/image";
import Link from "next/link";
import type { Locale, WorkProject } from "@/lib/content/projects";

export function ProjectCard({ project, locale, index = 0 }: { project: WorkProject; locale: Locale; index?: number }) {
  const title = project.title[locale];
  const summary = project.summary[locale];
  const href = `/${locale}/work/${project.slug}`;

  return (
    <article className="project-card group">
      <Link className="project-card__link" href={href} aria-label={`${title} — ${summary}`}>
        <span className="project-card__image">
          <Image
            src={project.coverUrl}
            alt={title}
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
            priority={index < 2}
          />
          <span className="project-card__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </span>
        <span className="project-card__meta">
          <span>
            <span className="project-card__category">{project.categoryLabel[locale]}</span>
            <span className="project-card__title">{title}</span>
          </span>
          <span className="project-card__arrow" aria-hidden="true">↗</span>
        </span>
      </Link>
    </article>
  );
}
