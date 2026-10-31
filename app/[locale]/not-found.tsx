import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/ui";
import type { Locale } from "@/lib/content/projects";

export default function LocaleNotFound({ params }: { params?: { locale?: Locale } } = {}) {
  const fa = params?.locale === "fa";
  return <div className="site-shell page-space"><PageIntro eyebrow={fa ? "نشانی پیدا نشد" : "Page not found"} title={fa ? "این صفحه در آرشیو نیست." : "This page isn’t in the archive."}><p>{fa ? "پیوند را بررسی کنید یا از آثار منتخب شروع کنید." : "Check the link or return to selected work."}</p></PageIntro><Link className="button button--ink mt-8" href="/work">{fa ? "دیدن آثار" : "View the work"} ↗</Link></div>;
}
