import "server-only";

import type { QueryParams } from "next-sanity";

import { client } from "./client";

// Wrapper de lecture côté serveur avec gestion du cache Next.js.
// - `tags`       : invalidation ciblée (revalidateTag) déclenchée par un webhook Sanity.
// - `revalidate` : durée de mise en cache (ignorée si des tags sont fournis).
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
