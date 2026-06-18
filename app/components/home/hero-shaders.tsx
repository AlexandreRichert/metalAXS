"use client";

import { PaperTexture, Dithering } from "@paper-design/shaders-react";

// Shaders Paper Design superposés au .riv du héro. Le grain a été déplacé en
// overlay global (voir grain-overlay.tsx) ; il reste ici une texture papier et
// un dither. `pointer-events-none` : le pointeur traverse jusqu'au canvas Rive.
const LAYER = "pointer-events-none absolute inset-0 size-full";

export default function HeroShaders() {
  return (
    <>
      {/* Texture papier par-dessus le .riv. Gris neutre + soft-light : la trame
          (fibres / plis / froissé) module le fond sans virage de couleur. */}
      <PaperTexture
        className={`${LAYER} mix-blend-soft-light opacity-60`}
        width="100%"
        height="100%"
        colorBack="#808080"
        colorFront="#ffffff"
        contrast={0.4}
        roughness={0.5}
        fiber={0.5}
        fiberSize={0.2}
        crumples={0.35}
        crumpleSize={0.35}
        folds={0.4}
        foldCount={4}
        drops={0.2}
      />

      {/* Dither : trame `simplex` (champ de bruit, AUCUNE sphère), discret.
          colorBack noir + screen → seul le grain de points clairs ressort. */}
      <Dithering
        className={`${LAYER} mix-blend-screen opacity-50`}
        width="100%"
        height="100%"
        colorBack="#000000"
        colorFront="#808080"
        shape="simplex"
        type="4x4"
        size={1}
        scale={0.8}
        speed={0.6}
      />
    </>
  );
}
