import { promises as fs } from "fs";
import path from "path";
import { get as getBlob, put as putBlob } from "@vercel/blob";

export type AppSettings = {
  channelId: string;
  customLiveUrl: string;
};

const SETTINGS_DIR = path.join(process.cwd(), "data");
const SETTINGS_PATH = path.join(SETTINGS_DIR, "settings.json");
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KV_SETTINGS_KEY = process.env.KV_SETTINGS_KEY || "trinitas:settings";
const BLOB_RW_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const BLOB_SETTINGS_PATH = "settings/app-settings.json";
const ENV_CUSTOM_LIVE_URL =
  process.env.YOUTUBE_CUSTOM_LIVE_URL ||
  process.env.CUSTOM_LIVE_URL ||
  "";

const DEFAULT_SETTINGS: AppSettings = {
  channelId: "",
  customLiveUrl: ""
};

function normalizeSettings(input: unknown): AppSettings {
  if (!input || typeof input !== "object") {
    return DEFAULT_SETTINGS;
  }

  const candidate = input as Partial<AppSettings>;

  return {
    channelId: (candidate.channelId ?? "").trim(),
    customLiveUrl: (candidate.customLiveUrl ?? "").trim()
  };
}

function shouldUseKv(): boolean {
  return Boolean(KV_URL && KV_TOKEN);
}

function shouldUseBlob(): boolean {
  return Boolean(BLOB_RW_TOKEN);
}

export function hasPersistentSettingsStore(): boolean {
  return shouldUseKv() || shouldUseBlob();
}

function mergeSettings(
  stored: AppSettings,
  options?: {
    preferEnvCustomLiveUrl?: boolean;
  }
): AppSettings {
  const envCustomLiveUrl = normalizeYoutubeEmbedUrl(ENV_CUSTOM_LIVE_URL);
  const preferEnvCustomLiveUrl = options?.preferEnvCustomLiveUrl ?? false;

  return {
    channelId: stored.channelId || process.env.YOUTUBE_CHANNEL_ID || "",
    customLiveUrl: preferEnvCustomLiveUrl
      ? envCustomLiveUrl || stored.customLiveUrl
      : stored.customLiveUrl || envCustomLiveUrl
  };
}

async function readSettingsFromKv(): Promise<AppSettings | null> {
  if (!KV_URL || !KV_TOKEN) return null;

  try {
    const response = await fetch(`${KV_URL}/get/${encodeURIComponent(KV_SETTINGS_KEY)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`
      },
      cache: "no-store"
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { result?: string | null };
    if (!data.result) return DEFAULT_SETTINGS;
    return normalizeSettings(JSON.parse(data.result));
  } catch {
    return null;
  }
}

async function writeSettingsToKv(next: AppSettings): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;

  try {
    const value = JSON.stringify(next);
    const response = await fetch(
      `${KV_URL}/set/${encodeURIComponent(KV_SETTINGS_KEY)}/${encodeURIComponent(value)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`
        },
        cache: "no-store"
      }
    );

    return response.ok;
  } catch {
    return false;
  }
}

async function readSettingsFromBlob(): Promise<AppSettings | null> {
  if (!BLOB_RW_TOKEN) return null;

  try {
    const blob = await getBlob(BLOB_SETTINGS_PATH, {
      access: "private",
      token: BLOB_RW_TOKEN
    });
    if (!blob || !("stream" in blob)) return DEFAULT_SETTINGS;
    const body = await new Response(blob.stream).text();
    return normalizeSettings(JSON.parse(body));
  } catch {
    return null;
  }
}

async function writeSettingsToBlob(next: AppSettings): Promise<boolean> {
  if (!BLOB_RW_TOKEN) return false;

  try {
    await putBlob(BLOB_SETTINGS_PATH, JSON.stringify(next, null, 2), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token: BLOB_RW_TOKEN
    });
    return true;
  } catch {
    return false;
  }
}

export async function readSettings(): Promise<AppSettings> {
  if (shouldUseBlob()) {
    const fromBlob = await readSettingsFromBlob();
    if (fromBlob) {
      return mergeSettings(fromBlob);
    }
  }

  if (shouldUseKv()) {
    const fromKv = await readSettingsFromKv();
    if (fromKv) {
      return mergeSettings(fromKv);
    }
  }

  try {
    const raw = await fs.readFile(SETTINGS_PATH, "utf8");
    const normalized = normalizeSettings(JSON.parse(raw));
    return mergeSettings(normalized, {
      preferEnvCustomLiveUrl: process.env.NODE_ENV === "production"
    });
  } catch {
    return mergeSettings(DEFAULT_SETTINGS);
  }
}

export async function writeSettings(next: AppSettings): Promise<void> {
  if (shouldUseBlob()) {
    const written = await writeSettingsToBlob(next);
    if (written) return;
  }

  if (shouldUseKv()) {
    const written = await writeSettingsToKv(next);
    if (written) return;
  }

  await fs.mkdir(SETTINGS_DIR, { recursive: true });
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(next, null, 2), "utf8");
}

export function isLikelyYoutubeEmbed(url: string): boolean {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return (
      (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) &&
      (parsed.pathname.includes("/embed/") || parsed.pathname.includes("/live_stream"))
    );
  } catch {
    return false;
  }
}

export function normalizeYoutubeEmbedUrl(url: string, fallbackChannelId = ""): string {
  const input = url.trim();
  if (!input) return "";

  try {
    const parsed = new URL(input);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (!host.includes("youtube.com")) {
      return "";
    }

    if (parsed.pathname.startsWith("/embed/")) {
      const id = parsed.pathname.split("/")[2];
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (parsed.pathname.startsWith("/watch")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (parsed.pathname.startsWith("/shorts/")) {
      const id = parsed.pathname.split("/")[2];
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (parsed.pathname.startsWith("/live/")) {
      const id = parsed.pathname.split("/")[2];
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (parsed.pathname.startsWith("/channel/")) {
      const [, , channelId, maybeLive] = parsed.pathname.split("/");
      if (maybeLive === "live" && channelId) {
        return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channelId)}`;
      }
    }

    if (parsed.pathname.endsWith("/live") && fallbackChannelId) {
      return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(fallbackChannelId)}`;
    }

    if (parsed.pathname.startsWith("/live_stream")) {
      const channel = parsed.searchParams.get("channel");
      if (!channel) return "";
      return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channel)}`;
    }

    return "";
  } catch {
    return "";
  }
}
