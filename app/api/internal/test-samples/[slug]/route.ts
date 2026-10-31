import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const sampleFiles: Record<string, string> = {
  "packaging-mockup-kit": "packaging-mockup-kit.txt",
  "bilingual-brand-identity-deck-template": "bilingual-brand-identity-deck-template.txt",
  "amazon-a-plus-content-listing-kit": "amazon-a-plus-content-listing-kit.txt",
  "100-editorial-color-palettes": "100-editorial-color-palettes.txt"
};

const unavailable = () => NextResponse.json(
  { error: "Internal test samples are unavailable." },
  { status: 404, headers: { "Cache-Control": "no-store" } }
);

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  // Never expose fixtures in production Preview or any deployed environment.
  if (process.env.NODE_ENV === "production" || process.env.ALLOW_INTERNAL_TEST_SAMPLE_DOWNLOADS !== "true") {
    return unavailable();
  }

  const fileName = sampleFiles[params.slug];
  if (!fileName) return unavailable();

  try {
    const filePath = path.join(process.cwd(), "private", "test-samples", fileName);
    const content = await readFile(filePath);
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${params.slug}-TEST-SAMPLE-NOT-FINAL.txt"`,
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch {
    return unavailable();
  }
}
