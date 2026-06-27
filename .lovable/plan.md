## Plan: Favicon from church logo

Generate favicon assets from the existing transparent cross-with-vines logo (`src/assets/anewbeginning/logo.png`) and wire them into the site head.

### Steps

1. **Create favicon image** — use `imagegen--edit_image` on the existing logo to produce a square, centered 512×512 PNG with safe padding so the cross reads at 16×16. Save to `src/assets/anewbeginning/favicon.png` and upload via `lovable-assets` to get a stable CDN URL.

2. **Wire it into `src/routes/__root.tsx`** — add `<link rel="icon">` (PNG) and `<link rel="apple-touch-icon">` tags pointing at the CDN URL, replacing any default Vite/Lovable favicon link.

3. **Verify** — confirm the build is green and the favicon URL responds; you'll see it in the browser tab on the next preview reload.

That's it — small, contained, no impact on the Plan-a-Visit flow you're about to test.
