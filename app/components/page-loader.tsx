"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import LoaderSequence from "@/app/components/loader-sequence";
import { markAppReady } from "@/app/components/app-ready";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HOLD_MS = 1000; // une boucle de loader (24 i/s) avant la révélation

type Phase = "loading" | "reveal" | "done";

// Voile noir de chargement initial : affiche le loader en boucle puis glisse
// vers le bas pour révéler la page (courbe de Bézier douce).
export default function PageLoader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setPhase("done");
      markAppReady();
      return;
    }
    const t = window.setTimeout(() => {
      setPhase("reveal");
      // Débloque les animations dès que le voile commence à glisser, pour
      // qu'elles jouent pendant la révélation plutôt qu'après.
      markAppReady();
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [reduce]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ y: "0%" }}
      animate={{ y: phase === "reveal" ? "100%" : "0%" }}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={() => {
        if (phase === "reveal") setPhase("done");
      }}
    >
      <LoaderSequence />
    </motion.div>
  );
}
