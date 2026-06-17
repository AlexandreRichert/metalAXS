import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

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
    fill: "bg-amm-orange",
    text: "text-primary group-hover:text-amm-orange group-focus-visible:text-background group-active:text-background",
  },
  primary: {
    link: "border-amm-orange bg-amm-orange hover:bg-transparent focus-visible:border-primary active:border-primary",
    fill: "bg-primary",
    text: "text-background group-hover:text-amm-orange group-focus-visible:text-background group-active:text-background",
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

  return (
    <Link
      href={href}
      className={`${baseLink} ${config.link} ${className}`.trim()}
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
