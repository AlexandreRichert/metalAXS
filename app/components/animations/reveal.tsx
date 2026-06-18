"use client";

import { useMemo, useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useAppReady } from "@/app/components/app-ready";

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
// Attend `useAppReady()` pour ne pas se déclencher derrière le loader.
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
  const ready = useAppReady();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount });
  const MotionTag = useMemo(
    () => motion.create(as as ElementType) as ElementType,
    [as],
  );

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={
        inView && ready ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }
      }
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
