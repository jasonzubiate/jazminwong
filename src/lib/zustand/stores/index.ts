import { create } from "zustand";

interface ContactModalStore {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const useContactModalStore = create<ContactModalStore>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
