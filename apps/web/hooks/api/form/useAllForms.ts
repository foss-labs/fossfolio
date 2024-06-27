import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";
import { AllForms } from "@app/types";

const getForm = async (id: string, eventid: string) => {
  const { data } = await apiHandler.get(`/events/form/${id}/${eventid}`);
  return data;
};

export const useAllForms = () => {
  const router = useRouter();
  const [Id, setId] = useState("");
  const [eventid, seteventid] = useState("");
  const formQueryKey = ["events", "form", eventid];

  useEffect(() => {
    // id is the primary key of org
    // eventid is the primary key of event

    if (router.isReady) {
      const { id, eventid } = router.query;
      setId(id as string);
      seteventid(eventid as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const events = useQuery<AllForms[]>({
    queryKey: formQueryKey,
    queryFn: () => getForm(Id, eventid),
    // query is disabled until the query param is available
    enabled: !!Id,
  });

  return events;
};
