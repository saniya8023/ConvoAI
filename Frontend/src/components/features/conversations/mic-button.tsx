"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export function MicButton() {
  return (
    <motion.button
      type="button"
      aria-label="Start recording"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="flex size-16 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-lg shadow-black/20 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Mic className="size-6" />
    </motion.button>
  );
}