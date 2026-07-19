"use client";

import { motion } from "framer-motion";

import { MAX_SELECTED_MENTORS, MENTORS } from "@/constants";
import { useConversationStore } from "@/stores";
import type { MentorId } from "@/types";

/**
 * Lets the user jump directly from one mentor to another, in the same
 * shared conversation, without removing (X-ing out) the current mentor
 * first. Switching to a mentor that isn't in the workspace yet adds it
 * (respecting MAX_SELECTED_MENTORS) and makes it active; switching to one
 * already added just re-focuses it. The conversation itself is untouched
 * either way, since it lives in the store's shared `messages` list.
 */
export function MentorSwitcher() {
  const activeMentorId = useConversationStore((state) => state.activeMentorId);
  const selectedMentorIds = useConversationStore(
    (state) => state.selectedMentorIds
  );
  const setActiveMentor = useConversationStore((state) => state.setActiveMentor);
  const toggleMentor = useConversationStore((state) => state.toggleMentor);

  const limitReached = selectedMentorIds.length >= MAX_SELECTED_MENTORS;

  function handleSwitch(mentorId: MentorId) {
    if (mentorId === activeMentorId) return;

    if (!selectedMentorIds.includes(mentorId)) {
      if (limitReached) return;
      toggleMentor(mentorId);
    }

    setActiveMentor(mentorId);
  }

  return (
    <div
      role="tablist"
      aria-label="Switch mentor"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {MENTORS.map((mentor) => {
        const isActive = mentor.id === activeMentorId;
        const isSelected = selectedMentorIds.includes(mentor.id);
        const disabled = !isActive && !isSelected && limitReached;
        const Icon = mentor.icon;

        return (
          <motion.button
            key={mentor.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Switch to ${mentor.title}`}
            disabled={disabled}
            onClick={() => handleSwitch(mentor.id)}
            whileHover={disabled ? undefined : { scale: 1.04 }}
            whileTap={disabled ? undefined : { scale: 0.96 }}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              borderColor: isActive ? mentor.color : "var(--border)",
              backgroundColor: isActive ? `${mentor.color}1A` : "transparent",
              color: isActive ? mentor.color : "var(--muted-foreground)",
            }}
          >
            <Icon className="size-3.5" />
            {mentor.title}
          </motion.button>
        );
      })}
    </div>
  );
}