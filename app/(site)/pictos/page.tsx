import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import type { Picto } from "@/types/picto";
import { pictos } from "@/lib/pictos";
import PictosLibrary from "./components/pictos-library";
import Reveal from "@/app/components/animations/reveal";
import Grain from "@/app/components/home/grain";
import Highlight from "@/app/components/home/highlight";

const INTRO =
  "Cette banque de pictogrammes a été conçue pour aider les organisateurs à identifier, orienter et informer l’ensemble des publics grâce à des repères visuels simples, cohérents et facilement reconnaissables.";

// Remplace les noirs (« black » / « #1D1D1B » / « #000 ») par `currentColor`
// pour rendre le pictogramme recolorable ; le blanc (réserves) reste intact.
function colorize(svg: string) {
  return svg.replace(
    /(fill|stroke)="(black|#1d1d1b|#000000|#000)"/gi,
    '$1="currentColor"',
  );
}

export default async function PictosPage() {
  const dir = path.join(process.cwd(), "public", "pictos");
  const pictosWithMarkup: Picto[] = await Promise.all(
    pictos.map(async (p) => ({
      ...p,
      markup: colorize(await fs.readFile(path.join(dir, p.file), "utf8")),
    })),
  );

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-8 lg:py-24">
      <header className="mb-12 grid items-center gap-10 lg:mb-16 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal
            as="h1"
            y={28}
            className="font-display text-5xl font-extrabold uppercase leading-[0.95] text-ink sm:text-6xl lg:text-7xl"
          >
            Banque de <Highlight>pictogrammes</Highlight>
          </Reveal>
          <Reveal as="p" delay={0.15} className="text-base leading-relaxed text-ink sm:text-lg">
            {INTRO}
          </Reveal>
        </div>
        <Reveal
          x={60}
          y={0}
          className="relative aspect-[844/330] overflow-hidden rounded-lg"
        >
          <Image
            src="/picto_mockup.png"
            alt="Aperçu des pictogrammes en situation"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
          <Grain sizes="(min-width: 1024px) 560px, 100vw" />
        </Reveal>
      </header>

      <PictosLibrary pictos={pictosWithMarkup} />
    </div>
  );
}
