import { Child } from '@app/types';
import React, { useMemo } from 'react';
import { createContext } from 'vm';

interface IAuthTypes {
    logOut: () => Promise<void>;
    logIn: () => Promise<Record<string, any>>;
}
export const AuthCtx = createContext({} as IAuthTypes);

export const Authcontext = ({ children }: Child) => {
    const data = useMemo(
        () => ({
            logOut: () => {},
            logIn: () => {},
        }),
        [],
    );

    return <AuthCtx.Provider value={data}> {children}</AuthCtx.Provider>;
};
