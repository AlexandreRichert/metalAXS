import { defineField, defineType } from "sanity";

// Une option proposée pour une question à choix (radio, cases à cocher, liste).
export const questionOption = defineType({
  name: "questionOption",
  title: "Option",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Libellé affiché",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Valeur enregistrée",
      type: "string",
      description:
        "Valeur stockée dans les réponses. Laissez identique au libellé en cas de doute.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
