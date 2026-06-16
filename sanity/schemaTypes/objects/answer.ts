import { defineField, defineType } from "sanity";

// Une réponse à une question, stockée dans une soumission.
// Les champs sont en lecture seule : ils sont remplis automatiquement
// par le formulaire public et ne doivent pas être modifiés à la main.
export const answer = defineType({
  name: "answer",
  title: "Réponse",
  type: "object",
  readOnly: true,
  fields: [
    defineField({
      name: "questionKey",
      title: "Identifiant de la question",
      type: "string",
    }),
    defineField({
      name: "questionLabel",
      title: "Question",
      type: "string",
    }),
    defineField({
      name: "values",
      title: "Réponse(s)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "questionLabel", values: "values" },
    prepare({ title, values }) {
      const list = Array.isArray(values) ? values.join(", ") : "";
      return {
        title: title || "Réponse",
        subtitle: list || "—",
      };
    },
  },
});
