import { defineField, defineType } from "sanity";

const CHOICE_TYPES = ["radio", "checkbox", "select"];

// Une question d'un questionnaire. Son identifiant technique est le `_key`
// généré automatiquement par Sanity, ce qui évite toute saisie manuelle.
export const question = defineType({
  name: "question",
  title: "Question",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type de réponse",
      type: "string",
      options: {
        list: [
          { title: "Texte court", value: "text" },
          { title: "Texte long", value: "textarea" },
          { title: "Choix unique (boutons radio)", value: "radio" },
          { title: "Choix multiple (cases à cocher)", value: "checkbox" },
          { title: "Liste déroulante", value: "select" },
          { title: "Oui / Non", value: "boolean" },
          { title: "Note (1 à 5)", value: "rating" },
        ],
        layout: "dropdown",
      },
      initialValue: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "helpText",
      title: "Texte d'aide (optionnel)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "required",
      title: "Réponse obligatoire",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "options",
      title: "Options de réponse",
      type: "array",
      of: [{ type: "questionOption" }],
      hidden: ({ parent }) => !CHOICE_TYPES.includes(parent?.type),
      validation: (rule) =>
        rule.custom((options, context) => {
          const parent = context.parent as { type?: string } | undefined;
          if (parent?.type && CHOICE_TYPES.includes(parent.type)) {
            if (!options || options.length < 1) {
              return "Ajoutez au moins une option pour ce type de question.";
            }
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "type" },
  },
});
