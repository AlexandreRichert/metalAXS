import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Construit une URL optimisée pour une image Sanity.
// Exemple : urlForImage(post.mainImage).width(1200).height(630).url()
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
