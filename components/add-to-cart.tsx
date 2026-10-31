"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Locale } from "@/lib/content/projects";

export function AddToCart({ slug, locale }: { slug: string; locale: Locale }) {
  const { items, add } = useCart();
  const [saved, setSaved] = useState(false);
  const alreadyAdded = items.includes(slug);
  const label = locale === "fa"
    ? (saved || alreadyAdded ? "در فهرست برنامه‌ریزی شماست" : "افزودن به فهرست برنامه‌ریزی")
    : (saved || alreadyAdded ? "Saved to your preview list" : "Save to preview list");

  return <button className="button button--outline" type="button" onClick={() => { add(slug); setSaved(true); }} aria-live="polite">{label}</button>;
}
