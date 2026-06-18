"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { usePageTransition } from "@/app/components/page-transition";

type ButtonVariant = "primary" | "secondary" | "light" | "ghost";

// Un lien interne déclenche la transition de page (le loader couvre puis révèle).
// Les liens externes / mailto et les clics modifiés gardent le comportement natif.
function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  /** Petit picto optionnel affiché à droite du texte (ex: une flèche). */
  icon?: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type VariantConfig = {
  /** Classes appliquées au lien (bordure + éventuel fond de repos). */
  link: string;
  /** Halo (box-shadow) affiché au focus clavier. */
  focus: string;
  /** Couleur de l'overlay qui se déploie au focus/clic. */
  fill: string;
  /** Couleur du texte selon l'état (via group-*). */
  text: string;
};

const baseLink =
  "group relative inline-flex items-center overflow-hidden rounded-xl border p-4 outline-none transition-colors cursor-pointer";

const baseContent =
  "relative z-10 inline-flex items-center gap-1 font-sans text-base font-normal leading-none transition-colors";

// L'overlay se remplit de la gauche vers la droite au focus clavier ET au clic.
const baseFill =
  "pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-focus-visible:scale-x-100 group-active:scale-x-100";

const variantConfig: Record<ButtonVariant, VariantConfig> = {
  secondary: {
    link: "border-primary bg-transparent hover:border-amm-orange focus-visible:border-amm-orange active:border-amm-orange",
    focus:
      "focus-visible:shadow-[0_0_8px_4px_color-mix(in_srgb,var(--color-amm-orange)_50%,transparent)]",
    fill: "bg-amm-orange",
    text: "text-primary group-hover:text-amm-orange group-focus-visible:text-background group-active:text-background",
  },
  primary: {
    link: "border-primary bg-primary hover:border-amm-green focus-visible:border-amm-green active:border-amm-green",
    focus:
      "focus-visible:shadow-[0_0_8px_4px_color-mix(in_srgb,var(--color-amm-green)_50%,transparent)]",
    fill: "bg-amm-green",
    text: "text-background group-hover:text-amm-green group-focus-visible:text-primary group-active:text-primary",
  },
  // CTA principal sur fond sombre : pavé crème + texte encre (le remplissage
  // encre se déploie au focus/clic, le texte passe alors en crème).
  light: {
    link: "border-background bg-background hover:border-amm-green focus-visible:border-amm-green active:border-amm-green",
    focus:
      "focus-visible:shadow-[0_0_8px_4px_color-mix(in_srgb,var(--color-amm-green)_50%,transparent)]",
    fill: "bg-primary",
    text: "text-primary group-focus-visible:text-background group-active:text-background",
  },
  // Secondaire sur fond sombre : contour + texte crème, remplissage orange au clic.
  ghost: {
    link: "border-background bg-transparent hover:border-amm-orange focus-visible:border-amm-orange active:border-amm-orange",
    focus:
      "focus-visible:shadow-[0_0_8px_4px_color-mix(in_srgb,var(--color-amm-orange)_50%,transparent)]",
    fill: "bg-amm-orange",
    text: "text-background group-hover:text-amm-orange group-focus-visible:text-primary group-active:text-primary",
  },
};

export default function Button({
  href,
  children,
  icon,
  variant = "secondary",
  className = "",
}: ButtonProps) {
  const config = variantConfig[variant];
  const navigate = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      isInternal(href) &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseLink} ${config.link} ${config.focus} ${className}`.trim()}
    >
      <span aria-hidden="true" className={`${baseFill} ${config.fill}`} />
      <span className={`${baseContent} ${config.text}`}>
        <span>{children}</span>
        {icon ? (
          <span aria-hidden="true" className="inline-flex shrink-0">
            {icon}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
