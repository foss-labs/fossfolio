import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@app/slices/auth';
import { supaClient } from '@app/config/supabaseClient';
import { authActions } from '@app/slices';
import { Child } from '@app/types';

export const AuthProvider = ({ children }: Child): JSX.Element => {
    const router = useRouter();
    const authState = useSelector((state: any) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch<any>(fetchUser());
        if (!authState) router.replace('/?authreq=true');
        supaClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                dispatch(authActions.setLoggedIn({ payload: session?.user.user_metadata }));
            }
        });

        // add router.query to dependencies so invoke useeffect of return to home after unauthorized route access
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState]);

    return <>{children};</>;
};
