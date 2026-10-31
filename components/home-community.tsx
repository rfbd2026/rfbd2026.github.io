"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

type CommunityNote = { index: string; title: string; description: string };

type HomeCommunityProps = {
  label: string;
  title: string;
  intro: string;
  notes: CommunityNote[];
  cta: string;
};

function CommunityCard({ note, index }: { note: CommunityNote; index: number }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElementTagNameMap["article"]>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.article
      ref={ref}
      className="step1-community__card"
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={reducedMotion ? undefined : isInView ? { opacity: 1, y: [0, -5, 0], x: [0, index % 2 ? 3 : -3, 0] } : { opacity: 0, y: 18, x: 0 }}
      transition={reducedMotion ? { duration: 0 } : {
        opacity: { duration: 0.48, delay: index * 0.1 },
        y: { duration: 5 + index * 0.8, delay: index * 0.32, ease: "easeInOut", repeat: isInView ? Infinity : 0 },
        x: { duration: 6 + index, delay: index * 0.28, ease: "easeInOut", repeat: isInView ? Infinity : 0 }
      }}
    >
      <span className="step1-community__index">{note.index}</span>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
    </motion.article>
  );
}

export function HomeCommunity({ label, title, intro, notes, cta }: HomeCommunityProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.section
      className="step1-section step1-community"
      aria-labelledby="home-community-title"
      initial={reducedMotion ? false : { backgroundColor: "#fffdfa", color: "#111111" }}
      whileInView={reducedMotion ? undefined : { backgroundColor: "#171317", color: "#ffffff" }}
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: reducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="step1-shell">
        <div className="step1-section__heading">
          <div>
            <p className="step1-kicker">{label}</p>
            <h2 id="home-community-title">{title}</h2>
          </div>
          <motion.p
            className="step1-section__intro step1-community__intro"
            initial={reducedMotion ? false : { opacity: 0, y: 14, color: "#716b6d" }}
            whileInView={{ opacity: 1, y: 0, color: reducedMotion ? "#716b6d" : "#d2c9cc" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reducedMotion ? 0 : 0.52, delay: reducedMotion ? 0 : 0.12 }}
          >{intro}</motion.p>
        </div>
        <motion.div
          className="step1-community__line"
          aria-hidden="true"
          initial={reducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="step1-community__cards">
          {notes.map((note, index) => <CommunityCard key={note.index} note={note} index={index} />)}
        </div>
        <div className="step1-community__footer">
          <span>{notes[0]?.index} — {notes[notes.length - 1]?.index}</span>
          <Link href="/journal" className="step1-text-link">{cta}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </motion.section>
  );
}
