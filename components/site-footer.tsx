import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FooterWordmarkReveal } from "@/components/footer-wordmark-reveal";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const legal = useTranslations("legal");
  const locale = useLocale();
  const rtl = locale === "fa";
  const services = rtl
    ? ["هویت بصری", "سیستم بسته‌بندی", "روایت محصول", "گرافیک کمپین", "تصویرسازی", "طراحی تحریریه"]
    : ["Visual identity", "Packaging systems", "Product stories", "Campaign graphics", "Illustration", "Editorial design"];

  return (
    <footer className="step1-footer">
      <div className="step1-footer__inner">
        <div className="step1-footer__columns">
          <div className="step1-footer__brand">
            <Link href="/" className="step1-footer__mark" dir="ltr" aria-label="Aref Bahadori — home">A<span>/</span>B</Link>
            <p>{t("line")}</p>
            <small>{t("location")}</small>
          </div>
          <nav className="step1-footer__column" aria-label={rtl ? "پیمایش" : "Explore"}>
            <h2>{rtl ? "پیمایش" : "EXPLORE"}</h2>
            <Link href="/work">{nav("work")}</Link>
            <Link href="/about">{nav("about")}</Link>
            <Link href="/shop">{nav("shop")}</Link>
            <Link href="/journal">{nav("journal")}</Link>
            <Link href="/tools">{nav("tools")}</Link>
          </nav>
          <div className="step1-footer__column">
            <h2>{rtl ? "حوزه‌های کاری" : "SERVICES"}</h2>
            {services.map((service) => <Link href="/contact" key={service}>{service}</Link>)}
          </div>
          <div className="step1-footer__column step1-footer__contact">
            <h2>{rtl ? "در تماس باشیم" : "CONTACT"}</h2>
            <p>{rtl ? "برای محصول و ایده بعدی‌تان پیام بفرستید." : "Share a little about the product or idea you are working on."}</p>
            <Link href="/contact" className="step1-footer__contact-link">{nav("contact")}<ArrowUpRight size={15} aria-hidden="true" /></Link>
            <div className="step1-footer__legal">
              <Link href="/terms">{legal("terms")}</Link>
              <Link href="/privacy">{legal("privacy")}</Link>
              <Link href="/license">{legal("license")}</Link>
              <Link href="/account/downloads">{nav("account")}</Link>
            </div>
          </div>
        </div>
        <FooterWordmarkReveal className="step1-footer__location"><span dir="ltr">FORT WORTH<span> · </span>TEXAS</span></FooterWordmarkReveal>
        <div className="step1-footer__bottom">
          <span>© {new Date().getFullYear()} Aref Bahadori. {t("rights")}</span>
          <span>{t("note")}</span>
        </div>
      </div>
    </footer>
  );
}
