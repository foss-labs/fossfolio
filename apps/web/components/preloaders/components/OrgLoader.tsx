import { Skeleton } from "@app/ui/components/skeleton";

export const OrgLoader = () => {
  return (
    <>
      {new Array(9).fill(0).map((_, index) => (
        <Skeleton
          className=" w-[300px] h-[150px] border-solid border-2"
          key={index}
        />
      ))}
    </>
  );
};
