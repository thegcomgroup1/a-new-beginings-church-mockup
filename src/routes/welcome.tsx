import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — A New Beginning Church" },
      {
        name: "description",
        content:
          "Welcome! Service times, directions, and how to plan your visit to A New Beginning Church in Rushville, Indiana.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Welcome,
});

/**
 * Standalone landing page for first-time visitors (NFC tag / QR code scans).
 * Mobile-first, single screen, no site chrome.
 */
function Welcome() {
  // Track the scan source (?src=chair | ?src=packet) without displaying it.
  useEffect(() => {
    const src = new URLSearchParams(window.location.search).get("src");
    if (src) {
      try {
        window.localStorage.setItem("welcome-visit-src", src);
      } catch {
        // Storage unavailable — silently ignore.
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-5 py-10 text-foreground sm:py-14">
      <div className="w-full max-w-md">
        {/* Logo */}
        <img
          src={siteConfig.brand.logoImageSrc}
          alt={`${siteConfig.church.name} logo`}
          className="mx-auto h-16 w-auto"
        />

        {/* Headline */}
        <h1 className="mt-6 text-center font-display text-3xl font-semibold leading-tight">
          Welcome to {siteConfig.church.name}
        </h1>
        <p className="mt-2 text-center text-base text-muted-foreground">
          Glad you're here. Here's everything you need.
        </p>

        {/* Service times card */}
        <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
            <div className="min-w-0">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                When we meet
              </h2>
              <p className="mt-1 text-lg font-semibold">
                {siteConfig.service.timesShort}
              </p>
              <ul className="mt-3 space-y-1.5">
                {siteConfig.service.timesLong.map((t, i) => (
                  <li key={i} className="text-base">
                    <span className="font-medium">{t.day}</span>
                    <span className="text-muted-foreground"> · {t.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Address card */}
        <div className="mt-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Where we are
              </h2>
              <p className="mt-1 text-lg font-semibold">{siteConfig.service.address}</p>
              <a
                href={siteConfig.service.mapLinkUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex h-11 items-center justify-center rounded-md border border-primary px-5 text-base font-medium text-primary transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Primary action */}
        <div className="mt-8 space-y-3">
          <Link
            to="/"
            hash="plan-your-visit"
            className="flex h-14 w-full items-center justify-center rounded-md bg-primary text-base font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Plan Your Visit
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
          </Link>
          <Link
            to="/give"
            className="flex h-14 w-full items-center justify-center rounded-md border border-border bg-card text-base font-semibold text-foreground transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Give
          </Link>
        </div>

        {/* Full site link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Visit our full website
          </Link>
        </div>
      </div>
    </div>
  );
}
