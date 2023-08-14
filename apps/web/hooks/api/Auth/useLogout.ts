import { apiHandler } from '@app/config';
import { useQueryClient } from 'react-query';

export const useLogOut = () => {
    const queryClient = useQueryClient();
    const logOut = async (): Promise<void> => {
        queryClient.invalidateQueries();
        try {
            await apiHandler.get('/auth/logout');
        } catch (e) {
            console.log(e);
        }
    };
    return { logOut };
};
