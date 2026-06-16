import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Client de LECTURE seule, utilisable côté serveur comme côté client.
// `useCdn: true` lit le contenu publié depuis le CDN de Sanity (rapide + gratuit).
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
