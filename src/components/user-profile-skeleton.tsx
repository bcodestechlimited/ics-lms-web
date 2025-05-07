import {Skeleton} from "@/components/ui/skeleton";

export function ProfileInfoSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-md" />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full" />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>

            <div className="w-full flex justify-end pt-4">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
