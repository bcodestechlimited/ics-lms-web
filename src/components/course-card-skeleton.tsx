import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}


export function CourseModuleSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="h-[200px] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[500px]" />
      </div>
    </div>
  );
}

export function CourseAssessmentSkeleton() {
  return (
    <div className="flex flex-col space-y-4 max-w-4xl">
      <Skeleton className="h-[200px] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[500px]" />
      </div>
    </div>
  );
}

export function CourseCheckoutSkeleton() {
  return (
    <div className="h-14 space-y-4 max-w-4xl w-full">
      <div className="flex gap-x-4">
        <Skeleton className="h-12 w-12" />
        <div className="w-full space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  );
}