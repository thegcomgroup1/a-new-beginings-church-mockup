import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Hero } from "@/components/sections/Hero";
import { TimesLocation } from "@/components/sections/TimesLocation";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { MissionStory } from "@/components/sections/MissionStory";
import { WelcomeVideo } from "@/components/sections/WelcomeVideo";
import { LifeOfChurch } from "@/components/sections/LifeOfChurch";
import { Ministries } from "@/components/sections/Ministries";
import { Events } from "@/components/sections/Events";
import { Sermons } from "@/components/sections/Sermons";
import { Give } from "@/components/sections/Give";
import { PlanYourVisit } from "@/components/sections/PlanYourVisit";
import { Footer } from "@/components/sections/Footer";
import { getLatestVideo } from "@/lib/youtube.functions";
import { siteConfig } from "@/config/site";

const latestVideoQuery = queryOptions({
  queryKey: ["latest-youtube-video"],
  queryFn: () => getLatestVideo(),
  staleTime: 10 * 60 * 1000,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A New Beginning Church — Rushville, IN" },
      {
        name: "description",
        content:
          "A Spirit-led church in Rushville, Indiana. Join us Sundays at 10:30 — come as you are, begin again.",
      },
      { property: "og:title", content: "A New Beginning Church — Rushville, IN" },
      {
        property: "og:description",
        content:
          "A Spirit-led church in Rushville, Indiana. Join us Sundays at 10:30 — come as you are, begin again.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://anewbeginningchurch.org/" },
    ],
    links: [{ rel: "canonical", href: "https://anewbeginningchurch.org/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Church",
          name: siteConfig.church.name,
          url: "https://anewbeginningchurch.org/",
          image: siteConfig.brand.heroMedia.imageSrc,
          telephone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "1024 S Old 3",
            addressLocality: "Rushville",
            addressRegion: "IN",
            postalCode: "46173",
            addressCountry: "US",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:30", closes: "12:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "17:30", closes: "19:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "18:00", closes: "19:30" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "18:00", closes: "19:30" },
          ],
          sameAs: siteConfig.contact.socials.map((s) => s.url),
        }),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(latestVideoQuery),
  component: Index,
});

function Index() {
  const { data: latestVideo } = useSuspenseQuery(latestVideoQuery);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Hero />
        <TimesLocation />
        <WhatToExpect />
        <MissionStory />
        <WelcomeVideo />
        <LifeOfChurch />
        <Ministries />
        <Events />
        <Sermons latestVideo={latestVideo} />
        <Give />
        <PlanYourVisit />
      </main>
      <Footer />
    </div>
  );
}
