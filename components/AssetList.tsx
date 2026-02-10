"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Asset } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface AssetListProps {
  assets: Asset[];
  categoryLabel: string;
  /** When true, only the list (or empty state) is shown; count/heading is shown by parent. */
  hideHeading?: boolean;
}

export function AssetList({ assets, categoryLabel, hideHeading }: AssetListProps) {
  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
        <div className="relative h-20 w-20 opacity-50">
          <Image
            src="/graphics/character2.png"
            alt=""
            fill
            className="object-contain"
            sizes="80px"
          />
        </div>
        <p className="text-muted-foreground text-sm">
          Nothing here yet — filter or search to find assets.
        </p>
      </div>
    );
  }

  return (
    <section className={hideHeading ? undefined : "space-y-3"}>
      {!hideHeading && (
        <p className="text-sm text-muted-foreground">
          {categoryLabel} · {assets.length} {assets.length === 1 ? "item" : "items"}
        </p>
      )}
      <ul className="divide-y divide-border rounded-lg border border-border bg-card">
        {assets.map((asset) => (
          <li key={asset.id}>
            <a
              href={asset.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:gap-4 sm:py-2.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              )}
            >
              <span className="min-w-0 flex-1 font-medium text-foreground">
                {asset.title}
              </span>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <Badge variant="secondary" className="text-xs font-normal">
                  {asset.type}
                </Badge>
                {asset.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
