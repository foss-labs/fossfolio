import { RiLoaderFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

interface LoaderProp {
  className?: string;
}

export const Loader = ({ className = "h-screen" }: LoaderProp) => {
  return (
    <div
      className={twMerge(
        "flex items-center flex-wrap justify-center p-4",
        className
      )}
    >
      <RiLoaderFill className="animate-spin h-8 w-8" />
    </div>
  );
};
