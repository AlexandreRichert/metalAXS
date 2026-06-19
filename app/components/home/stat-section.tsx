import Image from "next/image";
import Button from "@/app/components/button";
import Grain from "@/app/components/home/grain";
import DarkTexture from "@/app/components/dark-texture";
import CountUp from "@/app/components/animations/count-up";
import BlurText from "@/app/components/animations/blur-text";
import Reveal from "@/app/components/animations/reveal";

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
    stat: "5,8%",
    subtitle:
      "Circuler sur un site de festival vire vite au parcours d’obstacles quand on est en fauteuil ou vite fatigué.",
    image: "/home/moteurs.jpg",
    icon: "fa-solid fa-wheelchair",
    href: "/disabilitiesTypes/motor",
  },
  {
    title: "Visuels",
    stat: "3%",
    subtitle:
      "De la malvoyance à la cécité, profiter d’un concert passe par le son et le toucher, pas seulement par la vue.",
    image: "/home/festival-crowd.jpg",
    icon: "fa-solid fa-eye",
    href: "/disabilitiesTypes/visuel",
  },
  {
    title: "Auditifs",
    stat: "16%",
    subtitle:
      "Sourd ou malentendant, on vit la musique autrement, par les vibrations et le regard.",
    image: "/home/stage.jpg",
    icon: "fa-solid fa-ear-listen",
    href: "/disabilitiesTypes/auditif",
  },
  {
    title: "Déficiences intellectuelles",
    stat: "2%",
    subtitle:
      "Une signalétique claire et un accueil patient suffisent souvent à rendre le festival accessible.",
    image: "/home/cognitifs.jpg",
    icon: "fa-solid fa-puzzle-piece",
    href: "/disabilitiesTypes/intellectuelle",
  },
  {
    title: "Troubles psychiques",
    stat: "20%",
    subtitle:
      "Entre la foule, le bruit et l’imprévu, un festival peut vite devenir trop intense sans espace de répit.",
    image: "/home/accessibilite.jpg",
    icon: "fa-solid fa-brain",
    href: "/disabilitiesTypes/psychique",
  },
  {
    title: "Maladies invalidantes",
    stat: "20%",
    subtitle:
      "Douleurs, fatigue ou traitements lourds : des contraintes invisibles qui demandent des aménagements bien réels.",
    image: "/home/debuter.jpg",
    icon: "fa-solid fa-heart-pulse",
    href: "/disabilitiesTypes",
  },
];

// Section statistique sombre + cartes par type de handicap (Figma « Frame 17 »).
export default function StatSection() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <DarkTexture />
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <CountUp
            to={75}
            suffix="%"
            duration={2}
            className="font-display text-7xl font-extrabold uppercase leading-none text-lime sm:text-8xl lg:text-[120px]"
          />
          <BlurText
            as="p"
            delay={0.2}
            text="des festivals n’ont aujourd’hui aucun dispositif d’accessibilité dédié aux personnes en situation de handicap."
            className="text-lg text-cream/90 sm:text-xl"
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal as="article" key={card.title} y={40} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-lg bg-white p-6 text-ink transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0px_18px_40px_0px_rgba(0,0,0,0.3)]">
              <div className="relative h-[200px] overflow-hidden rounded-lg">
                <Image
                  src={card.image}
                  alt={`Handicap ${card.title.toLowerCase()}`}
                  fill
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/50" />
                <Grain sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw" />
                <span className="absolute inset-0 z-10 flex items-center justify-center font-display text-7xl font-extrabold uppercase text-lime">
                  {card.stat}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <h3 className="font-display text-3xl font-extrabold uppercase leading-none">
                      {card.title}
                    </h3>
                    <i className={`${card.icon} text-2xl text-ink`} aria-hidden="true" />
                  </div>
                  <p className="text-lg leading-snug">{card.subtitle}</p>
                </div>

                <Button
                  href={card.href}
                  variant="primary"
                  className="mt-auto self-start"
                >
                  Informez-vous
                </Button>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
