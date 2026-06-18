import { defineArrayMember, defineField, defineType } from "sanity";

// Bloc de mise en page : un texte et une image côte à côte.
// L'image peut être placée à gauche ou à droite du texte.
// Sur mobile, les deux colonnes s'empilent automatiquement.
export const textWithImage = defineType({
  name: "textWithImage",
  title: "Texte + image (côte à côte)",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Texte",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Titre 3", value: "h3" },
          ],
          lists: [
            { title: "Puces", value: "bullet" },
            { title: "Numérotée", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Gras", value: "strong" },
              { title: "Italique", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Lien",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texte alternatif",
          description: "Description de l'image pour l'accessibilité.",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imagePosition",
      title: "Position de l'image",
      type: "string",
      options: {
        list: [
          { title: "À droite du texte", value: "right" },
          { title: "À gauche du texte", value: "left" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),
  ],
  preview: {
    select: { media: "image", position: "imagePosition" },
    prepare({ media, position }) {
      return {
        title: "Texte + image",
        subtitle: position === "left" ? "Image à gauche" : "Image à droite",
        media,
      };
    },
  },
});
