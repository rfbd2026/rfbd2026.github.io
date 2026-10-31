import type { Locale } from "@/lib/content/projects";

export const toolCatalog = [
  { slug: "image-to-palette", key: "paletteTitle", descriptionKey: "paletteDescription", kind: "palette" },
  { slug: "font-pairing", key: "fontTitle", descriptionKey: "fontDescription", kind: "font" },
  { slug: "instagram-safe-zones", key: "safeTitle", descriptionKey: "safeDescription", kind: "safe" }
] as const;

export type ToolSlug = (typeof toolCatalog)[number]["slug"];
export function getTool(slug: string) {
  return toolCatalog.find((tool) => tool.slug === slug);
}
export function toolTitleKey(slug: string) {
  return getTool(slug)?.key;
}
export function localizedToolDescription(locale: Locale, slug: string, values: Record<string, (key: string) => string>) {
  const tool = getTool(slug);
  return tool ? values[locale](tool.descriptionKey) : "";
}
