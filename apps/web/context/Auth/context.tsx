import { apiHandler } from '@app/config';
import { Child, User } from '@app/types';
import { useUser } from '@app/hooks/api/Auth';
import React, { useMemo, createContext, useContext } from 'react';
import { useRouter } from 'next/router';

interface IAuthTypes {
    logOut: () => Promise<void>;
    user: User | null;
    login: () => Promise<void>;
    isLoading: boolean;
}
export const AuthCtx = createContext({} as IAuthTypes);

export const AuthContext = ({ children }: Child) => {
    const { data, isLoading } = useUser();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    const logOut = async () => {
        await apiHandler.post('/auth/logOut');
    };
    const login = async () => {
        await apiHandler.get('/user');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const response = useMemo(() => ({ logOut, user: data, isLoading, login }), []);

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
