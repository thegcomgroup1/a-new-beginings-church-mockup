import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Mail, MapPin, HandCoins, ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const CANONICAL = "https://anewbeginningchurch.org/give";

export const Route = createFileRoute("/give")({
  head: () => ({
    meta: [
      { title: "Give — A New Beginning Church" },
      {
        name: "description",
        content:
          "Support the ministry of A New Beginning Church in Rushville, Indiana — give in person on Sunday, by mail, or reach out to us directly.",
      },
      { property: "og:title", content: "Give — A New Beginning Church" },
      {
        property: "og:description",
        content:
          "Every gift goes straight into ministry in Rushville. Here's how to give.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: siteConfig.brand.heroMedia.imageSrc },
      { name: "twitter:image", content: siteConfig.brand.heroMedia.imageSrc },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: GivePage,
});

function GivePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Intro />
        <Ways />
        <WhereItGoes />
      </main>
      <Footer />
    </div>
  );
}

function Intro() {
  const { onlineEnabled, onlineGivingUrl } = siteConfig.give;
  return (
    <section className="border-b border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Give
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          Support the ministry.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Giving here isn't a transaction — it's worship. Every gift stays close
          to home, funding ministry, outreach, and care for people in Rushville.
        </p>
        <p className="mt-4 max-w-2xl border-l-2 border-primary/40 pl-4 text-base italic text-muted-foreground">
          "Each of you should give what you have decided in your heart to give…
          for God loves a cheerful giver." — 2 Corinthians 9:7
        </p>
        {onlineEnabled && onlineGivingUrl ? (
          <Button asChild size="lg" className="mt-8">
            <a href={onlineGivingUrl} target="_blank" rel="noreferrer">
              <HandCoins className="mr-2 h-4 w-4" aria-hidden />
              Give online
            </a>
          </Button>
        ) : null}
      </div>
    </section>
  );
}

function Ways() {
  const { onlineEnabled, onlineGivingUrl, mailingAddress } = siteConfig.give;
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Ways to give.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">In person</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Drop your gift in the offering on Sunday at 10:30 AM, or hand it to
              any of our leaders. Cash or check — checks payable to{" "}
              {siteConfig.church.name}.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">By mail</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Send a check to:
            </p>
            <p className="mt-2 text-sm font-medium">{mailingAddress}</p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              {onlineEnabled && onlineGivingUrl ? (
                <HandCoins className="h-5 w-5" aria-hidden />
              ) : (
                <Mail className="h-5 w-5" aria-hidden />
              )}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">
              {onlineEnabled && onlineGivingUrl ? "Online" : "Ask us"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {onlineEnabled && onlineGivingUrl
                ? "Give securely online any time — one-time or recurring."
                : "Online giving is on the way. Until then, reach out and we'll walk you through the best way to give."}
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              {onlineEnabled && onlineGivingUrl ? (
                <a href={onlineGivingUrl} target="_blank" rel="noreferrer">
                  Give online
                </a>
              ) : (
                <a href={`mailto:${siteConfig.contact.email}?subject=Giving`}>
                  Email us about giving
                </a>
              )}
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}

function WhereItGoes() {
  return (
    <section className="border-t border-border/60 bg-muted/40 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Where your giving goes.
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Keeping the doors open and the lights on, supporting our pastors,
          funding outreach like the tent revival, and helping neighbors in
          Rushville who are walking through a hard season.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/events">
              See what's happening
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/prayer">Need prayer?</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
