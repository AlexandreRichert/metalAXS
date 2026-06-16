import { InboxIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Une soumission : l'ensemble des réponses d'un visiteur à un questionnaire.
// Créée automatiquement par le formulaire public.
export const submission = defineType({
  name: "submission",
  title: "Réponse au questionnaire",
  type: "document",
  icon: InboxIcon,
  fields: [
    defineField({
      name: "questionnaire",
      title: "Questionnaire",
      type: "reference",
      to: [{ type: "questionnaire" }],
      readOnly: true,
    }),
    defineField({
      name: "respondentName",
      title: "Nom du répondant",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "respondentEmail",
      title: "Email du répondant",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Date de soumission",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "answers",
      title: "Réponses",
      type: "array",
      of: [{ type: "answer" }],
      readOnly: true,
    }),
    // Champs de suivi modifiables par l'équipe (les seuls éditables).
    defineField({
      name: "reviewed",
      title: "Traité",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "notes",
      title: "Notes internes",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      name: "respondentName",
      questionnaire: "questionnaire.title",
      submittedAt: "submittedAt",
      reviewed: "reviewed",
    },
    prepare({ name, questionnaire, submittedAt, reviewed }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString("fr-FR")
        : "";
      const prefix = reviewed ? "✓ " : "";
      return {
        title: `${prefix}${name || "Anonyme"}`,
        subtitle: [questionnaire, date].filter(Boolean).join(" — "),
      };
    },
  },
});
