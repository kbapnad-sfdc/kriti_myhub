"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bot, Image, Package, FileText, ExternalLink, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { loadSiteData, getCategoryCounts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "My agents": Bot,
  "My Lucid Charts": Image,
  "My packages": Package,
};

export function Sidebar() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const { site, assetCategories, resources } = loadSiteData();
  const counts = getCategoryCounts();
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex h-full w-64 flex-col border-r border-border bg-background p-4">
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            My Assets
          </p>
          <nav className="space-y-1">
            <Link
              href="/"
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors duration-200",
                !typeParam
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
              onClick={() => setOpen(false)}
            >
              <span>All</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {counts.All}
              </span>
            </Link>
            {assetCategories.map((cat) => {
              const Icon = categoryIcons[cat] ?? FileText;
              const isActive = typeParam === encodeURIComponent(cat);
              return (
                <Link
                  key={cat}
                  href={`/?type=${encodeURIComponent(cat)}`}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {cat}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {counts[cat] ?? 0}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Resources
          </p>
          <nav className="space-y-1">
            {resources.map((r) => {
              const isInternal = r.url.startsWith("/");
              const className = "flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-accent/50 hover:text-foreground";
              if (isInternal) {
                return (
                  <Link
                    key={r.label}
                    href={r.url}
                    className={className}
                    onClick={() => setOpen(false)}
                  >
                    <span>{r.label}</span>
                  </Link>
                );
              }
              return (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  onClick={() => setOpen(false)}
                >
                  <span>{r.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="mt-auto pt-6 text-xs text-muted-foreground">
        {site.footerText}
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block w-64 flex-shrink-0">{content}</div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-50">
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {content}
        </SheetContent>
      </Sheet>
    </>
  );
}
