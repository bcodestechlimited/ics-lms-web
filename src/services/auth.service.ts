import {
  LoginPayload,
  LoginResponse,
  OnBoardingStaffPayload,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordInterface,
} from "@/interfaces/auth.interface";
import apiClient from "@/lib/api-client";
import {authStore} from "@/store/auth.store";

class AuthService {
  public async register(payload: RegisterPayload) {
    const {data} = await apiClient.post<RegisterResponse>("/user", {
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      telephone: payload.telephone,
    });
    return data;
  }

  public async login(payload: LoginPayload) {
    const {data} = await apiClient.post<LoginResponse>("/user/login", {
      email: payload.email,
      password: payload.password,
    });

    authStore.getState().setAccessToken(data.responseObject.token);
    return data;
  }

  public async logout() {
    await apiClient.post("/user/logout");
    authStore.getState().clearSession();
  }

  public async refreshToken() {
    const {data} = await apiClient.post<{accessToken: string}>("/auth/refresh");
    authStore.getState().setAccessToken(data.accessToken);
    return data;
  }

  public async onBoardingStaffService(payload: OnBoardingStaffPayload) {
    const {data} = await apiClient.post("/user/staff-onboarding", {
      email: payload.email,
      token: payload.token,
      password: payload.password,
      newPassword: payload.newPassword,
    });
    return data;
  }

  public async activateUserAccount(payload: string) {
    const {data} = await apiClient.post(`/user/activate-account`, {
      token: payload,
    });
    return data;
  }

  public async resetPasswordService(payload: ResetPasswordInterface) {
    const {data} = await apiClient.post(`/user/reset-password`, {
      newPassword: payload.newPassword,
      token: payload.token,
    });
    return data;
  }

  public async forgotPasswordService(payload: string) {
    const {data} = await apiClient.post(`/user/forgot-password`, {
      email: payload,
    });
    return data;
  }
}

export const authService = new AuthService();
export default AuthService;
