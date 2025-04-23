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
    };
  };
  statusCode: number;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
  data: object;
}

