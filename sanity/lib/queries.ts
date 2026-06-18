import { defineQuery } from "next-sanity";

// Projection GROQ partagée pour les tags résolus (références cassées exclues).
const POST_TAGS_PROJECTION = `
  "tags": array::compact(tags[]->{
    _id,
    title,
    "slug": slug.current,
    "categoryId": category._ref
  })[defined(title)]
`;

// ------------------------------------------------------------------
// Articles de blog
// ------------------------------------------------------------------

// Groupes de tags avec leurs tags (panneau de filtres).
export const FILTER_GROUPS_QUERY = defineQuery(`
  *[_type == "category"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    "tags": *[_type == "tag" && references(^._id)] | order(title asc) {
      _id,
      title,
      "slug": slug.current
    }
  }
`);

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
    ${POST_TAGS_PROJECTION},
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
    ${POST_TAGS_PROJECTION},
    body,
    "author": author->{ name, "slug": slug.current, avatar, bio }
  }
`);

export const LATEST_POST_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc, _createdAt desc)[0]{
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    mainImage,
    ${POST_TAGS_PROJECTION},
    "author": author->{ name, "slug": slug.current, avatar, bio }
  }
`);

export const POSTS_LIST_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc, _createdAt desc)[1...10]{
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    mainImage,
    ${POST_TAGS_PROJECTION},
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
