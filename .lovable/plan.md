## Events page for A New Beginning

A dedicated `/events` route inspired by Eden Cove — featured event up top, then a monthly calendar grid, then a list view of what's on this month. Built around the weekly rhythms from their church sign, with a styled "Featured Event" slot ready for Mark to fill in.

### 1. New route — `src/routes/events.tsx`

Full route with `head()` metadata (title: "Events — A New Beginning Church"; description + OG tags). Sections, top to bottom:

1. **Page intro** — eyebrow "What's happening", H1 "Come gather with us.", short line about all times being Eastern.
2. **Featured Event hero** — large card with image, date, title, location, short blurb, and a "Plan your visit" CTA. Seeded with **"Join Us This Sunday — 10:30 AM Worship"** so it's never empty; easy to swap when Mark sends a special event.
3. **Monthly calendar grid** — 7-column Sun–Sat grid for the current month with prev/next month buttons. Days that have events show a colored chip with the event title (truncated). Today is highlighted. Built in React with `date-fns` (already common in shadcn projects — confirm/install).
4. **"Events in {Month}" list** — each event rendered as a row: date block on the left, title/time/location/blurb on the right, with a "Learn more" link (anchors to featured for now).
5. **Closing CTA** — "Have an event idea? Reach out." with a mailto to `anewbeginningrushville@gmail.com`.

### 2. Event data — `src/config/events.ts`

New file exporting a typed `events` array so content is easy to edit:

```ts
export type ChurchEvent = {
  id: string;
  title: string;
  start: string;   // ISO date+time
  end?: string;
  location: string;
  blurb: string;
  featured?: boolean;
  recurring?: "weekly-sun" | "weekly-tue" | "weekly-thu";
  ctaLabel?: string;
  ctaUrl?: string;
};
```

Seeded with three recurring entries (expanded into concrete dates by a helper):
- **Sunday Worship** — Sundays 10:30 AM, 1024 S Old 3, Rushville
- **Tuesday Gathering** — Tuesdays 6:00 PM
- **Thursday Gathering** — Thursdays 6:00 PM

Plus one **featured** placeholder pointing at the next upcoming Sunday so the hero is always populated. A helper `expandRecurring(monthDate)` returns concrete `Date` instances for the visible month — keeps the calendar/list in sync without hardcoding every week.

### 3. Navigation — `src/components/sections/StickyHeader.tsx`

Add **Events** to the `nav` array as a real route link (`<Link to="/events">`), placed between "About" and "Times & Location". On the home page, the existing `Events` section's "See all events" link is wired to `/events`.

### 4. Footer (light touch)

If the footer has a links column, add an "Events" entry pointing to `/events`. Otherwise no change.

### 5. Styling

Reuses existing tokens (`border`, `card`, `primary`, `secondary`, `muted-foreground`, `font-display`). Calendar chip uses `bg-primary/10 text-primary`. No new colors, no hardcoded hex. Mobile: calendar collapses to a compact view (smaller day cells, chip becomes a dot; tap a day to scroll the list to that day).

### Technical notes

- TanStack route file `src/routes/events.tsx` with `createFileRoute("/events")` — route tree auto-regenerates.
- Pure client-side rendering for the calendar (uses `useState` for visible month). Event data is static at build time, so SSR-safe.
- `date-fns` for month math, day formatting, and recurring-date expansion. Install if not already present.
- No backend, no auth, no DB — pure content/config change.

### Out of scope (for now)
- Event detail pages (each event links to the featured anchor for now).
- Registration/ticketing.
- Admin UI for editing events (still code-edited in `events.ts`).
