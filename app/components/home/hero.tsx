import Image from "next/image";
import Button from "@/app/components/button";
import SplitText from "@/app/components/animations/split-text";
import BlurText from "@/app/components/animations/blur-text";
import Reveal from "@/app/components/animations/reveal";

// Section héro (Figma « Site / Header ») : grande carte image + titre d'affichage.
export default function Hero() {
  return (
    <section className="mx-auto -mt-24 max-w-[1440px] px-4 sm:px-8">
      <div className="relative flex min-h-[640px] items-center justify-center overflow-hidden rounded-lg px-6 pb-20 pt-36 lg:min-h-[760px]">
        <Image
          src="/home/hero.jpg"
          alt="Foule lors d'un festival de musique métal"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Voile crème 50 % (design : fill #f2ede3 @ 0.5) pour la lisibilité */}
        <div className="absolute inset-0 bg-cream/50" />

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-4">
            <SplitText
              as="h1"
              text={"Devenez\naccessible"}
              delay={0.15}
              className="font-display text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
            />
            <BlurText
              as="p"
              delay={0.5}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              className="mx-auto max-w-2xl text-lg text-ink sm:text-xl"
            />
          </div>

          <Reveal delay={0.8} y={20} className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/goodPractices" variant="primary" size="lg">
              Auditez-vous
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
