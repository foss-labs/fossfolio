import { Skeleton } from "@app/ui/components/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex items-center space-x-4 w-[300px] h-[150px]">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
}
