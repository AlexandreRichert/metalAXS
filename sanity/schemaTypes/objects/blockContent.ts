import { defineArrayMember, defineType } from "sanity";
import React from "react";

import { HighlightLetterAIcon } from "../../components/highlight-letter-a-icon";

const HIGHLIGHT_GREEN = "#abf000";

const highlightStyle = {
  backgroundColor: HIGHLIGHT_GREEN,
  borderRadius: "2px",
  padding: "0 0.1em",
} as const;

// Texte riche (Portable Text) : paragraphes, titres, listes, liens, images.
export const blockContent = defineType({
  name: "blockContent",
  title: "Contenu",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Titre 2", value: "h2" },
        { title: "Titre 3", value: "h3" },
        { title: "Citation", value: "blockquote" },
      ],
      lists: [
        { title: "Puces", value: "bullet" },
        { title: "Numérotée", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Gras", value: "strong" },
          { title: "Italique", value: "em" },
          {
            title: "Surligné (vert)",
            value: "highlight",
            icon: HighlightLetterAIcon,
            component: ({ children }: { children: React.ReactNode }) =>
              React.createElement("span", { style: highlightStyle }, children),
          },
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
    defineArrayMember({
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texte alternatif",
          description: "Description de l'image pour l'accessibilité.",
        },
      ],
    }),
    defineArrayMember({ type: "textWithImage" }),
  ],
});
