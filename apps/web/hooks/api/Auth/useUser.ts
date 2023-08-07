import { apiHandler } from '@app/config';
import { useQuery } from 'react-query';

const getUser = async () => {
    try {
        const { data, status } = await apiHandler.get('/user');
        // handling unauth
        if (status === 401) {
            throw new Error('Unauthrized user');
        }
        return data;
    } catch {
        console.error('Login failed');
    }
};

export const useUser = () => {
    const user = useQuery('user', getUser);
    return user;
};
