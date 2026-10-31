"use client";

import { useEffect, useState, type FocusEvent } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

type PortfolioItem = { slug: string; title: string; category: string };

type HomePortfolioStripProps = {
  label: string;
  title: string;
  intro: string;
  items: PortfolioItem[];
  scrollLabel: string;
  loopLabel: string;
  moreLabel: string;
  pauseLabel: string;
  resumeLabel: string;
};

export function HomePortfolioStrip({ label, title, intro, items, scrollLabel, loopLabel, moreLabel, pauseLabel, resumeLabel }: HomePortfolioStripProps) {
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const paused = hovered || focused || manuallyPaused;
  const shownItems = reducedMotion ? items : [...items, ...items];

  useEffect(() => {
    if (reducedMotion) {
      controls.set({ x: 0 });
      return;
    }
    if (paused) {
      controls.stop();
      return;
    }
    controls.start({ x: "-50%", transition: { x: { duration: Math.max(48, items.length * 9), ease: "linear", repeat: Infinity, repeatType: "loop" } } });
    return () => controls.stop();
  }, [controls, items.length, paused, reducedMotion]);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  }

  return (
    <section className="step1-section step1-portfolio" aria-labelledby="home-portfolio-title">
      <div className="step1-section__heading">
        <div>
          <p className="step1-kicker">{label}</p>
          <h2 id="home-portfolio-title">{title}</h2>
        </div>
        <div className="step1-portfolio__heading-side">
          <p className="step1-section__intro">{intro}</p>
          <span className="step1-portfolio__scroll-label">{reducedMotion ? scrollLabel : paused ? resumeLabel : loopLabel}</span>
          {!reducedMotion && (
            <button type="button" className="step1-portfolio__control" aria-pressed={manuallyPaused} aria-label={manuallyPaused ? resumeLabel : pauseLabel} onClick={() => setManuallyPaused((value) => !value)}>
              {manuallyPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              <span>{manuallyPaused ? resumeLabel : pauseLabel}</span>
            </button>
          )}
        </div>
      </div>
      <motion.div
        className="step1-portfolio__strip"
        role="region"
        aria-label={title}
        aria-live="off"
        tabIndex={0}
        data-static={reducedMotion ? "true" : "false"}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={handleBlur}
      >
        <motion.div className="step1-portfolio__track" animate={controls}>
          {shownItems.map((item, index) => {
            const duplicate = !reducedMotion && index >= items.length;
            const originalIndex = index % items.length;
            return (
              <motion.article
                className="step1-project"
                key={`${item.slug}-${index}`}
                aria-hidden={duplicate}
                initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                whileHover={reducedMotion ? undefined : { scale: 1.018 }}
                transition={{ duration: reducedMotion ? 0 : 0.42, delay: reducedMotion ? 0 : (originalIndex % 5) * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Link href={`/work/${item.slug}`} className="step1-project__link" aria-label={`${item.title} — ${item.category}`} tabIndex={duplicate ? -1 : undefined}>
                  <span className={`step1-project__art step1-project__art--${(originalIndex % 6) + 1}`} aria-hidden="true">
                    <span className="step1-project__art-index">{String(originalIndex + 1).padStart(2, "0")}</span>
                    <span className="step1-project__shape step1-project__shape--one" />
                    <span className="step1-project__shape step1-project__shape--two" />
                    <span className="step1-project__shape step1-project__shape--three" />
                    <span className="step1-project__art-label">{item.category}</span>
                  </span>
                  <span className="step1-project__caption">
                    <span><small>{item.category}</small><strong>{item.title}</strong></span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
      <div className="step1-portfolio__footer">
        <span>01 — {String(items.length).padStart(2, "0")}</span>
        <Link href="/work" className="step1-text-link">{moreLabel}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
