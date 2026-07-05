import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  eventsForMonth,
  eventsOnDay,
  getFeaturedEvent,
  expandRecurring,
  type ChurchEvent,
} from "@/config/events";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — A New Beginning Church" },
      {
        name: "description",
        content:
          "Upcoming gatherings, services, and special events at A New Beginning Church in Rushville, IN. Sundays at 10:30, plus weekly midweek services.",
      },
      { property: "og:title", content: "Events — A New Beginning Church" },
      {
        property: "og:description",
        content:
          "Upcoming gatherings, services, and special events at A New Beginning Church in Rushville, IN.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://anewbeginningchurch.org/events" },
    ],
    links: [{ rel: "canonical", href: "https://anewbeginningchurch.org/events" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          expandRecurring(new Date()).slice(0, 8).map((e) => ({
            "@context": "https://schema.org",
            "@type": "Event",
            name: e.title,
            startDate: e.start.toISOString(),
            endDate: e.end?.toISOString(),
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "A New Beginning Church",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1024 S Old 3",
                addressLocality: "Rushville",
                addressRegion: "IN",
                postalCode: "46173",
                addressCountry: "US",
              },
            },
            description: e.blurb,
            organizer: {
              "@type": "Organization",
              name: "A New Beginning Church",
              url: "https://anewbeginningchurch.org/",
            },
          })),
        ),
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <PageIntro />
        <FeaturedEvent />
        <MonthlyCalendar />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}

function PageIntro() {
  return (
    <section className="border-b border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          What's happening
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          Come gather with us.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          From Sunday worship to midweek gatherings, here's what's on at A New
          Beginning. All event times are Eastern Time.
        </p>
      </div>
    </section>
  );
}

function FeaturedEvent() {
  const event = useMemo(() => getFeaturedEvent(), []);
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-secondary">
          {event.eyebrow ?? "Featured Event"}
        </p>
        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="grid gap-0 md:grid-cols-2">
            <div
              className="aspect-[4/3] w-full bg-cover bg-center md:aspect-auto md:min-h-[360px]"
              style={{ backgroundImage: `url(${event.imageSrc ?? siteConfig.brand.heroMedia.imageSrc})` }}
              role="img"
              aria-label={event.imageAlt ?? siteConfig.brand.heroMedia.imageAlt}
            />
            <div className="flex flex-col justify-center p-8 md:p-10">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Calendar className="h-4 w-4" aria-hidden />
                {format(event.start, "EEEE, MMMM d, yyyy")}
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-snug md:text-4xl">
                {event.title}
              </h2>
              <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden />
                  {format(event.start, "h:mm a")}
                  {event.end ? ` – ${format(event.end, "h:mm a")}` : ""} ET
                </div>
                <div className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="mt-5 text-base leading-relaxed text-foreground/80">
                {event.blurb}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/" hash="visit">
                    {event.ctaLabel ?? "Plan your visit"}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={siteConfig.service.mapLinkUrl} target="_blank" rel="noreferrer">
                    Get directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function MonthlyCalendar() {
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const monthEvents = useMemo(() => eventsForMonth(visibleMonth), [visibleMonth]);

  const gridStart = startOfWeek(startOfMonth(visibleMonth), { weekStartsOn: 0 });
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) days.push(addDays(gridStart, i));
  // Trim trailing all-out-of-month week if it's fully outside the month
  while (days.length > 35 && !isSameMonth(days[days.length - 1], visibleMonth) &&
    !isSameMonth(days[days.length - 7], visibleMonth)) {
    days.splice(days.length - 7, 7);
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="border-t border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            {format(visibleMonth, "MMMM yyyy")}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
              aria-label="Previous month"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-foreground/80 hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setVisibleMonth(startOfMonth(new Date()))}
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground/80 hover:bg-accent"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
              aria-label="Next month"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-foreground/80 hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="grid grid-cols-7 border-b border-border bg-muted/40">
            {weekdays.map((w) => (
              <div
                key={w}
                className="px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs"
              >
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const inMonth = isSameMonth(day, visibleMonth);
              const today = isToday(day);
              const dayEvents = eventsOnDay(day, monthEvents);
              return (
                <div
                  key={day.toISOString()}
                  className={[
                    "min-h-[84px] border-b border-r border-border p-1.5 sm:min-h-[110px] sm:p-2",
                    inMonth ? "bg-card" : "bg-muted/20 text-muted-foreground/60",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={[
                        "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium sm:text-sm",
                        today ? "bg-primary text-primary-foreground" : "",
                      ].join(" ")}
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map((e) => (
                      <div
                        key={e.id}
                        title={`${e.title} · ${format(e.start, "h:mm a")}`}
                        className="truncate rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary sm:text-[11px]"
                      >
                        <span className="hidden sm:inline">{e.title}</span>
                        <span className="sm:hidden">•</span>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-muted-foreground">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* List view */}
        <div className="mt-12">
          <h3 className="font-display text-2xl font-semibold md:text-3xl">
            Events in {format(visibleMonth, "MMMM")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {monthEvents.length} gathering{monthEvents.length === 1 ? "" : "s"} this month.
          </p>
          <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
            {monthEvents.map((e) => (
              <EventListItem key={e.id} event={e} />
            ))}
            {monthEvents.length === 0 && (
              <li className="p-8 text-center text-sm text-muted-foreground">
                Nothing scheduled this month yet — check back soon.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

function EventListItem({ event }: { event: ChurchEvent }) {
  return (
    <li className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-6">
      <div className="flex w-20 shrink-0 flex-col items-center rounded-lg border border-border bg-muted/40 py-3 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          {format(event.start, "MMM")}
        </span>
        <span className="font-display text-3xl font-semibold leading-none text-foreground">
          {format(event.start, "d")}
        </span>
        <span className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
          {format(event.start, "EEE")}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="font-display text-xl font-semibold leading-snug">{event.title}</h4>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {format(event.start, "h:mm a")}
            {event.end ? ` – ${format(event.end, "h:mm a")}` : ""} ET
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {event.location}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">{event.blurb}</p>
      </div>
    </li>
  );
}

function ContactCta() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Have an event idea? Let's talk.
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          We love hearing what God is putting on people's hearts. Reach out and
          let us know how we can serve, host, or partner.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href={`mailto:${siteConfig.contact.email}`}>
              Email the church
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}