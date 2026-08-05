import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-secondary">
              {siteConfig.church.name}
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A Spirit-filled, Spirit-led family in Rushville doing God's will on earth.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{siteConfig.service.address}</p>
            <p className="mt-1 text-sm text-muted-foreground">{siteConfig.contact.phone}</p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-1 inline-block text-sm text-muted-foreground hover:text-foreground"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <nav aria-label="Sitemap">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About &amp; leaders</Link></li>
              <li><Link to="/events" className="text-muted-foreground hover:text-foreground">Events</Link></li>
              <li><Link to="/watch" className="text-muted-foreground hover:text-foreground">Watch messages</Link></li>
              <li><Link to="/testimonies" className="text-muted-foreground hover:text-foreground">Testimonies</Link></li>
              <li><Link to="/prayer" className="text-muted-foreground hover:text-foreground">Prayer requests</Link></li>
              <li><Link to="/give" className="text-muted-foreground hover:text-foreground">Give</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link></li>
              <li>
                <Link to="/" hash="plan-your-visit" className="text-muted-foreground hover:text-foreground">
                  Plan your visit
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Social">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Follow along</p>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {year} {siteConfig.church.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
