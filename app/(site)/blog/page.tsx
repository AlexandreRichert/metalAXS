import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/app/components/button";
import { BlogPostsSearch } from "@/app/components/blog-posts-search";
import TitleWithHighlight from "@/app/components/title-with-highlight";
import { getPostTags } from "@/sanity/lib/post-tags";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import {
  FILTER_GROUPS_QUERY,
  LATEST_POST_QUERY,
  POSTS_LIST_QUERY,
  POSTS_QUERY,
} from "@/sanity/lib/queries";
import type { FilterGroup, PostListItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "All access metal - blog",
  description: "Articles et actualités autour de l'accessibilité des festivals.",
};

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

export default async function BlogPage() {
  const latestPost = await sanityFetch<PostListItem>({
    query: LATEST_POST_QUERY,
    tags: ["post", "author", "category", "tag"],
  });
  const posts = await sanityFetch<PostListItem[]>({
    query: POSTS_LIST_QUERY,
    tags: ["post", "author", "category", "tag"],
  });
  const allPosts = await sanityFetch<PostListItem[]>({
    query: POSTS_QUERY,
    tags: ["post", "author", "category", "tag"],
  });
  const filterGroups = await sanityFetch<FilterGroup[]>({
    query: FILTER_GROUPS_QUERY,
    tags: ["category", "tag"],
  });

  const latestPostTags = latestPost ? getPostTags(latestPost) : [];

  return (
    <div className="mx-auto my-16 max-w-[1200px] lg:my-24">
      <section className="mx-auto mb-10 flex w-full max-w-[1200px] items-stretch gap-20 p-6">
        <div className="flex w-1/2 flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="font-sans text-sm font-medium uppercase text-ink">
              {[latestPost?.author?.name, formatDate(latestPost?.publishedAt)]
                .filter(Boolean)
                .join(" — ")}
            </p>
            <TitleWithHighlight
              title={latestPost?.title ?? ""}
              highlight={latestPost?.titleHighlight}
              as="h1"
              className="font-display text-h2 font-black uppercase leading-[0.95] text-ink"
            />
            {latestPostTags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {latestPostTags.map((tag) => (
                  <li
                    key={tag._id}
                    className="rounded-full bg-line px-3 py-1 text-xs font-medium uppercase text-ink"
                  >
                    {tag.title}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="font-sans text-[22px] font-medium leading-snug text-ink">
              {latestPost?.description}
            </p>
          </div>
          <Button
            href={`/blog/${latestPost?.slug}`}
            variant="primary"
            className="self-start"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Lire l&apos;article
          </Button>
        </div>
        <div className="relative w-1/2">
          {latestPost?.mainImage?.asset ? (
            <Image
              src={urlForImage(latestPost.mainImage)
                .width(720)
                .height(360)
                .fit("max")
                .url()}
              alt={latestPost.mainImage.alt || latestPost.title}
              fill
              sizes="(max-width: 1200px) 50vw, 600px"
              className="rounded-[32px] object-cover"
              priority
            />
          ) : null}
        </div>
      </section>

      <BlogPostsSearch
        defaultPosts={posts}
        allPosts={allPosts}
        filterGroups={filterGroups}
      />
    </div>
  );
}
