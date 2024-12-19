import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-4 py-32 xl:px-0">
      <SkeletonDetails />
    </div>
  );
}

const SkeletonDetails = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="space-y-4 rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
        <Skeleton className="h-48" />
        <div className="space-y-1">
          <Skeleton className="h-8" />
          <div className="flex flex-col sm:flex-row md:justify-between">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full space-y-6 rounded-xl bg-gradient-to-tl from-muted to-muted/20 p-6 md:w-2/3">
          <Skeleton className="h-10" />
          <Skeleton className="h-64" />
        </div>
        <div className="w-full space-y-4 rounded-xl bg-gradient-to-tr from-muted to-muted/20 p-6 md:w-1/3">
          <Skeleton className="h-10" />
          <Skeleton className="h-64" />
        </div>
      </div>
    </div>
  );
};
