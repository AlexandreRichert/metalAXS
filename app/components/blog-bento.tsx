"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import Button from "@/app/components/button";
import TitleWithHighlight from "@/app/components/title-with-highlight";
import { ArrowRight } from "@/app/components/icons";
import { urlForImage } from "@/sanity/lib/image";
import { getPostTags } from "@/sanity/lib/post-tags";
import type { PostListItem, PostTag } from "@/sanity/lib/types";

const MAX_VISIBLE_TAGS = 3;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type CardConfig = {
  /** Placement dans la grille bento (desktop). */
  cell: string;
  orientation: "vertical" | "horizontal";
  /** Carte vedette : l'image grandit pour remplir la hauteur. */
  feature?: boolean;
  /** Carte compacte (format ~carré) : contenu resserré. */
  compact?: boolean;
  /** Largeur de l'image pour les cartes horizontales. */
  imageWidth?: string;
  titleSize: string;
};

// Agencement inspiré de la maquette :
//   [ A (verticale, haute) ][ B horizontale large, moins haute ]
//   [ A (suite)            ][ C carré ][ D carré ]
//   [ E horizontale large            ][ F carré ]
const LAYOUT: CardConfig[] = [
  {
    cell: "lg:col-span-2 lg:row-span-2",
    orientation: "vertical",
    feature: true,
    titleSize: "text-[1.9rem]",
  },
  {
    cell: "lg:col-span-2",
    orientation: "horizontal",
    imageWidth: "lg:w-[45%]",
    titleSize: "text-[1.5rem]",
  },
  {
    cell: "lg:col-span-1",
    orientation: "vertical",
    compact: true,
    titleSize: "text-[1.25rem]",
  },
  {
    cell: "lg:col-span-1",
    orientation: "vertical",
    compact: true,
    titleSize: "text-[1.25rem]",
  },
  {
    cell: "lg:col-span-3",
    orientation: "horizontal",
    imageWidth: "lg:w-[34%]",
    titleSize: "text-[1.5rem]",
  },
  {
    cell: "lg:col-span-1",
    orientation: "vertical",
    compact: true,
    titleSize: "text-[1.25rem]",
  },
];

const readArrow = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function CardTags({ tags }: { tags: PostTag[] }) {
  if (tags.length === 0) return null;

  const visible = tags.slice(0, MAX_VISIBLE_TAGS);
  const remaining = tags.length - visible.length;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {visible.map((tag) => (
        <li
          key={tag._id}
          className="rounded-full bg-line px-2.5 py-0.5 text-xs font-medium uppercase text-ink"
        >
          {tag.title}
        </li>
      ))}
      {remaining > 0 ? (
        <li className="rounded-full bg-line px-2.5 py-0.5 text-xs font-medium uppercase text-ink">
          +{remaining}
        </li>
      ) : null}
    </ul>
  );
}

function BentoCard({ post, config }: { post: PostListItem; config: CardConfig }) {
  const tags = getPostTags(post);
  const href = `/blog/${post.slug}`;
  const isHorizontal = config.orientation === "horizontal";

  // Cartes verticales : l'image grandit (flex-1) pour absorber la hauteur
  // disponible, ce qui évite le vide dans le bloc de texte.
  const imageShape = isHorizontal
    ? `aspect-[16/10] w-full lg:aspect-auto lg:h-auto lg:min-h-[200px] lg:self-stretch ${config.imageWidth ?? "lg:w-[45%]"}`
    : config.compact
      ? "aspect-[4/3] w-full lg:aspect-auto lg:min-h-[150px] lg:flex-1"
      : "aspect-[16/10] w-full lg:aspect-auto lg:min-h-[180px] lg:flex-1";

  const image = post.mainImage?.asset ? (
    <Link
      href={href}
      className={`group relative block shrink-0 overflow-hidden rounded-[6px] bg-line ${imageShape}`}
    >
      <Image
        src={urlForImage(post.mainImage)
          .width(900)
          .height(700)
          .fit("crop")
          .url()}
        alt={post.mainImage.alt || post.title}
        fill
        sizes="(max-width: 1024px) 100vw, 600px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </Link>
  ) : (
    <div className={`shrink-0 rounded-[6px] bg-line ${imageShape}`} />
  );

  return (
    <div
      className={`flex h-full gap-4 rounded-[8px] bg-white p-3 ${
        isHorizontal ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      {image}

      <div
        className={`flex min-h-0 flex-col gap-2.5 p-2 lg:p-3 ${
          isHorizontal ? "flex-1 lg:justify-center" : ""
        }`}
      >
        <Link href={href} className="transition-opacity hover:opacity-80">
          <TitleWithHighlight
            title={post.title}
            highlight={post.titleHighlight}
            as="h3"
            className={`font-display ${config.titleSize} font-black uppercase leading-[0.95] text-ink`}
          />
        </Link>
        <CardTags tags={tags} />
        <p
          className={`font-sans text-base font-medium text-ink/80 ${
            config.compact ? "line-clamp-2" : "line-clamp-3"
          }`}
        >
          {post.description}
        </p>
        <div className="pt-1">
          <Button href={href} variant="primary" size="sm" icon={readArrow}>
            Voir la pratique
          </Button>
        </div>
      </div>
    </div>
  );
}

// Layouts adaptés quand une page contient moins de 6 articles (pas de cases vides).
function getLayoutForCount(count: number): CardConfig[] {
  if (count >= LAYOUT.length) return LAYOUT;

  if (count === 1) {
    return [
      {
        cell: "lg:col-span-4",
        orientation: "horizontal",
        imageWidth: "lg:w-[40%]",
        titleSize: "text-[1.9rem]",
      },
    ];
  }

  if (count === 2) {
    return [
      {
        cell: "lg:col-span-2 lg:row-span-2",
        orientation: "vertical",
        feature: true,
        titleSize: "text-[1.9rem]",
      },
      {
        cell: "lg:col-span-2",
        orientation: "horizontal",
        imageWidth: "lg:w-[45%]",
        titleSize: "text-[1.5rem]",
      },
    ];
  }

  if (count === 3) {
    return [
      {
        cell: "lg:col-span-2 lg:row-span-2",
        orientation: "vertical",
        feature: true,
        titleSize: "text-[1.9rem]",
      },
      {
        cell: "lg:col-span-2",
        orientation: "horizontal",
        imageWidth: "lg:w-[45%]",
        titleSize: "text-[1.25rem]",
      },
      {
        cell: "lg:col-span-2",
        orientation: "horizontal",
        imageWidth: "lg:w-[45%]",
        titleSize: "text-[1.25rem]",
      },
    ];
  }

  if (count === 4) {
    return [
      LAYOUT[0],
      LAYOUT[1],
      LAYOUT[2],
      LAYOUT[3],
    ];
  }

  return LAYOUT.slice(0, count);
}

// Une page de la grille bento : exactement autant de cartes que d'articles.
function BentoGrid({ posts }: { posts: PostListItem[] }) {
  const layout = getLayoutForCount(posts.length);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:[grid-auto-flow:dense]">
      {posts.map((post, index) => (
        <div key={post._id} className={layout[index].cell}>
          <BentoCard post={post} config={layout[index]} />
        </div>
      ))}
    </div>
  );
}

function dedupePosts(posts: PostListItem[]) {
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (seen.has(post._id)) return false;
    seen.add(post._id);
    return true;
  });
}

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

// Variantes du slide : la page sortante part vers la gauche pendant que la
// suivante entre par la droite (et inversement en arrière).
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function BlogBento({ posts }: { posts: PostListItem[] }) {
  const uniquePosts = useMemo(() => dedupePosts(posts), [posts]);
  const pages = useMemo(
    () => chunk(uniquePosts, LAYOUT.length),
    [uniquePosts]
  );
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const reduceMotion = useReducedMotion();

  const pageCount = pages.length;
  const currentPage = Math.min(page, Math.max(pageCount - 1, 0));
  const canPrev = currentPage > 0;
  const canNext = currentPage < pageCount - 1;

  function paginate(dir: 1 | -1) {
    const next = currentPage + dir;
    if (next < 0 || next >= pageCount) return;
    setPage([next, dir]);
  }

  if (pageCount === 0) return null;

  const navButtonClass =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-line disabled:pointer-events-none disabled:opacity-30";

  const navPrevClass = `${navButtonClass} absolute top-1/2 z-10 -translate-y-1/2 left-0 -translate-x-[calc(100%+1rem)] max-lg:left-3 max-lg:translate-x-0`;
  const navNextClass = `${navButtonClass} absolute top-1/2 z-10 -translate-y-1/2 right-0 translate-x-[calc(100%+1rem)] max-lg:right-3 max-lg:translate-x-0`;

  return (
    <div className="relative z-0 w-full overflow-visible">
      {pageCount > 1 ? (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={!canPrev}
            aria-label="Articles précédents"
            className={navPrevClass}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={!canNext}
            aria-label="Articles suivants"
            className={navNextClass}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </>
      ) : null}

      <div className="w-full overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    x: { duration: 0.55, ease: EASE },
                    opacity: { duration: 0.3 },
                  }
            }
          >
            <BentoGrid posts={pages[currentPage]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {pageCount > 1 ? (
        <p
          aria-live="polite"
          className="sr-only"
        >
          Page {currentPage + 1} sur {pageCount}
        </p>
      ) : null}
    </div>
  );
}
