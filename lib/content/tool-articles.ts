import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { splitLocalizedBody, wordCount } from "@/lib/content/localized-markdown";

const root = path.join(process.cwd(), "content", "tools");

export type ToolArticle = { slug: string; title: { en: string; fa: string }; body: { en: string; fa: string } };

export function getToolArticle(slug: string): ToolArticle | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const file = path.join(root, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const body = splitLocalizedBody(content);
  if (wordCount(body.en) < 300 || wordCount(body.fa) < 300) {
    throw new Error(`Tool article ${slug} must contain at least 300 words in each language.`);
  }
  if (data.slug !== slug || typeof data.title?.en !== "string" || typeof data.title?.fa !== "string") {
    throw new Error(`Invalid localized frontmatter for tool article ${slug}.`);
  }
  return { slug, title: data.title, body };
}
