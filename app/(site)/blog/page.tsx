import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BlogPostsSearch } from "@/app/components/blog-posts-search";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import {
  LATEST_POST_QUERY,
  POSTS_LIST_QUERY,
  POSTS_QUERY,
} from "@/sanity/lib/queries";
import type { PostListItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "All access metal - blog",
  description: "Articles et actualités autour de l'accessibilité des festivals.",
};

function formatDate(value?: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const latestPost = await sanityFetch<PostListItem>({
    query: LATEST_POST_QUERY,
    tags: ["post", "author"],
  });
  const posts = await sanityFetch<PostListItem[]>({
    query: POSTS_LIST_QUERY,
    tags: ["post", "author"],
  });
  const allPosts = await sanityFetch<PostListItem[]>({
    query: POSTS_QUERY,
    tags: ["post", "author"],
  });

  return (
    <div className="mx-auto max-w-[1200px]">
      <section className="mx-auto mb-10 flex h-[450px] w-full max-w-[1200px] gap-20 p-6">
        <div className="flex flex-col gap-8 w-1/3 pt-4">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-secondary">
              {[latestPost?.author?.name, formatDate(latestPost?.publishedAt)]
                .filter(Boolean)
                .join(" — ")}
            </p>
            {latestPost?.tags && latestPost.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {latestPost.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[#E3E1DC] px-3 py-1 text-xs text-primary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            <h1 className="text-h3 text-primary font-black italic">{latestPost?.title}</h1>
            <p className="text-lg text-secondary">{latestPost?.description}</p>
          </div>
          <Link href={`/blog/${latestPost?.slug}`} className="text-blue-500 hover:text-blue-700">Lire l&apos;article</Link>
        </div>
        <div className="h-full w-2/3">
          {latestPost?.mainImage?.asset ? (
            <Image
              src={urlForImage(latestPost.mainImage)
                .width(720)
                .height(360)
                .fit("max")
                .url()}
              alt={latestPost.mainImage.alt || latestPost.title}
              width={800}
              height={450}
              className="h-full w-full object-cover rounded-4xl"
            />
          ) : null}
        </div>
      </section>

      <BlogPostsSearch defaultPosts={posts} allPosts={allPosts} />
    </div>
  );
}
