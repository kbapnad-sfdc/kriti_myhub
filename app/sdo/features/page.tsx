import { FeatureTable } from "@/components/FeatureTable";
import sdoFeatures from "@/data/sdo-features.json";
import type { FeatureRow } from "@/components/FeatureTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | SDO",
  description: "Feature cheatsheet with links",
};

export default function SdoFeaturesPage() {
  const features = sdoFeatures as FeatureRow[];
  return (
    <div className="pb-12">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Features Cheatsheet
      </h1>
      <p className="mb-8 text-muted-foreground">
        Features with benefits and requirements. Use the link icon next to each feature for more details.
      </p>
      <FeatureTable features={features} />
    </div>
  );
}
