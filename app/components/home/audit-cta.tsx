import Image from "next/image";
import Button from "@/app/components/button";
import DarkTexture from "@/app/components/dark-texture";

// Appel à l'action final (Figma « Frame 35 ») — fond sombre raccord avec le footer.
export default function AuditCta() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <DarkTexture />
      <div className="relative mx-auto max-w-[1440px] px-4 pt-16 pb-8 sm:px-8 sm:pt-20">
        <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[32px] px-6 py-20 text-center">
          <Image
            src="/home/stage.jpg"
            alt="Foule devant la scène d'un festival"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-cream/50" />

          <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl lg:text-8xl">
                Auditez-vous
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-ink sm:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/questionnaire" variant="primary" size="lg">
                Accédez à votre audit gratuit
              </Button>
              <Button href="/goodPractices" variant="secondary" size="lg">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
