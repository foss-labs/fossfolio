import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { apiHandler } from "@app/config";
import type { Member } from "@app/types";

const getAllMembers = async (id: string): Promise<Member[]> => {
  const { data } = await apiHandler.get(`/org/member/${id}`);
  return data;
};

export const useMembers = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryKey = ["org-members", id];
  const members = useQuery({
    queryKey: queryKey,
    queryFn: () => getAllMembers(id as string),
  });
  return members;
};
