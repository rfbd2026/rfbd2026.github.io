"use client";

import { useCart } from "@/components/cart-provider";
import { Link } from "@/i18n/navigation";
import { formatProductPrice, formatSecondaryPrice, getProduct } from "@/lib/products";
import type { Locale } from "@/lib/content/projects";

export function CartView({ locale }: { locale: Locale }) {
  const { items, remove, clear } = useCart();
  const products = items.map(getProduct).filter((product): product is NonNullable<typeof product> => Boolean(product));
  const fa = locale === "fa";

  return (
    <div className="cart-layout">
      <section className="cart-list" aria-label={fa ? "موارد ذخیره‌شده" : "Saved items"}>
        {products.length ? products.map((product) => (
          <article className="cart-row" key={product.slug}>
            <div><Link href={`/shop/${product.slug}`} className="font-semibold no-underline hover:text-cobalt">{product.title[locale]}</Link><p className="mt-2 text-xs text-muted">{fa ? "فقط برای ذخیره؛ خرید هنوز باز نشده" : "Saved for later; checkout isn’t open yet"}</p></div>
            <div className="text-end"><p className="font-semibold">{formatProductPrice(product, locale)}</p><p className="mt-1 text-xs text-muted">{formatSecondaryPrice(product, locale)}</p><button className="text-xs text-cobalt underline underline-offset-4" type="button" onClick={() => remove(product.slug)}>{fa ? "حذف" : "Remove"}</button></div>
          </article>
        )) : <div className="cart-empty"><p>{fa ? "هنوز چیزی در فهرست نیست." : "Your list is empty."}</p><Link href="/shop" className="text-link mt-4">{fa ? "دیدن فروشگاه" : "Browse the shop"} ↗</Link></div>}
      </section>
      <aside className="cart-summary paper-panel p-6 sm:p-8">
        <p className="eyebrow">{fa ? "وضعیت فروشگاه" : "Shop status"}</p>
        <h2 className="mt-4 font-display text-2xl">{fa ? "خرید متوقف است" : "Purchases are paused"}</h2>
        <p className="mt-4 text-sm leading-7 text-muted">{fa ? "قیمت‌ها فقط برای اطلاع هستند. تا آماده شدن فایل‌های نهایی، پرداخت و دانلودی وجود ندارد." : "Prices are for information only. Payment and downloads aren’t available until the final files are ready."}</p>
        <button className="button button--disabled mt-6 w-full" type="button" disabled aria-disabled="true">{fa ? "پرداخت غیرفعال است" : "Checkout disabled"}</button>
        {products.length ? <button className="mt-4 text-xs text-muted underline underline-offset-4" type="button" onClick={clear}>{fa ? "پاک کردن فهرست" : "Clear list"}</button> : null}
      </aside>
    </div>
  );
}
