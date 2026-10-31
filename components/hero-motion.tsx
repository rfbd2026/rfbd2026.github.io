"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";

export function HeroWordmark() {
  const reducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.42 });
  const springY = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.42 });
  const scriptX = useTransform(springX, (value) => value * -1.45);
  const scriptY = useTransform(springY, (value) => value * -1.3);
  const wrapper = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = wrapper.current?.getBoundingClientRect();
    if (!bounds) return;
    const dx = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
    const dy = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
    rawX.set(dx * 18);
    rawY.set(dy * 11);
  }

  function resetPointer() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div ref={wrapper} className="step1-hero__wordmark-wrap" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <motion.h1 id="home-hero-title" className="step1-hero__wordmark" style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }}>
        <span>AREF</span>
        <span>BAHADORI</span>
      </motion.h1>
      <motion.span className="step1-hero__script" aria-hidden="true" style={{ x: reducedMotion ? 0 : scriptX, y: reducedMotion ? 0 : scriptY }}>studio</motion.span>
    </div>
  );
}

export function CrimsonCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-24);
  const y = useMotionValue(-24);
  const springX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.22 });
  const springY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.22 });

  useEffect(() => {
    if (reducedMotion) return;
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;
    setEnabled(true);
    const move = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
    };
  }, [reducedMotion, x, y]);

  if (reducedMotion || !enabled) return null;
  return <motion.span className="step1-cursor" aria-hidden="true" style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }} />;
}
