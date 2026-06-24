import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Youtube } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { LatestVideo } from "@/components/sections/LatestVideo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { youtubeChannelUrl } from "@/config/sermons";
import { getLatestVideo } from "@/lib/youtube.functions";

const latestVideoQuery = queryOptions({
  queryKey: ["latest-youtube-video"],
  queryFn: () => getLatestVideo(),
  staleTime: 10 * 60 * 1000,
});

export const Route = createFileRoute("/watch")({
  head: () => ({
    meta: [
      { title: "Watch — A New Beginning Church" },
      {
        name: "description",
        content:
          "Watch the latest sermons and Sunday messages from Pastor Mark Mathews and A New Beginning Church on YouTube.",
      },
      { property: "og:title", content: "Watch — A New Beginning Church" },
      {
        property: "og:description",
        content:
          "Catch the latest Sunday messages on YouTube — Spirit-led, straight from the Word.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: siteConfig.brand.heroMedia.imageSrc },
      { name: "twitter:image", content: siteConfig.brand.heroMedia.imageSrc },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(latestVideoQuery),
  component: WatchPage,
});

function WatchPage() {
  const { data: latestVideo } = useSuspenseQuery(latestVideoQuery);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Intro />
        <LatestVideo video={latestVideo} />
        <ArchiveCta />
        <ServiceCta />
      </main>
      <Footer />
    </div>
  );
}

function Intro() {
  return (
    <section className="border-b border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Watch messages
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          Listen in before you walk in.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          You don't have to wonder what we teach. Catch our most recent Sunday
          messages on YouTube and decide for yourself.
        </p>
      </div>
    </section>
  );
}


function ArchiveCta() {
  return (
    <section className="border-t border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          The full archive lives on YouTube.
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          We keep this page light and fast — head to our channel for every Sunday
          message, special service, and past teaching.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href={youtubeChannelUrl} target="_blank" rel="noreferrer">
              <Youtube className="h-4 w-4" aria-hidden />
              Watch on YouTube
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href={`${youtubeChannelUrl}?sub_confirmation=1`}
              target="_blank"
              rel="noreferrer"
            >
              Subscribe
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceCta() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Even better in person.
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Join us this Sunday at 10:30. There's a seat saved for you.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/" hash="plan-your-visit">
              Plan your visit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/events">See what's happening</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}