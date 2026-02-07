"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { loadSiteData, getFilteredAssets } from "@/lib/data";
import { SearchBar } from "@/components/SearchBar";
import { AssetGrid } from "@/components/AssetGrid";

export function HomePage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const decodedType = typeParam ? decodeURIComponent(typeParam) : null;

  const { site, assetCategories } = loadSiteData();
  const [search, setSearch] = useState("");

  const assets = useMemo(
    () => getFilteredAssets(decodedType, search),
    [decodedType, search]
  );

  const categoryLabel = decodedType ?? "All Assets";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome to{" "}
          <span className="text-accent-foreground">{site.name}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">{site.subtitle}</p>
      </div>
      <SearchBar value={search} onChange={setSearch} />
      <AssetGrid
        assets={assets}
        activeCategory={decodedType}
        categoryLabel={categoryLabel}
      />
    </div>
  );
}
