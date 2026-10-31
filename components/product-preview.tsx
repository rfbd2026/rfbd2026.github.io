import Image from "next/image";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/content/projects";

const previewImages: Record<Product["style"], string> = {
  packaging: "/manus-storage/async-images/kBHYtQTZZajxKpXkYvZ06u/image-1.webp",
  deck: "/manus-storage/async-images/kBHYtQTZZajxKpXkYvZ06u/image-2.webp",
  amazon: "/manus-storage/async-images/kBHYtQTZZajxKpXkYvZ06u/image-3.webp",
  palette: "/manus-storage/async-images/kBHYtQTZZajxKpXkYvZ06u/image-4.webp"
};

export function ProductPreview({ product, locale, compact = false }: { product: Product; locale: Locale; compact?: boolean }) {
  const fa = locale === "fa";
  return (
    <div className={`product-preview product-preview--${product.style} ${compact ? "product-preview--compact" : ""}`}>
      <Image
        src={previewImages[product.style]}
        alt={product.previewAlt[locale]}
        width={1200}
        height={900}
        sizes={compact ? "(max-width: 720px) 100vw, 50vw" : "(max-width: 900px) 100vw, 50vw"}
        unoptimized
        className="product-preview__image"
      />
      <span className="product-preview__sticker">{fa ? "پیش‌نمایش تصویری · فایل اصلی هنوز آماده نیست" : "Illustrative preview · final files not ready"}</span>
    </div>
  );
}
