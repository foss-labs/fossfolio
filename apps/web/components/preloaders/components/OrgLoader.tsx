import { Skeleton } from "@app/ui/components/skeleton";

export const OrgLoader = ({ count = 9 }) => {
  return (
    <>
      {new Array(count).fill(0).map((_, index) => (
        <Skeleton
          className=" w-[300px] h-[150px] border-solid border-2"
          key={index}
        />
      ))}
    </>
  );
};
