/* eslint-disable @typescript-eslint/no-explicit-any */
import {CourseModuleSkeleton} from "@/components/course-card-skeleton";
import ModuleContentSection from "@/components/module-content-section";
import {Button} from "@/components/ui/button";
import {
  useGetCourseModuleByModuleId,
  // useGetCourseProgress,
  useMarkModuleCompleted,
} from "@/hooks/use-course";
import DashboardLayout from "@/layouts/dashboard-layout";
import {Check} from "lucide-react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {toast} from "sonner";

export default function DashboardCourseOverview() {
  const params = useParams();
  const navigate = useNavigate();
  const {data, isLoading, refetch} = useGetCourseModuleByModuleId(
    params.moduleId
  );
  const module = !isLoading && data?.responseObject?.data?.module;
  const hasNextModule = !isLoading && data?.responseObject?.data?.hasNextModule;
  const nextModuleId = !isLoading && data?.responseObject?.data?.nextModule;
  const previousModuleId = !isLoading && data?.responseObject?.data?.prevModule;
  const markModuleCompleted = useMarkModuleCompleted();
  // const {
  //   data: progressRes,
  //   isLoading: loadingProgress,
  //   error: errorProgress,
  // } = useGetCourseProgress(params.id as string);

  // const progress = progressRes?.responseObject?.data;

  useEffect(() => {
    if (params.moduleId) {
      refetch();
    }
  }, [params.moduleId, refetch]);

  // const totalModules = progress?.modules?.length ?? 0;
  // const doneModules =
  //   progress?.modules?.filter((m: any) => m.completed).length ?? 0;
  // const pct = Math.round(progress?.progressPercentage ?? 0);

  const handleContinue = (type: string) => {
    if (type === "assessment") {
      // send to the backend that the person has completed the course lessons and that the after the assessment they would have completed the course and they should be issued a certificate
      navigate(`/dashboard/courses/${params.id}/course-assessment`);
    } else {
      navigate(
        `/dashboard/courses/${params.id}/modules/${nextModuleId}/overview`
      );
    }
  };

  const handleMarkCompleted = () => {
    toast.promise(markModuleCompleted.mutateAsync(module?._id), {
      loading: "Marking module as completed...",
      success: (res) => {
        if (!res.success) {
          return "Failed to mark module as completed";
        }
        return "Module marked as completed";
      },
      error: () => {
        return "Error marking module as completed";
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12 space-y-16">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-end-12 p-2 space-y-16">
            <h1 className="text-2xl font-semibold">Title: {module?.title}</h1>

            {/* ── Progress Tracker ── */}
            {/* <div className="space-y-2">
              {loadingProgress ? (
                <p>Loading progress...</p>
              ) : errorProgress ? (
                <p className="text-red-500">Failed to load progress</p>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="font-medium">Progress: {pct}%</span>
                    <span className="text-sm text-gray-600">
                      {doneModules}/{totalModules} modules
                    </span>
                  </div>
                 
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{width: `${pct}%`}}
                    />
                  </div>
                </>
              )}
            </div> */}

            {!isLoading ? (
              module?.contentSections.map((section: any) => {
                return (
                  <ModuleContentSection section={section} key={section._id} />
                );
              })
            ) : (
              <div className="w-full mx-auto space-y-8">
                <CourseModuleSkeleton />
                <CourseModuleSkeleton />
                <CourseModuleSkeleton />
                <CourseModuleSkeleton />
                <CourseModuleSkeleton />
              </div>
            )}
            <div className="flex items-center justify-between gap-x-8 py-16">
              <Button
                className="bg-green-600 flex items-center gap-x-2"
                onClick={handleMarkCompleted}
                disabled={markModuleCompleted.isPending}
              >
                <Check />
                Mark as completed
              </Button>

              {!hasNextModule ? (
                <div className="flex items-center gap-x-2">
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      navigate(
                        `/dashboard/courses/${params.id}/modules/${previousModuleId}/overview`
                      )
                    }
                  >
                    Go back
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => handleContinue("assessment")}
                  >
                    Continue to Assessment
                  </Button>
                </div>
              ) : (
                <Button
                  variant={"outline"}
                  onClick={() => handleContinue("nextModule")}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
