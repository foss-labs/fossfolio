import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";
import { Iform } from "@app/types";

type IData = {
  data: Iform[];
  ok: boolean;
  message: string;
};

const getForm = async (id: string, pk: string) => {
  const { data } = await apiHandler.get(`/events/form/${id}/${pk}`);
  return data;
};

export const useFormSchema = () => {
  const router = useRouter();
  const [Id, setId] = useState("");
  const [Pk, setPk] = useState("");
  const formQueryKey = ["events", "form", Id];

  useEffect(() => {
    // id is the primary key of org
    // pk is the primary key of event

    if (router.isReady) {
      // this is done to reuse same function event info page and org dashboard
      const { id, pk } = router.query;
      setId(id as string);
      setPk(pk as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const events = useQuery<IData>({
    queryKey: formQueryKey,
    queryFn: () => getForm(Id, Pk),
    // query is disabled until the query param is available
    enabled: !!Id,
  });

  return events;
};
