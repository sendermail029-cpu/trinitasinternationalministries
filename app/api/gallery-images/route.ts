import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const IMAGE_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png"]);

type GalleryItem = {
  src: string;
  title: string;
  subtitle: string;
};

function titleFromFileName(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function GET() {
  try {
    const entries = await fs.readdir(UPLOAD_DIR, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()));

    const withMeta = await Promise.all(
      files.map(async (name) => {
        const fullPath = path.join(UPLOAD_DIR, name);
        const stat = await fs.stat(fullPath);
        return { name, mtimeMs: stat.mtimeMs };
      })
    );

    withMeta.sort((a, b) => b.mtimeMs - a.mtimeMs);

    const images: GalleryItem[] = withMeta.map(({ name }) => ({
      src: `/uploads/${name}`,
      title: titleFromFileName(name),
      subtitle: "Uploaded from Admin Panel"
    }));

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
