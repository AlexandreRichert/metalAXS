"use client";

import { useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

// Couleurs de marque proposées (le reste via le sélecteur personnalisé).
export const SWATCHES = ["#2c1f00", "#abf000", "#fc470d", "#610017"];

type Props = {
  value: string;
  onChange: (color: string) => void;
};

// Sélecteur de couleur sur-mesure (pastilles de marque + popover personnalisé),
// pour remplacer le sélecteur natif du navigateur.
export default function ColorPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isCustom = !SWATCHES.includes(value.toLowerCase());

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-3 pr-1.5"
    >
      <span className="text-xs font-medium text-muted">Couleur</span>
      <div className="flex items-center gap-1">
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-label={`Couleur ${c}`}
            aria-pressed={value.toLowerCase() === c}
            className={`size-6 rounded-full transition-transform duration-200 ${
              value.toLowerCase() === c
                ? "ring-2 ring-ink ring-offset-2 ring-offset-white"
                : "ring-1 ring-inset ring-ink/10 hover:scale-110"
            }`}
            style={{ background: c }}
          />
        ))}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Couleur personnalisée"
          aria-expanded={open}
          className={`relative inline-flex size-6 items-center justify-center rounded-full transition-transform duration-200 ${
            isCustom
              ? "ring-2 ring-ink ring-offset-2 ring-offset-white"
              : "ring-1 ring-inset ring-ink/10 hover:scale-110"
          }`}
          style={{
            background: isCustom
              ? value
              : "conic-gradient(from 90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)",
          }}
        >
          {!isCustom && (
            <svg viewBox="0 0 24 24" fill="none" className="size-3 text-white drop-shadow" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="amm-colorpicker absolute right-0 top-full z-30 mt-2 w-[232px] rounded-2xl border border-line bg-white p-3 shadow-2xl">
          <HexColorPicker color={value} onChange={onChange} />
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-line px-3 py-2 focus-within:border-ink">
            <span className="text-sm font-medium text-muted">#</span>
            <HexColorInput
              color={value}
              onChange={(c) => onChange(c.startsWith("#") ? c : `#${c}`)}
              prefixed={false}
              className="w-full bg-transparent text-sm font-medium uppercase text-ink outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
