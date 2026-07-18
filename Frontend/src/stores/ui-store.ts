import { create } from "zustand";

type UIStore = {
  sidebarOpen: boolean;
  notesOpen: boolean;
  toggleSidebar: () => void;
  toggleNotes: () => void;
};

export const useUIStore = create<UIStore>()((set) => ({
  sidebarOpen: false,
  notesOpen: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleNotes: () => set((state) => ({ notesOpen: !state.notesOpen })),
}));