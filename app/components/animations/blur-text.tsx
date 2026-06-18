"use client";

import { Fragment, useRef, type ElementType } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type BlurTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Décalage entre chaque mot (s). */
  stagger?: number;
  duration?: number;
  amount?: number;
};

// Effet « BlurText » (reactbits) : révèle le texte mot par mot au scroll,
// chaque mot passant d'un flou + fondu vers net.
export default function BlurText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.06,
  duration = 0.6,
  amount = 0.2,
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount });
  const reduce = useReducedMotion();

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            aria-hidden
            className="inline-block"
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 16, filter: "blur(8px)" }
            }
            transition={{ duration, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
