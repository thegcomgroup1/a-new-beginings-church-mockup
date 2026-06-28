import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

export function Events() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              What's coming up
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
              Easy ways to drop in.
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline"
          >
            See all events
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {siteConfig.events.map((e) => (
            <article
              key={e.title}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Calendar className="h-4 w-4" aria-hidden />
                {e.date}
              </div>
              <h3 className="font-display text-xl font-semibold leading-snug">{e.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{e.blurb}</p>
              <Link
                to="/events"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline"
              >
                View event details
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
