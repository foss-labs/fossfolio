import React, { useEffect } from 'react';
import { Child } from '@app/types';
import { fetchUser } from '@app/slices/auth';
import { useDispatch } from 'react-redux';
import { authActions } from '@app/slices';
import { supaClient } from '@app/config/supabaseClient';
import { MainNav } from './components/MainNav';

export const HomeLayout = ({ children }: Child) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(fetchUser());
        supaClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                dispatch(authActions.setLoggedIn({ payload: session?.user.user_metadata }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <MainNav />
            {children}
        </>
    );
};
