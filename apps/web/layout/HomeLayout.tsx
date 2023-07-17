import React, { useEffect, useRef } from 'react';
import { Child } from '@app/types';
import { useRouter } from 'next/router';
import { MainNav } from './components/MainNav';

interface NavAuthOptions {
    redirectLogin: () => void;
}

export const HomeLayout = ({ children }: Child) => {
    const router = useRouter();
    const mainNavRef = useRef<NavAuthOptions>(null);

    useEffect(() => {
        if (router.query.authreq === 'true') {
            mainNavRef.current?.redirectLogin();
        }

        // add router.query to dependencies so invoke useeffect of return to home after unauthorized route access
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query]);

    return (
        <>
            <MainNav />
            {children}
        </>
    );
};
