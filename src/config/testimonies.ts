/**
 * Testimony videos — add new ones as they're recorded.
 * `youtubeUrl` accepts any normal YouTube link (watch, youtu.be, or shorts).
 */
export interface Testimony {
  name: string;
  title: string;
  blurb: string;
  youtubeUrl: string;
}

export const testimonies: Testimony[] = [
  {
    name: "Aaron and Julie Schilling",
    title: "She Was Told She Only Had a Few Years to Live",
    blurb:
      "Aaron and Julie share what God did when the doctors' report said one thing and He said another.",
    youtubeUrl: "https://www.facebook.com/reel/1032064849427589",
  },
];

/** Facebook video/reel links embed through the Facebook video plugin. */
export function facebookEmbedUrl(url: string): string | null {
  if (!/(^|\.)facebook\.com\//.test(url) && !/fb\.watch\//.test(url)) return null;
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url,
  )}&show_text=false&width=560&height=315`;
}

export function youtubeIdFromUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/(?:embed|shorts|live)\/([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}
