"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/app/components/logo";
import Button from "@/app/components/button";
import { ChevronDown } from "@/app/components/icons";

// Navigation principale (Figma « Navbar », états default / scroll).
const navItems = [
  { label: "Bonnes pratiques", href: "/goodPractices", dropdown: true },
  { label: "Handicaps", href: "/disabilitiesTypes", dropdown: true },
  { label: "Ressources", href: "/ressources", dropdown: true },
  { label: "La Fédé", href: "/federation", dropdown: false },
];

// Courbe de Bézier douce pour la transition default <-> scroll.
const EASE = "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Conteneur aligné sur le héro (max 1440) ; l'inset horizontal plus large que
          celui du héro rend la nav ~24px plus étroite que la carte, comme sur Figma. */}
      <div className="mx-auto max-w-[1440px] px-8 pt-10 sm:px-14 sm:pt-14">
        <nav
          className={`mx-auto flex w-full items-center justify-between gap-4 rounded-2xl bg-white px-3 py-2.5 transition-[max-width,box-shadow] duration-500 ${EASE} sm:px-5 ${
            scrolled
              ? "max-w-[940px] shadow-2xl"
              : "max-w-[1328px] shadow-sm"
          }`}
        >
          {/* Marque : monogramme (toujours) + logotype (masqué au scroll) */}
          <div className="flex items-center gap-6 lg:gap-12">
            <Link href="/" className="flex items-center text-ink" aria-label="Metal AXS — accueil">
              <Logo className="size-7 shrink-0" />
              <span
                className={`overflow-hidden whitespace-nowrap font-display text-xl font-extrabold uppercase italic leading-none tracking-tight transition-all duration-500 ${EASE} ${
                  scrolled
                    ? "ml-0 max-w-0 opacity-0"
                    : "ml-2 hidden max-w-[260px] opacity-100 sm:inline-block"
                }`}
              >
                all access metal
              </span>
            </Link>

            {/* Liens (pastilles contour bordeaux) */}
            <ul className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-xl border-[1.5px] border-wine/80 px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-cream"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="size-4" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Appel à l'action */}
          <Button href="/questionnaire" size="sm" withArrow={false} className="shrink-0">
            Auditez-vous
          </Button>
        </nav>
      </div>
    </header>
  );
}
