"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MentorDefinition } from "@/types";

type MentorCardProps = {
  mentor: MentorDefinition;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
};

export function MentorCard({
  mentor,
  selected,
  disabled,
  onToggle,
}: MentorCardProps) {
  const Icon = mentor.icon;

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-5 text-center transition-colors",
        "hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card",
        selected && "border-transparent ring-2 ring-offset-2 ring-offset-card"
      )}
      style={
        selected
          ? ({ "--tw-ring-color": mentor.color } as React.CSSProperties)
          : undefined
      }
    >
      {selected && (
        <span
          className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full"
          style={{ backgroundColor: mentor.color }}
        >
          <Check className="size-3 text-background" />
        </span>
      )}

      <span
        className="flex size-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${mentor.color}1A`, color: mentor.color }}
      >
        <Icon className="size-6" />
      </span>

      <span className="text-sm font-medium text-foreground">
        {mentor.title}
      </span>
    </button>
  );
}