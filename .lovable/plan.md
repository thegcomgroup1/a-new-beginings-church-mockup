# Latest YouTube video, front and center

Pull the newest upload from **@AnewbeginningRushville** automatically and feature it at the top of the homepage. No manual updates — whenever a new video drops on YouTube, the site reflects it.

## How it works

YouTube exposes a public RSS feed per channel (no API key, no quota). We fetch it on the server, cache briefly, and render the latest video.

- Feed: `https://www.youtube.com/feeds/videos.xml?channel_id=<ID>`
- Channel ID for @AnewbeginningRushville: resolved at build/runtime from the handle.

## Changes

1. **New server function** `src/lib/youtube.functions.ts`
   - `getLatestVideo()` fetches the channel RSS, parses the first `<entry>`, returns `{ videoId, title, publishedAt, thumbnail, url }`.
   - 10-minute in-memory cache + graceful fallback (returns `null` on failure so the page still renders).

2. **New component** `src/components/sections/LatestVideo.tsx`
   - Full-width featured block: responsive 16:9 YouTube embed, video title, "New message" eyebrow, published date, and CTA buttons (Watch on YouTube, Subscribe).
   - Styled to match existing hero/section tokens — no hardcoded colors.

3. **Homepage** `src/routes/index.tsx`
   - Loader calls `getLatestVideo()` via TanStack Query (`ensureQueryData`, 10-min `staleTime`).
   - Renders `<LatestVideo />` immediately after the hero, before existing sections. If the feed fails, the block is skipped silently.

4. **Watch page** `src/routes/watch.tsx`
   - Replace the static hero embed with the same `getLatestVideo()` result so it stays in sync.

## Technical notes

- Pure server-side fetch (no client API key, no CORS issue).
- Regex/simple XML parse — no new deps.
- Cache keyed in module scope; revalidates every 10 min per server instance.
- If YouTube ever changes the handle→channel mapping, we hardcode the resolved channel ID as a fallback constant.

No design changes elsewhere; only the homepage gains a new featured block above existing content.
