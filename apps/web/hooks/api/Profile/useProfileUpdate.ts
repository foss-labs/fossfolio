import { apiHandler } from '@app/config';
import { useMutation, useQueryClient } from 'react-query';

interface IInfo {
    slug: string;
    uid: string;
    name: string;
}

const updateProfile = async (info: IInfo) => {
    return await apiHandler.patch('/user', {
        displayName: info.name,
        slug: info.slug,
        uid: info.uid,
    });
};

export const useProfileUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
        },
    });
};
