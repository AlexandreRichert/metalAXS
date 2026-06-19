import Link from "next/link";
import DarkTexture from "@/app/components/dark-texture";

// Pied de page (design Figma « Frame 35 » 629:2464) : aplat #2c1f00 + texture, colonnes + contacts + logotype.
const linkColumns = [
  {
    title: "Accessibilité",
    links: [
      { label: "Bonnes pratiques", href: "/blog" },
      { label: "Ressources", href: "/pictos" },
    ],
  },
];

const handicaps = [
  { label: "Moteurs", href: "/disabilitiesTypes/motor" },
  { label: "Visuels", href: "/disabilitiesTypes/visuel" },
  { label: "Auditifs", href: "/disabilitiesTypes/auditif" },
  { label: "Cognitifs", href: "/disabilitiesTypes/cognitif" },
];

const contacts = [
  {
    label: "contact@fedemetal.com",
    href: "mailto:contact@fedemetal.com",
    icon: <EnvelopeIcon />,
  },
  {
    label: "Fédération des Musiques Métalliques",
    href: "https://www.facebook.com/profile.php?id=100086192674757",
    icon: <i className="fa-brands fa-facebook text-lg" aria-hidden="true" />,
  },
  {
    label: "Fédération des Musiques Métalliques",
    href: "https://discord.com/invite/aT8McwWM",
    icon: <i className="fa-brands fa-discord text-lg" aria-hidden="true" />,
  },
  {
    label: "@federationmusiquesmetalliques",
    href: "https://www.instagram.com/federationmusiquesmetalliques/",
    icon: <i className="fa-brands fa-instagram text-lg" aria-hidden="true" />,
  },
];

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-medium text-lime">{title}</span>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm font-medium text-white transition-colors hover:text-lime"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <DarkTexture />
      <div className="relative mx-auto max-w-[1440px] px-6 pb-10 pt-16 sm:px-8 lg:pt-20">
        {/* Colonnes de liens + contacts */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex flex-wrap gap-12 sm:gap-20 lg:gap-24">
            <Column {...linkColumns[0]} />
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-lime">Handicaps</span>
              <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
                {handicaps.map((h) => (
                  <li key={h.label}>
                    <Link
                      href={h.href}
                      className="text-sm font-medium text-white transition-colors hover:text-lime"
                    >
                      {h.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:max-w-[680px] lg:flex-1">
            <span className="text-sm font-medium text-lime">Contacts</span>
            <div className="grid justify-items-start gap-4 sm:grid-cols-2">
              {contacts.map((contact, i) => (
                <Link
                  key={i}
                  href={contact.href}
                  className="inline-flex items-center gap-3 rounded-xl border border-line/40 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-lime hover:text-lime"
                >
                  <span className="shrink-0">{contact.icon}</span>
                  <span className="truncate">{contact.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Logotype : SVG pleine largeur du conteneur de contenu (1376×72). */}
        <img
          src="/allaccessmetalfooter.svg"
          alt="All Access Metal"
          className="mt-14 block h-auto w-full lg:mt-16"
        />

        {/* Crédits */}
        <div className="mt-8 flex flex-col gap-2 text-sm font-medium text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-1.5">
            Made with
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
              <path d="M12 21s-7.5-4.7-10-9.3C.6 9 1.4 5.6 4.3 4.6 6.4 3.9 8.5 4.8 12 8c3.5-3.2 5.6-4.1 7.7-3.4 2.9 1 3.7 4.4 2.3 7.1C19.5 16.3 12 21 12 21Z" />
            </svg>
            by Elie, Audrey, Valentine, Alex, Julie, Ethan, Julien, Clément, Yoann, Alexandre, Izia, Violette, Maxanne, Éloïse
          </p>
          <p>©2026 — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
