// app/pictos/page.tsx
import { pictos } from "@/lib/pictos";
import PictoGrid from "./components/pictoGrid";
import DownloadAllButton from "./components/downloadAllButton";

export default function PictosPage() {
    return (
        <main className="container mx-auto py-12">
            <h1 className="text-4xl font-bold mb-4">
                Télécharger nos pictogrammes
            </h1>

            <p className="mb-8 text-gray-600">
                Retrouvez tous nos pictogrammes disponibles en téléchargement.
            </p>

            <DownloadAllButton />

            <PictoGrid pictos={pictos} />
        </main>
    );
}