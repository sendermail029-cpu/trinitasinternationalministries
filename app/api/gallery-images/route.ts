import { promises as fs } from "fs";
import path from "path";
import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const IMAGE_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png"]);
const BLOB_RW_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

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
    if (BLOB_RW_TOKEN) {
      const blobs = await list({
        prefix: "gallery/",
        token: BLOB_RW_TOKEN
      });

      const images: GalleryItem[] = blobs.blobs
        .filter((blob) => IMAGE_EXTENSIONS.has(path.extname(blob.pathname).toLowerCase()))
        .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
        .map((blob) => ({
          src: blob.url,
          title: titleFromFileName(path.basename(blob.pathname)),
          subtitle: "Uploaded from Admin Panel"
        }));

      return NextResponse.json({ images });
    }

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
