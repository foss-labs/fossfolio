import { useLottie } from "lottie-react";

import Ticket from "@app/public/lottie/ticketsLottie.json";
import { Button } from "@app/components/ui/Button";

export const TicketLottie = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Ticket,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(defaultOptions);
  return (
    <>
      <div className="h-[90vh] w-full flex justify-center items-center">
        {typeof window !== undefined && <>{View}</>}
        <div className="flex flex-col max-w-sm gap-2">
          <h1 className="font-bold text-2xl text-center">
            Please Configure Tickets To Access Participants Page
          </h1>
          <Button
            onClick={() => {}}
            className="mt-2 w-[50%] self-center"
            size="sm"
          >
            Configure Tickets
          </Button>
        </div>
      </div>
    </>
  );
};
