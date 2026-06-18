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

export type TextWithImage = {
  _type: "textWithImage";
  _key: string;
  text?: PortableTextBlock[];
  image?: SanityImage;
  imagePosition?: "left" | "right";
};

export type Author = {
  name: string;
  slug: string;
  avatar?: SanityImage;
  bio?: string;
};

export type PostTag = {
  _id: string;
  title: string;
  slug: string;
  categoryId?: string;
};

export type FilterTag = Pick<PostTag, "_id" | "title" | "slug">;

export type FilterGroup = {
  _id: string;
  title: string;
  slug: string;
  tags: FilterTag[];
};

export type PostListItem = {
  _id: string;
  title: string;
  titleHighlight?: string;
  slug: string;
  description: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  tags?: PostTag[];
  author?: Pick<Author, "name" | "slug" | "avatar">;
};

export type Post = {
  _id: string;
  title: string;
  titleHighlight?: string;
  slug: string;
  description: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  tags?: PostTag[];
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
