import { useLottie } from "lottie-react";
import Empty from "@app/public/lottie/empty.json";

export const NoData = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Empty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(defaultOptions);
  return (
    <div className="h-[90vh] w-full flex justify-center items-center ">
      <div>{<>{View}</>}</div>
    </div>
  );
};
