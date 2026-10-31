"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useCart } from "@/components/cart-provider";

const links = [
  ["work", "/work"],
  ["about", "/about"],
  ["shop", "/shop"],
  ["tools", "/tools"],
  ["journal", "/journal"],
  ["review", "/review"]
] as const;

const serviceLabels = {
  en: ["Visual identity", "Packaging systems", "Product stories", "Campaign graphics", "Illustration", "Editorial design"],
  fa: ["هویت بصری", "سیستم بسته‌بندی", "روایت محصول", "گرافیک کمپین", "تصویرسازی", "طراحی تحریریه"]
};

const listVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.14, staggerChildren: 0.075 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.2, 0.7, 0.2, 1] } }
};

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const nextLocale = locale === "fa" ? "en" : "fa";
  const switchLabel = locale === "fa" ? "English" : "فارسی";
  const services = serviceLabels[locale as "en" | "fa"];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-rail" data-open={open}>
      <Link href="/" className="site-rail__mark" dir="ltr" aria-label="Aref Bahadori — home" onClick={() => setOpen(false)}>
        <span>A</span><i>/</i><span>B</span>
      </Link>
      <span className="site-rail__wordmark" aria-hidden="true">AREF BAHADORI</span>
      <Link
        href={pathname as never}
        locale={nextLocale}
        className="site-rail__lang"
        lang={nextLocale}
        aria-label={`تغییر زبان به ${switchLabel} / Switch to ${switchLabel}`}
        title={`تغییر زبان به ${switchLabel} / Switch to ${switchLabel}`}
        onClick={() => setOpen(false)}
      >
        <span className="site-rail__lang-pill">
          <span className={`site-rail__lang-opt ${locale === "fa" ? "is-active" : ""}`}>فا</span>
          <span className="site-rail__lang-slash">/</span>
          <span className={`site-rail__lang-opt ${locale === "en" ? "is-active" : ""}`}>EN</span>
        </span>
      </Link>
      <button
        type="button"
        className="site-rail__toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? t("close") : t("menu")}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
      </button>
      <Link href="/contact" className="site-rail__contact" onClick={() => setOpen(false)}>
        <span>{t("contact")}</span><ArrowUpRight size={15} aria-hidden="true" />
      </Link>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="site-menu"
            id="site-menu"
            className="step1-menu"
            aria-labelledby="site-menu-heading"
            initial={reducedMotion ? false : { y: "-100%" }}
            animate={{ y: "0%" }}
            exit={reducedMotion ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="step1-menu__topline">
              <p id="site-menu-heading">{locale === "fa" ? "فهرست" : "INDEX"}</p>
              <span>{locale === "fa" ? "فورت ورث · تگزاس" : "FORT WORTH · TEXAS"}</span>
            </div>
            <div className="step1-menu__columns">
              <motion.nav className="step1-menu__pages" aria-label={locale === "fa" ? "صفحه‌ها" : "Pages"} variants={listVariants} initial={reducedMotion ? false : "hidden"} animate="visible">
                {links.map(([key, href], index) => (
                  <motion.div key={key} variants={reducedMotion ? undefined : itemVariants}>
                    <Link href={href} onClick={() => setOpen(false)} className="step1-menu__page-link">
                      <span>{String(index + 1).padStart(2, "0")}</span><strong>{t(key)}</strong><ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
              <motion.div className="step1-menu__services" variants={listVariants} initial={reducedMotion ? false : "hidden"} animate="visible">
                <p>{locale === "fa" ? "حوزه‌های کاری" : "AREAS OF PRACTICE"}</p>
                <ol>{services.map((service, index) => (
                  <motion.li key={service} variants={reducedMotion ? undefined : itemVariants}><span>{String(index + 1).padStart(2, "0")}</span>{service}</motion.li>
                ))}</ol>
              </motion.div>
              <motion.div className="step1-menu__invite" initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.38, delay: reducedMotion ? 0 : 0.2 }}>
                <span>{locale === "fa" ? "همکاری" : "COLLABORATION"}</span>
                <p>{locale === "fa" ? "برای محصول بعدی‌تان یک زبان بصری روشن بسازیم." : "Let's give your next product a clear visual language."}</p>
                <Link href="/contact" onClick={() => setOpen(false)}>{t("contact")}<ArrowUpRight size={17} aria-hidden="true" /></Link>
              </motion.div>
            </div>
            <div className="step1-menu__utilities">
              <Link href="/cart" onClick={() => setOpen(false)} aria-label={`${t("cart")} (${items.length})`}><ShoppingBag size={14} aria-hidden="true" />{t("cart")} <b>{items.length}</b></Link>
              <Link href={pathname as never} locale={nextLocale} onClick={() => setOpen(false)} lang={nextLocale} aria-label={t("language")}>{switchLabel}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
