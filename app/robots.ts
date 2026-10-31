import type { MetadataRoute } from "next";

function publicOrigin() {
  const value = process.env.PUBLIC_APP_URL?.trim();
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === "https:" ? url : undefined; }
  catch { return undefined; }
}

export default function robots(): MetadataRoute.Robots {
  const origin = publicOrigin();
  if (!origin) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/account/", "/cart"] },
    sitemap: new URL("/sitemap.xml", origin).toString(),
    host: origin.host
  };
}
