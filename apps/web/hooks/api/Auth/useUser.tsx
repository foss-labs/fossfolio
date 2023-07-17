import { apiHandler } from '@app/config';
import { useQuery } from 'react-query';

const getUser = async () => {
    try {
        const { data } = await apiHandler.get('/user');
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const useUser = () => {
    const user = useQuery('user', getUser);
    return user;
};
