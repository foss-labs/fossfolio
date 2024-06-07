import { apiHandler } from "@app/config";
import { useQuery } from "@tanstack/react-query";

export type Info = {
  name: string;
  eventDate: Date;
  location: string;
  id: string;
  coverImage: string;
};

export interface Data {
  ok: boolean;
  message: string;
  data: Info[] | undefined;
}

const getAllTickets = async () => {
  const { data } = await apiHandler.get("/user/tickets");
  return data;
};

export const useTickets = () => {
  const key = ["tickets"];

  const res = useQuery<Data>({
    queryKey: key,
    queryFn: getAllTickets,
  });

  return res;
};
