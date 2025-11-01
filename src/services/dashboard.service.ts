import apiClient from "@/lib/api-client";

class DashboardService {
  public async getUserService() {
    const { data } = await apiClient.get("/user");
    return data;
  }

  public async getEnrolledCoursesService() {
    const { data } = await apiClient.get("/user/my-enrolled-courses");
    return data;
  }

  public async getAssignedCoursesService() {
    const { data } = await apiClient.get("/user/my-assigned-courses");
    return data;
  }

  public async getExpiredCoursesService() {}

  public async getUserModulesService() {}
}

export const dashboardService = new DashboardService();
export default DashboardService;
