import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content/projects";
import { getJournalArticles } from "@/lib/content/journal";
import { toolCatalog } from "@/lib/tools";
import { products } from "@/lib/products";

function publicOrigin() {
  const value = process.env.PUBLIC_APP_URL?.trim();
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === "https:" ? url : undefined; }
  catch { return undefined; }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  if (!origin) return [];
  const locales = ["en", "fa"] as const;
  const publicPages = ["", "about", "work", "shop", "tools", "journal", "contact", "review", "terms", "privacy", "license"];
  const staticEntries = locales.flatMap((locale) => publicPages.map((page) => ({
    url: new URL(`/${locale}${page ? `/${page}` : ""}`, origin).toString(),
    lastModified: new Date(),
    changeFrequency: (page === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: page === "" ? 1 : ["work", "shop", "tools"].includes(page) ? 0.8 : 0.6
  })));
  const dynamicEntries = locales.flatMap((locale) => [
    ...getProjects().map((item) => ({ url: new URL(`/${locale}/work/${item.slug}`, origin).toString(), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...products.map((item) => ({ url: new URL(`/${locale}/shop/${item.slug}`, origin).toString(), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...toolCatalog.map((item) => ({ url: new URL(`/${locale}/tools/${item.slug}`, origin).toString(), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getJournalArticles().map((item) => ({ url: new URL(`/${locale}/journal/${item.slug}`, origin).toString(), lastModified: new Date(item.date), changeFrequency: "yearly" as const, priority: 0.5 }))
  ]);
  return [...staticEntries, ...dynamicEntries];
}
