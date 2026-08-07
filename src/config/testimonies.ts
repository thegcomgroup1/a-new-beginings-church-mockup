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
    name: "A New Beginning Church",
    title: "A story from our church family",
    blurb:
      "Hear what God has been doing in the life of one of our own — shared in their own words.",
    youtubeUrl: "https://www.facebook.com/reel/1032064849427589",
  },
];

/** Facebook video/reel links get embedded through the Facebook video plugin. */
export function facebookEmbedUrl(url: string): string | null {
  if (!/(^|\.)facebook\.com\//.test(url) && !/fb\.watch\//.test(url)) return null;
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url,
  )}&show_text=false`;
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
