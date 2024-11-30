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
  return (
    <div className="py-32">
      <SkeletonDetails />
    </div>
  );
}

const SkeletonDetails = () => (
  <div className="mb-4 flex w-full flex-col gap-4 lg:flex-row">
    <div className="lg:w-1/3">
      <Skeleton className="mb-4 h-48 rounded-xl" />
    </div>
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-muted/50 lg:w-2/3">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8" />
        </CardTitle>
        <CardDescription className="flex justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/3" />
        </CardDescription>
      </CardHeader>
      <CardContent className="mb-8 space-y-4">
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardFooter>
    </Card>
  </div>
);
