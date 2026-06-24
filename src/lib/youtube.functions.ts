import { createServerFn } from "@tanstack/react-start";

const CHANNEL_ID = "UCwDDjt8cldIC0HbTgFkCTrg"; // @AnewbeginningRushville
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CACHE_TTL_MS = 10 * 60 * 1000;

export type LatestVideo = {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

let cache: { at: number; value: LatestVideo | null } | null = null;

function pick(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return m ? m[1].trim() : null;
}
function attr(xml: string, tag: string, name: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*\\s${name}="([^"]+)"`));
  return m ? m[1] : null;
}

function parseLatest(xml: string): LatestVideo | null {
  const entryMatch = xml.match(/<entry>[\s\S]*?<\/entry>/);
  if (!entryMatch) return null;
  const entry = entryMatch[0];
  const videoId = pick(entry, "yt:videoId");
  const title = pick(entry, "title");
  const publishedAt = pick(entry, "published");
  const thumbnail = attr(entry, "media:thumbnail", "url");
  if (!videoId || !title) return null;
  return {
    videoId,
    title,
    publishedAt: publishedAt ?? "",
    thumbnail: thumbnail ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

export const getLatestVideo = createServerFn({ method: "GET" }).handler(
  async (): Promise<LatestVideo | null> => {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.value;
    try {
      const res = await fetch(FEED_URL, {
        headers: { "user-agent": "Mozilla/5.0 (compatible; ANB-Church/1.0)" },
      });
      if (!res.ok) throw new Error(`feed ${res.status}`);
      const xml = await res.text();
      const value = parseLatest(xml);
      cache = { at: Date.now(), value };
      return value;
    } catch (err) {
      console.error("getLatestVideo failed", err);
      return cache?.value ?? null;
    }
  },
);