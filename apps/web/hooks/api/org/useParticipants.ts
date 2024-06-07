import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";
import { User } from "@app/types";

export type IData = {
  ok: boolean;
  message: string;
  data: User[];
};

type IDataForm = {
  ok: boolean;
  message: string;
  data: Record<string, string | Array<string>>;
};

const getEventParticipants = async (id: string, orgId: string) => {
  const { data } = await apiHandler.get(`/events/participants/${orgId}/${id}`);
  return data;
};

const getEventParticipantsForms = async (
  eventId: string,
  orgId: string,
  userId: string
) => {
  const { data } = await apiHandler.get(
    `/events/participants/${orgId}/${eventId}/${userId}/form`
  );
  return data;
};

export const useEventParticipants = () => {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [orgId, setOrgId] = useState("");
  const orgEventQueryKey = ["org-info", eventId];
  useEffect(() => {
    if (router.isReady) {
      const { pk, id } = router.query;
      setEventId(pk as string);
      setOrgId(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const events = useQuery<IData>({
    queryKey: orgEventQueryKey,
    queryFn: () => getEventParticipants(eventId, orgId),
    // query is disabled until the query param is available
    enabled: !!eventId,
  });

  return events;
};

export const useEventParticipantsFormSubmissions = (id: string) => {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [orgId, setOrgId] = useState("");
  const orgEventQueryKey = ["org-info", "forms", eventId, id];
  useEffect(() => {
    if (router.isReady) {
      const { pk, id } = router.query;
      setEventId(pk as string);
      setOrgId(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const eventsFormSubmissions = useQuery<IDataForm>({
    queryKey: orgEventQueryKey,
    queryFn: () => getEventParticipantsForms(eventId, orgId, id),
    // query is disabled until the query param is available
    enabled: !!eventId && !!id,
  });

  return eventsFormSubmissions;
};
