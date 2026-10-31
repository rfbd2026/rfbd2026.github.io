"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ServiceItem = { number: string; title: string; description: string };

type HomeServicesProps = {
  label: string;
  title: string;
  intro: string;
  items: ServiceItem[];
};

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElementTagNameMap["article"]>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const direction = index % 2 === 0 ? 1 : -1;
  const numberX = useTransform(scrollYProgress, [0, 1], [direction * -44, direction * 44]);

  return (
    <motion.article
      ref={cardRef}
      className="step1-service"
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : index * 0.075, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <motion.span className="step1-service__parallax-number" aria-hidden="true" style={{ x: reducedMotion ? 0 : numberX }}>{item.number}</motion.span>
      <span className="step1-service__number" aria-hidden="true">{item.number}</span>
      <span className="step1-service__rule" aria-hidden="true" />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </motion.article>
  );
}

export function HomeServices({ label, title, intro, items }: HomeServicesProps) {
  return (
    <section className="step1-section step1-services" id="home-services" aria-labelledby="home-services-title">
      <div className="step1-section__heading">
        <div>
          <p className="step1-kicker">{label}</p>
          <h2 id="home-services-title">{title}</h2>
        </div>
        <p className="step1-section__intro">{intro}</p>
      </div>
      <div className="step1-services__grid">
        {items.map((item, index) => <ServiceCard key={item.number} item={item} index={index} />)}
      </div>
    </section>
  );
}
