//create a zustand store for a token of a user
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserState = {
  token: string | undefined;

  setToken: (token: string) => void;

  user: any;
  setUser: (user: any) => void;
  logout: () => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      token: undefined,

      setToken: (token) => {
        set({ token });
      },

      user: undefined,
      setUser: (user) => {
        set({ user });
      },
      logout: () => {
        console.log('Logging out');
        set({ token: undefined, user: undefined });

        localStorage.removeItem('user-store');
      },
    }),
    {
      name: 'user-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
