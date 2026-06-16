import type { StructureResolver } from "sanity/structure";

// Organisation du menu du Studio, pensée pour le client :
// un groupe « Blog » et un groupe « Questionnaires ».
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
              S.documentTypeListItem("category").title("Catégories"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Questionnaires")
        .child(
          S.list()
            .title("Questionnaires")
            .items([
              S.documentTypeListItem("questionnaire").title("Questionnaires"),
              S.documentTypeListItem("submission").title(
                "Réponses reçues"
              ),
            ])
        ),
    ]);
