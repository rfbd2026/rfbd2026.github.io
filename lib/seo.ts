import type { Metadata } from "next";
import type { Locale } from "@/lib/content/projects";

function publicOrigin(): URL | undefined {
  const value = process.env.PUBLIC_APP_URL?.trim();
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return undefined;
    return url;
  } catch {
    return undefined;
  }
}

function localizedPath(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${suffix}`;
}

export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const origin = publicOrigin();
  const currentPath = localizedPath(locale, path);
  const fullTitle = title === "Aref Bahadori" ? title : `${title} | Aref Bahadori`;
  const canonical = origin ? new URL(currentPath, origin) : undefined;
  const languages = origin ? {
    en: new URL(localizedPath("en", path), origin),
    fa: new URL(localizedPath("fa", path), origin)
  } : undefined;
  const socialImage = origin ? new URL(`/${locale}/opengraph-image`, origin) : undefined;
  const keywords = locale === "fa"
    ? ["عارف بهادری", "هویت بصری", "طراحی بسته‌بندی", "طراحی گرافیک"]
    : ["Aref Bahadori", "visual identity", "packaging design", "graphic design"];

  return {
    ...(origin ? { metadataBase: origin } : {}),
    title: fullTitle,
    description,
    keywords,
    ...(canonical && languages ? { alternates: { canonical, languages } } : {}),
    robots: { index: Boolean(origin), follow: Boolean(origin) },
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
      title: fullTitle,
      description,
      siteName: "Aref Bahadori",
      ...(canonical ? { url: canonical } : {}),
      ...(socialImage ? { images: [{ url: socialImage, width: 1200, height: 630, alt: "Aref Bahadori — Visual Identity and Packaging" }] } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(socialImage ? { images: [socialImage] } : {})
    }
  };
}
