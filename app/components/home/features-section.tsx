import FeatureRow from "@/app/components/home/feature-row";
import Highlight from "@/app/components/home/highlight";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

// Trois blocs alternés présentant l'accessibilité (Figma « Frame 27 »).
export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:py-28">
      <div className="flex flex-col gap-20 lg:gap-28">
        <FeatureRow
          image="/home/accessibilite.jpg"
          imageAlt="Scène de concert vue depuis la foule"
          title={
            <>
              Qu’est ce que
              <br />« l’<Highlight>accessibilité</Highlight> » ?
            </>
          }
          subtitle={lorem}
          ctaLabel="Auditez-vous"
          ctaHref="/questionnaire"
        />

        <FeatureRow
          reversed
          image="/home/debuter.jpg"
          imageAlt="Public d'un festival face à la scène"
          title={
            <>
              Comment <Highlight>débuter</Highlight> ?
            </>
          }
          subtitle={lorem}
          ctaLabel="Auditez-vous"
          ctaHref="/questionnaire"
        />

        <FeatureRow
          image="/home/stage.jpg"
          imageAlt="Festivaliers devant la scène principale"
          title={
            <>
              Retours
              <br />
              d’<Highlight>expériences</Highlight>
            </>
          }
          subtitle={lorem}
          ctaLabel="Auditez-vous"
          ctaHref="/questionnaire"
        />
      </div>
    </section>
  );
}
