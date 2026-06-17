import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { LATEST_POST_QUERY, POSTS_LIST_QUERY } from "@/sanity/lib/queries";
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

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mx-auto mb-10 flex h-[450px] w-full max-w-[1200px] gap-20 p-6">
        <div className="flex flex-col gap-8 w-1/3 pt-4">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-secondary">
              {[latestPost?.author?.name, formatDate(latestPost?.publishedAt)]
                .filter(Boolean)
                .join(" — ")}
            </p>
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

      {posts.length === 0 ? (
        <p className="rounded-lg bg-gray-100 p-8 text-center text-gray-500">
          Aucun article pour le moment. Revenez bientôt !
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <li
              key={post._id}
              className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {post.mainImage?.asset ? (
                  <Image
                    src={urlForImage(post.mainImage)
                      .width(800)
                      .height(450)
                      .fit("crop")
                      .url()}
                    alt={post.mainImage.alt || post.title}
                    width={800}
                    height={450}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-100" />
                )}
                <div className="p-5">
                  {post.tags && post.tags.length > 0 ? (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="mt-2 line-clamp-3 text-gray-600">
                    {post.description}
                  </p>
                  <p className="mt-3 text-sm text-gray-500">
                    {[post.author?.name, formatDate(post.publishedAt)]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
