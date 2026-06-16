import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metalaxs",
  description:
    "Metalaxs est une plateforme qui permet de rendre les festivals accessibles à tous.",
};

// Layout racine minimal : il fournit uniquement <html>/<body> et les polices.
// L'en-tête et le pied de page du site vivent dans le groupe de routes (site),
// ce qui permet au Studio Sanity (/studio) de s'afficher en plein écran.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
