import Image from "next/image";
import Link from "next/link";

import Button from "@/app/components/button";
import TitleWithHighlight from "@/app/components/title-with-highlight";
import { urlForImage } from "@/sanity/lib/image";
import { getPostTags } from "@/sanity/lib/post-tags";
import type { PostListItem, PostTag } from "@/sanity/lib/types";

const MAX_VISIBLE_TAGS = 3;

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

function formatDate(value?: string) {
  if (!value) return null;
  return new Date(value)
    .toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}

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
      className={`group relative block shrink-0 overflow-hidden rounded-[24px] bg-line ${imageShape}`}
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
    <div className={`shrink-0 rounded-[24px] bg-line ${imageShape}`} />
  );

  return (
    <div
      className={`flex h-full gap-4 rounded-[32px] bg-white p-3 ${
        isHorizontal ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      {image}

      <div
        className={`flex min-h-0 flex-col gap-2.5 p-2 lg:p-3 ${
          isHorizontal ? "flex-1 lg:justify-center" : ""
        }`}
      >
        <p className="font-sans text-sm font-medium uppercase text-ink/70">
          {formatDate(post.publishedAt)}
        </p>
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
            Lire l&apos;article
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BlogBento({ posts }: { posts: PostListItem[] }) {
  const items = posts.slice(0, LAYOUT.length);

  return (
    <div className="relative z-0 grid grid-cols-1 gap-6 lg:grid-cols-4 lg:[grid-auto-flow:dense]">
      {items.map((post, index) => {
        const config = LAYOUT[index] ?? LAYOUT[LAYOUT.length - 1];

        return (
          <div key={post._id} className={config.cell}>
            <BentoCard post={post} config={config} />
          </div>
        );
      })}
    </div>
  );
}
