import { NextRequest, NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/adminAuth";
import { hasPersistentSettingsStore, normalizeYoutubeEmbedUrl, readSettings, writeSettings } from "@/lib/settings";

function defaultLiveTitle(): string {
  return `Sunday Service - ${new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date())}`;
}

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
      liveTitle?: string;
    };

    const channelId = (body.channelId ?? "").trim();
    const liveTitle = (body.liveTitle ?? "").trim();
    const rawCustomLiveUrl = (body.customLiveUrl ?? "").trim();
    const customLiveUrl = rawCustomLiveUrl ? normalizeYoutubeEmbedUrl(rawCustomLiveUrl, channelId) : "";

    if (rawCustomLiveUrl && !customLiveUrl) {
      return NextResponse.json(
        { error: "Please enter a valid YouTube URL (watch/share/live/embed), or add the channel ID for channel live links." },
        { status: 400 }
      );
    }

    const currentSettings = await readSettings();
    const nextTitle = liveTitle || currentSettings.liveTitle || defaultLiveTitle();
    const liveHistory = customLiveUrl
      ? [
          {
            title: nextTitle,
            embedUrl: customLiveUrl,
            updatedAt: new Date().toISOString()
          },
          ...currentSettings.liveHistory.filter((item) => item.embedUrl !== customLiveUrl)
        ].slice(0, 24)
      : currentSettings.liveHistory;

    await writeSettings({ channelId, customLiveUrl, liveTitle: nextTitle, liveHistory });

    return NextResponse.json({
      success: true,
      persistent: hasPersistentSettingsStore() || process.env.NODE_ENV !== "production"
    });
  } catch {
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}
