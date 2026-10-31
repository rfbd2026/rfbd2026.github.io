export function splitLocalizedBody(content: string): Record<"en" | "fa", string> {
  const enMarker = "<!-- en -->";
  const faMarker = "<!-- fa -->";
  const enStart = content.indexOf(enMarker);
  const faStart = content.indexOf(faMarker);
  if (enStart < 0 || faStart < 0 || faStart <= enStart) throw new Error("Localized Markdown requires <!-- en --> followed by <!-- fa -->.");
  return {
    en: content.slice(enStart + enMarker.length, faStart).trim(),
    fa: content.slice(faStart + faMarker.length).trim()
  };
}

export function markdownBlocks(content: string): Array<{ type: "heading" | "paragraph"; text: string }> {
  return content.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean).map((block) => {
    if (block.startsWith("## ")) return { type: "heading" as const, text: block.slice(3).replace(/\s*\n\s*/g, " ") };
    return { type: "paragraph" as const, text: block.replace(/\s*\n\s*/g, " ") };
  });
}

export function wordCount(text: string): number {
  return text.replace(/<!--.*?-->/gs, " ").trim().split(/\s+/u).filter(Boolean).length;
}
