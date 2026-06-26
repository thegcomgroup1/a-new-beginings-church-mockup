## Plan Your Visit — Email Sequence

Wire the homepage "Plan Your Visit" form to send two real emails on submit, then send a test to confirm delivery end-to-end.

### What gets built

**1. Email templates** (React Email, under `src/lib/email-templates/`)

- `plan-visit-visitor.tsx` — warm confirmation to the visitor.
  - Subject: "We're so glad you're planning to visit — A New Beginning Church"
  - Greets by first name, restates service time (Sun 10:30am) + address, sets expectations ("look for someone at the door, no pressure"), signed from Pastor Mark Mathews.
- `plan-visit-notify.tsx` — internal notification to the church.
  - Subject: "New visitor planning to attend — {name}"
  - Sent to `anewbeginningrushville@gmail.com` with name, email, when-they're-coming, and any notes.
- Both registered in `src/lib/email-templates/registry.ts`.

**2. Public submission endpoint**

- New file route `src/routes/api/public/plan-visit.ts` (POST).
- Validates body with zod: `name` (1–100), `email` (valid, ≤255), `when` (≤200, optional), `note` (≤1000, optional).
- Generates one `submissionId` and enqueues both emails via internal call to `/lovable/email/transactional/send` (service-role auth) with idempotency keys `plan-visit-visitor-{id}` and `plan-visit-notify-{id}`.
- Returns `{ ok: true }` or `{ ok: false, error }`.
- CORS not needed (same-origin).

**3. Form wiring** (`src/components/sections/PlanYourVisit.tsx`)

- Convert `onSubmit` to async: POST JSON to `/api/public/plan-visit`.
- Loading state (button shows "Sending…", disabled).
- On success: existing success panel.
- On error: inline error message + keep form values so the user can retry.
- Client-side zod validation mirroring server schema.

**4. Verify delivery**

- After deploy, POST a test payload to `/api/public/plan-visit` with my email of choice — confirm by:
  1. HTTP 200 response.
  2. Two rows in `email_send_log` with status `sent` (one per template).
- Report results back to you with the actual log rows.

### Technical notes

- Templates follow the existing `TemplateEntry` shape — white body, brand-consistent inline styles pulled from `src/styles.css`, no unsubscribe footer (auto-appended).
- The notify email's recipient is hardcoded to `siteConfig.contact.email` server-side, not taken from the form — prevents abuse.
- Idempotency keys ensure double-submits don't double-send.
- Suppression list is checked automatically by the send route.

### What I need from you

Nothing — domain is verified, infra is provisioned, packages are installed. Approving this plan kicks off implementation + the live test send.

### Confirm before I test

Which email should I use for the test submission? (I'll use it as the "visitor" address; the church notification always goes to `anewbeginningrushville@gmail.com`.)