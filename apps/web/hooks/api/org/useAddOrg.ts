import { apiHandler } from "@app/config";
import { useMutation, useQueryClient } from "react-query";


type IOrgPayload = {
   name:string;
   slug:string
}

const addOrg = async (payload:IOrgPayload)=>{
   return  await apiHandler.post("/org",payload)
}


// when user crateates a new org we need to update all ui with new org
// optimistic ui rendering need to be done
export const useAddOrg = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addOrg,
        onSuccess: (_result, variables) => {
            queryClient.setQueryData(['org'], (old) => ({
                // @ts-ignore
                ...old,               
            }));
        },
    });
};
