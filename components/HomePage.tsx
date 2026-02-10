"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { loadSiteData, getFilteredAssets, getAllTags } from "@/lib/data";
import { SearchBar } from "@/components/SearchBar";
import { FilterPills } from "@/components/FilterPills";
import { AssetGrid } from "@/components/AssetGrid";

export function HomePage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const decodedType = typeParam ? decodeURIComponent(typeParam) : null;

  const { site } = loadSiteData();
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <div className="space-y-8">
      {/* Hero with toolkit graphics */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-accent/5 px-6 py-8 dark:from-primary/20 dark:to-accent/10">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground sm:text-4xl">
            Hey, welcome to{" "}
            <span className="text-primary dark:text-accent">{site.name}</span>
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">{site.subtitle}</p>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        {/* Decorative graphics from Presentation Toolkit */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-40 opacity-90 dark:opacity-70 md:h-44 md:w-56">
          <Image
            src="/graphics/character.png"
            alt=""
            fill
            className="object-contain object-bottom-right"
            sizes="224px"
            priority
          />
        </div>
        <div className="pointer-events-none absolute right-24 top-4 h-20 w-24 opacity-80 dark:opacity-60 md:right-32 md:top-6">
          <Image
            src="/graphics/tree1.png"
            alt=""
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
      </div>

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

      <AssetGrid
        assets={assets}
        activeCategory={decodedType}
        categoryLabel={categoryLabel}
      />
    </div>
  );
}
