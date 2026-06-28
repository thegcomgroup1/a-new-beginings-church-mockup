import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Ministries() {
  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Ministries
          </p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
            There's a place here for you and your family.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.ministries.map((m) => (
            <a
              key={m.name}
              href="#"
              className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold">{m.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{m.line}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary">
                View ministry details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
