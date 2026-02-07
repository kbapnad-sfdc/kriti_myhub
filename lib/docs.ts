import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const CONTENT_DIR = join(process.cwd(), "content/docs");

export type DocPage = { title: string; slug: string };

export type DocsMeta = {
  title: string;
  pages: DocPage[];
};

export function getDocsMeta(): DocsMeta {
  const path = join(CONTENT_DIR, "meta.json");
  const json = readFileSync(path, "utf-8");
  return JSON.parse(json) as DocsMeta;
}

export function getDocBySlug(slug: string): { content: string; title: string; description?: string } {
  const fileSlug = slug === "index" || !slug ? "index" : slug;
  const filePath = join(CONTENT_DIR, `${fileSlug}.mdx`);
  const raw = readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return {
    content,
    title: (data.title as string) ?? "Docs",
    description: data.description as string | undefined,
  };
}

export function getAllDocSlugs(): string[][] {
  const meta = getDocsMeta();
  const slugs: string[][] = [];
  for (const p of meta.pages) {
    slugs.push(p.slug === "index" ? [] : p.slug.split("/"));
  }
  return slugs;
}
