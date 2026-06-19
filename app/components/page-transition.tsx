"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import LoaderSequence from "@/app/components/loader-sequence";
import { setCovered } from "@/app/components/app-ready";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// ~0,75 s au total : glissements courts + un maintien plus long, écran couvert,
// pendant lequel le loader reste immobile et tourne VISIBLEMENT (sinon il ne fait
// que glisser avec le voile et on ne le voit pas tourner). 0,15 + 0,45 + 0,15.
const SLIDE = 0.15; // durée d'un glissement (couverture / révélation), en s
const LOOP_MS = 450; // maintien écran couvert : laisse tourner le loader + router.push

type Phase = "idle" | "cover" | "reveal";

// Par défaut (hors provider) : navigation classique, sans transition.
const TransitionContext = createContext<(href: string) => void>((href) => {
  if (typeof window !== "undefined") window.location.href = href;
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

// Transition de page réutilisant le loader (séquence PNG) :
// clic → le voile glisse depuis le HAUT pour couvrir l'écran → 1 boucle de
// loader (on navigue sous le voile) → le voile glisse vers le BAS pour révéler
// la nouvelle page. La navigation n'a lieu qu'une fois l'écran couvert : on ne
// quitte donc jamais la page avant la fin du glissement d'entrée.
export default function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>("idle");
  const target = useRef<string | null>(null);

  // Remet la vue tout en haut. Lenis gère le scroll : window.scrollTo seul est
  // ignoré, il faut passer par l'instance Lenis.
  const scrollTop = useCallback(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [lenis]);

  const navigate = useCallback(
    (href: string) => {
      if (reduce) {
        router.push(href);
        window.setTimeout(scrollTop, 50);
        return;
      }
      if (phase !== "idle") return; // une transition est déjà en cours
      target.current = href;
      setCovered(true);
      setPhase("cover");
    },
    [phase, reduce, router, scrollTop],
  );

  const handleComplete = useCallback(() => {
    if (phase === "cover") {
      // Écran couvert : on charge la nouvelle page sous le voile, puis on tient
      // une boucle de loader avant de révéler.
      if (target.current) router.push(target.current);
      // Réancre en haut sous le voile, après le rendu de la nouvelle page.
      window.setTimeout(() => {
        scrollTop();
        setPhase("reveal");
      }, LOOP_MS);
    } else if (phase === "reveal") {
      target.current = null;
      setPhase("idle");
      setCovered(false);
    }
  }, [phase, router, scrollTop]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      {phase !== "idle" && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink"
          initial={{ y: "-100%" }}
          animate={{ y: phase === "reveal" ? "100%" : "0%" }}
          transition={{ duration: SLIDE, ease: EASE }}
          onAnimationComplete={handleComplete}
        >
          <LoaderSequence />
        </motion.div>
      )}
    </TransitionContext.Provider>
  );
}
