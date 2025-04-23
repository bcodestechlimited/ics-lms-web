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
}

export default new UserService();
