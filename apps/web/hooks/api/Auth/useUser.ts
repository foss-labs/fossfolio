import { apiHandler } from '@app/config';
import { useQuery } from 'react-query';

const getUser = async () => {
    const { data } = await apiHandler.get('/user');
    return data;
};

export const useUser = () => {
    const user = useQuery('user', getUser);
    return user;
};
