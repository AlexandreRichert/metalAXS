import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Auteur d'un article.
export const author = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biographie",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "name", media: "avatar" },
  },
});
