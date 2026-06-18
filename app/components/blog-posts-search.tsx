"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import TitleWithHighlight from "@/app/components/title-with-highlight";
import { urlForImage } from "@/sanity/lib/image";
import { getPostTags } from "@/sanity/lib/post-tags";
import type { FilterGroup, PostListItem } from "@/sanity/lib/types";

const MAX_SEARCH_RESULTS = 10;

function formatDate(value?: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getPostTagIds(post: PostListItem) {
  return new Set(getPostTags(post).map((tag) => tag._id));
}

function scorePost(post: PostListItem, query: string) {
  const title = post.title?.toLowerCase() ?? "";
  const description = post.description?.toLowerCase() ?? "";
  let score = 0;
  if (title.includes(query)) score += 3;
  if (title.startsWith(query)) score += 2;
  if (description.includes(query)) score += 1;
  return score;
}

function matchesTagFilters(post: PostListItem, selectedTagIds: Set<string>) {
  if (selectedTagIds.size === 0) return true;
  const postTagIds = getPostTagIds(post);
  return [...selectedTagIds].some((id) => postTagIds.has(id));
}

function sortByDateRecent(posts: PostListItem[]) {
  return [...posts].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });
}

export function BlogPostsSearch({
  defaultPosts,
  allPosts,
  filterGroups,
}: {
  defaultPosts: PostListItem[];
  allPosts: PostListItem[];
  filterGroups: FilterGroup[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [draftTagIds, setDraftTagIds] = useState<Set<string>>(new Set());
  const [appliedTagIds, setAppliedTagIds] = useState<Set<string>>(new Set());

  const hasActiveFilters = appliedTagIds.size > 0;
  const isSearching = submittedQuery.trim().length > 0;
  const isFiltered = isSearching || hasActiveFilters;

  useEffect(() => {
    if (!isFilterOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isFilterOpen]);

  const visiblePosts = useMemo(() => {
    if (!isFiltered) {
      return sortByDateRecent(defaultPosts);
    }

    let posts = allPosts.filter((post) =>
      matchesTagFilters(post, appliedTagIds)
    );

    if (isSearching) {
      const q = submittedQuery.trim().toLowerCase();
      posts = posts
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
      return posts;
    }

    return sortByDateRecent(posts);
  }, [
    isFiltered,
    isSearching,
    submittedQuery,
    allPosts,
    defaultPosts,
    appliedTagIds,
  ]);

  function applySearch() {
    setSubmittedQuery(query);
    setAppliedTagIds(new Set(draftTagIds));
    setIsFilterOpen(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applySearch();
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    if (value.trim().length === 0) {
      setSubmittedQuery("");
    }
  }

  function openFilters() {
    setDraftTagIds(new Set(appliedTagIds));
    setIsFilterOpen(true);
  }

  function toggleDraftTag(tagId: string) {
    setDraftTagIds((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) next.delete(tagId);
      else next.add(tagId);
      return next;
    });
  }

  function clearFilters() {
    setDraftTagIds(new Set());
    setAppliedTagIds(new Set());
    setIsFilterOpen(false);
  }

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div ref={containerRef} className="relative z-20 mb-10">
        <form
          onSubmit={handleSubmit}
          className={`relative z-20 flex items-center gap-4 border border-gray-200 bg-white p-2 pl-5 ${
            isFilterOpen
              ? "rounded-t-[16px] rounded-b-none border-b-0"
              : "rounded-[16px]"
          }`}
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
          <button
            type="button"
            onClick={() => (isFilterOpen ? setIsFilterOpen(false) : openFilters())}
            aria-expanded={isFilterOpen}
            aria-controls="blog-filter-panel"
            className="inline-flex shrink-0 items-center gap-2 rounded-[12px] bg-[#E3E1DC] px-4 py-2.5 text-sm text-primary transition-colors hover:bg-[#d9d6cf]"
          >
            Filtres
            {appliedTagIds.size > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-background">
                {appliedTagIds.size}
              </span>
            ) : null}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              aria-label="Réinitialiser les filtres"
              className="inline-flex shrink-0 items-center justify-center p-1 text-secondary transition-colors hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          ) : null}
        </form>

        {isFilterOpen ? (
          <div
            id="blog-filter-panel"
            className="absolute left-0 right-0 top-full z-50 -mt-px rounded-b-[16px] border border-t-0 border-gray-200 bg-[#F5F4F2] p-6 shadow-lg"
          >
            {filterGroups.map((group) => (
              <section key={group._id} className="mb-6 last:mb-0">
                <h3 className="mb-3 text-sm font-bold text-primary">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => {
                    const isSelected = draftTagIds.has(tag._id);
                    return (
                      <li key={tag._id}>
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => toggleDraftTag(tag._id)}
                          className={`rounded-[12px] px-4 py-3 text-sm font-medium transition-colors shadow-[inset_0_0_0_1px_var(--color-primary)] ${
                            isSelected
                              ? "bg-primary text-background"
                              : "bg-white text-primary hover:bg-gray-50"
                          }`}
                        >
                          {tag.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={applySearch}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary/90"
              >
                Rechercher
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {visiblePosts.length === 0 ? (
        <p className="rounded-lg bg-gray-100 p-8 text-center text-gray-500">
          {isFiltered
            ? "Aucun article ne correspond à votre recherche."
            : "Aucun article pour le moment. Revenez bientôt !"}
        </p>
      ) : (
        <ul className="relative z-0 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => {
            const postTags = getPostTags(post);

            return (
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
                    {postTags.length > 0 ? (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {postTags.map((tag) => (
                          <li
                            key={tag._id}
                            className="rounded-full bg-[#E3E1DC] px-3 py-1 text-xs text-primary"
                          >
                            {tag.title}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <TitleWithHighlight
                      title={post.title}
                      highlight={post.titleHighlight}
                      as="h2"
                      className="mt-2 text-h3 font-black uppercase text-primary"
                    />
                    <p className="mt-2 text-lg text-secondary">
                      {post.description}
                    </p>
                    <span className="mt-auto rounded-full bg-gray-100 px-6 py-3 text-center text-sm font-medium text-primary transition-colors hover:bg-gray-200">
                      Lire l&apos;article
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
