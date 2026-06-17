import Image from "next/image";
import Link from "next/link";
import Grain from "@/app/components/home/grain";
import DarkTexture from "@/app/components/dark-texture";
import { ArrowRight } from "@/app/components/icons";

type DisabilityCard = {
  title: string;
  stat: string;
  subtitle: string;
  image: string;
  icon: string;
  href: string;
};

const cards: DisabilityCard[] = [
  {
    title: "Moteurs",
    stat: "00%",
    subtitle: "Lorem ipsum dolor sit amet, consectetur",
    image: "/home/moteurs.jpg",
    icon: "fa-solid fa-wheelchair",
    href: "/disabilitiesTypes/motor",
  },
  {
    title: "Visuels",
    stat: "00%",
    subtitle: "Lorem ipsum dolor sit amet, consectetur",
    image: "/home/festival-crowd.jpg",
    icon: "fa-solid fa-eye",
    href: "/disabilitiesTypes/view",
  },
  {
    title: "Auditifs",
    stat: "00%",
    subtitle: "Lorem ipsum dolor sit amet, consectetur",
    image: "/home/stage.jpg",
    icon: "fa-solid fa-ear-listen",
    href: "/disabilitiesTypes/audio",
  },
  {
    title: "Cognitifs",
    stat: "00%",
    subtitle: "Lorem ipsum dolor sit amet, consectetur",
    image: "/home/cognitifs.jpg",
    icon: "fa-solid fa-brain",
    href: "/disabilitiesTypes/cognitif",
  },
];

// Section statistique sombre + cartes par type de handicap (Figma « Frame 17 »).
export default function StatSection() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <DarkTexture />
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="font-display text-7xl font-extrabold uppercase leading-none text-lime sm:text-8xl lg:text-[120px]">
            75%
          </p>
          <p className="text-lg text-cream/90 sm:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col gap-4 rounded-2xl bg-white p-6 text-ink"
            >
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image
                  src={card.image}
                  alt={`Handicap ${card.title.toLowerCase()}`}
                  fill
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/50" />
                <Grain sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw" />
                <span className="absolute inset-0 z-10 flex items-center justify-center font-display text-6xl font-extrabold uppercase text-lime">
                  {card.stat}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-2xl font-extrabold uppercase leading-none">
                      {card.title}
                    </h3>
                    <i className={`${card.icon} text-xl text-ink`} aria-hidden="true" />
                  </div>
                  <p className="text-sm text-muted">{card.subtitle}</p>
                </div>

                <Link
                  href={card.href}
                  aria-label={`En savoir plus sur les handicaps ${card.title.toLowerCase()}`}
                  className="mt-auto inline-flex size-10 items-center justify-center self-start rounded-xl border border-ink/80 text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
