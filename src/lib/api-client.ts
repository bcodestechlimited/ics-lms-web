import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {Cookies} from "react-cookie";

const cookies = new Cookies();

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookies.get("accessToken");
    console.log("token gotten from cookies in the api-client", token);
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// apiClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = getAccessTokenFromContext();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // const originalRequest = error.config as InternalAxiosRequestConfig & {
    //   _retry?: boolean;
    // };

    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   authStore.getState().clearSession();
    //   window.location.href = "/auth/login";
    // }

    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   try {
    //     const { data } = await axios.post<{ accessToken: string }>(
    //       `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    //       {},
    //       { withCredentials: true }
    //     );

    //     if (data.accessToken) {
    //       authStore.getState().setAccessToken(data.accessToken);
    //     }

    //     return apiClient(originalRequest);
    //   } catch (refreshError) {
    //     authStore.getState().clearSession();
    //     window.location.href = "/login";
    //     return Promise.reject(refreshError);
    //   }
    // }

    // Handle other errors
    // Add error handling logic
    if (error.response) {
      // const {status, data} = error.response;
      // console.error("API Error:", status, data);
      // toast.error("API Error");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
