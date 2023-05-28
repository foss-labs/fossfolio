import React, { useEffect, useRef } from 'react';
import { Child } from '@app/types';
import { fetchUser } from '@app/slices/auth';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@app/slices';
import { supaClient } from '@app/config/supabaseClient';
import { MainNav } from './components/MainNav';

interface NavAuthOptions {
    redirectLogin: () => void;
}

const unProtectedRoutes = ['/events', '/404', '/', '/pricing'];
export const HomeLayout = ({ children }: Child) => {
    const router = useRouter();
    const authState = useSelector((state: any) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const mainNavRef = useRef<NavAuthOptions>(null);

    useEffect(() => {
        dispatch<any>(fetchUser());
        if (!unProtectedRoutes.includes(router.pathname)) {
            // Push user to home route and send query to open user login modal
            if (!authState) router.replace('/?authreq=true');
        } else if (router.query.authreq === 'true') {
            mainNavRef.current?.redirectLogin();
        }

        supaClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                dispatch(authActions.setLoggedIn({ payload: session?.user.user_metadata }));
            }
        });

        // add router.query to dependencies so invoke useeffect of return to home after unauthorized route access
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState, router.query]);

    return (
        <>
            <MainNav ref={mainNavRef} />
            {children}
        </>
    );
};
