import { useQuery } from 'react-query';

export const useUser = () => {
    const user = useQuery('user', () => {
        //TODO
    });

    return user;
};
