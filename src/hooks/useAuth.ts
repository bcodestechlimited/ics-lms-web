import {
  LoginPayload,
  OnBoardingStaffPayload,
  RegisterPayload,
  ResetPasswordInterface,
} from "@/interfaces/auth.interface";
import {authService} from "@/services/auth.service";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const token = import.meta.env.VITE_AUTH_TOKEN || "accessToken";

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
  // const {setSession} = useSession();

  return useMutation({
    mutationFn: (credentials: LoginPayload) => authService.login(credentials),
    onSuccess: (data) => {
      // if (!data.responseObject.user.isActive) {
      //   return;
      // }
      // setSession({
      //   accessToken: data.responseObject.token,
      //   status: "authenticated",
      //   user: data.responseObject.user,
      // });
      localStorage.setItem(token, data.responseObject.token);
      queryClient.invalidateQueries({queryKey: ["user"]});
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  // const {clearSession} = useSession();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem(token);
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

export const useActivateAccount = () => {
  return useMutation({
    mutationFn: (token: string) => authService.activateUserAccount(token),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordInterface) =>
      authService.resetPasswordService(payload),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPasswordService(email),
  });
};

export const useValidateUser = () => {
  return useQuery({
    queryKey: ["validate-user"],
    queryFn: () => authService.validateUser(),
  });
};