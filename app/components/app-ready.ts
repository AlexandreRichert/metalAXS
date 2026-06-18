"use client";

import { useEffect, useState } from "react";

// Petit signal global : passe à `true` une fois le loader d'accueil disparu.
// Les animations d'apparition attendent ce signal pour se déclencher, afin de
// ne pas jouer pendant que le voile de chargement masque encore la page.
let ready = false;
const listeners = new Set<() => void>();

export function markAppReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
}

export function useAppReady() {
  const [value, setValue] = useState(ready);

  useEffect(() => {
    if (ready) {
      setValue(true);
      return;
    }
    const listener = () => setValue(true);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return value;
}
