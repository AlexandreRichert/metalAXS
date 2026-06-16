import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const markPro = localFont({
  src: [
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-ExtraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-BookItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-Italic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-Medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-MediumItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-HeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/Mark pro/Mark pro/MarkPro-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-mark-pro",
  display: "swap",
});

const hintdake = localFont({
  src: "../public/fonts/Hintdake/Hintdake Sans Regular.otf",
  variable: "--font-hintdake",
  display: "swap",
});

const hintdakeRough = localFont({
  src: "../public/fonts/Hintdake/Hintdake Sans Rough.otf",
  variable: "--font-hintdake-rough",
  display: "swap",
});

const hintdakeStamp = localFont({
  src: "../public/fonts/Hintdake/Hintdake Sans Stamp.otf",
  variable: "--font-hintdake-stamp",
  display: "swap",
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
      className={`${markPro.variable} ${hintdake.variable} ${hintdakeRough.variable} ${hintdakeStamp.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
