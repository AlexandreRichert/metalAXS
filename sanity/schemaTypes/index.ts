import type { SchemaTypeDefinition } from "sanity";

// Documents
import { author } from "./documents/author";
import { category } from "./documents/category";
import { post } from "./documents/post";
import { tag } from "./documents/tag";
import { questionnaire } from "./documents/questionnaire";
import { submission } from "./documents/submission";

// Objets réutilisables
import { answer } from "./objects/answer";
import { blockContent } from "./objects/blockContent";
import { question } from "./objects/question";
import { questionOption } from "./objects/questionOption";
import { step } from "./objects/step";
import { textWithImage } from "./objects/textWithImage";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  post,
  author,
  category,
  tag,
  questionnaire,
  submission,
  // Objets
  blockContent,
  textWithImage,
  step,
  question,
  questionOption,
  answer,
];
