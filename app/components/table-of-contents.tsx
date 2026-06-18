"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/app/lib/headings";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -65% 0px", threshold: 0 },
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Sommaire" className="sticky top-28">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
        Dans cet article
      </p>
      <ul className="space-y-2.5">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? "pl-3" : ""}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block text-sm leading-snug transition-colors hover:text-ink ${
                activeId === id
                  ? "font-semibold text-ink"
                  : "text-muted"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
