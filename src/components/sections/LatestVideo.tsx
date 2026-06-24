import { Play, Youtube, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LatestVideo as LatestVideoData } from "@/lib/youtube.functions";

const channelUrl = "https://www.youtube.com/@AnewbeginningRushville";

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function LatestVideo({ video }: { video: LatestVideoData | null }) {
  if (!video) return null;
  const dateLabel = formatDate(video.publishedAt);
  return (
    <section
      id="latest-message"
      className="border-b border-border/60 bg-muted/30 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary">
              <Youtube className="h-4 w-4" aria-hidden />
              Latest message
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              {video.title}
            </h2>
            {dateLabel && (
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" aria-hidden />
                {dateLabel}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={video.url} target="_blank" rel="noreferrer">
                <Play className="h-4 w-4" aria-hidden />
                Watch on YouTube
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={channelUrl} target="_blank" rel="noreferrer">
                Subscribe
              </a>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}