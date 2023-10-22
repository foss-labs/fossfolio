import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiHandler } from '@app/config';
import type { OrgEvents } from '@app/types';

const getAllEventsInOrg = async (id: string) => {
    const { data } = await apiHandler.get(`/org/events/${id}`);
    return data;
};

export const useOrgEvents = () => {
    const router = useRouter();
    const [orgId, setOrgId] = useState('');
    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            setOrgId(id as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const events = useQuery<OrgEvents[]>({
        queryKey: ['org-events'],
        queryFn: () => getAllEventsInOrg(orgId),
        // query is disabled until the query param is available
        enabled: !!orgId,
    });
    return events;
};
