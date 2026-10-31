import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "shop" });
  return pageMetadata(params.locale, "/shop", t("title"), t("intro"));
}

export default async function ShopPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "shop" });
  const common = await getTranslations({ locale, namespace: "common" });
  const fa = locale === "fa";
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}><p>{t("intro")}</p></PageIntro>
      <section className="shop-pending mt-8" role="status"><span aria-hidden="true">—</span><div><strong>{t("filesPending")}</strong><p>{common("checkoutPaused")}</p></div></section>
      <section className="shop-grid section-space" aria-label={fa ? "محصولات" : "Planned products"}>{products.map((product) => <ProductCard key={product.slug} product={product} locale={locale} />)}</section>
      <section className="free-palette-callout border-t border-rule py-10"><div><p className="eyebrow">{t("freeLead")}</p><p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{t("freeLeadText")}</p></div><Link href="/downloads/free-50-color-palettes.json" className="button button--outline" download>{fa ? "دانلود مجموعه رایگان" : "Download the free 50-pack"} ↗</Link></section>
    </div>
  );
}
