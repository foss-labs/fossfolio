import { apiHandler } from "@app/config";
import { Iform } from "@app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

// Fix placeholder key to placeholder instead of placeHolder
const addSchema = async (orgId: string, formId: string, data: Iform) => {
  return await apiHandler.patch(`/events/form/${orgId}/schema/${formId}`, {
    type: data.type,
    name: data.label,
    placeholder: data.placeholder,
    require: data.require,
  });
};

export const useAddSchema = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id, pk, formid } = router.query;

  // Check if the query parameters are available
  if (!id || !pk || !formid) {
    throw new Error("Missing required query parameters");
  }

  return useMutation(
    (data: Iform) => addSchema(id as string, formid as string, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["events", "form", pk, formid]);
      },
    }
  );
};
