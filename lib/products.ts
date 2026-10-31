import type { Locale } from "@/lib/content/projects";

export type Product = {
  slug: string;
  style: "packaging" | "deck" | "amazon" | "palette";
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  priceUsd: number;
  priceToman: number;
  included: Record<Locale, string[]>;
  license: Record<Locale, string>;
  previewAlt: Record<Locale, string>;
};

export const products: Product[] = [
  {
    slug: "packaging-mockup-kit",
    style: "packaging",
    title: { en: "Packaging Mockup Kit — Premium Box & Pouch", fa: "کیت موکاپ بسته‌بندی — جعبه و پاکت پریمیوم" },
    summary: { en: "Ten editable mockup scenes for box, pouch, and tube packaging.", fa: "ده صحنه موکاپ قابل‌ویرایش برای بسته‌بندی جعبه، پاکت و تیوب." },
    priceUsd: 29,
    priceToman: 1290000,
    included: {
      en: ["10 PSD mockups for box, pouch, and tube formats", "Smart objects, 4K output, and tidy layers", "A short PDF guide"],
      fa: ["۱۰ موکاپ PSD برای جعبه، پاکت و تیوب", "اسمارت‌آبجکت، خروجی 4K و لایه‌های مرتب", "یک راهنمای کوتاه PDF"]
    },
    license: { en: "Personal + Commercial", fa: "استفاده شخصی و تجاری" },
    previewAlt: { en: "Illustrative packaging scene. The PSD files aren’t ready yet.", fa: "صحنه تصویری بسته‌بندی. فایل‌های PSD هنوز آماده نیستند." }
  },
  {
    slug: "bilingual-brand-identity-deck-template",
    style: "deck",
    title: { en: "Bilingual Brand Identity Deck Template", fa: "قالب ارائه هویت برند دوزبانه" },
    summary: { en: "A 30-slide identity presentation template for Persian and English.", fa: "قالب ۳۰ اسلایدی برای ارائه هویت برند، به فارسی و انگلیسی." },
    priceUsd: 39,
    priceToman: 1890000,
    included: {
      en: ["Figma, InDesign, and PowerPoint files", "30 slides on one consistent grid", "Persian and English text styles", "Crop-mark motif"],
      fa: ["فایل‌های Figma، InDesign و PowerPoint", "۳۰ اسلاید با یک شبکه‌بندی یکدست", "استایل‌های متن فارسی و انگلیسی", "طرح علامت‌های برش (کراپ مارک)"]
    },
    license: { en: "Personal + Commercial", fa: "استفاده شخصی و تجاری" },
    previewAlt: { en: "Illustrative bilingual presentation spread. The template files aren’t ready yet.", fa: "نمونه تصویری ارائه دوزبانه. فایل‌های قالب هنوز آماده نیستند." }
  },
  {
    slug: "amazon-a-plus-content-listing-kit",
    style: "amazon",
    title: { en: "Amazon A+ Content & Listing Kit", fa: "کیت محتوای A+ و صفحه محصول آمازون" },
    summary: { en: "Six Photoshop layout templates for product listings and A+ modules.", fa: "شش قالب Photoshop برای صفحه محصول و ماژول‌های A+." },
    priceUsd: 24,
    priceToman: 990000,
    included: {
      en: ["6 Photoshop templates", "Comparison chart, lifestyle banner, and specification sheet", "5 color variations"],
      fa: ["۶ قالب Photoshop", "جدول مقایسه، بنر لایف‌استایل و برگه مشخصات", "۵ نسخه رنگی"]
    },
    license: { en: "Commercial use for client work allowed", fa: "استفاده تجاری در پروژه‌های مشتری مجاز است" },
    previewAlt: { en: "Illustrative product-listing layout. The Photoshop files aren’t ready yet.", fa: "نمونه تصویری صفحه محصول. فایل‌های Photoshop هنوز آماده نیستند." }
  },
  {
    slug: "100-editorial-color-palettes",
    style: "palette",
    title: { en: "100 Editorial Color Palettes — Print & Digital", fa: "۱۰۰ پالت رنگی تحریریه — چاپ و دیجیتال" },
    summary: { en: "A swatch collection with print and digital color values.", fa: "مجموعه‌ای از سواچ‌های رنگ، با مقدار رنگ برای چاپ و دیجیتال." },
    priceUsd: 19,
    priceToman: 690000,
    included: {
      en: ["ASE swatches and a Figma library", "CSS variables", "PDF swatch book with CMYK, RGB, and HEX values plus inspiration images"],
      fa: ["سواچ‌های ASE و کتابخانه Figma", "متغیرهای CSS", "کتابچه رنگ PDF با مقدارهای CMYK، RGB، HEX و تصویرهای الهام‌بخش"]
    },
    license: { en: "Personal + Commercial", fa: "استفاده شخصی و تجاری" },
    previewAlt: { en: "Illustrative palette preview. The paid 100-palette bundle isn’t ready yet.", fa: "نمونه تصویری پالت. بسته پولی ۱۰۰ پالت هنوز آماده نیست." }
  }
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function formatProductPrice(product: Product, locale: Locale): string {
  if (locale === "fa") {
    return `${new Intl.NumberFormat("fa-IR").format(product.priceToman)} تومان`;
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.priceUsd);
}

export function formatSecondaryPrice(product: Product, locale: Locale): string {
  if (locale === "fa") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.priceUsd);
  }
  return `${new Intl.NumberFormat("en-US").format(product.priceToman)} Toman`;
}
