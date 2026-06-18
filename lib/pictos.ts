import type { Picto, PictoCategory } from "@/types/picto";

// Liste réelle des pictogrammes (fichiers dans public/pictos), répartis en
// deux catégories : signalétique et handicaps. Le `file` doit correspondre
// EXACTEMENT au nom sur disque (accents, espaces, apostrophes).
type Entry = { name: string; file: string };

const signaletique: Entry[] = [
  { name: "Accès réservés", file: "Accès reservés.svg" },
  { name: "Aire de repos", file: "Aire de repos.svg" },
  { name: "Camping", file: "Camping.svg" },
  { name: "Camping PMR", file: "Camping PMR.svg" },
  { name: "Centre d’aide", file: "Centre d'aide.svg" },
  { name: "Commerces", file: "Commerces.svg" },
  { name: "Douches", file: "Douches.svg" },
  { name: "Entrée", file: "Entrée.svg" },
  { name: "Flèche gauche", file: "Flèche Gauche.svg" },
  { name: "Flèche haut", file: "Flèche Haut.svg" },
  { name: "Infirmerie", file: "Infirmerie.svg" },
  { name: "Interdit", file: "Interdit.svg" },
  { name: "Lieu de concerts", file: "Lieu de concerts.svg" },
  { name: "Parking droite", file: "Parking droite.svg" },
  { name: "Parking gauche", file: "Parking gauche.svg" },
  { name: "Point d’eau", file: "Point d'eau.svg" },
  { name: "Restauration", file: "Restauration.svg" },
  { name: "Sortie", file: "Sortie.svg" },
  { name: "Stockage", file: "Stockage.svg" },
  { name: "Toilettes", file: "Toilettes.svg" },
  { name: "Toilettes PMR", file: "Toilettes PMR.svg" },
];

const handicaps: Entry[] = [
  { name: "Moteur", file: "Handicap_Moteur.svg" },
  { name: "Visuel", file: "Handicap_Visuel.svg" },
  { name: "Auditif", file: "Handicap_Auditif.svg" },
  { name: "Intellectuel", file: "Handicap_Intellect.svg" },
  { name: "Psychiques", file: "Handicap_Psychiques.svg" },
  { name: "Autisme", file: "Handicap_Autisme.svg" },
];

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[àâä]/g, "a")
    .replace(/[éèêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o")
    .replace(/[ûü]/g, "u")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function build(entries: Entry[], category: PictoCategory): Picto[] {
  return entries.map((entry) => ({
    id: `${category}-${slug(entry.name)}`,
    name: entry.name,
    category,
    file: entry.file,
    src: encodeURI(`/pictos/${entry.file}`),
  }));
}

export const pictos: Picto[] = [
  ...build(signaletique, "signaletique"),
  ...build(handicaps, "handicaps"),
];

export const categoryLabels: Record<PictoCategory, string> = {
  signaletique: "Signalétique",
  handicaps: "Handicaps",
};
