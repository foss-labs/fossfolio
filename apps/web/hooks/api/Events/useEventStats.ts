import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";
import { ServerResponse } from "@app/types";

type Data = {
  totalRevenue: number;
  totalTickets: number;
  insights: Record<string, number>;
};

type IData = ServerResponse<Data>;

const getEventStats = async (id: string) => {
  const { data } = await apiHandler.get(`/events/stats/${id}`);
  return data;
};

export const useEventStats = () => {
  const router = useRouter();
  const [Id, setId] = useState("");
  const queryKey = ["events", "stats", Id];

  useEffect(() => {
    // id is the primary key of event in events page
    // eventid is the primary key of event in org dashboard page

    if (router.isReady) {
      const { eventid } = router.query;
      setId(eventid as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const events = useQuery<IData>({
    queryKey: queryKey,
    queryFn: () => getEventStats(Id),
    // query is disabled until the query param is available
    enabled: !!Id,
  });

  return events;
};
