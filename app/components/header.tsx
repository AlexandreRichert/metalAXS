"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import Button from "@/app/components/button";
import { ChevronDown } from "@/app/components/icons";
import { useAppReady } from "@/app/components/app-ready";

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
  const reduce = useReducedMotion();
  // L'en-tête glisse depuis le haut une fois le loader d'accueil disparu.
  const ready = useAppReady();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -120, opacity: 0 }}
      animate={
        ready || reduce ? { y: 0, opacity: 1 } : { y: -120, opacity: 0 }
      }
      transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Conteneur aligné sur le héro (max 1440) ; l'inset horizontal plus large que
          celui du héro rend la nav ~24px plus étroite que la carte, comme sur Figma. */}
      <div
        className={`mx-auto max-w-[1440px] px-8 transition-[padding] duration-500 sm:px-14 ${EASE} ${
          scrolled ? "pt-4 sm:pt-6" : "pt-10 sm:pt-14"
        }`}
      >
        <nav
          className={`mx-auto flex w-full items-center justify-between gap-4 rounded-lg bg-white px-3 py-2.5 transition-[max-width,box-shadow] duration-500 ${EASE} sm:px-5 ${
            scrolled
              ? "max-w-[940px] shadow-2xl"
              : "max-w-[1328px] shadow-sm"
          }`}
        >
          {/* Marque : icône (toujours) + logotype texte (masqué au scroll). */}
          <div className="flex items-center gap-6 lg:gap-12">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-ink"
              aria-label="All Access Metal — accueil"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="/allaccessmetallogo-icon.svg"
                alt=""
                aria-hidden="true"
                className="size-8 shrink-0"
                animate={{ rotate: reduce ? 0 : scrolled ? 360 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/allaccessmetallogo-txt.svg"
                alt="All Access Metal"
                className={`block h-3.5 w-auto shrink-0 overflow-hidden transition-all duration-500 ${EASE} ${
                  scrolled
                    ? "ml-0 max-w-0 opacity-0"
                    : "ml-1 hidden max-w-[280px] opacity-100 sm:block"
                }`}
              />
            </Link>

            {/* Liens de navigation (texte simple, sans contour) */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-ink/5"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="size-4" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Appel à l'action */}
          <Button href="mailto:contact@fedemetal.com" size="sm" className="shrink-0">
            Contactez-nous
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
