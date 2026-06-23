
## Full build-out plan — from the survey

Goal from Mark: **visibility and visitor reach.** Two CSVs reviewed; second one (more complete) is authoritative. Below is everything that needs to change or get built.

---

### 1. Content corrections in `src/config/site.ts`

A few facts in the current config don't match the survey — fixing first.

- **Pastor name**: "Pastor Mark Matthews" → **"Pastor Mark Mathews"** (single t).
- **Service times**: currently only Sunday 10:30. Survey says:
  - Sunday Worship — 10:30 AM
  - Monday Women's Study — 5:30 PM
  - Tuesday Bible Discussion — 6:00 PM
  - Wednesday Prayer Night — 6:00 PM
  (Note: this supersedes the older "Tue/Thu 6" on the church sign — using the survey as source of truth.)
- **Tagline / first-visitor sentence**: weave in Mark's own line — *"A Spirit-filled, Spirit-led family doing God's will on earth."*
- **Giving**: survey says no giving platform yet. Hide/soften the Give section (keep it as a "Support the ministry — contact us" card with the church email instead of a broken `#` link).
- **Sermon source = YouTube**: switch sermon CTA from Facebook to the YouTube channel (`https://www.youtube.com/@AnewbeginningRushville`). Keep Facebook as a social link.
- **Socials**: drop the Instagram placeholder (none provided). Keep Facebook + YouTube.

### 2. Pull in survey-provided media

Survey provides 3 brand asset URLs and 4 leader photo URLs (LeadConnector — 307 redirect to signed Google Cloud Storage). I'll download each, inspect, and upload via `lovable-assets` so they become permanent CDN-hosted pointers. Files created:

```
src/assets/anewbeginning/brand-1.{ext}.asset.json   (+ brand-2, brand-3 as needed — likely logo / wordmark / banner)
src/assets/anewbeginning/leader-mark.jpg.asset.json
src/assets/anewbeginning/leader-tammy.jpg.asset.json
src/assets/anewbeginning/leader-answan.jpg.asset.json
src/assets/anewbeginning/leader-lori.jpg.asset.json
```
Susan Vantrees has no photo — initials fallback in the Leaders grid.

If any brand asset is a better logo than the current one, swap `logoImageSrc`.

### 3. New leaders data — `src/config/leaders.ts`

Typed array with 5 entries (name, role, blurb, image). Used by the new About page and a homepage teaser strip.

### 4. New page — `/about` (`src/routes/about.tsx`)

What-to-expect-style storytelling page focused on **who we are + who leads us**.
Sections:
1. **Hero strip** — eyebrow "About us", H1 *"A church for Rushville."*, lead paragraph from existing `church.story`.
2. **What we believe** — short, scannable 3–4 card grid (Spirit-led, rooted in Scripture, Gifts of the Spirit, non-denominational, family-sized).
3. **Meet our leaders** — responsive grid of all 5 leaders with photo (or initials fallback), name, role, blurb.
4. **Closing CTA** — *"Come see for yourself this Sunday."* → links to `/#visit` + `/events`.

Own `head()` metadata (title/description/og:title/og:description/og:image using the hero church photo).

### 5. New page — `/resources` (`src/routes/resources.tsx`)

Survey says they want downloadable resources. Empty-but-classy page so it's ready to populate:
- Hero with eyebrow "Resources" and intro line.
- **Sermon notes / study guides** card group — `resources` array in a new `src/config/resources.ts` (each: title, kind, description, fileUrl, badge). Seeded with one placeholder ("Sunday Sermon Notes — coming soon") so the page never looks broken.
- "What I'm reading" / **recommended reading** small list (placeholder, easy for Mark to fill).
- Closing CTA — "Want something added here? Email us."

Own `head()` metadata. New file type pattern: when `fileUrl === "#"`, render the card as a disabled "Coming soon" badge instead of a download link.

### 6. New page — `/watch` (`src/routes/watch.tsx`)

Survey: sermon source = YouTube, wants sermon video on homepage.
- Hero with latest sermon embed (iframe to YouTube channel — uploads playlist). If we can't resolve a specific video, use the channel embed.
- Grid of "more messages" placeholder cards that read from a small `src/config/sermons.ts` (title, date, youtubeId). Seeded with a "Watch latest on YouTube" CTA so it works the moment we get IDs.
- Subscribe CTA → YouTube channel.

Own `head()` metadata.

### 7. Homepage updates

- `Sermons` section: switch CTA from Facebook to YouTube; add a secondary link "See more messages →" → `/watch`.
- `MissionStory` (or a new mini section): add a 4–6 leader teaser strip — small avatars, names, roles, "Meet our leaders →" → `/about#leaders`.
- `Events` section: already links to `/events` — leaves as is.
- `Give`: replaced with a softer "Support the ministry" card (email CTA, no broken giving link).

### 8. Navigation — `src/components/sections/StickyHeader.tsx`

Update desktop + mobile nav order to:
`Home · About · Events · Watch · Resources · Visit (CTA)`
All TanStack `<Link to=…>`.

### 9. Footer — `src/components/sections/Footer.tsx`

Add a sitemap column with About / Events / Watch / Resources / Visit. Update phone/email (already correct) and trim socials to Facebook + YouTube. Add the survey's one-liner mission under the wordmark.

### 10. `events.ts` correction

Current recurring uses Tue + Thu 6 PM. Update to survey: Sun 10:30 / Mon 5:30 (Women's Study) / Tue 6:00 (Bible Discussion) / Wed 6:00 (Prayer Night). Each gets its own title + blurb so calendar chips read correctly.

### 11. Light SEO / metadata polish

- Update `__root.tsx` favicon (use uploaded logo) and default title/description.
- Each new route sets its own `og:title`, `og:description`, and a route-specific `og:image` (church hero or service photo).

---

### Technical notes

- All new routes follow the existing pattern: `createFileRoute("/about")` etc.; route tree auto-regenerates.
- Leader/brand binaries are pulled from LeadConnector signed URLs by following the 307 redirect, then uploaded via `lovable-assets create --file /tmp/x --filename …` so the codebase only ever contains `.asset.json` pointers.
- No backend changes. No new dependencies (`date-fns` already added for `/events`).
- All colors/typography continue using the existing semantic tokens — no hard-coded hex.

### Out of scope (track for later)

- Phone app for the ministry (survey: "Yes, interested") — separate engagement.
- Live giving integration (no provider yet — soft email CTA in the meantime).
- Google Business Profile / Analytics / Search Console setup — HLPR ops task, not a code change.
- Email marketing platform setup — same.
