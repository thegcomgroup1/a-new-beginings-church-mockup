## 1. Fix the build first

The recent `@tanstack/react-start` upgrade (1.168.26) pulled ahead of `@tanstack/react-router` (router-core 1.168.17), which is missing the `getScriptPreloadAttrs` export the newer start runtime needs. Align all TanStack packages to the latest matching minor:

- Upgrade `@tanstack/react-router` and `@tanstack/router-plugin` to the latest 1.168.x.
- Re-run the dev build to confirm the SSR bundle resolves cleanly.

No app code changes are required for this step.

## 2. Plan a Visit email sequence

Now that `anewbeginningchurch.org` is connected, set up Lovable's built-in email infrastructure on a delegated subdomain (e.g. `notify.anewbeginningchurch.org`) and send two emails every time the homepage form is submitted:

**Email A — Visitor confirmation** (to the person filling out the form)
- Subject: "We're so glad you're coming — A New Beginning Church"
- Warm note from Pastor Mark, Sunday service time (10:30 AM), address with Google Maps link, what to expect (casual dress, coffee, kids welcome), a "reply to this email if you have questions" line.
- From: `hello@anewbeginningchurch.org`, reply-to: `anewbeginningrushville@gmail.com`.

**Email B — Church notification** (to `anewbeginningrushville@gmail.com`)
- Subject: "New visitor planning to visit — {name}"
- Full submission details (name, email, when, optional note), submission timestamp, a "reply to visitor" mailto link prefilled with the visitor's email.

### How it wires together

```text
Homepage form (PlanYourVisit.tsx)
   │  POSTs JSON to
   ▼
/api/public/plan-visit  (TSS server route)
   │  validates with Zod, then
   ├──► sendTransactionalEmail("visit-confirmation", visitor)
   └──► sendTransactionalEmail("visit-notification", church inbox)
   │
   ▼  enqueues into pgmq
process-email-queue cron → Lovable Emails → recipient inbox
```

### Steps

1. **Email domain** — open the email setup dialog so you can pick the sender subdomain on `anewbeginningchurch.org` and add the NS records. (Required prereq; nothing else proceeds until DNS is in.)
2. **Infrastructure** — provision the email queue, suppression list, unsubscribe tokens, and cron job.
3. **Templates** — scaffold the transactional email system, then add two branded React Email templates (`visit-confirmation`, `visit-notification`) styled to match the site (warm cream/green palette, serif display headings).
4. **Public submit route** — create `src/routes/api/public/plan-visit.ts` that validates input (name ≤ 100, email, when ≤ 200, note ≤ 1000), enqueues both emails with an idempotency key derived from email + timestamp, and returns `{ ok: true }`.
5. **Form** — convert `PlanYourVisit.tsx` to POST to that route with proper loading/error states, keep the existing "We've got you" success screen, and show an inline error if the request fails.
6. **Unsubscribe page** — scaffold the branded `/email/unsubscribe` page at whatever path the tool reports.

### Technical notes

- Public route at `/api/public/plan-visit` so it works without a Supabase session.
- Zod validation runs server-side; client validation is just for UX.
- Idempotency keys (`visit-confirm-{email}-{ts}` / `visit-notify-{email}-{ts}`) prevent duplicate sends on retry.
- Emails are queued, not sent inline — submission stays fast and retries are automatic.
- No database table is added; if you later want a visitor log, that's a follow-up.

### What I'll need from you mid-flow

- Complete the email domain setup dialog (pick subdomain, add NS records at the registrar). I'll pause and resume once that's done.
- Confirm the visitor email should come from `hello@anewbeginningchurch.org` (or tell me a different sender like `visit@…`).
