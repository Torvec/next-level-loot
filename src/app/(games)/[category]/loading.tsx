import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Loading() {
  const skeletonCards = Array.from({ length: 12 }).map((_, index) => (
    <SkeletonCard key={index} />
  ));

  return (
    <div className="mb-32 mt-8 space-y-16">
      <SkeletonForm />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skeletonCards}
      </div>
    </div>
  );
}

const SkeletonForm = () => (
  <div className="flex flex-col gap-2 md:flex-row md:justify-between">
    <Skeleton className="h-10 w-full md:w-1/4" />
    <Skeleton className="h-10 w-full md:w-1/4" />
  </div>
);

const SkeletonCard = () => (
  <Card className="flex flex-col justify-between rounded-xl border-0 bg-muted/50">
    <CardHeader>
      <Skeleton className="mb-4 h-48 rounded-xl" />
      <CardTitle>
        <Skeleton className="h-6" />
      </CardTitle>
      <CardDescription className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-44" />
    </CardContent>
    <CardFooter className="flex-col gap-4">
      <Skeleton className="h-10 w-full" />
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </CardFooter>
  </Card>
);
