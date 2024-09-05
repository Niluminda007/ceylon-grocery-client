import { create } from "zustand";

type UserSideBarStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUserSideBar = create<UserSideBarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
