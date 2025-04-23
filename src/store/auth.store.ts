import { User } from "@/interfaces/session.interface";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  status: "pending" | "authenticated" | "unauthenticated";
  user: Partial<User> | null;
  accessToken: string | null;
  lastChecked: number;
  setSession: (user: User, accessToken: string) => void;
  clearSession: () => void;
  setAccessToken: (token: string) => void;
  validateSession: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      status: "pending",
      lastChecked: 0,
      user: null,
      accessToken: null,
      validateSession: async () => {
        try {
          const { data } = await axios.get<{ valid: boolean }>(
            `http://localhost:5000/api/v1/user/validate-user`,
            {
              withCredentials: true,
            }
          );
          set({ lastChecked: Date.now(), status: "authenticated" });
          return data.valid;
        } catch (error) {
          console.log("auth.store error", error);
          get().clearSession();
          return false;
        }
      },
      setSession: (user, accessToken) =>
        set({
          status: "authenticated",
          user,
          accessToken,
        }),
      clearSession: () =>
        set({
          status: "unauthenticated",
          user: null,
          accessToken: null,
        }),
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Only persist these values
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);

// Export direct access to the store for non-React usage
export const authStore = useAuthStore;

// Helper function to get access token
export const getAccessTokenFromContext = () => authStore.getState().accessToken;
