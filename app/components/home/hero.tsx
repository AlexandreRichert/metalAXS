import HeroRive from "@/app/components/home/hero-rive";
import HeroShaders from "@/app/components/home/hero-shaders";
import Button from "@/app/components/button";
import BlurText from "@/app/components/animations/blur-text";
import Reveal from "@/app/components/animations/reveal";
import { ArrowRight } from "@/app/components/icons";

// Héro : fond interactif Rive (le titre « METAL POUR TOUS » est intégré au .riv)
// + paragraphe et CTA en surimpression, en teintes claires lisibles sur le fond
// sombre. Le pointeur traverse les calques pour garder le fond Rive interactif.
export default function Hero() {
  return (
    <section className="mx-auto -mt-24 max-w-[1440px] px-4 sm:px-8">
      <div className="relative flex min-h-[640px] flex-col justify-end overflow-hidden rounded-lg lg:min-h-[760px]">
        {/* Fond animé interactif (reçoit le pointeur) */}
        <HeroRive />

        {/* Shaders Paper (grain + dither) par-dessus le .riv, sans capter le pointeur */}
        <HeroShaders />

        {/* Voile dégradé en bas : garantit le contraste du texte/bouton clair
            quel que soit l'état du fond. Ne capte pas le pointeur. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />

        {/* Surimpression : transparente au pointeur, sauf le bouton. */}
        <div className="pointer-events-none relative z-10 flex flex-col items-center gap-8 px-6 pb-16 text-center lg:pb-20">
          <BlurText
            as="p"
            delay={0.4}
            text="Découvrez les bonnes pratiques, les normes et les outils pour rendre votre festival accessible à tous les publics."
            className="mx-auto max-w-2xl text-lg text-background drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:text-xl"
          />
          <Reveal
            delay={0.7}
            y={20}
            className="pointer-events-auto flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              href="/goodPractices"
              variant="light"
              icon={<ArrowRight className="size-4" />}
            >
              Consulter les bonnes pratiques
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
