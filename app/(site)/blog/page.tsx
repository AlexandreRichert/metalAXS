import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import type { PostListItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Blog — Metalaxs",
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
  const posts = await sanityFetch<PostListItem[]>({
    query: POSTS_QUERY,
    tags: ["post", "author"],
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">Le blog</h1>
        <p className="mt-2 text-lg text-gray-600">
          Conseils, retours d&apos;expérience et actualités sur
          l&apos;accessibilité des festivals.
        </p>
      </header>

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
