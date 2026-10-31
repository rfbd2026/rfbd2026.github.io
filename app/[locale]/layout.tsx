import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/sora";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-provider";
import { routing } from "@/i18n/routing";

function publicOrigin(): URL | undefined {
  const value = process.env.PUBLIC_APP_URL?.trim();
  if (!value) return undefined;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed : undefined;
  } catch {
    return undefined;
  }
}

// The stable, platform-provided Preview origin resolves generated OG images;
// it does not enable indexing or become a canonical production URL.
const previewMetadataBase = new URL("https://8328-ipysgvdgpeaubm9lpu84l-86deecde.us4.manus.computer");

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = routing.locales.find((candidate) => candidate === params.locale);
  if (!locale) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  const origin = publicOrigin();

  return {
    metadataBase: origin ?? previewMetadataBase,
    title: t("title"),
    description: t("description"),
    robots: {
      index: Boolean(origin),
      follow: Boolean(origin),
      googleBot: { index: Boolean(origin), follow: Boolean(origin) }
    },
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
      title: t("title"),
      description: t("description"),
      siteName: "Aref Bahadori"
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = routing.locales.find((candidate) => candidate === params.locale);
  if (!locale) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });
  const isPersian = locale === "fa";

  return (
    <html lang={locale} dir={isPersian ? "rtl" : "ltr"}>
      <body className={isPersian ? "font-persian" : "font-sans"}>
        <CartProvider>
          <NextIntlClientProvider messages={messages}>
            <a className="skip-link" href="#main-content">{t("skip")}</a>
            <SiteHeader />
            <main id="main-content" tabIndex={-1}>{children}</main>
            <SiteFooter />
          </NextIntlClientProvider>
        </CartProvider>
      </body>
    </html>
  );
}
