import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const root = path.join(process.cwd(), "content", "work");
const localizedText = z.object({ en: z.string().min(1), fa: z.string().min(1) });
const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  rank: z.number().int().nonnegative(),
  featured: z.boolean(),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  cover: z.string().regex(/^images\/[a-z0-9-]+\.(?:webp|png|jpe?g)$/i),
  source: z.string().min(1),
  title: localizedText,
  summary: localizedText,
  context: localizedText,
  shown: localizedText,
  categoryLabel: localizedText,
});

export type Locale = "en" | "fa";
export type WorkProject = z.infer<typeof projectSchema> & { coverUrl: string };

function parseProject(folder: string): WorkProject | null {
  const markdownPath = path.join(root, folder, "project.md");
  if (!fs.existsSync(markdownPath)) return null;

  const { data } = matter(fs.readFileSync(markdownPath, "utf8"));
  const project = projectSchema.parse(data);
  if (project.slug !== folder) {
    throw new Error(`Project folder/slug mismatch: ${folder} != ${project.slug}`);
  }
  return { ...project, coverUrl: `/projects/${project.slug}/${project.cover}` };
}

export function getProjects(): WorkProject[] {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^[a-z0-9-]+$/.test(entry.name))
    .map((entry) => parseProject(entry.name))
    .filter((project): project is WorkProject => project !== null)
    .sort((a, b) => a.rank - b.rank);
}

export function getFeaturedProjects(): WorkProject[] {
  return getProjects().filter((project) => project.featured).slice(0, 6);
}

export function getProject(slug: string): WorkProject | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  return parseProject(slug) ?? undefined;
}
