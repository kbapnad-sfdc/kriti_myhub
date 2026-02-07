"use client";

import { Cloud, Sun, Moon, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadSiteData } from "@/lib/data";
import { useEffect, useState } from "react";

export function Header() {
  const { site } = loadSiteData();
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) setDark(stored === "dark");
    else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) setDark(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [mounted, dark]);

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background px-6">
      <div className="flex items-center gap-2">
        <Cloud className="h-6 w-6 text-foreground" />
        <span className="font-semibold text-foreground">{site.name}</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDark((d) => !d)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mounted && dark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
    </header>
  );
}
