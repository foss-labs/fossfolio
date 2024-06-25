import { apiHandler } from "@app/config";
import { Iform } from "@app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type RequestType = "ADD" | "UPDATE" | "DELETE";

const addSchema = async (
  orgId: string,
  formId: string,
  data: Partial<Iform>,
  type: RequestType,
  fieldId?: string
) => {
  const options = data.selectOptions?.map((el) => el.option);

  if (type === "ADD") {
    return await apiHandler.patch(`/events/form/${orgId}/schema/${formId}`, {
      type: data.type,
      label: data.label,
      placeholder: data.placeholder,
      require: data.require,
      options,
    });
  } else if (type === "UPDATE") {
    if (!fieldId) {
      throw new Error("Field id is required for updating");
    }
    return await apiHandler.patch(
      `/events/form/${orgId}/schema/${formId}/${fieldId}`,
      {
        type: data.type,
        label: data.label,
        placeholder: data.placeholder,
        require: data.require,
        options,
      }
    );
  } else {
    return await apiHandler.delete(
      `/events/form/${orgId}/schema/${formId}/${fieldId}`
    );
  }
};

interface UseAddSchemaProps {
  data: Partial<Iform>;
  type: RequestType;
  fieldId?: string;
}

export const useAddSchema = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id, eventid, formid } = router.query;

  return useMutation(
    ({ data, type, fieldId }: UseAddSchemaProps) =>
      addSchema(id as string, formid as string, data, type, fieldId),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["events", "form", eventid, formid]);
      },
      onError: (error) => {
        console.error("Error adding/updating schema:", error);
      },
    }
  );
};
