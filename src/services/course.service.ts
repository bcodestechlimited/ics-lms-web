import apiClient from "@/lib/api-client";

class CourseService {
  async getAllCoursesService() {
    const {data} = await apiClient.get("/course");
    return data;
  }

  async getAllPublishedCourses(params: Record<string, string | number>) {
    const {data} = await apiClient.get("/course/course-published", {
      params,
    });
    return data;
  }

  async getACourseByIdService(id: string | undefined) {
    const {data} = await apiClient.get(`/course/` + id);
    return data;
  }

  async getCourseModuleByModuleIdService(id: string | undefined) {
    const {data} = await apiClient.get(`/course-modules/` + id);
    return data;
  }

  async getAllCourseModulesService(id: string | undefined) {
    const {data} = await apiClient.get(`/course/${id}/course-module`);
    return data;
  }

  async publishCourseService(id: string | undefined) {
    const {data} = await apiClient.patch(`/course/${id}/publish`);
    return data;
  }

  async getCourseAssessmentsService(id: string) {
    const {data} = await apiClient.get(`/course/${id}/course-assessment`);
    return data;
  }

  async launchCourseService(courseId: string) {
    const {data} = await apiClient.post(`/course/${courseId}/launch-course`);
    return data;
  }

  public async markModuleCompletedService(moduleId: string) {
    const {data} = await apiClient.post(`/course-modules/${moduleId}/complete`);
    return data;
  }

  public async submitCourseAssessmentService(
    courseId: string,
    answers: {questionId: string; selectedOptionId: number}[]
  ) {
    const {data} = await apiClient.post(
      `/course/${courseId}/course-assessment/submit`,
      {answers}
    );
    return data;
  }

  public async getCourseProgress(courseId: string) {
    const {data} = await apiClient.get(`/progress/course/${courseId}`);
    return data;
  }
}

export default CourseService;
export const courseService = new CourseService();
