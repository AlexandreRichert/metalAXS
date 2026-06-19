import { SimilarArticlesSlider } from "@/app/components/similar-articles-slider";
import type { PostListItem } from "@/sanity/lib/types";

export function SimilarArticles({ posts }: { posts: PostListItem[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16 sm:py-20 lg:py-24">
      <h2 className="mb-10 text-center font-display text-3xl font-black uppercase tracking-wide text-primary sm:text-4xl">
        Articles similaires
      </h2>
      <SimilarArticlesSlider posts={posts} />
    </section>
  );
}
