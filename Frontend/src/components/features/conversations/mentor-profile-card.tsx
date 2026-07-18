"use client";

import { motion } from "framer-motion";

import type { MentorDefinition } from "@/types";

type MentorProfileCardProps = {
  mentor: MentorDefinition;
};

export function MentorProfileCard({ mentor }: MentorProfileCardProps) {
  const Icon = mentor.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm"
    >
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${mentor.color}1A`, color: mentor.color }}
      >
        <Icon className="size-5" />
      </span>

      <div className="text-left">
        <p className="text-sm font-medium text-foreground">{mentor.title}</p>
        <p className="text-xs text-muted-foreground">{mentor.description}</p>
      </div>
    </motion.div>
  );
}