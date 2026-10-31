import "server-only";

export const nativeFilesVerified = false as const;
export const acceptedPaymentMode = "test" as const;

const knownProducts = new Set([
  "packaging-mockup-kit",
  "bilingual-brand-identity-deck-template",
  "amazon-a-plus-content-listing-kit",
  "100-editorial-color-palettes"
]);

export function isProductCheckoutOpen(productSlug: string) {
  return knownProducts.has(productSlug)
    && nativeFilesVerified
    && process.env.NATIVE_PRODUCT_FILES_VERIFIED === "true"
    && process.env.ENABLE_TEST_CHECKOUT === "true"
    && process.env.PAYMENT_MODE === acceptedPaymentMode;
}

export function isPortfolioReviewCheckoutOpen() {
  return nativeFilesVerified
    && process.env.NATIVE_PRODUCT_FILES_VERIFIED === "true"
    && process.env.ENABLE_PORTFOLIO_REVIEW_CHECKOUT === "true"
    && process.env.PAYMENT_MODE === acceptedPaymentMode;
}

export function checkoutPausedMessage(locale: "en" | "fa") {
  return locale === "fa"
    ? "خرید تا زمان ارائه و بررسی فایل‌های نهایی محصول غیرفعال است."
    : "Purchases remain disabled until the final native product files are supplied and verified.";
}
