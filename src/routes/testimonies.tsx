import { createFileRoute, Link } from "@tanstack/react-router";
import { Youtube, ArrowRight, Quote, Play } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { testimonies, youtubeIdFromUrl, facebookEmbedUrl } from "@/config/testimonies";

const CANONICAL = "https://anewbeginningchurch.org/testimonies";

export const Route = createFileRoute("/testimonies")({
  head: () => ({
    meta: [
      { title: "Testimonies — A New Beginning Church" },
      {
        name: "description",
        content:
          "Real stories of healing, freedom and fresh starts from the people of A New Beginning Church in Rushville, Indiana.",
      },
      { property: "og:title", content: "Testimonies — A New Beginning Church" },
      {
        property: "og:description",
        content:
          "Watch testimony videos from our church family — God is still moving in Rushville.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: siteConfig.brand.heroMedia.imageSrc },
      { name: "twitter:image", content: siteConfig.brand.heroMedia.imageSrc },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: TestimoniesPage,
});

function TestimoniesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Intro />
        {testimonies.length > 0 ? <VideoGrid /> : <EmptyState />}
        <ShareCta />
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
          Testimonies
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          God is still writing new beginnings.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Healing, freedom, restored families, fresh starts — these are the
          stories of our church family, told in their own words.
        </p>
      </div>
    </section>
  );
}

function VideoGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
        {testimonies.map((t) => {
          const id = youtubeIdFromUrl(t.youtubeUrl);
          const fb = id ? null : facebookEmbedUrl(t.youtubeUrl);
          return (
            <article key={t.youtubeUrl}>
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {id ? (
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${id}`}
                      title={t.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                ) : fb ? (
                  <div className="aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src={fb}
                      title={t.title}
                      loading="lazy"
                      scrolling="no"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <a
                    href={t.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex aspect-video flex-col items-center justify-center gap-3 bg-muted transition-colors hover:bg-muted/70"
                  >
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                      <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
                    </span>
                    <span className="text-sm font-medium">Watch the video</span>
                  </a>
                )}
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold">{t.title}</h2>
              <p className="mt-1 text-sm font-medium text-primary">{t.name}</p>
              <p className="mt-3 text-base text-muted-foreground">{t.blurb}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Quote className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">
          Our first testimony videos are on the way.
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          We're recording them now. In the meantime, you can hear stories every
          Sunday at 10:30 AM — and if God has done something in your life, we'd
          love to record yours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <a href={`mailto:${siteConfig.contact.email}?subject=My%20testimony`}>
              Share your story
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={siteConfig.sermon.watchUrl} target="_blank" rel="noreferrer">
              <Youtube className="mr-2 h-4 w-4" aria-hidden />
              Watch on YouTube
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ShareCta() {
  return (
    <section className="border-t border-border/60 bg-muted/40 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Has God done something in your life?
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Tell us about it. We'll help you put it into words — and if you're
          willing, we'll record it so it can encourage someone else.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <a href={`mailto:${siteConfig.contact.email}?subject=My%20testimony`}>
              Email us your story
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/prayer">
              Need prayer instead?
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
