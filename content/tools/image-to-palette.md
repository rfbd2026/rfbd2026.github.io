---
slug: image-to-palette
title:
  en: How to Build a Useful Palette from an Image
  fa: چطور از یک تصویر پالت رنگ کاربردی بسازیم
---
<!-- en -->
## Start with a question, not a number of colors
An image-to-palette tool gives you a good starting point, but five extracted colors aren’t a complete brand system. Before you sample, decide what the palette is for: keeping the mood of a photo, building accents for packaging, or finding the colors already in a piece of artwork. The answer changes which pixels matter. A big background can fill most of an image and win the algorithm’s vote, while a small accent may mean more to you as a designer. Treat the result as a set of observations, not a final decision.

## Read color in context
Images contain light, shadow, reflections, and compression. A warm object shot under cool studio light can give a different sample than the same object in daylight, and web images are often compressed or converted between color profiles. This tool takes a reduced copy of your image in the browser and groups similar RGB values into five clusters. It doesn’t upload your image, guess at brand strategy, or turn the result into print-ready CMYK. Keep the original file and use the extracted values as a reference.

HEX is handy for web interfaces, RGB describes screen color, and HSL makes hue, saturation, and lightness easier to compare. None of them tells you how ink will behave on paper. If the palette is for packaging or print, check the colors with your printer or a managed color workflow. Paper, coating, ink, and lighting can all change the final look.

## Refine for hierarchy and accessibility
After extracting, sort the colors by role rather than frequency: one background, one main text color, one or two supporting colors, and a limited accent. Test the real combinations at the sizes you’ll use. A pale color can work as a big field and still fail as small body text. Check contrast for interface text, and don’t rely on hue alone to signal a status or instruction; add text, icons, or shapes where meaning matters.

The CSS variables and ASE swatches are handy for handoff, but they don’t replace reviewing the palette in the real layout. Put the colors next to type, product photos, and interface states. If the palette feels uneven, edit it on purpose: lighten a background, tone down a loud accent, or add a neutral to give the eye a place to rest.

## Your image stays private
This tool processes your image in this browser, and the file never goes to my server. Don’t upload confidential client work to any online tool unless your contract allows it. Local processing helps, but it doesn’t replace good security on your own device. The best palette isn’t the one with the most colors. It’s the smallest set that keeps the work recognizable, readable, and consistent.
<!-- fa -->
## با یک سؤال شروع کنید، نه با تعداد رنگ
ابزار ساخت پالت از تصویر نقطه شروع خوبی می‌دهد، اما پنج رنگ استخراج‌شده هنوز یک سیستم کامل برند نیستند. پیش از نمونه‌برداری مشخص کنید پالت برای چه کاری است: حفظ حال‌وهوای یک عکس، ساختن رنگ‌های تأکیدی برای بسته‌بندی یا پیدا کردن رنگ‌هایی که از قبل در یک اثر وجود دارند. جواب این سؤال تعیین می‌کند کدام پیکسل‌ها مهم‌ترند. ممکن است یک پس‌زمینه بزرگ بیشتر تصویر را بپوشاند و الگوریتم همان را غالب بداند، در حالی که یک رنگ تأکیدی کوچک برای شما به‌عنوان طراح معنای بیشتری دارد. خروجی را مجموعه‌ای از مشاهده‌ها بدانید، نه تصمیم نهایی.

## رنگ را در بافت خودش ببینید
تصویر پر از نور، سایه، بازتاب و فشرده‌سازی است. جسمی گرم که زیر نور سرد استودیو عکس گرفته شده ممکن است نمونه‌ای متفاوت از همان جسم در نور روز بدهد، و تصویرهای وب هم اغلب فشرده یا بین پروفایل‌های رنگی تبدیل می‌شوند. این ابزار نسخه کوچک‌شده‌ای از تصویر را در مرورگر برمی‌دارد و رنگ‌های RGB نزدیک به هم را در پنج گروه جمع می‌کند. تصویر شما را بارگذاری نمی‌کند، درباره راهبرد برند حدسی نمی‌زند و نتیجه را به CMYK آماده چاپ تبدیل نمی‌کند. فایل اصلی را نگه دارید و مقدارهای استخراج‌شده را فقط مرجع بدانید.

HEX برای رابط‌های وب راحت است، RGB رنگ صفحه‌نمایش را توصیف می‌کند و HSL مقایسه فام، اشباع و روشنایی را ساده‌تر می‌کند. هیچ‌کدام نمی‌گوید جوهر روی کاغذ چطور رفتار می‌کند. اگر پالت برای بسته‌بندی یا چاپ است، رنگ‌ها را با چاپخانه یا یک روند مدیریت رنگ بررسی کنید. کاغذ، روکش، جوهر و نور محیط همه می‌توانند ظاهر نهایی را تغییر بدهند.

## سلسله‌مراتب و دسترس‌پذیری را اصلاح کنید
بعد از استخراج، رنگ‌ها را بر اساس نقش مرتب کنید، نه فراوانی: یک رنگ زمینه، یک رنگ اصلی متن، یک یا دو رنگ کمکی و یک رنگ تأکیدی محدود. ترکیب‌های واقعی را در اندازه‌ای که استفاده می‌شوند امتحان کنید. رنگ کم‌رنگ ممکن است برای یک سطح بزرگ خوب باشد ولی برای متن کوچک خوانا نباشد. کنتراست متن رابط را بسنجید و معنا را فقط به رنگ نسپارید؛ هرجا مفهوم مهم است از متن، آیکون یا شکل هم کمک بگیرید.

متغیرهای CSS و فایل ASE برای تحویل کار راحت‌اند، اما جای بررسی پالت در طرح واقعی را نمی‌گیرند. رنگ‌ها را کنار تایپ، عکس محصول و حالت‌های رابط بگذارید. اگر پالت متعادل نیست، عمدی اصلاحش کنید: زمینه را روشن‌تر کنید، رنگ تأکیدی پرصدا را آرام‌تر کنید یا یک رنگ خنثی اضافه کنید تا چشم جایی برای استراحت داشته باشد.

## تصویر شما خصوصی می‌ماند
این ابزار تصویر را در همین مرورگر پردازش می‌کند و فایل هرگز به سرور من نمی‌رود. فایل‌های محرمانه مشتری را در هیچ ابزار آنلاینی بارگذاری نکنید، مگر قرارداد اجازه بدهد. پردازش محلی کمک می‌کند، اما جای امنیت دستگاه خودتان را نمی‌گیرد. بهترین پالت، پالتی که رنگ بیشتری دارد نیست؛ کوچک‌ترین مجموعه‌ای است که کار را قابل تشخیص، خوانا و یکدست نگه می‌دارد.
