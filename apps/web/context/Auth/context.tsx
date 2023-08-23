/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Child, User } from '@app/types';
import { apiHandler } from '@app/config';
import { useToggle } from '@app/hooks';
import type { Toggle } from "@app/hooks/useToggle"

interface IAuthTypes {
    user: User | null;
    isLoading: boolean;
    clearData: () => void
    isAuthModalOpen: boolean;
    toggleModal: Toggle
}
export const AuthCtx = createContext({} as IAuthTypes);

export const AuthContext = ({ children }: Child): JSX.Element => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<User | null>(null);
    const [isAuthModalOpen, toggleModal] = useToggle()
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
        setData(null)
    }
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

    return <AuthCtx.Provider value={response}> {children}</AuthCtx.Provider>;
};

export const AuthGuard = ({ children }: Child): JSX.Element => {
    const router = useRouter();
    const ctx = useContext(AuthCtx);
    useEffect(() => {
        if (!ctx.user) {
            ctx.toggleModal.on()
            router.push('/');
        }
    }, [router, ctx.user]);

    return <>{children}</>;
};
