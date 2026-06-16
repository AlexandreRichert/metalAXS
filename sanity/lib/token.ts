import "server-only";

// Jetons d'API Sanity — JAMAIS exposés au navigateur (pas de préfixe NEXT_PUBLIC_).
// - readToken  : lecture des brouillons (prévisualisation), optionnel.
// - writeToken : écriture de documents (ex. réponses au questionnaire), requis
//   uniquement pour les fonctionnalités d'écriture côté serveur.
export const readToken = process.env.SANITY_API_READ_TOKEN;
export const writeToken = process.env.SANITY_API_WRITE_TOKEN;
