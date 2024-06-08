/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { Toggle } from '@app/hooks/useToggle';
import { apiHandler } from '@app/config';
import { Child, Roles, User } from '@app/types';
import { useToggle } from '@app/hooks';
import { PageLoader } from '@app/components/preloaders';
import { IOrgEvents } from '@app/hooks/api/org/useOrgEvents';

interface IAuthTypes {
    user: User | null;
    isLoading: boolean;
    clearData: () => void;
    isAuthModalOpen: boolean;
    toggleModal: Toggle;
    role: Roles | undefined;
    setRole: React.Dispatch<Roles>;
}
export const AuthCtx = createContext({} as IAuthTypes);

export const AuthContext = ({ children }: Child): JSX.Element => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<User | null>(null);
    const [isAuthModalOpen, toggleModal] = useToggle();

    // this will change based on the event the user is in
    const [role, setRole] = useState<Roles | undefined>(undefined);
    const router = useRouter();

    const getUser = async () => {
        try {
            setLoading(true);
            const { data } = await apiHandler.get('/user');
            setData(data);
        } catch (e) {
            console.error('Error Authenticating user');
            router.push('/');
        } finally {
            setLoading(false);
        }
    };

    const clearData = () => {
        setData(null);
    };
    // todo
    // @sreehari2003
    // convert this to react query by fixing the caching problem
    useEffect(() => {
        getUser();
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const response = useMemo(
        () => ({ user: data, clearData, isLoading, isAuthModalOpen, toggleModal, role, setRole }),
        [isLoading, toggleModal, data, role],
    );

    return (
        <AuthCtx.Provider value={response}>
            <>{children}</>
        </AuthCtx.Provider>
    );
};

export const AuthGuard = ({ children }: Child): JSX.Element => {
    const router = useRouter();
    const ctx = useContext(AuthCtx);
    useEffect(() => {
        if (!ctx.isLoading && !ctx.user) {
            ctx.toggleModal.on();
            router.push('/');
        }
    }, [router, ctx.user, ctx.isLoading]);

    useEffect(() => {
        // when user reloads the page from event dashboard this needs to evoked to get the user role
        // TODO - try getting the user role from rtk cache
        if (!ctx.role && router.isReady) {
            (async () => {
                try {
                    const { data } = await apiHandler.get<IOrgEvents>(
                        `/org/events/${router.query.id}`,
                    );
                    ctx.setRole(data.role);
                } catch {
                    console.error('Error getting user role');
                }
            })();
        }
    }, [router.isReady]);

    return ctx.isLoading ? <PageLoader /> : <>{children}</>;
};
