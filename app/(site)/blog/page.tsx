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
    <div className="mx-auto max-w-[1200px]">
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

      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10 flex items-center gap-4 rounded-[16px] border border-gray-200 p-2 pl-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none h-5 w-5 shrink-0 text-secondary"
          >
            <circle cx={11} cy={11} r={8} />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Rechercher un article..."
            className="flex-1 bg-transparent text-secondary outline-none"
          />
          <div className="relative shrink-0">
            <select
              defaultValue="recent"
              aria-label="Filtrer par"
              className="appearance-none rounded-[12px] bg-[#E3E1DC] py-2.5 pl-4 pr-10 text-sm text-primary outline-none"
            >
              <option value="recent">Filtrer par : le plus récent</option>
              <option value="oldest">Filtrer par : le plus ancien</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="rounded-lg bg-gray-100 p-8 text-center text-gray-500">
            Aucun article pour le moment. Revenez bientôt !
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post._id}
                className="flex h-[600px] flex-col rounded-3xl border border-gray-200 p-4 transition-shadow hover:shadow-md"
              >
                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
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
                      className="h-44 w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="h-44 w-full rounded-2xl bg-gray-100" />
                  )}
                  <div className="flex flex-1 flex-col px-1 pt-4">
                    <p className="text-xs text-secondary">
                      {formatDate(post.publishedAt)}
                    </p>
                    <h2 className="mt-2 text-h3 font-black uppercase italic text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-lg text-secondary">
                      {post.description}
                    </p>
                    <span className="mt-auto rounded-full bg-gray-100 px-6 py-3 text-center text-sm font-medium text-primary transition-colors hover:bg-gray-200">
                      Lire l&apos;article
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
