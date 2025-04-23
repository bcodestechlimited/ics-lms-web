import {RequestForExtenstionInterface} from "@/interfaces/user.interface";
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
