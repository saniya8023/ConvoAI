"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

import type { MentorDefinition } from "@/types";

type MentorProfileCardProps = {
  mentor: MentorDefinition;
  onRemove: () => void;
};

export function MentorProfileCard({ mentor, onRemove }: MentorProfileCardProps) {
  const Icon = mentor.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative flex w-full max-w-md items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm"
    >
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${mentor.color}1A`, color: mentor.color }}
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-medium text-foreground">
          {mentor.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {mentor.description}
        </p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${mentor.title}`}
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="size-4" />
      </button>
    </motion.div>
  );
}