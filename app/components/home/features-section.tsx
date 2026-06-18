import FeatureRow from "@/app/components/home/feature-row";
import Highlight from "@/app/components/home/highlight";

// Blocs alternés présentant l'accessibilité (Figma « Frame 27 »).
export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:py-28">
      <div className="flex flex-col gap-20 lg:gap-28">
        <FeatureRow
          image="/home/accessibilite.jpg"
          imageAlt="Scène de concert vue depuis la foule"
          title={
            <>
              Qu’est ce que l’<Highlight>accessibilité</Highlight> ?
            </>
          }
          subtitle="L’accessibilité, c’est permettre à chaque festivalier de vivre l’événement dans de bonnes conditions, quel que soit son handicap : moteur, visuel, auditif ou cognitif. Cela passe par des aménagements concrets, mais aussi par une organisation et un accueil pensés en amont."
          ctaLabel="Auditez-vous"
          ctaHref="/questionnaire"
        />

        <FeatureRow
          reversed
          image="/home/debuter.jpg"
          imageAlt="Public d’un festival face à la scène"
          title={
            <>
              Comment <Highlight>débuter ?</Highlight>
            </>
          }
          subtitle={[
            "Pas besoin de tout changer du jour au lendemain. Identifiez les actions essentielles, évaluez votre festival, et avancez par étapes vers une accessibilité toujours plus large.",
            "En adoptant une approche par jalons, nourrie par les retours d’expérience de vos publics et des experts concernés, vous transformez progressivement l’infrastructure de votre événement en un espace véritablement universel, où l’audace créative se conjugue enfin avec la responsabilité sociale.",
          ]}
          ctaLabel="Auditez-vous"
          ctaHref="/questionnaire"
        />
      </div>
    </section>
  );
}
