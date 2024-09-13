import { apiHandler } from "@app/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

const addForm = async (
  orgId: string,
  eventId: string,
  data: UseAddFormProps
) => {
  return await apiHandler.post(`/events/form/${orgId}/${eventId}`, data);
};

interface UseAddFormProps {
  title: string;
  description: string;
}

export const useAddForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id, eventid } = router.query;

  return useMutation(
    (data: UseAddFormProps) => addForm(id as string, eventid as string, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["events", "form", eventid]);
      },
      onError: (error) => {
        console.error("Error adding Form:", error);
        toast.error("Error adding form");
      },
    }
  );
};
