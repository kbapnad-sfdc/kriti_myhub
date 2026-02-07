import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocBySlug, getAllDocSlugs } from "@/lib/docs";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug: slug.length ? slug : undefined }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = slug?.length ? slug.join("/") : "index";
  try {
    const doc = getDocBySlug(slugStr);
    return {
      title: `${doc.title} | Docs`,
      description: doc.description,
    };
  } catch {
    return { title: "Docs" };
  }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = slug?.length ? slug.join("/") : "index";
  let doc;
  try {
    doc = getDocBySlug(slugStr);
  } catch {
    notFound();
  }
  return (
    <div className="pb-12">
      <MDXRemote source={doc.content} />
    </div>
  );
}
