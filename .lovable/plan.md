## Current state

The "Plan Your Visit" buttons in the header, hero, and other sections all link to `#plan-your-visit` on the home page, which scrolls to the form. That part works.

**The form itself does nothing.** On submit it just flips a local React state to show a "We've got you" thank-you message. No email is sent, nothing is stored, nobody at the church is notified. A real visitor filling it out would get a confirmation screen while the team never hears about it.

## What I'll do

Wire the form to Lovable's built-in email system so every submission:
1. Emails the church (notification with visitor's name, email, when they're coming, note).
2. Emails the visitor (friendly branded confirmation).
3. Keeps the existing "We've got you" success UI.

### Steps

1. **Set up email infrastructure** (one-time): provision the project's sender domain via the email setup dialog if not already done, then run the email infra + transactional scaffold.
2. **Add two branded email templates** in `src/lib/email-templates/`:
   - `visit-notification` — to the church inbox, with all form fields.
   - `visit-confirmation` — to the visitor, warm welcome, service times + address.
3. **Add a public action route** `src/routes/api/public/plan-visit.ts` that validates the form (Zod), then triggers both sends with idempotency keys. Public because the form is unauthenticated.
4. **Update `PlanYourVisit.tsx`** to POST to that route, show a loading state on the button, handle errors, and only flip to the success view after the request succeeds.

### One thing I need from you

What email address should receive the visit notifications? (e.g. pastor's email, office inbox.) I'll wire it in as the recipient for the notification template.