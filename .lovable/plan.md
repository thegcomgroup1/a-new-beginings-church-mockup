I’ll fix the homepage placement by moving the live YouTube embed into the existing `Sermons` section where the `[Sermon video embed]` placeholder currently is.

Plan:
1. Update `src/routes/index.tsx`
   - Remove the standalone `<LatestVideo />` block currently sitting right after the hero.
   - Pass `latestVideo` into the existing `<Sermons />` section instead.

2. Update `src/components/sections/Sermons.tsx`
   - Replace the placeholder video box with the real latest YouTube embed using the RSS-powered video data.
   - Update the sermon card title/date/watch link from the real latest video when available.
   - Remove placeholder text like `[Sermon video embed]` entirely.
   - If YouTube data fails to load, show no fake thumbnail or fake video placeholder.

3. Keep `/watch` intact
   - The full archive still points traffic to YouTube.
   - The `/watch` page can keep using the latest video feature and YouTube archive CTA.

Result:
- Homepage keeps its original design structure.
- The latest uploaded YouTube video appears in the designated homepage video spot.
- No duplicate “front and center” video block after the hero.
- No placeholders or fake video thumbnails.