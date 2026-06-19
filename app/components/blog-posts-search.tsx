"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Button from "@/app/components/button";
import { BlogBento } from "@/app/components/blog-bento";
import { getPostTags } from "@/sanity/lib/post-tags";
import type { FilterGroup, PostListItem } from "@/sanity/lib/types";

const MAX_SEARCH_RESULTS = 10;

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
  latestPostId,
  allPosts,
  filterGroups,
}: {
  latestPostId?: string;
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
      // Tous les articles sauf l'article vedette (mis en avant en en-tête).
      // Le bento se charge ensuite de les paginer par blocs de 6.
      return sortByDateRecent(allPosts).filter(
        (post) => post._id !== latestPostId
      );
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
    latestPostId,
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
    <div className="mx-auto w-full max-w-[1200px] overflow-visible">
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
            placeholder="Rechercher une bonne pratique"
            className="flex-1 bg-transparent text-secondary outline-none"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="shrink-0"
            onClick={() => (isFilterOpen ? setIsFilterOpen(false) : openFilters())}
            aria-expanded={isFilterOpen}
            aria-controls="blog-filter-panel"
            icon={
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
            }
          >
            <span className="inline-flex items-center gap-2">
              Filtres
              {appliedTagIds.size > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-background">
                  {appliedTagIds.size}
                </span>
              ) : null}
            </span>
          </Button>
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
        <BlogBento
          key={
            isFiltered
              ? `filtered-${submittedQuery}-${[...appliedTagIds].sort().join(",")}`
              : "default"
          }
          posts={visiblePosts}
        />
      )}
    </div>
  );
}
