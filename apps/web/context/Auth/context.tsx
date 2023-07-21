'use client';

import { apiHandler } from '@app/config';
import { Child, User } from '@app/types';
import { useUser } from '@app/hooks/api/Auth';
import React, { useMemo, createContext, useContext } from 'react';
import { useRouter } from 'next/router';

interface IAuthTypes {
    logOut: () => Promise<void>;
    user: User | null;
    isLoading: boolean;
}
export const AuthCtx = createContext({} as IAuthTypes);

export const AuthContext = ({ children }: Child) => {
    const { data, isLoading } = useUser();
    const logOut = async () => {
        await apiHandler.post('/auth/logOut');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const response = useMemo(() => ({ logOut, user: data, isLoading }), [isLoading, data]);

    return <AuthCtx.Provider value={response}> {children}</AuthCtx.Provider>;
};

export const AuthGuard = ({ children }: Child): JSX.Element => {
    const router = useRouter();
    const ctx = useContext(AuthCtx);
    if (!ctx.user) {
        router.push('/?authreq=true');
    }
    return <>{children}</>;
};
