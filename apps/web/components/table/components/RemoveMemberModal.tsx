import { useRouter } from "next/router";
import { Button } from "@app/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@app/ui/components/dialog";
import { apiHandler } from "@app/config";
import { toast } from "sonner";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import { Member } from "@app/types";

type MembersRefetchType = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
) => Promise<QueryObserverResult<Member[], unknown>>;

type IModal = {
  isOpen: boolean;
  onClose: () => void;
  MemberName: string;
  MemberId: string;
  refetch: MembersRefetchType;
};

export const RemoveMemberModal = ({
  isOpen,
  onClose,
  MemberName,
  MemberId,
  refetch,
}: IModal) => {
  const router = useRouter();

  const handleRemoveClick = async () => {
    try {
      const { data } = await apiHandler.patch("/org/member/remove", {
        organizationId: router.query?.id,
        memberId: MemberId,
      });
      if (!data.ok) {
        throw new Error();
      }
      toast.success("Team member has been removed");
    } finally {
      onClose();
    }
  };

  const { mutate: removeUser, isLoading: isRemoving } = useMutation(
    handleRemoveClick,
    {
      onSuccess: () => {
        //fetching the users table again
        refetch();
      },
      onError: () => {
        toast.error("Error publishing event");
      },
    }
  );

  const handleRemove = () => {
    removeUser();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[325px] md:w-auto ">
        <DialogHeader>
          Remove Team Member
          <DialogDescription className="mt-3">
            Are you sure you want to remove {MemberName}?
            <div className="flex justify-end space-x-2 mt-5">
              <Button
                variant="outline"
                onClick={onClose}
                isLoading={isRemoving}
                className="text-black"
              >
                Cancel
              </Button>
              <Button
                className="!bg-red-500 border-1.4 hover:bg-red-900"
                onClick={handleRemove}
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
