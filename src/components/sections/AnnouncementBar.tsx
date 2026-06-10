import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  const a = siteConfig.announcement;
  if (!a?.enabled) return null;

  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 py-2 text-center text-sm sm:flex-row sm:gap-4 sm:px-6">
        <span className="font-medium">{a.text}</span>
        {a.ctaLabel && a.ctaUrl && (
          <a
            href={a.ctaUrl}
            className="inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold underline-offset-2 hover:underline"
          >
            {a.ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}