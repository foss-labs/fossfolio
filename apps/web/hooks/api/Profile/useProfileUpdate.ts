import { apiHandler } from '@app/config';
import { useMutation, useQueryClient } from 'react-query';

interface IInfo {
    slug: string;
    name: string;
}

const updateProfile = async (info: IInfo) => {
    return await apiHandler.patch('/user', {
        displayName: info.name,
        slug: info.slug,
    });
};

export const useProfileUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (_result, variables) => {
            queryClient.setQueryData(['user'], (old) => ({
                // @ts-ignore
                ...old,
                slug: variables.slug,
            }));
        },
    });
};
