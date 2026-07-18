"use client";

import { AnimatePresence, motion } from "framer-motion";
import { StickyNote } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { useUIStore } from "@/stores";
import { motionTransition } from "@/lib/motion";

export function NotesPanel() {
  const notesOpen = useUIStore((state) => state.notesOpen);

  return (
    <AnimatePresence initial={false}>
      {notesOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={motionTransition}
          className="relative z-10 h-full shrink-0 overflow-hidden border-l border-border bg-card"
        >
          <div className="flex h-full w-[300px] flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <StickyNote className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Notes
              </span>
            </div>

            <Textarea
              placeholder="Type your notes here..."
              className="flex-1"
            />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}