"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AssetCard } from "@/components/AssetCard";
import type { Asset } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AssetGridProps {
  assets: Asset[];
  activeCategory: string | null;
  categoryLabel: string;
}

export function AssetGrid({ assets, activeCategory, categoryLabel }: AssetGridProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{categoryLabel}</h2>
          <Badge variant="muted" className="font-normal">
            {assets.length}
          </Badge>
        </div>
        <div className="flex gap-1">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {assets.length === 0 ? (
        <p className="text-muted-foreground text-sm">No assets in this category yet.</p>
      ) : (
        <div
          className={cn(
            view === "grid"
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-3"
          )}
        >
          {assets.map((asset) => (
            <div
              key={asset.id}
              className={cn(view === "list" && "max-w-2xl")}
            >
              <AssetCard asset={asset} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
