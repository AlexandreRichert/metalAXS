import JSZip from "jszip";
import fs from "fs/promises";
import path from "path";

export async function GET() {
    const zip = new JSZip();
    const pictosDir = path.join(process.cwd(), "public", "pictos");

    try {
        const files = await fs.readdir(pictosDir);
        const svgFiles = files.filter(file => file.endsWith(".svg"));

        for (const file of svgFiles) {
            const filePath = path.join(pictosDir, file);
            const fileContent = await fs.readFile(filePath);
            zip.file(file, fileContent);
        }

        const content = await zip.generateAsync({
            type: "uint8array",
        });

        return new Response(new Blob([content], { type: "application/zip" }), {
            headers: {
                "Content-Disposition": 'attachment; filename="pictos.zip"',
            },
        });
    } catch (error) {
        return new Response("Erreur lors du téléchargement", { status: 500 });
    }
}