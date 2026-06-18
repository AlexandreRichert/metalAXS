"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type CountUpProps = {
  /** Valeur finale. */
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  amount?: number;
};

// Compteur animé : part de `from` jusqu'à `to` lorsqu'il entre dans le viewport.
// Le rendu initial affiche déjà `to` (SEO / sans JS) ; l'animation remet à zéro
// puis recompte au moment où l'élément devient visible.
export default function CountUp({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  amount = 0.5,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount });
  const reduce = useReducedMotion();

  const format = (value: number) =>
    `${prefix}${value.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !inView) return;

    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate: (value) => {
        el.textContent = format(value);
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, from, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
