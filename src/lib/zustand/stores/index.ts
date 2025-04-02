import { create } from "zustand";

interface ContactModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useContactModalStore = create<ContactModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
