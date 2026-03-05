import { NextResponse } from "next/server";
import { readSettings } from "@/lib/settings";

type YoutubeSearchResponse = {
  items?: Array<{
    id?: {
      videoId?: string;
    };
  }>;
};

export async function GET() {
  try {
    const settings = await readSettings();

    if (settings.customLiveUrl) {
      return NextResponse.json({
        status: "live",
        embedUrl: settings.customLiveUrl
      });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = settings.channelId || process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return NextResponse.json({
        status: "offline",
        embedUrl: null
      });
    }

    const endpoint = new URL("https://www.googleapis.com/youtube/v3/search");
    endpoint.searchParams.set("part", "snippet");
    endpoint.searchParams.set("channelId", channelId);
    endpoint.searchParams.set("eventType", "live");
    endpoint.searchParams.set("type", "video");
    endpoint.searchParams.set("maxResults", "1");
    endpoint.searchParams.set("key", apiKey);

    const response = await fetch(endpoint.toString(), {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({
        status: "offline",
        embedUrl: null
      });
    }

    const data = (await response.json()) as YoutubeSearchResponse;
    const videoId = data.items?.[0]?.id?.videoId;

    if (!videoId) {
      return NextResponse.json({
        status: "offline",
        embedUrl: null
      });
    }

    return NextResponse.json({
      status: "live",
      embedUrl: `https://www.youtube.com/embed/${videoId}`
    });
  } catch {
    return NextResponse.json(
      {
        status: "offline",
        embedUrl: null
      },
      { status: 500 }
    );
  }
}

