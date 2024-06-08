import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiHandler } from '@app/config';
import type { OrgEvents, ServerResponse } from '@app/types';

/*
  This hook can be used in both event page in dashboad and event page user facing page 
  PK is the primary key of event in dahsboard
  ID is the primary key of event in Evrnt page

*/

type IData = ServerResponse<OrgEvents>;

const getEvent = async (id: string) => {
    const { data } = await apiHandler.get(`/events/${id}`);
    return data;
};

type Fetch = 'event' | 'public';

export const useEvent = (type: Fetch = 'event') => {
    const router = useRouter();
    const [Id, setId] = useState('');

    useEffect(() => {
        // id is the primary key of event in events page
        // pk is the primary key of event in org dashboard page

        if (router.isReady) {
            // this is done to reuse same function event info page and org dashboard
            const { id, pk } = router.query;
            if (type === 'event') {
                setId(pk as string);
            }
            if (type === 'public') {
                setId(id as string);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const eventQueryKey = ['all-events', Id];

    const events = useQuery<IData>({
        queryKey: eventQueryKey,
        queryFn: () => getEvent(Id),
        // query is disabled until the query param is available
        enabled: !!Id,
        onSuccess: (data) => {
            if (data.data.description) {
                localStorage.setItem('novel__content', data.data.description as string);
            } else {
                localStorage.setItem('novel__content', '');
            }
        },
    });

    return events;
};
