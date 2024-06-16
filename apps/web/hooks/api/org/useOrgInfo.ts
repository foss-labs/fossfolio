import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";

type IData = {
  id: string;
  slug: string;
  name: string;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  is_deleted: boolean;
};

const getOrg = async (id: string) => {
  const { data } = await apiHandler.get(`/org/${id}`);
  return data;
};

export const useOrgInfo = (canCall: boolean) => {
  const router = useRouter();
  const [orgId, setOrgId] = useState("");
  const orgEventQueryKey = ["org-info", orgId];
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setOrgId(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const events = useQuery<IData>({
    queryKey: orgEventQueryKey,
    queryFn: () => getOrg(orgId),
    // query is disabled until the query param is available
    enabled: !!orgId && canCall,
  });

  return events;
};
