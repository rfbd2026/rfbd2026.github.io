"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, Maximize2, X } from "lucide-react";
import type { Locale } from "@/lib/content/projects";

const pages = [
  { id: 1, title_fa: "جلد پورتفولیو — گزیده آثار", title_en: "Portfolio Cover — Selected Works", file: "/portfolio_pages/page_01.webp" },
  { id: 2, title_fa: "درباره من، سوابق و مهارت‌ها", title_en: "About, Experience & Skills", file: "/portfolio_pages/page_02.webp" },
  { id: 3, title_fa: "برندینگ و هویت بصری — DEKATEAM", title_en: "Branding & Visual Identity — DEKATEAM", file: "/portfolio_pages/page_03.webp" },
  { id: 4, title_fa: "طراحی بسته‌بندی — رویکرد و فرآیند فنی", title_en: "Packaging Design — Technical Approach", file: "/portfolio_pages/page_04.webp" },
  { id: 5, title_fa: "طراحی بسته‌بندی — سیستم‌های بسته‌بندی محصول", title_en: "Packaging Design — Product Systems", file: "/portfolio_pages/page_05.webp" },
  { id: 6, title_fa: "طراحی بسته‌بندی — شیشه‌ها و قوطی‌ها", title_en: "Packaging Design — Bottles & Jars", file: "/portfolio_pages/page_06.webp" },
  { id: 7, title_fa: "طراحی بسته‌بندی چای‌های گیاهی", title_en: "Herbal Tea Pouch Packaging Series", file: "/portfolio_pages/page_07.webp" },
  { id: 8, title_fa: "طراحی بسته‌بندی — پکیجینگ و موکاپ", title_en: "Packaging Design — Mockups & Unboxing", file: "/portfolio_pages/page_08.webp" },
  { id: 9, title_fa: "طراحی مسکات و استیکر — رویال پک", title_en: "Mascot & Sticker Pack — Royal Pack", file: "/portfolio_pages/page_09.webp" },
  { id: 10, title_fa: "طراحی لوگو — سفرنامه خارجی و تیم بیسبال", title_en: "Logo Design — Travelogue & Baseball Team", file: "/portfolio_pages/page_10.webp" },
  { id: 11, title_fa: "طراحی کامل کارت‌های بازی و بسته‌بندی", title_en: "Playing Cards & Custom Box Packaging", file: "/portfolio_pages/page_11.webp" },
  { id: 12, title_fa: "طراحی بروشور و کاتالوگ تحریریه", title_en: "Editorial Catalogues & Brochures", file: "/portfolio_pages/page_12.webp" },
  { id: 13, title_fa: "طراحی بنر و کمپین وب‌سایت", title_en: "Website Banner & Digital Campaigns", file: "/portfolio_pages/page_13.webp" },
  { id: 14, title_fa: "طراحی بنرهای تبلیغاتی دیجیتال", title_en: "Digital Advertising & Promo Banners", file: "/portfolio_pages/page_14.webp" },
  { id: 15, title_fa: "طراحی بنر دیسکریپشن آمازون (A+ Content) - بخش اول", title_en: "Amazon A+ Description Banners - Part 1", file: "/portfolio_pages/page_15.webp" },
  { id: 16, title_fa: "طراحی بنر دیسکریپشن آمازون (A+ Content) - بخش دوم", title_en: "Amazon A+ Description Banners - Part 2", file: "/portfolio_pages/page_16.webp" },
  { id: 17, title_fa: "عکاسی صنعتی و تبلیغاتی محصول", title_en: "Industrial & Product Photography", file: "/portfolio_pages/page_17.webp" },
  { id: 18, title_fa: "نمونه تولید تصویر با هوش مصنوعی (Promptography)", title_en: "AI Promptography & Image Synthesis", file: "/portfolio_pages/page_18.webp" },
  { id: 19, title_fa: "تماس و اطلاعات ارتباطی مستقیم", title_en: "Contact & Direct Channels", file: "/portfolio_pages/page_19.webp" },
  { id: 20, title_fa: "پشت جلد پورتفولیو", title_en: "Portfolio Back Cover", file: "/portfolio_pages/page_20.webp" },
];

export function PortfolioBookViewer({ locale }: { locale: Locale }) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const fa = locale === "fa";

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : pages.length - 1));
  const next = () => setCurrent((c) => (c < pages.length - 1 ? c + 1 : 0));

  const page = pages[current];

  return (
    <section className="portfolio-book-section my-16 border border-rule bg-white p-4 sm:p-8 rounded-xl shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
        <div>
          <span className="eyebrow text-cobalt font-mono uppercase tracking-wider text-xs">
            {fa ? "کتابچه کامل پورتفولیو (Adobe Illustrator 2026)" : "Full Portfolio Presentation (Adobe Illustrator 2026)"}
          </span>
          <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold">
            {fa ? page.title_fa : page.title_en}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/downloads/Aref-Bahadori-Portfolio-2026.pdf"
            download="Aref-Bahadori-Portfolio-2026.pdf"
            className="button button--secondary inline-flex items-center gap-2 text-xs py-2 px-3.5"
            title={fa ? "دانلود فایل کامل PDF" : "Download Full PDF"}
          >
            <Download size={14} />
            <span>{fa ? "دانلود نسخه PDF (۲۳ مگابایت)" : "Download PDF (23 MB)"}</span>
          </a>

          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="button button--secondary p-2"
            aria-label={fa ? "نمایش تمام‌صفحه" : "Fullscreen"}
            title={fa ? "نمایش تمام‌صفحه" : "Fullscreen"}
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#0e0e0e] border border-rule group flex items-center justify-center">
        <Image
          src={page.file}
          alt={fa ? page.title_fa : page.title_en}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1100px"
          className="object-contain"
        />

        <button
          type="button"
          onClick={prev}
          aria-label={fa ? "صفحه قبل" : "Previous page"}
          className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/85 text-white p-2.5 transition shadow-lg backdrop-blur-sm"
        >
          <ChevronRight className={fa ? "" : "rotate-180"} size={22} />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label={fa ? "صفحه بعد" : "Next page"}
          className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/85 text-white p-2.5 transition shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft className={fa ? "" : "rotate-180"} size={22} />
        </button>

        <div className="absolute bottom-3 start-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-mono">
          {fa ? `صفحه ${current + 1} از ${pages.length}` : `Page ${current + 1} of ${pages.length}`}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {pages.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setCurrent(idx)}
            className={`relative flex-shrink-0 w-16 h-12 rounded border overflow-hidden transition ${
              current === idx ? "border-[var(--cobalt)] ring-2 ring-[var(--cobalt)]" : "border-rule opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={p.file} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/20">
            <span className="text-sm font-medium">{fa ? page.title_fa : page.title_en}</span>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-white/70">
                {current + 1} / {pages.length}
              </span>
              <button
                type="button"
                onClick={() => setFullscreen(false)}
                className="p-1 rounded bg-white/10 hover:bg-white/25 text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="relative flex-1 w-full my-2 flex items-center justify-center">
            <Image
              src={page.file}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
            <button
              type="button"
              onClick={prev}
              className="absolute start-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full"
            >
              <ChevronRight className={fa ? "" : "rotate-180"} size={26} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute end-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full"
            >
              <ChevronLeft className={fa ? "" : "rotate-180"} size={26} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
