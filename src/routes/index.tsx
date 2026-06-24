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
