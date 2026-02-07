import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Asset } from "@/lib/data";

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <a
      href={asset.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-2xl"
    >
      <Card className="h-full overflow-hidden rounded-2xl border-border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-accent/10">
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={asset.thumbnail}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={asset.thumbnail.startsWith("http")}
          />
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 text-xs"
          >
            {asset.type}
          </Badge>
        </div>
        <CardHeader className="p-4 pb-2">
          <CardContent className="p-0 space-y-2">
            {asset.tags?.length ? (
              <div className="flex flex-wrap gap-1">
                {asset.tags.map((t) => (
                  <Badge key={t} variant="muted" className="text-[10px] font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
            ) : null}
            <h3 className="font-semibold leading-tight line-clamp-2">
              {asset.title}
            </h3>
            {asset.description ? (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {asset.description}
              </p>
            ) : null}
          </CardContent>
        </CardHeader>
      </Card>
    </a>
  );
}
