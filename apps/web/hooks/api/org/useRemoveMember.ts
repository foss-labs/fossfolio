import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiHandler } from "@app/config/handler";
import { toast } from "sonner";

interface Payload {
  memberId: string;
  orgId: string;
}

const handleRemoveClick = async ({ memberId, orgId }: Payload) => {
  return await apiHandler.patch(`/org/${orgId}/member/remove`, {
    memberId: memberId,
  });
};

export const useRemoveMember = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id } = router.query;

  return useMutation(
    (memberId: string) =>
      handleRemoveClick({
        memberId,
        orgId: router.query?.id as string,
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["org-members", id]);
      },
      onError: (error) => {
        console.error("Error removing user:", error);
        toast.error("Error Removing User");
      },
    }
  );
};
