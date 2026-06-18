import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Groupe de tags (ex. Handicaps, Zones).
export const category = defineType({
  name: "category",
  title: "Groupe de tags",
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
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Position dans le panneau de filtres (0 = en premier).",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", order: "order" },
    prepare({ title, order }) {
      return {
        title,
        subtitle: typeof order === "number" ? `Ordre : ${order}` : undefined,
      };
    },
  },
});
