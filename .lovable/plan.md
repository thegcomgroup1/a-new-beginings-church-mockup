# Client requests: Prayer, Testimonies, Giving

Three additions from Mark's email: a prayer request tab that emails the church, a tab for testimonial videos, and a giving tab (bank still pending).

## 1. Prayer Requests — `/prayer`

New page with a short form: name, email (optional), phone (optional), request, and a "keep this private" checkbox.

- On submit, the request is emailed to `anewbeginningrushville@gmail.com` using the same email pipeline already powering Plan a Visit.
- If the sender leaves an email, they also get a short "we're praying for you" confirmation.
- Page copy: Spirit-led framing, scripture line, note that requests are handled confidentially by the prayer team.
- Success state confirms the request was received; no request text is stored publicly.

## 2. Testimonies — `/testimonies`

New page for testimonial videos, driven by a simple config list (title, YouTube link, short blurb, person's name).

- Videos embed from their YouTube channel — nothing heavy hosted on the site.
- If no testimony videos exist yet, the page shows an invitation to share a testimony (link to the prayer/contact form) instead of empty placeholders.
- A short "Share your story" CTA at the bottom routes to the contact email.

## 3. Giving — `/give`

Promote giving from the small homepage section to its own page.

- Explains ways to give now: in person on Sunday, by mail, or reach out by email.
- Online giving block is built but flagged off in config — the moment the bank/processor link exists, flipping one setting turns on a "Give Online" button.
- Homepage giving section links through to the full page.

## Navigation

Header and footer nav grow to: About, Events, Watch, Testimonies, Prayer, Give, Resources. On desktop the longer items collapse sensibly; mobile menu lists them all. Plan Your Visit stays the primary button.

## Technical notes

- New routes `src/routes/prayer.tsx`, `src/routes/testimonies.tsx`, `src/routes/give.tsx`, each with its own SEO head block and JSON-LD where relevant.
- New public action route `src/routes/api/public/prayer-request.ts` mirroring `plan-visit.ts`: validates input, then sends via the existing transactional email route with an idempotency key.
- Two new React Email templates (`prayer-request-notify`, `prayer-request-confirm`) registered in `src/lib/email-templates/registry.ts`.
- New `src/config/testimonies.ts` and a `giving` block in `src/config/site.ts` with an `onlineEnabled` flag.
- Sitemap updated with the three new paths.

## Assumptions

- Prayer requests go to `anewbeginningrushville@gmail.com` (same inbox as visit notifications).
- Testimony videos come from their YouTube channel and are added by URL as they record them.
- No online giving link yet, so the page ships with the offline options and the online block ready but hidden.
