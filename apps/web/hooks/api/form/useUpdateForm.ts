import { apiHandler } from "@app/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { NewFormSchema } from "@app/views/form/components/common";

const updateForm = async (
  orgId: string,
  eventId: string,
  formId: string,
  data: NewFormSchema
) => {
  return await apiHandler.patch(
    `/events/form/${orgId}/${eventId}/${formId}`,
    data
  );
};

export const useUpdateForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id, eventid, formid } = router.query;

  return useMutation(
    (data: NewFormSchema) =>
      updateForm(id as string, eventid as string, formid as string, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["events", "form", eventid]);
        queryClient.invalidateQueries(["events", "form", eventid, formid]);
      },
      onError: (error) => {
        console.error("Error adding Form:", error);
        toast.error("Error adding form");
      },
    }
  );
};
