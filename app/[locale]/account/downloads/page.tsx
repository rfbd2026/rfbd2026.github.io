import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/content/projects";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "account" });
  return pageMetadata(params.locale, "/account/downloads", t("title"), t("intro"));
}

export default async function DownloadsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "account" });
  const shop = await getTranslations({ locale, namespace: "shop" });
  return (
    <div className="site-shell page-space">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}><p>{t("intro")}</p></PageIntro>
      <section className="access-pending paper-panel mt-9 p-6 sm:p-10" role="status">
        <span className="access-pending__mark" aria-hidden="true">—</span>
        <p className="eyebrow">{locale === "fa" ? "ورود در حال حاضر خاموش است" : "Sign-in is currently off"}</p>
        <h2 className="mt-4 font-display text-2xl sm:text-3xl">{t("disabled")}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{locale === "fa" ? "برای رعایت تنظیم فعلی، هیچ پیوند ورود یا ایمیلی ساخته یا فرستاده نمی‌شود. پس از مجوزدهی سرویس ایمیل و آماده‌شدن فایل‌های نهایی، دسترسی امن دانلود فعال می‌شود." : "No sign-in token is created and no customer email is sent. Secure downloads will be available only after email delivery is authorized and the final product files are ready."}</p>
        <p className="mt-4 text-xs leading-6 text-muted">{shop("filesPending")}</p>
        <Link href="/shop" className="button button--ink mt-7">{locale === "fa" ? "بازگشت به فروشگاه" : "Return to the shop"} <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
