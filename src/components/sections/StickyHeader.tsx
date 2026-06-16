import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { PlanYourVisitButton } from "@/components/PlanYourVisitButton";
import { siteConfig } from "@/config/site";

type NavItem =
  | { label: string; hash: string; to?: undefined }
  | { label: string; to: "/events"; hash?: undefined };

const nav: NavItem[] = [
  { label: "New Here", hash: "new-here" },
  { label: "About", hash: "about" },
  { label: "Events", to: "/events" },
  { label: "Times & Location", hash: "times" },
  { label: "Give", hash: "give" },
];

export function StickyHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" hash="top" className="flex items-center gap-2">
          {siteConfig.brand.logoImageSrc ? (
            <img
              src={siteConfig.brand.logoImageSrc}
              alt={siteConfig.brand.logoText}
              className="h-9 w-auto"
            />
          ) : (
            <span className="font-display text-xl font-semibold text-secondary">
              {siteConfig.brand.logoText}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                to="/"
                hash={item.hash}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <PlanYourVisitButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-muted md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {nav.map((item) =>
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  to="/"
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
