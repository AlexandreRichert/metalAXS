import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

// Layout du site public : en-tête + contenu + pied de page.
// Toutes les pages publiques (accueil, blog, questionnaire, etc.) vivent ici.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
