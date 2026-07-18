"use client";

import { motion } from "framer-motion";

import type { MentorDefinition, MentorSlotPosition } from "@/types";

type MentorNodeProps = {
  mentor: MentorDefinition;
  position: MentorSlotPosition;
};

export function MentorNode({ mentor, position }: MentorNodeProps) {
  const Icon = mentor.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ top: position.top, left: position.left }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
    >
      <span
        className="flex size-16 items-center justify-center rounded-full border"
        style={{
          backgroundColor: `${mentor.color}1A`,
          borderColor: `${mentor.color}40`,
          color: mentor.color,
        }}
      >
        <Icon className="size-7" />
      </span>

      <span className="text-xs font-medium text-foreground">
        {mentor.title}
      </span>
    </motion.div>
  );
}