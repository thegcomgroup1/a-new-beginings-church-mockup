import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText, BookOpen, ArrowRight, Mail } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { resources, recommendedReading, type ResourceItem } from "@/config/resources";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — A New Beginning Church" },
      {
        name: "description",
        content:
          "Sermon notes, study guides, and recommended reading from A New Beginning Church in Rushville, IN.",
      },
      { property: "og:title", content: "Resources — A New Beginning Church" },
      {
        property: "og:description",
        content:
          "Sermon notes, study guides, and recommended reading to help you grow midweek.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: siteConfig.brand.heroMedia.imageSrc },
      { name: "twitter:image", content: siteConfig.brand.heroMedia.imageSrc },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Intro />
        <Downloads />
        <Reading />
        <ContactCta />
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
          Resources
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          Keep growing midweek.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Sermon notes, study guides, and recommended reading. We're adding more
          here as Pastor Mark and the team build them out.
        </p>
      </div>
    </section>
  );
}

function Downloads() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Sermon notes &amp; study guides
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceCard({ resource }: { resource: ResourceItem }) {
  const isComing = resource.fileUrl === "#";
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FileText className="h-5 w-5" aria-hidden />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {resource.kind}
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{resource.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {resource.description}
      </p>
      {isComing ? (
        <span className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-dashed border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Coming soon
        </span>
      ) : (
        <a
          href={resource.fileUrl}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary hover:underline"
        >
          <Download className="h-4 w-4" aria-hidden />
          Download
        </a>
      )}
    </article>
  );
}

function Reading() {
  return (
    <section className="border-t border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Recommended reading
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
          A short, opinionated list — for anyone wanting to dig in.
        </p>
        <ul className="mt-8 space-y-4">
          {recommendedReading.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="text-sm font-medium text-muted-foreground">{item.author}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Need something specific?
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          If there's a resource that'd help you in your walk, let us know — we'll work on adding it.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href={`mailto:${siteConfig.contact.email}`}>
              <Mail className="h-4 w-4" aria-hidden />
              Email the church
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/watch">
              Watch messages
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}