"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale, WorkProject } from "@/lib/content/projects";

type Filter = { id: string; label: string };

export function ProjectGallery({ projects, locale, filters }: { projects: WorkProject[]; locale: Locale; filters: Filter[] }) {
  const [active, setActive] = useState("all");
  const visible = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((project) => [project.category, ...project.tags].some((tag) => tag.toLowerCase() === active));
  }, [active, projects]);

  return (
    <div>
      <div className="filter-bar" role="group" aria-label={locale === "fa" ? "دسته‌بندی پروژه‌ها" : "Filter projects"}>
        {filters.map((filter) => (
          <button
            type="button"
            key={filter.id}
            className={`filter-chip ${active === filter.id ? "is-active" : ""}`}
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="project-grid">
          {visible.map((project, index) => (
            <article className="project-card group" key={project.slug}>
              <Link className="project-card__link" href={`/${locale}/work/${project.slug}`} aria-label={`${project.title[locale]} — ${project.summary[locale]}`}>
                <span className="project-card__image">
                  <Image
                    src={project.coverUrl}
                    alt={project.title[locale]}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  <span className="project-card__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </span>
                <span className="project-card__meta">
                  <span>
                    <span className="project-card__category">{project.categoryLabel[locale]}</span>
                    <span className="project-card__title">{project.title[locale]}</span>
                  </span>
                  <span className="project-card__arrow" aria-hidden="true">↗</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">{locale === "fa" ? "پروژه‌ای در این دسته نیست." : "No projects in this category yet."}</p>
      )}
      <p className="sr-only" aria-live="polite">{visible.length} {locale === "fa" ? "پروژه" : "projects"}</p>
    </div>
  );
}
