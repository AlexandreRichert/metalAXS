import { HelpCircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Questionnaire multi-étapes (ex. audit d'accessibilité).
export const questionnaire = defineType({
  name: "questionnaire",
  title: "Questionnaire",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description / introduction",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "steps",
      title: "Étapes",
      type: "array",
      of: [{ type: "step" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", steps: "steps" },
    prepare({ title, steps }) {
      const count = Array.isArray(steps) ? steps.length : 0;
      return {
        title: title || "Questionnaire",
        subtitle: `${count} étape${count > 1 ? "s" : ""}`,
      };
    },
  },
});
