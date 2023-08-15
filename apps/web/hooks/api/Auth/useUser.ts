import { apiHandler } from '@app/config';
import { useQuery } from '@tanstack/react-query';

const getUser = async () => {
    const { data } = await apiHandler.get('/user');
    return data;
};

export const useUser = () => {
    const user = useQuery({ queryKey: ['user'], queryFn: getUser });
    return user;
};
