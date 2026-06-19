export type PictoCategory = "signaletique" | "handicaps";

export type Picto = {
  id: string;
  name: string;
  category: PictoCategory;
  /** Nom de fichier original dans public/pictos (accents/espaces compris). */
  file: string;
  /** Chemin encodé prêt à l'emploi (<img src>, lien de téléchargement). */
  src: string;
  /** Markup SVG inline, noirs remplacés par `currentColor` (recolorable). */
  markup?: string;
};
