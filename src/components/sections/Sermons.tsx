import { Play, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

export function Sermons() {
  const { sermon } = siteConfig;
  return (
    <section className="bg-secondary py-20 text-secondary-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary-foreground/70">
              Latest message
            </p>
            <h2 className="font-display text-3xl font-semibold text-secondary-foreground md:text-4xl lg:text-5xl">
              Listen in before you walk in.
            </h2>
            <p className="mt-4 text-base text-secondary-foreground/80 md:text-lg">
              You don't have to wonder what we teach. Sample a recent message and decide for yourself.
            </p>

            <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-secondary-foreground/70">
                {sermon.series} · {sermon.date}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-secondary-foreground">
                {sermon.title}
              </h3>
              <p className="mt-1 text-sm text-secondary-foreground/75">{sermon.speaker}</p>
              <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/85">
                {sermon.summary}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a
                  href={sermon.watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                >
                  <Play className="h-4 w-4" aria-hidden />
                  Watch on YouTube
                </a>
                <Link
                  to="/watch"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary-foreground/90 hover:text-secondary-foreground"
                >
                  See more messages
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-xl border border-white/15 bg-black/40">
            <div className="flex h-full w-full items-center justify-center text-secondary-foreground/60">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                  <Play className="h-7 w-7" aria-hidden />
                </div>
                <p className="mt-4 text-sm">[Sermon video embed]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
