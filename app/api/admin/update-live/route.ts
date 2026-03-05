import { NextRequest, NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/adminAuth";
import { normalizeYoutubeEmbedUrl, writeSettings } from "@/lib/settings";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

    if (!isValidAdminToken(token)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as {
      channelId?: string;
      customLiveUrl?: string;
    };

    const channelId = (body.channelId ?? "").trim();
    const rawCustomLiveUrl = (body.customLiveUrl ?? "").trim();
    const customLiveUrl = rawCustomLiveUrl ? normalizeYoutubeEmbedUrl(rawCustomLiveUrl) : "";

    if (rawCustomLiveUrl && !customLiveUrl) {
      return NextResponse.json(
        { error: "Please enter a valid YouTube URL (watch/share/live/embed)." },
        { status: 400 }
      );
    }

    await writeSettings({ channelId, customLiveUrl });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}
