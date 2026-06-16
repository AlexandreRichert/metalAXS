import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/app/components/portable-text";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { Post, PostVideo } from "@/sanity/lib/types";

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

// Transforme un lien YouTube/Vimeo en URL d'intégration (embed).
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function VideoBlock({ video }: { video: PostVideo }) {
  const embedUrl = video.url ? toEmbedUrl(video.url) : null;

  return (
    <figure className="my-8">
      {embedUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={embedUrl}
            title={video.caption || "Vidéo"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : video.fileUrl ? (
        <video controls className="w-full rounded-lg">
          <source src={video.fileUrl} />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      ) : video.url ? (
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          Voir la vidéo
        </a>
      ) : null}
      {video.caption ? (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {video.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`, "author"],
  });

  if (!post) notFound();

  return (
    <article className="mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-sm text-gray-500 hover:text-gray-800"
      >
        ← Retour au blog
      </Link>

      <header className="mt-4 mb-8">
        {post.tags && post.tags.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-2">
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
        {post.body ? (
          <div className="prose-content">
            <PortableTextRenderer value={post.body} />
          </div>
        ) : null}
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="mt-3 text-gray-500">
          {[post.author?.name, formatDate(post.publishedAt)]
            .filter(Boolean)
            .join(" — ")}
        </p>
        <p className="mt-4 text-lg text-gray-700">{post.description}</p>
      </header>

      {post.mainImage?.asset ? (
        <Image
          src={urlForImage(post.mainImage).width(1200).height(675).fit("crop").url()}
          alt={post.mainImage.alt || post.title}
          width={1200}
          height={675}
          priority
          className="mb-8 h-auto w-full"
        />
      ) : null}

      {post.video ? <VideoBlock video={post.video} /> : null}


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

      {post.author?.bio ? (
        <footer className="mt-12 flex items-start gap-4 border-t border-gray-200 pt-6">
          {post.author.avatar?.asset ? (
            <Image
              src={urlForImage(post.author.avatar).width(96).height(96).fit("crop").url()}
              alt={post.author.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : null}
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-gray-600">{post.author.bio}</p>
          </div>
        </footer>
      ) : null}
      fguodgudnigjdrpi
    </article>
  );
}
