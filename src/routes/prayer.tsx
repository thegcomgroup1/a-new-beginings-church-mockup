import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, HeartHandshake, Lock, Phone } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

const CANONICAL = "https://anewbeginningchurch.org/prayer";

export const Route = createFileRoute("/prayer")({
  head: () => ({
    meta: [
      { title: "Prayer Requests — A New Beginning Church" },
      {
        name: "description",
        content:
          "Send a prayer request to the pastors and prayer team at A New Beginning Church in Rushville, Indiana. Confidential, and prayed over by name.",
      },
      { property: "og:title", content: "Prayer Requests — A New Beginning Church" },
      {
        property: "og:description",
        content:
          "Whatever you're carrying, you don't have to carry it alone. Send us your prayer request.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: siteConfig.brand.heroMedia.imageSrc },
      { name: "twitter:image", content: siteConfig.brand.heroMedia.imageSrc },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: PrayerPage,
});

function PrayerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Intro />
        <PrayerForm />
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
          Prayer
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          Let us pray with you.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Whatever you're carrying, you don't have to carry it alone. Send it to
          us and our pastors and prayer team will lift it up by name.
        </p>
        <p className="mt-4 max-w-2xl border-l-2 border-primary/40 pl-4 text-base italic text-muted-foreground">
          "Cast all your anxiety on him because he cares for you." — 1 Peter 5:7
        </p>
      </div>
    </section>
  );
}

function PrayerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      request: String(data.get("request") || "").trim(),
      isPrivate: data.get("isPrivate") === "on",
    };
    if (!payload.name || !payload.request) {
      setError("Please share your name and what you'd like prayer for.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/prayer-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please try again in a moment.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            How it works.
          </h2>
          <dl className="mt-8 space-y-6">
            <div className="flex items-start gap-3">
              <HeartHandshake className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
              <div>
                <dt className="text-base font-medium">Prayed over by name</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Your request goes straight to Pastor Mark, Tammy, and our
                  prayer team — not into a pile.
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
              <div>
                <dt className="text-base font-medium">Kept confidential</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Nothing is posted publicly. Mark it private and it stays with
                  the pastors only.
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
              <div>
                <dt className="text-base font-medium">Need to talk today?</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Call us at{" "}
                  <a href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, "")}`} className="font-medium text-foreground hover:underline">
                    {siteConfig.contact.phone}
                  </a>
                  . We also pray together Wednesday nights at 6:00 PM.
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          {submitted ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">
                We're praying for you.
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Your request is with our pastors and prayer team. If you left an
                email, a note is on its way to you now.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="text-sm font-medium">Your name</label>
                <input
                  id="name" name="name" type="text" required autoComplete="name" maxLength={100}
                  className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="email" name="email" type="email" autoComplete="email" maxLength={255}
                  className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40}
                  className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="request" className="text-sm font-medium">
                  What can we pray for?
                </label>
                <textarea
                  id="request" name="request" rows={5} required maxLength={2000}
                  className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <label htmlFor="isPrivate" className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  id="isPrivate" name="isPrivate" type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                />
                Keep this private — pastors only, please.
              </label>

              {error && (
                <p role="alert" className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send prayer request"}
              </button>
              <p className="text-xs text-muted-foreground">
                We'll only use your details to pray for you and follow up.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
