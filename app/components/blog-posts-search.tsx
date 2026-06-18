"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";
import type { PostListItem } from "@/sanity/lib/types";

const MAX_SEARCH_RESULTS = 10;

function formatDate(value?: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type SortOrder = "recent" | "oldest";

function scorePost(post: PostListItem, query: string) {
  const title = post.title?.toLowerCase() ?? "";
  const description = post.description?.toLowerCase() ?? "";
  let score = 0;
  if (title.includes(query)) score += 3;
  if (title.startsWith(query)) score += 2;
  if (description.includes(query)) score += 1;
  return score;
}

export function BlogPostsSearch({
  defaultPosts,
  allPosts,
}: {
  defaultPosts: PostListItem[];
  allPosts: PostListItem[];
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("recent");

  const isSearching = submittedQuery.trim().length > 0;

  const visiblePosts = useMemo(() => {
    if (isSearching) {
      const q = submittedQuery.trim().toLowerCase();
      return allPosts
        .map((post) => ({ post, score: scorePost(post, q) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          const dateA = a.post.publishedAt
            ? new Date(a.post.publishedAt).getTime()
            : 0;
          const dateB = b.post.publishedAt
            ? new Date(b.post.publishedAt).getTime()
            : 0;
          return dateB - dateA;
        })
        .slice(0, MAX_SEARCH_RESULTS)
        .map((entry) => entry.post);
    }

    return [...defaultPosts].sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return sort === "recent" ? dateB - dateA : dateA - dateB;
    });
  }, [isSearching, submittedQuery, allPosts, defaultPosts, sort]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    if (value.trim().length === 0) {
      setSubmittedQuery("");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <form
        onSubmit={handleSubmit}
        className="mb-10 flex items-center gap-4 rounded-[16px] border border-gray-200 p-2 pl-5"
      >
        <button
          type="submit"
          aria-label="Rechercher"
          className="shrink-0 text-secondary transition-colors hover:text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <circle cx={11} cy={11} r={8} />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <input
          type="search"
          value={query}
          onChange={handleQueryChange}
          placeholder="Rechercher un article..."
          className="flex-1 bg-transparent text-secondary outline-none"
        />
        <div className="relative shrink-0">
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOrder)}
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
      </form>

      {visiblePosts.length === 0 ? (
        <p className="rounded-lg bg-gray-100 p-8 text-center text-gray-500">
          {isSearching
            ? "Aucun article ne correspond à votre recherche."
            : "Aucun article pour le moment. Revenez bientôt !"}
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
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
                  {post.tags && post.tags.length > 0 ? (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-[#E3E1DC] px-3 py-1 text-xs text-primary"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
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
  );
}
