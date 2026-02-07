import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getSdoDocBySlug, getAllSdoSlugs } from "@/lib/sdo";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateStaticParams() {
  const slugs = getAllSdoSlugs();
  return slugs.map((slug) => ({ slug: slug.length ? slug : undefined }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = slug?.length ? slug.join("/") : "index";
  try {
    const doc = getSdoDocBySlug(slugStr);
    return {
      title: `${doc.title} | SDO`,
      description: doc.description,
    };
  } catch {
    return { title: "SDO" };
  }
}

export default async function SdoDocPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = slug?.length ? slug.join("/") : "index";
  let doc;
  try {
    doc = getSdoDocBySlug(slugStr);
  } catch {
    notFound();
  }
  return (
    <div className="pb-12">
      <MDXRemote source={doc.content} />
    </div>
  );
}
