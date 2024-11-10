import { apiHandler } from "@app/config";
import { useMutation,useQueryClient}  from "@tanstack/react-query";



export const deleteEvent = (id: string,orgId:string) => {
  return apiHandler.delete(`/events/${id}`,{
    params: {
      orgId,
    },
  });
};

export const useDeleteEvent = (id: string,orgId:string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteEvent(id,orgId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-events", orgId] });
    },
  });
};
