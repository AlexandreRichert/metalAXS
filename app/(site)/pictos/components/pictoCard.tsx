"use client";

import type { Picto } from "@/types/picto";
import { applyColor, downloadSvg } from "../svg-export";

const EASE = "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

type Props = {
  picto: Picto;
  color: string;
  selected: boolean;
  onToggle: () => void;
  onOpen: () => void;
};

// Carte d'un pictogramme : clic = aperçu (modale), case = sélection multiple,
// bouton en haut à gauche = téléchargement SVG direct. Le SVG est inline pour
// pouvoir le recolorer (currentColor) en direct.
export default function PictoCard({
  picto,
  color,
  selected,
  onToggle,
  onOpen,
}: Props) {
  return (
    <div
      className={`group relative aspect-square rounded-xl border transition-all duration-300 ${EASE} ${
        selected
          ? "border-lime bg-lime/5 ring-2 ring-lime/40"
          : "border-line bg-white hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0px_14px_30px_0px_rgba(44,31,0,0.10)]"
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Aperçu : ${picto.name}`}
        className="flex size-full items-center justify-center p-4"
      >
        <span
          style={{ color }}
          aria-hidden="true"
          className={`block size-[68%] transition-transform duration-300 ${EASE} group-hover:scale-105 [&>svg]:size-full`}
          dangerouslySetInnerHTML={{ __html: picto.markup ?? "" }}
        />
      </button>

      {/* Téléchargement SVG direct (haut gauche, au survol) */}
      <button
        type="button"
        onClick={() => downloadSvg(applyColor(picto.markup ?? "", color), picto.name)}
        aria-label={`Télécharger ${picto.name} en SVG`}
        className="absolute left-2 top-2 z-10 flex size-6 items-center justify-center rounded-md border border-line bg-white/90 text-ink opacity-0 transition-all duration-200 hover:border-ink hover:bg-ink hover:text-cream focus-visible:opacity-100 group-hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
          <path d="M12 3v11m0 0l-3.5-3.5M12 14l3.5-3.5M5 20h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Case de sélection (haut droite, au survol ou si sélectionnée) */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        aria-label={selected ? `Désélectionner ${picto.name}` : `Sélectionner ${picto.name}`}
        className={`absolute right-2 top-2 z-10 flex size-6 items-center justify-center rounded-md border transition-all duration-200 ${
          selected
            ? "border-lime bg-lime text-ink"
            : "border-line bg-white/90 text-transparent opacity-0 hover:border-ink focus-visible:opacity-100 group-hover:opacity-100"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
          <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Libellé au survol */}
      <span className="pointer-events-none absolute inset-x-2 bottom-2 truncate rounded-lg bg-ink/85 px-2 py-1 text-center text-xs font-medium text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {picto.name}
      </span>
    </div>
  );
}
