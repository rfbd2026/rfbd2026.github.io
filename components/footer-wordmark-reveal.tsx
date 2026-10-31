"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function FooterWordmarkReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.86 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
