import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isValidAdminToken } from "@/lib/adminAuth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const BLOB_RW_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function sanitizeName(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

    if (!isValidAdminToken(token)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get("image");
    const imageName = String(formData.get("imageName") ?? "upload");

    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    if (image.type !== "image/webp") {
      return NextResponse.json({ error: "Only WebP images are allowed." }, { status: 400 });
    }

    const safeName = sanitizeName(imageName) || "upload";
    const fileName = `${safeName}-${Date.now()}.webp`;
    const bytes = Buffer.from(await image.arrayBuffer());

    if (BLOB_RW_TOKEN) {
      const blob = await put(`gallery/${fileName}`, bytes, {
        access: "public",
        contentType: "image/webp",
        token: BLOB_RW_TOKEN
      });

      return NextResponse.json({ success: true, path: blob.url });
    }

    const fullPath = path.join(UPLOAD_DIR, fileName);
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(fullPath, bytes);

    return NextResponse.json({ success: true, path: `/uploads/${fileName}` });
  } catch {
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
