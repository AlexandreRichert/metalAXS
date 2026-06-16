import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

const components: PortableTextComponents = {
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
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
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
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-xl font-bold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-gray-300 pl-4 text-gray-600 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
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

export default function PortableTextRenderer({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return <PortableText value={value} components={components} />;
}
