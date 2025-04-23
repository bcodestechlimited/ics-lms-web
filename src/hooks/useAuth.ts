import {authService} from "@/services/auth.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSession} from "./useSession";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  telephone: string;
}

export interface OnBoardingStaffPayload {
  email: string;
  password: string;
  newPassword: string;
  token: string;
}

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: RegisterPayload) =>
      authService.register(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["user"]});
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const {setSession} = useSession();

  return useMutation({
    mutationFn: (credentials: LoginPayload) => authService.login(credentials),
    onSuccess: (data) => {
      setSession({
        accessToken: data.responseObject.token,
        status: "authenticated",
        user: data.responseObject.user,
      });
      queryClient.invalidateQueries({queryKey: ["user"]});
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const {clearSession} = useSession();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearSession();
      queryClient.invalidateQueries({queryKey: ["user"]});
    },
  });
};

export const useStaffOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: OnBoardingStaffPayload) =>
      authService.onBoardingStaffService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["user"]});
    },
  });
};
