"use client";

import { cn } from "@/lib/utils";

interface FilterPillsProps {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}

const neonByIndex = ["text-neon-blue", "text-neon-purple", "text-neon-lime", "text-neon-blue", "text-neon-purple"];

export function FilterPills({ tags, selected, onToggle }: FilterPillsProps) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => {
        const isSelected = selected.includes(tag);
        const neon = neonByIndex[i % neonByIndex.length];
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
              "border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
              isSelected
                ? `border-current ${neon} shadow-glow-sm bg-muted/80`
                : "border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:border-accent/50"
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
