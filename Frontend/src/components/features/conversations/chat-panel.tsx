"use client";

import { AnimatePresence, motion } from "framer-motion";

import { MentorProfileCard } from "@/components/features/conversations/mentor-profile-card";
import { MentorSwitcher } from "@/components/features/conversations/mentor-switcher";
import { MessageComposer } from "@/components/features/conversations/message-composer";
import { motionTransition } from "@/lib/motion";
import type { MentorDefinition } from "@/types";

type ChatPanelProps = {
  activeMentor: MentorDefinition | null;
  onRemoveActiveMentor: () => void;
};

/**
 * The Conversation Hall's chat surface: docked beside the mentor list
 * (rendered as a fixed-width column in MentorWorkspace), not a
 * centered/floating window. It stays mounted for as long as at least one
 * mentor is selected.
 *
 * There is exactly one shared conversation and one composer for the whole
 * room — clicking a mentor node or the MentorSwitcher only changes which
 * mentor's profile card is shown up top for reference; it no longer swaps
 * in a different "chat window" or gates the composer, since every
 * selected mentor already takes part in the same thread automatically.
 * The panel only disappears when the workspace has no mentors left, and a
 * given mentor only leaves the room when the user explicitly presses its
 * X button (handled by the parent via onRemoveActiveMentor).
 */
export function ChatPanel({ activeMentor, onRemoveActiveMentor }: ChatPanelProps) {
  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 380, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={motionTransition}
      className="relative z-10 flex h-full shrink-0 flex-col overflow-hidden border-l border-border bg-card"
    >
      <div className="flex h-full w-[380px] flex-col gap-4 p-4">
        <MentorSwitcher />

        <AnimatePresence mode="wait">
          {activeMentor ? (
            <motion.div
              key={activeMentor.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <MentorProfileCard
                mentor={activeMentor}
                onRemove={onRemoveActiveMentor}
              />
            </motion.div>
          ) : (
            <motion.p
              key="prompt"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-center text-sm text-muted-foreground"
            >
              Every mentor in the room replies here automatically.
            </motion.p>
          )}
        </AnimatePresence>

        <MessageComposer />
      </div>
    </motion.aside>
  );
}