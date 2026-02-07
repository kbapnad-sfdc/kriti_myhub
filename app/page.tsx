import { Suspense } from "react";
import { HomePage } from "@/components/HomePage";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
