## Plan

1. Re-generate the logo as a transparent PNG using `imagegen--edit_image` on the current `logo.png` asset with `transparent_background: true`, saving to `/tmp/logo-transparent.png`.
2. Upload the transparent PNG via `lovable-assets create` and overwrite `src/assets/anewbeginning/logo.png.asset.json` with the new pointer.
3. Verify the header renders the logo cleanly against the background (no white box) in the preview.

No component or config changes needed — `StickyHeader` already reads `siteConfig.brand.logoImageSrc` from the pointer.

The SSR "Cannot find module" error should already be resolved now that `logo.png.asset.json` exists; if it persists after the swap, restart the dev server.