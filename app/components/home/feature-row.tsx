import Image from "next/image";
import Button from "@/app/components/button";
import { ArrowRight } from "@/app/components/icons";
import Grain from "@/app/components/home/grain";
import BlurText from "@/app/components/animations/blur-text";
import Reveal from "@/app/components/animations/reveal";

type FeatureRowProps = {
  image: string;
  imageAlt: string;
  title: React.ReactNode;
  /** Un paragraphe, ou plusieurs (rendus l'un sous l'autre). */
  subtitle: string | string[];
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
      <Reveal
        x={reversed ? 60 : -60}
        y={0}
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
      </Reveal>

      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-4">
          <Reveal
            as="h2"
            y={28}
            className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-ink sm:text-5xl"
          >
            {title}
          </Reveal>
          <div className="flex max-w-xl flex-col gap-3">
            {(Array.isArray(subtitle) ? subtitle : [subtitle]).map((para, i) => (
              <BlurText
                key={i}
                as="p"
                delay={0.15 + i * 0.1}
                text={para}
                className="text-base text-ink sm:text-lg"
              />
            ))}
          </div>
        </div>
        <Reveal delay={0.3} y={16}>
          <Button
            href={ctaHref}
            variant="secondary"
            icon={<ArrowRight className="size-4" />}
          >
            {ctaLabel}
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
