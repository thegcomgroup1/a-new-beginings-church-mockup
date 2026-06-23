import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Youtube, ArrowRight, Calendar } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { recentSermons, youtubeChannelUrl, type SermonClip } from "@/config/sermons";

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
  component: WatchPage,
});

function WatchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Intro />
        <ChannelHero />
        <MoreMessages />
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

function ChannelHero() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="grid gap-0 md:grid-cols-5">
            <div
              className="aspect-video w-full bg-cover bg-center md:col-span-3 md:aspect-auto"
              style={{ backgroundImage: `url(${siteConfig.brand.heroMedia.imageSrc})` }}
              role="img"
              aria-label={siteConfig.brand.heroMedia.imageAlt}
            />
            <div className="flex flex-col justify-center p-8 md:col-span-2 md:p-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Youtube className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
                A New Beginning on YouTube
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sunday messages from Pastor Mark Mathews, posted to our channel
                after each service. Subscribe so you never miss one.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={youtubeChannelUrl} target="_blank" rel="noreferrer">
                    <Play className="h-4 w-4" aria-hidden />
                    Watch on YouTube
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={youtubeChannelUrl} target="_blank" rel="noreferrer">
                    Subscribe
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MoreMessages() {
  return (
    <section className="border-t border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">More messages</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
          We're working on getting more messages cataloged here. Until then, the
          full archive lives on YouTube.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentSermons.map((s) => (
            <SermonCard key={s.id} sermon={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SermonCard({ sermon }: { sermon: SermonClip }) {
  const target = sermon.youtubeId
    ? `https://www.youtube.com/watch?v=${sermon.youtubeId}`
    : youtubeChannelUrl;
  return (
    <a
      href={target}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-video w-full bg-gradient-to-br from-secondary/80 to-secondary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-background/90 text-secondary shadow-md transition-transform group-hover:scale-105">
            <Play className="h-6 w-6" aria-hidden />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" aria-hidden />
          {sermon.date}
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold">{sermon.title}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{sermon.speaker}</p>
        {sermon.blurb && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {sermon.blurb}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-secondary group-hover:underline">
          Watch on YouTube
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </a>
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