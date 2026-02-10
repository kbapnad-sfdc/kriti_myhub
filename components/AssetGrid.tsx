"use client";

import Image from "next/image";
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
          <h2 className="text-lg font-semibold font-heading">{categoryLabel}</h2>
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
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
          <div className="relative h-24 w-24 opacity-60">
            <Image
              src="/graphics/character2.png"
              alt=""
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
          <p className="text-muted-foreground text-sm">Nothing here yet — I&apos;m still stocking the shelves. Watch this space.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 gap-4 auto-rows-[minmax(200px,auto)] sm:grid-cols-2 lg:grid-cols-4">
          {assets.map((asset, i) => {
            const size = asset.bentoSize ?? "medium";
            const span =
              size === "large"
                ? "col-span-2 row-span-2"
                : size === "medium"
                  ? "col-span-2 row-span-1 lg:col-span-2"
                  : "col-span-1 row-span-1";
            return (
              <div
                key={asset.id}
                className={cn(span, "animate-fade-in-up opacity-0 min-h-[200px]")}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <AssetCard asset={asset} bentoSize={size} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {assets.map((asset, i) => (
            <div
              key={asset.id}
              className={cn("max-w-2xl animate-fade-in-up opacity-0")}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <AssetCard asset={asset} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
