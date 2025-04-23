import {dashboardService} from "@/services/dashboard.service";
import {useQuery} from "@tanstack/react-query";

export const useGetMyEnrolledCourses = () => {
  return useQuery({
    queryFn: () => dashboardService.getEnrolledCoursesService(),
    queryKey: ["get-enrolled-courses"],
  });
};

export const useGetMyAssignedCourses = () => {
  return useQuery({
    queryFn: () => dashboardService.getAssignedCoursesService(),
    queryKey: ["get-assigned-courses"],
  });
};
