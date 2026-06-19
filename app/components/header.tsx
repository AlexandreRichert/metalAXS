"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/button";
import { ArrowRight, ChevronDown } from "@/app/components/icons";
import { useAppReady } from "@/app/components/app-ready";
import { usePageTransition } from "@/app/components/page-transition";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

// Navigation principale (Figma « Navbar » 544:1387). Seul « Handicaps » ouvre un
// menu déroulant ; les autres liens pointent directement vers leurs pages.
const navItems: NavItem[] = [
  { label: "Bonnes pratiques", href: "/blog" },
  {
    label: "Handicaps",
    href: "/disabilitiesTypes",
    children: [
      { label: "Moteur", href: "/disabilitiesTypes/moteur" },
      { label: "Auditif", href: "/disabilitiesTypes/auditif" },
      { label: "Visuel", href: "/disabilitiesTypes/visuel" },
      { label: "Déficience intellectuelle", href: "/disabilitiesTypes/intellectuelle" },
      { label: "Troubles psychiques", href: "/disabilitiesTypes/psychique" },
      { label: "Maladies invalidantes", href: "/disabilitiesTypes/invalidante" },
    ],
  },
  { label: "Ressources", href: "/pictos" },
  { label: "La Fédération", href: "/federation" },
];

// Courbe de Bézier douce pour la transition default <-> scroll.
const EASE = "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  // Lien dont le menu déroulant est ouvert (null = aucun).
  const [openHref, setOpenHref] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const ready = useAppReady();
  const navigate = usePageTransition();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu après une navigation (sinon il persiste, le lien gardant le focus).
  useEffect(() => {
    setOpenHref(null);
  }, [pathname]);

  // Ferme le menu et déclenche la transition de page pour les liens internes.
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpenHref(null);
    if (
      isInternal(href) &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -120, opacity: 0 }}
      animate={ready || reduce ? { y: 0, opacity: 1 } : { y: -120, opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`mx-auto max-w-[1440px] px-8 transition-[padding] duration-500 sm:px-14 ${EASE} ${
          scrolled ? "pt-4 sm:pt-6" : "pt-10 sm:pt-14"
        }`}
      >
        <nav
          className={`mx-auto flex w-full items-center justify-between gap-4 rounded-lg bg-white px-3 py-2.5 transition-[max-width,box-shadow] duration-500 ${EASE} sm:px-5 ${
            scrolled ? "max-w-[940px] shadow-2xl" : "max-w-[1328px] shadow-sm"
          }`}
        >
          {/* Marque : icône (toujours) + logotype texte (masqué au scroll). */}
          <div className="flex items-center gap-6 lg:gap-12">
            <Link
              href="/"
              onClick={(e) => go(e, "/")}
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

            {/* Liens de navigation (« Handicaps » ouvre un menu déroulant) */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const hasMenu = Boolean(item.children);
                const open = openHref === item.href;
                // Page courante : le lien (ou le déclencheur du menu) passe en état sélectionné.
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <li
                    key={item.href}
                    className={hasMenu ? "relative" : undefined}
                    onMouseEnter={hasMenu ? () => setOpenHref(item.href) : undefined}
                    onMouseLeave={hasMenu ? () => setOpenHref(null) : undefined}
                    onFocus={hasMenu ? () => setOpenHref(item.href) : undefined}
                    onBlur={
                      hasMenu
                        ? (e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                              setOpenHref(null);
                            }
                          }
                        : undefined
                    }
                  >
                    {hasMenu ? (
                      // « Handicaps » n'est qu'un libellé/déclencheur du menu : un
                      // bouton (pas de lien) → aucune redirection au clic.
                      <button
                        type="button"
                        onClick={() => setOpenHref(open ? null : item.href)}
                        aria-haspopup="true"
                        aria-expanded={open}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          active
                            ? "bg-ink text-background"
                            : "text-ink hover:bg-ink/5"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`size-4 transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={(e) => go(e, item.href)}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          active
                            ? "bg-ink text-background"
                            : "text-ink hover:bg-ink/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {hasMenu && (
                      // pt-3 = pont survolable entre le lien et le panneau.
                      <div
                        className={`absolute left-0 top-full z-10 pt-3 transition-all duration-200 ${
                          open
                            ? "visible translate-y-0 opacity-100"
                            : "invisible translate-y-1 opacity-0"
                        }`}
                      >
                        <ul className="min-w-[248px] rounded-2xl bg-white p-2 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.14)] ring-1 ring-ink/5">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={(e) => go(e, child.href)}
                                className="block whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Appel à l'action */}
          <Button
            href="/contact"
            variant="primary"
            icon={<ArrowRight className="size-4" />}
            className="shrink-0"
          >
            Contactez-nous
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
