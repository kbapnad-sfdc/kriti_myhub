import { ExternalLink } from "lucide-react";

export type FeatureRow = {
  name: string;
  whyGreat: string;
  whatINeed: string;
  url?: string;
};

interface FeatureTableProps {
  title?: string;
  features: FeatureRow[];
}

export function FeatureTable({ title = "Features", features }: FeatureTableProps) {
  return (
    <div className="space-y-4">
      {title ? (
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      ) : null}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider text-foreground">
                Feature
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider text-foreground">
                Why is it so great?
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider text-foreground">
                What do I need?
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((row, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 align-top">
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{row.name}</span>
                    {row.url ? (
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`Link for ${row.name}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {row.whyGreat}
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {row.whatINeed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
