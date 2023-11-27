import { apiHandler } from '@app/config';
import { useQuery } from '@tanstack/react-query';

const getAllTickets = async () => {
    return await apiHandler.get('/user/tickets');
};

export const useTickets = () => {
    return useQuery({
        queryKey: ['tickets'],
        queryFn: getAllTickets,
    });
};
