"use client";

import { AnimatePresence } from "framer-motion";

import { MentorNode } from "@/components/features/conversations/mentor-node";
import { MENTOR_SLOT_POSITIONS, MENTORS } from "@/constants";
import { useMentorStore } from "@/stores";

export function MentorWorkspace() {
  const selectedMentorIds = useMentorStore((state) => state.selectedMentorIds);

  if (selectedMentorIds.length === 0) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center px-6">
        <p className="max-w-sm text-center text-sm text-muted-foreground">
          Add mentors to start a conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex-1">
      <AnimatePresence>
        {selectedMentorIds.map((mentorId, index) => {
          const mentor = MENTORS.find((candidate) => candidate.id === mentorId);
          const position = MENTOR_SLOT_POSITIONS[index];

          if (!mentor || !position) return null;

          return (
            <MentorNode key={mentor.id} mentor={mentor} position={position} />
          );
        })}
      </AnimatePresence>
    </div>
  );
}