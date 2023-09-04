/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { Toggle } from '@app/hooks/useToggle';
import { apiHandler } from '@app/config';
import { Child, User } from '@app/types';
import { useToggle } from '@app/hooks';
import { PageLoader } from "@app/components/preloaders"

interface IAuthTypes {
    user: User | null;
    isLoading: boolean;
    clearData: () => void;
    isAuthModalOpen: boolean;
    toggleModal: Toggle;
}
export const AuthCtx = createContext({} as IAuthTypes);

export const AuthContext = ({ children }: Child): JSX.Element => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<User | null>(null);
    const [isAuthModalOpen, toggleModal] = useToggle();
    const router = useRouter();

    const getUser = async () => {
        try {
            setLoading(true);
            const { data } = await apiHandler.get('/user');
            setData(data);
        } catch {
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
        () => ({ user: data, clearData, isLoading, isAuthModalOpen, toggleModal }),
        [isLoading, toggleModal, data],
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
            console.log("calling from here")
            router.push('/');
        }
    }, [router, ctx.user, ctx.isLoading]);

    return (
        ctx.isLoading ? (
            <PageLoader />
        ) : <>{children}</>

    )
};
