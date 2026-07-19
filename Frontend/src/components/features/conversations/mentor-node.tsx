"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

import type { MentorDefinition, MentorSlotPosition } from "@/types";

type MentorNodeProps = {
  mentor: MentorDefinition;
  position: MentorSlotPosition;
  active: boolean;
  onSelect: () => void;
  onRemove: () => void;
};

export function MentorNode({
  mentor,
  position,
  active,
  onSelect,
  onRemove,
}: MentorNodeProps) {
  const Icon = mentor.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ top: position.top, left: position.left }}
      className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
    >
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${mentor.title}`}
        className="absolute -top-1.5 -right-1.5 z-10 flex size-5 items-center justify-center rounded-full border border-border bg-card text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100"
      >
        <X className="size-3" />
      </button>

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        aria-label={`Select ${mentor.title}`}
        className="flex flex-col items-center gap-2 outline-none"
      >
        <motion.span
          animate={
            active
              ? {
                  boxShadow: [
                    `0 0 0 0 ${mentor.color}4D`,
                    `0 0 0 10px ${mentor.color}00`,
                  ],
                }
              : { boxShadow: `0 0 0 0 ${mentor.color}00` }
          }
          transition={
            active
              ? { duration: 1.6, repeat: Infinity, ease: "easeOut" }
              : { duration: 0.2 }
          }
          className="flex size-14 items-center justify-center rounded-full border-2 transition-colors sm:size-16"
          style={{
            backgroundColor: active ? `${mentor.color}26` : `${mentor.color}1A`,
            borderColor: active ? mentor.color : `${mentor.color}40`,
            color: mentor.color,
          }}
        >
          <Icon className="size-6 sm:size-7" />
        </motion.span>

        <span
          className={
            active
              ? "max-w-20 truncate text-xs font-semibold text-foreground"
              : "max-w-20 truncate text-xs font-medium text-foreground"
          }
        >
          {mentor.title}
        </span>
      </button>
    </motion.div>
  );
}