import JSZip from "jszip";
import fs from "fs/promises";
import path from "path";

// Zippe les pictogrammes de public/pictos.
// - sans paramètre  -> tous les pictos
// - ?files=a.svg,b.svg (noms encodés) -> seulement la sélection
// La sélection est filtrée contre la liste réelle du dossier : aucun fichier
// hors de public/pictos ne peut être servi (pas de traversée de chemin).
export async function GET(request: Request) {
  const pictosDir = path.join(process.cwd(), "public", "pictos");

  try {
    const allFiles = (await fs.readdir(pictosDir)).filter((f) =>
      f.endsWith(".svg"),
    );

    const requested = new URL(request.url).searchParams.get("files");
    let selected = allFiles;
    if (requested) {
      const wanted = new Set(
        requested.split(",").map((s) => decodeURIComponent(s.trim())),
      );
      selected = allFiles.filter((f) => wanted.has(f));
    }

    if (selected.length === 0) {
      return new Response("Aucun pictogramme à télécharger", { status: 400 });
    }

    const zip = new JSZip();
    for (const file of selected) {
      const content = await fs.readFile(path.join(pictosDir, file));
      zip.file(file, content);
    }

    const buffer = await zip.generateAsync({ type: "arraybuffer" });

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="pictogrammes-metal-axs.zip"',
      },
    });
  } catch {
    return new Response("Erreur lors du téléchargement", { status: 500 });
  }
}
