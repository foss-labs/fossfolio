import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiHandler } from '@app/config';
import type { OrgEvents, Roles } from '@app/types';

type IData = {
    data: OrgEvents;
    ok: boolean;
    message: string;
};

const getEvent = async (id: string) => {
    const { data } = await apiHandler.get(`/events/${id}`);
    return data;
};

export const useEvent = () => {
    const router = useRouter();
    const [Id, setId] = useState('');
    const orgEventQueryKey = ['events', Id];
    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            setId(id as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const events = useQuery<IData>({
        queryKey: orgEventQueryKey,
        queryFn: () => getEvent(Id),
        // query is disabled until the query param is available
        enabled: !!Id,
    });

    return events;
};
