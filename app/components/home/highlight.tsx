// Surligneur lime (Figma « Rectangle 9 » #abf000) posé derrière un mot-clé de titre.
export default function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <mark className="inline-block -rotate-1 bg-lime px-2 text-ink">
      {children}
    </mark>
  );
}
