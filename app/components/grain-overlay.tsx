"use client";

import { GrainGradient } from "@paper-design/shaders-react";

// Grain global subtil (Paper « GrainGradient ») posé sur tout le site public.
// `fixed` plein écran + `pointer-events-none` (n'intercepte rien). `colorBack`
// noir + `mix-blend-screen` : le noir disparaît au blending, donc seul le grain
// ajoute une très fine lumière, sans assombrir les sections claires.
// Lenis tourne en mode `root` (scroll réel, pas de transform) → `fixed` est bien
// calé sur la fenêtre.
export default function GrainOverlay() {
  return (
    <GrainGradient
      className="pointer-events-none fixed inset-0 z-[60] size-full mix-blend-screen opacity-[0.10]"
      width="100%"
      height="100%"
      colorBack="#000000"
      colors={["#f2ede3", "#807866", "#2c1f00"]}
      softness={0.9}
      intensity={0.5}
      noise={0.9}
      shape="corners"
      speed={0.25}
    />
  );
}
