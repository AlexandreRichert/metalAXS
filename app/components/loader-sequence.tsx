"use client";

import { useEffect, useState } from "react";

const FRAME_COUNT = 24;
const FPS = 24; // 24 images à 24 i/s = boucle d'1 s
// Fichiers : public/loader/Comp 1_00000.png … Comp 1_00023.png (espace encodé).
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/loader/Comp%201_${String(i).padStart(5, "0")}.png`,
);

// Séquence PNG (public/loader) jouée en boucle.
export default function LoaderSequence({
  className = "size-40",
}: {
  className?: string;
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    // Préchargement pour éviter le scintillement à la première boucle.
    FRAMES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
    const id = window.setInterval(
      () => setFrame((f) => (f + 1) % FRAME_COUNT),
      1000 / FPS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={FRAMES[frame]}
      alt="Chargement en cours…"
      draggable={false}
      className={`${className} select-none object-contain`}
    />
  );
}
