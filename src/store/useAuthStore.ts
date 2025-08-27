import { create } from "zustand";
import axiosInstance from "@/service/api";

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isLoading: true,
  error: null,
  user: null,
  checkAuthStatus: async () => {
    try {
      const response = await axiosInstance.get("/auth/status");
      set({
        isLoggedIn: true,
        user: response.data.user,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        isLoggedIn: false,
        user: null,
        isLoading: false,
        error: null,
      });
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      set({
        isLoggedIn: true,
        isLoading: false,
        user: { email },
      });
      return true;
    } catch (err: any) {
      set({
        isLoggedIn: false,
        isLoading: false,
        user: null,
        error: err.response?.data?.message || "Ocurrió un error al iniciar sesión",
      });
      return false;
    }
  },

  logout: async () => {
    await axiosInstance.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    set({ isLoggedIn: false, user: null });
  },
}));
