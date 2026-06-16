import type { PortableTextBlock } from "@portabletext/react";

// Types décrivant la forme des données renvoyées par les requêtes GROQ.
// (Alternative manuelle à `sanity typegen`, qui peut aussi être utilisée.)

export type SanityImage = {
  _type?: string;
  asset?: { _ref: string; _type?: string };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
};

export type Author = {
  name: string;
  slug: string;
  avatar?: SanityImage;
  bio?: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  tags?: string[];
  author?: Pick<Author, "name" | "slug" | "avatar">;
};

export type PostVideo = {
  url?: string;
  fileUrl?: string;
  caption?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  video?: PostVideo;
  tags?: string[];
  body?: PortableTextBlock[];
  author?: Author;
};

export type QuestionType =
  | "text"
  | "textarea"
  | "radio"
  | "checkbox"
  | "select"
  | "boolean"
  | "rating";

export type QuestionOption = { label: string; value: string };

export type Question = {
  _key: string;
  label: string;
  type: QuestionType;
  helpText?: string;
  required?: boolean;
  options?: QuestionOption[];
};

export type Step = {
  _key: string;
  title: string;
  description?: string;
  questions: Question[];
};

export type Questionnaire = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  steps: Step[];
};
