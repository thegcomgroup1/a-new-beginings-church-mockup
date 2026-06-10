
## A New Beginning Church — mockup swap

### 1. Generate atmospheric imagery
Create 8 JPGs under `src/assets/anewbeginning/` using the agent image tool (warm, Spirit-led, small rural-Indiana church atmosphere — no AI-looking faces in close-up, no fake text/logos):

- `hero.jpg` — warm sunlit sanctuary interior, soft golden light through windows, empty wooden pews, inviting (16:9-ish, 1536×1024)
- `story.jpg` — small congregation gathered in worship from the back, hands raised, warm lighting (1024×1024)
- `life1.jpg`–`life6.jpg` — atmospheric: open Bible on a pew, hands joined in prayer, acoustic guitar + worship setup, coffee + greeting in a foyer, candles/cross detail, country road to a small church (varied 1024×1024)

Each upload via `lovable-assets create` → write a `.asset.json` pointer next to it so the imports in the new `site.ts` resolve.

For the logo: do **not** generate. Leave `brand.logoImageSrc` empty so the header falls back to the text wordmark until Mark uploads the real cross+vine+butterfly PNG.

### 2. Replace `src/config/site.ts`
Drop in the ANB content from `ANB_site.ts` verbatim, with two adjustments:
- Remove the `logoAsset` import (no logo file yet); set `brand.logoImageSrc: ""`.
- Keep every other field as the user provided (announcement disabled, welcomeVideo disabled, sermon embed empty, giving URL `#`, pastor name placeholder).

### 3. Add `logoImageSrc` support to `StickyHeader`
If `siteConfig.brand.logoImageSrc` is a non-empty string, render an `<img>` (with `logoText` as alt) instead of the text wordmark. Otherwise keep current text rendering. No layout shift — same header height.

### 4. Add opt-in `AnnouncementBar` capability
- New component `src/components/sections/AnnouncementBar.tsx`. Renders nothing if `siteConfig.announcement.enabled !== true`. When enabled: thin bar above the sticky header with the configured `text` and a CTA link (`ctaLabel` → `ctaUrl`), styled with existing tokens (`bg-primary text-primary-foreground`).
- Mount it in `src/routes/index.tsx` as the first child of the page wrapper, above `<StickyHeader />`.
- Defaults stay `enabled: false`, so this is a no-op for the current mockup and any image-only church — flip one flag to turn on.

### 5. Quiet fix
The current hydration mismatch in the footer comes from the bracketed placeholder `[hello@church.org]` being parsed as a Markdown-style autolink in some environments. Once `site.ts` is replaced with the ANB email (`anewbeginningrushville@gmail.com`), the mismatch resolves on its own — no separate change needed.

### Verification
- Build passes.
- Preview renders ANB name, tagline, Sunday 10:30 time, Rushville address with working Google Maps embed, atmospheric hero, and Facebook social link.
- Header still shows "A New Beginning" wordmark (no logo image yet).
- Announcement bar not visible (disabled).
- Footer hydration error gone.

### Technical notes
- All 8 generated images use the agent `generate_image` tool (`standard` quality for hero, `fast` for the rest) → uploaded with `lovable-assets create --file ... --filename ....jpg > ....jpg.asset.json` so the `@/assets/anewbeginning/*.asset.json` imports in `site.ts` resolve at build time.
- `StickyHeader` change is a single conditional render; no new props, all driven by config.
- `AnnouncementBar` is a sibling, not nested inside the header — keeps sticky behavior unchanged.
