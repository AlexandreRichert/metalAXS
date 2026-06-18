"use client";

import { useEffect } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { useAppReady } from "@/app/components/app-ready";

const STATE_MACHINE = "State Machine 1";

// Fond interactif du héro : animation Rive (public/hero_all_access_metal.riv).
// La « State Machine 1 » pilote l'interactivité (le canvas reçoit le pointeur).
// Le titre « METAL POUR TOUS » est intégré au .riv — il ne faut donc PAS le
// dupliquer en HTML.
//
// On charge le .riv en pause (`autoplay: false`) et on ne démarre la state
// machine qu'une fois le loader d'accueil disparu (`useAppReady`), comme les
// animations de texte, pour ne pas jouer le début de l'animation sous le voile.
export default function HeroRive() {
  const ready = useAppReady();
  const { rive, RiveComponent } = useRive({
    src: "/hero_all_access_metal.riv",
    stateMachines: STATE_MACHINE,
    autoplay: false,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });

  useEffect(() => {
    if (ready && rive) rive.play(STATE_MACHINE);
  }, [ready, rive]);

  return (
    <RiveComponent
      role="img"
      aria-label="Metal pour tous — fond animé d'un festival"
      className="absolute inset-0 size-full"
    />
  );
}
