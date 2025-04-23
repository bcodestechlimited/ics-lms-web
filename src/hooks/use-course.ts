import {LaunchCoursePayload} from "@/interfaces/course.interface";
import {CheckoutCouponInterface} from "@/interfaces/payment.interface";
import {courseService} from "@/services/course.service";
import paymentService from "@/services/payment.service";
import {useCourseFilterStore} from "@/store/course-filter.store";
import {useMutation, useQuery} from "@tanstack/react-query";

const params: Record<string, string | number> = {};

export const useGetHomePageCourses = () => {
  return useQuery({
    queryFn: () => courseService.getAllPublishedCourses({limit: 8, page: "1"}),
    queryKey: ["home-page-courses"],
  });
};

export const useGetAllCourses = () => {
  const {search, rating, topic, page, limit} = useCourseFilterStore();

  return useQuery({
    queryFn: () => {
      if (search) params.search = search;
      if (rating) params.rating = rating;
      if (topic) params.category = topic;

      // set pagination parameters with default limit of 20
      params.page = page ? page.toString() : "1";
      params.limit = limit ? limit.toString() : "20";

      return courseService.getAllPublishedCourses(params);
    },
    queryKey: ["courses", {search, rating, topic, page, limit}],
  });
};

export const useGetAllPublishedCourses = () => {
  const {search, rating, topic, page, limit} = useCourseFilterStore();
  return useQuery({
    queryFn: () => {
      if (search) params.search = search;
      if (rating) params.rating = rating;
      if (topic) params.category = topic;

      // set pagination parameters with default limit of 20
      params.page = page ? page.toString() : "1";
      params.limit = limit ? limit.toString() : "20";

      return courseService.getAllPublishedCourses(params);
    },
    queryKey: ["courses", {search, rating, topic, page, limit}],
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
    onSuccess: () => {
      console.log("course launched successfully");
    },
  });
};

export const useCouponCheckout = () => {
  return useMutation({
    mutationFn: (payload: CheckoutCouponInterface) =>
      paymentService.checkoutCouponService(payload),
  });
};

export const useMarkModuleCompleted = () => {
  return useMutation({
    mutationFn: (moduleId: string) =>
      courseService.markModuleCompletedService(moduleId),
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
