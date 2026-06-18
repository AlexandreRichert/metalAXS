"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Picto } from "@/types/picto";
import { categoryLabels } from "@/lib/pictos";
import { applyColor, downloadPng, downloadSvg } from "../svg-export";
import Button from "@/app/components/button";
import ColorPicker from "./color-picker";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  picto: Picto | null;
  color: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
};

// Modale d'aperçu : fond flouté, carte animée, téléchargement SVG ou PNG.
export default function PictoModal({ picto, color, onColorChange, onClose }: Props) {
  useEffect(() => {
    if (!picto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [picto, onClose]);

  return (
    <AnimatePresence>
      {picto && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial="hidden"
          animate="shown"
          exit="hidden"
          role="dialog"
          aria-modal="true"
          aria-label={picto.name}
        >
          <motion.button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-md"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{ duration: 0.25, ease: EASE }}
          />

          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            variants={{
              hidden: { opacity: 0, scale: 0.96, y: 12 },
              shown: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-6 p-8">
              <div className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-2xl bg-white ring-1 ring-line">
                <span
                  style={{ color }}
                  aria-hidden="true"
                  className="block size-32 [&>svg]:size-full"
                  dangerouslySetInnerHTML={{ __html: picto.markup ?? "" }}
                />
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <span className="inline-flex items-center rounded-full bg-lime/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
                  {categoryLabels[picto.category]}
                </span>
                <h2 className="font-display text-3xl font-extrabold uppercase leading-none text-ink">
                  {picto.name}
                </h2>
              </div>

              <ColorPicker value={color} onChange={onColorChange} />

              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  onClick={() => downloadSvg(applyColor(picto.markup ?? "", color), picto.name)}
                  icon={<DownloadIcon />}
                  className="flex-1 justify-center"
                >
                  SVG
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => downloadPng(applyColor(picto.markup ?? "", color), picto.name)}
                  icon={<DownloadIcon />}
                  className="flex-1 justify-center"
                >
                  PNG
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
