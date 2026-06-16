import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import { writeToken } from "./token";

// Client d'ÉCRITURE — exclusivement côté serveur (Server Actions, Route Handlers).
// Nécessite un jeton avec la permission « Editor » défini dans SANITY_API_WRITE_TOKEN.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});

export function assertWriteClient() {
  if (!writeToken) {
    throw new Error(
      "Variable d'environnement manquante : SANITY_API_WRITE_TOKEN (jeton « Editor » requis pour écrire dans Sanity)."
    );
  }
  return writeClient;
}
