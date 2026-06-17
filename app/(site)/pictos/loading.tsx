export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl px-8 py-12 animate-pulse">
            {/* Titre */}
            <div className="h-10 w-96 rounded bg-gray-200 mb-4" />

            {/* Description */}
            <div className="h-5 w-[500px] rounded bg-gray-200 mb-8" />

            {/* Bouton téléchargement */}
            <div className="h-12 w-64 rounded-lg bg-gray-200 mb-10" />

            {/* Grille des pictos */}
            <div className="grid grid-cols-5 gap-6">
                {Array.from({ length: 20 }).map((_, index) => (
                    <div
                        key={index}
                        className="
              rounded-xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
            "
                    >
                        <div className="flex flex-col items-center gap-4">
                            {/* Picto */}
                            <div className="h-20 w-20 rounded-lg bg-gray-200" />

                            {/* Nom */}
                            <div className="h-5 w-24 rounded bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}