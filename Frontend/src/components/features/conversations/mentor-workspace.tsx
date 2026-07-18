"use client";

import { AnimatePresence, motion } from "framer-motion";

import { MentorNode } from "@/components/features/conversations/mentor-node";
import { MentorProfileCard } from "@/components/features/conversations/mentor-profile-card";
import { MessageComposer } from "@/components/features/conversations/message-composer";
import { MENTOR_SLOT_POSITIONS, MENTORS } from "@/constants";
import { useConversationStore } from "@/stores";

export function MentorWorkspace() {
  const selectedMentorIds = useConversationStore(
    (state) => state.selectedMentorIds
  );
  const activeMentorId = useConversationStore((state) => state.activeMentorId);
  const setActiveMentor = useConversationStore(
    (state) => state.setActiveMentor
  );

  if (selectedMentorIds.length === 0) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center px-6">
        <p className="max-w-sm text-center text-sm text-muted-foreground">
          Add mentors to start a conversation.
        </p>
      </div>
    );
  }

  const activeMentor =
    MENTORS.find((mentor) => mentor.id === activeMentorId) ?? null;

  return (
    <div className="relative h-full w-full flex-1">
      <div className="absolute inset-x-0 top-10 flex flex-col items-center gap-4 px-6">
        <AnimatePresence mode="wait">
          {activeMentor ? (
            <MentorProfileCard key={activeMentor.id} mentor={activeMentor} />
          ) : (
            <motion.p
              key="prompt"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-sm text-muted-foreground"
            >
              Select a mentor to begin.
            </motion.p>
          )}
        </AnimatePresence>

        {activeMentor && <MessageComposer mentorId={activeMentor.id} />}
      </div>

      <AnimatePresence>
        {selectedMentorIds.map((mentorId, index) => {
          const mentor = MENTORS.find((candidate) => candidate.id === mentorId);
          const position = MENTOR_SLOT_POSITIONS[index];

          if (!mentor || !position) return null;

          return (
            <MentorNode
              key={mentor.id}
              mentor={mentor}
              position={position}
              active={mentor.id === activeMentorId}
              onSelect={() => setActiveMentor(mentor.id)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}