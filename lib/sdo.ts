import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const CONTENT_DIR = join(process.cwd(), "content/sdo");

export type SdoPage = { title: string; slug: string };

export type SdoMeta = {
  title: string;
  pages: SdoPage[];
};

export function getSdoMeta(): SdoMeta {
  const path = join(CONTENT_DIR, "meta.json");
  const json = readFileSync(path, "utf-8");
  return JSON.parse(json) as SdoMeta;
}

export function getSdoDocBySlug(slug: string): { content: string; title: string; description?: string } {
  const fileSlug = slug === "index" || !slug ? "index" : slug;
  const filePath = join(CONTENT_DIR, `${fileSlug}.mdx`);
  const raw = readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return {
    content,
    title: (data.title as string) ?? "SDO",
    description: data.description as string | undefined,
  };
}

export function getAllSdoSlugs(): string[][] {
  const meta = getSdoMeta();
  const slugs: string[][] = [];
  for (const p of meta.pages) {
    if (p.slug === "features") continue; // features is a custom page
    slugs.push(p.slug === "index" ? [] : p.slug.split("/"));
  }
  return slugs;
}
