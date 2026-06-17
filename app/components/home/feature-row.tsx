import Image from "next/image";
import Button from "@/app/components/button";
import Grain from "@/app/components/home/grain";

type FeatureRowProps = {
  image: string;
  imageAlt: string;
  title: React.ReactNode;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  /** image à droite (texte à gauche) */
  reversed?: boolean;
};

// Bloc « image + texte » alterné (Figma Frame 15 / 14 / 16).
export default function FeatureRow({
  image,
  imageAlt,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  reversed = false,
}: FeatureRowProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div
        className={`relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-[400px] ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
        />
        <Grain sizes="(min-width: 1024px) 560px, 100vw" />
      </div>

      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-ink sm:text-5xl">
            {title}
          </h2>
          <p className="max-w-xl text-base text-muted sm:text-lg">{subtitle}</p>
        </div>
        <Button href={ctaHref} variant="secondary">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
