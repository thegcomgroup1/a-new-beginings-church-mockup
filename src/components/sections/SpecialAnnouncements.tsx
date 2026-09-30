import { CalendarDays, Megaphone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SpecialAnnouncements() {
  return (
    <section aria-labelledby="special-announcements" className="border-y border-border bg-secondary py-12 text-secondary-foreground md:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Megaphone className="h-5 w-5" aria-hidden />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground/70">Special announcement</p>
          <h2 id="special-announcements" className="mt-2 font-display text-3xl font-semibold text-secondary-foreground md:text-4xl">
            Homecoming Weekend
          </h2>
          <p className="mt-3 max-w-md leading-relaxed text-secondary-foreground/80">
            October 23–25, 2026 — a weekend of worship, fellowship, and celebrating what God has done.
          </p>
        </div>
        <div className="border-l border-secondary-foreground/20 pl-6 md:pl-8">
          <div className="space-y-5">
            <div className="flex gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <p><strong>Friday at 6:00 PM</strong><br /><span className="text-sm text-secondary-foreground/75">Service with Aaron, Julie Schilling, and family</span></p>
            </div>
            <div className="flex gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <p><strong>Sunday, 8:00–9:30 AM</strong><br /><span className="text-sm text-secondary-foreground/75">Free breakfast for everyone</span></p>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <p><strong>Sunday at 10:30 AM</strong><br /><span className="text-sm text-secondary-foreground/75">Anniversary celebration with Steve Grant</span></p>
            </div>
          </div>
          <Button asChild className="mt-7">
            <Link to="/events">See all event details</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}