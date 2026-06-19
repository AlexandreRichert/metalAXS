"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Button from "@/app/components/button";
import { ArrowRight } from "@/app/components/icons";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import SplitText from "@/app/components/animations/split-text";
import BlurText from "@/app/components/animations/blur-text";
import Reveal from "@/app/components/animations/reveal";

type Ressource = {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
};

const ressources: Ressource[] = [
  {
    title: "Banque d’icônes",
    subtitle:
      "Une bibliothèque de pictogrammes d’accessibilité prêts à poser sur vos plans, votre signalétique et vos supports.",
    cta: "Téléchargez les pictogrammes",
    href: "/pictos",
    image: "/home/cognitifs.jpg",
  },
  {
    title: "Chiffres",
    subtitle:
      "Les données qui posent le sujet : combien de festivaliers concernés, quels besoins, et pourquoi ça compte.",
    cta: "Aller voir les chiffres",
    href: "/ressources",
    image: "/home/cognitifs.jpg",
  },
  {
    title: "Partenaires",
    subtitle:
      "Les associations et structures spécialisées prêtes à vous épauler, du diagnostic jusqu’au jour J.",
    cta: "Voir nos partenaires",
    href: "/federation",
    image: "/home/cognitifs.jpg",
  },
];

function Card({ item }: { item: Ressource }) {
  return (
    <div className="flex w-[320px] flex-col gap-8 rounded-lg bg-white p-6 shadow-[0px_4px_15.5px_0px_rgba(0,0,0,0.1)] transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.18)] sm:w-[360px]">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="360px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-ink">
          {item.title}
        </h3>
        <p className="text-base text-muted">{item.subtitle}</p>
      </div>
      <Button href={item.href} variant="primary" className="self-start">
        {item.cta}
      </Button>
    </div>
  );
}

const len = ressources.length;

export default function RessourcesSection() {
  const [active, setActive] = useState(0);
  const prev = (active - 1 + len) % len;
  const next = (active + 1) % len;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <SplitText
          as="h2"
          text="Ressources"
          className="font-display text-6xl font-extrabold uppercase leading-none text-ink sm:text-7xl lg:text-8xl"
        />
        <BlurText
          as="p"
          delay={0.2}
          text="Tout ce qu’il faut pour rendre votre festival accessible, des outils prêts à l’emploi aux partenaires qui connaissent le terrain."
          className="text-lg text-ink sm:text-xl"
        />
      </div>

      {/* Pile de cartes en éventail : chaque carte glisse vers sa position au
          changement (la carte recyclée passe en douceur derrière la carte active). */}
      <Reveal y={40} amount={0.15} className="relative mt-16 flex justify-center">
        {/* Réserve la hauteur/largeur ; les vraies cartes sont positionnées par-dessus. */}
        <div className="invisible" aria-hidden="true">
          <Card item={ressources[active]} />
        </div>
        {ressources.map((item, i) => {
          let off = i - active;
          if (off > len / 2) off -= len;
          if (off < -len / 2) off += len;
          const isActive = off === 0;
          const target = isActive
            ? { x: "-50%", y: "0%", rotate: 0, scale: 1, opacity: 1 }
            : off < 0
              ? { x: "-110%", y: "4%", rotate: -11, scale: 0.95, opacity: 0.5 }
              : { x: "10%", y: "4%", rotate: 11, scale: 0.95, opacity: 0.5 };
          return (
            <motion.div
              key={item.title}
              className={`absolute left-1/2 top-0 ${
                isActive ? "" : "cursor-pointer max-sm:hidden"
              }`}
              style={{ zIndex: isActive ? 20 : 10 }}
              initial={false}
              animate={target}
              transition={{ duration: 0.6, ease: EASE }}
              aria-hidden={!isActive}
              onClick={isActive ? undefined : () => setActive(i)}
            >
              {/* Carte latérale : on neutralise ses interactions internes (lien du
                  bouton) pour que tout clic ramène la carte au centre. */}
              <div className={isActive ? "" : "pointer-events-none"}>
                <Card item={item} />
              </div>
            </motion.div>
          );
        })}
      </Reveal>

      {/* Contrôles du carrousel */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setActive(prev)}
          aria-label="Ressource précédente"
          className="inline-flex size-10 items-center justify-center rounded-xl bg-line text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          <ArrowRight className="size-4 rotate-180" />
        </button>

        <div className="flex items-center gap-2">
          {ressources.map((r, i) => (
            <button
              key={r.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Aller à : ${r.title}`}
              aria-current={i === active}
              className={`rounded-full transition-all ${
                i === active ? "size-3 bg-ink" : "size-2.5 bg-ink/25"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setActive(next)}
          aria-label="Ressource suivante"
          className="inline-flex size-10 items-center justify-center rounded-xl bg-line text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
