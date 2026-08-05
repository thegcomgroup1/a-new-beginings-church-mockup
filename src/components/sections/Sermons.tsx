import { Play, ArrowRight, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import type { LatestVideo as LatestVideoData } from "@/lib/youtube.functions";

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" });
}

export function Sermons({ latestVideo }: { latestVideo?: LatestVideoData | null }) {
  const { sermon } = siteConfig;
  const title = latestVideo?.title ?? sermon.title;
  const dateLabel = latestVideo ? formatDate(latestVideo.publishedAt) : sermon.date;
  const watchUrl = latestVideo?.url ?? sermon.watchUrl;
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
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-secondary-foreground/70">
                {dateLabel && <Calendar className="h-3.5 w-3.5" aria-hidden />}
                {dateLabel || sermon.series}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-secondary-foreground">
                {title}
              </h3>
              <p className="mt-1 text-sm text-secondary-foreground/75">{sermon.speaker}</p>
              <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/85">
                {sermon.summary}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a
                  href={watchUrl}
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

          {latestVideo ? (
            <div className="aspect-video overflow-hidden rounded-xl border border-white/15 bg-black/40 shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${latestVideo.videoId}?rel=0`}
                title={latestVideo.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
