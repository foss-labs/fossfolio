import { apiHandler } from '@app/config';
import { OrgEvents } from '@app/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const getAllEventsInOrg = async (id: string) => {
    const { data } = await apiHandler.get(`/org/events/${id}`);
    return data;
};

export const useOrgEvents = () => {
    const router = useRouter();
    const { id } = router.query;

    const events = useQuery<OrgEvents[]>({
        queryKey: ['org-events'],
        queryFn: () => getAllEventsInOrg(id as string),
    });
    return events;
};
