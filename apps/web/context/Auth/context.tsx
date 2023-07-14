import { supaClient } from '@app/config';
import { Child } from '@app/types';
import React, { useMemo } from 'react';
import { createContext } from 'vm';

interface IAuthTypes {
    logOut: () => Promise<void>;
    logIn: () => Promise<Record<string, any>>;
}
export const AuthCtx = createContext({} as IAuthTypes);

export const Authcontext = ({ children }: Child) => {
    supaClient.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            // dispatch(authActions.setLoggedIn({ payload: session?.user.user_metadata }));
        }
    });

    const data = useMemo(
        () => ({
            logOut: () => {},
            logIn: () => {},
        }),
        [],
    );

    return <AuthCtx.Provider value={data}> {children}</AuthCtx.Provider>;
};
