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

export const testimonies: Testimony[] = [];

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
