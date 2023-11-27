import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiHandler } from '@app/config';
import { User } from '@app/types';

type IData = {
    ok: boolean;
    message: string;
    data: User[];
};

const getEventParticipants = async (id: string, orgId: string) => {
    const { data } = await apiHandler.get(`/events/participants/${orgId}/${id}`);
    console.log(data);
    return data;
};

export const useEventParticipants = () => {
    const router = useRouter();
    const [eventId, setEventId] = useState('');
    const [orgId, setOrgId] = useState('');
    const orgEventQueryKey = ['org-info', eventId];
    useEffect(() => {
        if (router.isReady) {
            const { pk, id } = router.query;
            setEventId(pk as string);
            setOrgId(id as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const events = useQuery<IData>({
        queryKey: orgEventQueryKey,
        queryFn: () => getEventParticipants(eventId, orgId),
        // query is disabled until the query param is available
        enabled: !!eventId,
    });

    return events;
};
