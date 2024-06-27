import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";
import type { OrgEvents, Roles } from "@app/types";
import { useAuth } from "@app/hooks/useAuth";

export type IOrgEvents = {
  event: OrgEvents[];
  role: Roles;
};

const getAllEventsInOrg = async (id: string) => {
  const { data } = await apiHandler.get(`/org/${id}/events`);
  return data;
};

export const useOrgEvents = () => {
  const router = useRouter();
  const { setRole } = useAuth();
  const [orgId, setOrgId] = useState("");
  const orgEventQueryKey = ["org-events", orgId];
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setOrgId(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const events = useQuery<IOrgEvents>({
    queryKey: orgEventQueryKey,
    queryFn: () => getAllEventsInOrg(orgId),
    onSuccess: (data) => {
      setRole(data.role);
    },
    // query is disabled until the query param is available
    enabled: !!orgId,
  });

  return events;
};
