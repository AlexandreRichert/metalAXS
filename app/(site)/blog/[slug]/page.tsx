import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRight } from "@/app/components/icons";
import PortableTextRenderer from "@/app/components/portable-text";
import TitleWithHighlight from "@/app/components/title-with-highlight";
import { SimilarArticles } from "@/app/components/similar-articles";
import { TableOfContents } from "@/app/components/table-of-contents";
import { extractHeadings } from "@/app/lib/headings";
import { client } from "@/sanity/lib/client";
import { getPostTags } from "@/sanity/lib/post-tags";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { POST_QUERY, POSTS_SLUGS_QUERY, SIMILAR_POSTS_QUERY } from "@/sanity/lib/queries";
import type { Post, PostListItem } from "@/sanity/lib/types";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(POSTS_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`],
  });
  if (!post) return { title: "Article introuvable — Metalaxs" };
  return {
    title: `${post.title} — Metalaxs`,
    description: post.description,
  };
}

function formatDate(value?: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`, "author", "category", "tag"],
  });

  if (!post) notFound();

  const postTags = getPostTags(post);
  const publishedDate = formatDate(post.publishedAt);
  const tagIds = postTags.map((tag) => tag._id);
  const similarPosts = await sanityFetch<PostListItem[]>({
    query: SIMILAR_POSTS_QUERY,
    params: {
      slug,
      tagIds,
      authorId: post.authorId ?? null,
    },
    tags: ["post", "category", "tag"],
  });

  return (
    <>
    <article className="mx-auto max-w-[1200px] px-4 pt-[72px]">
      <header className="flex flex-col">
        <Link
          href="/blog"
          aria-label="Retour au blog"
          className="inline-flex size-10 items-center justify-center rounded-xl bg-line text-ink transition-colors hover:bg-line"
        >
          <ArrowRight className="size-4 rotate-180" />
        </Link>

        <div className="mt-[65px] flex flex-col gap-4">
          {postTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {postTags.map((tag) => (
                <span
                  key={tag._id}
                  className="inline-block rounded-[4px] bg-tag-bg px-2 py-0.5 text-sm uppercase text-ink"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          ) : null}

          <TitleWithHighlight
            title={post.title}
            highlight={post.titleHighlight}
            as="h1"
            className="font-display text-blog-title font-black uppercase leading-[0.9] text-ink"
          />

          {publishedDate ? (
            <p className="text-sm font-medium leading-[1.25] text-muted">
              {publishedDate}
            </p>
          ) : null}
        </div>

        {post.mainImage?.asset ? (
          <Image
            src={urlForImage(post.mainImage)
              .width(1200)
              .height(450)
              .fit("crop")
              .url()}
            alt={post.mainImage.alt || post.title}
            width={1200}
            height={450}
            priority
            className="mt-[40px] h-[450px] w-full rounded-[32px] object-cover opacity-80"
          />
        ) : null}
      </header>

      {post.body ? (() => {
        const headings = extractHeadings(post.body!);
        return (
          <div className="mt-10 flex gap-24">
            {headings.length > 0 ? (
              <aside className="hidden xl:block w-52 shrink-0">
                <TableOfContents headings={headings} />
              </aside>
            ) : null}
            <div className="prose-content min-w-0 flex-1 text-primary">
              <PortableTextRenderer value={post.body!} />
            </div>
          </div>
        );
      })() : null}

      {post.gallery && post.gallery.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Galerie</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {post.gallery.map((image, index) =>
              image?.asset ? (
                <Image
                  key={image.asset._ref ?? index}
                  src={urlForImage(image).width(600).height(600).fit("crop").url()}
                  alt={image.alt || `${post.title} — image ${index + 1}`}
                  width={600}
                  height={600}
                  className="h-40 w-full rounded-lg object-cover"
                />
              ) : null
            )}
          </div>
        </section>
      ) : null}
    </article>

    <SimilarArticles posts={similarPosts} />
  </>
  );
}
