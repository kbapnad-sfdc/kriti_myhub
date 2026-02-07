import siteData from "@/data/site.json";

export type SiteConfig = typeof siteData.site;
export type AssetCategory = string;
export type Resource = { label: string; url: string };
export type Asset = {
  id: string;
  title: string;
  type: string;
  url: string;
  description: string;
  thumbnail: string;
  tags: string[];
};

export interface SiteData {
  site: SiteConfig;
  assetCategories: AssetCategory[];
  resources: Resource[];
  assets: Asset[];
}

export function loadSiteData(): SiteData {
  return siteData as SiteData;
}

export function getFilteredAssets(
  type: string | null,
  search: string
): Asset[] {
  let list = siteData.assets as Asset[];

  if (type && type !== "All") {
    list = list.filter((a) => a.type === type);
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  return list;
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: (siteData.assets as Asset[]).length };
  for (const cat of siteData.assetCategories as string[]) {
    counts[cat] = (siteData.assets as Asset[]).filter((a) => a.type === cat).length;
  }
  return counts;
}
