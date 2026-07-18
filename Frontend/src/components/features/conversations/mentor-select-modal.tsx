"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MentorCard } from "@/components/features/conversations/mentor-card";
import { MAX_SELECTED_MENTORS, MENTORS } from "@/constants";
import { useMentorStore } from "@/stores";

export function MentorSelectModal() {
  const isModalOpen = useMentorStore((state) => state.isModalOpen);
  const selectedMentorIds = useMentorStore((state) => state.selectedMentorIds);
  const toggleMentor = useMentorStore((state) => state.toggleMentor);
  const closeModal = useMentorStore((state) => state.closeModal);

  const limitReached = selectedMentorIds.length >= MAX_SELECTED_MENTORS;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Select mentors"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/30"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Choose your mentors
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select up to {MAX_SELECTED_MENTORS} mentors for this
                  conversation.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Close"
                onClick={closeModal}
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {MENTORS.map((mentor) => {
                const selected = selectedMentorIds.includes(mentor.id);

                return (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    selected={selected}
                    disabled={!selected && limitReached}
                    onToggle={() => toggleMentor(mentor.id)}
                  />
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {selectedMentorIds.length} / {MAX_SELECTED_MENTORS} selected
              </span>

              <Button onClick={closeModal}>Done</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}