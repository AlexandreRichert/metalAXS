import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

// Le Studio (back-office Sanity) est rendu en plein écran sur /studio.
// La coquille est statique ; tout le travail d'édition se fait côté client.
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
