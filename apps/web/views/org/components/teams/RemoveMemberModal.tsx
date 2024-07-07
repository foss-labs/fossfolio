import { Button } from "@app/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@app/ui/components/dialog";
import { useRemoveMember } from "@app/hooks/api/org";

type IModal = {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  memberId: string;
};

export const RemoveMemberModal = ({
  isOpen,
  onClose,
  memberName,
  memberId,
}: IModal) => {
  const { mutate, isLoading } = useRemoveMember();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[325px] md:w-auto ">
        <DialogHeader>
          Remove Team Member
          <DialogDescription className="mt-3">
            Are you sure you want to remove {memberName}?
            <div className="flex justify-end space-x-2 mt-5">
              <Button
                variant="outline"
                onClick={onClose}
                isLoading={isLoading}
                className="text-black"
              >
                Cancel
              </Button>
              <Button
                className="!bg-red-500 border-1.4 hover:bg-red-900"
                onClick={() => mutate(memberId)}
              >
                Remove
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
