import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/ui";
import { CartView } from "@/components/cart-view";
import { CryptoTestnetDemo } from "@/components/crypto-testnet-demo";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const fa = params.locale === "fa";
  return pageMetadata(params.locale, "/cart", fa ? "فهرست انتخاب‌ها" : "Preview cart", fa ? "محصولات انتخاب‌شده؛ خرید هنوز باز نشده است." : "Your saved products. Checkout isn’t open yet.");
}

export default async function CartPage({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "shop" });
  const fa = params.locale === "fa";
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("cart")} title={fa ? "فهرست انتخاب‌ها" : "Preview cart"}>
        <p>{fa ? "محصولات را ذخیره کنید تا بعداً ببینید؛ پرداخت هنوز در دسترس نیست." : "Save products to look at later. Payment isn’t available yet."}</p>
      </PageIntro>
      <section className="py-9 md:py-12"><CartView locale={params.locale} /></section>
      {fa ? <CryptoTestnetDemo locale={params.locale} /> : null}
    </div>
  );
}
