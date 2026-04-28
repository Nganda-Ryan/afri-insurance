import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IUserProfileDto } from "@/types/profile";

interface IUserStoreState extends IUserProfileDto {
  setUser: (user: IUserProfileDto) => void;
  updateInfo: (data: Partial<IUserProfileDto>) => void;
  clearUser: () => void;
}

const emptyUser: IUserProfileDto = {
  id: "",
  email: null,
  firstName: null,
  lastName: null,
  phone: null,
  isGuest: true,
  hasPassword: false,
};

export const useUserStore = create<IUserStoreState>()(
  persist(
    (set) => ({
      ...emptyUser,

      setUser: (user) => set({ ...user }),

      updateInfo: (data) => set((state) => ({ ...state, ...data })),

      clearUser: () => set({ ...emptyUser }),
    }),
    {
      name: "user-profile-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ setUser, updateInfo, clearUser, ...state }) => state,
    },
  ),
);
