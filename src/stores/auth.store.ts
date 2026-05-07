import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type LoginResponse = Record<string, unknown>;

type AuthState = {
  loginResponse: LoginResponse | null;
  setLoginResponse: (data: LoginResponse) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loginResponse: null,
      setLoginResponse: (data) => set({ loginResponse: data }),
      clearAuth: () => set({ loginResponse: null }),
    }),
    {
      name: "intellysys-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ loginResponse: state.loginResponse }),
    },
  ),
);
