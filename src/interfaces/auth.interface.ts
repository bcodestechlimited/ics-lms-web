export interface LoginResponse {
  success: boolean;
  message: string;
  responseObject: {
    message: string;
    token: string;
    user: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      isActive: boolean;
    };
  };
  statusCode: number;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
  data: object;
}

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

export interface ResetPasswordInterface {
  newPassword: string;
  token: string;
}
