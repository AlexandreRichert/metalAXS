import { defineField, defineType } from "sanity";

// Vidéo associée à un article : soit un lien externe (YouTube, Vimeo…),
// soit un fichier téléversé directement dans Sanity.
export const video = defineType({
  name: "video",
  title: "Vidéo",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Lien de la vidéo (YouTube, Vimeo…)",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).warning(
          "Collez l'URL d'une vidéo YouTube ou Vimeo."
        ),
    }),
    defineField({
      name: "file",
      title: "Fichier vidéo (optionnel)",
      description:
        "À privilégier uniquement pour de courtes vidéos. Préférez un lien externe pour les vidéos longues.",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "caption",
      title: "Légende",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "caption", url: "url" },
    prepare({ title, url }) {
      return { title: title || "Vidéo", subtitle: url };
    },
  },
});
