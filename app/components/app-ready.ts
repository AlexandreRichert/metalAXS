"use client";

import { useSyncExternalStore } from "react";

// Petit signal global : passe à `true` une fois le loader d'accueil disparu.
// Les animations d'apparition attendent ce signal pour se déclencher, afin de
// ne pas jouer pendant que le voile de chargement masque encore la page.
let ready = false;
const readyListeners = new Set<() => void>();

export function markAppReady() {
  if (ready) return;
  ready = true;
  readyListeners.forEach((listener) => listener());
}

export function useAppReady() {
  return useSyncExternalStore(
    (cb) => {
      readyListeners.add(cb);
      return () => readyListeners.delete(cb);
    },
    () => ready,
    () => false,
  );
}

// Nombre de voiles couvrant l'écran (loader d'accueil + transition de page).
// Démarre à 1 : au tout premier chargement, le loader recouvre la page.
let coveredCount = 1;
const coverListeners = new Set<() => void>();

export function setCovered(on: boolean) {
  const next = Math.max(0, coveredCount + (on ? 1 : -1));
  if (next === coveredCount) return;
  coveredCount = next;
  coverListeners.forEach((listener) => listener());
}

// `true` tant qu'un voile (loader ou transition) recouvre l'écran. RÉACTIF : les
// composants se mettent à jour à chaque changement, quel que soit le moment de
// leur montage (avant ou après la révélation). Idéal pour déclencher les
// animations d'entrée pile quand la page devient visible.
export function useScreenCovered() {
  return useSyncExternalStore(
    (cb) => {
      coverListeners.add(cb);
      return () => coverListeners.delete(cb);
    },
    () => coveredCount > 0,
    () => true,
  );
}
