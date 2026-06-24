## Current state

The "Plan Your Visit" form on the homepage is wired to local React state only — when someone submits, they see "We've got you" but **no email is sent and nobody at the church is notified**. The buttons (header, hero, sticky CTA) all correctly scroll to the form, but the submission itself is a dead end.

To send real emails you need a sender domain. The project has none configured.

## Recommended path

1. **You secure a domain for the church** (e.g. `anewbeginningchurch.org` or similar). You can buy one directly inside Lovable: Project Settings → Project → Domains → "Buy new domain". This is the cleanest option — domain becomes available immediately and DNS is managed inside Lovable.
2. **Once the domain is connected**, come back and tell me it's ready. I'll then:
   - Set up Lovable's email infrastructure on a subdomain like `notify.<yourdomain>`.
   - Add two branded email templates:
     - **Notification to the church** (sent to `anewbeginningrushville@gmail.com`) with the visitor's name, email, when they're coming, and any note.
     - **Confirmation to the visitor** — warm welcome, service times, address, what to expect on Sunday.
   - Add a public action endpoint that validates the form (Zod) and triggers both sends with idempotency keys (so retries don't double-send).
   - Update the form to POST to that endpoint with a loading state, error handling, and only flip to the "We've got you" success view after the real send succeeds.

## What I need from you to proceed

Just confirm once the domain is connected in Project Settings → Domains and shows status "Active" (or "Ready"). Then I'll handle steps 2 in full — no more questions needed; I'll use `anewbeginningrushville@gmail.com` (already in your site config) as the notification recipient.

If you'd rather use a domain you already own elsewhere, that works too — connect it via Project Settings → Domains → "Connect Domain" and follow the DNS instructions.