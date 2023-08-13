import { apiHandler } from '@app/config';
import { useMutation, useQueryClient } from 'react-query';

const logout = async () => {
    const { data } = await apiHandler.get('/auth/logout');
    return data;
};

export const useLogOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries(['user', 'all-events', 'orgs']);
        },
    });
};
