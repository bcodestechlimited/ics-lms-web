import {RequestForExtenstionInterface} from "@/interfaces/user.interface";
import apiClient from "@/lib/api-client";

class UserService {
  BASE_URL = "/user";

  public async getUserExpiredCourses() {
    const {data} = await apiClient(this.BASE_URL + "/get-expired-courses");
    return data;
  }

  public async requestForExtension(payload: RequestForExtenstionInterface) {
    const {data} = await apiClient.post(
      this.BASE_URL + "/request-for-extension",
      payload
    );
    return data;
  }

  public async updateUserProfile(payload: {
    userId: string;
    firstName: string;
    lastName: string;
    avatar?: File;
  }) {
    const formData = new FormData();
    formData.append("userId", payload.userId);
    formData.append("firstName", payload.firstName);
    formData.append("lastName", payload.lastName);
    if (payload.avatar instanceof File) {
      formData.append("avatar", payload.avatar);
    }

    const {data} = await apiClient.put(
      `${this.BASE_URL}/update-profile`,
      formData,
      {
        headers: {"Content-Type": "multipart/form-data"},
      }
    );
    return data;
  }
}

export default new UserService();
