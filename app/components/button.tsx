"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, MouseEvent, ReactNode } from "react";
import { usePageTransition } from "@/app/components/page-transition";

type ButtonVariant = "primary" | "secondary" | "light" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

// Un lien interne déclenche la transition de page (le loader couvre puis révèle).
// Les liens externes / mailto et les clics modifiés gardent le comportement natif.
function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

type CommonButtonProps = {
  children: ReactNode;
  /** Petit picto optionnel affiché à droite du texte (ex: une flèche). */
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type LinkButtonProps = CommonButtonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, keyof CommonButtonProps | "href">;

type NativeButtonProps = CommonButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonButtonProps>;

type ButtonProps = LinkButtonProps | NativeButtonProps;

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
  "group relative inline-flex items-center overflow-hidden rounded-xl border outline-none transition-colors cursor-pointer";

const sizeConfig: Record<ButtonSize, { link: string; text: string }> = {
  sm: { link: "p-3", text: "text-sm" },
  md: { link: "p-4", text: "text-base" },
  lg: { link: "p-5", text: "text-lg" },
};

const baseContent =
  "relative z-10 inline-flex items-center gap-1 font-sans font-normal leading-none transition-colors";

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
    link: "border-background bg-primary hover:border-amm-green focus-visible:border-amm-green active:border-amm-green",
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

function ButtonContent({
  children,
  icon,
  variant,
  size,
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant: ButtonVariant;
  size: ButtonSize;
}) {
  const config = variantConfig[variant];
  const sizeClasses = sizeConfig[size];

  return (
    <>
      <span aria-hidden="true" className={`${baseFill} ${config.fill}`} />
      <span className={`${baseContent} ${sizeClasses.text} ${config.text}`}>
        <span>{children}</span>
        {icon ? (
          <span aria-hidden="true" className="inline-flex shrink-0">
            {icon}
          </span>
        ) : null}
      </span>
    </>
  );
}

export default function Button(props: ButtonProps) {
  const {
    children,
    icon,
    variant = "secondary",
    size = "md",
    className = "",
    ...rest
  } = props;

  const config = variantConfig[variant];
  const sizeClasses = sizeConfig[size];
  const navigate = usePageTransition();

  // Mode lien : rendu en <Link>, déclenche la transition de page pour les liens internes.
  if ("href" in props && props.href) {
    const { href, onClick, ...linkRest } = rest as Omit<
      LinkButtonProps,
      keyof CommonButtonProps
    >;

    const classes =
      `${baseLink} ${sizeClasses.link} ${config.link} ${config.focus} ${className}`.trim();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (
        !e.defaultPrevented &&
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
      <Link href={href} onClick={handleClick} className={classes} {...linkRest}>
        <ButtonContent icon={icon} size={size} variant={variant}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  // Mode action : rendu en <button> (pas de navigation).
  const buttonRest = rest as Omit<NativeButtonProps, keyof CommonButtonProps>;
  const classes = `${baseLink} ${sizeClasses.link} ${config.link} ${config.focus} ${
    buttonRest.disabled ? "pointer-events-none opacity-60" : ""
  } ${className}`.trim();

  return (
    <button type="button" className={classes} {...buttonRest}>
      <ButtonContent icon={icon} size={size} variant={variant}>
        {children}
      </ButtonContent>
    </button>
  );
}
