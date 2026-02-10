"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { loadSiteData, getFilteredAssets, getAllTags } from "@/lib/data";
import { SearchBar } from "@/components/SearchBar";
import { FilterPills } from "@/components/FilterPills";
import { AssetList } from "@/components/AssetList";
import { AssetGrid } from "@/components/AssetGrid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomePage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const decodedType = typeParam ? decodeURIComponent(typeParam) : null;

  const { site } = loadSiteData();
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [view, setView] = useState<"list" | "tiles">("list");

  const allTags = useMemo(() => getAllTags(), []);
  const assets = useMemo(
    () => getFilteredAssets(decodedType, search, selectedTags),
    [decodedType, search, selectedTags]
  );

  const categoryLabel = decodedType ?? "All Assets";

  function handleToggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-heading text-foreground">
          {site.name}
        </h1>
        <p className="mt-1 text-muted-foreground">{site.subtitle}</p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {allTags.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Filter by tag
          </p>
          <FilterPills
            tags={allTags}
            selected={selectedTags}
            onToggle={handleToggleTag}
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {categoryLabel} · {assets.length} {assets.length === 1 ? "item" : "items"}
        </p>
        <div className="flex gap-1" role="group" aria-label="View mode">
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("list")}
            aria-label="List view"
            title="List view"
            className={cn(view === "list" && "bg-accent/20 text-accent-foreground")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "tiles" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("tiles")}
            aria-label="Tiles view"
            title="Tiles view"
            className={cn(view === "tiles" && "bg-accent/20 text-accent-foreground")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <AssetList assets={assets} categoryLabel={categoryLabel} hideHeading />
      ) : (
        <AssetGrid
          assets={assets}
          activeCategory={decodedType}
          categoryLabel={categoryLabel}
          hideHeader
        />
      )}
    </div>
  );
}
