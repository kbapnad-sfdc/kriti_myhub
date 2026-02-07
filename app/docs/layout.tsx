import Link from "next/link";
import { getDocsMeta } from "@/lib/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const meta = getDocsMeta();
  return (
    <div className="flex gap-8">
      <aside className="w-56 flex-shrink-0 border-r border-border pr-6">
        <nav className="sticky top-6 space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {meta.title}
          </p>
          {meta.pages.map((page) => (
            <Link
              key={page.slug}
              href={page.slug === "index" ? "/docs" : `/docs/${page.slug}`}
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="min-w-0 flex-1 prose prose-invert dark:prose-invert max-w-none">
        {children}
      </article>
    </div>
  );
}
