"use client";

import { AnimatePresence } from "framer-motion";

import { ChatPanel } from "@/components/features/conversations/chat-panel";
import { MentorNode } from "@/components/features/conversations/mentor-node";
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
  const removeMentor = useConversationStore((state) => state.removeMentor);

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
    <div className="relative flex h-full w-full flex-1 overflow-hidden">
      {/* Mentor list / graph. The chat panel below is docked beside this
          area rather than floating on top of it, and stays mounted
          regardless of which mentor node is clicked. */}
      <div className="relative h-full flex-1 overflow-hidden">
        <AnimatePresence>
          {selectedMentorIds.map((mentorId, index) => {
            const mentor = MENTORS.find(
              (candidate) => candidate.id === mentorId
            );
            const position = MENTOR_SLOT_POSITIONS[index];

            if (!mentor || !position) return null;

            return (
              <MentorNode
                key={mentor.id}
                mentor={mentor}
                position={position}
                active={mentor.id === activeMentorId}
                onSelect={() => setActiveMentor(mentor.id)}
                onRemove={() => removeMentor(mentor.id)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <ChatPanel
        activeMentor={activeMentor}
        onRemoveActiveMentor={() => {
          if (activeMentor) removeMentor(activeMentor.id);
        }}
      />
    </div>
  );
}