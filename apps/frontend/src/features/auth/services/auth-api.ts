import type {
  AuthResponse,
  LoginPayload,
  RefreshTokenPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";
import { apiClient } from "@/lib/client";

const AUTH_ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  refresh: "/auth/refresh",
} as const;

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.login,
      payload,
    );
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.register,
      payload,
    );
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(AUTH_ENDPOINTS.logout);
  },

  refreshToken: async (
    payload: RefreshTokenPayload,
  ): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.refresh,
      payload,
    );
    return data;
  },
};
