/** Normalise espaces et bords pour comparer titre / surlignage. */
export function normalizeHighlight(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Vérifie que la portion à surligner existe bien dans le titre. */
export function titleContainsHighlight(title: string, highlight: string) {
  const phrase = normalizeHighlight(highlight);
  if (!phrase) return false;
  return normalizeHighlight(title).toLowerCase().includes(phrase.toLowerCase());
}

export type TitleHighlightParts =
  | { plain: string }
  | { before: string; match: string; after: string };

/**
 * Découpe le titre autour de la portion à surligner (première occurrence,
 * casse du titre conservée). Retourne le titre brut si rien à surligner
 * ou si la portion ne correspond pas.
 */
export function splitTitleWithHighlight(
  title: string,
  highlight?: string | null,
): TitleHighlightParts {
  const phrase = highlight ? normalizeHighlight(highlight) : "";
  if (!phrase || !titleContainsHighlight(title, phrase)) {
    return { plain: title };
  }

  const regex = new RegExp(escapeRegExp(phrase), "i");
  const match = title.match(regex);
  if (!match || match.index === undefined) {
    return { plain: title };
  }

  const start = match.index;
  const end = start + match[0].length;
  return {
    before: title.slice(0, start),
    match: title.slice(start, end),
    after: title.slice(end),
  };
}
