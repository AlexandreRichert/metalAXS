"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useAppReady } from "@/app/components/app-ready";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Surligneur lime (Figma « Rectangle 9 » #abf000) posé derrière un mot-clé de titre.
// Le fond se déroule de gauche à droite quand le titre entre dans le viewport.
export default function Highlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const reduce = useReducedMotion();
  const ready = useAppReady();
  const revealed = reduce || (inView && ready);

  return (
    <mark
      ref={ref}
      className="relative inline-block -rotate-1 bg-transparent px-2 text-ink"
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 origin-left bg-lime"
        initial={{ scaleX: reduce ? 1 : 0 }}
        animate={{ scaleX: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.45 }}
      />
      <span className="relative">{children}</span>
    </mark>
  );
}
