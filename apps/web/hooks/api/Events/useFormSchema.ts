import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiHandler } from '@app/config';
import type { OrgEvents } from '@app/types';
import { IFormInput } from '@app/views/form';

type IData = {
    data: Iform[];
    ok: boolean;
    message: string;
};

export type Iform = {
    label: string;
    placeholder?: string;
    options?: string;
    required: boolean;
    type: IFormInput;
    id?: string;
};

const getForm = async (id: string, pk: string) => {
    const { data } = await apiHandler.get(`/events/form/${id}/${pk}`);
    return data;
};

export const useFormSchema = () => {
    const router = useRouter();
    const [Id, setId] = useState('');
    const [Pk, setPk] = useState('');
    const orgEventQueryKey = ['events', Id];

    useEffect(() => {
        // id is the primary key of event in events page
        // pk is the primary key of event in org dashboard page

        if (router.isReady) {
            // this is done to reuse same function event info page and org dashboard
            const { id, pk } = router.query;
            setId(id as string);
            setPk(pk as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const events = useQuery<IData>({
        queryKey: orgEventQueryKey,
        queryFn: () => getForm(Id, Pk),
        // query is disabled until the query param is available
        enabled: !!Id,
    });

    return events;
};
