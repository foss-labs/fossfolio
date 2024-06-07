import { useEventParticipantsFormSubmissions } from "@app/hooks/api/org";
import { Input } from "@app/ui/components/input";
import { Label } from "@app/ui/components/label";
import { Separator } from "@app/ui/components/separator";
import Drawer from "react-modern-drawer";
import { RiLoaderFill } from "react-icons/ri";
import "react-modern-drawer/dist/index.css";
import { useEffect } from "react";

export const FormDrawer = ({ open, onClose, userId }: Props) => {
  const {
    data: fromData,
    isLoading,
    refetch,
  } = useEventParticipantsFormSubmissions(userId);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction="right"
      size={350}
      className="p-5"
    >
      <h1 className="text-2xl text-black font-bold mb-3">Form Response</h1>
      <Separator />
      {isLoading && (
        <div className="h-[90vh] flex items-center justify-center">
          <RiLoaderFill className="animate-spin h-8 w-8" />
        </div>
      )}

      {!isLoading &&
        // @ts-ignore

        Object.entries(fromData?.data).map(([key, value]) => (
          <div className="mt-4" key={key}>
            <Label>{key}</Label>
            {typeof value === "string" && (
              <Input defaultValue={value} disabled className="mt-2" />
            )}
          </div>
        ))}

      {!isLoading &&
        // @ts-ignore

        Object.entries(fromData?.data).length === 0 && (
          <div className="h-[90vh] flex items-center justify-center">
            <p>No form response</p>
          </div>
        )}
    </Drawer>
  );
};

type Props = {
  open: boolean;
  onClose: () => void;
  userId: string;
};
