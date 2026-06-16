import {
  addDays,
  endOfMonth,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export type ChurchEvent = {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  location: string;
  blurb: string;
  featured?: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
};

type RecurringDef = {
  id: string;
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  hour: number;
  minute: number;
  durationMin: number;
  title: string;
  location: string;
  blurb: string;
};

const RUSHVILLE_ADDRESS = "1024 S Old 3, Rushville, IN 46173";

export const recurringEvents: RecurringDef[] = [
  {
    id: "sunday-worship",
    weekday: 0,
    hour: 10,
    minute: 30,
    durationMin: 90,
    title: "Sunday Worship",
    location: RUSHVILLE_ADDRESS,
    blurb:
      "Our main Sunday gathering — Spirit-led worship, prayer, and a message straight from God's Word. Come as you are.",
  },
  {
    id: "tuesday-gathering",
    weekday: 2,
    hour: 18,
    minute: 0,
    durationMin: 90,
    title: "Tuesday Evening Gathering",
    location: RUSHVILLE_ADDRESS,
    blurb:
      "A midweek gathering for worship, prayer, and the Word. Everyone welcome — bring a friend.",
  },
  {
    id: "thursday-gathering",
    weekday: 4,
    hour: 18,
    minute: 0,
    durationMin: 90,
    title: "Thursday Evening Gathering",
    location: RUSHVILLE_ADDRESS,
    blurb:
      "Press in midweek. Worship, prayer, and Spirit-led teaching as we grow together.",
  },
];

/** One-off / special events. Leave the array — the page renders a styled
 *  "Featured Event" slot from the next upcoming Sunday Worship when empty. */
export const specialEvents: ChurchEvent[] = [];

/** Expand recurring defs into concrete dates for the given visible month. */
export function expandRecurring(monthDate: Date): ChurchEvent[] {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  // Walk from the first calendar cell (Sun before month start) through end
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const out: ChurchEvent[] = [];

  for (let i = 0; i < 42; i++) {
    const day = addDays(gridStart, i);
    if (day < monthStart || day > monthEnd) continue;
    for (const r of recurringEvents) {
      if (day.getDay() !== r.weekday) continue;
      const start = new Date(day);
      start.setHours(r.hour, r.minute, 0, 0);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + r.durationMin);
      out.push({
        id: `${r.id}-${start.toISOString().slice(0, 10)}`,
        title: r.title,
        start,
        end,
        location: r.location,
        blurb: r.blurb,
      });
    }
  }
  return out;
}

/** All events in the visible month, including any specials. */
export function eventsForMonth(monthDate: Date): ChurchEvent[] {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const specials = specialEvents.filter(
    (e) => e.start >= monthStart && e.start <= monthEnd,
  );
  return [...specials, ...expandRecurring(monthDate)].sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );
}

/** Events that fall on a specific calendar day. */
export function eventsOnDay(day: Date, all: ChurchEvent[]): ChurchEvent[] {
  return all.filter((e) => isSameDay(e.start, day));
}

/** Choose the featured event: an explicit `featured` special wins, otherwise
 *  the next upcoming Sunday Worship from today. */
export function getFeaturedEvent(now: Date = new Date()): ChurchEvent {
  const explicit = specialEvents.find((e) => e.featured && e.start >= now);
  if (explicit) return explicit;

  // Find the next Sunday at/after today
  const next = new Date(now);
  next.setHours(10, 30, 0, 0);
  const daysUntilSunday = (7 - next.getDay()) % 7;
  if (daysUntilSunday === 0 && now.getHours() >= 12) {
    next.setDate(next.getDate() + 7);
  } else {
    next.setDate(next.getDate() + daysUntilSunday);
  }
  const end = new Date(next);
  end.setMinutes(end.getMinutes() + 90);

  return {
    id: `featured-sunday-${next.toISOString().slice(0, 10)}`,
    title: "Join Us This Sunday",
    start: next,
    end,
    location: RUSHVILLE_ADDRESS,
    blurb:
      "Come a few minutes early — we'll be watching for you. Spirit-led worship, prayer, and a message from the Word. Bring whoever, dress however.",
    featured: true,
    ctaLabel: "Plan your visit",
    ctaUrl: "/#visit",
  };
}