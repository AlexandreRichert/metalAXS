import { forwardRef, type SVGProps } from "react";

/** Picto barre d'outils Studio : lettre A surlignée en vert (#ABF000). */
export const HighlightLetterAIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function HighlightLetterAIcon(props, ref) {
  return (
    <svg
      data-sanity-icon="highlight-letter-a"
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <rect
        x="4"
        y="14.5"
        width="17"
        height="6.5"
        rx="1.5"
        fill="#ABF000"
        transform="rotate(-4 12.5 17.75)"
      />
      <path
        d="M12.75 7.5 9 17.75h1.55l.9-2.9h2.6l.9 2.9H16.5L12.75 7.5Zm-1.1 5.85 1.1-3 1.1 3h-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
});
