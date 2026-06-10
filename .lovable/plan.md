## Changes

**1. Pastor name**
In `src/config/site.ts`, set `sermon.speaker` to `"Pastor Mark Matthews"` (replacing the `[confirm name]` placeholder).

**2. Gallery swap — drop the landscape, add real church shots**
Upload the three newly attached photos as Lovable Assets:
- `band-worship.jpg` — worship team (keyboard, guitar, bass) on stage with the wooden cross
- `church-sign.jpg` — "A New Beginning · Salvation is Free · Sun 10:30" marquee
- `jesus-wagon.jpg` — "Chugging Along for Jesus" decorated wagon outside the church

Then in `siteConfig.life`, remove the `landscape.jpg` entry and replace it (plus extend the gallery) with these three, with descriptive alt text. New `life` order:
1. church-front
2. band-worship (new)
3. service (pastor preaching)
4. church-sign (new)
5. jesus-wagon (new)
6. church-hero
7. sunset

Delete the now-unused `landscape.jpg.asset.json` and drop its import from `site.ts`.

**3. No component changes**
`LifeOfChurch` already maps over `siteConfig.life`, so the gallery picks up the new lineup automatically.
