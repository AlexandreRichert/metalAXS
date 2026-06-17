import Hero from "@/app/components/home/hero";
import FeaturesSection from "@/app/components/home/features-section";
import StatSection from "@/app/components/home/stat-section";
import RessourcesSection from "@/app/components/home/ressources-section";
import AuditCta from "@/app/components/home/audit-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <StatSection />
      <RessourcesSection />
      <AuditCta />
    </>
  );
}
