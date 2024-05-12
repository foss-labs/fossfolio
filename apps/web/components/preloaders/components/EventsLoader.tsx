import { Skeleton } from '@app/ui/components/skeleton';

export const EventsLoader = () => (
    <div className="p-4 w-[300px] bg-white border rounded-lg shadow-md mt-5">
        <Skeleton className="h-28 w-full rounded-t-lg" />
        <div className="p-4 space-y-2">
            <Skeleton className="h-3 w-[60%]" />
            <Skeleton className="h-3 w-[40%]" />
            <Skeleton className="h-3 w-[70%]" />
        </div>
    </div>
);
