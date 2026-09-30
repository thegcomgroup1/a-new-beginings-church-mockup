import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText, BookOpen, ArrowRight, Mail, CalendarDays, MapPin } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  resources,
  resourceCategories,
  recommendedReading,
  type ResourceItem,
} from "@/config/resources";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — A New Beginning Church" },
      {
        name: "description",
        content:
          "Prayer, offering, Bible study, evangelism, and relationship resources from A New Beginning Church in Rushville, IN.",
      },
      { property: "og:title", content: "Resources — A New Beginning Church" },
      {
        property: "og:description",
        content:
          "Sermon notes, study guides, and recommended reading to help you grow midweek.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <NewBelieversClass />
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
          Practical tools for living out our five pillars of faith — Prayer,
          Offering, Word of God, Evangelism, and Relationships.
        </p>
      </div>
    </section>
  );
}

function Downloads() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our five pillars of faith</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">P.O.W.E.R. resources</h2>
        <div className="mt-10 space-y-14">
          {resourceCategories.map((category) => {
            const categoryResources = resources.filter((resource) => resource.category === category.name);
            return (
              <section key={category.name} id={category.name.toLowerCase().replaceAll(" ", "-")} className="scroll-mt-28 border-t border-border pt-8">
                <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-xl font-semibold text-primary-foreground">{category.letter}</span>
                      <h3 className="font-display text-2xl font-semibold md:text-3xl">{category.name}</h3>
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                  </div>
                  {categoryResources.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      {categoryResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
                    </div>
                  ) : (
                    <div className="flex min-h-36 items-center border-l-2 border-primary/20 pl-6">
                      <div>
                        <p className="font-display text-xl font-semibold">Resources are on the way.</p>
                        <p className="mt-1 text-sm text-muted-foreground">The church is preparing materials for this pillar. Check back soon.</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NewBelieversClass() {
  const classResource = resources.find((resource) => resource.classResource);
  return (
    <section className="border-b border-border bg-secondary py-14 text-secondary-foreground md:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground/70">Starting October 6</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-secondary-foreground md:text-4xl">New Believers Class</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-secondary-foreground/80">
            Join us in person every Tuesday at 6:00 PM for a welcoming class built to help new believers grow in faith. Meetings are held in the sanctuary unless otherwise noted in church announcements.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-secondary-foreground/80">
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" aria-hidden />Tuesdays at 6:00 PM</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" aria-hidden />In person · Sanctuary</span>
          </div>
        </div>
        {classResource && (
          <Button asChild>
            <a href={classResource.fileUrl} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" aria-hidden />
              Open class resource
            </a>
          </Button>
        )}
      </div>
    </section>
  );
}

function ResourceCard({ resource }: { resource: ResourceItem }) {
  const isComing = resource.fileUrl === "#";
  return (
    <article className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm">
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
        <Button asChild variant="outline" className="mt-5 self-start">
          <a href={resource.fileUrl} target="_blank" rel="noreferrer">
            <Download className="h-4 w-4" aria-hidden />
            Open PDF
          </a>
        </Button>
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