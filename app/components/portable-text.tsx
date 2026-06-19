import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";

import { slugify } from "@/app/lib/headings";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage, TextWithImage } from "@/sanity/lib/types";

function blockToId(
  value: PortableTextBlock,
  counts: Record<string, number>,
): string {
  const text =
    (value.children as Array<{ text?: string }> | undefined)
      ?.map((c) => c.text ?? "")
      .join("") ?? "";
  const base = slugify(text);
  counts[base] = (counts[base] ?? 0) + 1;
  return counts[base] > 1 ? `${base}-${counts[base]}` : base;
}

function makeComponents(counts: Record<string, number>): PortableTextComponents {
  return {
    types: {
      image: ({ value }: { value: SanityImage }) => {
        if (!value?.asset) return null;
        return (
          <figure className="my-6">
            <Image
              src={urlForImage(value).width(1200).fit("max").url()}
              alt={value.alt || ""}
              width={1200}
              height={800}
              className="h-auto w-full rounded-lg"
            />
            {value.alt ? (
              <figcaption className="mt-2 text-center text-sm text-primary">
                {value.alt}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      textWithImage: ({ value }: { value: TextWithImage }) => {
        if (!value?.image?.asset) return null;
        const imageOnLeft = value.imagePosition === "left";
        const innerCounts: Record<string, number> = {};
        const inner = makeComponents(innerCounts);
        return (
          <div
            className={`my-8 flex flex-col gap-6 md:items-center ${
              imageOnLeft ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <div className="md:w-1/2">
              {value.text ? (
                <PortableText value={value.text} components={inner} />
              ) : null}
            </div>
            <div className="md:w-1/2">
              <Image
                src={urlForImage(value.image).width(800).fit("max").url()}
                alt={value.image.alt || ""}
                width={800}
                height={600}
                className="h-auto w-full rounded-lg"
              />
              {value.image.alt ? (
                <figcaption className="mt-2 text-center text-sm text-primary">
                  {value.image.alt}
                </figcaption>
              ) : null}
            </div>
          </div>
        );
      },
    },
    marks: {
      highlight: ({ children }) => (
        <mark className="highlight-mark text-inherit">
          {children}
        </mark>
      ),
      link: ({ value, children }) => {
        const href = value?.href ?? "#";
        const external = href.startsWith("http");
        return (
          <a
            href={href}
            className="text-blue-700 underline underline-offset-2 hover:text-blue-900"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        );
      },
    },
    block: {
      h2: ({ value: blockValue, children }) => {
        const id = blockToId(blockValue, counts);
        return (
          <h2 id={id} className="mt-8 mb-3 scroll-mt-28 text-2xl font-bold">
            {children}
          </h2>
        );
      },
      h3: ({ value: blockValue, children }) => {
        const id = blockToId(blockValue, counts);
        return (
          <h3 id={id} className="mt-6 mb-2 scroll-mt-28 text-xl font-bold">
            {children}
          </h3>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="my-4 border-l-4 border-line pl-4 text-primary italic">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="my-4 leading-relaxed">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-4 list-disc space-y-1 pl-6">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 list-decimal space-y-1 pl-6">{children}</ol>
      ),
    },
  };
}

export default function PortableTextRenderer({
  value,
}: {
  value: PortableTextBlock[];
}) {
  const counts: Record<string, number> = {};
  const components = makeComponents(counts);
  return <PortableText value={value} components={components} />;
}
