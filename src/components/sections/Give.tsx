import { Heart, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Give() {
  return (
    <section id="give" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Heart className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
          Support the ministry.
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          {siteConfig.give.line}
        </p>
        <a
          href={siteConfig.give.onlineUrl}
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-7 text-base font-medium text-primary-foreground shadow-sm transition-all hover:brightness-110"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Email us about giving
        </a>
      </div>
    </section>
  );
}
