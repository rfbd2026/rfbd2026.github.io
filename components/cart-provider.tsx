"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/lib/products";

type CartContextValue = {
  items: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "aref-preview-cart-v1";
const validSlugs = new Set(products.map((product) => product.slug));

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved)) setItems(saved.filter((slug): slug is string => typeof slug === "string" && validSlugs.has(slug)));
    } catch {
      window.localStorage.removeItem(storageKey);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    add: (slug) => { if (validSlugs.has(slug)) setItems((current) => current.includes(slug) ? current : [...current, slug]); },
    remove: (slug) => setItems((current) => current.filter((item) => item !== slug)),
    clear: () => setItems([])
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
