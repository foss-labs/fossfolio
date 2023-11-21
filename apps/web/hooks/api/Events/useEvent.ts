import { useQuery, QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiHandler } from '@app/config';
import type { OrgEvents } from '@app/types';

type IData = {
    data: OrgEvents;
    ok: boolean;
    message: string;
};

const getEvent = async (id: string) => {
    const { data } = await apiHandler.get(`/events/${id}`);
    return data;
};

type Fetch = 'event' | 'org';

export const useEvent = (type: Fetch = 'event') => {
    const router = useRouter();
    const [Id, setId] = useState('');
    const orgEventQueryKey = ['events', Id];

    const queryClient = new QueryClient();
    useEffect(() => {
        // id is the primary key of event in events page
        // pk is the primary key of event in org dashboard page

        if (router.isReady) {
            // this is done to reuse same function event info page and org dashboard
            const { id, pk } = router.query;
            if (type === 'event') {
                setId(id as string);
            }
            if (type === 'org') {
                setId(pk as string);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const events = useQuery<IData>({
        queryKey: orgEventQueryKey,
        queryFn: () => getEvent(Id),
        // query is disabled until the query param is available
        enabled: !!Id,
        onSuccess: (data) => {
            localStorage.setItem('novel__content', data.data.description as string);
        },
    });

    return events;
};
