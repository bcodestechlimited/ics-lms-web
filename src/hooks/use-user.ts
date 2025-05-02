import {RequestForExtenstionInterface} from "@/interfaces/user.interface";
import {certificateService} from "@/services/certificate.service";
import userService from "@/services/user.service";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const useGetExpiredCourses = () => {
  return useQuery({
    queryFn: () => userService.getUserExpiredCourses(),
    queryKey: ["get-expired-courses"],
  });
};

export const useRequestForExtension = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestForExtenstionInterface) =>
      userService.requestForExtension(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [""]});
    },
  });
};

export const useGetAllMyCertificates = () => {
  return useQuery({
    queryFn: () => certificateService.fetchAllMyCertificatesService(),
    queryKey: ["get-all-my-certificates"],
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      userId: string;
      firstName: string;
      lastName: string;
      avatar?: File;
    }) => userService.updateUserProfile(payload),
    onSuccess: () => {
      // e.g. refetch the session or user-details query
      queryClient.invalidateQueries({queryKey: ["session-user"]});
    },
  });
};