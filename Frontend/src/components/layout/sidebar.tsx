"use client";

import { AnimatePresence, motion } from "framer-motion";
import { History } from "lucide-react";

import { useUIStore } from "@/stores";
import { motionTransition } from "@/lib/motion";

export function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 260, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={motionTransition}
          className="relative z-10 h-full shrink-0 overflow-hidden border-r border-border bg-card"
        >
          <div className="flex h-full w-[260px] flex-col">
            <div className="flex items-center gap-2 px-4 py-4">
              <History className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                History
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="text-sm text-muted-foreground">
                No conversations yet
              </p>
              <p className="text-xs text-muted-foreground/70">
                Your past sessions will appear here.
              </p>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}