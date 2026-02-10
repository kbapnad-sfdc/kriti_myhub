import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Asset } from "@/lib/data";

interface AssetCardProps {
  asset: Asset;
  bentoSize?: "large" | "medium" | "small";
}

const neonTagClasses = ["text-neon-blue", "text-neon-purple", "text-neon-lime", "text-neon-blue"];

export function AssetCard({ asset, bentoSize }: AssetCardProps) {
  return (
    <a
      href={asset.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-2xl"
    >
      <Card className="h-full min-h-full overflow-hidden rounded-2xl border-border bg-card text-card-foreground shadow-sm transition-all duration-200 glass-card hover:border-accent/30 hover:shadow-glow hover:shadow-accent/20">
        <div className={cn("relative w-full bg-muted", bentoSize === "large" ? "aspect-video min-h-[240px]" : "aspect-video")}>
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
                {asset.tags.map((t, i) => (
                  <Badge
                    key={t}
                    variant="muted"
                    className={cn("text-[10px] font-normal", neonTagClasses[i % neonTagClasses.length])}
                  >
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
