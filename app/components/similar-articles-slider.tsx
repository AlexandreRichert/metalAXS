"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/app/components/button";
import TitleWithHighlight from "@/app/components/title-with-highlight";
import { getPostTags } from "@/sanity/lib/post-tags";
import { urlForImage } from "@/sanity/lib/image";
import type { PostListItem } from "@/sanity/lib/types";

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

function getCardsPerView(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function SimilarArticleCard({ post }: { post: PostListItem }) {
  const tags = getPostTags(post);
  const href = `/blog/${post.slug}`;

  const image = post.mainImage?.asset ? (
    <Link
      href={href}
      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg bg-line"
    >
      <Image
        src={urlForImage(post.mainImage)
          .width(600)
          .height(380)
          .fit("crop")
          .url()}
        alt={post.mainImage.alt || post.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </Link>
  ) : (
    <div className="aspect-[16/10] w-full rounded-lg bg-line" />
  );

  return (
    <article className="flex h-full flex-col gap-4 rounded-lg bg-white p-3 shadow-[0px_4px_15.5px_0px_rgba(0,0,0,0.1)]">
      {image}

      <div className="flex flex-col gap-2.5 p-2 lg:p-3">
        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag._id}
                className="rounded-[4px] bg-tag-bg px-2 py-0.5 text-xs uppercase text-primary"
              >
                {tag.title}
              </li>
            ))}
          </ul>
        ) : null}

        <Link href={href} className="transition-opacity hover:opacity-80">
          <TitleWithHighlight
            title={post.title}
            highlight={post.titleHighlight}
            as="h3"
            className="font-display text-xl font-black uppercase leading-[0.95] text-primary lg:text-2xl"
          />
        </Link>

        <p className="line-clamp-3 font-sans text-base font-medium text-primary">
          {post.description}
        </p>

        <div className="pt-1">
          <Button href={href} variant="primary" size="sm" icon={readArrow}>
            Lire l&apos;article
          </Button>
        </div>
      </div>
    </article>
  );
}

export function SimilarArticlesSlider({ posts }: { posts: PostListItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const pageCount = Math.max(1, Math.ceil(posts.length / cardsPerView));

  const updateCardsPerView = useCallback(() => {
    setCardsPerView(getCardsPerView(window.innerWidth));
  }, []);

  const updateActivePage = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const perView = getCardsPerView(window.innerWidth);
    const cardWidth =
      (el.clientWidth - (perView - 1) * 24) / perView;
    const page = Math.round(el.scrollLeft / (cardWidth + 24));
    setActivePage(Math.min(page, Math.ceil(posts.length / perView) - 1));
  }, [posts.length]);

  useEffect(() => {
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, [updateCardsPerView]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActivePage, { passive: true });
    return () => el.removeEventListener("scroll", updateActivePage);
  }, [updateActivePage]);

  const scrollToPage = (page: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const perView = getCardsPerView(window.innerWidth);
    const cardWidth = (el.clientWidth - (perView - 1) * 24) / perView;
    el.scrollTo({ left: page * (cardWidth + 24), behavior: "smooth" });
    setActivePage(page);
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <div
            key={post._id}
            className="w-[calc((100%-3rem)/3)] shrink-0 snap-start max-lg:w-[calc((100%-1.5rem)/2)] max-sm:w-full"
          >
            <SimilarArticleCard post={post} />
          </div>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToPage(i)}
              aria-label={`Page ${i + 1}`}
              aria-current={i === activePage}
              className={`rounded-full transition-all ${
                i === activePage
                  ? "size-3 bg-ink"
                  : "size-2.5 bg-ink/25"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
