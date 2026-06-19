"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Heading } from "@/app/lib/headings";

const STICKY_OFFSET = 112; // top-28

function scrollToHeading(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const top =
    target.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  const updateIndicator = useCallback((id: string) => {
    const el = itemRefs.current[id];
    const list = listRef.current;
    if (!el || !list) return;

    const listTop = list.getBoundingClientRect().top;
    const elRect = el.getBoundingClientRect();

    setIndicator({
      top: elRect.top - listTop,
      height: elRect.height,
    });
  }, []);

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

  useEffect(() => {
    if (activeId) updateIndicator(activeId);
  }, [activeId, headings, updateIndicator]);

  useEffect(() => {
    const onResize = () => {
      if (activeId) updateIndicator(activeId);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId, updateIndicator]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Sommaire" className="sticky top-28 self-start">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
        Dans cet article
      </p>
      <ul ref={listRef} className="relative space-y-2.5">
        <span
          className="pointer-events-none absolute left-0 w-[3px] rounded-full bg-amm-orange transition-[transform,height] duration-300 ease-out"
          style={{
            transform: `translateY(${indicator.top}px)`,
            height: indicator.height,
            opacity: activeId ? 1 : 0,
          }}
          aria-hidden="true"
        />
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? "pl-3" : ""}>
            <a
              ref={(el) => {
                itemRefs.current[id] = el;
              }}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveId(id);
                scrollToHeading(id);
              }}
              className={`block py-0.5 pl-3 text-sm leading-snug outline-none transition-colors hover:text-amm-orange focus-visible:rounded-sm focus-visible:bg-line/60 focus-visible:text-primary focus-visible:ring-0 ${
                activeId === id
                  ? "font-semibold text-amm-orange"
                  : "text-primary"
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
