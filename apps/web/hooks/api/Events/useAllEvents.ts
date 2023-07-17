import { apiHandler } from '@app/config';
import { useQuery } from 'react-query';

const getAllEvents = async () => {
    try {
        const { data } = await apiHandler.get('/user');
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const useAllEvents = () => {
    const events = useQuery('all-events', getAllEvents);
    return events;
};
