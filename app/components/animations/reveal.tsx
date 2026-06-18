"use client";

import { useMemo, type ComponentProps, type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealProps = {
  children: ReactNode;
  /** Balise rendue (div, section, article, h2…). */
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  /** Décalage vertical initial (px). */
  y?: number;
  /** Décalage horizontal initial (px) — utile pour les images latérales. */
  x?: number;
  amount?: number;
};

// Apparition au scroll (fondu + glissement) avec une courbe de Bézier douce.
// Enveloppe sections, images ou blocs de texte tout en conservant leur balise.
export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  duration = 0.7,
  y = 32,
  x = 0,
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = useMemo(
    () => motion.create(as as ElementType) as ElementType,
    [as],
  );

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const props: ComponentProps<typeof motion.div> = {
    className,
    initial: { opacity: 0, y, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: false, amount },
    transition: { duration, ease: EASE, delay },
  };

  return <MotionTag {...props}>{children}</MotionTag>;
}
