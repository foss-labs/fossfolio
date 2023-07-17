import { apiHandler } from '@app/config';
import { Child, User } from '@app/types';
import { useRouter } from 'next/router';
import React, { useMemo, useState, createContext, useEffect } from 'react';

interface IAuthTypes {
    logOut: () => Promise<void>;
    user: User | null;
    login: () => Promise<void>;
}
export const AuthCtx = createContext({} as IAuthTypes);

export const AuthContext = ({ children }: Child) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const data = useMemo(
        () => ({
            logOut: async () => {
                setUser(null);
                apiHandler.post('/auth/logout');
                router.push('/');
            },
            login: async () => {
                try {
                    const { data } = await apiHandler.get('/user');
                    setUser(data);
                } catch (error) {
                    console.log(error);
                }
            },
            user,
        }),
        [user],
    );

    useEffect(() => {
        data.login();
    }, []);

    return <AuthCtx.Provider value={data}> {children}</AuthCtx.Provider>;
};
