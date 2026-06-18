import JSZip from "jszip";

// Utilitaires de téléchargement (client) : le markup contient `currentColor`,
// on y injecte la couleur choisie puis on exporte en SVG ou en PNG.

export function applyColor(markup: string, color: string) {
  return markup.replaceAll("currentColor", color);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadSvg(coloredSvg: string, name: string) {
  downloadBlob(
    new Blob([coloredSvg], { type: "image/svg+xml;charset=utf-8" }),
    `${name}.svg`,
  );
}

// Force une taille carrée sur le <svg> racine pour le rendu canvas.
function rasterReady(svg: string, size: number) {
  return svg.replace(/<svg\b([^>]*)>/, (_m, attrs: string) => {
    const cleaned = attrs.replace(/\s(width|height)="[^"]*"/g, "");
    return `<svg${cleaned} width="${size}" height="${size}">`;
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function svgToPngBlob(coloredSvg: string, size = 512): Promise<Blob> {
  const url = URL.createObjectURL(
    new Blob([rasterReady(coloredSvg, size)], {
      type: "image/svg+xml;charset=utf-8",
    }),
  );
  try {
    const img = await loadImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas indisponible");
    ctx.drawImage(img, 0, 0, size, size);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob a échoué"))),
        "image/png",
      ),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function downloadPng(coloredSvg: string, name: string) {
  downloadBlob(await svgToPngBlob(coloredSvg), `${name}.png`);
}

// Zip d'une sélection (ou de tout), au format choisi, dans la couleur choisie.
export async function downloadZip(
  items: { name: string; markup: string }[],
  color: string,
  format: "svg" | "png",
) {
  const zip = new JSZip();
  for (const item of items) {
    const colored = applyColor(item.markup, color);
    if (format === "svg") zip.file(`${item.name}.svg`, colored);
    else zip.file(`${item.name}.png`, await svgToPngBlob(colored));
  }
  const blob = await zip.generateAsync({ type: "blob" });
  downloadBlob(blob, "pictogrammes-metal-axs.zip");
}
