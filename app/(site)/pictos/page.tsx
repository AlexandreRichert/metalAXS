import fs from "fs/promises";
import path from "path";
import type { Picto } from "@/types/picto";
import { pictos } from "@/lib/pictos";
import PictosLibrary from "./components/pictos-library";
import SplitText from "@/app/components/animations/split-text";
import Reveal from "@/app/components/animations/reveal";

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
      <header className="mb-12 flex max-w-3xl flex-col gap-6 lg:mb-16">
        <SplitText
          as="h1"
          text="Banque de pictogrammes"
          className="font-display text-5xl font-extrabold uppercase leading-[0.95] text-ink sm:text-6xl lg:text-7xl"
        />
        <Reveal as="p" delay={0.15} className="text-base leading-relaxed text-muted sm:text-lg">
          {INTRO}
        </Reveal>
      </header>

      <PictosLibrary pictos={pictosWithMarkup} />
    </div>
  );
}
