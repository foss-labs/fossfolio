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
  options?: Array<string>;
}

const getForm = async (id: string, eventid: string) => {
  const { data } = await apiHandler.get(`/events/form/${id}/schema/${eventid}`);
  return data;
};

export const useFormSchema = () => {
  const router = useRouter();
  const { id, eventid, formid } = router.query;
  const [Id, setId] = useState("");
  const [eventPk, seteventid] = useState("");
  const formQueryKey = ["events", "form", eventid, formid];

  useEffect(() => {
    // id is the primary key of org

    if (router.isReady) {
      setId(id as string);
      seteventid(formid as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const events = useQuery<FormResponse[]>({
    queryKey: formQueryKey,
    queryFn: () => getForm(Id, eventPk),
    // query is disabled until the query param is available
    enabled: !!Id,
  });

  return events;
};
