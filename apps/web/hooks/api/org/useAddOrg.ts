import { apiHandler } from '@app/config';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

type IOrgPayload = {
    name: string;
    slug: string;
};

const addOrg = async (payload: IOrgPayload) => {
    return await apiHandler.post('/org', payload);
};

// when user crateates a new org we need to update all ui with new org
// optimistic ui rendering need to be done
export const useAddOrg = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: addOrg,
        onSuccess: (result, variables) => {
            queryClient.setQueryData(['org'], (old) => ({
                // @ts-ignore
                ...old,
            }));
            toast.success('Organisation created successfully');
            // pushing to the new org page
            router.push(`/org/${result.data.id}`);
        },
    });
};
