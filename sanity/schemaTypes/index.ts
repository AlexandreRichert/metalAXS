import type { SchemaTypeDefinition } from "sanity";

// Documents
import { author } from "./documents/author";
import { category } from "./documents/category";
import { post } from "./documents/post";
import { tag } from "./documents/tag";

// Objets réutilisables
import { blockContent } from "./objects/blockContent";
import { textWithImage } from "./objects/textWithImage";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  post,
  author,
  category,
  tag,
  // Objets
  blockContent,
  textWithImage,
];
