import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import { siteConfig } from "@/config/site";

export function PlanYourVisit() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      when: String(data.get("when") || "").trim(),
      note: String(data.get("note") || "").trim(),
    };
    if (!payload.name || !payload.email) {
      setError("Please share your name and email so we can reach back out.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/plan-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
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
    <section id="plan-your-visit" className="bg-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Plan your visit
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
              Let us know you're coming.
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              Tell us a little about you and we'll look out for you on Sunday. No pressure, no
              long forms, no follow-up sales pitch.
            </p>

            <dl className="mt-10 space-y-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Services</dt>
                  <dd className="mt-0.5 text-base font-medium">{siteConfig.service.timesShort}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Address</dt>
                  <dd className="mt-0.5 text-base font-medium">{siteConfig.service.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phone</dt>
                  <dd className="mt-0.5 text-base font-medium">{siteConfig.contact.phone}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</dt>
                  <dd className="mt-0.5 text-base font-medium">{siteConfig.contact.email}</dd>
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
                <h3 className="mt-5 font-display text-2xl font-semibold">We've got you.</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Someone from our team will reach out with a friendly note before Sunday. We're
                  looking forward to meeting you.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Your name</label>
                  <input
                    id="name" name="name" type="text" required autoComplete="name"
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email" name="email" type="email" required autoComplete="email"
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="when" className="text-sm font-medium">
                    When are you thinking of coming?
                  </label>
                  <input
                    id="when" name="when" type="text" placeholder="This Sunday, next weekend, not sure yet…"
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="note" className="text-sm font-medium">
                    Anything we should know? <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    id="note" name="note" rows={3}
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "I'm planning to visit"}
                </button>
                {error ? (
                  <p className="text-center text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : null}
                <p className="text-center text-xs text-muted-foreground">
                  We'll never share your info. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
