import { Skeleton } from '@app/ui/components/skeleton';

export const OrgLoader = () => {
    return (
        <>
            {new Array(9).fill(0).map(() => (
                <Skeleton className=" w-[300px] h-[150px] border-solid border-2" />
            ))}
        </>
    );
};
