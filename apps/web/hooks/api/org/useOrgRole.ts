import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiHandler } from '@app/config';
import { useAuth } from '@app/hooks/useAuth';
import type { Roles } from '@app/types';

const getOrgRole = async (id: string) => {
    const { data } = await apiHandler.get(`/org/${id}/role`);
    return data;
};

type Data = {
    role: Roles;
    message: string;
    ok: boolean;
};

export const useOrgRole = () => {
    const router = useRouter();
    const [orgId, setOrgId] = useState('');
    const { setRole } = useAuth();
    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            setOrgId(id as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const role = useQuery<Data>({
        queryKey: ['org-role'],
        queryFn: () => getOrgRole(orgId),
        onSuccess: (data) => {
            // setting the current role of user in the org
            setRole(data.role);
        },
        // query is disabled until the query param is available
        enabled: !!orgId,
    });

    return role;
};
