import { create } from "zustand";

import { MAX_SELECTED_MENTORS } from "@/constants";
import type { MentorId } from "@/types";

type MentorStore = {
  selectedMentorIds: MentorId[];
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleMentor: (id: MentorId) => void;
};

export const useMentorStore = create<MentorStore>()((set) => ({
  selectedMentorIds: [],
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleMentor: (id) =>
    set((state) => {
      const isSelected = state.selectedMentorIds.includes(id);

      if (isSelected) {
        return {
          selectedMentorIds: state.selectedMentorIds.filter(
            (mentorId) => mentorId !== id
          ),
        };
      }

      if (state.selectedMentorIds.length >= MAX_SELECTED_MENTORS) {
        return state;
      }

      return {
        selectedMentorIds: [...state.selectedMentorIds, id],
      };
    }),
}));