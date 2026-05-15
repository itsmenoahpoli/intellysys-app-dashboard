import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";
import { env } from "@/config/env.config";
import { decryptString, encryptString } from "@/utils/crypto";

export type LoginResponse = {
  success: boolean;
  token?: string;
  user?: {
    email: string;
    name: string;
    userRole?: { name: string };
  };
};

type AuthState = {
  loginResponse: LoginResponse | null;
  rememberMe: boolean;
  hasHydrated: boolean;
  setRememberMe: (remember: boolean) => void;
  setLoginResponse: (data: LoginResponse) => void;
  updateAuthUser: (user: { name: string; email: string }) => void;
  clearAuth: () => void;
  setHasHydrated: (v: boolean) => void;
};

const STORAGE_KEY = "intellysys-auth";
const PERSIST_SECRET = env.authPersistSecret;

type PersistedAuthState = Pick<AuthState, "loginResponse" | "rememberMe">;

/**
 * Security posture:
 * - If "Remember Me" is enabled, persist auth to localStorage (survives browser restarts).
 * - Otherwise, persist auth to sessionStorage (survives refresh, cleared on tab close).
 */
const authStorage: StateStorage = {
  getItem: async (name: string) => {
    const raw = sessionStorage.getItem(name) ?? localStorage.getItem(name);
    if (!raw) return null;
    const dec = await decryptString(raw, PERSIST_SECRET);
    return dec ?? raw;
  },
  setItem: async (name: string, value: string) => {
    let remember = false;
    try {
      const parsed = JSON.parse(value) as {
        state?: { rememberMe?: unknown };
      } | null;
      remember = parsed?.state?.rememberMe === true;
    } catch {
      // ignore JSON parse errors
    }

    const target = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;
    const toStore = await encryptString(value, PERSIST_SECRET);
    target.setItem(name, toStore);
    other.removeItem(name);
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist<AuthState, [], [], PersistedAuthState>(
    (set) => ({
      loginResponse: null,
      rememberMe: false,
      hasHydrated: false,
      setRememberMe: (rememberMe) => set({ rememberMe }),
      setLoginResponse: (data) => set({ loginResponse: data }),
      updateAuthUser: (user) =>
        set((state) => {
          if (!state.loginResponse?.user) return state;
          return {
            loginResponse: {
              ...state.loginResponse,
              user: { ...state.loginResponse.user, ...user },
            },
          };
        }),
      clearAuth: () => set({ loginResponse: null }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => authStorage),
      partialize: (state) => ({
        loginResponse: state.loginResponse,
        rememberMe: state.rememberMe,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
