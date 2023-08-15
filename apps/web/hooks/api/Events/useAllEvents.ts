import { apiHandler } from '@app/config';
import { useQuery } from '@tanstack/react-query';

const getAllEvents = async () => {
    const { data } = await apiHandler.get('/user');
    return data;
};

export const useAllEvents = () => {
    const events = useQuery({ queryKey: ['all-events'], queryFn: getAllEvents });
    return events;
};
