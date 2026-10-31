import type { Locale } from "@/lib/content/projects";

export type LegalSlug = "terms" | "privacy" | "license";
export const legalContent: Record<LegalSlug, Record<Locale, { title: string; intro: string; sections: Array<{ heading: string; body: string }> }>> = {
  terms: {
    en: {
      title: "Terms of Use",
      intro: "This site is a portfolio with a shop preview. The digital products and payments aren’t open yet.",
      sections: [
        { heading: "Preview status", body: "Product pages show planned contents and prices. The final files aren’t ready, payment buttons are off, and nothing on this site creates a sale, a download, or a license. Prices are for information only. Any sample files you see are not finished products." },
        { heading: "Portfolio work", body: "The portfolio shows selected images of my work. Some marks or artwork may have been made for clients. Showing them here doesn’t transfer copyright or give anyone permission to copy, resell, or use them in another project." },
        { heading: "Future purchases", body: "Before purchases open, I’ll finish and check the product files, publish the final license text, set up payments, and update these terms. For now the site doesn’t accept real payments. Nothing on this page is legal, tax, or financial advice." },
        { heading: "Contact", body: "You can send a project inquiry through the contact form. I read it and follow up myself. The site doesn’t send automatic replies while email is turned off." }
      ]
    },
    fa: {
      title: "شرایط استفاده",
      intro: "این سایت یک پورتفولیو همراه با پیش‌نمایش فروشگاه است. محصولات دیجیتال و پرداخت هنوز باز نشده‌اند.",
      sections: [
        { heading: "وضعیت پیش‌نمایش", body: "صفحه‌های محصول، محتویات و قیمت‌های برنامه‌ریزی‌شده را نشان می‌دهند. فایل‌های نهایی هنوز آماده نیستند، دکمه‌های پرداخت غیرفعال‌اند و هیچ‌چیز در این سایت فروش، دانلود یا مجوز ایجاد نمی‌کند. قیمت‌ها فقط برای اطلاع هستند. فایل‌های نمونه‌ای که می‌بینید محصول نهایی نیستند." },
        { heading: "کارهای پورتفولیو", body: "پورتفولیو تصویرهای منتخبی از کارهای من را نشان می‌دهد. بعضی نشانه‌ها یا آثار ممکن است برای مشتری ساخته شده باشند. نمایش آن‌ها در اینجا حق نشر را منتقل نمی‌کند و اجازه کپی، فروش مجدد یا استفاده در پروژه‌ای دیگر نیست." },
        { heading: "خریدهای آینده", body: "پیش از باز شدن خرید، فایل‌های محصول را کامل و بررسی می‌کنم، متن نهایی مجوز را منتشر می‌کنم، پرداخت را راه‌اندازی می‌کنم و این شرایط را به‌روز می‌کنم. فعلاً سایت پرداخت واقعی نمی‌پذیرد. متن این صفحه مشاوره حقوقی، مالیاتی یا مالی نیست." },
        { heading: "تماس", body: "می‌توانید از فرم تماس درخواست پروژه بفرستید. خودم آن را می‌خوانم و پیگیری می‌کنم. تا وقتی ارسال ایمیل خاموش است، سایت پاسخ خودکار نمی‌فرستد." }
      ]
    }
  },
  privacy: {
    en: {
      title: "Privacy Notice",
      intro: "This site only collects what it needs to handle a project inquiry, or to keep you posted if you ask for updates.",
      sections: [
        { heading: "What you submit", body: "The contact form asks for your name, email, the service you’re interested in, and a message. Company name is optional. The free-palettes form saves your email only if you tick the consent box. I use these records to follow up and plan the list. The site isn’t sending emails right now." },
        { heading: "Browser storage", body: "The cart saves product names in your browser so your list is still there next time. It holds no payment details. Your language is part of the page address. The site doesn’t collect card details and has no live checkout." },
        { heading: "Payments and downloads", body: "Payment code for Stripe, ZarinPal, and TRON isn’t active, and no real card, bank, or crypto payment is requested. Account sign-in links and customer downloads are also off, so no sign-in tokens are created or emailed." },
        { heading: "Analytics and retention", body: "No third-party analytics are running. Inquiries and consent records are kept in a protected database for the purpose you gave them, and you can ask me to delete yours. Before a full public launch I’ll add a verified contact address and review this notice for the laws that apply." }
      ]
    },
    fa: {
      title: "اطلاعیه حریم خصوصی",
      intro: "این سایت فقط اطلاعاتی را جمع می‌کند که برای رسیدگی به درخواست پروژه لازم است، یا اگر خودتان خبر تازه‌ها را بخواهید، برای اطلاع‌رسانی به شما.",
      sections: [
        { heading: "اطلاعاتی که می‌فرستید", body: "فرم تماس نام، ایمیل، خدمتی که می‌خواهید و پیام شما را می‌پرسد؛ نام شرکت اختیاری است. فرم پالت‌های رایگان فقط در صورتی ایمیل شما را ذخیره می‌کند که تیک رضایت را بزنید. از این اطلاعات برای پیگیری و برنامه‌ریزی فهرست ایمیل استفاده می‌کنم. فعلاً سایت ایمیلی ارسال نمی‌کند." },
        { heading: "حافظه مرورگر", body: "سبد خرید نام محصولات را در مرورگر شما نگه می‌دارد تا دفعه بعد هم فهرستتان باشد. اطلاعات پرداخت در آن نیست. زبان در آدرس صفحه مشخص است. سایت اطلاعات کارت را جمع نمی‌کند و پرداخت زنده ندارد." },
        { heading: "پرداخت و دانلود", body: "کد پرداخت Stripe، ZarinPal و TRON فعال نیست و هیچ پرداخت واقعی با کارت، بانک یا رمزارز درخواست نمی‌شود. لینک ورود به حساب و دانلود مشتریان هم غیرفعال است، پس هیچ توکن ورودی ساخته یا ایمیل نمی‌شود." },
        { heading: "آمار بازدید و نگهداری اطلاعات", body: "هیچ ابزار آمار بازدید شخص ثالثی فعال نیست. درخواست‌ها و رضایت‌ها برای همان هدفی که گفته شده در یک پایگاه داده محافظت‌شده نگه داشته می‌شوند و هر وقت بخواهید می‌توانید حذف اطلاعات خودتان را درخواست کنید. پیش از راه‌اندازی کامل عمومی، یک نشانی تماس معتبر اضافه می‌کنم و این اطلاعیه را با قوانین مربوطه بازبینی می‌کنم." }
      ]
    }
  },
  license: {
    en: {
      title: "Planned Product Licenses",
      intro: "These are the license terms planned for each product. The products and final license text aren’t available yet.",
      sections: [
        { heading: "Packaging Mockup Kit", body: "Planned license: personal and commercial use. The 10 PSD mockups, smart objects, 4K outputs, tidy layers, and PDF guide aren’t ready yet." },
        { heading: "Bilingual Brand Identity Deck Template", body: "Planned license: personal and commercial use. The Figma, InDesign, and PowerPoint files, 30 slides, grid, bilingual text styles, and crop-mark design aren’t ready yet." },
        { heading: "Amazon A+ Content & Listing Kit", body: "Planned license: commercial use for client work is allowed. The six Photoshop templates, comparison chart, lifestyle banner, specification sheet, and five color variations aren’t ready yet." },
        { heading: "100 Editorial Color Palettes", body: "Planned license: personal and commercial use. The ASE file, Figma library, CSS variables, and PDF swatch book with CMYK, RGB, and HEX values and inspiration images aren’t ready yet." },
        { heading: "A preview doesn’t grant a license", body: "These summaries aren’t the final legal license. Until the full products are ready, the final license text is published, and purchases are open, nothing here gives you the right to buy, copy, redistribute, or use any product file. Sample previews are not finished products." }
      ]
    },
    fa: {
      title: "مجوزهای برنامه‌ریزی‌شده محصولات",
      intro: "این‌ها شرایط مجوزی است که برای هر محصول در نظر گرفته شده. محصولات و متن نهایی مجوز هنوز آماده نیستند.",
      sections: [
        { heading: "کیت موکاپ بسته‌بندی", body: "مجوز پیش‌بینی‌شده: استفاده شخصی و تجاری. ده موکاپ PSD، اسمارت‌آبجکت، خروجی 4K، لایه‌های مرتب و راهنمای PDF هنوز آماده نیستند." },
        { heading: "قالب ارائه هویت برند دوزبانه", body: "مجوز پیش‌بینی‌شده: استفاده شخصی و تجاری. فایل‌های Figma، InDesign و PowerPoint، ۳۰ اسلاید، شبکه‌بندی، استایل‌های متن دوزبانه و طرح علامت‌های برش هنوز آماده نیستند." },
        { heading: "کیت محتوای A+ و صفحه محصول آمازون", body: "مجوز پیش‌بینی‌شده: استفاده تجاری در پروژه‌های مشتری مجاز است. شش قالب Photoshop، جدول مقایسه، بنر لایف‌استایل، برگه مشخصات و پنج نسخه رنگی هنوز آماده نیستند." },
        { heading: "۱۰۰ پالت رنگی تحریریه", body: "مجوز پیش‌بینی‌شده: استفاده شخصی و تجاری. فایل ASE، کتابخانه Figma، متغیرهای CSS و کتابچه رنگ PDF با مقدارهای CMYK، RGB و HEX و تصویرهای الهام‌بخش هنوز آماده نیستند." },
        { heading: "پیش‌نمایش مجوز نمی‌دهد", body: "این خلاصه‌ها متن حقوقی نهایی مجوز نیستند. تا وقتی محصولات کامل آماده نشده، متن نهایی مجوز منتشر نشده و خرید باز نشده، هیچ‌چیز در اینجا حق خرید، کپی، بازتوزیع یا استفاده از فایل‌های محصول به شما نمی‌دهد. پیش‌نمایش‌های نمونه، محصول نهایی نیستند." }
      ]
    }
  }
};
