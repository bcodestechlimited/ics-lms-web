import {
  LoginPayload,
  OnBoardingStaffPayload,
  RegisterPayload,
} from "@/hooks/useAuth";
import {LoginResponse, RegisterResponse} from "@/interfaces/auth.interface";
import apiClient from "@/lib/api-client";
import {authStore} from "@/store/auth.store";

class AuthService {
  async register(payload: RegisterPayload) {
    const {data} = await apiClient.post<RegisterResponse>("/user", {
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      telephone: payload.telephone,
    });
    return data;
  }

  async login(payload: LoginPayload) {
    const {data} = await apiClient.post<LoginResponse>("/user/login", {
      email: payload.email,
      password: payload.password,
    });
    authStore.getState().setAccessToken(data.responseObject.token);
    return data;
  }

  async logout() {
    await apiClient.post("/user/logout");
    authStore.getState().clearSession();
  }

  async refreshToken() {
    const {data} = await apiClient.post<{accessToken: string}>("/auth/refresh");
    authStore.getState().setAccessToken(data.accessToken);
    return data;
  }

  async onBoardingStaffService(payload: OnBoardingStaffPayload) {
    const {data} = await apiClient.post("/user/staff-onboarding", {
      email: payload.email,
      token: payload.token,
      password: payload.password,
      newPassword: payload.newPassword,
    });
    return data;
  }

  async activateUserAccount(payload: string) {
    const {data} = await apiClient.post(`/user/activate-account`, {
      token: payload,
    });
    return data;
  }
}

export const authService = new AuthService();
export default AuthService;
