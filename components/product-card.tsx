import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/content/projects";
import { formatProductPrice, formatSecondaryPrice, type Product } from "@/lib/products";
import { ProductPreview } from "@/components/product-preview";
import { AddToCart } from "@/components/add-to-cart";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  return (
    <article className="shop-card">
      <Link href={`/shop/${product.slug}`} className="shop-card__visual no-underline"><ProductPreview product={product} locale={locale} compact /></Link>
      <div className="shop-card__body">
        <p className="eyebrow">{locale === "fa" ? "محصول برنامه‌ریزی‌شده" : "Planned product"}</p>
        <h2 className="mt-3 font-display text-xl leading-snug tracking-editorial"><Link href={`/shop/${product.slug}`} className="no-underline hover:text-cobalt">{product.title[locale]}</Link></h2>
        <p className="mt-3 text-sm leading-7 text-muted">{product.summary[locale]}</p>
        <div className="mt-5"><p className="text-lg font-semibold">{formatProductPrice(product, locale)}</p><p className="mt-1 text-xs text-muted">{formatSecondaryPrice(product, locale)}</p></div>
        <div className="mt-5 flex flex-wrap items-center gap-3"><Link href={`/shop/${product.slug}`} className="text-link">{locale === "fa" ? "محتوا و مجوز" : "Contents & license"} ↗</Link><AddToCart slug={product.slug} locale={locale} /></div>
      </div>
    </article>
  );
}
