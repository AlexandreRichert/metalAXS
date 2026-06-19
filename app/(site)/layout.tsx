import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import SmoothScroll from "@/app/components/smooth-scroll";
import PageLoader from "@/app/components/page-loader";
import GrainOverlay from "@/app/components/grain-overlay";
import PageTransitionProvider from "@/app/components/page-transition";

// Layout du site public : en-tête + contenu + pied de page.
// Toutes les pages publiques (accueil, blog, etc.) vivent ici.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <PageLoader />
      <GrainOverlay />
      <PageTransitionProvider>
        <div className="flex min-h-full flex-col">
          <Header />
          {/* pt pour dégager l'en-tête fixe ; la home réduit ce décalage (héro sous la nav). */}
          <main className="flex-1 pt-32">{children}</main>
          <Footer />
        </div>
      </PageTransitionProvider>
    </SmoothScroll>
  );
}
