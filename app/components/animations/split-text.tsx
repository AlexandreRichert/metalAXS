"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useAppReady } from "@/app/components/app-ready";

// Courbe de Bézier douce (ease-out expo) partagée par toutes les animations.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type SplitTextProps = {
  /** Texte brut. Les `\n` créent des sauts de ligne. */
  text: string;
  /** Balise rendue (h1, h2, p…). */
  as?: ElementType;
  className?: string;
  /** Délai avant le début de l'animation (s). */
  delay?: number;
  /** Décalage entre chaque caractère (s). */
  stagger?: number;
  duration?: number;
  /** Décalage vertical initial de chaque caractère (px). */
  yOffset?: number;
  /** Proportion de l'élément visible pour déclencher (0–1). */
  amount?: number;
};

// Effet « SplitText » (reactbits) : révèle le titre caractère par caractère
// au scroll, chaque lettre montant en fondu avec un léger décalage.
export default function SplitText({
  text,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = 0.035,
  duration = 0.6,
  yOffset = 40,
  amount = 0.3,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount });
  const reduce = useReducedMotion();
  const ready = useAppReady();

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const lines = text.split("\n");
  let index = 0;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} aria-hidden className="block">
            {words.map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {Array.from(word).map((char) => {
                  const i = index++;
                  return (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ opacity: 0, y: yOffset }}
                      animate={
                        inView && ready
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: yOffset }
                      }
                      transition={{
                        duration,
                        ease: EASE,
                        delay: delay + i * stagger,
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {wi < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
