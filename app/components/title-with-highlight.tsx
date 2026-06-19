import { splitTitleWithHighlight } from "@/sanity/lib/title-highlight";

type TitleWithHighlightProps = {
  title: string;
  highlight?: string | null;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
};

export default function TitleWithHighlight({
  title,
  highlight,
  className,
  as: Tag = "span",
}: TitleWithHighlightProps) {
  const parts = splitTitleWithHighlight(title, highlight);

  if ("plain" in parts) {
    return <Tag className={className}>{parts.plain}</Tag>;
  }

  return (
    <Tag className={className}>
      {parts.before}
      <mark className="highlight-mark text-inherit">
        {parts.match}
      </mark>
      {parts.after}
    </Tag>
  );
}
