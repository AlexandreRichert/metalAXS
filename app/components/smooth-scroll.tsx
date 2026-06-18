"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

// Défilement fluide « à la Webflow » via Lenis, monté sur la fenêtre (root).
// Lenis met à jour le scroll réel : les écouteurs `scroll` natifs et les
// IntersectionObservers (animations au scroll) continuent de fonctionner.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
