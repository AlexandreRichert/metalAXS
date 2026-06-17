"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/components/button";
import { ArrowRight } from "@/app/components/icons";

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
    cta: "Téléchargez les pictogrammes",
    href: "/pictos",
    image: "/home/cognitifs.jpg",
  },
  {
    title: "Dossiers chiffrés",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
    cta: "Consulter les dossiers",
    href: "/ressources",
    image: "/home/cognitifs.jpg",
  },
  {
    title: "Partenaires",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
    cta: "Découvrir les partenaires",
    href: "/federation",
    image: "/home/cognitifs.jpg",
  },
];

function Card({ item, faded }: { item: Ressource; faded?: boolean }) {
  return (
    <div className="relative flex w-[320px] flex-col gap-8 rounded-2xl bg-cream p-6 shadow-2xl ring-1 ring-line sm:w-[360px]">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="360px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-ink sm:text-3xl">
            {item.title}
          </h3>
          <p className="text-sm text-muted sm:text-base">{item.subtitle}</p>
        </div>
        <Button href={item.href} variant="primary" fullWidth>
          {item.cta}
        </Button>
      </div>
      {faded && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-cream/50" />
      )}
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
        <h2 className="font-display text-6xl font-extrabold uppercase leading-none text-ink sm:text-7xl lg:text-8xl">
          Ressources
        </h2>
        <p className="text-lg text-ink sm:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et
        </p>
      </div>

      {/* Pile de cartes en éventail (cartes latérales glissées derrière) */}
      <div className="relative mt-16 flex justify-center">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 hidden sm:block"
          style={{ transform: "translateX(-110%) translateY(4%) rotate(-11deg) scale(0.95)" }}
        >
          <Card item={ressources[prev]} faded />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 hidden sm:block"
          style={{ transform: "translateX(10%) translateY(4%) rotate(11deg) scale(0.95)" }}
        >
          <Card item={ressources[next]} faded />
        </div>
        <div className="relative z-10">
          <Card item={ressources[active]} />
        </div>
      </div>

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
                i === active ? "size-3 bg-lime" : "size-2.5 bg-lime/40"
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
