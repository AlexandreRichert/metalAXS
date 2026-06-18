"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Picto, PictoCategory } from "@/types/picto";
import { categoryLabels } from "@/lib/pictos";
import { useScreenCovered } from "@/app/components/app-ready";
import Button from "@/app/components/button";
import { downloadZip } from "../svg-export";
import ColorPicker from "./color-picker";
import PictoCard from "./pictoCard";
import PictoModal from "./pictoModal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Filter = "all" | PictoCategory;
type Format = "svg" | "png";

export default function PictosLibrary({ pictos }: { pictos: Picto[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [color, setColor] = useState("#2c1f00");
  const [format, setFormat] = useState<Format>("svg");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openPicto, setOpenPicto] = useState<Picto | null>(null);
  const [busy, setBusy] = useState(false);

  // L'apparition en cascade attend que la page soit visible (plus aucun voile :
  // ni loader d'accueil, ni transition de page). Réactif → fonctionne quel que
  // soit le moment où la grille se monte (avant ou après la révélation).
  const reduce = useReducedMotion();
  const covered = useScreenCovered();
  const show = reduce || !covered;

  const counts = useMemo(
    () => ({
      all: pictos.length,
      signaletique: pictos.filter((p) => p.category === "signaletique").length,
      handicaps: pictos.filter((p) => p.category === "handicaps").length,
    }),
    [pictos],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pictos.filter(
      (p) =>
        (filter === "all" || p.category === filter) &&
        (q === "" || p.name.toLowerCase().includes(q)),
    );
  }, [pictos, query, filter]);

  const selectedPictos = useMemo(
    () => pictos.filter((p) => selected.has(p.id)),
    [pictos, selected],
  );

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  async function run(items: Picto[]) {
    if (busy || items.length === 0) return;
    setBusy(true);
    try {
      await downloadZip(
        items.map((p) => ({ name: p.name, markup: p.markup ?? "" })),
        color,
        format,
      );
    } finally {
      setBusy(false);
    }
  }

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tous", count: counts.all },
    { id: "signaletique", label: categoryLabels.signaletique, count: counts.signaletique },
    { id: "handicaps", label: categoryLabels.handicaps, count: counts.handicaps },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Barre d'outils */}
      <div className="flex flex-col gap-5">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un pictogramme…"
            className="w-full rounded-xl border border-line bg-white py-3.5 pl-12 pr-4 text-base text-ink outline-none transition duration-200 placeholder:text-muted focus:border-ink focus:ring-2 focus:ring-lime/40"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active ? "border-ink bg-ink text-cream" : "border-line bg-white text-ink hover:border-ink"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                >
                  {tab.label}
                  <span className={`text-xs ${active ? "text-cream/70" : "text-muted"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ColorPicker value={color} onChange={setColor} />

            {/* Format SVG / PNG */}
            <div className="inline-flex rounded-lg border border-line bg-white p-0.5 text-sm">
              {(["svg", "png"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  aria-pressed={format === f}
                  className={`rounded-md px-3 py-1.5 font-semibold uppercase transition-colors duration-200 ${
                    format === f ? "bg-ink text-cream" : "text-ink hover:text-ink/70"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <Button
              variant="primary"
              onClick={() => run(pictos)}
              disabled={busy}
              icon={<DownloadIcon className="size-4" />}
            >
              {busy ? "Préparation…" : "Tout télécharger"}
            </Button>
          </div>
        </div>
      </div>

      {/* Grille animée (apparition ordonnée + filtrage en douceur) */}
      {filtered.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((picto, i) => (
              <motion.div
                key={picto.id}
                layout
                variants={{
                  hidden: { opacity: 0, scale: 0.92 },
                  shown: { opacity: 1, scale: 1 },
                }}
                initial="hidden"
                animate={show ? "shown" : "hidden"}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: EASE, delay: Math.min(i, 24) * 0.025 }}
              >
                <PictoCard
                  picto={picto}
                  color={color}
                  selected={selected.has(picto.id)}
                  onToggle={() => toggle(picto.id)}
                  onOpen={() => setOpenPicto(picto)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="py-16 text-center text-muted">
          Aucun pictogramme ne correspond à votre recherche.
        </p>
      )}

      {/* Barre de sélection flottante */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            className="fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex items-center gap-3 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-cream shadow-2xl sm:gap-4">
              <span className="text-sm font-medium">
                {selected.size} sélectionné{selected.size > 1 ? "s" : ""}
              </span>
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="text-sm text-cream/70 transition-colors hover:text-cream"
              >
                Désélectionner
              </button>
              <button
                type="button"
                onClick={() => run(selectedPictos)}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] disabled:opacity-60"
              >
                <DownloadIcon className="size-4" />
                {busy ? "Préparation…" : "Télécharger"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PictoModal
        picto={openPicto}
        color={color}
        onColorChange={setColor}
        onClose={() => setOpenPicto(null)}
      />
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
