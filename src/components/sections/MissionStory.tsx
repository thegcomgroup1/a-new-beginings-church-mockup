import { siteConfig } from "@/config/site";

export function MissionStory() {
  return (
    <section id="about" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Who we are
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
              {siteConfig.church.tagline}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
              {siteConfig.church.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={siteConfig.brand.storyImageSrc}
                alt={siteConfig.brand.storyImageAlt}
                width={1280}
                height={1024}
                loading="lazy"
                className="aspect-[5/4] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
