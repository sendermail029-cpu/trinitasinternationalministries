import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/adminAuth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

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
    const fullPath = path.join(UPLOAD_DIR, fileName);
    const bytes = new Uint8Array(await image.arrayBuffer());

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(fullPath, bytes);

    return NextResponse.json({ success: true, path: `/uploads/${fileName}` });
  } catch {
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
