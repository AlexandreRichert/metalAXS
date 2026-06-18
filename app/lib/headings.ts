import type { PortableTextBlock } from "@portabletext/react";

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(body: PortableTextBlock[]): Heading[] {
  const counts: Record<string, number> = {};

  return body
    .filter(
      (block) =>
        block._type === "block" &&
        (block.style === "h2" || block.style === "h3"),
    )
    .map((block) => {
      const text = (
        block.children as Array<{ text?: string }> | undefined
      )
        ?.map((c) => c.text ?? "")
        .join("") ?? "";

      const base = slugify(text);
      counts[base] = (counts[base] ?? 0) + 1;
      const id = counts[base] > 1 ? `${base}-${counts[base]}` : base;

      return { id, text, level: (block.style === "h2" ? 2 : 3) as 2 | 3 };
    })
    .filter((h) => h.text);
}
