import { defineQuery } from "next-sanity";

// ------------------------------------------------------------------
// Articles de blog
// ------------------------------------------------------------------

// Liste des articles publiés, triés du plus récent au plus ancien.
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    mainImage,
    tags,
    "author": author->{ name, "slug": slug.current, avatar }
  }
`);

// Un article complet, identifié par son slug.
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    mainImage,
    gallery,
    video{ url, caption, "fileUrl": file.asset->url },
    tags,
    body,
    "author": author->{ name, "slug": slug.current, avatar, bio }
  }
`);

// Tous les slugs d'articles (pour la génération statique des pages).
export const POSTS_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);

// ------------------------------------------------------------------
// Questionnaires
// ------------------------------------------------------------------

// Questionnaire complet (étapes + questions) identifié par son slug.
export const QUESTIONNAIRE_QUERY = defineQuery(`
  *[_type == "questionnaire" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    steps[]{
      _key,
      title,
      description,
      questions[]{
        _key,
        label,
        type,
        helpText,
        required,
        options[]{ label, value }
      }
    }
  }
`);

// Questionnaire par défaut : le plus ancien (premier créé).
export const DEFAULT_QUESTIONNAIRE_QUERY = defineQuery(`
  *[_type == "questionnaire"] | order(_createdAt asc)[0]{
    _id,
    title,
    "slug": slug.current,
    description,
    steps[]{
      _key,
      title,
      description,
      questions[]{
        _key,
        label,
        type,
        helpText,
        required,
        options[]{ label, value }
      }
    }
  }
`);
