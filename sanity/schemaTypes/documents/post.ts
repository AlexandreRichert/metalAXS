import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

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
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
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
