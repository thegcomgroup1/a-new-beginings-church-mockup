## Plan

1. Replace the placeholder brand imagery with the uploaded assets.
   - Use the cross-with-vines-and-butterfly artwork as the site logo.
   - Use the best church exterior photo as the homepage hero image.
   - Use the service/pastor photo as the main story/about image.

2. Rebuild the gallery so it uses the real photos you approved.
   - Keep the gallery grounded in the actual church by featuring the exterior, service, landscape, and sunset photos.
   - Reassign image alt text so each photo is described accurately and feels intentional for visitors and search.
   - Keep only the strongest visuals; remove filler placeholders where the real images are better.

3. Update the site configuration to point to the real uploaded assets.
   - Swap the current generated image references in `src/config/site.ts` for the uploaded files.
   - Keep the existing content structure, announcement option, and church copy unless a photo mapping needs a small wording adjustment.
   - Preserve the logo fallback behavior, but wire in the real logo so the header uses it immediately.

4. Clean up the current preview issue while implementing.
   - Regenerate the routing output instead of relying on any manual route tree edits so the preview loads cleanly again.
   - Verify the homepage renders with the new hero, logo, and updated photo sections.

## Image mapping

- **Logo:** cross + vines + butterfly artwork
- **Hero:** church exterior photo
- **Story/About:** pastor preaching photo
- **Gallery/Life:** alternate exterior photo, mountain landscape, sunset photo, plus the strongest remaining church image placements

## Technical details

- Upload the attached images as project assets and use their asset URLs in the existing config-driven image system.
- Reuse the current `StickyHeader`, `Hero`, `MissionStory`, and `LifeOfChurch` components rather than redesigning the layout.
- Keep SEO and structure intact while updating image alt text and metadata relevance where needed.