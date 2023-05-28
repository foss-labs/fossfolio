import React, { useEffect } from 'react';
import { Child } from '@app/types';
import { fetchUser } from '@app/slices/auth';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@app/slices';
import { supaClient } from '@app/config/supabaseClient';
import { MainNav } from './components/MainNav';

export const HomeLayout = ({ children }: Child) => {
    const router = useRouter();
    const authState = useSelector((state: any) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const unProtectedRoutes = ['/events'];

        dispatch<any>(fetchUser());
        if (!unProtectedRoutes.includes(router.pathname)) {
            if (!authState) router.replace('/');
        }

        supaClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                dispatch(authActions.setLoggedIn({ payload: session?.user.user_metadata }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState]);

    return (
        <>
            <MainNav />
            {children}
        </>
    );
};
