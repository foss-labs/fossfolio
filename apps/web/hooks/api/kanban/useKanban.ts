import { apiHandler } from "@app/config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Kanban, ServerResponse } from "@app/types";

export type KanbanResponse = ServerResponse<Kanban[]>;

const getKanban = async (slug: string): Promise<KanbanResponse> => {
  const { data } = await apiHandler.get(`/events/kanban/${slug}`);
  return data;
};

export const useKanban = () => {
  const [slug, setSlug] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { eventid } = router.query;
      setSlug(eventid as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const key = ["event", "kanaban", slug];

  const apiData = useQuery<KanbanResponse>({
    queryFn: () => getKanban(slug),
    queryKey: key,
    enabled: !!slug,
  });

  return apiData;
};
