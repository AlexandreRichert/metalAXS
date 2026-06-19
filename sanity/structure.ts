import type { StructureResolver } from "sanity/structure";

// Organisation du menu du Studio, pensée pour le client : groupe « Blog ».
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Articles"),
              S.documentTypeListItem("author").title("Auteurs"),
              S.documentTypeListItem("category").title("Groupes de tags"),
              S.documentTypeListItem("tag").title("Tags"),
            ])
        ),
    ]);
