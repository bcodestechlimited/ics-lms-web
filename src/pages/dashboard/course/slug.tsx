/* eslint-disable @typescript-eslint/no-explicit-any */
import {CourseModuleSkeleton} from "@/components/course-card-skeleton";
import ModuleContentSection from "@/components/module-content-section";
import {Button} from "@/components/ui/button";
import {
  useGetCourseModuleByModuleId,
  useGetCourseProgress,
  useMarkModuleCompleted,
} from "@/hooks/use-course";
import DashboardLayout from "@/layouts/dashboard-layout";
import {Check} from "lucide-react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {toast} from "sonner";

export default function DashboardCourseOverview() {
  const {id: courseId, moduleId} = useParams<{
    id: string;
    moduleId: string;
  }>();
  const navigate = useNavigate();

  // 1) Module data
  const {
    data: moduleRes,
    isLoading: loadingModule,
    refetch,
  } = useGetCourseModuleByModuleId(moduleId);
  const module = moduleRes?.responseObject?.data?.module;
  const hasNext = moduleRes?.responseObject?.data?.hasNextModule;
  const nextId = moduleRes?.responseObject?.data?.nextModule;
  const prevId = moduleRes?.responseObject?.data?.prevModule;

  // 2) Progress data
  const {
    data: progressRes,
    isLoading: loadingProgress,
    error: errorProgress,
  } = useGetCourseProgress(courseId as string);
  const progress = progressRes?.responseObject?.data;
  const totalModules = progress?.modules?.length ?? 0;
  const doneModules =
    progress?.modules?.filter((m: any) => m.completed).length ?? 0;
  const pct = Math.round(progress?.progressPercentage ?? 0);

  const allModulesCompleted = doneModules === totalModules;

  const currentIndex =
    progress?.modules.findIndex((m: any) => m.module._id === moduleId) ?? -1;

  const moduleProgress = progress?.modules.find(
    (m: any) => m.module._id === moduleId
  );
  const isModuleCompleted = moduleProgress?.completed === true;

  // 3) Mutation
  const {mutateAsync: markCompleted} = useMarkModuleCompleted();

  // Scroll to top on module change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [moduleId]);

  useEffect(() => {
    if (moduleId) {
      refetch();
    }
  }, [moduleId, refetch]);

  const handleContinue = () => {
    if (hasNext) {
      navigate(`/dashboard/courses/${courseId}/modules/${nextId}/overview`);
    } else {
      navigate(`/dashboard/courses/${courseId}/course-assessment`);
    }
  };

  const handleMark = () => {
    if (!module?._id) return;
    toast.promise(markCompleted(module._id), {
      loading: "Marking module as completed…",
      success: () => "Module marked!",
      error: () => "Failed to mark module",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12 space-y-16">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-end-12 p-2 space-y-16">
            {!loadingModule && module && currentIndex >= 0 && (
              <p className="text-sm text-gray-500">
                Module {currentIndex + 1} of {totalModules}
              </p>
            )}
            <h1 className="text-2xl font-semibold">
              {loadingModule ? "Loading…" : `Title: ${module?.title}`}
            </h1>

            {/* Progress Tracker */}
            <div className="space-y-2">
              {loadingProgress ? (
                <p>Loading progress…</p>
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
            </div>

            {/* Module Content */}
            {!loadingModule && module ? (
              module.contentSections.map((section: any) => (
                <ModuleContentSection section={section} key={section._id} />
              ))
            ) : (
              <div className="w-full mx-auto space-y-8">
                <CourseModuleSkeleton />
                <CourseModuleSkeleton />
                <CourseModuleSkeleton />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-x-4 py-16">
              {/* Mark Complete */}
              <Button
                className="bg-green-600 flex items-center gap-x-2"
                onClick={handleMark}
                disabled={loadingModule || loadingProgress || isModuleCompleted}
                // disabled={marking || loadingModule}
              >
                <Check />
                {isModuleCompleted ? "Completed" : "Mark Complete"}
              </Button>

              <div className="flex gap-2">
                {/* Go Back (only if prevId exists) */}
                {prevId && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate(
                        `/dashboard/courses/${courseId}/modules/${prevId}/overview`
                      )
                    }
                  >
                    Go back
                  </Button>
                )}

                {/* Continue */}
                <Button
                  variant="outline"
                  onClick={handleContinue}
                  disabled={!hasNext && !allModulesCompleted}
                >
                  {hasNext ? "Next Module" : "Continue to Assessment"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
