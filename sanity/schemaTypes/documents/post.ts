import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { titleContainsHighlight } from "../../lib/title-highlight";

// Article de blog.
export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "media", title: "Médias" },
    { name: "meta", title: "Métadonnées" },
  ],
  validation: (rule) =>
    rule.custom((document) => {
      const { title, titleHighlight } = document as {
        title?: string;
        titleHighlight?: string;
      };
      const highlight = titleHighlight?.trim();
      if (!highlight) return true;

      if (typeof title !== "string" || !title.trim()) {
        return {
          message: "Renseignez le titre avant le surlignage.",
          path: ["titleHighlight"],
        };
      }

      if (!titleContainsHighlight(title, highlight)) {
        return {
          message: `« ${highlight} » ne correspond à aucune partie du titre.`,
          path: ["titleHighlight"],
        };
      }

      return true;
    }),
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule
          .required()
          .max(120)
          .custom((title, context) => {
            const highlight = context.document?.titleHighlight;
            if (typeof title !== "string" || typeof highlight !== "string") {
              return true;
            }
            if (!highlight.trim()) return true;
            if (!titleContainsHighlight(title, highlight)) {
              return "Le surlignage ne correspond plus au titre. Mettez à jour « Mot(s) à surligner ».";
            }
            return true;
          }),
    }),
    defineField({
      name: "titleHighlight",
      title: "Mot(s) à surligner",
      type: "string",
      group: "content",
      description:
        "Mot ou expression exacte du titre à surligner en vert sur le site. Laissez vide pour ne surligner aucun mot. La validation s'applique à la publication.",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!value?.trim()) return true;
          const title = context.document?.title;
          if (typeof title !== "string" || !title.trim()) {
            return "Renseignez d'abord le titre de l'article.";
          }
          if (!titleContainsHighlight(title, value)) {
            return `« ${value.trim()} » ne correspond à aucune partie du titre.`;
          }
          return true;
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description / résumé",
      type: "text",
      rows: 3,
      group: "content",
      description: "Court résumé affiché dans la liste des articles et le SEO.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "body",
      title: "Contenu de l'article",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texte alternatif",
          description: "Description de l'image pour l'accessibilité.",
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galerie d'images",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Texte alternatif" },
          ],
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, author, media, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("fr-FR")
        : "Brouillon";
      return {
        title,
        subtitle: author ? `${author} — ${date}` : date,
        media,
      };
    },
  },
});
