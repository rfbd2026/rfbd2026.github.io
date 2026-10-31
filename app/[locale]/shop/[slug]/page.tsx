import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/ui";
import { ProductPreview } from "@/components/product-preview";
import { AddToCart } from "@/components/add-to-cart";
import { getProduct, products, formatProductPrice, formatSecondaryPrice } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export function generateStaticParams() {
  return products.flatMap((product) => [
    { locale: "en", slug: product.slug },
    { locale: "fa", slug: product.slug }
  ]);
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return {};
  return pageMetadata(params.locale, `/shop/${product.slug}`, product.title[params.locale], product.summary[params.locale]);
}

export default async function ProductPage({ params }: { params: { locale: Locale; slug: string } }) {
  const locale = params.locale;
  const product = getProduct(params.slug);
  if (!product) notFound();
  const t = await getTranslations({ locale, namespace: "shop" });
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title[locale],
    description: product.summary[locale],
    category: "Digital design resource",
    brand: { "@type": "Person", name: "Aref Bahadori" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Availability", value: "Preview only; final native product files are pending" },
      { "@type": "PropertyValue", name: "License", value: product.license[locale] }
    ]
  };
  const schemaText = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={product.title[locale]}><p>{product.summary[locale]}</p></PageIntro>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaText }} />
      <section className="product-detail section-space">
        <ProductPreview product={product} locale={locale} />
        <div className="product-detail__content">
          <p className="product-status-label">{t("preview")}</p>
          <p className="mt-4 text-sm leading-7 text-muted">{t("filesPending")}</p>
          <div className="mt-6 border-y border-rule py-5"><p className="text-xs uppercase tracking-wider text-muted">{t("price")}</p><p className="mt-2 text-2xl font-semibold">{formatProductPrice(product, locale)}</p><p className="mt-1 text-sm text-muted">{formatSecondaryPrice(product, locale)}</p></div>
          <h2 className="mt-7 text-xs font-bold uppercase tracking-wider">{t("whatsInside")}</h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-7">{product.included[locale].map((item) => <li key={item}>{item}</li>)}</ul>
          <h2 className="mt-7 text-xs font-bold uppercase tracking-wider">{t("license")}</h2><p className="mt-2 text-sm leading-7">{product.license[locale]}</p>
          <p className="mt-6 rounded-sm border border-cobalt/30 bg-cobalt/5 p-4 text-sm leading-7">{t("checkoutDisabled")}</p>
          <div className="mt-6"><AddToCart slug={product.slug} locale={locale} /></div>
          <p className="mt-3 text-xs leading-6 text-muted">{t("downloadLabel")}</p>
        </div>
      </section>
    </div>
  );
}
