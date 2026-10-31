import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { splitLocalizedBody, wordCount } from "@/lib/content/localized-markdown";

const root = path.join(process.cwd(), "content", "journal");
export type JournalArticle = {
  slug: string;
  date: string;
  category: { en: string; fa: string };
  title: { en: string; fa: string };
  summary: { en: string; fa: string };
  body: { en: string; fa: string };
};

function readFile(file: string): JournalArticle {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const body = splitLocalizedBody(content);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  if (wordCount(body.en) < 150 || wordCount(body.fa) < 150) throw new Error(`Journal article ${data.slug} is too short.`);
  if (!/^[a-z0-9-]+$/.test(data.slug) || typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid journal frontmatter in ${path.basename(file)}.`);
  for (const key of ["title", "summary", "category"]) {
    if (typeof data[key]?.en !== "string" || typeof data[key]?.fa !== "string") throw new Error(`Journal article ${data.slug} needs localized ${key}.`);
  }
  return { slug: data.slug, date, category: data.category, title: data.title, summary: data.summary, body };
}

export function getJournalArticles(): JournalArticle[] {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root).filter((name) => name.endsWith(".md")).map((name) => readFile(path.join(root, name))).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getJournalArticle(slug: string): JournalArticle | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  return getJournalArticles().find((article) => article.slug === slug);
}
