// Centralise et valide les variables d'environnement Sanity.
// Toute valeur manquante déclenche une erreur explicite au démarrage.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Variable d'environnement manquante : NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Variable d'environnement manquante : NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
