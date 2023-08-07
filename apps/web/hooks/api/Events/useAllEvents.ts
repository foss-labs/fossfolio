import { apiHandler } from '@app/config';
import { useQuery } from 'react-query';

const getAllEvents = async () => {
    const { data } = await apiHandler.get('/user');
    return data;
};

export const useAllEvents = () => {
    const events = useQuery('all-events', getAllEvents);
    return events;
};
