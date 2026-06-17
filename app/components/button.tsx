import Link from "next/link";
import { ArrowRight } from "@/app/components/icons";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /** primary = fond encre / texte crème ; secondary = contour encre */
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  /** affiche la flèche en fin de bouton (par défaut oui) */
  withArrow?: boolean;
  /** occupe toute la largeur disponible */
  fullWidth?: boolean;
  className?: string;
};

const sizes = {
  sm: "px-4 py-2.5 text-sm gap-1.5",
  md: "px-4 py-3 text-base gap-2",
  lg: "px-5 py-3.5 text-lg gap-2.5",
};

const arrowSizes = {
  sm: "size-4",
  md: "size-4",
  lg: "size-5",
};

// États repris du composant Figma « Button v2 » (radius 8) :
// - Primary : fond encre + contour crème → survol contour lime → clic fond lime/encre
// - Secondary : contour encre → survol contour flamme → clic fond flamme/crème
const variants = {
  primary:
    "bg-ink text-cream border border-cream hover:border-lime active:bg-lime active:text-ink active:border-ink focus-visible:outline-ink",
  secondary:
    "bg-transparent text-ink border border-ink hover:border-flame hover:text-flame active:bg-flame active:text-cream active:border-cream focus-visible:outline-ink",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = true,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-[color,background-color,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <span>{children}</span>
      {withArrow && <ArrowRight className={`${arrowSizes[size]} shrink-0`} />}
    </Link>
  );
}
