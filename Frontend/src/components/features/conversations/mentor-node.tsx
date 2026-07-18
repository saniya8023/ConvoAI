"use client";

import { motion } from "framer-motion";

import type { MentorDefinition, MentorSlotPosition } from "@/types";

type MentorNodeProps = {
  mentor: MentorDefinition;
  position: MentorSlotPosition;
  active: boolean;
  onSelect: () => void;
};

export function MentorNode({
  mentor,
  position,
  active,
  onSelect,
}: MentorNodeProps) {
  const Icon = mentor.icon;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`Select ${mentor.title}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ top: position.top, left: position.left }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 outline-none"
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
        className="flex size-16 items-center justify-center rounded-full border-2 transition-colors"
        style={{
          backgroundColor: active ? `${mentor.color}26` : `${mentor.color}1A`,
          borderColor: active ? mentor.color : `${mentor.color}40`,
          color: mentor.color,
        }}
      >
        <Icon className="size-7" />
      </motion.span>

      <span
        className={
          active
            ? "text-xs font-semibold text-foreground"
            : "text-xs font-medium text-foreground"
        }
      >
        {mentor.title}
      </span>
    </motion.button>
  );
}