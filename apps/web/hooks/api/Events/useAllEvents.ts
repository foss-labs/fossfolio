import { apiHandler } from "@app/config";
import { OrgEvents } from "@app/types";
import { useQuery } from "@tanstack/react-query";

const getAllEvents = async (query: string) => {
  const { data } = await apiHandler.get("/events" + "?search=" + query);
  return data;
};

export const useAllEvents = (query: string) => {
  const queryKey = ["events", query];

  const events = useQuery<Array<OrgEvents>>({
    queryKey: queryKey,
    queryFn: () => getAllEvents(query),
  });

  return events;
};
