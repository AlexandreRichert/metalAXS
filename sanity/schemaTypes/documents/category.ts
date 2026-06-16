import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Catégorie de classement des articles.
export const category = defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
