import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Heart, Users, Sparkles, ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { leaders, type Leader } from "@/config/leaders";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — A New Beginning Church · Rushville, IN" },
      {
        name: "description",
        content:
          "Meet the family and the leaders of A New Beginning Church — a Spirit-filled, Spirit-led congregation in Rushville, Indiana.",
      },
      { property: "og:title", content: "About — A New Beginning Church" },
      {
        property: "og:description",
        content:
          "A Spirit-filled, Spirit-led family in Rushville doing God's will on earth. Meet our leaders and learn what we believe.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: siteConfig.brand.heroMedia.imageSrc },
      { name: "twitter:image", content: siteConfig.brand.heroMedia.imageSrc },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Intro />
        <Beliefs />
        <Leaders />
        <ClosingCta />
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
          About us
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          A church for Rushville.
        </h1>
        <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
          {siteConfig.church.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

const beliefs = [
  {
    icon: Sparkles,
    title: "Spirit-led",
    body: "Led by the Holy Spirit, alive in the Gifts of the Spirit as Paul described them in 1 Corinthians 12.",
  },
  {
    icon: BookOpen,
    title: "Rooted in Scripture",
    body: "We don't change the Word — we let the Word change us. Bible-centered teaching, every week.",
  },
  {
    icon: Heart,
    title: "Non-denominational",
    body: "No labels in the way of Jesus. Just a family of believers following Him together.",
  },
  {
    icon: Users,
    title: "Family-sized",
    body: "Small enough to know you by name. We pray for you, walk with you, and celebrate with you.",
  },
];

function Beliefs() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">What we believe</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
          Plain language, no fine print. Here's where we stand and what we make room for.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {beliefs.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Leaders() {
  return (
    <section id="leaders" className="border-t border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Meet our leaders
        </p>
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          The people you'll meet on Sunday.
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
          When you walk in, you won't slip through the cracks. Here are some of the
          faces who'll greet you, pray with you, and walk alongside you.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((l) => (
            <LeaderCard key={l.id} leader={l} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderCard({ leader }: { leader: Leader }) {
  const initials = leader.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        {leader.imageSrc ? (
          <img
            src={leader.imageSrc}
            alt={leader.imageAlt ?? `${leader.name}, ${leader.role}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
            <span className="font-display text-5xl font-semibold">{initials}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold">{leader.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{leader.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">{leader.blurb}</p>
      </div>
    </article>
  );
}

function ClosingCta() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Come see for yourself this Sunday.
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          We'll be looking for you at 10:30. Bring whoever, wear whatever, come with whatever you're carrying.
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