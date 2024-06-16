import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";
import type { OrgEvents } from "@app/types";

/*
  This hook can be used in both event page in dashboard and event page user facing page 
  PK is the primary key of event in dashboard
  ID is the primary key of event in Event page

*/

const getEvent = async (id: string, type: Fetch = "event") => {
  const url = type === "public" ? `/events/${id}` : `/events/org/${id}`;
  const { data } = await apiHandler.get(url);
  return data;
};

export type Fetch = "event" | "public";

export const useEvent = (type: Fetch = "event") => {
  const router = useRouter();
  const [Id, setId] = useState("");
  const { id, pk } = router.query;

  useEffect(() => {
    // id is the primary key of event in events page
    // pk is the primary key of event in org dashboard page

    if (router.isReady) {
      // this is done to reuse same function event info page and org dashboard
      if (type === "event") {
        setId(pk as string);
      }
      if (type === "public") {
        setId(id as string);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const eventQueryKey = ["all-events", Id];

  const events = useQuery<OrgEvents>({
    queryKey: eventQueryKey,
    queryFn: () => getEvent(Id, type),
    // query is disabled until the query param is available
    enabled: !!Id,
  });

  return events;
};
