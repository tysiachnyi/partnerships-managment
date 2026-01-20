import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const mockCredentials = {
  email: 'partner@example.com',
  password: 'password123',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email === mockCredentials.email && password === mockCredentials.password) {
          set({
            isAuthenticated: true,
            user: {
              email,
              name: 'Partner Admin',
            },
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);