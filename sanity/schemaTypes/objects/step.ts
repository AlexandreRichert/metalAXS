import { defineField, defineType } from "sanity";

// Une étape du questionnaire, regroupant une ou plusieurs questions.
export const step = defineType({
  name: "step",
  title: "Étape",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre de l'étape",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (optionnelle)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "questions",
      title: "Questions",
      type: "array",
      of: [{ type: "question" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", questions: "questions" },
    prepare({ title, questions }) {
      const count = Array.isArray(questions) ? questions.length : 0;
      return {
        title: title || "Étape",
        subtitle: `${count} question${count > 1 ? "s" : ""}`,
      };
    },
  },
});
