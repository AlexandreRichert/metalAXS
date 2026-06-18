// Squelette de chargement de la page pictos (teintes de la D.A.).
export default function Loading() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-8 lg:py-24">
      <div className="mb-12 flex max-w-3xl flex-col gap-6 lg:mb-16">
        <div className="h-12 w-2/3 animate-pulse rounded-lg bg-ink/10" />
        <div className="h-20 w-full animate-pulse rounded-lg bg-ink/5" />
      </div>

      <div className="mb-8 flex flex-col gap-5">
        <div className="h-14 w-full animate-pulse rounded-xl bg-ink/5" />
        <div className="flex gap-2">
          <div className="h-9 w-20 animate-pulse rounded-full bg-ink/5" />
          <div className="h-9 w-28 animate-pulse rounded-full bg-ink/5" />
          <div className="h-9 w-24 animate-pulse rounded-full bg-ink/5" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-xl border border-line bg-white"
          />
        ))}
      </div>
    </div>
  );
}
