## Goal

Stop hosting/showing placeholder sermon thumbnails on `/watch`. Drive traffic to the YouTube channel for the full archive. Only the real latest video (already pulled from RSS) stays embedded.

## Changes

**`src/routes/watch.tsx`**

1. Delete the entire `MoreMessages` section and the `SermonCard` component (the grid of fake play-icon placeholders).
2. Remove now-unused imports: `Play`, `Calendar`, `recentSermons`, `SermonClip`, and the `SermonCard` helper.
3. Replace with a single "Full archive on YouTube" CTA block under the latest video:
   - Heading: "The full archive lives on YouTube."
   - Body: "We keep this page light and fast — head to our channel for every Sunday message, special services, and past teachings."
   - Buttons: "Watch on YouTube" (primary, → `youtubeChannelUrl`) and "Subscribe" (outline, → channel `?sub_confirmation=1`).
4. Keep `Intro`, `LatestVideo`, and `ServiceCta` exactly as they are.

No other files change. `src/config/sermons.ts` stays in place (still used by other surfaces if any); only the `/watch` route stops rendering placeholder cards.

## Result

`/watch` shows: intro → real latest video (from YouTube RSS) → YouTube CTA → service CTA. No fake thumbnails, no placeholder play icons, no "we're working on cataloging more" language.
