import { create } from "zustand";

import { MAX_SELECTED_MENTORS } from "@/constants";
import type { MentorId } from "@/types";

export type ConversationMessage = {
  id: string;
  mentorId: MentorId | null;
  role: "user" | "mentor";
  content: string;
  createdAt: string;
};

type ConversationStore = {
  conversationId: string;
  title: string;
  selectedMentorIds: MentorId[];
  activeMentorId: MentorId | null;
  messages: ConversationMessage[];
  isMentorModalOpen: boolean;
  setTitle: (title: string) => void;
  openMentorModal: () => void;
  closeMentorModal: () => void;
  toggleMentor: (id: MentorId) => void;
  setActiveMentor: (id: MentorId) => void;
  addMessage: (message: ConversationMessage) => void;
};

function createConversationId(): string {
  return `conv_${Math.random().toString(36).slice(2, 10)}`;
}

export const useConversationStore = create<ConversationStore>()((set) => ({
  conversationId: createConversationId(),
  title: "New Conversation",
  selectedMentorIds: [],
  activeMentorId: null,
  messages: [],
  isMentorModalOpen: false,

  setTitle: (title) => set({ title }),

  openMentorModal: () => set({ isMentorModalOpen: true }),
  closeMentorModal: () => set({ isMentorModalOpen: false }),

  toggleMentor: (id) =>
    set((state) => {
      const isSelected = state.selectedMentorIds.includes(id);

      if (isSelected) {
        return {
          selectedMentorIds: state.selectedMentorIds.filter(
            (mentorId) => mentorId !== id
          ),
          activeMentorId:
            state.activeMentorId === id ? null : state.activeMentorId,
        };
      }

      if (state.selectedMentorIds.length >= MAX_SELECTED_MENTORS) {
        return state;
      }

      return { selectedMentorIds: [...state.selectedMentorIds, id] };
    }),

  setActiveMentor: (id) => set({ activeMentorId: id }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));