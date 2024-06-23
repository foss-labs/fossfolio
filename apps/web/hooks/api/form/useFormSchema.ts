import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";
import { IFormInput } from "@app/views/form";

export interface FormResponse {
  id: string;
  fk_form_id: string;
  name: string;
  placeholder: string;
  description: string;
  required: boolean;
  type: IFormInput;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

const getForm = async (id: string, pk: string) => {
  const { data } = await apiHandler.get(`/events/form/${id}/schema/${pk}`);
  return data;
};

export const useFormSchema = () => {
  const router = useRouter();
  const { id, pk, formid } = router.query;
  const [Id, setId] = useState("");
  const [Pk, setPk] = useState("");
  const formQueryKey = ["events", "form", pk, formid];

  useEffect(() => {
    // id is the primary key of org

    if (router.isReady) {
      setId(id as string);
      setPk(formid as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const events = useQuery<FormResponse[]>({
    queryKey: formQueryKey,
    queryFn: () => getForm(Id, Pk),
    // query is disabled until the query param is available
    enabled: !!Id,
  });

  return events;
};
