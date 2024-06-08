import { apiHandler } from '@app/config';
import { useAuth } from '@app/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const getStatus = async (id: string) => {
    const { data } = await apiHandler.get(`/events/status/${id}`);
    return data;
};

type Status = {
    isRegistred: boolean;
    ok: boolean;
    message: string;
};

export const useUserRegistrationStatus = () => {
    const { user } = useAuth();
    const [id, setId] = useState('');
    const router = useRouter();

    useEffect(() => {
        // id is the primary key of event in events page
        if (router.isReady) {
            const { id } = router.query;
            setId(id as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);
    const status = useQuery<Status>({
        queryKey: ['eveny-status', id],
        queryFn: () => getStatus(id),
        enabled: !!id && Boolean(user),
    });
    return status;
};
