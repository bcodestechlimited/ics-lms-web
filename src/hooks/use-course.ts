import {LaunchCoursePayload} from "@/interfaces/course.interface";
import {CheckoutCouponInterface} from "@/interfaces/payment.interface";
import {courseService} from "@/services/course.service";
import paymentService from "@/services/payment.service";
import {useCourseFilterStore} from "@/store/course-filter.store";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";


export const useGetHomePageCourses = () => {
  return useQuery({
    queryFn: () => courseService.getAllPublishedCourses({limit: 8, page: "1"}),
    queryKey: ["home-page-courses"],
  });
};



export const useGetAllCourses = () => {
  const {search, rating, category, page, limit} = useCourseFilterStore();

  return useQuery({
    queryKey: ["courses", {search, rating, category, page, limit}],
    queryFn: () => {
      const params: Record<string, string> = {};

      if (search) {
        params.search = search;
      }
      if (rating != null) {
        params.rating = rating.toString();
      }
      if (category) {
        params.category = category;
      }

      params.page = page?.toString() ?? "1";
      params.limit = limit?.toString() ?? "20";

      return courseService.getAllPublishedCourses(params);
    },
  });
};

export const useGetAllPublishedCourses = () => {
  const {search, rating, category, page, limit} = useCourseFilterStore();
  return useQuery({
    queryFn: () => {
      const params: Record<string, string | number> = {};

      if (search) params.search = search;
      if (rating) params.rating = rating;
      if (category) params.category = category;

      params.page = page ? page.toString() : "1";
      params.limit = limit ? limit.toString() : "20";

      return courseService.getAllPublishedCourses(params);
    },
    queryKey: ["courses", {search, rating, category, page, limit}],
  });
};

export const useGetACourseById = (id: string | undefined) => {
  return useQuery({
    queryFn: () => courseService.getACourseByIdService(id),
    queryKey: ["courses", id],
    enabled: !!id,
  });
};

export const useGetCourseModuleByModuleId = (id: string | undefined) => {
  return useQuery({
    queryFn: () => courseService.getCourseModuleByModuleIdService(id),
    queryKey: ["course-module"],
    enabled: !!id,
  });
};

export const useGetCourseProgress = (courseId: string) =>
  useQuery({
    queryKey: ["progress", courseId],
    queryFn: () => courseService.getCourseProgress(courseId),
    enabled: !!courseId,
  });

export const useGetAllCourseModules = (id: string | undefined) => {
  return useQuery({
    queryFn: () => courseService.getAllCourseModulesService(id),
    queryKey: ["course-modules"],
    enabled: !!id,
  });
};

export const useGetCourseAssessments = (id: string) => {
  return useQuery({
    queryFn: () => courseService.getCourseAssessmentsService(id),
    queryKey: ["course-assessments"],
  });
};

export const useLaunchCourse = () => {
  return useMutation({
    mutationFn: (payload: LaunchCoursePayload) =>
      courseService.launchCourseService(payload.courseId),
    onSuccess: () => {},
  });
};

export const useCouponCheckout = () => {
  return useMutation({
    mutationFn: (payload: CheckoutCouponInterface) =>
      paymentService.checkoutCouponService(payload),
  });
};

export const useMarkModuleCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moduleId: string) =>
      courseService.markModuleCompletedService(moduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["progress"]});
    },
  });
};

export const useSubmitCourseAssessment = () => {
  return useMutation({
    mutationFn: ({
      courseId,
      answers,
    }: {
      courseId: string;
      answers: {questionId: string; selectedOptionId: number}[];
    }) => courseService.submitCourseAssessmentService(courseId, answers),
  });
};
