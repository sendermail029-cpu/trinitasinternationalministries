"use client";

import { FormEvent, useEffect, useState } from "react";
import { convertImageFileToWebp } from "@/lib/clientWebp";

const ADMIN_TOKEN_KEY = "trinitas_admin_token";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [channelId, setChannelId] = useState("");
  const [customLiveUrl, setCustomLiveUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedPath, setUploadedPath] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const loadSettings = async () => {
      if (!token) return;

      try {
        const response = await fetch("/api/admin/settings", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: "no-store"
        });
        const data = (await response.json()) as {
          channelId?: string;
          customLiveUrl?: string;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error || "Unable to load settings.");
        }

        setChannelId(data.channelId ?? "");
        setCustomLiveUrl(data.customLiveUrl ?? "");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load settings.";
        setError(message);
        if (message.toLowerCase().includes("unauthorized")) {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          setToken(null);
        }
      }
    };

    loadSettings();
  }, [token]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setWarning("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = (await response.json()) as { token?: string; error?: string };

      if (!response.ok || !data.token) {
        throw new Error(data.error || "Login failed.");
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
      setSuccess("Logged in successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    setLoading(true);
    setError("");
    setSuccess("");
    setWarning("");

    try {
      const response = await fetch("/api/admin/update-live", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          channelId,
          customLiveUrl
        })
      });
      const data = (await response.json()) as { success?: boolean; error?: string; persistent?: boolean };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to save settings.");
      }

      setSuccess("Settings saved successfully.");
      if (data.persistent === false) {
        setWarning("Saved on this server instance only. Add KV or YOUTUBE_CUSTOM_LIVE_URL in deployment for a reliable live site.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save settings.";
      setError(message);

      if (message.toLowerCase().includes("unauthorized")) {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
    setSuccess("");
    setError("");
  };

  const handleImageUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || uploading) return;

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const form = event.currentTarget;
      const fileInput = form.elements.namedItem("imageFile") as HTMLInputElement | null;
      const nameInput = form.elements.namedItem("imageName") as HTMLInputElement | null;
      const rawFile = fileInput?.files?.[0];

      if (!rawFile) {
        throw new Error("Please select an image first.");
      }

      const imageName = (nameInput?.value ?? "").trim() || "upload";
      const webpFile = await convertImageFileToWebp(rawFile);
      const payload = new FormData();
      payload.append("image", webpFile);
      payload.append("imageName", imageName);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: payload
      });

      const data = (await response.json()) as { success?: boolean; path?: string; error?: string };

      if (!response.ok || !data.success || !data.path) {
        throw new Error(data.error || "Failed to upload image.");
      }

      setUploadedPath(data.path);
      setSuccess(`Image uploaded as WebP: ${data.path}`);
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to upload image.";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy px-6 py-20 text-white">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-gold/50 bg-white/5 p-8 shadow-premium">
        <h1 className="text-center text-3xl font-semibold text-gold">Admin Panel</h1>
        <p className="mt-3 text-center text-white/80">
          Manage channel settings and custom live stream URL.
        </p>

        {!token ? (
          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <label className="block text-sm text-gold">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-lg border border-gold/40 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none"
              placeholder="Enter admin password"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gold px-5 py-3 font-semibold text-navy transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleSave}>
            <label className="block text-sm text-gold">YouTube Channel ID</label>
            <input
              type="text"
              value={channelId}
              onChange={(event) => setChannelId(event.target.value)}
              className="w-full rounded-lg border border-gold/40 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none"
              placeholder="UCxxxxxxxxxxxx"
            />

            <label className="block text-sm text-gold">Custom YouTube URL</label>
            <input
              type="url"
              value={customLiveUrl}
              onChange={(event) => setCustomLiveUrl(event.target.value)}
              className="w-full rounded-lg border border-gold/40 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none"
              placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gold px-5 py-3 font-semibold text-navy transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-lg border border-gold/50 px-5 py-3 font-semibold text-gold transition hover:bg-gold hover:text-navy"
            >
              Logout
            </button>
          </form>
        )}

        {token ? (
          <form className="mt-8 space-y-4 border-t border-gold/30 pt-6" onSubmit={handleImageUpload}>
            <h2 className="text-lg font-semibold text-gold">Upload Image (Auto WebP)</h2>
            <p className="text-sm text-white/75">
              You can choose JPG, PNG, or any image. It is converted to WebP automatically before upload.
            </p>

            <label className="block text-sm text-gold">Image Name</label>
            <input
              name="imageName"
              type="text"
              defaultValue="ministry-image"
              className="w-full rounded-lg border border-gold/40 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none"
              placeholder="logo or pastor-photo"
            />

            <label className="block text-sm text-gold">Image File</label>
            <input
              name="imageFile"
              type="file"
              accept="image/*"
              required
              className="w-full rounded-lg border border-gold/40 bg-white/10 px-4 py-3 text-white file:mr-4 file:rounded-md file:border-0 file:bg-gold file:px-3 file:py-1 file:text-navy"
            />

            <button
              type="submit"
              disabled={uploading}
              className="w-full rounded-lg bg-gold px-5 py-3 font-semibold text-navy transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {uploading ? "Uploading..." : "Convert to WebP and Upload"}
            </button>

            {uploadedPath ? <p className="text-xs text-white/75">Latest file: {uploadedPath}</p> : null}
          </form>
        ) : null}

        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        {warning ? <p className="mt-4 text-sm text-amber-200">{warning}</p> : null}
        {success ? <p className="mt-4 text-sm text-gold">{success}</p> : null}
      </div>
    </main>
  );
}
