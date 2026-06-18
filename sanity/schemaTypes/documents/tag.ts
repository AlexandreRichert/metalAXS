import { TagsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Tag filtrable, rattaché à un groupe (category).
export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: TagsIcon,
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
      name: "category",
      title: "Groupe",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
    },
    prepare({ title, category }) {
      return {
        title,
        subtitle: category ?? "Sans groupe",
      };
    },
  },
});
